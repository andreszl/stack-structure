interface User {
	_id: string;
	name: string;
	password: string;
	role: string;
	status: boolean;
	createdAt: Date;
	updatedAt: Date;
}

export default User;
