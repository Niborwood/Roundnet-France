import storage from "../../lib/init-firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import resizeImage from "../../helpers/resize-image";

export default async function uploadFileToStorage({
  file,
  endpoint,
  handleStateChange = () => {},
  allowOverwrite,
  width = 1800,
  height,
}) {
  // // handleStateChange in optional, make it void if not provided
  // if (!handleStateChange) {
  //   handleStateChange = () => {};
  // }

  // Check if file is an image  (type with? to avoid errors on file = URL)
  const isImage = file.type?.startsWith("image/");

  // Resize image to maxWidth of 1800px
  if (isImage) {
    try {
      file = await resizeImage({
        file,
        width,
        height,
      });
    } catch (err) {
      console.log(err);
    }
  }

  // Create a Promise to return upload and return url
  return new Promise((resolve, reject) => {
    // Prepare storage ref and upload task
    const randomID = Math.random().toString(36).substring(2, 7);

    const filename = allowOverwrite ? file.name : `${randomID}-${file.name}`;
    const storageRef = ref(storage, `${endpoint}/${filename}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Handle loading, error and success
    uploadTask.on(
      "state_changed",
      handleStateChange,
      // Handle error
      (error) => {
        reject(error);
      },
      // Handle success
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        return resolve(url);
      }
    );
  });
}
