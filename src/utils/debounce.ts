function debounceFunction(callback: (...args: any[]) => void, delay: number) {
  let timer: NodeJS.Timeout;

  return function (this: any, ...args: any[]) {
    const self = this;
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback.apply(self, args);
    }, delay);
  };
}

export { debounceFunction };