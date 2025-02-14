import { Module } from '@nestjs/common';
import { AppConfig } from './App.config';
import { YamlConfig } from './YAML.config';
import { AppService } from './App.service';
import { TypedConfig, TypedYamlConfig } from '../../src';

@Module({
  imports: [
    TypedConfig.forFeature(AppConfig),
    TypedYamlConfig.forFeature(YamlConfig, './test/app/example.yml'),
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
