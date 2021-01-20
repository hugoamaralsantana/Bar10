const express = require('express');
const connectDB = require('./config/db');

const app = express();

//Connect Database
connectDB();

//Initialize Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => {
  res.send('API Running');
});

//Define Routes Files
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/ingredients', require('./routes/api/ingredients'));
app.use('/api/tools', require('./routes/api/tools'));
app.use('/api/articles', require('./routes/api/articles'));
app.use('/api/profiles', require('./routes/api/profiles'));
app.use('/api/recipes', require('./routes/api/recipes'));
app.use('/api/users', require('./routes/api/users'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
