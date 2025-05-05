import { User } from '../../../../generated/prisma/index';
import { Task } from '../../../../generated/prisma/index';

export interface IUserRepository {
    registerUser(data: Omit<User, 'id'>): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    getUserTasksByUserId(id: string): Promise<Task[] | null>;
}