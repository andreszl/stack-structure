import * as Factory from 'factory.ts';
import faker from 'faker';
import User from '../../models/interfaces/user.interface'; // eslint-disable-line no-unused-vars

export const userFactory = Factory.Sync.makeFactory<User>({
	id: faker.random.uuid(),
	firstName: faker.name.firstName(),
	lastName: faker.name.lastName(),
	email: faker.internet.email(),
	role: faker.lorem.word(),
});

const user = userFactory.build();
console.log(user);
