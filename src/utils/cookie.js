import Cookies from 'js-cookie';

export function set(key, value, expiresTime) {
  const seconds = expiresTime || 10 * 365 * 24 * 60 * 60; // 默认十年（即 不过期）

  const expires = new Date(new Date() * 1 + seconds * 1000);

  return Cookies.set(key, value, { expires: expires });
}

export function get(key) {
  return Cookies.get(key) || '';
}

export function remove(key) {
  return Cookies.remove(key) || '';
}
