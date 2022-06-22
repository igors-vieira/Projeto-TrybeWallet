// Coloque aqui suas actions
export const VALIDATION_USER = 'VALIDATION_USER';

export const validationUser = (email) => ({
  type: VALIDATION_USER,
  email,
});
