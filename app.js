const Express = require("express");
const { graphqlHTTP } = require("express-graphql");
const Mongoose = require("mongoose");
const schema = require('./schema/schema')

const app = Express();

Mongoose.connect("mongodb://localhost/mongo-graphql", {
  useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
  .then(() => console.log("Connecto to the db"))
  .catch((err) => console.log("Not connect to the db", err));


app.use('/graphql', graphqlHTTP({
  schema,
  graphiql:true
}))

const port = process.env.PORT || 3000
app.listen(port, ()=> console.log(`Listening on the ...${port}....`));