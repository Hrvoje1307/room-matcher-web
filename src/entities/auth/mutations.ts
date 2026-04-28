import { fetchData } from "@/shared/hooks/fetchData";

export interface AuthRequest {
    username: string;
    password: string;
}

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
}

export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
    name: string;
}

export function loginMutationOptions() {
    return {
        mutationFn: (data: AuthRequest) =>
            fetchData({ url: "/api/auth/login", method: "POST", body: data }) as Promise<AuthResponse>,
    };
}

export function registerMutationOptions() {
    return {
        mutationFn: (data: RegisterRequest) =>
            fetchData({ url: "/api/auth/register", method: "POST", body: data }),
    };
}
