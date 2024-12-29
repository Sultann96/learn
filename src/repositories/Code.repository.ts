import { CodeModel, CodeWithIdModel } from "../models/Code.model"

export interface CodeRepository {
  create: (params: CodeModel) => Promise<CodeWithIdModel | undefined>
  disable: (id: number) => Promise<CodeWithIdModel>
  get: () => Promise<CodeWithIdModel[]>
  getOne: (params: { email: string }) => Promise<CodeWithIdModel | undefined>
  updateMany: (
    find: { ids?: number[]; email?: string },
    data: Partial<CodeModel>
  ) => Promise<void>
}
