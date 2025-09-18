async function apiFetch(url, method, token) {
  const request = new Request(`${import.meta.env.VITE_BE_HOST}${url}`, {
    method: method,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const response = await fetch(request);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }

  const data = await response.json();
  return data.data;
}

export default apiFetch;
