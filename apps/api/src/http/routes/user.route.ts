import type { UserService } from '@fastify-workspace/application';
import type { FastifyInstance } from 'fastify';

type CreateUserBody = {
  email: string;
  name: string;
};

const serializeUser = (user: Awaited<ReturnType<UserService['create']>>) => ({
  ...user,
  createdAt: user.createdAt.toISOString(),
  updatedAt: user.updatedAt.toISOString(),
});

const userSchema = {
  type: 'object',
  required: ['id', 'email', 'name', 'createdAt', 'updatedAt'],
  properties: {
    id: { type: 'string', format: 'uuid' },
    email: { type: 'string', format: 'email' },
    name: { type: 'string' },
    createdAt: { type: 'string', format: 'date-time' },
    updatedAt: { type: 'string', format: 'date-time' },
  },
} as const;

export const registerUserRoutes = async (
  app: FastifyInstance,
  userService: UserService,
): Promise<void> => {
  app.post<{ Body: CreateUserBody }>(
    '/users',
    {
      schema: {
        tags: ['users'],
        summary: 'Create a user',
        body: {
          type: 'object',
          required: ['email', 'name'],
          properties: {
            email: { type: 'string', format: 'email' },
            name: { type: 'string', minLength: 2 },
          },
        },
        response: {
          201: userSchema,
          400: {
            type: 'object',
            required: ['message'],
            properties: {
              message: { type: 'string' },
            },
          },
          409: {
            type: 'object',
            required: ['message'],
            properties: {
              message: { type: 'string' },
            },
          },
        },
      },
    },
    async (request, reply) => {
      const user = await userService.create(request.body);
      return reply.code(201).send(serializeUser(user));
    },
  );

  app.get(
    '/users',
    {
      schema: {
        tags: ['users'],
        summary: 'List users',
        response: {
          200: {
            type: 'object',
            required: ['users'],
            properties: {
              users: {
                type: 'array',
                items: userSchema,
              },
            },
          },
        },
      },
    },
    async () => {
      const users = await userService.list();
      return {
        users: users.map(serializeUser),
      };
    },
  );

  app.get<{ Params: { id: string } }>(
    '/users/:id',
    {
      schema: {
        tags: ['users'],
        summary: 'Get user by id',
        params: {
          type: 'object',
          required: ['id'],
          properties: {
            id: { type: 'string', format: 'uuid' },
          },
        },
        response: {
          200: userSchema,
          404: {
            type: 'object',
            required: ['message'],
            properties: {
              message: { type: 'string' },
            },
          },
        },
      },
    },
    async (request, reply) => {
      const user = await userService.getById(request.params.id);

      if (!user) {
        return reply.code(404).send({ message: 'User not found.' });
      }

      return serializeUser(user);
    },
  );
};
