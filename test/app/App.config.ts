import { FromEnv } from '../../src';

export class AppConfig {
  @FromEnv('APP_ADDRESS')
  readonly address: string = 'localhost';

  @FromEnv('APP_PORT')
  readonly port: number = (() => 6666)();
}
