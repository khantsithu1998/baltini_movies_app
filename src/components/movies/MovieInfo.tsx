import React from "react";
import {
  CategoryMovie,
  CategoryTv,
} from "../../resources/svg/movies/IconsCategories";
import { Movie } from "../../types";

function MovieInfo({ info }: { info: Movie }) {
  return (
    <>
      <div className="flex items-center gap-3 font-light opacity-75 text-sm">
        <p>{info.Year}</p>
        <span className="w-1 h-1 rounded-full bg-gray-400" aria-hidden="true" />
        <div className="flex items-center gap-2">
          {info.Type === "movie" ? <CategoryMovie /> : <CategoryTv />}
          <p>{info.Type === "movie" ? "Movie" : " TV Serie"}</p>
        </div>
        <span className="w-1 h-1 rounded-full bg-gray-400" aria-hidden="true" />
      </div>
      <p className="truncate tracking-wide">{info.Title}</p>
    </>
  );
}

export { MovieInfo };
