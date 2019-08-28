declare module '*.graphql' {
  import { DocumentNode } from 'graphql'
  const MyQuery: DocumentNode

  export { MyQuery }

  export default defaultDocument
}

declare module 'next-apollo'