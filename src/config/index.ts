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
    

}