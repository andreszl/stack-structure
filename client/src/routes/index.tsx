import { userRoutes } from './users.routes'
import App from '../components/App'
import NotFound from '../components/NotFound'

const routes = [
    {
      path: '/',
      exact: true,
      component: App,
    },
    userRoutes,
    {
        path: '*',
        exact: true,
        component: NotFound,
        status: 404
    } 
  ]

  export default routes