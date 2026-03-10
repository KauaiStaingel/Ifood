export default () => ({
  app: {
    name: process.env.APP_NAME || 'IFOOD',
    port: Number(process.env.PORT || 3000),
    environment: process.env.NODE_ENV || 'development',
    apiPrefix: process.env.API_PREFIX || 'api/v1',
  },
});