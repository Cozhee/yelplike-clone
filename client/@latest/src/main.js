import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import Home from './routes/Home.vue'
import RestaurantDetailpage from './routes/RestaurantDetailpage.vue'
import UpdatePage from './routes/UpdatePage.vue'
import LoginPage from './routes/LoginPage.vue'
import SignUpPage from './routes/SignUpPage.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', name: 'Home', component: Home },
        { path: '/restaurants/:id', name: 'About', component: RestaurantDetailpage },
        { path: '/restaurants/:id/update', name: 'More', component: UpdatePage },
        { path: '/login', name: 'Login', component: LoginPage },
        { path: '/signup', name: 'Signup', component: SignUpPage },
    ]
})

createApp(App).use(router).mount('#app')
