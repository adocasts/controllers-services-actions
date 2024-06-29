import Organization from '#models/organization'

type Params = {
  id: number
}

export default class GetOrganization {
  static handle({ id }: Params) {
    return Organization.findOrFail(id)
  }
}
