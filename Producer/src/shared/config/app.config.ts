import { registerAs } from "@nestjs/config";

export default registerAs("app", () => ({
    port: process.env.PORT || 8000,
    ownerApp: process.env.OWNER_APPLICATION,
    productionEnvironmentName: "production",
    localEnvironmentName: "local"
}));
