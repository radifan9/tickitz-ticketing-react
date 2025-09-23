import { Link } from "react-router";
import Genres from "./Genres";

/**
 * Format date from YYYY-MM-DD to Month Year format
 * @param {string} dateString - Date string in YYYY-MM-DD format
 * @returns {string} Formatted date string (e.g., "January 2024")
 */
const formatReleaseDate = (dateString) => {
  if (!dateString) return "";

  const options = { year: "numeric", month: "long" };
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", options);
};

/**
 * This component will render a single card of movie
 * @param { Object } movie - An Object that contain movie informations
 * @returns {}
 */
function SingleMovie({ movie }) {
  return (
    <div className="flex max-h-full max-w-full flex-col gap-1" key={movie.id}>
      <div className="group relative max-h-full max-w-full">
        {/* Movie Poster */}
        <img
          className="rounded-md"
          src={movie.src}
          alt={movie.title}
          onClick={(e) => {
            e.preventDefault();
          }}
        />

        {/* Link Hover */}
        <div className="absolute inset-0 hidden max-w-full flex-col items-center justify-center gap-2 rounded-md bg-black/60 group-hover:flex">
          <Link
            className="flex h-10 w-40 items-center justify-center rounded-md border-[1px] text-sm text-[#FFFFFF]"
            to={`/details/?id=${movie.id}`}
          >
            Details
          </Link>
          <Link
            className="flex h-10 w-40 items-center justify-center rounded-md bg-[#1D4ED8] text-sm text-[#FFFFFF]"
            to={`/order/?id=${movie.id}`}
          >
            Buy Ticket
          </Link>
        </div>
      </div>

      {/* Movie Information */}
      <Link to={`/details/?id=${movie.id}`}>
        <h3 className="font-semibold text-[#14142B]">{movie.title}</h3>
      </Link>
      {movie.releaseDate && (
        <div className="text-lg font-semibold text-[#1D4ED8]">
          {formatReleaseDate(movie.releaseDate)}
        </div>
      )}
      <div className="genres">
        <ul className="flex flex-wrap items-center gap-2">
          <Genres genres={movie.genres} />
        </ul>
      </div>
    </div>
  );
}

export default SingleMovie;
