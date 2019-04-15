import { GraphQLModule } from '@graphql-modules/core';
import gql from 'graphql-tag';
import UserModel from '../models/user.model';

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
			hello: (_, { name }): string => `hello ${name || 'world'}`,
			users: async (): Promise<Function> => {
				const users = await UserModel.find();
				return users;
			},
			findUserById: async (_, { id }): Promise<Function> => {
				const user = await UserModel.findById(id);
				return user;
			},
			findUsersByName: async (_, { name }): Promise<Function> => {
				const user = await UserModel.findUsersByName(name);
				return user;
			},
		},
		Mutation: {
			addUser: async (_, { name, role }): Promise<Function> => {
				const user = {
					name,
					role,
					status: false,
				};

				const data = await UserModel.save(user);
				return data;
			},
		},
		User: {
			id: (user): string => user._id,
			name: (user): string => user.name,
			role: (user): string => user.role,
			status: (user): boolean => user.status,
			createdAt: (user): Date => user.createdAt,
			updatedAt: (user): Date => user.updatedAt,
		},
	},
});
