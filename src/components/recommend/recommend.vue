<template>
  <div class="recommend" ref="recommend">
    <scroll ref="scroll" class="recommend-content" :data="recommendList">
      <div>
        <div class="slider-wrapper" v-if="sliderData.length">
          <slider>
            <div v-for="item in sliderData" :key="item.id">
              <a :href="item.linkUrl">
                <img :src="item.picUrl" @load="loadImg" class="needsclick">
              </a>
            </div>
          </slider>
        </div>
        <div class="recomment-list">
          <h2 class="list-title">热门歌单推荐</h2>
          <ul class="list-content">
            <li v-for="item in recommendList" :key="item.dissid" class="item" @click="selectItem(item)">
              <div class="icon">
                <img width="65px" height="62px" v-lazy="item.imgurl">
              </div>
              <div class="text">
                <h2 class="name" v-html="item.creator.name"></h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
     <div class="loading-container" v-show="!recommendList.length">
        <loading ></loading>
     </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script>
  import {
    _getSlideData,
    _getRecommendList
  } from 'api'
  import Slider from 'base/slider/slider'
  import {
    ERR_OK
  } from 'api/config'
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import { playListMixin } from 'common/js/mixin'
  import { mapMutations } from 'vuex'
  export default {
    mixins: [playListMixin],
    data() {
      return {
        sliderData: [],
        recommendList: []
      }
    },
    created() {
      this.getSlideData();
      this.getRecommendList();
    },
    methods: {
      // 实现mixin方法
      handlePlayList(playlist) {
        const bottom = playlist.length > 0 ? '60px' : ''
        this.$refs.recommend.style.bottom = bottom
        this.$refs.scroll.refresh()
      },
      /* 获取轮播图数据 */
      getSlideData() {
        _getSlideData().then((res) => {
          if (res.code === ERR_OK) {
            this.sliderData = res.data.slider
          }
        })
      },
      /* 获取为你推荐数据 */
      getRecommendList() {
        _getRecommendList().then((res) => {
          if (res.code === ERR_OK) {
            this.recommendList = res.data.list;
          }
        })
      },
      // 跳转到歌单页
      selectItem(item) {
        this.$router.push({
          path: `/recommend/${item.dissid}`
        })
        this.setDisc(item)
      },
      ...mapMutations({
        setDisc: 'SET_DISC'
      }),
      /* 解决轮播图未加载滚动不到底部问题 */
      loadImg() {
        if (!this.checkLoaded) {
          this.$refs.scroll.refresh();
          this.checkLoaded = true;
        }
      }
    },
    components: {
      Slider,
      Scroll,
      Loading
    }
  }
</script>

<style lang="scss">
  @import '../../common/style/variable.scss';
  @import '../../common/style/mixin.scss';
  .recommend {
    position: fixed;
    width: 100%;
    top: 88px;
    bottom: 0;
    .recommend-content {
      height: 100%;
      overflow: hidden;
      .slider-wrapper {
        position: relative;
        width: 100%;
        overflow: hidden;
      }
      .recomment-list {
        .list-title {
          height: 65px;
          line-height: 65px;
          text-align: center;
          font-size: $font-size-medium;
          color: $color-theme;
          margin: 0;
        }
        .list-content {
          margin: 0;
          padding-left: 25px;
          .item {
            display: flex;
            box-sizing: border-box;
            align-items: center;
            margin-bottom: 18px;
            .icon {
              flex: 0 0 60px;
              width: 60px;
              padding-right: 20px;
            }
            .text {
              display: flex;
              flex-direction: column;
              justify-content: center;
              flex: 1;
              line-height: 20px;
              overflow: hidden;
              font-size: $font-size-small-x;
              .name {
                margin: 0 0 10px 0;
                color: $color-text;
                font-size: $font-size-medium;
              }
              .desc {
                margin: 0;
                color: $color-text-d;
                @include no-wrap;
              }
            }
          }
        }
      }
      .loading-container {
        position: absolute;
        width: 100%;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
</style>

