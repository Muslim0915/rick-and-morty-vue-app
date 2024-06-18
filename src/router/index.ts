import type { IRoutes } from "@/services/typing/interfaces";
import {createRouter, createWebHistory, Router} from "vue-router";
import { useRickAndMortyStore } from "@/store";

const routes: IRoutes[] = [
    {
        path: '/',
        component: () => import('@/pages/HomePage.vue')
    },
    {
        path: '/locations',
        component: () => import('@/pages/LocationsPage.vue')
    },
    {
        path: '/episodes',
        component: () => import('@/pages/EpisodesPage.vue')
    },
    {
        path: '/:pathMatch(.*)*',
        component: () => import('@/pages/NotFoundPage.vue')
    },
    {
        path: '/character/:id',
        component: () => import('@/pages/CurrentCharacterPage.vue'),
    },
    {
        path: '/location/:id',
        component: () => import('@/pages/CurrentLocationPage.vue'),
    },
    {
        path: '/episode/:id',
        component: () => import('@/pages/CurrentEpisodePage.vue'),
    },
];

const router: Router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((_to, _from, next) => {
    useRickAndMortyStore().state.isLoading = true;
    next();
});

router.afterEach((_to, _from) => {
    useRickAndMortyStore().state.isLoading = false;
});


export default router;