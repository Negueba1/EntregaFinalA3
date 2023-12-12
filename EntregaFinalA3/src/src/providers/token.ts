import jwt from 'jsonwebtoken';


export class GenerateTokenProvider {
    async generateToken(id: number) {
        const token = jwt.sign({user_id: id}, process.env.TOKEN_SECRET as string, {
            expiresIn: "1hr"
        })
        return token
    }
} 