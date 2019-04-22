import Login from '../components/auth/login.component';
import Register from '../components/auth/register/register.component';

export const authRoutes : any = [
	{
		path: '/login',
		exact: true,
		component: Login,
	},
	{
		path: '/register',
		exact: true,
		component: Register,
	},
];
