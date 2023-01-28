import async_hooks from 'async_hooks';

const als = new async_hooks.AsyncLocalStorage();

export default als;
