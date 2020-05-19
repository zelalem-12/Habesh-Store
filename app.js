// importing modules
const  express = require('express');
const  mongoose= require('mongoose');
const  bodyParser = require('body-parser');
const  fileUpload = require('express-fileupload');
const  path = require('path');
const  dotenv = require('dotenv');

// importing files 
const  userRoute = require('./routes/user-route');
const  productRoute = require('./routes/product-route');
const  orderRoute = require('./routes/order-route');
const  contactRoute = require('./routes/contact-route');
const  config = require('./config');

// defining global variables
const log = console.log;

// static files 
const products = path.join(__dirname, 'client','public','products');

dotenv.config();

const mongodbUrl = config.MONGODB_URL;
const port = config.PORT;
mongoose
  .connect(mongodbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .catch(err => console.log(err));

const app = express();  
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );
  next();
});
app.use(bodyParser.json());

app.use('/api/products', productRoute);
app.use('/api/users', userRoute);
app.use('/api/orders', orderRoute);
app.use('/api/contacts', contactRoute);

app.get('/api/config/paypal', (req, res) => {
  res.send(config.PAYPAL_CLIENT_ID);
});

app.use(express.static(path.join(__dirname, '/client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/client/build/index.html`));
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const status = err.name && err.name === 'ValidationError' ? 400 : 500;
  res.status(status);
  res.send({ message: err.message });
});


app.use('/products', express.static(products));

app.use(fileUpload());
app.post('/products', (req, res) => {
  // console.log(req.files);
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }
  const { imageUrl } = req.files;
  const { name } = imageUrl;
  const imgType = name.split('.')[1];
  const filename = `${new Date().getTime()}.${imgType}`;
  imageUrl.mv(`${products}/${filename}`, (err) => {
    if (err) return res.status(500).send(err);
    res.send(`products/${filename}`);
  });
});
app.listen(port, () => log(`Server serves at http://localhost:${port}`));
