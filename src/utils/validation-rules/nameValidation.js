const nameValidation = (value) => {
  if (value?.length >= 4 && value?.length <= 25) return true;

  return "Name needs to be between 4 and 25 characters.";
};

export default nameValidation;
