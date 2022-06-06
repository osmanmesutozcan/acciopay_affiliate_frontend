export const poll = async function <T>(
  fn: () => T | Promise<T>,
  fnCondition: (result: T) => boolean,
  ms: number
) {
  let result = await fn();
  let i = 0;

  while (!fnCondition(result)) {
    await wait(ms);
    result = await fn();
    i++

    if (i === 10) {
      break;
    }
  }

  return result;
};

export const wait = function (ms = 1000) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};
