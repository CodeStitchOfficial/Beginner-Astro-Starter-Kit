(() => {
	// Configuration
	const CONFIG = {
		BREAKPOINTS: {
			MOBILE: 1023.5,
		},
		SELECTORS: {
			body: "body",
			navigation: "#cs-navigation",
			hamburger: "#cs-navigation .cs-toggle",
			menuWrapper: "#cs-ul-wrapper",
			topContact: ".cs-top-contact",
			topLogo: ".cs-top-logo",
			bottomLogo: ".cs-bottom-logo",
			darkModeToggle: "#dark-mode-toggle",
		},
		CLASSES: {
			active: "cs-active",
			menuOpen: "cs-open",
			scroll: "scroll",
		},
	};

	// DOM Elements
	const elements = {
		body: document.querySelector(CONFIG.SELECTORS.body),
		navigation: document.querySelector(CONFIG.SELECTORS.navigation),
		hamburger: document.querySelector(CONFIG.SELECTORS.hamburger),
		menuWrapper: document.querySelector(CONFIG.SELECTORS.menuWrapper),
		topContact: document.querySelector(CONFIG.SELECTORS.topContact),
		topLogo: document.querySelector(CONFIG.SELECTORS.topLogo),
		bottomLogo: document.querySelector(CONFIG.SELECTORS.bottomLogo),
		darkModeToggle: document.querySelector(CONFIG.SELECTORS.darkModeToggle),
	};

	// Utilities
	const isMobile = () =>
		window.matchMedia(`(max-width: ${CONFIG.BREAKPOINTS.MOBILE}px)`)
			.matches;

	const toggleAttribute = (
		element,
		attribute,
		value1 = "true",
		value2 = "false",
	) => {
		if (!element) return;
		const current = element.getAttribute(attribute);
		element.setAttribute(attribute, current === value1 ? value2 : value1);
	};

	const toggleInert = (element) =>
		element && (element.inert = !element.inert);

	// Menu Management
	const menuManager = {
		toggle() {
			if (!elements.hamburger || !elements.navigation) return;

			[elements.hamburger, elements.navigation].forEach((el) =>
				el.classList.toggle(CONFIG.CLASSES.active),
			);
			elements.body.classList.toggle(CONFIG.CLASSES.menuOpen);
			toggleAttribute(elements.hamburger, "aria-expanded");

			// Only manage inert state on mobile devices
			if (elements.menuWrapper && isMobile()) {
				toggleInert(elements.menuWrapper);
			}
		},
	};

	// Keyboard Management
	const keyboardManager = {
		handleEscape() {
			if (!elements.navigation) return;

			// Close hamburger menu if open
			if (
				elements.hamburger &&
				elements.hamburger.classList.contains(CONFIG.CLASSES.active)
			) {
				menuManager.toggle();
				elements.hamburger.focus();
			}
		},
	};

	// Event Management
	const eventManager = {
		handleMobileFocus(event) {
			if (
				!isMobile() ||
				!elements.navigation.classList.contains(CONFIG.CLASSES.active)
			)
				return;
			if (
				elements.menuWrapper.contains(event.target) ||
				elements.hamburger.contains(event.target)
			)
				return;

			menuManager.toggle();
		},
	};

	// Scroll Effects Management
	const scrollManager = {
		handleScrollEffects() {
			const scrollPosition = document.documentElement.scrollTop;
			const isScrolled = scrollPosition >= 100;

			elements.body.classList.toggle(CONFIG.CLASSES.scroll, isScrolled);
			this.manageLogo(isScrolled);

			// Make individual elements inert when scrolled
			if (elements.topContact) elements.topContact.inert = isScrolled;

			if (elements.darkModeToggle)
				elements.darkModeToggle.inert = isScrolled;
		},

		manageLogo(isScrolled) {
			if (elements.topLogo) {
				// Top logo is inert only on mobile devices, never on desktop
				elements.topLogo.inert = isMobile();
			}

			if (elements.bottomLogo) {
				// Bottom logo should not be inert on mobile
				// On desktop, it's active ONLY when scrolled.
				elements.bottomLogo.inert = isMobile() ? false : !isScrolled;
			}
		},
	};

	// Initialization & Setup
	const init = {
		inertState() {
			if (!elements.menuWrapper) return;

			// On mobile, menu starts closed, so set inert=true
			// On desktop, menu is always visible, so set inert=false
			elements.menuWrapper.inert = isMobile();
		},

		eventListeners() {
			if (!elements.hamburger || !elements.navigation) return;

			// Hamburger menu
			elements.hamburger.addEventListener("click", menuManager.toggle);
			elements.navigation.addEventListener("click", (e) => {
				if (
					e.target === elements.navigation &&
					elements.navigation.classList.contains(
						CONFIG.CLASSES.active,
					)
				) {
					menuManager.toggle();
				}
			});

			// Global events
			document.addEventListener(
				"keydown",
				(e) => e.key === "Escape" && keyboardManager.handleEscape(),
			);
			document.addEventListener(
				"focusin",
				eventManager.handleMobileFocus,
			);
			document.addEventListener("scroll", () =>
				scrollManager.handleScrollEffects(),
			);

			// Resize handling
			window.addEventListener("resize", () => {
				this.inertState();
				if (
					!isMobile() &&
					elements.navigation.classList.contains(
						CONFIG.CLASSES.active,
					)
				) {
					menuManager.toggle();
				}
			});
		},
	};

	// Initialize navigation system
	init.inertState();
	init.eventListeners();
})();
