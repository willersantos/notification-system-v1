import { registerAs } from "@nestjs/config";

export default registerAs("authJwt", () => ({
    jwtSecret: process.env.JWT_SECRET,
    accessTokenExpirationDays: parseInt(process.env.ACCESS_TOKEN_EXPIRATION_DAYS as string, 5) || 5
}));
