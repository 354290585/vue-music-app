<template>
  <transition name="slide">
    <music-list :songs="songs" :title="title" :bgImage="bgImage"></music-list>
  </transition>
</template>

<script>
import musicList from 'components/music-list/music-list'
import { _getDisc } from 'api'
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
    ...mapGetters([
      'disc'
    ]),
    title() {
      return this.disc.dissname
    },
    bgImage() {
      return this.disc.imgurl
    }
  },
  created() {
    this.getDisc()
  },
  methods: {
    // 获取歌单数据
    getDisc() {
      if (!this.disc.dissid) {
        this.$router.push('/recommend')
        return
      }
      _getDisc(this.disc.dissid).then((res) => {
        if (res.code === ERR_OK) {
          this.songs = this.normalizeSongs(res.cdlist[0].songlist)
        }
      })
    },
    normalizeSongs(list) {
      let ret = [];
      list.forEach((item) => {
        if (item.songid && item.albumid) {
          ret.push(createSong(item))
        }
      })
      return ret
    }
  },
  components: {
    musicList
  }
}
</script>

<style>
  .slide-enter-active, .slide-leave-active{
    transition: all 0.3s
  }
  .slide-enter, .slide-leave-to{
    transform: translate3d(100%, 0, 0)
  }
</style>

