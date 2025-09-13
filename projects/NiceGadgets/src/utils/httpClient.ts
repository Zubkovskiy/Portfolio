const BASE_URL = '/api';

export const getData = async <T>(url: string): Promise<T> => {
  const response = await fetch(BASE_URL + url);

  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
};
