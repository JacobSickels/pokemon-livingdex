export const request = <T>(path: string, init?: RequestInit): Promise<T> => {
  return fetch(`https://pokeapi.co/api/v2${path}`, init)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json() as Promise<T>;
    })
    .catch((error: Error) => {
      console.log(error);
      throw error;
    });
};

export const get = <T>(path: string) => request<T>(path, { method: "GET" });
export const post = <T>(path: string) => request<T>(path, { method: "POST" });
export const put = <T>(path: string) => request<T>(path, { method: "PUT" });
export const remove = <T>(path: string) =>
  request<T>(path, { method: "DELETE" });
