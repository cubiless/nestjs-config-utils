import { ClassConstructor } from 'class-transformer/types/interfaces';
import { getConfigToken } from '@nestjs/config';

export function getTypedConfigToken<T extends object>(
  cls: ClassConstructor<T>,
) {
  return getConfigToken(cls.name);
}
