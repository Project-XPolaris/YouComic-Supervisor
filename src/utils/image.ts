import ApplicationConfig from '@/config';
import Resizer from "react-image-file-resizer";

export function getImageURL(path: string): string {
  return `${ApplicationConfig.apiURL}${path}`;
}

export function getCoverThumbnailURL(path: string): string {
  return `${ApplicationConfig.apiURL}${path}`.replace("cover", "cover_thumbnail")

}

export const createImage = url =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', error => reject(error));
    image.setAttribute('Access-Control-Allow-Origin', '*'); // needed to avoid cross-origin issues on CodeSandbox
    image.src = url;
  });


export async function getCroppedImg(imageURL:string, crop:any, fileName:string) {
  const image  = await createImage(imageURL);
  const canvas:HTMLCanvasElement = document.createElement('canvas');
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  canvas.width = crop.width;
  canvas.height = crop.height;
  const ctx = canvas.getContext('2d');
  ctx!!.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width,
    crop.height,
  );

  // As Base64 string
  // const base64Image = canvas.toDataURL('image/jpeg');

  // As a blob

  return new Promise((resolve, reject) => {
    canvas.toBlob(blob => {
      resolve(blob);
    }, 'image/jpeg', 1);
  });
}

export function getPageThumbnailImage({file}:{file:File}){
  console.log(file)
  return new Promise((resolve, reject) => {
    Resizer.imageFileResizer(
      file,
      300,
      300,
      'JPEG',
      100,
      0,
      (uri:string) => {
        resolve(uri)
      },
    )
  })
};
