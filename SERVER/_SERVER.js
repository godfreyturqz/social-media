require('dotenv/config')
const app = require('express')()
const mongoose = require('mongoose')

const middlewares = require('./middlewares')

//--------------------------------------------------------------
// MIDDLEWARES
//--------------------------------------------------------------
app.use(...middlewares)

//--------------------------------------------------------------
// ROUTES
//--------------------------------------------------------------
app.get('/', (req, res) => {
    res.send('sample')
})

//--------------------------------------------------------------
// DB CONNECTION
//--------------------------------------------------------------
const PORT = process.env.PORT || 5000

mongoose.connect(process.env.DB_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true
})
.then(() => app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`)))
.catch(error => console.log(error))