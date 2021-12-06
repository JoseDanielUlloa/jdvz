// ********************
// Header
// ********************
// Left side nav
// ********************
// Original nav by Mark Caron (https://codepen.io/markcaron/pen/VgGJRW)
function navToggleClickEventHandler(event) {
  toggleMainNav(this);
}

function navToggleKeydownHandler(event) {
  const toggleButton = event.target;

  switch (event.key) {
    // Actual button, so Spacebar is captured already...

    case "Esc":
    case "Escape":
      closeMainNav(toggleButton);
      break;
    default:
      return;
  }
}

function subNavClickEventHandler(event) {
  const subNav = this.parentNode.querySelector('.sub-menu');

  if (subNav !== null) {
    event.preventDefault();
    toggleSubNav(this, subNav);
  }
}

function subNavKeydownHandler(event) {
  let subNav;
  let currentNavItem;
  
  if (this.classList.contains('.sub-menu')) {
    subNav = this;
    currentNavItem = this.querySelector('a');
  } else {
    subNav = this.parentNode.querySelector('.sub-menu');
    currentNavItem = event.target;
  }

  switch (event.key) {
    case "Spacebar":
    case " ":
      // Open subnav and jump to first item
      event.preventDefault();
      toggleSubNav(currentNavItem, subNav);
      break;
    case "Esc":
    case "Escape":
      closeSubNav(currentNavItem, subNav);
      break;
    default:
      return;
  }
}

function closeMainNav(button) {
  button.setAttribute('aria-expanded', 'false');
  navWrapper.setAttribute('aria-hidden', 'true');
  navWrapper.classList.add('noshow');
}

function openMainNav(button) {
  button.setAttribute('aria-expanded', 'true');
  navWrapper.setAttribute('aria-hidden', 'false');
  navWrapper.classList.remove('noshow');
}

function toggleMainNav(button) {
  if (button.getAttribute('aria-expanded') === 'true') {
    closeMainNav(button);
  } else {
    openMainNav(button);
  }
}

function closeSubNav(link, subNav) {
  link.setAttribute('aria-expanded', 'false');
  subNav.setAttribute('aria-hidden', 'true');
  subNav.classList.add('noshow');
}

function openSubNav(link, subNav) {
  link.setAttribute('aria-expanded', 'true');
  subNav.setAttribute('aria-hidden', 'false');
  subNav.classList.remove('noshow');
}

function toggleSubNav(link, subNav) {
  // Close all subnavs
  // WIP
  const subNavs = [
    ...document.querySelectorAll('.left-nav .sub-menu')
  ];
  // subNavs.forEach(siblingSubNav => {
  //   let siblingLink = siblingSubNav.parentNode.querySelector('a');
  //   closeSubNav(siblingLink, siblingSubNav);
  // });

  // Now open the proper subnav
  if (subNav !== null) {
    if (link.getAttribute('aria-expanded') === 'true') {
      closeSubNav(link, subNav);
    } else {
      openSubNav(link, subNav);
    }
  }
}

function setupSubNavItem(subNavItem) {
  let link = subNavItem.querySelector('a');
  let subNav = subNavItem.querySelector('.sub-menu');

  link.setAttribute('aria-expanded', 'false');
  link.setAttribute('role', 'button');
  subNav.setAttribute('aria-hidden', 'true');
  subNav.classList.add('noshow');
  // subNav.setAttribute('aria-label', link.innerText + " submenu");
  // subNav.setAttribute('tabindex', '-1');
}

function setupNavLink(navLink) {
  navLink.addEventListener('click', subNavClickEventHandler);
  navLink.parentNode.addEventListener('keydown', subNavKeydownHandler);
}

function setupNavToggle(navToggle, navWrapper) {
  navToggle.setAttribute('aria-expanded', "false");
  navWrapper.classList.add('noshow');

  if(window.screen.width < 768) {
    
  }
  
  navToggle.addEventListener('click', navToggleClickEventHandler);
  navToggle.addEventListener('keydown', navToggleKeydownHandler);
}

// Do Main Magic...
const header = document.querySelector('.a11y-nav');
header.classList.add('has-js-loaded');
const mainNav = document.querySelector('.left-nav');
const navWrapper = document.querySelector('.left-nav-wrapper');

let subNavItems = [
  ...document.querySelectorAll('.menu-item-has-children')
];
subNavItems.forEach(subNavItem => setupSubNavItem(subNavItem));

let navLinks = [
  ...document.querySelectorAll('.left-nav > ul > li > a')
];
navLinks.forEach(navLink => setupNavLink(navLink));

const navToggle = document.querySelector('.left-nav-toggle');
setupNavToggle(navToggle, navWrapper);

// ********************
// Right side nav 
// ********************

const rightNavHasSubnav = document.querySelector('.right-nav-has-subnav');
const rightNavDropdownTrigger = document.querySelector('.right-nav-dropdown-trigger');
const rightNavMenuDropdown = document.querySelector('.menu-dropdown');

rightNavDropdownTrigger.setAttribute('aria-expanded', "false");
rightNavMenuDropdown.setAttribute('aria-hidden', 'true');

function ariaExpandedTrue() {
  rightNavDropdownTrigger.setAttribute('aria-expanded', "true");
  rightNavMenuDropdown.setAttribute('aria-hidden', 'false');
}

function ariaExpandedFalse() {
  rightNavDropdownTrigger.setAttribute('aria-expanded', "false");
  rightNavMenuDropdown.setAttribute('aria-hidden', 'true');
}

rightNavHasSubnav.addEventListener("mouseenter", ariaExpandedTrue, true);
rightNavHasSubnav.addEventListener("mouseleave", ariaExpandedFalse, true);
rightNavHasSubnav.addEventListener("focus", ariaExpandedTrue, true);
rightNavHasSubnav.addEventListener("blur", ariaExpandedFalse, true);