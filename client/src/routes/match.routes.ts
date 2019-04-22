import NotFound from '../components/notFound.component';

export const matchRoutes : any = [
	{
		path: '*',
		exact: true,
		component: NotFound,
		status: 404,
	},
];
