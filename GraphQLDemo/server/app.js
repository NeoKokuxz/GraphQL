const express = require('express');

const app = express();

const { graphqlHTTP } = require('express-graphql');

const schema = require('./schema/schema');

const quest_schema = require('./schema/type_schema')

app.use('/graphql', graphqlHTTP({
    graphiql: true,
    //schema: schema
    schema: quest_schema
}))

app.listen(4000, () => {
    console.log('Listening to port 4000!');
})