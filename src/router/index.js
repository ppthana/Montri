import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import HomepageView from '../views/admin/HomepageView.vue'
import ProfileView from '../views/ProfileView.vue'

import ProductView from '../views/Products/ProductView.vue'
import AddProductView from '../views/Products/AddProductView.vue'
import DetailView from '../views/Details/DetailView.vue'
import UpdateProductView from '../views/Products/UpdateProductView.vue'
import { useAccountStore } from '@/stores/account'




const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes: [{
            path: '/login',
            name: 'login',
            component: LoginView
        }, {
            path: '/',
            name: 'Preview-login',
            component: LoginView
        },

        {
            path: '/home',
            name: 'Homepage',
            component: HomepageView
        },
        {
            path: '/profile',
            name: 'Profile',
            component: ProfileView
        },
        {
            path: '/admin/products',
            name: 'admin-product',
            component: ProductView
        },
        {
            path: '/admin/products/create',
            name: 'admin-product-create',
            component: AddProductView
        },
        {
            path: '/admin/product/update/:id',
            name: 'admin-product-update',
            component: UpdateProductView
        },
        {
            path: '/product-details/:id',
            name: 'product-details',
            component: DetailView
        }

    ]
})

router.beforeEach(async(to, from, next) => {
    const accountStore = useAccountStore()
    await accountStore.checkAuth()
    next()
})

export default router