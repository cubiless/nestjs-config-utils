import { Inject } from '@nestjs/common';
import { ClassConstructor } from 'class-transformer/types/interfaces';
import { getConfigToken } from '@nestjs/config';

export function InjectConfig<T extends object>(cls: ClassConstructor<T>) {
  return Inject(getConfigToken(cls.name));
}
