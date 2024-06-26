import React, { useContext, useEffect, useState } from "react";
import { MovieInfo } from "./MovieInfo";
import { Mark } from "../../resources/svg/movies/IconsBookmarks";
import { ModalContext } from "../../context/ModalContext";
import { Movie } from "../../types";

function MovieCard({
  movie,
  deleteItem,
  saveItem,
}: {
  movie: Movie;
  deleteItem: any;
  saveItem: any;
}) {
  const [marked, setMarked] = useState(movie.saved);
  const { openModal } = useContext(ModalContext);

  function markMovie() {
    if (!marked) {
      saveItem(movie);
    } else {
      deleteItem(movie.imdbID);
    }
    setMarked((prevState) => !prevState);
  }

  useEffect(() => {
    if (movie.saved) setMarked(true);
  }, [movie.saved]);

  return (
    <>
      <article className="grid gap-2 hover:cursor-pointer selection:bg-transparent select-none">
        <div className="w-full aspect-video relative selection:bg-transparent group/card">
          <img
            src={movie.Poster}
            alt=""
            className="w-full aspect-video object-cover rounded-lg selection:bg-transparent"
          />
          <div
            onClick={markMovie}
            className="grid place-content-center absolute h-8 aspect-square bg-black bg-opacity-60 rounded-full top-2 right-2 active:bg-white xl:hover:bg-white group/container z-20"
          >
            <Mark marked={marked} />
          </div>
          <div className="hidden place-content-center absolute top-0 h-full aspect-video bg-blue group-hover/card:grid group-hover/card:bg-black group-hover/card:bg-opacity-50 text-white z-10">
            <button
              onClick={() => openModal(movie.imdbID, false)}
              className="h-8 p-2 grid place-content-center"
            >
              Show more
            </button>
          </div>
        </div>
        <div className="grid gap-1">
          <MovieInfo info={movie} />
        </div>
      </article>
    </>
  );
}

export { MovieCard };
