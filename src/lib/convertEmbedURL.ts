export const convertEmbedURL = (url: string) => {
  let id = "";
  const regExp =
    /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/;
  const match = url.match(regExp);
  if (match !== null) {
    id = match[1];
  }
  return `https://www.youtube.com/embed/${id}`;
};
