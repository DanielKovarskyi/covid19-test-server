const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const corsOptions ={
    origin:"*",
    credentials:true,
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use(bodyParser.json());
const port = 3001;
const QRCode = require('qrcode');

app.get('/', (req, res) => {
    res.send("I'm a test QRcode app!")
})

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})

app.post('/qrcode', function (req, res) {
    let data_object = req.body.data;
    data_object.timestamp = Date.now().toString();
    QRCode.toDataURL(JSON.stringify(data_object), function (err, url) {
        res.send({...data_object, image: url});
    })
});