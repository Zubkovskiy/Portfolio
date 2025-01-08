// togle icon navbar
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

menuIcon.addEventListener('click', () => {
  menuIcon.classList.toggle('bx-x');
  navbar.classList.toggle('active');
})

// scroll section
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
  sections.forEach(sec => {
    const top = window.scrollY;
    const offset = sec.offsetTop - 100;
    const height = sec.offsetHeight;
    const id = sec.getAttribute('id');

    if (top >= offset && top < offset + height) {
      // active navbar links
      navLinks.forEach((link) => {
        link.classList.remove('active');
        document.querySelector(`header nav a[href*=${id}]`).classList.add('active');
      });
    }
  })

  // sticky header
  const header = document.querySelector('header');

  header.classList.toggle('sticky', window.scrollY > 100);

  // remove toggle icon and navbar when click navbar links (scroll)
  menuIcon.classList.remove('bx-x');
  navbar.classList.remove('active');
}

function toggleText() {
  var button = document.getElementById('toggleButton');
  var hiddenText = document.getElementById('hiddenText');

  if (button.innerText === 'Read More') {
    button.innerText = 'Hide';
    hiddenText.classList.remove('hidden');
    hiddenText.classList.add('visible');
  } else {
    button.innerText = 'Read More';
    hiddenText.classList.remove('visible');
    hiddenText.classList.add('hidden');
  }
}

// email
document.getElementById('contact-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  
  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/send_email.php', true);
  xhr.onload = function() {
    if (xhr.status === 200) {
      document.getElementById('submit').textContent = "Done!";
      setTimeout(() => {
        document.getElementById('submit').textContent = "Submit";
      }, 3000);
      form.reset();
    } else {
      document.getElementById('result-message').textContent = 'fail';
    }
  };
  
  xhr.send(formData);
}); 