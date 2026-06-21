export type AppConfig = {
  nodeEnv: string;
  host: string;
  restPort: number;
  grpcPort: number;
  databaseUrl: string;
};

const readNumber = (value: string | undefined, fallback: number): number => {
  const parsed = Number(value ?? fallback);
  if (Number.isNaN(parsed)) {
    throw new Error(`Expected numeric environment value, received "${value}".`);
  }
  return parsed;
};

export const loadConfig = (): AppConfig => ({
  nodeEnv: process.env.NODE_ENV ?? 'development',
  host: process.env.HOST ?? '0.0.0.0',
  restPort: readNumber(process.env.REST_PORT, 3000),
  grpcPort: readNumber(process.env.GRPC_PORT, 50051),
  databaseUrl: process.env.DATABASE_URL ?? 'file:./dev.db',
});
