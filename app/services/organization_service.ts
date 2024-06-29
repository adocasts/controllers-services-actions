import Organization from '#models/organization'

export default class OrganizationService {
  static find(id: number) {
    return Organization.findOrFail(id)
  }
}
