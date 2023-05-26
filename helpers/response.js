function response({ res, code, message, ...obj }) {
  return res.status(code).json({
    code,
    message,
    ...obj,
  });
}

function uniqueValidation(errors) {
  const checked = [];

  return errors.filter((error) => {
    if (checked.includes(error.param)) {
      return false;
    }

    checked.push(error.param);
    return true;
  });
}

function exclude(obj, keys) {
  for (const key of keys) {
    delete obj[key];
  }

  return obj;
}

module.exports = { response, uniqueValidation, exclude };
