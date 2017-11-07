<template>
  <scroll ref="suggest" class="suggest" :data="result" :beforeScroll="true" :pullup="true" @scrollEnd="scrollEnd" @scrollStart="listScroll">
    <ul class="suggest-list">
      <li class="suggest-item" v-for="item in result" @click="selectItem(item)">
        <div class="avatar" v-if="item.type === 'singer'">
          <img width="38" height="38" :src="item.avatar2"/>
        </div>
        <div class="icon" v-if="!item.type">
          <i class="icon-music"></i>
        </div>
        <div class="name">
          <p class="text" v-html="`${item.name} - ${item.singer}`" v-if="!item.type"></p>
          <p class="text" v-html="`${item.name}&nbsp&nbsp&nbsp单曲：${item.songnum}&nbsp&nbsp专辑：${item.albumnum}`"  v-if="item.type === 'singer'"></p>
        </div>
      </li>
      <loading v-show="hasMore" title=""></loading>
    </ul>
    <div v-show="!hasMore && !result.length" class="no-result-wrapper">
      <no-result title="抱歉，暂无搜索结果"></no-result>
    </div>
  </scroll>
</template>

<script>
  import scroll from 'base/scroll/scroll';
  import { _search } from 'api'
  import { ERR_OK } from 'api/config'
  import { createSong } from 'common/js/song'
  import loading from 'base/loading/loading'
  import Singer from 'common/js/singer'
  import { mapMutations, mapActions } from 'vuex'
  import noResult from 'base/no-result/no-result.vue'
  export default {
    props: {
      showSinger: {
        type: Boolean,
        default: true
      },
      query: {
        type: String,
        deafault: ' '
      }
    },
    data() {
      return {
        page: 1,
        result: [],
        hasMore: false
      }
    },
    methods: {
      ...mapMutations({
        setSinger: 'SET_SINGER'
      }),
      ...mapActions([
        'insertSong'
      ]),
      refresh() {
        this.$refs.suggest.refresh()
      },
      search() {
        this.page = 1
        this.hasMore = true
        this.$refs.suggest.scrollTo(0, 0)
        _search(this.query, this.page, this.showSinger).then((res) => {
          if (res.code === ERR_OK) {
            this.result = this.getResult(res.data)
            this.checkMore(res.data)
          }
        })
      },
      listScroll() {
        this.$emit('listScroll')
      },
      scrollEnd() {
        if (!this.hasMore) {
          return
        }
        this.page++
        _search(this.query, this.page, this.showSinger).then((res) => {
          if (res.code === ERR_OK) {
            this.result = this.result.concat(this.getResult(res.data))
            this.checkMore(res.data)
          }
        })
      },
      selectItem(item) {
        if (item.type === 'singer') {
          const singer = new Singer({
            id: item.singermid,
            name: item.singername
          })
          this.$router.push({
            path: `/search/${singer.id}`})
          this.setSinger(singer)
        } else {
          this.insertSong(item)
        }
        this.$emit('select', item)
      },
      getResult(data) {
        let ret = [];
        let id;
        if (this.result.length) {
          const index = this.result.findIndex((item) => {
            return item.type === 'singer'
          })
          if (index > -1) id = this.result[index].id;
        }
        if (data.zhida && data.zhida.singerid && data.zhida.singerid !== id) {
          // ret.push({...data.zhida, ...{type: 'singer'}})
          let singer = new Singer({id: data.zhida.singerid, name: data.zhida.singername, songnum: data.zhida.songnum, albumnum: data.zhida.albumnum, singermid: data.zhida.singermid});
          ret.push(Object.assign({}, singer, {type: 'singer'}))
        }
        if (data.song) {
          ret = ret.concat(this.nromalizeSongs(data.song.list))
        }
        return ret
      },
      nromalizeSongs(list) {
        let ret = [];
        list.forEach((item) => {
          if (item.songid && item.albummid) {
            ret.push(createSong(item))
          }
        })
        return ret
      },
      checkMore(data) {
        const song = data.song
        if (!song.list.length || (song.curpage * song.curnum) >= song.totalnum) {
          this.hasMore = false
        }
      },
      getIconCls(item) {
        if (item.type === 'singer') {
          return 'icon-mine'
        } else {
          return 'icon-music'
        }
      },
      getDisplayName(item) {
        if (item.type === 'singer') {
          return item.singername
        } else {
          return `${item.name}-${item.singer}`
        }
      }
    },
    watch: {
      query(newQuery) {
        this.search(newQuery)
      }
    },
    components: {
      scroll,
      loading,
      noResult
    }
  }
</script>

<style lang="scss">
  @import "../../common/style/variable.scss";
  @import "../../common/style/mixin.scss";
  .suggest {
    height: 100%;
    overflow: hidden;
    .suggest-list {
      padding: 0 30px;
      .suggest-item {
        display: flex;
        align-items: center;
        padding-bottom: 20px;
      }
      .avatar{
        flex: 0 0 49px;
        width: 30px;
        margin-left: -8px;
        img{
          border-radius:30px
        }
      }
      .icon {
        flex: 0 0 40px;
        width: 30px;
        [class^="icon-"] {
          font-size: 20px;
          color: $color-text-d;
        }
      }
      .name {
        flex: 1;
        font-size: $font-size-medium;
        color: $color-text-d;
        overflow: hidden;
        .text {
          font-size: 15px;
          @include no-wrap();
        }
      }
    }
    .no-result-wrapper {
      position: absolute;
      width: 100%;
      top: 25%;
      transform: translateY(-50%);
    }
  }
</style>

