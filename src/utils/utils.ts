export const capitalize = (input?: string) => {
  if (input) {
    return input.charAt(0).toUpperCase() + input.slice(1);
  }
  return null;
};

export const getUrlParams = (url: string) => {
  let hashes = url.slice(url.indexOf("?") + 1).split("&");
  return hashes.reduce((params, hash) => {
    let [key, val] = hash.split("=");
    return Object.assign(params, { [key]: decodeURIComponent(val) });
  }, {});
};
