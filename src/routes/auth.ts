import { Router } from "express"
import { config } from "dotenv"
import { authCodeRules, loginRules, registrRules } from "../rules/auth.rules"
import { createRoute } from "../middlewares/createRoute.middleware"
import authController from "../controllers/auth.controller"

config()


export const authRouter = Router()

authRouter.post("/auth/code", ...authCodeRules, createRoute(authController.code))

authRouter.post("/auth/me", ...loginRules, createRoute(authController.me))

authRouter.post("/auth/registr", ...registrRules, createRoute(authController.registr))
