import Organization from '#models/organization'
import { Infer } from '@vinejs/vine/types'
import { difficultyValidator } from '#validators/difficulty'

type Params = {
  organization: Organization
  data: Infer<typeof difficultyValidator>
}

export default class StoreDifficulty {
  static async handle({ organization, data }: Params) {
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
}
