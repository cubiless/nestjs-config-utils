import { IsArray, IsNumber, IsString } from 'class-validator';

export class YamlConfig {
  @IsArray()
  @IsString({ each: true })
  readonly address: string[] = [];

  @IsNumber()
  readonly port: number = (() => 6666)();
}
