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
    BCRYPT_SALT_ROUNDS: process.env.BCRYPT_SALT_ROUNDS || 10,

    //db
    DB_DATABASE: process.env.DB_DATABASE,
    DB_URL: process.env.DB_URL,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PORT: process.env.DB_PORT,
    DB_POOL_MAX: process.env.DB_POOL_MAX || 5,

    //mail
    MAIL_PASSWORD: process.env.MAIL_PASSWORD,
    MAIL_USER: process.env.MAIL_USER,
    MAIL_HOST: process.env.MAIL_HOST,
    MAIL_FROM: process.env.MAIL_FROM,

    //app url
    BASE_URL : process.env.BASE_URL || 'https://scipio.tircher.be',

    //gameserver ports
    MINECRAFT_PORT : process.env.MINECRAFT_PORT,
    TRACKMANIA_PORT : process.env.TRACKMANIA_PORT,
    CONAN_PORT_1 : process.env.CONAN_PORT_1,
    CONAN_PORT_2 : process.env.CONAN_PORT_2,

    //gameserver websocket room
    GAMESERVER_ROOM : process.env.GAMESERVER_ROOM || 'authenticated'
}

