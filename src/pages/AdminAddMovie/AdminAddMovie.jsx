import React, { useState } from "react";

// --- Constants
const CINEMA_LIST = [
  {
    name: "ebv",
    src: "/ebv-id.png",
  },
  {
    name: "hiflix",
    src: "/hiflix-red.png",
  },
  {
    name: "CineOne21",
    src: "/CineOne21-fitted.png",
  },
  {
    name: "Cinepolis",
    src: "/cinepolis.png",
  },
];

export const AdminAddMovie = () => {
  // --- --- State & Hooks
  const [selectedCinema, setSelectedCinema] = useState();

  // --- --- Handler
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const request = new Request(
        `${import.meta.env.VITE_BE_HOST}/api/v1/admin/movies`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBjZTI0MTI5LWZkYzMtNDg0Yy1iOWU3LWZhYzc1M2FlZGRlOSIsInJvbGUiOiJhZG1pbiIsImlzcyI6InRpY2tpdHoiLCJleHAiOjE3NTgwNzYyNjYsImlhdCI6MTc1ODA3MjY2Nn0.f0NfPltM2FqbWAG0PBYBmlyKbWwnoXwD4sy43_ZVyus`,
          },
        },
      );

      const formdata = new FormData();
      const posterFile = e.target.poster_img.files[0];
      const backdropFile = e.target.backdrop_img.files[0];
      formdata.append("poster_img", posterFile);
      formdata.append("backdrop_img", backdropFile);
      formdata.append("title", e.target.movieTitle.value);
      formdata.append("genres", e.target.cat.value);
      formdata.append("age_rating_id", e.target.age_rating_id.value);
      formdata.append("director", e.target.director.value);
      formdata.append("cast", e.target.cast.value);
      formdata.append("release_date", e.target.releaseDate.value);
      formdata.append(
        "duration_minutes",
        e.target.hour.value * 60 + e.target.minute.value,
      );

      console.log(formdata);

      const response = await fetch(request, {
        body: formdata,
      });

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-8 mb-20 flex w-full flex-col rounded-2xl bg-white p-9">
      <h1 className="mb-9 text-lg font-medium">Add New Movie</h1>

      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        {/* Image */}
        <div className="flex flex-col gap-2">
          <label htmlFor="image" className="text-[#696F79]">
            Poster Image
          </label>
          <input
            type="file"
            name="poster_img"
            id="file"
            className="h-10 w-fit rounded-lg bg-[#1D4ED8] px-8 text-sm text-white"
          />

          <label htmlFor="image" className="text-[#696F79]">
            Backdrop Image
          </label>
          <input
            type="file"
            name="backdrop_img"
            id="file"
            className="h-10 w-fit rounded-lg bg-[#1D4ED8] px-8 text-sm text-white"
          />

          {/* <button
            id="image"
            className="h-10 w-fit rounded-lg bg-[#1D4ED8] px-8 text-sm text-white"
          >
            Upload
          </button> */}
        </div>

        {/* Movie Name */}
        <div className="flex flex-col gap-2">
          <label htmlFor="movieTitle" className="text-[#696F79]">
            Movie Name
          </label>
          <input
            type="text"
            name="movieTitle"
            id="movieTitle"
            className="h-12 rounded-lg border-[1px] border-[#DEDEDE] px-8 text-sm"
            placeholder="Spiderman: Homecoming"
          />
        </div>

        {/* Category */}
        <div className="flex flex-col gap-2">
          <label htmlFor="cat" className="text-[#696F79]">
            Category
          </label>
          <input
            type="text"
            name="cat"
            id="cat"
            className="h-12 rounded-lg border-[1px] border-[#DEDEDE] px-8 text-sm"
            placeholder="Action, Adventure, Sci-Fi"
          />
        </div>

        {/* Rating Umur */}
        <div className="flex flex-col gap-2">
          <label htmlFor="cat" className="text-[#696F79]">
            Age Rating
          </label>
          <div className="flex h-12 rounded-lg border-[1px] border-[#DEDEDE] px-8 text-sm">
            <select
              className="w-full text-[#696F79]"
              name="age_rating_id"
              id="age_rating_id"
            >
              <option value="1">SU : Semua Umur</option>
              <option value="2">
                R13+ : Remaja, Cocok untuk usia 13 tahun ke atas.
              </option>
              <option value="3">
                R17+ : Dewasa, Cocok untuk usia 17 tahun ke atas.
              </option>
              <option value="4">
                R21+ : Dewasa, Cocok untuk usia 21 tahun ke atas.
              </option>
            </select>
          </div>
        </div>

        {/* Release Date */}
        <div className="flex flex-col gap-2">
          <label htmlFor="releaseDate" className="text-[#696F79]">
            Release Date
          </label>
          <input
            type="text"
            name="releaseDate"
            id="releaseDate"
            className="h-12 rounded-lg border-[1px] border-[#DEDEDE] px-8 text-sm"
            placeholder="2025-12-30"
          />
        </div>

        {/* Duration */}
        <div className="flex flex-col gap-2">
          <div className="flex gap-1">
            <span className="text-[#696F79]">Duration </span>
            <label htmlFor="hour" className="text-[#696F79]">
              (Hour /
            </label>
            <label htmlFor="minute" className="text-[#696F79]">
              Minute)
            </label>
          </div>

          <input
            type="text"
            name="hour"
            id="hour"
            className="h-12 rounded-lg border-[1px] border-[#DEDEDE] px-8 text-sm"
            placeholder="2"
          />
          <input
            type="text"
            name="minute"
            id="minute"
            className="h-12 rounded-lg border-[1px] border-[#DEDEDE] px-8 text-sm"
            placeholder="13"
          />
        </div>

        {/* Director Name */}
        <div className="flex flex-col gap-2">
          <label htmlFor="director" className="text-[#696F79]">
            Director Name
          </label>
          <input
            type="text"
            name="director"
            id="director"
            className="h-12 rounded-lg border-[1px] border-[#DEDEDE] px-8 text-sm"
            placeholder="Jon Watts"
          />
        </div>

        {/* Cast */}
        <div className="flex flex-col gap-2">
          <label htmlFor="cast" className="text-[#696F79]">
            Cast
          </label>
          <input
            type="text"
            name="cast"
            id="cast"
            className="h-12 rounded-lg border-[1px] border-[#DEDEDE] px-8 text-sm"
            placeholder="Tom Holland, Michael Keaton .."
          />
        </div>

        {/* Synopsis */}
        <div className="flex flex-col gap-2">
          <label htmlFor="synopsis" className="text-[#696F79]">
            Synopsis
          </label>
          <textarea
            name="synopsis"
            id="synopsis"
            rows="4"
            cols="50"
            className="rounded-lg border-[1px] border-[#DEDEDE] px-8"
            placeholder=" Insert your synopsis here..."
          ></textarea>
        </div>

        {/* Add Location */}
        <div className="flex flex-col gap-2">
          <label htmlFor="loc" className="text-[#696F79]">
            Add Location
          </label>
          <input
            type="text"
            name="loc"
            id="loc"
            className="h-12 rounded-lg border-[1px] border-[#DEDEDE] px-8 py-6 text-sm"
            placeholder="Purwokerto, Bandung, .."
          />
        </div>

        {/* Cinema */}
        <div className="flex flex-col gap-2">
          <label htmlFor="cat" className="text-[#696F79]">
            Cinema
          </label>
          <div className="mb-3 grid grid-cols-2 items-center gap-8 md:grid-cols-4">
            {CINEMA_LIST.map((el, idx) => {
              return (
                <React.Fragment key={idx}>
                  <input
                    className="hidden"
                    type="checkbox"
                    id={el.name}
                    name="cinema"
                    value={el.name}
                    checked={selectedCinema === el.name}
                    onChange={() => {
                      setSelectedCinema(el.name);
                    }}
                  />
                  <label
                    htmlFor={el.name}
                    className={`flex h-18 cursor-pointer items-center justify-center rounded-lg p-1 hover:shadow-md ${
                      selectedCinema === el.name
                        ? "border-2 border-[#1D4ED8] bg-blue-50"
                        : "border-[1px] border-[#DEDEDE] bg-white"
                    }`}
                  >
                    <img className="" src={el.src} alt={`Logo ${el.name}`} />
                  </label>
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Set date & time */}
        <div className="flex flex-col gap-2">
          <label htmlFor="date" className="text-[#696F79]">
            Set Date & Time
          </label>
          <div className="flex items-center gap-8 rounded-md bg-[#EFF0F6] px-4 py-3">
            <img src="/calender.png" alt="" />
            <select className="w-full" name="date">
              {(() => {
                const today = new Date();
                const option1 = new Date(today);
                option1.setDate(today.getDate());
                const option2 = new Date(today);
                option2.setDate(today.getDate() + 1);
                function formatDate(date) {
                  return date.toISOString().split("T")[0];
                }
                return [option1, option2].map((date, idx) => (
                  <option key={idx} value={formatDate(date)}>
                    {date.toLocaleDateString()}
                  </option>
                ));
              })()}
            </select>
          </div>

          <div className="flex items-center gap-5">
            <button className="flex h-7 items-center rounded border-[1px] border-[#1D4ED8] px-4 text-3xl font-light text-[#1D4ED8]">
              +
            </button>
            <input
              className="h-7 font-medium"
              type="text"
              name=""
              id=""
              placeholder="08:30am"
            />
            <input
              className="h-7 font-medium"
              type="text"
              name=""
              id=""
              placeholder="12:30am"
            />
            <input
              className="h-7 font-medium"
              type="text"
              name=""
              id=""
              placeholder="12:30am"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button className="h-11 rounded-md bg-[#1D4ED8] text-white">
          Save Movie
        </button>
      </form>
    </div>
  );
};
