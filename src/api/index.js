import JSONP from 'common/js/jsonp'
import {
  commonParams,
  options
} from 'api/config';
import axios from 'axios'

/**
 * 获取推荐页轮播图数据
 * @export function
 * @returns promiseData
 */
export function _getSlideData() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';
  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  });
  return JSONP(url, data, options);
}
/**
 *获取为你推荐歌曲数据
 * @export function
 * @returns promiseData
 */
export function _getRecommendList() {
  const url = 'api/getRecommendList';
  const data = Object.assign({}, commonParams, {
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    format: 'json'
  });
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
/**
 *获取歌手数据
 * @export function
 * @returns promiseData
 */
export function _getsinger() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg';

  const data = Object.assign({}, commonParams, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq'
  });
  const data2 = Object.assign({}, commonParams, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 2,
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq'
  })
  const data3 = Object.assign({}, commonParams, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 3,
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq'
  })
  return Promise.all([JSONP(url, data, options), JSONP(url, data2, options), JSONP(url, data3, options)]);
}
/**
 * 获取歌手详情数据
 * @export function
 * @param {any} singerId
 * @return promiseData
 */
export function _getSingerDetail(singerId) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg';
  const data = Object.assign({}, commonParams, {
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq',
    order: 'listen',
    begin: 0,
    num: 80,
    songstatus: 1,
    singermid: singerId
  });
  return JSONP(url, data, options);
}
/**
 * 获取歌词
 * @export function
 * @param {any} mid
 * @returns promise
 */
export function getLyric(mid) {
  const url = 'api/lyric';
  const data = Object.assign({}, commonParams, {
    songmid: mid,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    categoryId: 10000000,
    pcachetime: +new Date(),
    format: 'json'
  });
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data);
  })
}
/**
 * 推荐歌曲详情
 * @export function
 * @param {any} disstid
 * @returns promise
 */
export function _getDisc(disstid) {
  var url = 'api/disc';
  const data = Object.assign({}, commonParams, {
    disstid,
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    format: 'json'
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data);
  })
}
/**
 *
 * @export function
 * @returns promise
 */
export function _getTopList() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'
  const data = Object.assign({}, commonParams, {
    uin: 0,
    needNewCode: 1,
    platform: 'h5'
  })
  return JSONP(url, data, options)
}
/**
 *
 * @export function
 * @param {any} topid
 * @returns promise
 */
export function _getTopMusicList(topid) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'
  const data = Object.assign({}, commonParams, {
    topid,
    needNewCode: 1,
    uin: 0,
    tpl: 3,
    page: 'detail',
    type: 'top',
    platform: 'h5'
  })
  return JSONP(url, data, options)
}
/**
 * 获取热门搜索
 * @export function
 * @returns promise
 */
export function _getHostKey() {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg';
  const data = Object.assign({}, commonParams, {
    uin: 0,
    needNewCode: 1,
    platform: 'h5'
  })
  return JSONP(url, data, options)
}
/**
 * 搜索
 * @export function
 * @param {any} query
 * @param {any} page
 * @param {any} zhida
 * @param {any} perpage
 * @returns promise
 */
export function _search(query, page, zhida) {
  const url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp'
  const data = Object.assign({}, commonParams, {
    w: query,
    p: page,
    perpage: 20,
    n: 20,
    catZhida: zhida ? 1 : 0,
    zhidaqu: 1,
    t: 0,
    flag: 1,
    ie: 'utf-8',
    sem: 1,
    aggr: 0,
    remoteplace: 'txt.mqq.all',
    uin: 0,
    needNewCode: 1,
    platform: 'h5'
  })
  return JSONP(url, data, options)
}

