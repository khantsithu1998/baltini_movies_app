import { useQuery } from "@tanstack/react-query";
import { GET_DETAILS } from "../utils/constants";
import { useMemo } from "react";
import { AnimeDetailsResult } from "../types";

function useFetchAnimeDetails(movieID: string) {
  const fetchAnimeDetails = async () => {
    var graphqlQuery = `
      query ($id: Int) { # Define which variables will be used in the query (id)
        Media (id: $id, type: ANIME) { # Insert our variables into the query arguments (id) (type: ANIME is hard-coded in the query)
          id
          title {
            romaji
            english
          }
          description
          bannerImage
          coverImage {
            extraLarge
            large
            medium
            color
          }
          seasonYear
          genres
        }
      }
      `;

    let variables = {
      id: movieID,
    };

    var url = "https://graphql.anilist.co",
      options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          query: graphqlQuery,
          variables: variables,
        }),
      };

    const res = await fetch(url, options);
    const result = await res.json();
    console.log("result : ", JSON.stringify(result));
    return result;
  };

  const { data, error, isLoading, isSuccess, isError, refetch } = useQuery({
    queryKey: ["anime-details", movieID],
    queryFn: fetchAnimeDetails,
    enabled: false,
  });

  return useMemo(
    () => ({
      items: data?.data.Media || {},
      error: isError,
      loading: isLoading,
      isSuccess: isSuccess,
      callAPI: refetch,
    }),
    [data, error, isLoading, isError, refetch]
  );
}

export { useFetchAnimeDetails };
