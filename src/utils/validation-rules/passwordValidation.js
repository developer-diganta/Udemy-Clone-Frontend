const passwordValidation = (value) => {
  if (
    value?.length >= 8 &&
    /[A-Z]/.test(value) &&
    /[a-z]/.test(value) &&
    /\d/.test(value) &&
    /[\W_]/.test(value)
  )
    return true;

  return "Password must be at least 8 characters and include at least one uppercase letter, one lowercase letter, one digit, and one special character.";
};

export default passwordValidation;
