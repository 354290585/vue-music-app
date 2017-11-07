import playMode from 'common/js/config.js'
import { loadSearchHistory, loadPlayHistory, loadFavorite } from 'common/js/localStorage'
const state = {
  singer: {},
  playing: false,
  fullScreen: false,
  playList: [],
  sequenceList: [],
  currentIndex: -1,
  mode: playMode.sequence, // 歌手
  progressWidth: null,
  disc: {},
  topList: {},
  searchHistory: loadSearchHistory(),
  playHistory: loadPlayHistory(),
  favoriteList: loadFavorite()
}
export default state
