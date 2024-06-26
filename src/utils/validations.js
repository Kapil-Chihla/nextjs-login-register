export const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(String(email).toLowerCase());
  };
  
export const validatePhoneNumber = (phoneNumber) => {
    const re = /\d{10}$/;
    return re.test(String(phoneNumber));
};
  
export const validatePassword = (password) => {
    return password.length >= 8 && /\d/.test(password) && /[a-zA-Z]/.test(password);
};
  
