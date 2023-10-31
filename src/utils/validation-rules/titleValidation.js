const titleValidation = (value) => {
  if (
    value.length >= 4 &&
    value.length <= 50 &&
    /^[a-zA-Z0-9,!?&() ]+$/.test(value)
  ) {
    return true;
  } else {
    return "Title should be between 4 and 50 characters and can include letters, numbers, and the special characters , ! ? & ( )";
  }
};

export default titleValidation;
