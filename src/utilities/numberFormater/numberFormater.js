const numberFormater = input => {
    const inputStr = input?.toString();
    const numLength = inputStr?.length - 1;
    let commaStep = 3;
    let formated = '';

    if (input) {
      for (let i = 0; i <= numLength; i++) {
        if (i === numLength % 3 || (i - (numLength % 3)) % 3 === 0) {
          formated += inputStr[i] + (i == numLength ? '' : ',');
          commaStep += 3;
        } else {
          formated += inputStr[i];
        }
      }
    }

    const output = formated ? formated : '0'

    return output;
  };

  export default numberFormater