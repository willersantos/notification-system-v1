import { registerAs } from "@nestjs/config";

export default registerAs("url", () => ({
    rabbit: process.env.RABBIT_URL,
}));
