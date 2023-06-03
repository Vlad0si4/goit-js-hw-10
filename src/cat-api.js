const BASE_URL = `https://api.thecatapi.com/v1`;
const API_KEY = "live_OnbMrWWkM2e98GdVeF8SlUMIsV5Ksx0JW1NWyW6U9QXIfVLUJWergCR8e7OFwZtk"


export function fetchBreeds() {
  const searchParams = new URLSearchParams({
    api_key: API_KEY
  });
  return fetch(`${BASE_URL}/breeds/?${searchParams}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status)
      }
      return response.json()
    })
}

export function fetchCatByBreed(breedId) {
  const searchParams = new URLSearchParams({
    breed_ids: breedId,
    api_key: API_KEY
  });

  return fetch(`${BASE_URL}/images/search/?${searchParams}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
}



