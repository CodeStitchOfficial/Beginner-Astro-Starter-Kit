// ==============================
// Navigation & Accessibility JS
// ==============================

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
			dropdownToggle: ".cs-dropdown-toggle",
			dropdown: ".cs-dropdown",
			dropdownMenu: ".cs-drop-ul",
			topContact: ".cs-top-contact",
			navButton: ".cs-nav-button",
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
		navButton: document.querySelector(CONFIG.SELECTORS.navButton),
		topLogo: document.querySelector(CONFIG.SELECTORS.topLogo),
		bottomLogo: document.querySelector(CONFIG.SELECTORS.bottomLogo),
		darkModeToggle: document.querySelector(CONFIG.SELECTORS.darkModeToggle),
	};

	// Utilities
	const mobileMQL = window.matchMedia(
		`(max-width: ${CONFIG.BREAKPOINTS.MOBILE}px)`,
	);
	const isMobile = () => mobileMQL.matches;

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

	// Derives menu inert state from current open state instead of just breakpoint
	const syncMenuInert = () => {
		if (!elements.menuWrapper || !elements.navigation) return;
		const isOpen = elements.navigation.classList.contains(
			CONFIG.CLASSES.active,
		);
		elements.menuWrapper.inert = isMobile() && !isOpen;
	};

	// Derives each dropdown menu's inert state; dropdowns are only ever inert on
	// mobile (desktop relies on CSS/keyboard visibility, never on inert) and only
	// when closed
	const syncDropdownInert = () => {
		if (!elements.navigation) return;
		elements.navigation
			.querySelectorAll(CONFIG.SELECTORS.dropdown)
			.forEach((dropdown) => {
				const menu = dropdown.querySelector(
					CONFIG.SELECTORS.dropdownMenu,
				);
				if (!menu) return;
				const isOpen = dropdown.classList.contains(
					CONFIG.CLASSES.active,
				);
				menu.inert = isMobile() && !isOpen;
			});
	};

	// Dropdown Management
	const dropdownManager = {
		close(dropdown, shouldFocus = false) {
			if (
				!dropdown ||
				!dropdown.classList.contains(CONFIG.CLASSES.active)
			)
				return false;

			dropdown.classList.remove(CONFIG.CLASSES.active);
			const button = dropdown.querySelector(
				CONFIG.SELECTORS.dropdownToggle,
			);

			if (button) {
				button.setAttribute("aria-expanded", "false");
				shouldFocus && button.focus();
			}

			syncDropdownInert();

			return true;
		},

		toggle(element) {
			element.classList.toggle(CONFIG.CLASSES.active);
			const button = element.querySelector(
				CONFIG.SELECTORS.dropdownToggle,
			);

			button && toggleAttribute(button, "aria-expanded");
			syncDropdownInert();
		},

		closeAll() {
			if (!elements.navigation) return false;
			let closed = false;

			elements.navigation
				.querySelectorAll(
					`${CONFIG.SELECTORS.dropdown}.${CONFIG.CLASSES.active}`,
				)
				.forEach((dropdown) => {
					this.close(dropdown, true);
					closed = true;
				});

			return closed;
		},
	};

	// Menu Management
	const menuManager = {
		toggle() {
			if (!elements.hamburger || !elements.navigation) return;

			const isClosing = elements.navigation.classList.contains(
				CONFIG.CLASSES.active,
			);

			[elements.hamburger, elements.navigation].forEach((el) =>
				el.classList.toggle(CONFIG.CLASSES.active),
			);
			elements.body.classList.toggle(CONFIG.CLASSES.menuOpen);
			toggleAttribute(elements.hamburger, "aria-expanded");

			syncMenuInert();

			// When closing the mobile menu, also close any open dropdowns
			isClosing && dropdownManager.closeAll();
		},
	};

	// Keyboard Management
	const keyboardManager = {
		handleEscape() {
			if (!elements.navigation) return;

			// Close any open dropdown menus first
			const dropdownsClosed = dropdownManager.closeAll();
			if (dropdownsClosed) return;

			// Then close hamburger menu if open
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
		handleDropdownClick(event) {
			if (!isMobile()) return;

			const button = event.target.closest(
				CONFIG.SELECTORS.dropdownToggle,
			);
			if (!button) return;

			event.preventDefault();
			const dropdown = button.closest(CONFIG.SELECTORS.dropdown);
			if (dropdown) {
				dropdownManager.toggle(dropdown);
			}
		},

		handleDropdownKeydown(event) {
			if (event.key !== "Enter" && event.key !== " ") return;

			const button = event.target.closest(
				CONFIG.SELECTORS.dropdownToggle,
			);
			if (!button) return;

			event.preventDefault();
			const dropdown = button.closest(CONFIG.SELECTORS.dropdown);
			if (dropdown) {
				if (isMobile()) {
					dropdownManager.toggle(dropdown);
				} else {
					// Desktop keyboard navigation
					dropdown.classList.toggle(CONFIG.CLASSES.active);
					toggleAttribute(button, "aria-expanded");
				}
			}
		},

		handleFocusOut(event) {
			setTimeout(() => {
				if (!event.relatedTarget) return;

				const dropdown = event.target.closest(
					CONFIG.SELECTORS.dropdown,
				);
				if (
					dropdown?.classList.contains(CONFIG.CLASSES.active) &&
					!dropdown.contains(event.relatedTarget)
				) {
					if (isMobile()) {
						dropdownManager.close(dropdown);
					} else {
						// On desktop, just remove cs-active class, don't touch inert
						dropdown.classList.remove(CONFIG.CLASSES.active);
						const button = dropdown.querySelector(
							CONFIG.SELECTORS.dropdownToggle,
						);
						button && button.setAttribute("aria-expanded", "false");
					}
				}
			}, 10);
		},

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
			if (elements.navButton) elements.navButton.inert = isScrolled;
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
			syncMenuInert();
			syncDropdownInert();
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

			// Dropdown delegation
			elements.navigation.addEventListener(
				"click",
				eventManager.handleDropdownClick,
			);
			elements.navigation.addEventListener(
				"keydown",
				eventManager.handleDropdownKeydown,
			);
			elements.navigation.addEventListener(
				"focusout",
				eventManager.handleFocusOut,
			);

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

			// Breakpoint-crossing handling
			mobileMQL.addEventListener("change", (e) => {
				syncMenuInert();
				syncDropdownInert();
				if (
					!e.matches &&
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
