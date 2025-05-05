import "dotenv/config"; // Importa dotenv para cargar variables desde el archivo .env

export default {
	expo: {
		name: "vertere",
		slug: "tu-slug-de-app",
		version: "1.0.0",
		newArchEnabled: true,
		orientation: "portrait",
		icon: "./assets/icon.png", // Ruta al ícono de tu app
		splash: {
			image: "./assets/splash.png", // Ruta a la imagen de splash
			resizeMode: "contain",
			backgroundColor: "#ffffff",
		},
		updates: {
			fallbackToCacheTimeout: 0,
		},
		assetBundlePatterns: ["**/*"],
		extra: {
			eas: {
				projectId: "f9de2236-733a-404c-ba35-4825b6ab3a60", // Añade el projectId aquí
			},
			//API_URL: process.env.EXPO_PUBLIC_API_URL, // Obtén la variable del .env
		},
		android: {
			package: "com.vertere.app", // Especifica tu nombre de paquete aquí
		},
	},
};