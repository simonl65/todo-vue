import App from './App'
import LandingPage from './components/marketing/LandingPage'
import About from './components/marketing/About.vue';
import Login from './components/auth/Login.vue';
import Register from './components/auth/Register.vue';
import Logout from './components/auth/Logout.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: LandingPage
  },
  {
    path: '/todo',
    name: 'todo',
    component: App
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/logout',
    name: 'logout',
    component: Logout
  },
]

export default routes
