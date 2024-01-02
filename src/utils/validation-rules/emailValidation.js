const emailValidation = (value) => {
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return true;

  return "Must be a valid e-mail.";
};

export default emailValidation;
