import { GraphQLModule } from '@graphql-modules/core';
import gql from 'graphql-tag';
import UserModel from '../models/user.model'

export const UserModule = new GraphQLModule({
  typeDefs: gql`
    type Query {
      hello(name: String): String!,
      users: [User]
    }

    type User {
      id: String!
      name: String!
      role: String!
      status: String!
      createdAt: String!
      updatedAt: String
    }
  `,
  
  resolvers: {
    Query: {
      hello: (_, {name}) => `hello ${name || "world"}`,
      users : async () => {
        const users = await UserModel.find()
        return users
      }
    },
    User: {
      id: user => user._id,
      name: user => user.name,
      role: user => user.role,
      status: user => user.status,
      createdAt: user => user.createdAt,
      updatedAt: user => user.updatedAt,
    }, 
  },
});
