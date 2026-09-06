function initMobileMenu() {
  const mobileMenuButton = document.querySelector('#menu-button')
  const mobileMenu = document.querySelector('#mobile-menu')

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
      const isOpen = !mobileMenu.classList.contains('hidden')

      mobileMenu.classList.toggle('hidden')
      mobileMenuButton.setAttribute('aria-expanded', String(!isOpen))
    })
  }
}

export { initMobileMenu }