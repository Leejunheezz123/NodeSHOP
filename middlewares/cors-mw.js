const cors = require("cors");

module.exports = (origin) => {
  const corsOptions = {
    origin,
    optionsSuccessStatus: 200,
  };
  return cors(corsOptions);
};
