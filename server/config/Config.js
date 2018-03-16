export default {
    //should be 'prod' or 'dev'
    ENV: process.env.ENV || 'dev',
    //public port of the application
    PORT: process.env.PORT || 21973,

    //JWT
    JWT_SECRET: process.env.JWT_SECRET || 'superSecretKey',

    //cookies
    COOKIE_SECRET: process.env.COOKIE_SECRET || 'superDuperSecretKey',
    COOKIE_NAME: process.env.COOKIE_NAME || 'cookie_monster_rpz',

    //bcrypt
    BCRYPT_SALT_ROUNDS: process.env.BCRYPT_SALT_ROUNDS || 10
}

