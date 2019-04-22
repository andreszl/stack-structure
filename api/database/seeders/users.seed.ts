import jsf from 'json-schema-faker';
import fs from 'fs';

const schema = {
	type: 'object',
	properties: {
		user: {
			type: 'object',
			properties: {
				id: {
					$ref: '#/definitions/positiveInt',
				},
				name: {
					type: 'string',
					faker: 'name.findName',
				},
				email: {
					type: 'string',
					format: 'email',
					faker: 'internet.email',
				},
			},
			required: ['id', 'name', 'email'],
		},
	},
	required: ['user'],
	definitions: {
		positiveInt: {
			type: 'integer',
			minimum: 0,
			exclusiveMinimum: true,
		},
	},
};

jsf.resolve(schema);

const users: object[] = [];

for (let id = 1; id <= 100; id += 1) {
	const user = jsf.generate(schema); // [object Object]
	users.push(user);
}

fs.writeFile('users.seed.json', JSON.stringify(users), (err) => {
	if (err) {
		return console.log(err);
	}
	console.log('Data generated.');
	return 'a';
});
