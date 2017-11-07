<template>
  <div class="progress-bar" ref="progressBar" @click="progressClick">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-wrapper" ref="progressBtn" @touchstart.prevent="progressTouchStart" @touchmove.prevent="progressTouchMove" @touchend="progressTouchEnd">
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    prefixStyle
  } from 'common/js/dom'
  import {
    mapMutations,
    mapGetters
  } from 'vuex'
  const transform = prefixStyle('transform')
  const progressBtnWidth = 16
  export default {
    props: {
      percent: {
        type: Number,
        default: 0
      },
      songReady: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      ...mapGetters([
        'progressWidth',
        'playing'
      ])
    },
    created() {
      this.touch = {}
    },
    methods: {
      ...mapMutations({
        setprogressWidth: 'SET_PROGRESS'
      }),
      progressTouchStart(e) {
        this.touch.initiated = true
        this.touch.startX = e.touches[0].pageX
        this.touch.left = this.$refs.progress.clientWidth
      },
      progressTouchMove(e) {
        if (!this.touch.initiated) {
          return
        }
        const deltaX = e.touches[0].pageX - this.touch.startX
        const offsetWidth = Math.min(this.$refs.progressBar.clientWidth - progressBtnWidth, Math.max(0, this.touch.left + deltaX))
        this.setOffset(offsetWidth)
      },
      progressTouchEnd(e) {
        this.touch.initiated = false
        this.targetPercent();
      },
      // 点击进度条播放歌曲
      progressClick(e) {
        if (!this.songReady) {
          return
        }
        const rect = this.$refs.progressBar.getBoundingClientRect();
        const offsetWidth = e.pageX - rect.left;
        this.setOffset(offsetWidth)
        this.targetPercent();
      },
      // 计算点击进图条之后的比例 放射一个事件给父组件
      targetPercent() {
        const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth;
        const percent = this.$refs.progress.clientWidth / barWidth;
        this.$emit('percentChange', percent);
      },
      // 设置点击进度条交互
      setOffset(width) {
        this.$refs.progress.style.width = `${width}px`;
        this.$refs.progressBtn.style[transform] = `translate3d(${width}px,0,0)`
      }
    },
    watch: {
      playing(newPlaying) {
        if (newPlaying) {
          let proWidth = this.$refs.progressBar.clientWidth;
          if (this.progressWidth === proWidth || proWidth === 0) {
            return
          } else {
            this.setprogressWidth(proWidth)
          }
        }
      },
      percent(newPercent) {
        if (newPercent >= 0 && !this.touch.initiated) {
          const barWidth = this.progressWidth - progressBtnWidth;
          const offsetWidth = newPercent * barWidth;
          this.setOffset(offsetWidth);
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "../../common/style/variable.scss";
  .progress-bar {
    height: 30px;
    .bar-inner {
      position: relative;
      top: 13px;
      height: 4px;
      background: rgba(0, 0, 0, 0.3);
      .progress {
        position: absolute;
        height: 100%;
        background: $color-theme;
      }
      .progress-btn-wrapper {
        position: absolute;
        left: -8px;
        top: -13px;
        width: 30px;
        height: 30px;
        .progress-btn {
          position: relative;
          top: 7px;
          left: 7px;
          box-sizing: border-box;
          width: 16px;
          height: 16px;
          border: 3px solid $color-text;
          border-radius: 50%;
          background: $color-theme;
        }
      }
    }
  }
</style>

