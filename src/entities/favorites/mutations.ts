import { fetchData } from "@/shared/hooks/fetchData";

export function addFavoriteMutationOptions() {
    return {
        mutationFn: (listingId: number) =>
            fetchData({ url: `/api/favorites/${listingId}`, method: "POST" }),
    };
}

export function removeFavoriteMutationOptions() {
    return {
        mutationFn: (listingId: number) =>
            fetchData({ url: `/api/favorites/${listingId}`, method: "DELETE" }),
    };
}
