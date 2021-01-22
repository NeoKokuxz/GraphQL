const express = require('express');

const app = express();

const { graphqlHTTP } = require('express-graphql');

//const schema = require('./server/schema/schema');

const quest_schema = require('./server/schema/quest_schema')

const mongoose = require('mongoose')

const port = process.env.PORT || 4000;

app.use('/graphql', graphqlHTTP({
    graphiql: true,
    //schema: schema
    schema: quest_schema
}))

app.listen(port, () => {
    console.log('Listening to port' + port);
})

//MongoDB 
const url = `mongodb+srv://user_admin:db123@cluster0.5maki.mongodb.net/demodb?retryWrites=true&w=majority`;

//CORS


const connectionParams = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}
mongoose.connect(url, connectionParams)
    .then(() => {
        console.log('Connected to database ')
    })
    .catch((err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })
    // mongoose.connection.once('open', () => {
    //     console.log("Connected to db");
    // })