import { Router } from "express"
import { createRoute } from "../middlewares/createRoute.middleware"
import userController from "../controllers/user.controller"
import {
  deleteRules,
  getOneRules,
  getRules,
  updateRules
} from "../rules/user.rules"

export const userRouter = Router()

userRouter.get("/user/:id", ...getOneRules, createRoute(userController.getOne))

userRouter.get("/user", ...getRules, createRoute(userController.get))

userRouter.put("/user/:id", ...updateRules, createRoute(userController.update))

userRouter.delete("/user/:id", ...deleteRules, createRoute(userController.delete))
