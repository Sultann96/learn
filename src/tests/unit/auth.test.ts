const axios = require ("axios")
const input = require ("input")

describe("auth", () => {
  const api = axios.create({ baseURL: "http://localhost:3000" })

  const user = {
    name: "s",
    email: "radjabovs96@mail.ru",
    password: "120000",
    age: 22,
  }

  test("authCode", async () => {
    const authCode = await api.post("/auth/code", { email: "radjabovs96@mail.ru" })

    expect(authCode.data).toBe("Проверьте почту")
  }, 15000)

  test("authRegistr", async () => {
    const code = await input.text("enter code: ")

    const authRegistr = await api.post("auth/registr", { ...user, code })

    expect(authRegistr.data.user).toStrictEqual({
      ...user,
      ...authRegistr.data.user
    })
  }, 30000)

  test("authMe", async () => {
    const { data } = await api.post("auth/me", user)

    expect(data.user).toStrictEqual({
      ...user,
      id: data.user.id,
      password: data.user.password,
      deleted: data.user.deleted,
      role: data.user.role,
      verifedEmail: data.user.verifedEmail
    })
  }, 15000)
})