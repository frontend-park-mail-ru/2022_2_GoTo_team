export default class Router {
    routes: { path: RegExp | string, handler: any }[] = [];
    root: string = '/';
    #current: string;

    constructor(options: any) {
        if (options.root) this.root = options.root;
        this.#current = '/';
        this.listen();
    }

    add = (path: RegExp | string, handler: any) => {
        this.routes.push({path, handler});
        return this;
    };

    remove = (path: string) => {
        for (let i = 0; i < this.routes.length; i += 1) {
            if (this.routes[i].path === path) {
                this.routes.slice(i, 1);
                return this;
            }
        }
        return this;
    };

    flush = () => {
        this.routes = [];
        return this;
    };

    clearSlashes = (path: string) =>
        path.toString()
            .replace(/\/$/, '')
            .replace(/^\//, '');

    getFragment = () => {
        let fragment = '';
        const match = window.location.href.match(/#(.*)$/);
        fragment = match ? match[1] : '';
        return this.clearSlashes(fragment);
    };

    listen = () => {
        // @ts-ignore
        clearInterval(this.interval);
        // @ts-ignore
        this.interval = setInterval(this.interval, 50);
    };

    interval: () => any = () => {
        console.log(this.#current)
        if (this.#current === this.getFragment()) return;
        this.#current = this.getFragment();
        this.routes.some(route => {
            const match = this.#current.match(route.path);
            if (match) {
                match.shift();
                route.handler.apply({}, match);
                return match;
            }
            return false;
        });
    };
}