import als from './asyncstorage';

const isNodeJSRuntime = typeof window === 'undefined' && typeof document === 'undefined';

class Http {
    constructor(public withCookies: boolean = false) {}
    getCookie() {
        // nodejs runtime
        if (isNodeJSRuntime) {
            const { req } = als.getStore() as any;
            return req.headers.cookie;
        }
        // broswer
        return document.cookie;
    }

    fetch(input: RequestInfo | URL, init?: RequestInit) {
        return fetch(input, init).then((res) => res.json());
    }

    get(input: RequestInfo | URL, init?: RequestInit) {
        if (this.withCookies && isNodeJSRuntime) {
        }
        return this.fetch(input, this.getRequestInitWithCookie(init));
    }

    getRequestInitWithCookie(init?: RequestInit): RequestInit {
        if (!init) {
            return {
                headers: {
                    cookie: this.getCookie(),
                },
            };
        }
        return {
            ...init,
            headers: {
                ...init.headers,
                cookie: this.getCookie(),
            },
        };
    }
}

export default Http;
