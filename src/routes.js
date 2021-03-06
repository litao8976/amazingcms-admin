/* eslint-disable max-lines */
import React from 'react'

import { privilegesChecker } from './bits/useCollectionPrivileges'

import { logOutAsyncAction } from './auth'

const addSeparatorAtLastRoute = (routes) => ((
  routes &&
  routes.map(
    (route, i, arr) => (
      i === (arr.length - 1) ?
        {
          ...route,
          separator: {
            ...route.separator,
            below: true,
          },
        }
        :
        route
    )
  )
) || [])



const filterByPrivileges = (userPrivileges) => (routeData) => (
  privilegesChecker(userPrivileges, routeData.requiredPrivileges && routeData.requiredPrivileges.list) &&
  privilegesChecker(userPrivileges, routeData.requiredPrivileges && routeData.requiredPrivileges._displayInAdmin)
)

// eslint-disable-next-line max-params
export const makeRoutes = (collectionsData, systemCollectionsData, userPrivileges, dispatch, t) => {
  const collectionsRoutes = (
    collectionsData &&
    collectionsData.map &&
    collectionsData
      .filter(filterByPrivileges(userPrivileges))
      .map(collectionData => {
        const singletonPathAddon = collectionData.singleton ? '/singleton' : ''

        return ({
          name: collectionData.displayName || collectionData.name,
          path: ['/collections/:collectionName' + singletonPathAddon],
          pathWithParams: `/collections/${collectionData.name}` + singletonPathAddon,
          component: React.lazy(() => import('./pages/collections/:collectionName' + singletonPathAddon)),
          icon: collectionData.icon || 'data_usage',
        })
      })
  )

  const systemCollectionsRoutes = (
    systemCollectionsData &&
    systemCollectionsData.map &&
    systemCollectionsData
      .filter(filterByPrivileges(userPrivileges))
      .filter(collectionData => collectionData.schema)
      .map(collectionData => ({
        name: t(collectionData.displayName || collectionData.name),
        path: ['/system-collections/:collectionName'],
        pathWithParams: `/system-collections/${collectionData.name}`,
        component: React.lazy(() => import('./pages/system-collections/:collectionName')),
        icon: collectionData.icon || 'settings_input_svideo',
      }))
  )

  const systemRoutesWithSeparatorAtEnd = addSeparatorAtLastRoute(systemCollectionsRoutes)

  const uploaderCollectionData = (
    systemCollectionsData &&
    systemCollectionsData.find(collectionData => collectionData.name === 'uploader')
  )
  const muxCollectionData = (
    systemCollectionsData &&
    systemCollectionsData.find(collectionData => collectionData.name === 'mux')
  )

  const exoticCollectionsRoutes = (

    (
      (
        uploaderCollectionData &&
        filterByPrivileges(userPrivileges)(muxCollectionData)
      ) ?
        [
          {
            name: t('MUX'),
            path: ['/mux'],
            pathWithParams: '/mux',
            component: React.lazy(() => import('./pages/mux')),
            icon: 'fas fa-video',
          },
        ]
        :
        []
    ).concat(
      (
        uploaderCollectionData &&
        filterByPrivileges(userPrivileges)(uploaderCollectionData)
      ) ?
        [
          {
            name: t('Files'),
            path: ['/files/:bucketName?'],
            pathWithParams: '/files',
            component: React.lazy(() => import('./pages/files')),
            icon: 'fas fa-cloud',
          },
          {
            name: t('Photos'),
            path: ['/photos/:bucketName?'],
            pathWithParams: '/photos',
            component: React.lazy(() => import('./pages/photos')),
            icon: 'fas fa-image',
          },
        ]
        :
        []
    )
  )

  const exoticRoutesWithSeparatorAtEnd = addSeparatorAtLastRoute(exoticCollectionsRoutes)

  const mainMenuRoutes = (
    systemRoutesWithSeparatorAtEnd &&
    collectionsRoutes &&
    exoticRoutesWithSeparatorAtEnd &&
    systemRoutesWithSeparatorAtEnd
      .concat(exoticRoutesWithSeparatorAtEnd)
      .concat(collectionsRoutes)
  ) || []

  const routerRoutes = mainMenuRoutes.concat([
    {
      name: 'Collection add',
      path: ['/collections/:collectionName/new'],
      component: React.lazy(() => import('./pages/collections/:collectionName/new')),
    },
    {
      name: 'Collection edit',
      path: ['/collections/:collectionName/:id'],
      component: React.lazy(() => import('./pages/collections/:collectionName/:id')),
    },
    {
      name: 'Collection duplicate',
      path: ['/collections/:collectionName/duplicate/:id'],
      component: React.lazy(() => import('./pages/collections/:collectionName/duplicate/:id')),
    },
    {
      name: 'System collection add',
      path: ['/system-collections/:collectionName/new'],
      component: React.lazy(() => import('./pages/system-collections/:collectionName/new')),
    },
    {
      name: 'System collection edit',
      path: ['/system-collections/:collectionName/:id'],
      component: React.lazy(() => import('./pages/system-collections/:collectionName/:id')),
    },
    {
      name: 'System collection duplicate',
      path: ['/system-collections/:collectionName/duplicate/:id'],
      component: React.lazy(() => import('./pages/system-collections/:collectionName/duplicate/:id')),
    },
  ])

  const profileMenuRoutes = [
    {
      name: t('Logout'),
      icon: 'logout',
      onClick: () => dispatch(logOutAsyncAction()),
    },
  ]

  return {
    mainMenuRoutes,
    routerRoutes,
    profileMenuRoutes,
  }
}

export default makeRoutes