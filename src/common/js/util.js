export function getRandomInt(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
export function shuffle(arr) {
  let _arr = arr.slice()
  for (let i = 0; i < arr.length; i++) {
    let random = getRandomInt(0, i);
    let temp = _arr[i];
    _arr[i] = _arr[random];
    _arr[random] = temp
  }
  return _arr
}
export function debounce(fn, delay) {
  let timer;
  return function(...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(function() {
      fn.apply(this, args)
    }, delay);
  }
}
