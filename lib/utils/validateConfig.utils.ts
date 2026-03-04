import { plainToInstance } from 'class-transformer';
import {
  ClassConstructor,
  ClassTransformOptions,
} from 'class-transformer/types/interfaces';
import { validateSync, ValidationError } from 'class-validator';
import { ValidatorOptions } from 'class-validator/types/validation/ValidatorOptions';

export function validateConfigUtils<T extends object>(
  object: object,
  cls: ClassConstructor<T>,
  transformOptions: ClassTransformOptions = {},
  validatorOptions: ValidatorOptions = {},
): T {
  // Read and mapped config
  const validatedConfig: T = plainToInstance(
    cls,
    Object.assign({}, object),
    Object.assign(
      {
        enableImplicitConversion: true,
        strategy: 'excludeAll',
        exposeDefaultValues: true,
      },
      transformOptions,
    ),
  );

  // Validate config
  const errors: ValidationError[] = validateSync(
    validatedConfig,
    Object.assign(
      {
        skipMissingProperties: false,
        forbidUnknownValues: false,
      },
      validatorOptions,
    ),
  );

  if (errors.length > 0) {
    throw new Error(
      `Config(${cls.name}) can not be loaded: ${errors.toString()}`,
    );
  }

  return validatedConfig;
}
