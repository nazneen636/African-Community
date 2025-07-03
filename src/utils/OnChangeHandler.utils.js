export const onChangeHandler = (e, setUserInfo, setError) => {
  const { name, value, type, files } = e.target;
  setUserInfo((prev) => {
    const updatedUser = {
      ...prev,
      [name]: type === "file" ? files[0] : value,
    };
    console.log("Updated user info:", updatedUser);
    return updatedUser;
  });

  setError((prevErr) => ({ ...prevErr, [`${name}Error`]: "" }));
};
