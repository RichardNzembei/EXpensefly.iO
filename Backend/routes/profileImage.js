const express = require('express');
const router = express.Router();
const firestore = require('../firebaseConfig');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', upload.single('image'), async (req, res) => {
  const { userId } = req.body;
  const file = req.file;

  if (!userId || !file) {
    return res.status(400).json({ message: 'User ID and image file are required.' });
  }

  try {
    const imageRef = firestore.collection('users').doc(userId).collection('images').doc();
    await imageRef.set({
      imageData: file.buffer.toString('base64'),
      uploadedAt: new Date(),
    });

    res.status(201).json({ message: 'Image uploaded successfully', imageId: imageRef.id });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const imageSnapshot = await firestore.collection('users').doc(userId).collection('images').get();

        if (imageSnapshot.empty) {
            return res.status(200).json({ images: [] });
        }

        const images = imageSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        res.status(200).json({ images }); // Ensure you are returning the array correctly
    } catch (error) {
        console.error('Error fetching images:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


router.delete('/delete/:imageId', async (req, res) => {
  const { imageId } = req.params;
  const { userId } = req.body;

  if (!userId || !imageId) {
    return res.status(400).json({ message: 'User ID and image ID are required.' });
  }

  try {
    const imageRef = firestore.collection('users').doc(userId).collection('images').doc(imageId);
    await imageRef.delete();

    res.status(200).json({ message: 'Image deleted successfully', imageId });
  } catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
