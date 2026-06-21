import { UserServiceFactory } from '@fastify-workspace/application';
import { PrismaClientFactory, PrismaUserRepository } from '@fastify-workspace/infrastructure';
import type { AppConfig } from '@fastify-workspace/config';

export type AppContainer = ReturnType<typeof ContainerFactory.create>;

export class ContainerFactory {
  static create(config: AppConfig) {
    const prisma = PrismaClientFactory.create(config.databaseUrl);
    const users = new PrismaUserRepository(prisma);
    const userService = UserServiceFactory.create(users);

    return {
      config,
      prisma,
      services: {
        userService,
      },
    };
  }
}
