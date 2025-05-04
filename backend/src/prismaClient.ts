import { PrismaClient } from '../../generated/prisma/index';
const client = require( '@prisma/client' )

const prisma = new PrismaClient();

export default prisma