const validateUTR = (utr) => {
  // UTR is required
  if (!utr) {
    return {
      valid: false,
      message: "UTR Number is required.",
    };
  }

  // Remove spaces
  utr = utr.trim();

  // Must contain only numbers
  if (!/^\d+$/.test(utr)) {
    return {
      valid: false,
      message: "UTR must contain only numbers.",
    };
  }

  // Must be exactly 12 digits
  if (utr.length !== 12) {
    return {
      valid: false,
      message: "UTR must be exactly 12 digits.",
    };
  }

  return {
    valid: true,
  };
};

module.exports = validateUTR;