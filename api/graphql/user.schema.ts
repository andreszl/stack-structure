import { GraphQLModule } from '@graphql-modules/core';
import gql from 'graphql-tag';
import UserModel from '../models/user.model'

export const UserModule = new GraphQLModule({
  typeDefs: gql`
    type Query {
      hello(name: String): String!,
      users: [User],
      findUserById(id: String!): [User]!,
      findUsersByName(name: String!): [User]!
    }

   type User {
      id: String!
      name: String!
      role: String!
      status: String!
      createdAt: String!
      updatedAt: String
    }

    type Mutation {
      addUser(name: String!, role: String!): User
    }
  `, 
  
  resolvers: {
    Query: {
      hello: (_, {name}) => `hello ${name || "world"}`,
      users : async () => {        
        return await UserModel.find()
      },
      findUserById: async (_, {id}) => {
        const user = await UserModel.findById(id)
        return user
      },
      findUsersByName: async (_, {name}) => {
        const user = await UserModel.findUsersByName(name)
        return user
      },     
    },
    Mutation: {
      addUser: async (_, {name, role}) => {
        let user = {
          name,
          role,
          status: false
        }
        let data = await UserModel.save(user)   
        return data     
      }
    },
    User: {
      id: user => user._id,
      name: user => user.name,
      role: user => user.role,
      status: user => user.status,
      createdAt: user => user.createdAt,
      updatedAt: user => user.updatedAt,
    }
  },
});
