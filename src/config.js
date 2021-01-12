const apiConfig = {
  protocol: process.env.API_PROTOCOL || "http",
  host: process.env.API_HOST || "library-lumen.herokuapp.com/",
  port: process.env.API_PORT || 5000,
  prefix: process.env.API_PREFIX || ""
};

export default {
  api: `${apiConfig.protocol}://${apiConfig.host}:${apiConfig.port}/${apiConfig.prefix}`
  // api: `${apiConfig.protocol}://${apiConfig.host}:${apiConfig.port}/${apiConfig.prefix}`
};
