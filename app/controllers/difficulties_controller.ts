import type { HttpContext } from '@adonisjs/core/http'
import { difficultyValidator } from '#validators/difficulty'
import OrganizationService from '#services/organization_service'

export default class DifficultiesController {
  /**
   * Display a list of resource
   */
  async index({ params }: HttpContext) {
    const organization = await OrganizationService.find(params.organizationId)
    const difficulties = await organization.related('difficulties').query().orderBy('order')

    return difficulties
  }

  /**
   * Handle form submission for the create action
   */
  async store({ params, request }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    const organization = await OrganizationService.find(params.organizationId)
    const difficulty = await organization
      .related('difficulties')
      .query()
      .where('id', params.id)
      .firstOrFail()

    const data = await request.validateUsing(difficultyValidator)

    await organization.merge(data).save()

    return difficulty
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    const organization = await OrganizationService.find(params.organizationId)
    const difficulty = await organization
      .related('difficulties')
      .query()
      .where('id', params.id)
      .firstOrFail()

    await difficulty.delete()

    return difficulty
  }
}
