<template>
  <transition name="list-fade">
    <div class="playlist" @click="hide" v-show="showFlag">
      <div class="list-wrapper" @click.stop>
        <div class="list-header">
          <h1 class="title">
            <i class="icon" :class="iconMode" @click="changeMode"></i>
            <span class="text">{{modeText}}</span>
            <span class="clear" @click="showConfirm"><i class="icon-clear"></i></span>
          </h1>
        </div>
        <scroll :data="sequenceList" ref="listContent" class="list-content" :refreshDelay="refreshDelay">
          <transition-group ref="list" name="list" tag="ul">
            <li :key="item.id" class="item" v-for="(item, index) in sequenceList" @click="selectItem(item, index)">
              <i class="current" :class="{'icon-play':currentSong.id === item.id}"></i>
              <span class="text">{{item.name}}</span>
              <span @click.stop="toggleFavorite(item)" class="like">
                  <i :class="getFavoriteIcon(item)"></i>
              </span>
              <span class="delete"　@click.stop="deleteOne(item)">
                  <i class="icon-delete"></i>
              </span>
            </li>
          </transition-group>
        </scroll>
        <div class="list-operate">
          <div class="add" @click.stop="openAddSong">
            <i class="icon-add"></i>
            <span class="text">添加歌曲到队列</span>
          </div>
        </div>
        <div class="list-close" @click="hide">
          <span>关闭</span>
        </div>
      </div>
      <confirm ref="confirm" @confirm="confirmClear" text="是否清空播放列表" confirmBtnText="清空"></confirm>
      <add-song ref="addSong"></add-song>
    </div>
  </transition>
</template>

<script>
  import scroll from 'base/scroll/scroll'
  import { mapActions } from 'vuex'
  import playMode from 'common/js/config'
  import confirm from 'base/confirm/confirm'
  import { playerMixin } from 'common/js/mixin'
  import addSong from 'components/add-song/add-song'
  export default {
    mixins: [playerMixin],
    data() {
      return {
        showFlag: false,
        refreshDelay: 120
      }
    },
    computed: {
      modeText() {
        return this.mode === playMode.sequence ? '顺序播放' : this.mode === playMode.random ? '随机播放' : '单曲循环'
      }
    },
    methods: {
      ...mapActions([
        'deleteSong',
        'deleteSongList'
      ]),
      confirmClear() {
        this.deleteSongList()
        this.hide()
      },
      showConfirm() {
        this.$refs.confirm.show()
      },
      // 选中播放
      selectItem(item, index) {
        if (this.mode === playMode.random) {
          index = this.playlist.findIndex((song) => {
            return song.id === item.id
          })
        }
        this.setCurrentIndex(index)
        this.setPlayingState(true)
      },
      openAddSong() {
        this.$refs.addSong.show();
      },
      deleteOne(song) {
        this.deleteSong(song);
        if (!this.playlist.length) {
          this.hide()
        }
      },
      show() {
        this.showFlag = true;
        setTimeout(() => {
          this.$refs.listContent.refresh()
          this.scrollToCurrent(this.currentSong)
        }, 20);
      },
      scrollToCurrent(current) {
        const index = this.sequenceList.findIndex((song) => {
          return current.id === song.id
        })
        this.$refs.listContent.scrollToElement(this.$refs.list.$el.children[index], 300)
      },
      hide() {
        this.showFlag = false;
      }
    },
    watch: {
      currentSong(newSong, oldSong) {
        if (!this.showFlag || newSong.id === oldSong.id) {
          return
        }
        setTimeout(() => {
          this.scrollToCurrent(newSong)
        }, 20)
      }
    },
    components: {
      scroll,
      confirm,
      addSong
    }
  }
</script>

<style lang="scss">
  @import "../../common/style/variable.scss";
  @import "../../common/style/mixin.scss";
  .playlist {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 200;
    background-color: $color-background-d;
    &.list-fade-enter-active,
    &.list-fade-leave-active {
      transition: opacity 0.3s;
      .list-wrapper {
        transition: all 0.3s;
      }
    }
    &.list-fade-enter,
    &.list-fade-leave-to {
      opacity: 0;
      .list-wrapper {
        transform: translate3d(0, 100%, 0);
      }
    }
    .list-wrapper {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      background-color: $color-highlight-background;
      .list-header {
        position: relative;
        padding: 20px 30px 10px 20px;
        .title {
          display: flex;
          align-items: center;
          .icon {
            margin-right: 10px;
            font-size: 30px;
            color: $color-theme-d;
          }
          .text {
            flex: 1;
            font-size: 14px;
            color: $color-text-l;
          }
          .clear {
            @include extend-click();
            .icon-clear {
              font-size: $font-size-medium;
              color: $color-text-d;
            }
          }
        }
      }
      .list-content {
        max-height: 240px;
        overflow: hidden;
        .item {
          display: flex;
          align-items: center;
          height: 40px;
          padding: 0 30px 0 20px;
          overflow: hidden;
          &.list-enter-active,
          &.list-leave-active {
            transition: all 0.1s;
          }
          &.list-enter,
          &.list-leave-to {
            height: 0;
          }
          .current {
            flex: 0 0 20px;
            width: 20px;
            font-size: $font-size-small;
            color: $color-theme-d;
          }
          .text {
            flex: 1;
            @include no-wrap();
            font-size: 14px;
            color: $color-text-d;
          }
          .like {
            @include extend-click();
            margin-right: 15px;
            font-size: $font-size-small;
            color: $color-theme;
            .icon-favorite {
              color: $color-sub-theme;
            }
          }
          .delete {
            @include extend-click();
            font-size: $font-size-small;
            color: $color-theme;
          }
        }
      }
      .list-operate {
        width: 140px;
        margin: 20px auto 30px auto;
        .add {
          display: flex;
          align-items: center;
          padding: 8px 16px;
          border: 1px solid $color-text-l;
          border-radius: 100px;
          color: $color-text-l;
          .icon-add {
            margin-right: 5px;
            font-size: $font-size-small-s;
          }
          .text {
            font-size: $font-size-small;
          }
        }
      }
      .list-close {
        text-align: center;
        line-height: 50px;
        background: $color-background;
        font-size: $font-size-medium-x;
        color: $color-text-l;
      }
    }
  }
</style>


