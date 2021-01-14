# GraghQL Learning notes

## Query
each query includes fields and each field is a type

```graphql
#Indicates this is a query
query {
  toy {
    //fields from toy
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

