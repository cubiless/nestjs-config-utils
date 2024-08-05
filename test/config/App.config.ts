import { ConfigType } from '@nestjs/config';
import { addConfig, FromEnv } from '../../src';

class AppConfig {
  @FromEnv('APP_ADDRESS')
  address: string;

  @FromEnv('APP_PORT')
  port: number;
}

export const registerAs = addConfig('app', AppConfig);
export const Key = registerAs.KEY;
export type Type = ConfigType<typeof registerAs>;
