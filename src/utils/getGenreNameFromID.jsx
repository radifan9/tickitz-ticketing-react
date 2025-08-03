const getGenreNameFromID = (listOfGenreID, listOfGenreName) => {
  return listOfGenreID
    .map((id) => {
      const genreObj = listOfGenreName.find((el) => id === el.id);
      return genreObj ? genreObj.name : null;
    })
    .filter(Boolean);
};

export default getGenreNameFromID;
