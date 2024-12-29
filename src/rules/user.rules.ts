import { body, param } from "express-validator"
import { auth } from "../middlewares/auth.middleware"
import { validate } from "../middlewares/validate.middleware"

const getOneRules = [
  auth({ onlyAdmins: true }),
  param("id").isNumeric(),
  validate
]

const getRules = [auth({ onlyAdmins: true })]

const updateRules = [
  auth({ authRequired: true }),
  param("id").isNumeric(),
  body("name").notEmpty(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Пароль должен содержать не менее 6 символов"),
  body("age").notEmpty().isLength({ min: 2 }),
  body("email").isEmail(),
  validate
]

const deleteRules = [
  auth({ authRequired: true }),
  param("id").isNumeric(),
  validate
]

export {getOneRules, getRules, updateRules, deleteRules}