/**
 *添加类
 * @export function
 * @param {any} el DOM
 * @param {any} className class
 * @returns null
 */
export function addClass (el, className) {
  if (hasClass(el, className)) return;
  let classNames = el.className.split(' ');
  classNames.push(className);
  el.className = classNames.join(' ');
}
/**
 * 判断DOM是否有指定的class
 * @export function
 * @param {any} el DOM
 * @param {any} className class
 * @returns Boolean
 */
export function hasClass (el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)');
  return reg.test(el.className);
}
/**
 *设置或获取标签data
 * @export
 * @param {any} el
 * @param {any} name
 * @param {any} value
 * @returns result
 */
export function getData(el, name, value) {
  var dataName = 'data-' + name;
  if (value) {
    return el.setAttribute(dataName, value);
  }
  return el.getAttribute(dataName);
}

let elementStyle = document.createElement('div').style

let vendor = (() => {
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }

  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key
    }
  }

  return false
})()

export function prefixStyle(style) {
  if (vendor === false) {
    return false
  }

  if (vendor === 'standard') {
    return style
  }

  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}

