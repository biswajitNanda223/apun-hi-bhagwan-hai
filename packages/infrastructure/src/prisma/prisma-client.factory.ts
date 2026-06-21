import { PrismaClient } from '@prisma/client';

export class PrismaClientFactory {
  static create(databaseUrl?: string): PrismaClient {
    return new PrismaClient({
      datasources: databaseUrl
        ? {
            db: {
              url: databaseUrl,
            },
          }
        : undefined,
    });
  }
}
