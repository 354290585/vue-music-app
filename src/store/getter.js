export const singer = state => state.singer

export const playing = state => state.playing

export const fullScreen = state => state.fullScreen

export const playlist = state => state.playList

export const sequenceList = state => state.sequenceList

export const mode = state => state.mode

export const currentIndex = state => state.currentIndex

export const progressWidth = state => state.progressWidth
export const currentSong = (state) => {
  return state.playList[state.currentIndex] || {}
}
export const disc = (state) => {
  return state.disc
}
export const topList = (state) => state.topList
export const searchHistory = state => state.searchHistory
export const playHistory = state => state.playHistory
export const favoriteList = state => state.favoriteList

