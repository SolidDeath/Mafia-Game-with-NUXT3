import { z, ZodError, ZodParsedType } from 'zod';

export function useValidators(){
  return {validateEmail, validatePassword, validateUsername}
}

function validateEmail(email: string) {
  const emailSchema = z.string().email();
  try {
    return { flag: true, email: emailSchema.parse(email) };
  } catch (err) {
    return { flag: false, email: (err instanceof ZodError) ? err.issues[0].message : undefined };
  }
}

function validatePassword(password: string) {
  const passwordSchema = z.string().min(8);
  try {
    return { flag: true, password: passwordSchema.parse(password) };
  } catch (err) {
    return { flag: false, password: (err instanceof ZodError) ? "The password must be at least 8 characters long" : undefined };
  }
}

function validateUsername(name: string) {
  const usernameSchema = z.string().min(3);
  try {
    return { flag: true, name: usernameSchema.parse(name) };
  } catch (err) {
    return { flag: false, name: (err instanceof ZodError) ? "Username must NOT be empty and longer than 3 symbols" : undefined };
  }
}
