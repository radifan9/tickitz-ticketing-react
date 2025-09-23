export const TableRow = ({
  idx,
  movieID,
  thumbnail,
  movieName,
  cat,
  releasedDate,
  duration,
  onDeleteRequest,
}) => {
  const hour = Math.floor(duration / 60);
  const minute = duration % 60;

  return (
    <tr>
      <td className="px-5 py-2 text-center text-sm">{idx + 1}</td>
      <td className="px-5 py-2 text-center text-sm">
        <img
          className="mx-auto h-12 w-12 rounded-xl object-cover"
          src={`${import.meta.env.VITE_BE_HOST}/api/v1/img/posters/${thumbnail}`}
          alt={movieName}
        />
      </td>
      <td className="px-5 py-2 text-center text-sm">{movieName}</td>
      <td className="px-5 py-2 text-center text-sm">
        {Array.isArray(cat) ? cat.join(", ") : cat}
      </td>
      <td className="px-5 py-2 text-center text-sm">
        {releasedDate ? releasedDate.split("T")[0] : ""}
      </td>
      <td className="px-5 py-2 text-center text-sm">
        {minute ? `${hour} Hours ${minute} Minute` : ""}
      </td>
      <td className="gap-1 px-5 py-2 text-center text-sm">
        <div className="flex items-center justify-center gap-1">
          <img src="/action-view.png" alt="view" />
          <img src="/action-edit.png" alt="edit" />
          <button
            onClick={() => onDeleteRequest(movieID, movieName)}
            className="flex flex-shrink-0"
          >
            <img src="/action-delete.png" alt="delete" />
          </button>
        </div>
      </td>
    </tr>
  );
};
