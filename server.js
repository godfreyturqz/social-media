require('dotenv/config')
const app = require('express')()
const mongoose = require('mongoose')
const { ApolloServer } = require('apollo-server-express')
// RELATIVE FILES
const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')

// ------------------------------
// APOLLO SERVER
// ------------------------------
const server = new ApolloServer({typeDefs, resolvers})
server.applyMiddleware({app})
const PORT = process.env.PORT || 5000

app.listen({port: PORT}, () => {
  console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`)
})

// ------------------------------
// DB CONNECTION
// ------------------------------
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
.then(() => console.log('Connected to MongoDB'))
.catch(error => console.log(error))