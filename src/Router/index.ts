import LogInPage from '../Pages/Auth/LogInPage';
import SignUpPage from '../Pages/Auth/SignUpPage';
import Events from '../Pages/Events/Events';
import Home from '../Pages/Home/Home';
import ProfilePage from '../Pages/ProfilePage/ProfilePage';

export const publicRoutes = [
  { path: '/login', component: LogInPage, exact: true },
  { path: '/signup', component: SignUpPage, exact: true },
];

export const privateRoutes = [
  { path: '/events', component: Events, exact: true },
  { path: '/profile/:profileId', component: ProfilePage, exact: true },
  { path: '/home', component: Home, exact: true },
];
