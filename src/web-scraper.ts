import express from 'express';
import axios from 'axios';
import cheerio from 'cheerio';
import mongoose from './database/mongodb_conect';
const app = express();
const port = 3000;

app.get('/scrape', async (req, res) => {
  try {
    const url = 'https://www.useragents.me//'; 
    const customUserAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36 Edg/119.0.0.0'; // Replace with your desired User-Agent

    const config = {
      headers: {
        'User-Agent': customUserAgent,
      }
    };
    const response = await axios.get(url,config);
    const $ = cheerio.load(response.data);
     
    const imageDiv = $('.images--imageWindow--1Z-J9gn');

    // Extract the image URLs
    const imageUrls = imageDiv.find('img').map((index, element) => $(element).attr('src')).get();
    
    
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while scraping the website.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

