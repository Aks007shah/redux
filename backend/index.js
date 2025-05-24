
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const port = 3100;
const mongoD = require('./mongo')
const authRoute = require('./routes/auth')
const todoRoute = require('../backend/routes/Todo')
const productRoute = require('./routes/Products')
const newProduct = require('./routes/Productsnew')

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/auth', authRoute)
app.use('/todo', todoRoute)
app.use('/products', productRoute)
app.use('/newproduct', newProduct)

mongoD.then(()=>{
    app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
})

