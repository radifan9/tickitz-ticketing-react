import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router";

import fetchWithAuth from "../../utils/fetchWithAuth.jsx";
import getGenreNameFromID from "../../utils/getGenreNameFromID.jsx";

import Genres from "../../components/Genres";
import SingleMovie from "../../components/SingleMovie.jsx";

export default function HomeMovieList() {
  // variables
  const btnFilter = [
    { text: "Thriller", name: "thriller" },
    { text: "Horror", name: "horror" },
    { text: "Romantic", name: "romantic" },
  ];

  const [checkedFilter, setCheckedFilter] = useState([]);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams({ page: 1 });

  useEffect(() => {
    async function getMovieList() {
      try {
        const genresData = await fetchWithAuth(import.meta.env.VITE_GENRES_API);
        const genresNamed = genresData.genres;

        const urlMovies = `${import.meta.env.VITE_API_URL}/movie/now_playing?${searchParams.toString()}&language=en-US`;
        const moviesData = await fetchWithAuth(urlMovies);
        const results = moviesData.results;

        const movieList = results.map((movie) => {
          return {
            id: movie.id,
            title: movie.original_title,
            genres: getGenreNameFromID(movie.genre_ids, genresNamed),
            src: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          };
        });

        setMovies(movieList);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    getMovieList();

    // Jalankan useEffect jika terjadi perubahan di seachParams
  }, [searchParams]);

  // Handler Function
  const handleFilterClick = (filterName) => {
    setCheckedFilter((prev) => {
      // If clicked genres already in array, remove it
      if (prev.includes(filterName)) {
        return prev.filter((item) => item !== filterName);
      }

      // Otherwise, add it
      return [...prev, filterName];
    });
  };

  return (
    <div className="flex w-full flex-col gap-8">
      {/* Hero Section */}
      <section className="relative flex h-96 flex-col items-start justify-center bg-[url('/avengers.png')] px-12 after:absolute after:inset-0 after:bg-black/70">
        <div className="relative z-20 text-lg font-semibold text-[#FFFFFF]">
          LIST MOVIE OF THE WEEK
        </div>
        <div className="relative z-20 text-5xl font-normal text-[#FFFFFF]">
          Experience the Magic of Cinema: Book Your Tickets Today
        </div>
      </section>

      {/* Main */}
      <div className="flex flex-col items-center gap-10">
        {/* Cari Event dan Filter */}
        <div className="flex flex-col gap-8 md:flex-row">
          <div className="flex items-center gap-8">
            <label
              htmlFor="keyword"
              className="text-lg font-medium text-[#4E4B66]"
            >
              Cari Event
            </label>
            <div className="flex h-16 items-center gap-5 rounded-md border-[1px] border-[#DEDEDE] px-3">
              <img src="/search.png" alt="" />
              <input
                className="outline-0"
                type="text"
                id="keyword"
                placeholder="New Born Expert"
              />
            </div>
          </div>
          <div className="flex items-center gap-8">
            <div className="text-lg font-medium text-[#4E4B66]">Filter</div>
            <div className="flex gap-4">
              {btnFilter.map((el, idx) => (
                <div
                  key={idx}
                  className="flex items-center"
                  onClick={() => handleFilterClick(el.name)}
                >
                  <div
                    className={`cursor-pointer rounded-lg px-5 py-2 text-sm ${
                      checkedFilter.includes(el.name)
                        ? "bg-[#1D4ED8] text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {el.text}
                  </div>
                  <input
                    type="checkbox"
                    id={el.name}
                    name={el.name}
                    checked={checkedFilter.includes(el.name)}
                    onChange={() => {}}
                    className="hidden"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Grid Movie List */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {loading ? (
            <div>Loading...</div>
          ) : (
            movies.map((movie, idx) => <SingleMovie key={idx} movie={movie} />)
          )}
        </div>

        {/* <!-- Page Navigation --> */}
        <div className="flex gap-2">
          {[1, 2, 3, "/white-right-arrow.png"].map((pageNumber, idx) =>
            searchParams.get("page") == pageNumber ? (
              <span
                key={idx}
                className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-[#2563EB] p-5 text-[#FFFFFF]"
                onClick={() => {
                  setSearchParams((searchParams) => {
                    if (searchParams.has("page")) {
                      searchParams.set("page", pageNumber);
                    } else {
                      searchParams.append("page", pageNumber);
                    }
                    return searchParams;
                  });
                }}
              >
                {pageNumber}
              </span>
            ) : typeof pageNumber === "string" ? (
              // If it's a string then show an image
              <span
                key={idx}
                className="relative flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-[#1D4ED8] p-5"
              >
                <img src={pageNumber} alt="Next" className="absolute h-4 w-4" />
              </span>
            ) : (
              <span
                key={idx}
                className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-[#F9FAFB] p-5 text-[#A0A3BD]"
                onClick={() => {
                  setSearchParams((searchParams) => {
                    if (searchParams.has("page")) {
                      searchParams.set("page", pageNumber);
                    } else {
                      searchParams.append("page", pageNumber);
                    }
                    return searchParams;
                  });
                }}
              >
                {pageNumber}
              </span>
            ),
          )}
        </div>
      </div>
    </div>
  );
}
