import type { HttpContext } from '@adonisjs/core/http'
import Organization from '#models/organization'
import { organizationValidator } from '#validators/organization'

export default class OrganizationsController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    const organizations = await Organization.query().orderBy('createdAt', 'desc')
    return organizations
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {
    const data = await request.validateUsing(organizationValidator)
    const organization = await Organization.create(data)

    return organization
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    const organization = await Organization.findOrFail(params.id)
    return organization
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    const organization = await Organization.findOrFail(params.id)
    const data = await request.validateUsing(organizationValidator)

    await organization.merge(data).save()

    return organization
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    const organization = await Organization.findOrFail(params.id)

    await organization.delete()

    return organization
  }
}
