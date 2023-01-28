import Application from 'koa';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import Index, { getProps } from './pages';

import 'cross-fetch/polyfill';
import als from './service/asyncstorage';

const app = new Application();

const port = 3000;

app.use((ctx, next) => {
    if (ctx.url === '/api') {
        ctx.body = {
            cookie: ctx.req.headers.cookie,
        };
        return;
    }
    return next();
});

app.use((ctx) => {
    return als.run(
        {
            req: ctx.request,
            res: ctx.res,
        },
        async () => {
            const props = await getProps();
            ctx.body = renderToString(createElement(Index, props));
        }
    );
});

app.listen(port, () => {
    console.log(`server start at http://localhost:${port}/`);
});
