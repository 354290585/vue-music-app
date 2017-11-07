import originJSONP from 'jsonp'
/**
 *使用promist包装jsonp
 * @export function
 * @param {any} url
 * @param {any} data
 * @param {any} option
 * @return Promise
 */
export default function jsonp (url, data, option) {
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data);
  return new Promise((resolve, reject) => {
    originJSONP(url, option, (err, data) => {
      if (!err) {
        resolve(data);
      } else {
        reject(err);
      }
    })
  })
}

/**
 * 遍历data 拼接查询字符串
 * @param {any} data
 * @returns url
 */
function param (data) {
  let url = '';
  for (var key in data) {
    let val = data[key] === 'undefined' ? '' : data[key];
    url += `&${key}=${encodeURIComponent(val)}`;
  }
  return url ? url.substring(1) : ' ';
}
