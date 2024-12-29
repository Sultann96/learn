import { db } from "../../clients/db.client"
import { CodeModel } from "../../models/Code.model"
import { CodeRepository } from "../../repositories/Code.repository"

class Code implements CodeRepository {
  async create(codeDto: { email: string; code: string; disabled: boolean }) {
    const id = db.codes.length

    db.codes.push({
      id,
      ...codeDto
    })

    return db.codes[id]
  }

  async disable(id: number) {
    db.codes[id].disabled = true
    return db.codes[id]
  }
  async get() {
    return db.codes
  }

  async getOne(params: { email: string }) {
    return db.codes.find(
      (code) => code.email === params.email && !code.disabled
    )
  }


 
  async updateMany(find: { ids?: number[]; email?: string }, data: Partial<CodeModel>) {
  }
}

export default new Code()
