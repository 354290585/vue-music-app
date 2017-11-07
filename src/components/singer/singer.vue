<template>
  <div class="singer" ref="singer">
    <list-view :data="singerList" @select="selectSinger" ref="list"></list-view >
    <router-view></router-view>
  </div>
</template>

<script>
  import ListView from 'base/list-view/list-view'
  import {
    _getsinger
  } from 'api'
  import {
    ERR_OK
  } from 'api/config'
  import Singer from 'common/js/singer.js'
  import { playListMixin } from 'common/js/mixin'
  const HOT_SINGER_LEN = 10;
  const HOT_NAME = '热门';
  export default {
    mixins: [playListMixin],
    data() {
      return {
        singerList: []
      }
    },
    created() {
      this.getSingerList();
    },
    methods: {
      handlePlayList(playlist) {
        const bottom = playlist.length > 0 ? '60px' : ''
        this.$refs.singer.style.bottom = bottom
        this.$refs.list.refresh()
      },
      /* 获取歌手ID 使用vuex保存起来 跳转到歌手详情页 */
      selectSinger(singer) {
        this.$router.push({
          path: `/singer/${singer.id}`
        })
        this.$store.commit('SET_SINGER', singer)
      },
      /* 获取歌手数据 */
      getSingerList() {
        _getsinger().then((res) => {
          if (res[0].code === ERR_OK && ERR_OK === res[1].code) {
            var data = res[0].data.list.concat(res[1].data.list, res[2].data.list);
            this.singerList = this.normalizeSinger(data);
          }
        })
      },
      /* 处理获取到的歌手数据 */
      normalizeSinger(list) {
        let map = {
          hot: {
            title: HOT_NAME,
            items: []
          }
        };
        list.forEach((item, index) => {
          if (index < HOT_SINGER_LEN) {
            map.hot.items.push(new Singer({
              id: item.Fsinger_mid,
              name: item.Fsinger_name
            }));
          }
          if (!map[item.Findex]) {
            map[item.Findex] = {
              title: item.Findex,
              items: []
            }
          }
          map[item.Findex].items.push(new Singer({
            id: item.Fsinger_mid,
            name: item.Fsinger_name
          }))
        })
        // 遍历得到的数据是无序的，下面处理成数组有序结构
        let hot = [];
        let alphabet = [];
        let rests = [];
        for (let key in map) {
          let val = map[key];
          if (val.title === HOT_NAME) {
            hot.push(val)
          }
          if (val.title.match(/[a-zA-Z]/)) {
            alphabet.push(val)
          }
          if (val.title === '9') {
            val.title = '#';
            rests.push(val)
          }
        }
        alphabet.sort((a, b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })
        return hot.concat(alphabet, rests);
      }
    },
    components: {
      ListView
    }
  }
</script>

<style lang="scss">
  .singer{
    position: fixed;
    top: 88px;
    bottom: 0;
    width: 100%;
  }
</style>

