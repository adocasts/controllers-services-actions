import Organization from '#models/organization'

type Params = {
  organization: Organization
}

export default class GetAllDifficulties {
  static handle({ organization }: Params) {
    return organization.related('difficulties').query().orderBy('order')
  }
}
