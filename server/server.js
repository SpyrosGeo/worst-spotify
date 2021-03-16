const express = require('express')
const SpotifyWebApi = require('spotify-web-api-node')
require('dotenv').config()
const app = express()

const PORT = 4000;


app.post('/', async (req, res) => {
    const code = req.body.code
    const spotifyWebApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:3000',
        clientId: `${process.env.CLIENT_ID}`,
        clientSecret: `${process.env.CLIENT_SECRET}`
    })

    try {
        const data = await spotifyWebApi.authorizationCodeGrant(code)
        res.json({
            accessToken: data.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in
        })

    } catch (error) {
        res.sendStatus(400)
    }
})


app.listen(PORT, () => {
    console.log(`server running at ${PORT} port`)
})