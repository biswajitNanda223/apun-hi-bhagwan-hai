import type { UserFactory, UserProps, UserRepository } from '@fastify-workspace/domain';

export type CreateUserCommand = {
  email: string;
  name: string;
};

export class UserService {
  constructor(
    private readonly users: UserRepository,
    private readonly userFactory: UserFactory,
  ) {}

  async create(command: CreateUserCommand): Promise<UserProps> {
    const existing = await this.users.findByEmail(command.email);

    if (existing) {
      throw new Error('A user with this email already exists.');
    }

    const user = this.userFactory.create(command);
    const saved = await this.users.create(user);

    return saved.toJSON();
  }

  async getById(id: string): Promise<UserProps | null> {
    const user = await this.users.findById(id);
    return user?.toJSON() ?? null;
  }

  async list(): Promise<UserProps[]> {
    const users = await this.users.list();
    return users.map((user) => user.toJSON());
  }
}
