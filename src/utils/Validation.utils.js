export const handleValidation = (info, setError) => {
  const error = {};
  for (let field in info) {
    if (info[field] === "") {
      error[`${field}Error`] = `${field} is missing`;
    }
  }
  setError(error);
  console.log(error);

  return Object.keys(error).length === 0;
};
