export interface User{
    nome: string;
    sobrenome: string;
    email: string
    username: string
    password: string
}


export interface LoginPayload {
    username?: string;
    email?: string;
    password: string;
}