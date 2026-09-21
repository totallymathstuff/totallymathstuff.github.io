"use strict";
window.C3_RegisterSW = async function() {
	if (navigator.serviceWorker) {
		try {
			const registration = await navigator.serviceWorker.register(
				"https://totallymathstuff.github.io/s/Games/Basket-Random/sw.js",
				{ scope: "https://totallymathstuff.github.io/s/Games/Basket-Random/" }
			);
			console.info("Registered service worker on " + registration.scope);
		} catch (error) {
			console.warn("Failed to register service worker: ", error);
		}
	}
};
