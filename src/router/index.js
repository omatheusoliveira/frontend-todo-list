import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Principal',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/PrincipalView.vue'),
    children: [
      {
        path: '/register-user',
        name: 'Cadastrar Usuario',
        // route level code-splitting
        // this generates a separate chunk (principal.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "principal" */ '../views/CadastrarUser.vue'),
      },
      {
        path: '/list-user',
        name: 'Listar Usuario',
        // route level code-splitting
        // this generates a separate chunk (principal.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "principal" */ '../views/ListarUser.vue'),
      },
      {
        path: '/list-task',
        name: 'Listar Tarefa',
        // route level code-splitting
        // this generates a separate chunk (principal.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "principal" */ '../views/ListarTask.vue'),
      },
      {
        path: '/register-task',
        name: 'Cadastrar Tarefa',
        // route level code-splitting
        // this generates a separate chunk (principal.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "principal" */ '../views/CadastrarTask.vue'),
      },
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
