export const debounce = (cb, timer) => {
  let timeout;
  return (...args) => {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => cb.apply(context, args), timer);
  };
};

export const debounceDelay = ({ theme }) => theme.global.debounceDelay;
