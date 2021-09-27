
/**
 * 
 * @param a firstnumber
 * @param b secondnumber
 * @returns sum
 */
export const sum = (a: number, b: number) => {
  if ('development' === process.env.NODE_ENV) {
    console.log('boop');
  }
  return a + b;
};
