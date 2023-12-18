# Adding a GraphQL Query:

1. Design the GraphQL query: https://api.thegraph.com/subgraphs/name/papercliplabs/compound-v3-mainnet
2. Create a `.graphql` file for the query in `graphql/queries`.
3. Run the code generator: `npm run graphql-codegen`.
4. Execute the query using the GraphQL SDK. Refer to examples in `__test__/graphql-sdk.test.ts`.
