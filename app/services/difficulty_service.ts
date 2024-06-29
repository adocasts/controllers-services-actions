import Organization from '#models/organization'
import { Infer } from '@vinejs/vine/types'
import { difficultyValidator } from '#validators/difficulty'

export default class DifficultyService {
  all(organization: Organization) {
    return organization.related('difficulties').query().orderBy('order')
  }

  async store(organization: Organization, data: Infer<typeof difficultyValidator>) {
    const last = await organization
      .related('difficulties')
      .query()
      .orderBy('order', 'desc')
      .select('order')
      .first()

    return organization.related('difficulties').create({
      ...data,
      order: last ? last.order + 1 : 0,
    })
  }

  async update(organization: Organization, id: number, data: Infer<typeof difficultyValidator>) {
    const difficulty = await organization
      .related('difficulties')
      .query()
      .where('id', id)
      .firstOrFail()

    await organization.merge(data).save()

    return difficulty
  }

  async destroy(organization: Organization, id: number) {
    const difficulty = await organization
      .related('difficulties')
      .query()
      .where('id', id)
      .firstOrFail()

    await difficulty.delete()

    return difficulty
  }
}
