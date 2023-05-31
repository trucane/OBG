const express = require('express');

const cors = require('cors');
require('dotenv').config();

const Twilio = require('twilio');
const accountSid = process.env.TWILIO_ACCOUNT_SID;

const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = Twilio(accountSid,authToken)


const app = express()
app.use(cors())

app.get('/', (req, res) => {
    res.send('server eorking')
})

app.get('/send-text', (req, res) => {
    const {recipient, textmessage} = req.query

    client.messages.create({
        body: textmessage,
        to: recipient,
        from: '+18445541622'
    }).then((message) => console.log(message.body))
    
})

const PORT = 4000

app.listen( PORT, () => console.log('rinning on port', PORT))
