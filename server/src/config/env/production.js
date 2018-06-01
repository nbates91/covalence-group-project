// This object should mimic the structure of the object in env/development, but should use env properties
// Remember to set these env properties in the environment in which you deploy (AWS, Heroku, etc.)
// Also set the NODE_ENV environment property to "production" (no quotes) in AWS, Heroku, etc.
let cfg = {
    DB_HOST: process.env.DB_HOST,
    DB_NAME: process.env.DB_NAME,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    MAILGUN_API_KEY: process.env.MAILGUN_API_KEY,
    // STRIPE_SK: process.env.STRIPE_SK
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET
};

export { cfg };