const validateProgress = function(
  value: string,
  validExample: string,
  pattern: string,
  placeholder: string
) {
  const regExpPattern = new RegExp(pattern);
  const valLength = value.length;
  let testValue = "";
  //convert to months
  if (valLength === 1 && placeholder.toUpperCase().substr(0, 2) == "MM") {
    if (Number(value) > 1 && Number(value) < 10) {
      value = "0" + value;
    }
    return value;
  }

  for (let i = valLength; i >= 0; i--) {
    testValue = value + validExample.substr(value.length);
    if (regExpPattern.test(testValue)) {
      return value;
    } else {
      value = value.substr(0, value.length - 1);
    }
  }

  return value;
};

export default validateProgress;
