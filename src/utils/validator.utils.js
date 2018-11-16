const checkValidity = (name, value) => {
  const limits = {
    user: { min: 5, max: 15 },
    text: { min: 20, max: 500 },
  };
  let isValid = true;
  isValid = value.trim() !== '' && isValid;
  isValid = value.length >= limits[name].min && isValid;
  isValid = value.length <= limits[name].max && isValid;
  return isValid;
};

export default checkValidity;
