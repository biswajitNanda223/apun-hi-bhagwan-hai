import type { PrismaClient, User as PrismaUserRecord } from '@prisma/client';
import { UserFactory } from '@fastify-workspace/domain';
import type { User as DomainUser, UserRepository } from '@fastify-workspace/domain';

export class PrismaUserRepository implements UserRepository {
  private readonly userFactory = new UserFactory();

  constructor(private readonly prisma: PrismaClient) {}

  async create(user: DomainUser): Promise<DomainUser> {
    const props = user.toJSON();

    const saved = await this.prisma.user.create({
      data: {
        id: props.id,
        email: props.email,
        name: props.name,
        createdAt: props.createdAt,
        updatedAt: props.updatedAt,
      },
    });

    return this.toDomain(saved);
  }

  async findById(id: string): Promise<DomainUser | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    return user ? this.toDomain(user) : null;
  }

  async findByEmail(email: string): Promise<DomainUser | null> {
    const user = await this.prisma.user.findUnique({ where: { email: email.toLowerCase() } });
    return user ? this.toDomain(user) : null;
  }

  async list(): Promise<DomainUser[]> {
    const users = await this.prisma.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return users.map((user) => this.toDomain(user));
  }

  private toDomain(record: PrismaUserRecord): DomainUser {
    return this.userFactory.rehydrate({
      id: record.id,
      email: record.email,
      name: record.name,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    });
  }
}
