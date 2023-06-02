import imageCompression from 'browser-image-compression';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '~/firebase';

const compressOptions = {
  maxSizeMB: 1,
  maxWidthOrHeight: 1920,
  useWebWorker: true,
};

const getImageUrl = async (imageFile: File | null, path: string) => {
  if (imageFile !== null) {
    try {
      const compressedFile = await imageCompression(imageFile, compressOptions);
      const imageRef = ref(
        storage,
        `${path}/${compressedFile.name + crypto.randomUUID()}`
      );
      const snapshot = await uploadBytes(imageRef, compressedFile);
      const url = await getDownloadURL(snapshot.ref);
      return url;
    } catch (error) {
      return console.log(error);
    }
  } else return null;
};

export default getImageUrl;
