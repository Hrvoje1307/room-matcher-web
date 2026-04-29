import { LISTINGS_QUERY_KEY } from "@/shared/consts/consts";
import { fetchData } from "@/shared/hooks/fetchData";
import { queryOptions } from "@tanstack/react-query";

export const listingsQueryKeys = {
    all() {
        return [LISTINGS_QUERY_KEY] as const;
    },
    lists() {
        return [...this.all(), "list"] as const;
    },
    list(listId: string) {
        return [...this.lists(), listId] as const;
    },
    details() {
        return [...this.all(), "details"] as const;
    },
    detail(listId: string) {
        return [...this.details(), listId] as const;
    },
};

export interface ListingImageResponse {
    id: number;
    imageUrl: string;
}

export interface ListingResponse {
    id: number;
    title: string;
    address: string;
    price: number;
    size: number;
    description: string;
    availableFrom: string;
    isActive: boolean;
    images: ListingImageResponse[];
}

export function getAllListingsQueryOptions() {
    return queryOptions({
        queryKey: listingsQueryKeys.all(),
        queryFn: () => fetchData({ url: `/api/listings` }) as Promise<ListingResponse[]>,
    });
}

export function getListingByIdQueryOptions(listingId: string) {
    return queryOptions({
        queryKey: listingsQueryKeys.detail(listingId),
        queryFn: () => fetchData({ url: `/api/listings/${listingId}` }) as Promise<ListingResponse>,
    });
}

export function addListingMutationOptions() {
    return {
        mutationFn: async (newListing: Omit<ListingResponse, "id" | "images">) => {
            await fetchData({ url: `/api/listings`, body: newListing, method: "POST" });
        },
    };
}

export function removeListingMutationOptions() {
    return {
        mutationFn: async (listingId: string) => {
            await fetchData({ url: `/api/listings/${listingId}`, method: "DELETE" });
        },
    };
}
