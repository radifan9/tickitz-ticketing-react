import React from "react";
import { TableRow } from "./TableRow";
import { useNavigate } from "react-router";

const listMovie = [
  {
    thumbnail: "/spiderman-poster.png",
    movieName: "Spiderman Homecoming",
    cat: "Action, Adventure",
    releasedDate: "07/05/2023",
    duration: "2 Hours 15 Minute",
  },
  {
    thumbnail: "/blackwidow.png",
    movieName: "Blackwidow",
    cat: "Sci-fi, Adventure",
    releasedDate: "10/06/2023",
    duration: "2 Hours 15 Minute",
  },
  {
    thumbnail: "/spiderman-poster.png",
    movieName: "Spiderman Homecoming",
    cat: "Action, Adventure",
    releasedDate: "07/05/2023",
    duration: "2 Hours 15 Minute",
  },
];

export const AdminMovie = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-8 mb-12 flex w-fit flex-col items-center justify-center rounded-3xl bg-white pt-6 pr-14 pb-6 pl-14">
      {/* Header */}
      <div className="grid w-full grid-cols-2 items-center md:flex md:gap-3">
        {/* Title */}
        <h1 className="text-2xl font-medium text-[#14142B]">List Movie</h1>

        {/* Filter */}
        <span className="col-span-2 row-start-2 flex h-14 w-fit items-center justify-center gap-2 rounded-lg bg-[#EFF0F6] px-6 md:ml-auto">
          <img src="/calender.png" alt="" />
          <select name="" id="">
            <option value="">Juni 2025</option>
            <option value="">Juli 2025</option>
            <option value="">Agustus 2025</option>
          </select>
        </span>

        {/* Button */}
        <button
          className="h-14 w-fit cursor-pointer rounded-md bg-[#1D4ED8] px-8 text-base text-white"
          onClick={() => {
            navigate("/admin/add");
          }}
        >
          + Add
        </button>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-scroll">
        <table className="w-min-[56rem] table-fixed">
          {/* Table Head */}
          <thead>
            <tr className="">
              <th className="px-5 py-2 text-center text-sm font-medium text-[#1F4173]">
                No
              </th>

              <th className="px-5 py-2 text-center text-sm font-medium text-[#1F4173]">
                Thumbnail
              </th>
              <th className="px-5 py-2 text-center text-sm font-medium text-[#1F4173]">
                Movie Name
              </th>
              <th className="px-5 py-2 text-center text-sm font-medium text-[#1F4173]">
                Category
              </th>
              <th className="px-5 py-2 text-center text-sm font-medium text-[#1F4173]">
                Released Date
              </th>
              <th className="px-5 py-2 text-center text-sm font-medium text-[#1F4173]">
                Duration
              </th>
              <th className="px-5 py-2 text-center text-sm font-medium text-[#1F4173]">
                {" "}
                Action
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="">
            {listMovie.map((movie, idx) => {
              return (
                <TableRow
                  idx={idx}
                  thumbnail={movie.thumbnail}
                  movieName={movie.movieName}
                  cat={movie.cat}
                  releasedDate={movie.releasedDate}
                  duration={movie.duration}
                />
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div></div>
    </div>
  );
};
