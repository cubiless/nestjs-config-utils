import { Inject } from '@nestjs/common';
import { ClassConstructor } from 'class-transformer/types/interfaces';
import { getTypedConfigToken } from '../utils/getTypedConfigToken';

export function InjectConfig<T extends object>(cls: ClassConstructor<T>) {
  return Inject(getTypedConfigToken(cls));
}
