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

export function getUserByIdQueryOptions(userId: string) {
    return queryOptions({
        queryKey: usersQueryKeys.details(),
        queryFn: () => fetchData({ url: `/users/${userId}` }),
    });
}

export function getCurrentUser() {
    return queryOptions({
        queryKey: usersQueryKeys.all(),
        queryFn: () => fetchData({ url: `/api/users/me` }),
    });
}
