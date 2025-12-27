// Authentication validation utilities

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export function validateEmail(email: string): ValidationResult {
  const errors: string[] = [];
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email) {
    errors.push('emailIsRequiredError');
  } else if (!emailRegex.test(email)) {
    errors.push('invalidEmailAddressError');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function validatePassword(password: string): ValidationResult {
  const errors: string[] = [];

  if (!password) {
    errors.push('passwordIsRequiredError');
  } else if (password.length < 8) {
    errors.push('passwordMustBeAtLeast8CharactersLong');
  } else if (!/[A-Z]/.test(password)) {
    errors.push('passwordMustContainUppercaseLetter');
  } else if (!/[a-z]/.test(password)) {
    errors.push('passwordMustContainLowercaseLetter');
  } else if (!/\d/.test(password)) {
    errors.push('passwordMustContainNumber');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function validateLoginCredentials(
  email: string,
  password: string
): ValidationResult {
  const emailValidation = validateEmail(email);
  const passwordValidation = validatePassword(password);

  return {
    isValid: emailValidation.isValid && passwordValidation.isValid,
    errors: [...emailValidation.errors, ...passwordValidation.errors],
  };
}
