export interface CodeModel {
  email: string
  disabled: boolean
  code:string
}
export interface CodeWithIdModel extends CodeModel {
  id: number
}
