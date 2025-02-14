import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectConfig } from '../../src';
import { AppConfig } from './App.config';
import { YamlConfig } from './YAML.config';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    @InjectConfig(AppConfig) private readonly config: AppConfig,
    @InjectConfig(YamlConfig) private readonly yamlConfig: YamlConfig,
  ) {}

  onModuleInit() {
    console.log(this.config);
    console.log(this.yamlConfig);
  }
}
