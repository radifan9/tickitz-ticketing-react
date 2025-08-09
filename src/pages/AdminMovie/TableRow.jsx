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
      <td>{idx + 1}</td>
      <td>
        <img
          className="h-10 w-10 rounded-xl object-cover"
          src={thumbnail}
          alt={movieName}
        />
      </td>
      <td>{movieName}</td>
      <td>{cat}</td>
      <td>{releasedDate}</td>
      <td>{duration}</td>
      <td className="flex gap-1">
        <img src="/action-view.png" alt="" />
        <img src="/action-edit.png" alt="" />
        <img src="/action-delete.png" alt="" />
      </td>
    </tr>
  );
};
