function response({ res, code, message: msg, ...obj }) {
  return res.status(code).json({
    code,
    message: msg instanceof Error ? msg.message : msg,
    ...obj,
  });
}

function uniqueValidation(errors) {
  const checked = [];

  return errors.filter((error) => {
    if (checked.includes(error.path)) {
      return false;
    }

    checked.push(error.path);
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
