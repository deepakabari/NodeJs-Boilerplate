const errors: string[] = [];

// ANSI color codes
const COLORS = {
  blue: (str: string) => `\x1b[34m${str}\x1b[0m`,
  red: (str: string) => `\x1b[31m${str}\x1b[0m`,
  yellow: (str: string) => `\x1b[33m${str}\x1b[0m`
};

export const get = (key: string, required = true): string => {
  const value = process.env[key];
  if (!value && required) {
    errors.push(`${COLORS.blue(key)}: is required but missing`);
  }
  return value ?? '';
};

export const getEnum = <T extends string>(key: string, choices: T[]): T | undefined => {
  const value = process.env[key] as T;
  if (!value || !choices.includes(value)) {
    errors.push(`${COLORS.blue(key)}: must be one of [${choices.join(', ')}]`);
    return undefined;
  }
  return value;
};

export const getNum = (key: string, fallback?: number): number | undefined => {
  const raw = process.env[key];
  if (!raw && fallback !== undefined) return fallback;
  const value = Number(raw);
  if (isNaN(value)) {
    errors.push(`${COLORS.blue(key)}: must be a valid number`);
    return fallback;
  }
  return value;
};

export const getBool = (key: string): boolean => {
  const value = process.env[key];

  if (!value) return false;

  const normalized = value.toLowerCase();

  if (['true'].includes(normalized)) return true;
  if (['false'].includes(normalized)) return false;

  // Invalid boolean string — log error
  errors.push(`${COLORS.blue(key)}: must be a boolean ('true' | 'false')`);
  return false; // fallback value to keep the app running
};

export const validateEnv = (): void => {
  if (errors.length > 0) {
    console.error('\x1b[33m\n================================\x1b[0m');
    console.error(COLORS.red('Invalid environment variables:'));
    errors.forEach((msg) => console.error(`  - ${msg}`));
    console.error('\x1b[33m================================\n\x1b[0m');
    console.error('❌ Exiting with error code 1');
    process.exit(1);
  }
};
