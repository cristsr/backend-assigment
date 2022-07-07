import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';
import { Logger, Type } from '@nestjs/common';

export function validate<T>(config: Record<string, unknown>, type: Type<T>): T {
  const logger = new Logger(validate.name);

  const validatedConfig = plainToClass(type, config);

  const errors = validateSync(validatedConfig as any, {
    skipMissingProperties: false,
  });

  if (!!errors.length) {
    errors
      .map((error) => error.constraints)
      .map((constraints) => Object.values(constraints))
      .forEach((v) => logger.error(v));

    throw new TypeError('Invalid environment configuration');
  }

  return validatedConfig;
}

export function mapEnvironmentKeys<T>(type: Type<T>): Readonly<{
  [key in keyof T]: string;
}> {
  const keys = Object.keys(new type()) as (keyof T)[];

  const entries: (keyof T)[][] = keys.map((key) => [key, key]);

  return Object.freeze(Object.fromEntries(entries));
}
