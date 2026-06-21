import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import type { FastifyInstance } from 'fastify';

export const registerSwagger = async (app: FastifyInstance): Promise<void> => {
  await app.register(swagger, {
    openapi: {
      info: {
        title: 'Fastify Workspace API',
        description: 'REST API documentation for the Fastify monorepo sample application.',
        version: '0.1.0',
      },
      tags: [
        { name: 'health', description: 'Service health endpoints' },
        { name: 'users', description: 'User management endpoints' },
      ],
    },
  });

  await app.register(swaggerUi, {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'list',
      deepLinking: true,
    },
  });
};
