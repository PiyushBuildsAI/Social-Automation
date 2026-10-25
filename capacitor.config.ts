import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.piyushbuildsai.automate",
  appName: "AutoMate",
  webDir: "out",
  server: {
    androidScheme: "https",
  },
  android: {
    backgroundColor: "#ffffff",
  },
};

export default config;
