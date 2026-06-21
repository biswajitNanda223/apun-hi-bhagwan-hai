import { getUserProtoPath } from '@fastify-workspace/contracts';
import type { UserService } from '@fastify-workspace/application';
import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';

type GrpcCallback<T> = (error: Error | null, response?: T) => void;
type UserProtoPackage = {
  user: {
    UserService: {
      service: grpc.ServiceDefinition;
    };
  };
};

const toGrpcUser = (user: Awaited<ReturnType<UserService['create']>>) => ({
  id: user.id,
  email: user.email,
  name: user.name,
  created_at: user.createdAt.toISOString(),
  updated_at: user.updatedAt.toISOString(),
});

export class UserGrpcServerFactory {
  static create(userService: UserService): grpc.Server {
    const packageDefinition = protoLoader.loadSync(getUserProtoPath(), {
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true,
    });
    const proto = grpc.loadPackageDefinition(packageDefinition) as unknown as UserProtoPackage;
    const server = new grpc.Server();

    server.addService(proto.user.UserService.service, {
      CreateUser: async (
        call: { request: { email: string; name: string } },
        callback: GrpcCallback<ReturnType<typeof toGrpcUser>>,
      ) => {
        try {
          const user = await userService.create(call.request);
          callback(null, toGrpcUser(user));
        } catch (error) {
          callback(error as Error);
        }
      },
      GetUser: async (
        call: { request: { id: string } },
        callback: GrpcCallback<ReturnType<typeof toGrpcUser>>,
      ) => {
        const user = await userService.getById(call.request.id);

        if (!user) {
          callback(new Error('User not found.'));
          return;
        }

        callback(null, toGrpcUser(user));
      },
      ListUsers: async (_call: unknown, callback: GrpcCallback<{ users: unknown[] }>) => {
        const users = await userService.list();
        callback(null, {
          users: users.map(toGrpcUser),
        });
      },
    });

    return server;
  }
}
