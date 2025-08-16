import { Link } from "react-router";

/**
 * Digunakan untuk elemen list pada navbar
 * @param {object} props
 * @param {string} props.to - Tujuan Navigasi dari Link
 * @param {string} props.listText - Teks dari Link
 */
function ListItem({ to, listText, loc }) {
  return (
    <li>
      <Link
        to={to}
        className={` ${loc === to ? "relative text-blue-700 after:absolute after:right-0 after:-bottom-0.5 after:left-0 after:h-0.5 after:bg-blue-700 after:content-['']" : ""}`}
      >
        {listText}
      </Link>
    </li>
  );
}

export default ListItem;
