import { GraphQLModule } from '@graphql-modules/core';
import { UserModule } from './user.schema';

export const modules = new GraphQLModule({
	imports: [
		UserModule,
	],
});
