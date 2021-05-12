const express = require('express');

const app = express();

app.use(express.json());

const port = 5000;

app.get("/", (req: any, res: any) => {
    res.send("this is from express.js");
})

app.listen(port, () => {
    console.log('listening at port 5000');
});