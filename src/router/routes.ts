import { RouteRecordRaw } from 'vue-router'

// @mimas: allocated root path of current app, defined in package.json
const appPath = process.env.appPath as string

const routes: RouteRecordRaw[] = [
  {
    path: appPath,
    component: () => import('layouts/MainLayout.vue'),
    redirect: appPath + '/overview',
    children: [
      {
        path: 'overview',
        component: () => import('pages/overview.vue')
      },
      {
        path: 'detail',
        component: () => import('pages/AlertDetail.vue')
      },
      {
        path: 'record',
        component: () => import('pages/AlertRecord.vue')
      },
      {
        path: 'convergence',
        component: () => import('pages/convergenceAlert.vue')
      },
      // @mimas: about, updates, releases...
      {
        path: 'about',
        component: () => import('pages/AboutPage.vue')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
