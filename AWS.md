# AWS Notes

## AWS System Overview Architecture

- GraphQL Proxy
  - A component that runs the GraphQL engine for processing requests and mapping them to logical functions for data operations or triggers
- Operation
  - Query, Mutation and Subscriptions
- Action
  - A notification to connected subscribers which is the result of a mutation
- Resolver
  - A function that converts the GraphQL payload to the underlying storage system protocol and executes if the caller is authorized to invoke it
- Function
  - A function defines a single operation that can be used across pipeline resolvers. Functions can be reused to perform redundant logic throughout the GraphQL Proxy
