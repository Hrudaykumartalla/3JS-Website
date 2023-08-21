import express from 'express';
import * as dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const router = express.Router();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY 
  });

router.route('/').get((req, res) => {
    res.status(200).json({ message: "Hello from DALL.E ROUTES" })
  })

  router.route('/').post(async (req, res) => {
    try {
      const { prompt } = req.body;
  
      const response = await openai.images.generate({
        prompt,
        n: 1,
        size: '1024x1024',
        response_format: 'b64_json'
      });

    //   console.log('Response Data:', response.data);
  
    const imageDataArray = response.data; // Array of image data objects

    if (imageDataArray.length > 0) {
      const image = imageDataArray[0].b64_json; // Get the base64-encoded image data
      res.status(200).json({ photo: image });
    } else {
      res.status(500).json({ message: "Image data not available in the response" });
    }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" })
    }
  })
  
  export default router;