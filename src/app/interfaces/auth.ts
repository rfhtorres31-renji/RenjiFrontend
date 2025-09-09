export interface RegisterRequest {
    firstname: string;
    lastname: string;
    email: string;
    departmentId: string,
    password: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}