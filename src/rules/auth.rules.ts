import { body } from "express-validator"
import { validate } from "../middlewares/validate.middleware"

const authCodeRules = [
  body("email").isEmail().withMessage("ошибка в емейл"),
  validate
]
const registrRules = [
  body("name").notEmpty(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Пароль должен содержать не менее 6 символов"),
  body("age").notEmpty().isLength({ min: 2 }),
  body("email").isEmail(),
  body("code").isLength({ max: 4, min: 4 }).isString(),
  validate
]
const loginRules = [
  body("email").isEmail(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Пароль должен содержать не менее 6 символов"),
  validate
]
export { authCodeRules, registrRules, loginRules }
