export {render} from '@testing-library/react/dist/@testing-library/react.pure.cjs.js';
export const wait = (time = 50) => new Promise(resolve => {
    setTimeout(() => resolve(), time);
});
