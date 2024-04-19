import React from "react";
import {
  CategoryMovie,
  CategoryTv,
} from "../../resources/svg/movies/IconsCategories";
import { AnimeMedia, Movie } from "../../types";

function AnimeInfo({ info }: { info: AnimeMedia }) {
  return (
    <>
      <div className="flex items-center gap-3 font-light opacity-75 text-sm">
        <p>{info.seasonYear}</p>
        <span className="w-1 h-1 rounded-full bg-gray-400" aria-hidden="true" />
        <div className="flex items-center gap-2">
          <CategoryMovie />
          <p>{"Anime"}</p>
        </div>
        <span className="w-1 h-1 rounded-full bg-gray-400" aria-hidden="true" />
      </div>
      <p className="truncate tracking-wide">{info.title.english || info.title.romaji}</p>
    </>
  );
}

export { AnimeInfo };
