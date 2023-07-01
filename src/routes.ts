import HomePage from '@pages/home-page/'
import type IRoutes from '@models/routes-type'
import FavoritesPage from '@pages/favorites'

const routes: IRoutes[] = [
    {
        path: '/',
        label: 'Home',
        component: HomePage,
    },
    {
        path: '/favorites',
        label: 'Favorites',
        component: FavoritesPage,
    },
]

export default routes
