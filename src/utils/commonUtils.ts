export function debounce(fn: Function, delay: number) {
  if (typeof fn !== 'function') {
    // 参数类型为函数
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
  if (typeof fn !== 'function') {
    // 参数类型为函数
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
    }, delay);
  };
}

export function uuid(len: number = 16, radix?: number): string {
  let chars: string[] = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  let uuid: string[] = [];
  let i: number = 0;
  let radixS = radix || chars.length;

  if (len) {
    for (i = 0; i < len; i++) {
      uuid[i] = chars[0 | Math.random() * radixS];
    }
  } else {
    let r: number;
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | Math.random() * 16;
        uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r];
      }
    }
  }

  return uuid.join('');
}
