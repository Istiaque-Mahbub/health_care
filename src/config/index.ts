import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
    node_env: process.env.NODE_ENV,
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,
    bcrypt_salt_round:process.env.BCRYPT_SALT_ROUND,
    cloudinary_api_secret:process.env.CLOUDINARY_API_SECRET,
    cloudinary_api_key:process.env.CLOUDINARY_API_KEY,
    cloudinary_cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    access_token_secret:process.env.ACCESS_TOKEN_SECRET,
    refresh_token_secret:process.env.REFRESH_TOKEN_SECRET,
    OPEN_ROUTER_API_KEY:process.env.OPEN_ROUTER_API_KEY,
    STRIPE_SECRET_KEY:process.env.STRIPE_SECRET_KEY,
    CLIENT_URL:process.env.CLIENT_URL,
    STRIPE_WEBHOOK_SECRET:process.env.STRIPE_WEBHOOK_SECRET,
    RESET_PASSWORD_TOKEN_EXPIRES_IN:process.env.RESET_PASSWORD_TOKEN_EXPIRES_IN,
    RESET_PASSWORD_LINK:process.env.RESET_PASSWORD_LINK,
    EMAIL_SENDER_EMAIL:process.env.EMAIL_SENDER_EMAIL,
    EMAIL_SENDER_APP_PASSWORD:process.env.EMAIL_SENDER_APP_PASSWORD,
    
}