export const emailValidator = (_: any, value: string) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
  if (!value) {
    return Promise.resolve();
  }
  
  if (!emailRegex.test(value)) {
    return Promise.reject('Please enter a valid email address');
  }
  
  return Promise.resolve();
};

export const phoneValidator = (_: any, value: string) => {
  const phoneRegex = /^\+\d{1,4}(?=(?:\s*\d){9,})(?:\s\d+)+$/;

  if (!value) {
    return Promise.resolve();
  }

  if (!phoneRegex.test(value)) {
    return Promise.reject('Please enter a valid phone number in format: +355 69 76 76 654');
  }

  return Promise.resolve();
};

export const zipCodeValidator = (_: any, value: string) => {
  const zipRegex = /^\d{5}(-\d{4})?$/;
  
  if (!value) {
    return Promise.resolve();
  }
  
  if (!zipRegex.test(value)) {
    return Promise.reject('Please enter a valid zip code (12345 or 12345-6789)');
  }
  
  return Promise.resolve();
};