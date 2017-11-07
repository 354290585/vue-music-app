<template>
  <transition name="slide">
      <music-list :title="title" :rank="true" :songs="songs" :bgImage="bgImage"></music-list>
  </transition>
</template>

<script>
import musicList from 'components/music-list/music-list'
import { mapGetters } from 'vuex'
import { _getTopMusicList } from 'api'
import { ERR_OK } from 'api/config'
import { createSong } from 'common/js/song'
export default {
  data() {
    return {
      songs: [],
      rank: true
    }
  },
  computed: {
    ...mapGetters([
      'topList'
    ]),
    title() {
      return this.topList.topTitle
    },
    bgImage() {
      if (this.songs.length) {
        return this.songs[0].image
      }
      return ''
    }
  },
  created() {
    this.getTopMusicList()
  },
  methods: {
    getTopMusicList() {
      _getTopMusicList(this.topList.id).then((res) => {
        if (res.code === ERR_OK) {
          this.songs = this.normalizeSongs(res.songlist)
        }
      })
    },
    normalizeSongs(list) {
      var ret = [];
      list.forEach((item) => {
        if (item.data.songid && item.data.albumid) {
          ret.push(createSong(item.data))
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
  .slide-enter-active, .slide-leave-active{
    transition: all 0.3s ease
  }
  .slide-enter, .slide-leave-to{
    transform: translate3d(100%, 0, 0)
  }
</style>

