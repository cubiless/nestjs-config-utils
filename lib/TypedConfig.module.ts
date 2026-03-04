import { ConfigModule, registerAs } from '@nestjs/config';
import {
  ClassConstructor,
  ClassTransformOptions,
} from 'class-transformer/types/interfaces';
import { validateConfigUtils } from './utils/validateConfig.utils';
import * as process from 'process';
import { PathLike, readFileSync } from 'fs';
import { isAbsolute, join } from 'path';
import { load } from 'js-yaml';
import { ValidatorOptions } from 'class-validator/types/validation/ValidatorOptions';

export class TypedConfig {
  static forFeature<T extends object>(cls: ClassConstructor<T>) {
    return ConfigModule.forFeature(
      registerAs(cls.name, () => {
        return validateConfigUtils(process?.env, cls);
      }),
    );
  }
}

export class TypedYamlConfig {
  static forFeature<T extends object>(
    cls: ClassConstructor<T>,
    pathOrLoader: PathLike | (() => Promise<string> | string),
    transformOptions: ClassTransformOptions = {},
    validatorOptions: ValidatorOptions = {},
  ) {
    return ConfigModule.forFeature(
      registerAs(cls.name, async () => {
        let yaml: string;

        if (typeof pathOrLoader === 'function') {
          // Custom loader
          yaml = await pathOrLoader();
        } else if (typeof pathOrLoader !== 'string') {
          // Load by Buffer or URL
          yaml = readFileSync(pathOrLoader, 'utf8');
        } else if (isAbsolute(pathOrLoader)) {
          // Load by absolute path
          yaml = readFileSync(pathOrLoader, 'utf8');
        } else {
          // Load by relative path
          const rootPath: string = process.cwd();
          yaml = readFileSync(join(rootPath, pathOrLoader), 'utf8');
        }

        // YAML-TO-JSON Parser
        const jsonObject: object = (await load(yaml)) as object;

        // Check validation
        return validateConfigUtils(
          jsonObject,
          cls,
          Object.assign(
            {
              strategy: 'exposeAll',
            },
            transformOptions,
          ),
          Object.assign(
            {
              whitelist: true,
            },
            validatorOptions,
          ),
        );
      }),
    );
  }
}
