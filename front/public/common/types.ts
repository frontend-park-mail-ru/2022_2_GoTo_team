export type requestAnswer = {
    status: number,
    response: object,
}

export type IncompleteArticleData = {
    id: number,
    title: string,
    description: string,
    tags: string[],
    category: string,
    rating: number,
    comments: number,
    publisher: {
        login: string,
        username: string,
    },
    coverImgPath: string,
};

export type FullArticleData = {
    id: number,
    title: string,
    description: string,
    tags: string[],
    category: string,
    rating: number,
    comments: number,
    publisher: {
        login: string,
        username: string,
    },
    coverImgPath: string,
    content: string,
}

export type EditArticleData = {
    article?: FullArticleData,
    categories: object,
}

export type CategoryData = {
    name: string,
    description: string,
    subscribers: number,
}

export type UserData = {
    email: string,
    login?: string,
    username: string,
    avatar_link?: string,
}

export type UserHeaderData = {
    username: string,
    rating: number,
    subscribers: number,
    registration_date: string,
}

export type UserPlugData = {
    nickname: string,
    avatarUrl: string,
}

export type Listener = () => void;
