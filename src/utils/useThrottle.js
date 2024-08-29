
export default function throttle(fn, delay=200) {
    let timerId = null;
    return function(...args) {
        if(timerId){
            return;
        }
        fn(...args);
        timerId = setTimeout(()=>{
            timerId = null;
        },delay)
    };
}