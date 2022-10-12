export function hamburgerMenu() {
  const hamburger = document.querySelector('#hamburger');
  const navLinks = document.querySelector('#hamburgerNavLinks');
  const links = document.querySelectorAll('#hamburgerNavLinks li');
    console.log('here');
  hamburger.addEventListener('click', () => {
    //Animate Links
    navLinks.classList.toggle('open');
    links.forEach((link) => {
      link.classList.toggle('fade');
    });

    //Hamburger Animation
    hamburger.classList.toggle('toggle');
  });
}
