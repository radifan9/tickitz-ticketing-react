async function apiFetchNoAuth(method, url) {
  const response = await fetch(url, {
    method: method,
    headers: {
      accept: "application/json",
    },
  });
  if (!response.ok) {
    const error = new Error("Request failed");
    error.status = response.status;
    throw error;
  }
  return response.json();
}

export default apiFetchNoAuth;
