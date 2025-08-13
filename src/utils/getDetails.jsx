function getDetails(rawData) {
  const movieDetails = {};

  // backdropPath
  Object.assign(movieDetails, { backdropPath: rawData.backdrop_path });

  // posterPath
  Object.assign(movieDetails, { posterPath: rawData.poster_path });

  // genres
  Object.assign(movieDetails, {
    genres: rawData.genres.map((el) => {
      return el.name;
    }),
  });

  // title
  Object.assign(movieDetails, { originalTitle: rawData.title });

  // overview
  Object.assign(movieDetails, { overview: rawData.overview });

  // releaseDate
  Object.assign(movieDetails, { releaseDate: rawData.release_date });

  // runtime
  Object.assign(movieDetails, { runtime: rawData.runtime });

  return movieDetails;
}

export default getDetails;
