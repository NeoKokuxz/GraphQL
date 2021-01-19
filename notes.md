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

## Mutation

- mutation will create the date or update the data
```
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

