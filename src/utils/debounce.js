/**
 * @desc 函数防抖
 * @param fn 函数
 * @param timerDelay 延迟执行毫秒数
 * @param immediate true 表立即执行，false 表非立即执行
 */

export function debounce(fn, timerDelay, immediate) {
    let timer;
    return function() {
        let that = this;
        let args = arguments;

        if (timer) clearTimeout(timer);
        if (immediate) {
            var callNow = !timer;
            timer = setTimeout(() => {
                timer = null;
            }, timerDelay)
            if (callNow) fn.apply(that, args)
        } else {
            timer = setTimeout(function() {
                fn.apply(that, args)
            }, timerDelay);
        }
    }
}
