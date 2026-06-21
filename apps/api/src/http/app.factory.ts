import Fastify from 'fastify';
import type { FastifyError } from 'fastify';
import type { AppContainer } from '../factories/container.factory.js';
import { registerHealthRoutes } from './routes/health.route.js';
import { registerUserRoutes } from './routes/user.route.js';
import { registerSwagger } from '../plugins/swagger.plugin.js';

export class FastifyAppFactory {
  static async create(container: AppContainer) {
    const app = Fastify({
      logger: container.config.nodeEnv !== 'test',
    });

    await registerSwagger(app);
    await registerHealthRoutes(app);
    await registerUserRoutes(app, container.services.userService);

    app.setErrorHandler((error: FastifyError, _request, reply) => {
      const statusCode = error.message.includes('already exists') ? 409 : 400;
      reply.code(statusCode).send({
        message: error.message,
      });
    });

    return app;
  }
}
