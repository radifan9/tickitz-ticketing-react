import React from "react";

export const TableRow = ({
  idx,
  thumbnail,
  movieName,
  cat,
  releasedDate,
  duration,
}) => {
  return (
    <tr className="">
      <td className="px-5 py-2 text-center text-sm">{idx + 1}</td>
      <td className="px-5 py-2 text-center text-sm">
        <img
          className="mx-auto h-10 w-10 rounded-xl object-cover"
          src={thumbnail}
          alt={movieName}
        />
      </td>
      <td className="px-5 py-2 text-center text-sm">{movieName}</td>
      <td className="px-5 py-2 text-center text-sm">{cat}</td>
      <td className="px-5 py-2 text-center text-sm">{releasedDate}</td>
      <td className="px-5 py-2 text-center text-sm">{duration}</td>
      <td className="gap-1 px-5 py-2 text-center text-sm">
        <div className="flex items-center justify-center gap-1">
          <img src="/action-view.png" alt="view" />
          <img src="/action-edit.png" alt="edit" />
          <img src="/action-delete.png" alt="delete" />
        </div>
      </td>
    </tr>
  );
};
