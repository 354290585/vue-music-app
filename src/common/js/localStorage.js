// 封装localStorage
const storage = {
  get: function(key) {
    return JSON.parse(window.localStorage.getItem(key))
  },
  set: function(key, val) {
    val = JSON.stringify(val);
    window.localStorage.setItem(key, val);
  }
}

const SEARCH_KEY = '_searchHistory_'; // search KEY
const maxLength = 15; // search 最大保存长度
const PLAYHISTORYKEY = '_playHistory_';
const playHistoryMaxLen = 300;
const FAVORITE_KEY = '_favorite_';
const FAVORITE_MAX_LEN = 300;
// 插入搜索项处理
function insertArray(arr, val, compare, maxLen) {
  const index = arr.findIndex(compare);
  if (index === 0) {
    return
  }
  if (index > 0) {
    arr.splice(index, 1);
  }
  arr.unshift(val);
  if (maxLength && arr.length > maxLength) {
    arr.pop()
  }
}
// 删除搜索项处理
function deleteArray(arr, compare) {
  const index = arr.findIndex(compare);
  if (index > -1) {
    arr.splice(index, 1)
  }
}
// 插入一条搜索项
export function saveSearchItem(query) {
  let searches = storage.get(SEARCH_KEY) || [];
  insertArray(searches, query, (item) => {
    return item === query
  }, maxLength)
  storage.set(SEARCH_KEY, searches);
  return searches;
}
// 删除一条搜索项
export function deleteSearchItem(query) {
  let searches = storage.get(SEARCH_KEY);
  deleteArray(searches, (item) => {
    return item === query
  })
  storage.set(SEARCH_KEY, searches);
  return searches;
}
// 清空搜索
export function clearSearch() {
  window.localStorage.removeItem(SEARCH_KEY)
  return []
}
// 获取searchHistory
export function loadSearchHistory() {
  return storage.get(SEARCH_KEY) || [];
}
// 获取播放历史
export function loadPlayHistory() {
  return storage.get(PLAYHISTORYKEY) || [];
}
// 添加一条播放历史
export function savePlayHistoryItem(song) {
  let playHistorys = storage.get(PLAYHISTORYKEY) || [];
  insertArray(playHistorys, song, (item) => {
    return song.id === item.id
  }, playHistoryMaxLen)
  storage.set(PLAYHISTORYKEY, playHistorys);
  return playHistorys
}
// 保存一条喜欢歌曲
export function saveFavorite(song) {
  let songs = storage.get(FAVORITE_KEY) || [];
  insertArray(songs, song, (item) => {
    return song.id === item.id
  }, FAVORITE_MAX_LEN)
  storage.set(FAVORITE_KEY, songs)
  return songs
}
// 删除一条喜欢歌曲
export function deleteFavorite(song) {
  let songs = storage.get(FAVORITE_KEY) || [];
  deleteArray(songs, (item) => {
    return item.id === song.id
  })
  storage.set(FAVORITE_KEY, songs)
  return songs
}
// 加载喜欢歌曲列表
export function loadFavorite() {
  return storage.get(FAVORITE_KEY) || [];
}

