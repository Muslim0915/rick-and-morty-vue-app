import HomePage from "@/pages/HomePage.vue";
import LocationsPage from "@/pages/LocationsPage.vue";
import EpisodesPage from "@/pages/EpisodesPage.vue";
import NotFoundPage from "@/pages/NotFoundPage.vue";

import { createRouter, createWebHistory, Router } from "vue-router";
import { useRickAndMortyStore } from "@/store";

const routes = [
    {
        path: '/',
        component: HomePage,
    },
    {
        path: '/locations',
        component: LocationsPage,
    },
    {
        path: '/episodes',
        component: EpisodesPage,
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
    {
        path: '/404',
        component: () => NotFoundPage,
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/404'
    },
    {
        path: '/rick-and-morty',
        redirect: '/',
    }
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