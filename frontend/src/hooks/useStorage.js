import { useState, useEffect } from 'react';
import { projectStorage, projectFirestore, timestamp } from '../firebase/config';

const useStorage = (file) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    // references
    const userInfo = localStorage.getItem('userInfo') ? 
    JSON.parse(localStorage.getItem('userInfo'))
    : null 

    const storageRef = projectStorage.ref(`images/${userInfo._id}/${file.name}`);

    const collectionRef = projectFirestore.collection(`${userInfo._id}`);
    console.log(collectionRef);
    storageRef.put(file).on('state_changed', (snap) => {
      let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
      setProgress(percentage);
    }, (err) => {
      setError(err);
    }, async () => {
      const url = await storageRef.getDownloadURL();
      const createdAt = timestamp();
      await collectionRef.add({ url, createdAt });
      setUrl(url);
    });
  }, [file]);

  return { progress, url, error };
}

export default useStorage;