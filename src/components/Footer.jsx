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
    <footer>
      <div className="footer-side-side">
        {/* Slogan */}
        <span className="logo-slogan">
          <img src="/tickitz-blue.png" alt="" />
          <div>Stop waiting in line. Buy tickets</div>
          <div>conveniently, watch movies quietly.</div>
        </span>

        {/* Explore Link */}
        <span>
          <div className="explore">Explore</div>
          <ul className="explore-list">
            {exploreList.map((el, idx) => {
              return (
                <li key={idx}>
                  <Link to={el.link}>{el.text}</Link>
                </li>
              );
            })}
          </ul>
        </span>

        {/* Sponsor List */}
        <span>
          <div className="sponsor">Our Sponsor</div>
          <ul className="sponsor-list">
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
        <span>
          <div className="follow">Follow us</div>
          <ul className="follow-list">
            {followUsList.map((el, idx) => {
              return (
                <li key={idx}>
                  <a href={el.link}>
                    <img src={el.src} alt="Youtube" />
                    <span>{el.text}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </span>
      </div>

      <div className="copyright">© 2020 Tickitz. All Rights Reserved.</div>
    </footer>
  );
}

export default Footer;
