import Organization from '#models/organization'
import { Infer } from '@vinejs/vine/types'
import { difficultyValidator } from '#validators/difficulty'

type Params = {
  organization: Organization
  id: number
  data: Infer<typeof difficultyValidator>
}

export default class UpdateDifficulty {
  static async handle({ organization, id, data }: Params) {
    const difficulty = await organization
      .related('difficulties')
      .query()
      .where('id', id)
      .firstOrFail()

    await organization.merge(data).save()

    return difficulty
  }
}
