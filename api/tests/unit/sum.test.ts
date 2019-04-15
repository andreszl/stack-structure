import sum from '../../../utils/functions/operations.util';

it('adds 1 + 2 to equal 3 in Typescript', (): void => {
	expect(sum(1, 2)).toBe(3);
});
