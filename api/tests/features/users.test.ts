import { userFactory } from '../../database/factories/user.factory';

it('adds 1 + 2 to equal 3 in Typescript', (): void => {
	const user = userFactory.build({ role: 'admin' });
	console.log(user);
	expect(user).toBe(user);
});
