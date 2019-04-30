import { userFactory } from '../../database/factories/user.factory';
import UserModel from '../../models/user.model';

jest.mock('../../controllers/users.controller');

describe('getAll', () => {
	it('should return list of users', async () => {
		const users = userFactory.buildList(10);

		jest.spyOn(UserModel, 'getAll').mockResolvedValue(users);
		expect(await UserModel.getAll()).toEqual(users);

	});
});
