import { Expose } from 'class-transformer';
import { ExposeOptions } from 'class-transformer/types/interfaces';

export function FromEnv(
  name: string,
  options: Omit<ExposeOptions, 'name' | 'toClassOnly' | 'toPlainOnly'> = {},
) {
  return Expose({ name, toClassOnly: true, ...options });
}
