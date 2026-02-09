export default [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/components',
    name: 'Components',
    component: () => import('../views/ComponentsView.vue')
  },
  {
    path: '/stages',
    name: 'Stages',
    component: () => import('../views/StagesView.vue')
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('../views/AuthView.vue')
  },
  {
    path: '/stage-1',
    name: 'stage-1',
    component: () => import('../views/Stage1View.vue')
  },
  {
    path: '/stage-2',
    name: 'stage-2',
    component: () => import('../views/Stage2View.vue')
  },
  {
    path: '/stage-3',
    name: 'stage-3',
    component: () => import('../views/Stage3View.vue')
  }
]
