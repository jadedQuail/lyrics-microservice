const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = 7981;

app.use(cors());

const lyricsData = JSON.parse(fs.readFileSync("lyrics.json", "utf-8"));

app.get("/lyrics", (req, res) => {
    const { song } = req.query;

    if (lyricsData[song]) {
        res.json({
            song,
            lyrics: lyricsData[song]
        });
    } else {
        res.status(404).json({
            error: "Song not found",
            message: `No lyrics available for '${song}'.`
        });
    }
});

app.listen(PORT, () => {
    console.log(`Song Recommendation Service is running on http://localhost:${PORT}`);
});