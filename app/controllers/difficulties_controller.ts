import type { HttpContext } from '@adonisjs/core/http'
import { difficultyValidator } from '#validators/difficulty'
import GetAllDifficulties from '../actions/difficulties/get_all_difficulties.js'
import GetOrganization from '../actions/organizations/get_organization.js'
import UpdateDifficulty from '../actions/difficulties/update_difficulty.js'
import DestroyDifficulty from '../actions/difficulties/destroy_difficulty.js'
import StoreDifficulty from '../actions/difficulties/store_difficulty.js'

export default class DifficultiesController {
  /**
   * Display a list of resource
   */
  async index({ params }: HttpContext) {
    const organization = await GetOrganization.handle({ id: params.organizationId })
    const difficulties = await GetAllDifficulties.handle({ organization })

    return difficulties
  }

  /**
   * Handle form submission for the create action
   */
  async store({ params, request }: HttpContext) {
    const organization = await GetOrganization.handle({ id: params.organizationId })
    const data = await request.validateUsing(difficultyValidator)
    const difficulty = await StoreDifficulty.handle({ organization, data })

    return difficulty
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    const organization = await GetOrganization.handle({ id: params.organizationId })
    const data = await request.validateUsing(difficultyValidator)
    const difficulty = await UpdateDifficulty.handle({
      id: params.id,
      organization,
      data,
    })

    return difficulty
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    const organization = await GetOrganization.handle({ id: params.organizationId })
    const difficulty = await DestroyDifficulty.handle({ organization, id: params.id })

    return difficulty
  }
}
