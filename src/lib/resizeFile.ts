import Resizer from "react-image-file-resizer";

// 参考記事
// https://sunday-morning.app/posts/2021-08-10-react-image-file-resizer
export const resizeFile = (file: Blob) =>
  new Promise<string>((resolve) => {
    Resizer.imageFileResizer(
      file,
      300,
      300,
      "jpeg",
      80,
      0,
      (uri) => {
        resolve(uri as string);
      },
      "base64"
    );
  });
