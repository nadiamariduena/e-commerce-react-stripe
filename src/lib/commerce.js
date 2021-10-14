import Commerce from '@chec/commerce.js';

export const commerce = new Commerce(process.env.REACT_APP_CHEC_PUBLIC_KEY, true);
//
// here below we are creating a new instance of that specific commerce,
// and that is going to be our store
// export const commerce = new Commerce(
//   process.env.REACT_APP_CHEC_PUBLIC_KEY,
//   true
// );
