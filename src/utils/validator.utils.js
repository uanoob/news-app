const checkValidity = (name, value) => {
  const limits = {
    name: { min: 3, max: 20 },
    password: { min: 6, max: 100 },
    email: { min: 5, max: 50 },
    text: { min: 20, max: 500 },
  };
  let isValid = true;
  isValid = value.trim() !== '' && isValid;
  isValid = value.length >= limits[name].min && isValid;
  isValid = value.length <= limits[name].max && isValid;
  return isValid;
};

export default checkValidity;
