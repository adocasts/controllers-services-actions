import type { HttpContext } from '@adonisjs/core/http'
import { difficultyValidator } from '#validators/difficulty'
import OrganizationService from '#services/organization_service'
import { inject } from '@adonisjs/core'
import DifficultyService from '#services/difficulty_service'

@inject()
export default class DifficultiesController {
  constructor(
    protected organizationService: OrganizationService,
    protected difficultyService: DifficultyService
  ) {}

  /**
   * Display a list of resource
   */
  async index({ params }: HttpContext) {
    const organization = await this.organizationService.find(params.organizationId)
    const difficulties = await this.difficultyService.all(organization)

    return difficulties
  }

  /**
   * Handle form submission for the create action
   */
  async store({ params, request }: HttpContext) {
    const organization = await this.organizationService.find(params.organizationId)
    const data = await request.validateUsing(difficultyValidator)
    const last = await organization
      .related('difficulties')
      .query()
      .orderBy('order', 'desc')
      .select('order')
      .first()

    const difficulty = await organization.related('difficulties').create({
      ...data,
      order: last ? last.order + 1 : 0,
    })

    return difficulty
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    const organization = await this.organizationService.find(params.organizationId)
    const data = await request.validateUsing(difficultyValidator)
    const difficulty = await this.difficultyService.update(organization, params.id, data)

    return difficulty
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    const organization = await this.organizationService.find(params.organizationId)
    const difficulty = await this.difficultyService.destroy(organization, params.id)

    return difficulty
  }
}
