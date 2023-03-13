const express = require('express');
const app = express();
const routes = require('./routes/routes');
const db =require('./database/db')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server Is running On http://localhost:${PORT}`);
});