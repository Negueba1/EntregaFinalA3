import express from "express";
import { Request, Response } from "express";
import { UserController } from "../controllers";
import { authMiddleware } from "../middleware/auth";

const router = express.Router();

router.get("/welcome", (_req: Request, res: Response) => {
    res.status(200).send({
        sucess: true,
        message: "Welcome to our nodejs api",
        version: "1.0.0"
    });
});

const userController = new UserController();

router.post("/create_user", userController.createUser);
router.post("/login", userController.login);

router.get("/home", authMiddleware, userController.home);
router.post("/create_game", userController.createGame);
router.get("/get_games", userController.getGames);

export {router};