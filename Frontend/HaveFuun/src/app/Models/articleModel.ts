import { CommentWithUserInfo } from "./commentModel";

export interface Article {
    name: string;
    description: string;
    tags: string;
    avatar: string;
}
export interface ArticleAll {
    ID_article: number
    name: string;
    description: string;
    tags: string;
    avatar: string;
}
export interface ArticleWithComments {
    article: ArticleAll;
    commentInfoByArticle: CommentWithUserInfo[]
}