import { GraphQLModule } from '@graphql-modules/core';
import { UserModule } from './user.schema';

export const modules : any = new GraphQLModule({
  imports: [
    UserModule
  ],
});