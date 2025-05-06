import { UserService } from "../services/UserService";
import { Request, Response } from "express";
import { error } from "console";

export class UserController {
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    async register(req: Request, res: Response) {
        try {
            const {name, email, password_hash} = req.body;
            const user = await this.userService.registerUser({name, email, password_hash});
            res.status(201).json(user);
        }
        catch (error) {
            console.error('Error registering user:', error);
            res.status(400).json(error);
        }
    }

    async login(req: Request, res: Response) {
        try {
            const {name, email, password_hash} = req.body;
            const {token, user} = await this.userService.login(email, password_hash);

            res.status(200).json({token, user})
        } catch {
            res.status(401).json({ error: 'Invalid email or password' });
        }
    }

    async getUserById(req: Request, res: Response) {
        try {
          const userId = req.params.id;
          const user = await this.userService.findById(userId);
          if (user) {
            res.status(200).json(user);
          } else {
            res.status(404).json({ error: 'User not found' });
          }
        } catch (error) {
          res.status(500).json(error);
        }
      }

}