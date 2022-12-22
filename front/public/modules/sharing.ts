export type OpenGraphData = {
    title: string,
    description?: string,
    url: string,
    image?: string,
    type: 'article' | 'profile',
    profile_username?: string,
}

export class OpenGraphHelper{
    static makeGraph(data: OpenGraphData) {
        let meta: HTMLMetaElement | null;
        let value: string | undefined;

        value = 've.ru - новостно-развлекательный портал';
        meta = document.querySelector('meta[property="og:site_name"]');
        if (meta === null) {
            OpenGraphHelper.#addMetaTag('og:site_name', value);
        } else {
            OpenGraphHelper.#updateMetaTag(meta, value);
        }
        /*
        value = data.title;
        meta = document.querySelector('meta[property="og:title"]');
        if (meta === null) {
            OpenGraphHelper.#addMetaTag('og:title', value);
        } else {
            OpenGraphHelper.#updateMetaTag(meta, value);
        }
        */
        value = data.description;
        if (value !== undefined) {
            meta = document.querySelector('meta[property="og:description"]');
            if (meta === null) {
                OpenGraphHelper.#addMetaTag('og:description', value);
            } else {
                OpenGraphHelper.#updateMetaTag(meta, value);
            }
        }

        value = data.url;
        meta = document.querySelector('meta[property="og:url"]');
        if (meta === null) {
            OpenGraphHelper.#addMetaTag('og:url', value);
        } else {
            OpenGraphHelper.#updateMetaTag(meta, value);
        }

        value = data.image;
        meta = document.querySelector('meta[property="og:image"]');
        if (value !== undefined) {
            if (meta === null) {
                OpenGraphHelper.#addMetaTag('og:image', value);
            } else {
                OpenGraphHelper.#updateMetaTag(meta, value);
            }
        }

        value = data.type;
        meta = document.querySelector('meta[property="og:type"]');
        if (meta === null) {
            OpenGraphHelper.#addMetaTag('og:type', value);
        } else {
            OpenGraphHelper.#updateMetaTag(meta, value);
        }
    }

    static #addMetaTag(name: string, content: string) {
        const meta = document.createElement('meta');
        meta.setAttribute('property', name);
        meta.setAttribute('content', content);
        document.getElementsByTagName('head')[0].appendChild(meta);
    }

    static #updateMetaTag(tag: HTMLMetaElement, content: string) {
        tag.setAttribute('property', content);
    }
}
