# GraghQL Learning notes

## Query
each query includes fields and each field is a type

- query doesn't change the value or data

```graphql
#Indicates this is a query
query {
  toy {
    #fields from toy
    name
    id
    genre
    owner {
      name
    }
  }
}
```

### Root Query
> The root of all queries
```javascript
const RootQuery = new GraphQLObjectType({
    name: 'FoodRootQuery',
    description: 'This is Root Query desc',
    fields: {
        //Specific the type of data needed
        food: {
            type: FoodType, //Output type (FoodRootQuery.food)
            args: {
                id: { type: GraphQLID } //This is require input to search data (This can be implment as search by id or etc)
            }
    }
})
```
in GraphQL console:
```graphql
#Root Query contains all avaliable queries
{ 
  user(id: "4") {
    vegFood {
      name
      id
      price
      user {
        name
      }
    }
    specialFood {
      name
    }
  }
}
```

## Mutation

- mutation will create the date or update the data
```javascript
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        //Create User
        createUser: {
            type: UserType,
            args: {
                id: { type: GraphQLID }, //Id will be automatic with DB
                name: { type: GraphQLString },
                age: { type: GraphQLString }
            },
            resolve(parent, args) {
                let user = {
                    name: args.name,
                    id: args.id,
                    age: args.age
                }
                return user;
            }
       }
})
```

## Type 
```javascript
user: {
            type: UserType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parent, args) {
                return _.find(userData, { id: args.id })
            }
        },
```


