import { userRoutes } from './users.routes';
import { authRoutes } from './auth.routes';
import { matchRoutes } from './match.routes';
import Home from '../components/home.component';

const homeRoute: any = 	{
	path: '/',
	exact: true,
	component: Home,
};

const routes: any = [].concat(
	authRoutes,
	userRoutes,
	homeRoute,
	matchRoutes,
);

export default routes;
