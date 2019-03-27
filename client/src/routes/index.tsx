import { userRoutes } from './users.routes'
import App from '../components/app.component'
import NotFound from '../components/notFound.component'

const routes : any = [
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