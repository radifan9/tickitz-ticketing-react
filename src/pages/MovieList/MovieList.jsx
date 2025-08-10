// Library
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { useDebounce } from "use-debounce";

// Utils
import fetchWithAuth from "../../utils/fetchWithAuth.jsx";
import getGenreNameFromID from "../../utils/getGenreNameFromID.jsx";

// Components
import SingleMovie from "../../components/SingleMovie.jsx";
import { Pagination } from "./Pagination.jsx";

// Variables
const FILTER_BUTTONS = [
  { text: "Thriller", name: "thriller" },
  { text: "Horror", name: "horror" },
  { text: "Romantic", name: "romantic" },
];

const PAGINATION_ITEMS = [1, 2, 3, "/white-right-arrow.png"];

export default function MovieList() {
  // State
  const [checkedFilter, setCheckedFilter] = useState([]);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchParams, setSearchParams] = useSearchParams({ page: 1 });
  const [debouncedValue] = useDebounce(searchKeyword, 1000);

  // API Functions
  async function getMovieList() {
    try {
      let urlMovies;
      const genresData = await fetchWithAuth(import.meta.env.VITE_GENRES_API);
      const genresNamed = genresData.genres;

      // If there's no keyword in the filter
      if (searchKeyword === "") {
        urlMovies = `${import.meta.env.VITE_API_URL}/movie/now_playing?${searchParams.toString()}&language=en-US`;
      } else if (searchKeyword !== "") {
        const encodedKeyword = encodeURIComponent(debouncedValue);
        urlMovies = `${import.meta.env.VITE_API_URL}/search/movie?query=${encodedKeyword}&include_adult=false&language=en-US&${searchParams.toString()}`;
      }

      const moviesData = await fetchWithAuth(urlMovies);
      const results = moviesData.results;

      const movieList = results
        // Sometimes there's a movie with no picture, skip if poster_path is null
        .filter((movie) => movie.poster_path !== null)
        .map((movie) => {
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

  // Effets
  useEffect(() => {
    getMovieList();

    // Jalankan useEffect jika terjadi perubahan di seachParams
  }, [searchParams, debouncedValue]);

  // Event Handlers
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
      <section className="relative flex h-96 flex-col items-start justify-center bg-[url('/avengers.png')] px-12 after:absolute after:inset-0 after:bg-black/70 md:px-72 bg-cover bg-center">
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
          {/* Filter Keyword */}
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
                name="keyword"
                className="outline-0"
                type="text"
                id="keyword"
                placeholder="New Born Expert"
                value={searchKeyword}
                onChange={(e) => {
                  setSearchKeyword(() => e.target.value);
                }}
              />
            </div>
          </div>

          {/* Filter Genre */}
          <div className="flex items-center gap-8">
            <div className="text-lg font-medium text-[#4E4B66]">Filter</div>
            <div className="flex gap-4">
              {FILTER_BUTTONS.map((el, idx) => (
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

        {/*  Page Navigation  */}
        <Pagination
          PAGINATION_ITEMS={PAGINATION_ITEMS}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
      </div>
    </div>
  );
}
