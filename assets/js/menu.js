// hamburger menu for mobile version
const btnHamburger = document.getElementById('hamburger');
btnHamburger.addEventListener("click", showHideMenu);

function showHideMenu()
{
  const navMenu = document.getElementById("mobile_navigation");
  navMenu.classList.toggle("hidden");
}

