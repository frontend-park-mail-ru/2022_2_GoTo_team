export type RequestAnswer = {
    status: number,
    response: any,
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
    coAuthor?: {
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
    password?: string,
    avatar_link?: string,
}

export type UserHeaderData = {
    username: string,
    rating: number,
    subscribers: number,
    registration_date: string,
}

export type UserPlugData = {
    username: string,
    avatarUrl: string,
}

export type UserLoginData = {
    email: string,
    password: string,
}

export type UserRegistrationData = {
    email: string,
    login: string,
    username: string,
    password: string,
}

export type Listener = () => any;
