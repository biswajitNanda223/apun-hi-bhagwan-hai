import { UserFactory, type UserRepository } from '@fastify-workspace/domain';
import { UserService } from './user.service.js';

export class UserServiceFactory {
  static create(repository: UserRepository): UserService {
    return new UserService(repository, new UserFactory());
  }
}
