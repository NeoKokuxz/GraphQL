const graphql = require('graphql');

//Model import
const user = require('../model/User')
const quest = require('../model/Quest')
const location = require('../model/Location')

//lodash
var _ = require('lodash')

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLBoolean,
    GraphQLList,
    GraphQLFloat,
    GraphQLInt,
    GraphQLSchema,
    GraphQLNonNull
} = graphql

///Scalar Type
/*
    String = GraphQLObjectType
    int
    Float
    Boolean
    ID
*/

const QuestData = [
    { id: '1', userName: 'Neo Chen', detail: 'This is a test quest by Neo', date: '2021-01-19', location: 'NYC', completion: false, reward: '50.00 USD' },
    { id: '2', userName: 'Jack Camas', detail: 'This is a test quest by Jack', date: '2021-01-19', location: 'NYC', completion: false, reward: '50.00 USD' },
    { id: '3', userName: 'Tyler Zhao', detail: 'This is a test quest by Tyler', date: '2021-01-19', location: 'NYC', completion: false, reward: '50.00 USD' },
    { id: '4', userName: 'Youssef Saab', detail: 'This is a test quest Youssef', date: '2021-01-19', location: 'NYC', completion: true, reward: '50.00 USD' },
    { id: '5', userName: 'Aaron Nunuz', detail: 'This is a test quest by Aaron', date: '2021-01-19', location: 'NYC', completion: true, reward: '50.00 USD' }
]

//Types must goes before the root query
const Quest = new GraphQLObjectType({
    name: 'Quest',
    description: 'This is quest type',
    fields: () => ({
        id: { type: GraphQLID },
        userName: { type: new GraphQLNonNull(GraphQLString) },
        detail: { type: new GraphQLNonNull(GraphQLString) },
        date: { type: GraphQLString },
        location: { type: GraphQLString },
        completion: { type: GraphQLBoolean },
        reward: { type: GraphQLString },

        //This will return the parent quest object as a field
        TestQuest: {
            type: Quest,
            resolve(parent, args) {
                return parent;
            }
        }
    })
})

//RootQuery
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    description: "This is the root query",
    fields: {
        quest: {
            type: Quest,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parent, args) {
                return _.find(QuestData, { id: args.id })
            }
        },

        quests: {
            type: GraphQLList(Quest),
            resolve(parent, args) {
                return QuestData;
            }
        }
    }

})

//Export the module 
module.exports = new GraphQLSchema({
    query: RootQuery
})