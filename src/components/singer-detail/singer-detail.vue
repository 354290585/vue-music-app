<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script>
  import musicList from 'components/music-list/music-list'
  import { _getSingerDetail } from 'api'
  import { mapGetters } from 'vuex'
  import { ERR_OK } from 'api/config'
  import { createSong } from 'common/js/song'
  export default {
    data() {
      return {
        songs: []
      }
    },
    computed: {
      title() {
        return this.singer.name
      },
      bgImage() {
        return this.singer.avatar
      },
      ...mapGetters([
        'singer'
      ])
    },
    created() {
      this.getSingerDetail();
    },
    methods: {
      // 获取歌手详情数据
      getSingerDetail() {
        if (!this.singer.id) {
          this.$router.push('/singer')
          return;
        }
        _getSingerDetail(this.singer.id).then((res) => {
          if (res.code === ERR_OK) {
            this.songs = this.normalizeSongs(res.data.list)
          }
        })
      },
      // 过滤得到的数据
      normalizeSongs(data) {
        let ret = [];
        data.forEach((item) => {
          let {musicData} = item;
          if (musicData.songid && musicData.albummid) {
            ret.push(createSong(musicData));
          }
        })
        return ret;
      }
    },
    components: {
      musicList
    }
  }
</script>

<style lang="scss">
  .slide-enter-active,
  .slide-leave-active {
    transition: all .3s
  }
  .slide-enter,
  .slide-leave-to {
    transform: translate3d(100%, 0, 0)
  }
</style>

