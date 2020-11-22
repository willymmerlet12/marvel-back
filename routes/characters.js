const express = require("express");
const router = express.Router();
const md5 = require("md5");
const axios = require("axios");

// creation of TS
const date = new Date();
const timestamp = date.getTime() / 1000;
const ts = Math.floor(timestamp);

const marvelPublicKey = "74c399ef61aa9b282e01be055c605add";
const hash = md5(ts + process.env.MARVEL_PRIV_KEY + marvelPublicKey).toString();

router.get("/character", async (req, res) => {
  let search;

  const { name, page } = req.query;
  let offset = page * 100 - 100;
  if (name !== "") {
    search = `&startingwith=${name}`;
  }

  try {
    const response = await axios.get(
      `https://gateway.marvel.com/v1/public/characters?orderBy=name&ts=${ts}&apikey=${marvelPublicKey}&hash=${hash}&limit=100&offset=${offset}` +
        search
    );

    console.log(response.data);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/character/:id", async (req, res) => {
  try {
    const response = await axios.get(
      `https://gateway.marvel.com/v1/public/characters/${req.params.id}?ts=${ts}&apikey=${marvelPublicKey}&hash=${hash}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

module.exports = router;
