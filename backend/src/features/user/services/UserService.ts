import { IUserRepository } from "../interfaces/IUserRepository";
import { User } from "../../../../generated/prisma";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class UserService {
    private userRepository: IUserRepository;
    private jwtSecret: string;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
        this.jwtSecret = process.env.JWT_SECRET || 'secretKey';
    }

    async registerUser(data: Omit<User, 'id'>): Promise<User> {
        if (!this.isValidEmail(data.email)) {
            throw new Error('Invalid email');
        }

        const hashedPassword = await this.hashPassword(data.password_hash);

        const userData = {
            ...data,
            password_hash: hashedPassword,
        };

        return await this.userRepository.registerUser(userData);
    }

    async login(email: string, password: string): Promise<{ token: string, user: User }> {
        const user = await this.userRepository.findByEmail(email);
        if (!user) throw new Error('User not found');

        const isPasswordValid = await this.verifyPassword(password, user.password_hash);
        if (!isPasswordValid) throw new Error('Invalid password');

        const token = this.generateToken({ id: user.id, email: user.email });

        return { token, user };
    }

    // JWT Token methods
    async validateToken(token: string): Promise<{ id: string, email: string } | null> {
        try {
            const decoded = jwt.verify(token, this.jwtSecret) as { id: string, email: string };
            return decoded;
        } catch (err) {
            return null;
        }
    }
    private generateToken(payload: { id: string, email: string }): string {
        return jwt.sign(payload, this.jwtSecret, { expiresIn: '1h' });
    }

    // Password hashing
    private async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 10);
    }

    private async verifyPassword(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }

    // UserRepository methods
    async findByEmail(email: string): Promise<User | null> {
        return await this.userRepository.findByEmail(email);
    }

    async findById(id: string): Promise<User | null> {
        return await this.userRepository.findById(id);
    }

    private isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}