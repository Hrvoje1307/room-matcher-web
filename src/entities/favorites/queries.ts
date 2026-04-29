import { fetchData } from "@/shared/hooks/fetchData";
import { queryOptions } from "@tanstack/react-query";
import type { ListingResponse } from "@/entities/listings/queries";

export function getFavoritesQueryOptions() {
    return queryOptions({
        queryKey: ["favorites"],
        queryFn: () => fetchData({ url: "/api/favorites/me" }) as Promise<ListingResponse[]>,
    });
}
