import { IUserRepository } from "../interfaces/IUserRepository";
import { User, Task } from "../../../../generated/prisma";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class UserService {

    private userRepository: IUserRepository;
    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    async registerUser(data: Omit<User, 'id'>): Promise<User> {

        if (!this.isValidEmail(data.email)) {
            throw new Error('Invalid email');
        }

        const hashedPassword = await bcrypt.hash(data.password_hash, 10);

        const userData = {
            ...data,
            password_hash: hashedPassword,
        };

        return await this.userRepository.registerUser(userData);
    }

    async login(email: string, password: string): Promise<{ token: string, user: User }> {
        const user = await this.userRepository.findByEmail(email);
    
        if (!user) throw new Error('User not found');
    
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);
        if (!isPasswordValid) throw new Error('Invalid password');
    
        const token = jwt.sign(
          { id: user.id, email: user.email },
          process.env.JWT_SECRET || 'secretKey', 
          {
            expiresIn: '1h', 
          }
        );
    
        return { token, user };
      }
    
    async findByEmail(email: string): Promise<User | null> {
        return await this.userRepository.findByEmail(email);
    }

    async findById(id: string): Promise<User | null> {
        return await this.userRepository.findById(id);
    }

    async getUserTasksByUserId(id: string): Promise<Task[] | null> {
        return await this.userRepository.getUserTasksByUserId(id);
    }

    private isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      }
}