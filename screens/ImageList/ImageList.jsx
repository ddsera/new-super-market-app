import { StyleSheet, Text, View, Button, Image } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';
import { launchImageLibrary } from 'react-native-image-picker';

const BACKEND_IMAGE_UPLOAD_URL =
  'http://13.232.150.130:3000/api/v1/uploads/image'; // <-- Replace with your backend URL

const ImageList = () => {
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState('');

  const handlePickAndUpload = async () => {
    setStatus('');
    launchImageLibrary({ mediaType: 'photo', quality: 0.7 }, async response => {
      if (response.didCancel) return;
      if (response.errorCode) {
        setStatus(
          'Image Picker Error: ' + (response.errorMessage || 'Unknown error'),
        );
        return;
      }
      if (response.assets && response.assets.length > 0) {
        const img = response.assets[0];
        setImage(img);
        // Prepare FormData
        const formData = new FormData();
        formData.append('image', {
          uri: img.uri,
          name: img.fileName || 'upload.jpg',
          type: img.type || 'image/jpeg',
        });
        // Add userId to track which user uploaded the image
        formData.append('userId', 'user123'); // Replace with actual user ID from your auth system
        try {
          const res = await axios.post(BACKEND_IMAGE_UPLOAD_URL, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
          setStatus('Upload successful!');
          // Reload images after successful upload
          loadImages();
        } catch (err) {
          console.error('Upload error:', err);
          setStatus(
            'Upload failed: ' + (err.response?.data?.message || err.message),
          );
        }
      }
    });
  };

  // Function to load images from backend
  const [imageList, setImageList] = useState([]);
  const [loadingImages, setLoadingImages] = useState(false);

  const loadImages = async () => {
    setLoadingImages(true);
    setStatus('');
    try {
      const res = await axios.get(
        'http://13.232.249.40:3000/uploads-customers/${items.image}',
      ); // <-- Replace with your backend list endpoint
      setImageList(res.data.images || []);
    } catch (err) {
      setStatus(
        'Failed to load images: ' +
          (err.response?.data?.message || err.message),
      );
    } finally {
      setLoadingImages(false);
    }
  };

  React.useEffect(() => {
    loadImages();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ImageList</Text>
      <Button title="Pick and Upload Image" onPress={handlePickAndUpload} />
      {image && (
        <Image source={{ uri: image.uri }} style={styles.imagePreview} />
      )}
      {status ? <Text style={styles.status}>{status}</Text> : null}
      <Button title="Reload Images" onPress={loadImages} />
      {loadingImages ? (
        <Text>Loading images...</Text>
      ) : imageList.length > 0 ? (
        <View style={{ width: '100%' }}>
          {imageList.map((img, idx) => (
            <Image
              key={img._id || idx}
              source={{ uri: img.url || img.uri }}
              style={styles.imagePreview}
            />
          ))}
        </View>
      ) : (
        <Text>No images found.</Text>
      )}
    </View>
  );
};

export default ImageList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  imagePreview: {
    width: 150,
    height: 150,
    borderRadius: 8,
    marginVertical: 20,
  },
  status: {
    marginTop: 10,
    fontSize: 16,
    color: 'green',
  },
});
