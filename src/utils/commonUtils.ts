/* eslint-disable */
export function debounce(fn: Function, delay: number) {
  if (typeof fn !== 'function') {
    // 参数类型为函数
    throw new TypeError('fn is not a function');
  }
  let timer: number | null; // 维护一个 timer
  return function () {
    let args = arguments;
    if (timer) {
      clearTimeout(timer);
    }
    // @ts-ignore
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
  let firstTime: boolean = true;
  let timer: number | null;
  return function () {
    let args = arguments;
    if (firstTime) {
      // @ts-ignore
      fn.apply(this, args);
      firstTime = false;
      return false;
    }
    if (timer) {
      return false;
    }
    // @ts-ignore
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

export function setLocal(key: string, data?: any) {
  if (!data) localStorage.removeItem(key);
  let localData = data;
  if (typeof data !== "string") {
    localData = JSON.stringify(data);
  }
  localStorage.setItem(key, localData);
}

export function isObject(data: any): boolean {
  return Object.prototype.toString.call(data) === '[object Object]';
}

export function hexToRgb(hex: string): string {
  return 'rgb(' + parseInt('0x' + hex.slice(1, 3)) + ',' + parseInt('0x' + hex.slice(3, 5))
    + ',' + parseInt('0x' + hex.slice(5, 7)) + ')';
}

//hex -> rgba
export function hexToRgba(hex:string, opacity: number): string {
  return 'rgba(' + parseInt('0x' + hex.slice(1, 3)) + ',' + parseInt('0x' + hex.slice(3, 5)) + ','
    + parseInt('0x' + hex.slice(5, 7)) + ',' + opacity + ')';
}

export function objectDeepClone(target: { [key: string]: any }, source: { [key: string]: any }) {
  if (!isObject(target)) {
    target = {};
  }
  for (const key in source) {
    if (isObject(source[key])) {
      !target[key] && (target[key] = {});
      objectDeepClone(target[key], source[key]);
    } else {
      if (!target[key] || target !== source[key]) {
        target[key] = source[key];
      }
    }
  }
}
