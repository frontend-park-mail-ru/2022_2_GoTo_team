export type RequestAnswer = {
    status: number,
    response: any,
}

type publisher = {
    login: string,
    username: string,
    avatar?: string
}

export type IncompleteArticleData = {
    id: number,
    title: string,
    description: string,
    tags: string[],
    category: string,
    rating: number,
    comments: number,
    publisher: publisher,
    coverImgPath: string,
    avatarImgPath: string,
};

export type FullArticleData = {
    id: number,
    title: string,
    description: string,
    tags: string[],
    category: string,
    rating: number,
    comments: number,
    publisher: publisher,
    coAuthor?: publisher,
    coverImgPath: string,
    content: string,
    avatarImgPath: string,
}

export type EditArticleData = {
    article?: FullArticleData,
    categories: object,
    tags: string[]
}

export type CategoryData = {
    name: string,
    description: string,
    subscribers: number,
    subscribed: boolean,
    avatarImgPath: string,
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
    login: string,
    rating: number,
    subscribers: number,
    registration_date: string,
    subscribed: boolean,
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

export type CommentaryData = {
    id: number,
    article: number,
    publisher?: publisher,
    parentType: string,
    parentId: number,
    rating: number,
    content: string,
}

export type RulesData = {
    content: string,
}

export type SearchData = {
    request?: string,
    author?: string,
    tags?: string[],
}

export type SearchHeaderData = {
    searchData: SearchData,
    tagList: string[],
}


export type Subscription = {
    element: Element,
    event: string,
    listener: EventListenerOrEventListenerObject
}

export type LikeData = {
    id: number,
    sign: number,
}

export type SharingData = {
    url: string,
}

export type ImgPostData = {
    url: string,
    body: any,
}
