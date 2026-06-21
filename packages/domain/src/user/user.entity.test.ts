import { describe, expect, it } from 'vitest';
import { UserFactory } from './user.factory.js';

describe('UserFactory', () => {
  it('creates a normalized valid user', () => {
    const user = new UserFactory().create({
      email: 'ADMIN@example.com',
      name: ' Admin ',
    });

    expect(user.toJSON()).toMatchObject({
      email: 'admin@example.com',
      name: 'Admin',
    });
  });
});
