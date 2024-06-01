export interface Comment {
    articleId: number;
    content: string;
}
export interface CommentEdit {
    content: string;
}
export interface CommentWithUserInfo {
    content: string;
    pseudo: string
    avatar: string;
}
export interface CommentWithArticleName {
    content: string;
    name: string;
}