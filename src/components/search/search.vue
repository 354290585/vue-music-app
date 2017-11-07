<template>
  <div class="search">
    <div class="search-box-wrapper">
      <search-box ref="searchBox" @query="onQueryChange"></search-box>
    </div>
    <div class="shortcut-wrapper" ref="shortcutWrapper"  v-show="!query">
      <scroll :data="shortcutList" class="shortcut" ref="shortcut" :refreshDelay="refreshDelay">
        <div>
          <div class="hot-key">
            <h1 class="title">热门搜索</h1>
            <ul>
              <li class="item" @click="addQuery(item.k)" v-for="item in hotKey">
                <span>{{item.k}}</span>
              </li>
            </ul>
          </div>
          <div class="search-history" v-show="searchHistory.length">
              <h1 class="title">
                <span class="text">搜索历史</span>
                <span class="clear" @click="showConfirm">
                  <i class="icon-clear"></i>
                </span>
              </h1>
              <search-list @select="addQuery" @deleteItem="deleteSearchHistory" :searches="searchHistory"></search-list>
          </div>
        </div>
      </scroll>
    </div>
    <div class="search-result" v-show="query" ref="searchResult">
      <search-result ref="suggest" :query="query" @listScroll="blurInput" @select="saveSearch"></search-result>
    </div>
    <confirm ref="confirm" @confirm="clearSearchHistory" text="是否清空所有搜索历史" confirmBtnText="清空"></confirm>
    <router-view></router-view>
  </div>
</template>

<script>
  import searchBox from 'base/search-box/search-box';
  import scroll from 'base/scroll/scroll'
  import { _getHostKey } from 'api'
  import { ERR_OK } from 'api/config'
  import searchResult from 'components/search-result/search-result'
  import searchList from 'base/search-history/search-history'
  import { mapActions } from 'vuex'
  import Confirm from 'base/confirm/confirm'
  import { playListMixin, searchMixin } from 'common/js/mixin'
  export default {
    mixins: [playListMixin, searchMixin],
    data() {
      return {
        hotKey: []
      }
    },
    computed: {
      shortcutList() {
        return this.hotKey.concat(this.searchHistory)
      }
    },
    created() {
      this.getHostKey();
    },
    methods: {
      ...mapActions([
        'clearSearchHistory'
      ]),
      handlePlayList(playlist) {
        const bottom = playlist.length > 0 ? '60px' : ''
        this.$refs.searchResult.style.bottom = bottom
        this.$refs.suggest.refresh()

        this.$refs.shortcutWrapper.style.bottom = bottom
        this.$refs.shortcut.refresh()
      },
      showConfirm() {
        this.$refs.confirm.show()
      },
      onQueryChange(query) {
        this.query = query
      },
      // 获取热门搜索
      getHostKey() {
        _getHostKey().then((res) => {
          if (res.code === ERR_OK) {
            this.hotKey = res.data.hotkey.slice(0, 11)
          }
        })
      }
    },
    watch: {
      query(newQuery) {
        if (!newQuery) {
          setTimeout(() => {
            this.$refs.shortcut.refresh()
          }, 20)
        }
      }
    },
    components: {
      searchBox,
      scroll,
      searchResult,
      searchList,
      Confirm
    }
  }
</script>

<style lang="scss">
  @import "../../common/style/variable.scss";
  @import "../../common/style/mixin.scss";
  .search {
    .search-box-wrapper {
      margin: 20px;
    }
    .shortcut-wrapper {
      position: fixed;
      top: 178px;
      bottom: 0;
      width: 100%;
      .shortcut {
        height: 100%;
        overflow: hidden;
        .hot-key {
          margin: 0 20px 20px 20px;
          .title {
            margin-bottom: 20px;
            font-size: 14px;
            color: $color-text-l;
          }
          .item {
            display: inline-block;
            padding: 5px 10px;
            margin: 0 20px 10px 0;
            border-radius: 6px;
            background: $color-highlight-background;
            font-size: 14px;
            color: $color-text-d;
          }
        }
        .search-history {
          position: relative;
          margin: 0 20px;
          .title {
            display: flex;
            align-items: center;
            height: 40px;
            font-size: $font-size-medium;
            color: $color-text-l;
            .text {
              flex: 1;
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
      }
    }
    .search-result {
      position: fixed;
      width: 100%;
      top: 178px;
      bottom: 0;
    }
  }
</style>

