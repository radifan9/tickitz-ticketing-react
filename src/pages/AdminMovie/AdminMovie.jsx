import React from "react";
import { TableRow } from "./TableRow";

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
  return (
    <div className="mt-8 mb-12 flex w-fit flex-col items-center justify-center rounded-3xl bg-white pt-6 pr-14 pb-6 pl-14">
      {/* Header */}
      <div className="grid w-full grid-cols-2 items-center md:grid-cols-3 md:justify-start">
        {/* Title */}
        <h1 className="text-2xl font-medium text-[#14142B]">List Movie</h1>

        {/* Filter */}
        <span className="col-span-2 row-start-2 flex h-14 w-2/3 items-center justify-center gap-2 rounded-lg bg-[#EFF0F6] md:col-span-1 md:col-start-2 md:row-start-1">
          <img src="/calender.png" alt="" />
          <select name="" id="">
            <option value="">Juni 2025</option>
            <option value="">Juli 2025</option>
            <option value="">Agustus 2025</option>
          </select>
        </span>

        {/* Button */}
        <button className="h-10 w-fit cursor-pointer rounded-md bg-[#1D4ED8] px-8 text-base text-white">
          + Add
        </button>
      </div>

      {/* Table */}
      <table className="">
        {/* Table Head */}
        <thead>
          <tr className="">
            <th className="text-sm font-medium text-[#1F4173]">No</th>
            <th className="text-sm font-medium text-[#1F4173]">Thumbnail</th>
            <th className="text-sm font-medium text-[#1F4173]">Movie Name</th>
            <th className="text-sm font-medium text-[#1F4173]">Category</th>
            <th className="text-sm font-medium text-[#1F4173]">
              Released Date
            </th>
            <th className="text-sm font-medium text-[#1F4173]">Duration</th>
            <th className="text-sm font-medium text-[#1F4173]"> Action</th>
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

      {/* Pagination */}
      <div></div>
    </div>
  );
};
