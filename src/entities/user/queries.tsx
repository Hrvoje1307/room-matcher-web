import { USER_QUERY_KEYS } from "@/shared/consts/consts";
import { fetchData } from "@/shared/hooks/fetchData";
import { queryOptions } from "@tanstack/react-query";

export const usersQueryKeys = {
    all() {
        return [USER_QUERY_KEYS] as const;
    },
    lists() {
        return [...this.all(), "list"] as const;
    },
    list(userId: string) {
        return [...this.lists(), userId] as const;
    },
    details() {
        return [...this.all(), "details"] as const;
    },
    detail(userId: string) {
        return [...this.details(), userId] as const;
    },
};

export interface AppUserResponse {
    id: number;
    username: string;
    name: string;
    email: string;
    gender: "MALE" | "FEMALE" | "OTHER";
    bio: string;
    dateOfBirth: string;
    profileImageUrl: string;
    registrationDate: string;
}

export interface UpdateUserRequest {
    name: string;
    username: string;
    email: string;
    gender: "MALE" | "FEMALE" | "OTHER";
    bio: string;
    dateOfBirth: string;
    profileImageUrl: string;
    currentPassword?: string;
    newPassword?: string;
}

export function getUserByIdQueryOptions(userId: string) {
    return queryOptions({
        queryKey: usersQueryKeys.details(),
        queryFn: () => fetchData({ url: `/users/${userId}` }),
    });
}

export function getCurrentUser() {
    return queryOptions({
        queryKey: usersQueryKeys.all(),
        queryFn: () => fetchData({ url: `/api/users/me` }) as Promise<AppUserResponse>,
    });
}

export function updateUserMutationOptions() {
    return {
        mutationFn: (data: UpdateUserRequest) =>
            fetchData({ url: "/api/users/me", method: "PUT", body: data }) as Promise<AppUserResponse>,
    };
}
