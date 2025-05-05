import { PrismaClient } from '../generated/prisma/index';
const client = require( '@prisma/client' )

export const prisma = new PrismaClient();

