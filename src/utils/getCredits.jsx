function getCredits(rawCredits) {
  const castList = [];

  // Get cast
  rawCredits.cast.splice(0, 3).map((el) => {
    castList.push(el.original_name);
  });

  return {castList};
}

export default getCredits;
