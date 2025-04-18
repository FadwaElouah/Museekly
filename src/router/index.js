import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../pages/HomePage.vue';
import SongDetails from '../views/SongDetails.vue'; 




const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/song/:artist/:title',
    name: 'song-details',
    component: SongDetails,
    props: route => ({
      artist: route.params.artist,
      title: route.params.title,
      preview: route.query.preview,
      artwork: route.query.artwork,
    }),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
