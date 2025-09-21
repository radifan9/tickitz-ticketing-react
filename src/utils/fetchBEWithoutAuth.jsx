async function fetchBEWithoutAuth(method, url) {
  const response = await fetch(url, {
    method: method,
    headers: {
      accept: "application/json",
    },
  });
  if (!response.ok) {
    console.log(response);
    throw new Error("Network response was not ok");
  }
  return response.json();
}

export default fetchBEWithoutAuth;
