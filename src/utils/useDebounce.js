export default function throttle(fn, delay=200) {
    let timerId = null;
    return function(...args) {
        clearTimeout(timerId);
        timerId = setTimeout(()=>{
            fn(...args);
        },delay);
    };
}