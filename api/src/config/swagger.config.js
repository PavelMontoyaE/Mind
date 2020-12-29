const options = {
  explorer: true,
  swaggerOptions: {
    urls: [
      {
        url: 'http://localhost:3030/swaggerV2.json',
        name: 'API v2',
      },
      {
        url: 'http://localhost:3030/swagger.json',
        name: 'API v1',
      },
    ],
  },
};

export default options;
