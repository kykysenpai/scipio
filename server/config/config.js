const config = {
    //should be 'prod' or 'dev'
    ENV: 'dev',
    //public port of the application
    PORT: '21973',
    //jwt signing hash
    JWT_SECRET: process.env.JWT_SECRET || 'superSecretKey',
    //cookie signing hash
    COOKIE_SECRET: process.env.COOKIE_SECRET || 'superDuperSecretKey'

};

export default config;