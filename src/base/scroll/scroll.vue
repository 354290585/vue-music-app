<template>
  <div class="wrapper" ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
  import BetterScroll from 'better-scroll'
  export default {
    props: {
      probeType: {
        type: Number,
        default: 1
      },
      click: {
        type: Boolean,
        default: true
      },
      data: {
        type: Array,
        default: null
      },
      listenScroll: {
        type: Boolean,
        default: false
      },
      pullup: {
        type: Boolean,
        default: false
      },
      beforeScroll: {
        type: Boolean,
        default: false
      },
      refreshDelay: {
        type: Number,
        default: 20
      }
    },
    mounted() {
      this.$nextTick(function() {
        this.initScroll();
      })
    },
    methods: {
      /* 初始化slider */
      initScroll() {
        if (!this.$refs.wrapper) {
          return
        }
        this.scroll = new BetterScroll(this.$refs.wrapper, {
          probeType: this.probeType,
          click: this.click
        })
        if (this.listenScroll) {
          this.scroll.on('scroll', (pos) => {
            this.$emit('scroll', pos)
          })
        }
        if (this.pullup) {
          this.scroll.on('scrollEnd', () => {
            if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
              this.$emit('scrollEnd')
            }
          })
        }
        if (this.beforeScroll) {
          this.scroll.on('beforeScrollStart', () => {
            this.$emit('scrollStart')
          })
        }
      },
      /* 刷新scroll 重新计算宽高 */
      refresh() {
        this.scroll && this.scroll.refresh();
      },
      /* 启用 better-scroll, 默认 开启。 */
      enable() {
        this.scroll && this.scroll.enable();
      },
      /* 禁用 better-scroll */
      disable() {
        this.scroll && this.scroll.disable();
      },
      /* 滚动到指定位置 */
      scrollTo() {
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
      /* 滚动到指定的目标元素。 */
      scrollToElement() {
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      }
    },
    watch: {
      data () {
        setTimeout(() => {
          this.refresh();
        }, this.refreshDelay);
      }
    }
  }
</script>

<style lang="scss">

</style>

