
it('adds 1 + 2 to equal 3 in Typescript', () => {
    const sum = require('../../../utils/sum.ts').default;
    expect(sum(1, 2)).toBe(3);
});

