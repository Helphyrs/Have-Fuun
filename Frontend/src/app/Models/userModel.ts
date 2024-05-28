export interface User {
    pseudo: string;
    email: string;
    password: string;

}
export interface UserWithoutPassword {
    pseudo: string;
    email: string;
    avatar: string;
}
export interface Login {
    email: string;
    password: string;
}