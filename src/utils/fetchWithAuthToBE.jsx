async function fetchWithAuth(url) {
  const response = await fetch(url, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_BEARER_TOKEN}`,
    },
  });
  if (!response.ok) throw new Error("Network response was not ok");
  return response.json();
}

export default fetchWithAuth;
