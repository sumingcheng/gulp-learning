function throttle(func, delay) {
  let isThrottled = false; // 记录是否正在执行中
  let lastExecTime = 0; // 最近一次执行的时间戳
  
  // 返回一个节流后的函数
  return function (...args) {
    const now = Date.now(); // 获取当前时间戳
    
    if (isThrottled && (now - lastExecTime < delay)) {
      // 如果正在执行中且距上一次执行未超过 delay，则不执行
      return;
    }
    
    // 否则，设置计时器并执行函数
    clearTimeout(timerId);
    isThrottled = true;
    lastExecTime = now;
    const timerId = setTimeout(() => {
      func.apply(this, args);
      isThrottled = false;
    }, delay);
  }
}

function handleClick() {
  console.log('Button clicked');
}

const throttledClick = throttle(handleClick, 1000);

document.querySelector('button').addEventListener('click', throttledClick);
