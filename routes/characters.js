const express = require("express");
const router = express.Router();
const md5 = require("md5");
const axios = require("axios");

// creation of TS
const date = new Date();
const timestamp = date.getTime() / 1000;
const ts = Math.floor(timestamp);

const marvelPublicKey = "49641a6feedff43b9eca11fbef7bd958";
const hash = md5(ts + process.env.MARVEL_PRIV_KEY + marvelPublicKey).toString();

router.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${marvelPublicKey}&hash=${hash}&limit=100`
    );

    console.log(response.data);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
