import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '~/firebase';

const getImageUrl = async (imageFile: File | null, path: string) => {
  if (imageFile !== null) {
    try {
      const imageRef = ref(
        storage,
        `${path}/${imageFile.name + crypto.randomUUID()}`
      );
      const snapshot = await uploadBytes(imageRef, imageFile);
      const url = await getDownloadURL(snapshot.ref);
      return url;
    } catch (error) {
      return console.log(error);
    }
  } else return null;
};

export default getImageUrl;
