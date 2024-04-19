import { useQuery } from "@tanstack/react-query";
import { GET_DETAILS } from "../utils/constants";
import { useMemo } from "react";

function useFetchDetails(movieID: string) {
  const getDetails = async () => {
    const endpoint = `${GET_DETAILS.BASE_URL}&i=${movieID}`;
    const response = await fetch(endpoint);
    const json = await response.json();
    return json
    // return mapDetails(json, itemsType);
  };

  const { data, error, isLoading, isError, refetch } = useQuery({
    queryKey: ["details", movieID], 
    queryFn: getDetails, 
    enabled : false
  });

  return useMemo(() => ({
    items: data || {},
    error: isError,
    loading: isLoading,
    callAPI: refetch,
  }), [data, error, isLoading, isError, refetch]);
}

export { useFetchDetails };
