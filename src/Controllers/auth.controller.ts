import { Request, Response, Router } from 'express'
import { AuthService } from '../Services/auth.service'
import { User } from '../Models'

export class AuthController {
    readonly authService: AuthService
  
    constructor(authServ: AuthService){
        this.authService = authServ
    }

    async register(req: Request, res: Response) {
        try {
            const registeruser = req.body as User
            await this.authService.registerUser(registeruser)
            res.status(201).json("user created")
        } catch (err: any) {
            if (err.message === 'EMAIL_EXISTS') {
                return res.status(409).json({ message: 'Email already exists' })
            }
            res.status(500).json({ message: 'Server error', error: err })
        }
    }

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body
            const result = await this.authService.loginUser(email, password)
            res.json(result)
        } catch (err: any) {
            if (err.message === 'INVALID_CREDENTIALS') {
                return res.status(401).json({ message: 'Invalid credentials' })
            }
            if (err.message === 'USER_INACTIVE') {
                return res.status(403).json({ message: 'User inactive' })
            }
            res.status(500).json({ message: 'Server error', error: err })
        }
    }

    buildRouter(): Router{
        const router = Router()

        router.post('/register', this.register.bind(this))
        router.post('/login', this.login.bind(this))
        return router
    }
}
