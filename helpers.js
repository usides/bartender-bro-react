const debounce = function (fn, ms) {
  let timeout;
  return function (...args) {
    const fnCall = () => fn.call(this, ...args);

    clearTimeout(timeout);
    timeout = setTimeout(fnCall, ms);
  };
};

export { debounce };
