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
			navButton: ".cs-nav-button",
		},
		CLASSES: {
			active: "cs-active",
			menuOpen: "cs-open",
		},
	};

	// DOM Elements
	const elements = {
		body: document.querySelector(CONFIG.SELECTORS.body),
		navigation: document.querySelector(CONFIG.SELECTORS.navigation),
		hamburger: document.querySelector(CONFIG.SELECTORS.hamburger),
		menuWrapper: document.querySelector(CONFIG.SELECTORS.menuWrapper),
		navButton: document.querySelector(CONFIG.SELECTORS.navButton),
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

	// Derives menu inert state from whether it is actually open
	const syncMenuInert = () => {
		if (!elements.menuWrapper || !elements.navigation) return;
		const isOpen = elements.navigation.classList.contains(
			CONFIG.CLASSES.active,
		);
		elements.menuWrapper.inert = isMobile() && !isOpen;
	};

	// Derives each dropdown menu's inert state from its active class or hover
	const syncDropdownInert = () => {
		if (!elements.navigation) return;
		elements.navigation
			.querySelectorAll(CONFIG.SELECTORS.dropdown)
			.forEach((dropdown) => {
				const menu = dropdown.querySelector(
					CONFIG.SELECTORS.dropdownMenu,
				);
				if (!menu) return;
				const isOpen =
					dropdown.classList.contains(CONFIG.CLASSES.active) ||
					dropdown.matches(":hover");
				menu.inert = !isOpen;
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
			const menu = dropdown.querySelector(CONFIG.SELECTORS.dropdownMenu);

			if (button) {
				button.setAttribute("aria-expanded", "false");
				shouldFocus && button.focus();
			}

			if (menu) {
				menu.inert = true;
			}

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
				dropdownManager.toggle(dropdown);
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
					dropdownManager.close(dropdown);
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

		handleDropdownHover(event) {
			if (isMobile()) return; // Only apply hover behavior on desktop

			const dropdown = event.target.closest(CONFIG.SELECTORS.dropdown);
			if (!dropdown) return;

			const menu = dropdown.querySelector(CONFIG.SELECTORS.dropdownMenu);
			if (!menu) return;

			if (event.type === "mouseenter") {
				menu.inert = false;
			} else if (event.type === "mouseleave") {
				// Only set inert=true if mouse is leaving the entire dropdown area
				// Use setTimeout to allow mouseleave/mouseenter events to complete
				setTimeout(() => {
					// Check if mouse is still over the dropdown or its menu
					if (!dropdown.matches(":hover")) {
						menu.inert = true;
					}
				}, 1);
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

			// Desktop hover listeners for inert management
			elements.navigation.addEventListener(
				"mouseenter",
				eventManager.handleDropdownHover,
				true,
			);
			elements.navigation.addEventListener(
				"mouseleave",
				eventManager.handleDropdownHover,
				true,
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

			// Breakpoint crossing handling
			mobileMQL.addEventListener("change", (e) => {
				this.inertState();
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
