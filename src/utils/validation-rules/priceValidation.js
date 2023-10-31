const priceValidation = (value) => {
  if (isNaN(value)) return "Should be a number";
  if (value < 0) return "Should be a positive value";
  return true;
};

export default priceValidation;
