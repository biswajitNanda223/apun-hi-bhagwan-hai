import type { FastifyInstance } from 'fastify';

export const registerHealthRoutes = async (app: FastifyInstance): Promise<void> => {
  app.get(
    '/health',
    {
      schema: {
        tags: ['health'],
        summary: 'Get service health',
        response: {
          200: {
            type: 'object',
            required: ['status', 'service'],
            properties: {
              status: { type: 'string' },
              service: { type: 'string' },
            },
          },
        },
      },
    },
    async () => ({
      status: 'ok',
      service: 'fastify-workspace-api',
    }),
  );
};
