import { Link } from "react-router";

function Footer() {
  const exploreList = [
    { text: "Cinemas", link: "cinema" },
    { text: "Movies List", link: "/" },
    { text: "My Ticket", link: "/" },
    { text: "Notification", link: "/" },
  ];

  const sponsorList = [
    { text: "ebv.id", src: "/ebv-id.png" },
    { text: "CineOne21", src: "/CineOne21-fitted.png" },
    { text: "hiflix", src: "/hiflix-red.png" },
  ];

  const followUsList = [
    {
      text: "Tickitz Cinema.id",
      link: "facebook.com",
      src: "/facebook-gray.png",
    },

    {
      text: "tickitz.id",
      link: "instagram.com",
      src: "/instagram-gray.png",
    },

    {
      text: "tickitz.id",
      link: "x.com",
      src: "/twitter-gray.png",
    },

    {
      text: "Tickitz Cinema id",
      link: "youtube.com",
      src: "/youtube-gray.png",
    },
  ];

  return (
    <footer className="flex flex-col gap-10 md:mt-12">
      <div className="flex flex-col items-start gap-8 md:flex-row md:justify-evenly">
        {/* Slogan */}
        <span className="text-sm font-light text-[#6E7191]">
          <img src="/tickitz-blue.png" alt="" />
          <div>Stop waiting in line. Buy tickets</div>
          <div>conveniently, watch movies quietly.</div>
        </span>

        {/* Explore Link */}
        <span className="flex flex-col gap-4">
          <div className="text-base font-medium">Explore</div>
          <ul className="grid grid-cols-4 gap-x-14 gap-y-2 md:grid-cols-1">
            {exploreList.map((el, idx) => {
              return (
                <li className="text-sm text-[#6E7191]" key={idx}>
                  <Link to={el.link}>{el.text}</Link>
                </li>
              );
            })}
          </ul>
        </span>

        {/* Sponsor List */}
        <span className="flex flex-col gap-4">
          <div className="text-base font-medium">Our Sponsor</div>
          <ul className="grid grid-cols-3 items-center gap-x-14 gap-y-2 md:grid-cols-1">
            {sponsorList.map((el, idx) => {
              return (
                <li key={idx}>
                  <img src={el.src} alt={el.text} />
                </li>
              );
            })}
          </ul>
        </span>

        {/* Follow Us */}
        <span className="flex flex-col gap-4">
          <div className="text-base font-medium">Follow us</div>
          <ul className="grid grid-cols-4 gap-x-8 gap-y-2 text-[#6E7191] md:grid-cols-1">
            {followUsList.map((el, idx) => {
              return (
                <li key={idx}>
                  <a className="flex gap-6" href={el.link}>
                    <img src={el.src} alt="Youtube" />
                    <span className="hidden md:inline">{el.text}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </span>
      </div>

      <div className="text-[#6E7191]">
        © 2020 Tickitz. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;
