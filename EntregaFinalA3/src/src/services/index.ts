import { User } from "@prisma/client";
import { prisma } from "../config/db";
import bcrypt from "bcrypt";	
import { LoginPayload } from "../interfaces/User";
import { GenerateTokenProvider } from "../providers/token";
import { CreateGame } from "../interfaces/Games";

export class UserService {
    async createUser(userData: User) {
        const { email, username, password } = userData
        
        if(!email || !username || !password) {
            throw new Error("Missing data to create user")

        }
        
        const userExists = await prisma.user.findFirst({where: {
            OR: [
                {email},
                {username}
            ]
        }})

        if (userExists) {
            throw new Error("This email or username is already in use")
        }
        
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await prisma.user.create({
            data: {
                nome: userData.nome ? userData.nome : null,
                sobrenome: userData.sobrenome ? userData.sobrenome : null,
                email: email,
                username: username,
                password: hashedPassword
            }
        });
        const { password:_, ...user } = newUser
        return user
    }

    async login(data: LoginPayload) {
        const user = await prisma.user.findFirst({where: {username: data.username}})
        if (!user) {
            throw new Error( "username or password are incorrect")
        }
        
        const checkPassword = await bcrypt.compare(data.password, user.password)
        if (!checkPassword) {
            throw new Error ("Email or password are incorrect")
        }
        
        const tokenProvider = new GenerateTokenProvider;
        const token = await tokenProvider.generateToken(user.id);

        const { password:_, ...rest } = user;
        return {rest, token}
    }

    async home() {
        return {
            sucess: true,
            message: "Welcome to our home, you are authenticated",
            version: "1.0.0"
        }
    }

    async createGame(data: CreateGame) {
        if (!data.nome) {
            throw new Error("Nome é necessario");
        }

        const plataformasValidas = ["PC", "XBOX", "PLAYSTATION"];
        let isPlataformaValida = false;
    
        plataformasValidas.forEach(plataforma => {
            if (data.plataforma.includes(plataforma)) {
                isPlataformaValida = true;
            }
        });

        if (!isPlataformaValida) {
            throw new Error("Plataforma inválida")
        }

        const createdGame = await prisma.games.create({
            data: {
                nome: data.nome,
                imagem: data.imagem,
                descricao: data.descricao,
                plataforma: data.plataforma
            }
        });

        return createdGame
    }

    async getGames() {
        const games = await prisma.games.findMany();
        return games;
    }
}