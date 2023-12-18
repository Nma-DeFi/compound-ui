import type { CodegenConfig } from '@graphql-codegen/cli'
 
const config: CodegenConfig = {
   schema: 'https://api.thegraph.com/subgraphs/name/papercliplabs/compound-v3-mainnet',
   documents: './graphql/queries/*.graphql',
   generates: {
      './graphql/generated/sdk.ts': {
         plugins: ['typescript', 'typescript-operations', 'typescript-graphql-request'],
      }
   }
}
export default config