const discountValidation = (value) => {
  if (value >= 0 && value <= 100) return true;
  return "Discount should be between 0 and 100";
};

export default discountValidation;
