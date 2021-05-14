const express = require('express');

const app = express();

app.use(express.json());

const port = process.env.PORT || 5000;

app.get("/", (req: any, res: any) => {
    res.send("this is from express.js");
})

app.get("/api/users", (req: any, res: any) => {
    res.send([1, 2, 3]);
});

app.get("/api/users/:id", (req: any, res: any) => {
    res.send(req.params);
})

app.listen(port, () => {
    console.log(`listening at port ${port}`);
});