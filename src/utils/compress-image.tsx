import imageCompression from 'browser-image-compression';

interface ICompressImage {
  imageFile: File;
  size: number;
}

export default async function CompressImage({
  imageFile,
  size,
}: ICompressImage) {
  if (!imageFile) {
    return null;
  }
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: size,
    useWebWorker: true,
  };
  try {
    const compressedFile = await imageCompression(imageFile, options);
    return compressedFile;
  } catch (error) {
    console.error('Image compression error:', error);
    return null;
  }
}
