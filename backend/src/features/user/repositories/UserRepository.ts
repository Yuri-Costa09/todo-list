import { PrismaClient, Task, User } from '../../../../generated/prisma';
import { IUserRepository } from '../interfaces/IUserRepository';

class UserRepository implements IUserRepository {

    // injecao de dependencia
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    async registerUser(data: Omit<User, 'id'>): Promise<User> {
        return await this.prisma.user.create({
        data,
        });
    }

    async findByEmail(email: string): Promise<User | null> {
        return await this.prisma.user.findUnique({
        where: { email },
        });
    }

    async findById(id: string): Promise<User | null> {
        return await this.prisma.user.findUnique({
        where: { id },
        });
    }

    async getUserTasksByUserId(id: string): Promise<Task[] | null> {
        const userWithTasks =  await this.prisma.user.findUnique({
            where: { id },
            include: { Task: true }
        })

        return userWithTasks?.Task || null;
        
    }
    }

    export default UserRepository;
