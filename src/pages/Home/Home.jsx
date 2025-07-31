function Home() {
  return (
    <main>
      <section className="hero">
        <div>
          <div>MOVIE TICKET PURCHASES #1 IN INDONESIA</div>
          <div>Experience the Magic of Cinema: Book Your Tickets Today</div>
          <div>Sign up and get the ticket with a lot of discount</div>
        </div>
        <section className="movies-grid">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </section>
      </section>
      <section className="why-us">
        <div>WHY CHOOSE US</div>
        <div>Unleashing the Ultimate Movie Experience</div>
        <div className="why-us-multi">
          <span>
            <span>
              <img
                src="../assets/icons/Shield Done.png"
                alt="Shield Done Icon"
              />
            </span>
            <div className="choose-us-reason">Guaranteed</div>
            <p className="choose-us-p">
              Lorem ipsum dolor sit amet, consectetur adipis elit. Sit enim nec,
              proin faucibus nibh et sagittis a. Lacinia purus ac amet.
            </p>
          </span>
          <span>
            <span>
              <img
                src="../assets/icons/check-circle-fill.png"
                alt="Shield Done Icon"
              />
            </span>
            <div className="choose-us-reason">Affordable</div>
            <p className="choose-us-p">
              Lorem ipsum dolor sit amet, consectetur adipis elit. Sit enim nec,
              proin faucibus nibh et sagittis a. Lacinia purus ac amet.
            </p>
          </span>
          <span>
            <span>
              <img
                src="../assets/icons/icons8-speech-bubble 1.png"
                alt="Shield Done Icon"
              />
            </span>
            <div className="choose-us-reason">24/7 Customer Support</div>
            <p className="choose-us-p">
              Lorem ipsum dolor sit amet, consectetur adipis elit. Sit enim nec,
              proin faucibus nibh et sagittis a. Lacinia purus ac amet.
            </p>
          </span>
        </div>
      </section>

      {/* <!-- Exciting Movies --> */}
      <section className="exciting-movies">
        <div className="blue-18">MOVIES</div>
        <div
        // style="
        //   display: flex;
        //   flex-direction: column;
        //   align-items: center;
        //   margin-bottom: 12px;
        // "
        >
          <div>Exciting Movies That Should Be Watched Today</div>
        </div>

        {/* <!-- Grid Movies --> */}
        <div className="g-movie-list">
          {/* <!-- Black Widow --> */}
          <div className="f-singular-movie">
            <img src="../assets/images/black-widow.png" alt="" />
            <h3>Black Widow</h3>
            <div className="genres">
              <ul>
                <li>Drama</li>
                <li>Thriller</li>
              </ul>
            </div>
          </div>

          {/* <!-- The Witches --> */}
          <div className="f-singular-movie">
            <img src="../assets/images/the-witches.png" alt="" />
            <h3>The Witches</h3>
            <div className="genres">
              <ul>
                <li>Comedy</li>
                <li>Adventure</li>
              </ul>
            </div>
          </div>

          {/* <!-- Tenet --> */}
          <div className="f-singular-movie">
            <img src="../assets/images/tenet.png" alt="" />
            <h3>Tenet</h3>
            <div className="genres">
              <ul>
                <li>Action</li>
                <li>Sci-Fi</li>
              </ul>
            </div>
          </div>

          {/* <!-- Spiderman --> */}
          <div className="f-singular-movie">
            <img src="../assets/images/spiderman-poster.png" alt="" />
            <h3>Spiderman</h3>
            <div className="genres">
              <ul>
                <li>Action</li>
                <li>Adventure</li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <a className="blue-18-bold" href="#">
            <div>View All</div>
            <img src="../assets/icons/arrow-right.png" alt="" />
          </a>
        </div>
      </section>

      {/* <!-- Upcoming Movies --> */}
      <section className="upcoming-movies">
        <div className="blue-18">UPCOMING MOVIES</div>

        <div className="f-exciting-arrow">
          <div>Exciting Movie Coming Soon</div>
          <span className="f-left-n-right">
            <button className="left-arrow">
              <img
                src="../assets/icons/white-arrow-left.png"
                alt="Arrow Left"
              />
            </button>
            <button className="right-arrow">
              <img
                src="../assets/icons/white-arrow-right.png"
                alt="Arrow Right"
              />
            </button>
          </span>
        </div>

        {/* <!-- Grid Movies --> */}
        <div className="g-movie-list">
          {/* <!-- Black Widow --> */}
          <div className="f-singular-movie">
            <img src="../assets/images/black-widow.png" alt="" />
            <h3>Black Widow</h3>
            <div className="blue-18-bold">December 2024</div>
            <div className="genres">
              <ul>
                <li>Drama</li>
                <li>Thriller</li>
              </ul>
            </div>
          </div>

          {/* <!-- The Witches --> */}
          <div className="f-singular-movie">
            <img src="../assets/images/the-witches.png" alt="" />
            <h3>The Witches</h3>
            <div className="blue-18-bold">January 2024</div>
            <div className="genres">
              <ul>
                <li>Comedy</li>
                <li>Adventure</li>
              </ul>
            </div>
          </div>

          {/* <!-- Tenet --> */}
          <div className="f-singular-movie">
            <img src="../assets/images/tenet.png" alt="" />
            <h3>Tenet</h3>
            <div className="blue-18-bold">June 2024</div>
            <div className="genres">
              <ul>
                <li>Action</li>
                <li>Sci-Fi</li>
              </ul>
            </div>
          </div>

          {/* <!-- Spiderman --> */}
          <div className="f-singular-movie">
            <img src="../assets/images/spiderman-poster.png" alt="" />
            <h3>Spiderman</h3>
            <div className="blue-18-bold">March 2024</div>
            <div className="genres">
              <ul>
                <li>Action</li>
                <li>Adventure</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Subscribe --> */}
      <section className="subscribe">
        <div className="subscribe-text">
          <p>Subscribe to our newsletter</p>
        </div>
        <div className="subscribe-input">
          <input type="text" placeholder="First Name" />
          <input type="email" placeholder="Email address" />
          <button className="subscribe-button">Subscribe Now</button>
        </div>
      </section>
    </main>
  );
}

export default Home;
