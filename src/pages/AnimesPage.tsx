import { HomeLayout } from "../layout/HomeLayout";
import { Grid } from "../layout/Grid";
import { FaSpinner } from "react-icons/fa";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useRef, useEffect } from "react";
import { AnimeCard } from "../components/animes/AnimeCard";
import { useSearch } from "../hooks/useSearch";
import { AnimeMedia, AnimesResult } from "../types";
import MovieCardSkeleton from "../components/movies/MovieCardSkeleton";

function AnimesPage({
  removeBookmark,
  isBookmarked,
  bookmarkItem,
}: {
  removeBookmark: any;
  isBookmarked: any;
  bookmarkItem: any;
}) {
  const { handleSearch, searchedValue, query } = useSearch();

  const searching = searchedValue.length > 3;

  const url = "https://graphql.anilist.co";

  const fetchAnimes = async ({ pageParam = 1 }) => {
    const graphqlQuery = `
      query ($page: Int, $perPage: Int, $search: String) {
        Page (page: $page, perPage: $perPage) {
          pageInfo {
            total
            currentPage
            lastPage
            hasNextPage
            perPage
          }
          media (search: $search) {
            id
            title {
              romaji,
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
      }`;

    let variables: {
      search?: string;
      page: number;
      perPage: number;
    } = {
      page: pageParam,
      perPage: 12,
    };

    if (query) {
      variables = { ...variables, search: query };
    }

    const options = {
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
    return res.json();
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["animes", query],
    queryFn: fetchAnimes,
    getNextPageParam: (lastPage: AnimesResult) =>
      lastPage.data.Page?.pageInfo?.hasNextPage
        ? lastPage?.data?.Page?.pageInfo?.currentPage + 1
        : null,
    initialPageParam: 1,
  });

  const bottomBoundaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.25 }
    );

    if (bottomBoundaryRef.current) {
      observer.observe(bottomBoundaryRef.current);
    }

    return () => {
      if (bottomBoundaryRef.current) {
        observer.unobserve(bottomBoundaryRef.current);
      }
    };
  }, [bottomBoundaryRef, hasNextPage, isFetchingNextPage]);

  return (
    <HomeLayout
      inputHolder="Search for anime"
      multiSearch={handleSearch}
      searchedValue={searchedValue}
    >
      <Grid title="Trending Animes">
        {status === "pending" && (
          <>
            {Array.from({ length: 8 }).map((_, index) => (
              <MovieCardSkeleton key={index} />
            ))}
          </>
        )}
        {status === "error" && <p>Error: {error.message}</p>}
        {status === "success" && (
          <>
            {data.pages.map((page: AnimesResult, i: number) => (
              <React.Fragment key={i}>
                {page?.data?.Page?.media?.map((anime: AnimeMedia) => (
                  <AnimeCard
                    key={anime.id}
                    anime={anime}
                    // deleteItem={removeBookmark}
                    // saveItem={bookmarkItem}
                  />
                ))}
              </React.Fragment>
            ))}
            <div ref={bottomBoundaryRef}>
              {isFetchingNextPage && (
                <div className="grid place-items-center my-4">
                  <FaSpinner className="animate-spin text-4xl" />
                </div>
              )}
            </div>
          </>
        )}
      </Grid>
    </HomeLayout>
  );
}

export { AnimesPage };
