function getCredits(rawCredits) {
  const castList = [];

  // Get cast
  rawCredits.cast.splice(0, 3).map((el) => {
    castList.push(el.original_name);
  });

  // Get director
  const director = rawCredits.crew.find(
    (element) => element.job === "Director",
  ).name;

  return { castList, director };
}

export default getCredits;
