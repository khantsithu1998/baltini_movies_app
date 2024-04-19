import { HomeLayout } from "../layout/HomeLayout";
import { Grid } from "../layout/Grid";
import { MovieCard } from "../components/movies/MovieCard";
import { API_ENDPOINTS, SEARCH_ENDPOINTS } from "../utils/constants";
import { useSearch } from "../hooks/useSearch";
import { useEffect, useRef } from "react";
import { FaSpinner } from "react-icons/fa";
import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { Movie, SearchResult } from "../types";
import MovieCardSkeleton from "../components/movies/MovieCardSkeleton";

function HomePage({
  removeBookmark,
  bookmarkItem,
  isBookmarked,
}: {
  removeBookmark: any;
  bookmarkItem: any;
  isBookmarked: any;
}) {
  const { handleSearch, searchedValue, query } = useSearch();

  const searching = searchedValue.length > 3;

  const fetchMovies = async ({ pageParam = 1 }) => {
    const endpoint = searching
      ? `${SEARCH_ENDPOINTS.MULTI_SEARCH}&s=${query}&page=${pageParam}`
      : `${API_ENDPOINTS.TRENDING_MOVIES}&page=${pageParam}`;
    const res = await fetch(endpoint);
    const data = await res.json();

    return {
      ...data,
      nextPage: data.Search.length > 0 ? pageParam + 1 : null,
    };
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["movies", query],
    queryFn: fetchMovies,
    getNextPageParam: (lastPage: SearchResult) => lastPage.nextPage,
    initialPageParam: 1,
  });

  const bottomBoundaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log("hasNextPage : ", hasNextPage);
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
      inputHolder="Search for movies or TV series"
      multiSearch={handleSearch}
      searchedValue={searchedValue}
    >
      <Grid title="Recommended for you">
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
            {data?.pages?.map((page: SearchResult | null, i: number) => (
              <React.Fragment key={i}>
                {isBookmarked(page?.Search).map((movie: Movie | null) =>
                  movie ? (
                    <MovieCard
                      key={movie?.imdbID}
                      movie={movie!}
                      deleteItem={removeBookmark}
                      saveItem={bookmarkItem}
                    />
                  ) : (
                    <></>
                  )
                )}
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

export { HomePage };
