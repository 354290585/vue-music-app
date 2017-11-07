<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots">
      <span class="dot" :class="{active:currenPageIndex === index}" v-for="(item, index) in dots" :key="index"></span>
    </div>
  </div>
</template>

<script>
  import BetterScroll from 'better-scroll'
  import {
    addClass
  } from 'common/js/dom'
  export default {
    data() {
      return {
        dots: [],
        currenPageIndex: 0
      }
    },
    props: {
      loop: {
        type: Boolean,
        default: true
      },
      autoPlay: {
        type: Boolean,
        default: true
      },
      interval: {
        type: Number,
        default: 4000
      }
    },
    mounted() {
      this.$nextTick(function() {
        this.setSliderWidth();
        this.initDots();
        this.initSlider();
        if (this.autoPlay) {
          this.setSliderAuto();
        }
      });
      /* 解决改变屏幕大小轮播图大小异常问题 */
      window.addEventListener('resize', () => {
        if (!this.slider) {
          return
        }
        this.setSliderWidth(true);
        this.slider.refresh();
      })
    },
    methods: {
      /**
       * @augments isResize flag
       *设置轮播子元素的类、宽以及父容器的宽
       * */
      setSliderWidth(isResize) {
        this.childrens = this.$refs.sliderGroup.children;
        var width = 0;
        var sliderWidth = this.$refs.slider.clientWidth;
        for (let i = 0; i < this.childrens.length; i++) {
          var child = this.childrens[i];
          child.style.width = sliderWidth + 'px';
          addClass(child, 'slider-item');
          width += sliderWidth;
        }
        if (this.loop && !isResize) {
          width += 2 * sliderWidth;
        }
        this.$refs.sliderGroup.style.width = width + 'px';
      },
      /* 初始化轮播图 */
      initSlider() {
        this.slider = new BetterScroll(this.$refs.slider, {
          scrollX: true,
          scrollY: false,
          momentum: false,
          snap: true,
          snapLoop: this.loop,
          snapThreshold: 0.3,
          snapSpeed: 400
        });
        // 监听scrollEnd事件 更改currenPageIndex 实现小圆点跟随 自动循环播放
        this.slider.on('scrollEnd', () => {
          let pageIndex = this.slider.getCurrentPage().pageX;
          if (this.loop) {
            pageIndex -= 1
          }
          this.currenPageIndex = pageIndex;
          if (this.autoPlay) {
            clearTimeout(this.timer);
            this.setSliderAuto();
          }
        })
      },
      /* 初始化导航点 */
      initDots() {
        this.dots = new Array(this.childrens.length);
      },
      /* 设置轮播图自动播放 */
      setSliderAuto() {
        let PageIndex = this.slider.getCurrentPage().pageX + 1;
        this.timer = setTimeout(() => {
          this.slider.goToPage(PageIndex, 0, 400)
        }, 2000);
      }
    },
    deactivated () {
      clearTimeout(this.timer);
    },
    activated () {
      this.setSliderAuto();
    }
  }
</script>

<style lang="scss">
  @import '../../common/style/variable.scss';
  // 轮播图样式
  .slider {
    min-height: 1px;
    .slider-group {
      position: relative;
      overflow: hidden;
      white-space: nowrap;
      .slider-item {
        float: left;
        box-sizing: border-box;
        overflow: hidden;
        text-align: center;
        a {
          display: block;
          width: 100%;
          overflow: hidden;
          text-decoration: none;
          img {
            display: block;
            width: 100%;
          }
        }
      }
    }
    // 轮播图导航样式
    .dots {
      position: absolute;
      right: 0;
      left: 0;
      bottom: 12px;
      text-align: center;
      font-size: 0;
      .dot {
        display: inline-block;
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
  }
</style>

