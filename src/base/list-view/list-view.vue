<template>
  <scroll class="listview" :data="data" ref="scroll" :probeType="probeType" :listenScroll="listenScroll" @scroll="scroll">
    <ul class="a">
      <li v-for="group in data" class="list-group" ref="listGroup">
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li v-for="singer in group.items" class="list-group-item" :key="singer.id" @click="selectItem(singer)">
            <img v-lazy="singer.avatar" class="avatar">
            <span class="name">{{singer.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="list-shortcut" @touchstart.stop.prevent="onTouchStart" @touchmove.stop.prevent="onTouchMove">
      <ul>
        <li v-for="(item, index) in shortcutList" class="item" :data-index="index" :class="{current:currentIndex === index}">
          {{item}}
        </li>
      </ul>
    </div>
    <div class="list-fixed" v-show="fixedTitle" ref="fixed">
      <div class="fixed-title">{{fixedTitle}}</div>
    </div>
    <div class="loading-container" v-show="!data.length">
      <loading></loading>
    </div>
  </scroll>
</template>

<script>
  import Loading from 'base/loading/loading'
  import Scroll from 'base/scroll/scroll'
  import { getData } from 'common/js/dom'
  const ANCHOR_HEIGHT = 18 // 右侧导航元素高度
  const TITLE_HEIGHT = 30 // 导航title高度
  export default {
    data() {
      return {
        probeType: 3,
        listenScroll: true,
        scrollY: 0,
        currentIndex: 0,
        diff: ''
      }
    },
    props: {
      data: {
        type: Array,
        default: function() {
          return []
        }
      }
    },
    created() {
      this.touch = {};
      this.listHeight = [];
    },
    computed: {
      /* 右侧导航 */
      shortcutList() {
        return this.data.map((item) => {
          return item.title.substr(0, 1);
        })
      },
      fixedTitle() {
        if (this.scrollY > 0) {
          return false;
        }
        return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
      }
    },
    methods: {
      /* 右侧导航点击滑动指定位置 */
      onTouchStart(e) {
        let index = getData(e.target, 'index');
        this.touch.startY = e.touches[0].pageY;
        this.touch.startIndex = index;
        this.scrollTo(index)
      },
      /* 右侧导航滑动 */
      onTouchMove(e) {
        this.touch.endY = e.touches[0].pageY;
        let distance = (this.touch.endY - this.touch.startY) / ANCHOR_HEIGHT | 0
        let index = parseInt(this.touch.startIndex) + distance;
        this.scrollTo(index)
      },
      /* 滚动到指定元素 */
      scrollTo(index) {
        if (!index && index !== 0) {
          return;
        }
        if (index < 0) {
          index = 0;
        } else if (index > this.listHeight.length - 2) {
          index = this.listHeight.length - 2
        }
        // this.scrollY = -this.listHeight[index]
        this.$refs.scroll.scrollToElement(this.$refs.listGroup[index], 500)
      },
      /* 监听scroll组件的scroll事件 获得pos */
      scroll(pos) {
        this.scrollY = pos.y;
      },
      refresh() {
        this.$refs.scroll.refresh();
      },
      /* 计算每一项的高度 */
      calculateHeight() {
        let height = 0;
        this.listHeight.push(height);
        const list = this.$refs.listGroup;
        for (let i = 0; i < list.length; i++) {
          let item = list[i];
          height += item.clientHeight;
          this.listHeight.push(height)
        }
      },
      // 派发selectSinger事件 传参
      selectItem(singer) {
        this.$emit('select', singer)
      }
    },
    watch: {
      /* data数据变化时 调用方法重新计算高度 */
      data() {
        setTimeout(() => {
          this.calculateHeight();
        }, 20);
      },
      /* 判断当前Y轴的位置 高亮显示导航 */
      scrollY(newY) {
        const list = this.listHeight;
        if (newY >= 0) {
          this.currentIndex = 0;
          return;
        }
        for (let i = 0; i < list.length - 1; i++) {
          const height1 = list[i];
          const height2 = list[i + 1];
          if (-newY >= height1 && -newY < height2) {
            this.currentIndex = i;
            this.diff = height2 + newY
            return
          }
        }
        this.currentIndex = list.length - 2;
      },
      diff(newVal) {
        let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0
        if (this.fixedTop === fixedTop) {
          return
        }
        this.fixedTop = fixedTop
        this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
      }
    },
    components: {
      Scroll,
      Loading
    }
  }
</script>

<style lang="scss">
  @import '../../common/style/variable.scss';

  .listview {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: $color-background;
    .list-group {
      padding-bottom: 30px;
      .list-group-title {
        height: 30px;
        line-height: 30px;
        padding-left: 20px;
        font-size: $font-size-small;
        color: $color-text-l;
        background: $color-highlight-background;
      }
      .list-group-item {
        display: flex;
        align-items: center;
        padding: 20px 0 0 30px;
        .avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }
        .name {
          margin-left: 20px;
          color: $color-text-l;
          font-size: $font-size-medium;
        }
      }
    }
  }

  .list-shortcut {
    position: absolute;
    z-index: 30;
    right: 0;
    top: 50%;
    transform: translateY(-56%);
    width: 20px;
    padding: 20px 0;
    border-radius: 10px;
    text-align: center;
    background: $color-background-d;
    font-family: Helvetica;
    .item {
      padding: 3px;
      line-height: 1;
      color: $color-text-l;
      font-size: $font-size-small;
      &.current {
        color: $color-theme;
      }
    }
  }

  .list-fixed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    .fixed-title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
      background: $color-highlight-background;
    }
  }

  .loading-container {
    position: absolute;
    width: 100%;
    top: 40%;
    //transform: translateY(-50%);
  }
</style>

