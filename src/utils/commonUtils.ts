export function debounce(fn: Function, delay: number) {
  if (typeof fn !== 'function') { // 参数类型为函数
    throw new TypeError('fn is not a function');
  }
  let timer: number; // 维护一个 timer
  return function () {
    let args = arguments;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout( ()=> {
      // @ts-ignore
      fn.apply(this, args); // 用apply指向调用debounce的对象，相当于_this.fn(args);
    }, delay);
  };
}

export function throttle(fn: Function, delay: number) {
  if (typeof fn !== 'function') { // 参数类型为函数
    throw new TypeError('fn is not a function');
  }
  let timer: number | null;
  return function () {
    let args = arguments;
    if (timer) {
      return;
    }
    timer = setTimeout(() =>  {
      // @ts-ignore
      fn.apply(this, args);
      timer = null; // 在delay后执行完fn之后清空timer，此时timer为假，throttle触发可以进入计时器
    }, delay)
  }
}
