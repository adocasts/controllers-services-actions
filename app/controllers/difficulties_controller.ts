import type { HttpContext } from '@adonisjs/core/http'
import Organization from '#models/organization'
import { difficultyValidator } from '#validators/difficulty'

export default class DifficultiesController {
  /**
   * Display a list of resource
   */
  async index({ params }: HttpContext) {
    const organization = await Organization.findOrFail(params.organizationId)
    const difficulties = await organization.related('difficulties').query().orderBy('order')

    return difficulties
  }

  /**
   * Handle form submission for the create action
   */
  async store({ params, request }: HttpContext) {
    const organization = await Organization.findOrFail(params.organizationId)
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
    const organization = await Organization.findOrFail(params.organizationId)
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
    const organization = await Organization.findOrFail(params.organizationId)
    const difficulty = await organization
      .related('difficulties')
      .query()
      .where('id', params.id)
      .firstOrFail()

    await difficulty.delete()

    return difficulty
  }
}
