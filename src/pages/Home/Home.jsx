import React, { useEffect, useState } from "react";
import { Link } from "react-router";

import SingleMovie from "../../components/SingleMovie.jsx";
import fetchBEWithoutAuth from "../../utils/fetchBEWithoutAuth.jsx";

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

        // Fetch all hero movies at once
        const heroIds = [372058, 497, 155, 129];
        const heroPromises = heroIds.map((id) =>
          fetchBEWithoutAuth(
            "GET",
            `${import.meta.env.VITE_BE_HOST}/api/v1/movies/${id}`,
          ),
        );
        const heroesResponses = await Promise.all(heroPromises);
        const heroesData = heroesResponses.map((res) => res.data);
        setMoviesHero(heroesData);

        // Fetch exciting movies
        const urlMovies = `${import.meta.env.VITE_BE_HOST}/api/v1/movies/popular`;
        const moviesData = await fetchBEWithoutAuth("GET", urlMovies);
        const results = Array.isArray(moviesData?.data) ? moviesData.data : [];

        const excitingMovieList = results.map((movie) => ({
          id: movie.id,
          title: movie.title,
          genres: movie.genres,
          src: `${import.meta.env.VITE_BE_HOST}/${import.meta.env.VITE_POSTER_PATH}/${movie.poster_img}`,
        }));

        setExcitingMovies(excitingMovieList);
      } catch (error) {
        console.error("Error fetching exciting movies:", error);
      } finally {
        setLoading(false);
      }
    }

    async function fetchUpcomingMovies() {
      try {
        const urlMovies = `${import.meta.env.VITE_BE_HOST}/api/v1/movies/upcoming`;
        const moviesData = await fetchBEWithoutAuth("GET", urlMovies);
        // const results = moviesData.data;
        const results = Array.isArray(moviesData?.data) ? moviesData.data : [];

        const upcomingMovieList = results.map((movie) => ({
          id: movie.id,
          title: movie.title,
          releaseDate: movie.release_date,
          genres: movie.genres,
          src: `${import.meta.env.VITE_BE_HOST}/${import.meta.env.VITE_POSTER_PATH}/${movie.poster_img}`,
        }));

        setUpcomingMovies(upcomingMovieList);
      } catch (error) {
        console.error("Error fetching upcoming movies:", error);
      }
    }

    // call both
    fetchExcitingMovies();
    fetchUpcomingMovies();
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
          {!isLoading && moviesHero && moviesHero.length >= 4 && (
            <>
              <img
                className="col-span-1 row-span-1 h-full w-full rounded-t-4xl object-cover object-center"
                src={`${import.meta.env.VITE_BE_HOST}/${import.meta.env.VITE_POSTER_PATH}/${moviesHero[0].poster_img}`}
                alt={moviesHero[0]?.title}
              />
              <img
                className="col-span-1 col-start-2 row-span-2 row-start-1 row-end-3 h-full w-full rounded-t-4xl object-cover object-top"
                src={`${import.meta.env.VITE_BE_HOST}/${import.meta.env.VITE_POSTER_PATH}/${moviesHero[1].poster_img}`}
                alt={moviesHero[1]?.title}
              />
              <img
                className="col-span-1 col-start-1 row-span-2 row-start-2 h-full w-full rounded-b-4xl object-cover object-top"
                src={`${import.meta.env.VITE_BE_HOST}/${import.meta.env.VITE_POSTER_PATH}/${moviesHero[2].poster_img}`}
                alt={moviesHero[2]?.title}
              />
              <img
                className="col-span-1 col-start-2 row-span-1 row-start-3 h-full w-full rounded-b-4xl object-cover object-center"
                src={`${import.meta.env.VITE_BE_HOST}/${import.meta.env.VITE_POSTER_PATH}/${moviesHero[3].poster_img}`}
                alt={moviesHero[3]?.title}
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
