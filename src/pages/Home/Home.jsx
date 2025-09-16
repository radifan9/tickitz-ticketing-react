import React, { useEffect, useState } from "react";
import { Link } from "react-router";

import fetchWithAuth from "../../utils/fetchWithAuth.jsx";
import getGenreNameFromID from "../../utils/getGenreNameFromID.jsx";

import Genres from "../../components/Genres";
import SingleMovie from "../../components/SingleMovie.jsx";

function Home() {
  const [moviesHero, setMoviesHero] = useState([]);
  const [excitingMovies, setExcitingMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const whyChooseUs = [
    {
      titile: "Guaranteed",
      src: "/shield.png",
      imageAlt: "Guaranteed Icon",
      text: "Lorem ipsum dolor sit amet, consectetur adipis elit. Sit enim nec, proin faucibus nibh et sagittis a. Lacinia purus ac amet.",
    },
    {
      titile: "Affordable",
      src: "/check-circle-fill.png",
      imageAlt: "Affordable Icon",
      text: "Lorem ipsum dolor sit amet, consectetur adipis elit. Sit enim nec, proin faucibus nibh et sagittis a. Lacinia purus ac amet.",
    },
    {
      titile: "24/7 Customer Support",
      src: "/bubble-speech.png",
      imageAlt: "24/7 Customer Support Icon",
      text: "Lorem ipsum dolor sit amet, consectetur adipis elit. Sit enim nec, proin faucibus nibh et sagittis a. Lacinia purus ac amet.",
    },
  ];

  useEffect(() => {
    async function fetchExcitingMovies() {
      try {
        setLoading(true);

        // Get 4 movies images for hero section
        const moviesHero = await fetchWithAuth(
          `${import.meta.env.VITE_API_URL}/movie/top_rated`,
        );
        console.log(moviesHero);
        setMoviesHero(moviesHero.results);

        const genresData = await fetchWithAuth(import.meta.env.VITE_GENRES_API);
        const genresNamed = genresData.genres;
        console.log(genresNamed);

        const urlMovies = `${import.meta.env.VITE_API_URL}/movie/popular`;
        const moviesData = await fetchWithAuth(urlMovies);
        const results = moviesData.results;

        const excitingMovieList = results.map((movie) => {
          return {
            id: movie.id,
            title: movie.original_title,
            genres: getGenreNameFromID(movie.genre_ids, genresNamed),
            src: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          };
        });

        setExcitingMovies(excitingMovieList);
      } catch (error) {
        console.error("Error fetching exciting movies:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchExcitingMovies();

    async function upcomingMovies() {
      try {
        const genresData = await fetchWithAuth(import.meta.env.VITE_GENRES_API);
        const genresNamed = genresData.genres;

        const urlMovies = `${import.meta.env.VITE_API_URL}/movie/upcoming`;
        const moviesData = await fetchWithAuth(urlMovies);
        const results = moviesData.results;

        const upcomingMovieList = results.map((movie) => {
          return {
            id: movie.id,
            title: movie.original_title,
            releaseDate: movie.release_date,
            genres: getGenreNameFromID(movie.genre_ids, genresNamed),
            src: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          };
        });

        setUpcomingMovies(upcomingMovieList);
      } catch (error) {
        console.error("Error fetching exciting movies:", error);
      } finally {
        setLoading(false);
      }
    }

    upcomingMovies();
  }, []);

  return (
    <main className="mt-12 flex flex-col items-center gap-14">
      {/* Hero Section */}
      <section className="flex flex-col gap-8 md:w-full md:flex-row md:justify-center md:px-[var(--medium-pad)]">
        <div className="flex flex-col items-center justify-center gap-8 md:items-start">
          <div className="text-center text-2xl font-semibold text-[#1D4ED8] md:text-3xl">
            MOVIE TICKET PURCHASES #1 IN INDONESIA
          </div>
          <div className="text-center text-4xl font-normal md:text-left md:text-5xl">
            Experience the Magic of Cinema: Book Your Tickets Today
          </div>
          <div className="text-center text-lg font-light text-[#A0A3BD] md:text-xl">
            Sign up and get the ticket with a lot of discount
          </div>
        </div>

        <section className="grid h-96 grid-cols-2 grid-rows-3 gap-2 px-[var(--small-pad)] md:w-2/4">
          {!isLoading && moviesHero && (
            <>
              <img
                className="col-span-1 row-span-1 h-full w-full rounded-t-4xl object-cover object-center"
                src={`https://image.tmdb.org/t/p/w500/${moviesHero[12].poster_path}`}
                alt="John Wick Poster"
              />
              <img
                className="col-span-1 col-start-2 row-span-2 row-start-1 row-end-3 h-full w-full rounded-t-4xl object-cover object-top"
                src={`https://image.tmdb.org/t/p/w500/${moviesHero[8].poster_path}`}
                alt="Lion King Poster"
              />
              <img
                className="col-span-1 col-start-1 row-span-2 row-start-2 h-full w-full rounded-b-4xl object-cover object-top"
                src={`https://image.tmdb.org/t/p/w500/${moviesHero[6].poster_path}`}
                alt="Spiderman Poster"
              />
              <img
                className="col-span-1 col-start-2 row-span-1 row-start-3 h-full w-full rounded-b-4xl object-cover object-center"
                src={`https://image.tmdb.org/t/p/w500/${moviesHero[5].poster_path}`}
                alt="Roblox Poster"
              />
            </>
          )}
        </section>
      </section>

      {/* Why Choose Us Section */}
      <section className="flex flex-col items-center gap-8 md:px-[var(--medium-pad)]">
        <div className="text-xl font-semibold text-[#1D4ED8]">
          WHY CHOOSE US
        </div>
        <div className="text-center text-4xl font-light">
          Unleashing the Ultimate Movie Experience
        </div>
        <div className="flex flex-col gap-8 md:flex-row">
          {whyChooseUs.map((el, idx) => {
            return (
              <span key={idx} className="flex flex-col items-center gap-3">
                <img
                  className="rounded-full bg-[#1D4ED833] p-4"
                  src={el.src}
                  alt={el.imageAlt}
                />

                <div className="font-semibold text-[#18181B]">{el.titile}</div>
                <p className="w-4/5 text-center text-lg font-light text-[#52525B]">
                  {el.text}
                </p>
              </span>
            );
          })}
        </div>
      </section>

      {/* <!-- Exciting Movies --> */}
      <section className="flex flex-col items-center gap-8 px-[var(--small-pad)] md:px-[var(--medium-pad)]">
        <div className="text-xl font-semibold text-[#1D4ED8]">MOVIES</div>
        <div className="text-center text-4xl font-light">
          Exciting Movies That Should Be Watched Today
        </div>

        {/* List of Exciting Movies */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-4">
          {excitingMovies.slice(0, 4).map((movie) => (
            <SingleMovie key={movie.id} movie={movie} />
          ))}
        </div>

        <div>
          <a className="blue-18-bold" href="#">
            <div>View All</div>
            <img src="../assets/icons/arrow-right.png" alt="" />
          </a>
        </div>
      </section>

      {/* <!-- Upcoming Movies --> */}
      <section className="mb-8 flex flex-col items-center gap-8 px-[var(--small-pad)] md:px-[var(--medium-pad)]">
        <div className="self-start text-xl font-semibold text-[#1D4ED8]">
          UPCOMING MOVIES
        </div>
        <div className="self-start text-4xl font-light">
          Exciting Movie Coming Soon
        </div>

        {/* List of Upcoming Movies */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-4">
          {upcomingMovies.slice(0, 4).map((movie) => (
            <SingleMovie key={movie.id} movie={movie} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Home;
