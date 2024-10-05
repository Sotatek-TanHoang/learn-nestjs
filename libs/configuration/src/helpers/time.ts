/**
 *
 * @param amount amount of time to sleep
 * @param type unit of time for amount
 * @returns
 */
export const sleep = (amount: number, type: 'milis' | 'secs' | 'mins') => {
  let decimal = 1;
  if (type === 'milis') decimal *= 1;
  else if (type === 'secs') decimal *= 1000;
  else if (type === 'mins') decimal *= 1000 * 60;
  return new Promise(res => {
    setTimeout(() => {
      res(true);
    }, amount * decimal);
  });
};
