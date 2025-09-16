import { format, parseISO } from "date-fns";

export const formatMovieReleaseDate = (isoDate) => {
  const dateObject = parseISO(isoDate);
  return format(dateObject, "MMM, d yyyy")
};
