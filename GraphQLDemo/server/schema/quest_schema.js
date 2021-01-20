const graphql = require('graphql');

//Model import
const User = require('../model/User');
const Quest = require('../model/Quest');
const { Mongoose } = require('mongoose');
const mongoose = require('mongoose')
const Location = require('../model/Location');

//lodash
var _ = require('lodash');
const { deleteOne } = require('../model/User');

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

// const QuestData = [
//     { id: '1', userName: 'Neo Chen', detail: 'This is a test quest by Neo', date: '2021-01-19', location: 'NYC', completion: false, reward: '50.00 USD' },
//     { id: '2', userName: 'Jack Camas', detail: 'This is a test quest by Jack', date: '2021-01-19', location: 'NYC', completion: false, reward: '50.00 USD' },
//     { id: '3', userName: 'Tyler Zhao', detail: 'This is a test quest by Tyler', date: '2021-01-19', location: 'NYC', completion: false, reward: '50.00 USD' },
//     { id: '4', userName: 'Youssef Saab', detail: 'This is a test quest Youssef', date: '2021-01-19', location: 'NYC', completion: true, reward: '50.00 USD' },
//     { id: '5', userName: 'Aaron Nunuz', detail: 'This is a test quest by Aaron', date: '2021-01-19', location: 'NYC', completion: true, reward: '50.00 USD' }
// ]

//Type
//Types must goes before the root query
const QuestType = new GraphQLObjectType({
    name: 'Quest',
    description: 'This is quest type',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: new GraphQLNonNull(GraphQLString) },
        detail: { type: new GraphQLNonNull(GraphQLString) },
        date: { type: GraphQLString },
        location: { type: GraphQLString },
        completion: { type: GraphQLBoolean },
        reward: { type: GraphQLString },

        //This will return the parent quest object as a field
        // TestQuest: {
        //     type: QuestType,
        //     resolve(parent, args) {
        //         return parent;
        //     }
        // }
    })
})

const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'User Type',
    fields: {
        id: { type: GraphQLID },
        username: { type: GraphQLString },
        password: { type: GraphQLString }
    }
})

const LocationType = new GraphQLObjectType({
    name: 'Location',
    description: 'Location Type',
    fields: {
        id: { type: GraphQLID },
        latitude: { type: GraphQLFloat },
        longitude: { type: GraphQLFloat },
        questId: { type: GraphQLString }
    }
})

//RootQuery
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    description: "This is the root query",
    fields: {
        quest: {
            type: QuestType,
            args: {
                _id: { type: GraphQLID }
            },
            resolve(parent, args) {
                return Quest.findById(args._id);
            }
        },

        quests: {
            type: GraphQLList(QuestType),
            resolve(parent, args) {
                return Quest.find({});
            }
        },

        user: {
            type: UserType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                return User.findById(args.id);
            }
        },

        users: {
            type: GraphQLList(UserType),
            resolve(parent, args) {
                return User.find({});
            }
        }
    }
})

//Mutation
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createUser: {
            type: UserType,
            args: {
                username: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            resolve(parent, args) {
                let user = new User({
                    username: args.username,
                    password: args.password
                })

                user.save();
                return user;
            }
        },

        createQuest: {
            type: QuestType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                detail: { type: new GraphQLNonNull(GraphQLString) },
                date: { type: new GraphQLNonNull(GraphQLString) },
                location: { type: new GraphQLNonNull(GraphQLString) },
                completion: { type: new GraphQLNonNull(GraphQLBoolean) },
                reward: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                //Create new quest object instance
                let quest = new Quest({
                        name: args.name,
                        detail: args.detail,
                        date: args.date,
                        location: args.location,
                        completion: args.completion,
                        reward: args.reward
                    })
                    //Save to MongoDB
                quest.save();

                return quest;
            }
        },

        createLocation: {
            type: LocationType,
            args: {
                latitude: { type: GraphQLFloat },
                longitude: { type: GraphQLFloat },
                questId: { type: GraphQLString }
            },
            resolve(parent, args) {
                let location = new Location({
                    latitude: args.latitude,
                    longitude: args.longitude,
                    questId: args.questId
                })

                location.save();
                return location;
            }
        }
    }
})

//Export the module 
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
})