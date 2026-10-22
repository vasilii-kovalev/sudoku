import { registerSW } from "virtual:pwa-register";

const initializeIcons = (): void => {
	const manifest = document.getElementById("app-manifest");
	const appleIcon = document.getElementById("apple-touch-icon");

	if (!(manifest instanceof HTMLLinkElement && appleIcon instanceof HTMLLinkElement)) {
		throw new Error("Missing application icon or manifest link.");
	}

	const colorScheme = window.matchMedia("(prefers-color-scheme: dark)");

	const updateIcons = (): void => {
		let suffix = "";

		if (colorScheme.matches) {
			suffix = "-dark";
		}

		manifest.href = `${import.meta.env.BASE_URL}manifest${suffix}.webmanifest`;
		appleIcon.href = `${import.meta.env.BASE_URL}apple-touch-icon${suffix}.png`;
	};

	updateIcons();

	colorScheme.addEventListener("change", updateIcons);
};

// The browser checks for an update whenever the app is opened; these checks cover windows that stay open.
const watchForUpdates = (registration: ServiceWorkerRegistration): void => {
	const checkForUpdate = (): void => {
		if (navigator.onLine && document.visibilityState === "visible") {
			registration.update().catch((error: unknown) => {
				// The current version keeps working and the next check retries, so this is not shown in the app.
				// oxlint-disable-next-line eslint/no-console
				console.warn("Could not check for an app update.", error);
			});
		}
	};

	window.addEventListener("online", checkForUpdate);
	document.addEventListener("visibilitychange", checkForUpdate);
};

const initializePwa = (): void => {
	initializeIcons();

	registerSW({
		onRegisterError(error: unknown) {
			// The app keeps working online and registration is retried on the next opening, so this is not shown in the app.
			// oxlint-disable-next-line eslint/no-console
			console.error("Could not set up offline use.", error);
		},
		onRegisteredSW(_url, registration) {
			if (registration) {
				watchForUpdates(registration);
			}
		},
	});
};

export { initializePwa };
