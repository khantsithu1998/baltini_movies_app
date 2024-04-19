import React, { useContext, useState } from "react";
import { AnimeMedia } from "../../types";
import { ModalContext } from "../../context/ModalContext";
import { Mark } from "../../resources/svg/movies/IconsBookmarks";
import { AnimeInfo } from "./AnimeInfo";

function AnimeCard({ anime }: { anime: AnimeMedia }) {
  const [marked, setMarked] = useState(anime.saved);
  const { openModal } = useContext(ModalContext);

  return (
    <>
      <article className="grid gap-2 hover:cursor-pointer selection:bg-transparent select-none">
        <div className="w-full aspect-video relative selection:bg-transparent group/card">
          <img
            src={anime?.coverImage?.large}
            alt=""
            loading="lazy"
            className="w-full aspect-video object-cover rounded-lg selection:bg-transparent"
          />

          <div className="hidden place-content-center absolute top-0 h-full aspect-video bg-blue group-hover/card:grid group-hover/card:bg-black group-hover/card:bg-opacity-50 text-white z-10">
            <button
              onClick={() => openModal(anime.id, true)}
              className="h-8 p-2 grid place-content-center"
            >
              Show more
            </button>
          </div>
        </div>
        <div className="grid gap-1">
          <AnimeInfo info={anime} />
        </div>
      </article>
    </>
  );
}

export { AnimeCard };
