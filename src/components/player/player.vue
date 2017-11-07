<template>
  <div class="player" v-show="playlist.length>0">
    <transition name="normal" @enter="enter" @after-enter="afterEnter" @leave="leave" @after-leave="afterLeave">
      <div class="normal-player" v-show="fullScreen">
        <div class="background">
          <img width="100%" height="100%" :src="currentSong.image">
        </div>
        <div class="top">
          <div class="back" @click="back">
            <i class="icon-back"></i>
          </div>
          <h1 class="title" v-html="currentSong.name"></h1>
          <h2 class="subtitle" v-html="currentSong.singer"></h2>
        </div>
        <div class="middle" @touchstart.prevent="middleTouchStart" @touchmove.prevent="middleTouchMove" @touchend="middleTouchEnd">
          <div class="middle-l" ref="middlel">
            <div class="cd-wrapper" ref="cdWrapper">
              <div class="cd" :class="cdCls">
                <img class="image" :src="currentSong.image">
              </div>
            </div>
            <div class="playing-lyric-wrapper">
              <div class="playing-lyric">{{playingLyric}}</div>
            </div>
          </div>
          <scroll class="middle-r" ref="lyricList" :data="currentLyric && currentLyric.lines">
            <div class="lyric-wrapper">
              <div v-if="currentLyric">
                <p ref="lyricLine" class="text" :class="{'current': currentLimeNum ===index}" v-for="(line,index) in currentLyric.lines">{{line.txt}}</p>
              </div>
            </div>
          </scroll>
        </div>
        <div class="bottom">
          <div class="progress-wrapper">
            <span class="time time-l">{{formatTime(currentTime)}}</span>
            <div class="progress-bar-wrapper">
              <progress-bar :songReady="songReady" :percent="percent" @percentChange="onpercentChange"></progress-bar>
            </div>
            <span class="time time-r">{{formatTime(currentSong.duration)}}</span>
          </div>
          <div class="operators">
            <div class="icon i-left">
              <i :class="iconMode" @click="changeMode"></i>
            </div>
            <div class="icon i-left" :class="disableCls">
              <i class="icon-prev" @click="prev"></i>
            </div>
            <div class="icon i-center">
              <i :class="playIcon" @click="togglePlaying"></i>
            </div>
            <div class="icon i-right" :class="disableCls">
              <i class="icon-next" @click="next"></i>
            </div>
            <div class="icon i-right">
              <i @click="toggleFavorite(currentSong)" class="icon" :class="getFavoriteIcon(currentSong)"></i>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="mini">
      <div class="mini-player" v-show="!fullScreen" @click="open">
        <div class="icon">
          <img width="40" height="40" :src="currentSong.image" :class="cdCls">
        </div>
        <div class="text">
          <h2 class="name" v-html="currentSong.name"></h2>
          <p class="desc" v-html="currentSong.singer"></p>
        </div>
        <div class="control">
          <progress-circle :radius="radius" :percent="percent">
            <i :class="miniIcon" @click.stop="togglePlaying"></i>
          </progress-circle>
        </div>
        <div class="control" @click.stop="showPlayList">
          <i class="icon-playlist"></i>
        </div>
      </div>
    </transition>
    <play-list ref="playList"></play-list>
    <audio ref="audio" @ended="end" @timeupdate="updateTime" @play="ready" @error="error" :src="currentSong.url"></audio>
  </div>
</template>

<script>
  import {
    mapGetters,
    mapMutations,
    mapActions
  } from 'vuex'
  import animations from 'create-keyframe-animation'
  import {
    prefixStyle
  } from 'common/js/dom'
  import progressBar from 'base/progress-bar/progress-bar'
  import progressCircle from 'base/progress-circle/progress-circle'
  import playingMode from 'common/js/config'
  import Lyric from 'lyric-parser'
  import scroll from 'base/scroll/scroll'
  import playList from 'components/play-list/play-list'
  import { playerMixin } from 'common/js/mixin'
  const transform = prefixStyle('transform')
  const transitionDuration = prefixStyle('transitionDuration')
  export default {
    mixins: [playerMixin],
    data() {
      return {
        songReady: false, // audio是否加载完成标志位
        currentTime: 0,
        radius: 32,
        currentLyric: null,
        currentLimeNum: 0,
        playingLyric: '',
        currentShow: 'cd',
        lines: []
      }
    },
    created() {
      this.touch = {};
    },
    computed: {
      ...mapGetters([
        'fullScreen',
        'playing',
        'currentIndex'
      ]),
      percent() {
        return this.currentTime / this.currentSong.duration;
      },
      playIcon() {
        return this.playing ? 'icon-pause' : 'icon-play'
      },
      miniIcon() {
        return this.playing ? 'icon-pause-mini' : 'icon-play-mini'
      },
      cdCls() {
        return this.playing ? 'play' : 'play pause'
      },
      disableCls() {
        return this.songReady ? '' : 'disable'
      }
    },
    methods: {
      ...mapMutations({
        setFullScreen: 'SET_FULL_SCREEN'
      }),
      ...mapActions([
        'savePlayHistory'
      ]),
      // 切换播放器
      back() {
        this.setFullScreen(false);
      },
      // 切换播放器
      open() {
        this.setFullScreen(true);
      },
      showPlayList() {
        this.$refs.playList.show()
      },
      // 播放器切换之间动画
      enter(el, done) {
        const {
          x,
          y,
          scale
        } = this.getPosAndScale()
        let animation = {
          0: {
            transform: `translate3d(${x}px,${y}px,0) scale(${scale})`
          },
          60: {
            transform: `translate3d(0,0,0) scale(1.1)`
          },
          100: {
            transform: `translate3d(0,0,0) scale(1)`
          }
        }
        animations.registerAnimation({
          name: 'move',
          animation,
          presets: {
            duration: 400,
            easing: 'linear'
          }
        })
        animations.runAnimation(this.$refs.cdWrapper, 'move', done)
      },
      afterEnter() {
        animations.unregisterAnimation('move')
        this.$refs.cdWrapper.style.animation = ''
      },
      leave(el, done) {
        this.$refs.cdWrapper.style.transition = 'all 0.4s'
        const {
          x,
          y,
          scale
        } = this.getPosAndScale()
        this.$refs.cdWrapper.style[transform] = `translate3d(${x}px,${y}px,0) scale(${scale})`
        this.$refs.cdWrapper.addEventListener('transitionend', done)
      },
      afterLeave() {
        this.$refs.cdWrapper.style.transition = ''
        this.$refs.cdWrapper.style[transform] = ''
      },
      // 获取播放器 偏移的x y及缩小比例
      getPosAndScale() {
        const targetWidth = 40
        const paddingLeft = 40
        const paddingBottom = 30
        const paddingTop = 80
        const width = window.innerWidth * 0.8
        const scale = targetWidth / width
        const x = -(window.innerWidth / 2 - paddingLeft)
        const y = window.innerHeight - paddingTop - width / 2 - paddingBottom
        return {
          x,
          y,
          scale
        }
      },
      // 切换播放状态
      togglePlaying() {
        if (!this.songReady) {
          return
        }
        this.setPlayingState(!this.playing)
        if (this.currentLyric) {
          this.currentLyric.togglePlay();
        }
      },
      // 上一首
      prev() {
        if (!this.songReady) {
          return
        }
        if (this.playlist.length === 1) {
          this.loop()
          return
        } else {
          let index = this.currentIndex - 1;
          if (index === -1) {
            index = this.playlist.length - 1;
          }
          this.setCurrentIndex(index)
          if (!this.playing) {
            this.togglePlaying()
          }
        }
        this.songReady = false;
      },
      // 播放一结束时
      end() {
        if (this.mode === playingMode.loop) {
          this.loop();
        } else {
          this.next();
        }
      },
      // 歌曲循环
      loop() {
        this.$refs.audio.currentTime = 0
        this.$refs.audio.play()
        this.setPlayingState(true)
        if (this.currentLyric) {
          this.currentLyric.seek(0)
        }
      },
      // 下一首
      next() {
        if (!this.songReady) {
          return
        }
        if (this.playlist.length === 1) {
          this.loop()
          return
        } else {
          let index = this.currentIndex + 1;
          if (index === this.playlist.length) {
            index = 0;
          }
          this.setCurrentIndex(index)
          if (!this.playing) {
            this.togglePlaying()
          }
        }
        this.songReady = false;
      },
      // audio加载完成时
      ready() {
        this.songReady = true;
        this.savePlayHistory(this.currentSong)
      },
      // audio加载错误时
      error() {
        this.songReady = true
      },
      // 实时获取歌曲播放的当前时间
      updateTime(e) {
        this.currentTime = e.target.currentTime;
      },
      // 处理播放时间 格式
      formatTime(value) {
        let time = value | 0;
        let minute = time / 60 | 0;
        let second = this.pad(time % 60);
        return `${minute}:${second}`
      },
      // 处理时间格式不满两位
      pad(value, num = 2) {
        value = value.toString().length < num ? '0' + value : value;
        return value;
      },
      // 子组件percent变化事件
      onpercentChange(percent) {
        const currentTime = this.currentSong.duration * percent;
        this.$refs.audio.currentTime = currentTime;
        if (!this.playing) {
          this.setPlayingState(true)
        }
        if (this.currentLyric) {
          this.currentLyric.seek(currentTime * 1000)
        }
      },
      // 获取歌词
      getLyric() {
        this.currentSong.getLyric().then((lyric) => {
          if (this.currentSong.lyric !== lyric) {
            return
          }
          this.currentLyric = new Lyric(lyric, this.handleLyric);
          this.lines = this.currentLyric.lines
          if (this.playing) {
            this.currentLyric.play(this.currentTime * 1000);
          }
        }).catch((e) => {
          this.currentLyric = null;
          this.playingLyric = '';
          this.currentLimeNum = 0;
        })
      },
      handleLyric({
        lineNum,
        txt
      }) {
        if (txt === undefined) {
          txt = '123312312312';
        }
        const index = this.lines.indexOf(lineNum)
        const text = this.lines[lineNum]
        if (!index || !text) {
          return
        }
        if (!(txt === text.txt)) {
          return
        }
        this.currentLimeNum = lineNum;
        if (lineNum > 5) {
          this.$refs.lyricList.scrollToElement(this.$refs.lyricLine[lineNum - 5], 1000)
        } else {
          this.$refs.lyricList.scrollTo(0, 0, 1000)
        }
        this.playingLyric = txt
      },
      middleTouchStart(e) {
        this.touch.initiated = true;
        this.touch.startX = e.touches[0].pageX;
        this.touch.startY = e.touches[0].pageY;
      },
      middleTouchMove(e) {
        if (!this.touch.initiated) {
          return
        }
        const deltaX = e.touches[0].pageX - this.touch.startX;
        const deltaY = e.touches[0].pageY - this.touch.startY;
        if (Math.abs(deltaY) > Math.abs(deltaX)) {
          return
        }
        const left = this.currentShow === 'cd' ? '0' : -window.innerWidth;
        const offsetWidth = Math.min(0, Math.max(+left + deltaX, -window.innerWidth));
        this.touch.percent = Math.abs(offsetWidth / window.innerWidth);
        this.$refs.lyricList.$el.style[transform] = `translate3d(${offsetWidth}px,0,0)`
        this.$refs.lyricList.$el.style[transitionDuration] = 0
        this.$refs.middlel.style.opacity = 1 - this.touch.percent;
        this.$refs.middlel.style[transitionDuration] = 0
      },
      middleTouchEnd(e) {
        let offsetWidth;
        let opacity;
        if (this.currentShow === 'cd') {
          if (this.touch.percent > 0.1) {
            offsetWidth = -window.innerWidth
            opacity = 0;
            this.currentShow = 'lyric'
          } else {
            offsetWidth = 0;
            opacity = 1;
          }
        } else {
          if (this.touch.percent < 0.9) {
            offsetWidth = 0;
            opacity = 1;
            this.currentShow = 'cd'
          } else {
            offsetWidth = -window.innerWidth
            opacity = 0
          }
        }
        const time = 300;
        this.$refs.lyricList.$el.style[transform] = `translate3d(${offsetWidth}px, 0, 0)`;
        this.$refs.lyricList.$el.style[transitionDuration] = `${time}ms`
        this.$refs.middlel.style.opacity = opacity;
        this.$refs.middlel.style[transitionDuration] = `${time}ms`
        this.touch.initiated = false
      }
    },
    watch: {
      // song改变时播放歌曲
      currentSong(newSong, oldSong) {
        if (!newSong.id) {
          return
        }
        if (newSong.id === oldSong.id) {
          return
        }
        if (this.currentLyric) {
          this.currentLyric = stop();
          this.currentTime = 0
          this.playingLyric = ''
          this.currentLimeNum = 0
        }
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.$refs.audio.play();
          this.getLyric();
        }, 1000)
      },
      // playing切换来控制播放还是暂停
      playing(newPlaying) {
        const audio = this.$refs.audio;
        this.$nextTick(() => {
          newPlaying ? audio.play() : audio.pause();
        })
      }
    },
    components: {
      progressBar,
      progressCircle,
      scroll,
      playList
    }
  }
</script>

<style lang="scss">
  @import "../../common/style/variable.scss";
  @import "../../common/style/mixin.scss";
  .player {
    .normal-player {
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: 150;
      background: $color-background;
      .background {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        opacity: 0.6;
        filter: blur(20px);
      }
      .top {
        position: relative;
        margin-bottom: 25px;
        .back {
          position: absolute;
          top: 0;
          left: 6px;
          z-index: 50;
          .icon-back {
            display: block;
            padding: 9px;
            font-size: $font-size-large-x;
            color: $color-theme;
            transform: rotate(-90deg);
          }
        }
        .title {
          width: 70%;
          margin: 0 auto;
          line-height: 40px;
          text-align: center;
          @include no-wrap();
          font-size: $font-size-large;
          color: $color-text;
        }
        .subtitle {
          line-height: 20px;
          text-align: center;
          font-size: $font-size-medium - 1;
          color: $color-text;
        }
      }
      .middle {
        position: fixed;
        width: 100%;
        top: 80px;
        bottom: 170px;
        white-space: nowrap;
        font-size: 0;
        .middle-l {
          display: inline-block;
          vertical-align: top;
          position: relative;
          width: 100%;
          height: 0;
          padding-top: 80%;
          .cd-wrapper {
            position: absolute;
            left: 10%;
            top: 0;
            width: 80%;
            height: 100%;
            .cd {
              width: 100%;
              height: 100%;
              box-sizing: border-box;
              border: 10px solid rgba(255, 255, 255, 0.1);
              border-radius: 50%;
              &.play {
                animation: rotate 20s linear infinite
              }
              &.pause {
                animation-play-state: paused
              }
              .image {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                border-radius: 50%;
              }
            }
          }
          .playing-lyric-wrapper {
            width: 80%;
            margin: 30px auto 0 auto;
            overflow: hidden;
            text-align: center;
            .playing-lyric {
              height: 20px;
              line-height: 20px;
              font-size: $font-size-medium;
              color: $color-text-l;
            }
          }
        }
        .middle-r {
          display: inline-block;
          vertical-align: top;
          width: 100%;
          height: 100%;
          overflow: hidden;
          .lyric-wrapper {
            width: 80%;
            margin: 0 auto;
            overflow: hidden;
            text-align: center;
            .text {
              line-height: 32px;
              color: $color-text-l;
              font-size: $font-size-medium;
              &.current {
                color: $color-text;
              }
            }
          }
        }
      }
      .bottom {
        position: absolute;
        bottom: 50px;
        width: 100%;
        .dot-wrapper {
          text-align: center;
          font-size: 0;
          .dot {
            display: inline-block;
            vertical-align: middle;
            margin: 0 4px;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: $color-text-l;
            &.active {
              width: 20px;
              border-radius: 5px;
              background: $color-text-ll;
            }
          }
        }
        .progress-wrapper {
          display: flex;
          align-items: center;
          width: 80%;
          margin: 0px auto;
          padding: 10px 0;
          .time {
            color: $color-text;
            font-size: $font-size-small;
            flex: 0 0 30px;
            line-height: 30px;
            width: 30px;
            &.time-l {
              text-align: left
            }
            &.time-r {
              text-align: right;
            }
          }
          .progress-bar-wrapper {
            flex: 1;
          }
        }
        .operators {
          display: flex;
          align-items: center;
          .icon {
            flex: 1;
            color: $color-theme;
            &.disable {
              color: $color-theme-d
            }
            i {
              font-size: 30px
            }
          }
          .i-left {
            text-align: right
          }
          .i-center {
            padding: 0 20px;
            text-align: center;
            i {
              font-size: 40px
            }
          }
          .i-right {
            text-align: left
          }
          .icon-favorite {
            color: $color-sub-theme
          }
        }
      }
      &.normal-enter-active,
      &.normal-leave-active {
        transition: all .4s;
        .top,
        .bottom {
          transition: all .4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
        }
      }
      &.normal-enter,
      &.normal-leave-to {
        opacity: 0;
        .top {
          transform: translate3d(0, -100px, 0)
        }
        .bottom {
          transform: translate3d(0, 100px, 0)
        }
      }
    }
    .mini-player {
      display: flex;
      align-items: center;
      position: fixed;
      left: 0;
      bottom: 0;
      z-index: 180;
      width: 100%;
      height: 60px;
      background: $color-highlight-background;
      &.mini-enter-active,
      &.mini-leave-active {
        transition: all 0.4s
      }
      &.mini-enter,
      &.mini-leave-to {
        opacity: 0
      }
      .icon {
        flex: 0 0 40px;
        width: 40px;
        padding: 0 10px 0 20px;
        img {
          border-radius: 50%;
          &.play {
            animation: rotate 10s linear infinite
          }
          &.pause {
            animation-play-state: paused
          }
        }
      }
      .text {
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex: 1;
        line-height: 20px;
        overflow: hidden;
        .name {
          margin-bottom: 2px;
          @include no-wrap();
          font-size: $font-size-medium;
          color: $color-text;
        }
        .desc {
          @include no-wrap();
          font-size: $font-size-small;
          color: $color-text-d;
        }
      }
      .control {
        flex: 0 0 30px;
        width: 30px;
        padding: 0 10px;
        .icon-play-mini,
        .icon-pause-mini {
          position: absolute;
          top: 0;
          left: 0;
          font-size: 32px;
          color: $color-theme-d;
        }
        .icon-playlist {
          font-size: 30px;
          color: $color-theme-d;
        }
        .icon-mini {
          font-size: 32px;
          position: absolute;
          left: 0;
          top: 0;
        }
      }
    }
  }

  @keyframes rotate {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>

