import { randomUUID } from 'node:crypto';
import { User, type UserProps } from './user.entity.js';

export type CreateUserFactoryInput = {
  email: string;
  name: string;
};

export class UserFactory {
  create(input: CreateUserFactoryInput): User {
    const now = new Date();

    return User.create({
      id: randomUUID(),
      email: input.email,
      name: input.name,
      createdAt: now,
      updatedAt: now,
    });
  }

  rehydrate(props: UserProps): User {
    return User.create(props);
  }
}
