const router = require("express").Router()
const axios = require('axios');
require("dotenv").config()

router.post("/fetch-articles", async (req, res) => {
    const prompt = req.body.query

    if (!prompt) {
        return res.status(400).json({ error: "Server Error on Dashboard, prompt is required" })
    }

    const SERPER_API_KEY = process.env.SERPER_API_KEY

    try {
        const response = await axios.request({
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://google.serper.dev/search',
            headers: {
                'X-API-KEY': SERPER_API_KEY,
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({
                "q": "Sports Football Articles",
                "gl": "in",
                "tbs": "qdr:w"
            })
        })

        console.log(response.data)

        return res.status(200).json({ data: response.data })
    } catch (e) {
        console.error("Error fetching articles:", error);
        return res.status(400).json({ error: "Server Error on Dashboard while fetching articles" });
    }
})

module.exports = router
