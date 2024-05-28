export interface Comment {
    userId: number;
    articleId: number;
    content: string;
}
export interface CommentWithUserInfo {
    content: string;
    pseudo: string
    avatar: string;
}