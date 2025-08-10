import { format, parseISO } from "date-fns";

export const convertDate = (isoDate) => {
  const dateObject = parseISO(isoDate);
  return format(dateObject, "EEEE, dd MMMM yyyy");
};
