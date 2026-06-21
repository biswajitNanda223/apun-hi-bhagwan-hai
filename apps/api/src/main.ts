import { loadConfig } from '@fastify-workspace/config';
import grpc from '@grpc/grpc-js';
import { ContainerFactory } from './factories/container.factory.js';
import { UserGrpcServerFactory } from './grpc/user-grpc.factory.js';
import { FastifyAppFactory } from './http/app.factory.js';

const config = loadConfig();
const container = ContainerFactory.create(config);
const app = await FastifyAppFactory.create(container);
const grpcServer = UserGrpcServerFactory.create(container.services.userService);

const shutdown = async (): Promise<void> => {
  grpcServer.forceShutdown();
  await app.close();
  await container.prisma.$disconnect();
};

process.on('SIGINT', () => {
  void shutdown().finally(() => process.exit(0));
});

process.on('SIGTERM', () => {
  void shutdown().finally(() => process.exit(0));
});

grpcServer.bindAsync(
  `${config.host}:${config.grpcPort}`,
  grpc.ServerCredentials.createInsecure(),
  async (error) => {
    if (error) {
      throw error;
    }

    await app.listen({
      host: config.host,
      port: config.restPort,
    });

    app.log.info(`gRPC server listening on ${config.host}:${config.grpcPort}`);
  },
);
