import Organization from '#models/organization'

export default class OrganizationService {
  find(id: number) {
    return Organization.findOrFail(id)
  }
}
