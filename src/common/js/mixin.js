import {mapGetters, mapMutations, mapActions} from 'vuex'
import playMode from 'common/js/config'
import { shuffle } from 'common/js/util'
export const playListMixin = {
  computed: {
    ...mapGetters([
      'playlist'
    ])
  },
  mounted() {
    this.handlePlayList(this.playlist);
  },
  activated() {
    this.handlePlayList(this.playlist);
  },
  methods: {
    handlePlayList() {
      throw new Error('component must implement handlePlaylist method')
    }
  },
  watch: {
    playlist(newVal) {
      this.handlePlayList(newVal);
    }
  }
}
export const playerMixin = {
  computed: {
    ...mapGetters([
      'sequenceList',
      'currentSong',
      'mode',
      'playlist',
      'favoriteList'
    ]),
    iconMode() {
      return this.mode === playMode.sequence ? 'icon-sequence' : this.mode === playMode.loop ? 'icon-loop' : 'icon-random'
    }
  },
  methods: {
  // 切换播放模式
    changeMode() {
      const mode = (this.mode + 1) % 3
      this.setPlayMode(mode);
      let list = null;
      if (mode === playMode.random) {
        list = shuffle(this.sequenceList);
      } else {
        list = this.sequenceList
      }
      this.resetCurrentIndex(list);
      this.setPlayList(list);
    },
    // 切换播放模式后  重新设置ID
    resetCurrentIndex(list) {
      let index = list.findIndex((item) => {
        return item.id === this.currentSong.id;
      })
      this.setCurrentIndex(index);
    },
    toggleFavorite(song) {
      if (this.isFavorite(song)) {
        this.deleteFavoriteList(song)
      } else {
        this.saveFavoriteList(song)
      }
    },
    getFavoriteIcon(song) {
      if (this.isFavorite(song)) {
        return 'icon-favorite'
      }
      return 'icon-not-favorite'
    },
    isFavorite(song) {
      const index = this.favoriteList.findIndex((item) => {
        return item.id === song.id
      })
      return index > -1
    },
    ...mapMutations({
      setPlayingState: 'SET_PLAYING',
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setPlayList: 'SET_PLAYLIST',
      setPlayMode: 'SET_PLAY_MODE'
    }),
    ...mapActions([
      'saveFavoriteList',
      'deleteFavoriteList'
    ])
  }
}

export const searchMixin = {
  data() {
    return {
      query: '',
      refreshDelay: 120
    }
  },
  computed: {
    ...mapGetters([
      'searchHistory'
    ])
  },
  methods: {
    onQueryChange(query) {
      this.query = query
    },
    blurInput() {
      this.$refs.searchBox.blur()
    },
    // 点击回填搜索框
    addQuery(query) {
      this.$refs.searchBox.setQuery(query);
    },
    saveSearch() {
      this.saveSearchHistory(this.query);
    },
    ...mapActions([
      'saveSearchHistory',
      'deleteSearchHistory'
    ])
  }
}
