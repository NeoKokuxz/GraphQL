const graphql = require('graphql');

//lodash
var _ = require('lodash')

//This selects what to use from the graphql library
const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLFloat,
    GraphQLSchema,
    GraphQLBoolean
} = graphql

//dummy data
var foodData = [
    { id: '1', name: 'egg roll', price: 1.5, edit: false },
    { id: '11', name: 'egg soup', price: 2.5, edit: true },
    { id: '12', name: 'egg fried rice', price: 5.5, edit: true },
    { id: '13', name: 'shrimp roll', price: 1.6, edit: false },
    { id: '14', name: 'egg food young', price: 7.5, edit: true },
    { id: '15', name: 'wonton soup', price: 2.5, edit: true },
]

var specialData = [
    { id: '111', name: 'Orange Chicken', price: 10.75, edit: false, special: 'Chief' },
    { id: '112', name: 'General Tso Chicken', price: 10.75, edit: true, special: 'Chief' },
    { id: '122', name: 'Sweet Sour Chicken', price: 5.5, edit: true, special: 'Chief' },
    { id: '133', name: 'Pork Lo Mein', price: 1.6, edit: false, special: 'Dinner' },
    { id: '144', name: 'Shrimp Chow Mein', price: 7.5, edit: true, special: 'Lunch' },
    { id: '155', name: 'Mixed Vegetable', price: 2.5, edit: true, special: 'Dinner' },
]

var veganData = [
    { id: '233', name: 'Steam Mixed Vegetable', price: 10.5 },
    { id: '234', name: 'Steam Shrimp with Mixed Vegetable', price: 10.5 },
    { id: '235', name: 'Steam Pork with Mixed Vegetable', price: 10.5 },
    { id: '236', name: 'Steam Chicken with Mixed Vegetable', price: 10.5 }
]

//Create Types
//This type defines the fields can be search later in query
const FoodType = new GraphQLObjectType({
    name: 'Food',
    description: 'This is food',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        price: { type: GraphQLFloat },
        edit: { type: GraphQLBoolean }
    })
})

const SpecialFoodType = new GraphQLObjectType({
    name: 'SpecialFood',
    description: 'This is special menu for chief, lunch and dinner special',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        price: { type: GraphQLFloat },
        edit: { type: GraphQLBoolean },
        special: { type: GraphQLString }
    })
})

const VegFoodType = new GraphQLObjectType({
    name: 'VegFood',
    description: 'This is special healthy menu for vegan',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        price: { type: GraphQLFloat }
    })
})

//Root Query
const RootQuery = new GraphQLObjectType({
    name: 'FoodRootQuery',
    description: 'This is Root Query desc',
    fields: {
        //Specific the type of data needed
        food: {
            type: FoodType, //Output type (FoodRootQuery.food)
            args: {
                id: { type: GraphQLID } //This is require input to search data (This can be implment as search by id or etc)
            },
            //Result Below
            resolve(parent, args) {
                //Resolve with data
                //Get and return data from a datasource

                // //init data
                // let food = {
                //     id: '123',
                //     //name: 'spring roll',
                //     //price: 1.60
                // }

                // Method that go through each element and find match id then return it
                // foodData.forEach(element => {
                //     if (element.id === args.id) {
                //         //console.log('element id: ' + element.id);
                //         //console.log(args.id);
                //         food = element;
                //     }
                // })

                // //return init data
                // return food;

                //lodash method
                return _.find(foodData, { id: args.id })
            }
        },

        special: {
            type: SpecialFoodType,
            args: {
                //id: { type: GraphQLID }
                special: { type: GraphQLString }
            },
            //Result
            resolve(parent, args) {
                return _.find(specialData, { special: args.special })
            }
        },

        vegan: {
            type: VegFoodType,
            args: {
                name: { type: GraphQLString }
            },
            resolve(parent, args) {
                return _.find(veganData, { name: args.name })
            }
        }
    }
})

//Export the module 
module.exports = new GraphQLSchema({
    query: RootQuery
})