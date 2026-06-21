import { resolve } from 'node:path';

export const getUserProtoPath = (): string =>
  resolve(process.cwd(), 'packages/contracts/proto/user.proto');
