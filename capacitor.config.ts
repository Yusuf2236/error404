import type { CapacitorConfig } from '@capacitor/cli';

// The VIP UZBE app relies on a live server (booking APIs + real-time SSE), so the
// native shell loads the running site rather than a static bundle. Point server.url
// at wherever the app is reachable from the device:
//   • Local testing on the same Wi-Fi: your machine's LAN IP, e.g. http://192.168.20.158:3000
//   • Production: https://vipuzbe.com
// Override without editing this file:  CAP_SERVER_URL=https://vipuzbe.com npx cap sync
const SERVER_URL = process.env.CAP_SERVER_URL || 'http://192.168.20.158:3000';

const config: CapacitorConfig = {
    appId: 'com.vipuzbe.app',
    appName: 'VIP UZBE',
    webDir: 'native/www',
    server: {
        url: SERVER_URL,
        // Allow plain http for LAN dev testing. Set to false for an https-only prod URL.
        cleartext: SERVER_URL.startsWith('http://'),
        androidScheme: 'https',
    },
    android: {
        backgroundColor: '#08080c',
    },
    ios: {
        backgroundColor: '#08080c',
    },
};

export default config;
