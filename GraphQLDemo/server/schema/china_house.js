const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLBoolean,
    GraphQLList,
    GraphQLFloat,
    GraphQLInt,
    GraphQLSchema,
} = graphql


//Types goes before the root query
const Order = new GraphQLObjectType({
    name: "OrderQuery",
    description: "Order",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },

    })
})

//RootQuery
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    description: "This is the root query",
    fields: {
        // order: {
        //     type: Anthony,
        //     args: {
        //         id: {
        //             type: GraphQLID
        //         }
        //     },
        //     resolve(parent, args) {
        //         return null;
        //     }
        // },
        //Here goes all the types like user, location, quest
        orderList: {
            type: GraphQLList(Anthony),
            resolve(parent, args) {
                return AnthonyData;
            }
        }
    }
})

//Type

///Scalar Type
/*
    String = GraphQLObjectType
    int
    Float
    Boolean
    ID
*/

const AnthonyData = [
    { id: '1', name: 'Anthony Chen', age: '10' },
    { id: '2', name: 'Neo Chen', age: '25' }
]

const List = [{
        id: '1',
        name: 'Neo',
    },
    {
        id: '2',
        name: 'Jack'
    }
]

const Quest = new GraphQLObjectType({
    name: 'Quest',
    description: 'This is quest type',
    fields: () => ({
        id: { type: GraphQLID },
        userName: { type: GraphQLString },
        detail: { type: GraphQLString },
        date: { type: GraphQLString },
        location: { type: GraphQLString },
        completion: { type: GraphQLBoolean },
        reward: { type: GraphQLFloat }
    })
})

//Export the module 
module.exports = new GraphQLSchema({
    query: RootQuery
})