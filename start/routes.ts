/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const DifficultiesController = () => import('#controllers/difficulties_controller')
const OrganizationsController = () => import('#controllers/organizations_controller')

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.resource('organizations', OrganizationsController).apiOnly()

router
  .group(() => {
    router.resource('difficulties', DifficultiesController).apiOnly()
  })
  .prefix('/:organizationId')
