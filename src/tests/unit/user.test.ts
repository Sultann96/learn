// @ts-ignore
const axios = require("axios")
// @ts-ignore
const input = require("input")


describe("user", () => {
  const api = axios.create({ baseURL: "http://localhost:3000" })

  const user = {
    name: "s",
    email: "radjabovs96@mail.ru",
    password: "120000",
    age: 22,
    id: 0
  }
  test("getOne", async () => {
    const get = await api.get("user/0")
    expect(get.data.user).toStrictEqual({ user })
  })

  test("put", async () => {
    const updatedUser = { ...user, name: "updatedName" };
    const response = await api.put("user/0", updatedUser);
    expect(response.status).toBe(202);
    expect(response.data).toMatchObject(updatedUser);
  });

  test("delete", async () => {
    const response = await api.delete("user/0");
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ id: 0 });
  });

  // test("get")
  // test("put")
  // test("delete")

})