import { userRoutes } from './users.routes';
import { authRoutes } from './auth.routes';
import NotFound from '../components/notFound.component';
import Home from '../components/home.component';

const routes = [
	userRoutes,
	authRoutes,
	{
		path: '/home',
		exact: true,
		component: Home,
	},
	{
		path: '*',
		exact: true,
		component: NotFound,
		status: 404,
	},
];

export default routes;
