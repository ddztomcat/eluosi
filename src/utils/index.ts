export function isPhone() {
  let ua = navigator.userAgent;
  console.log(ua)
  if(/android|ios|iphone/i.test(ua)) {
    return true
  }else {
    return false
  }
}
export function bingEvent(target: HTMLElement, en: string, f: any, p: boolean = false) {
  target.addEventListener(en, f, p)
}