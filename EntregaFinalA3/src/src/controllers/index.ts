import { Request, Response } from "express";
import { UserService } from "../services";

const userService = new UserService();
export class UserController {
    async createUser(_req: Request, _res: Response): Promise<Response> {
        try {
            const user = await userService.createUser(_req.body);
            return _res.status(201).send({user});
        } catch (error: any) {
            console.log(error);
            return _res.status(400).send({ error: error.message });
        }
    }

    async login(_req: Request, _res: Response): Promise<Response> {
        try {
            const data = await userService.login(_req.body);
            return _res.status(200).send({data});
        } catch (error: any) {
            console.log(error);
            return _res.status(400).send({ error: error.message });
        }
    }

    async home(_req: Request, _res: Response): Promise<Response> {
        try {
            const data = await userService.home();
            return _res.status(200).send({data});
        } catch (error: any) {
            console.log(error);
            return _res.status(400).send({ error: error.message });
        }
    }

    async createGame(_req: Request, _res: Response): Promise<Response> {
        try {
            const data = await userService.createGame(_req.body);
            return _res.status(200).send({data});
        } catch (error: any) {
            console.log(error);
            return _res.status(400).send({ error: error.message });
        }
    }

    async getGames(_req: Request, _res: Response): Promise<Response> {
        try {
            const data = await userService.getGames();
            return _res.status(200).send({data});
        } catch (error: any) {
            console.log(error);
            return _res.status(400).send({ error: error.message });
        }
    }
}