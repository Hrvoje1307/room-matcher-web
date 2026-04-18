import { LISTINGS_QUERY_KEY } from "@/shared/consts/listings/consts";
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

type newListingProps = {
  id: string;
  title: string;
  address: string;
  price: string;
  size: number;
  roomCount: number;
  description: string;
  availableForm: string;
  isActive: boolean;
};

export function getAllListingsQueryOptions() {
  return queryOptions({
    queryKey: listingsQueryKeys.all(),
    queryFn: () => fetchData({ url: `/listings` }),
  });
}

export function getListingByIdQueryOptions(listingId: string) {
  return queryOptions({
    queryKey: listingsQueryKeys.details(),
    queryFn: () => fetchData({ url: `/listings/${listingId}` }),
  });
}

export function addListingMutationOptions() {
  return {
    mutationFn: async (newListing: newListingProps) => {
      await fetchData({ url: `/listings`, body: newListing, method: "POST" });
    },
  };
}

export function removeListingMutationOptions() {
  return {
    mutationFn: async (listingId: string) => {
      await fetchData({ url: `/listings/${listingId}`, method: "DELETE" });
    },
  };
}
