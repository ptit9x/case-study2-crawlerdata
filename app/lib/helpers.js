
const isEmail = str => {
  const re = /\S+@\S+\.\S+/;

  return re.test(str);
};

module.exports = {
  isEmail,
};
