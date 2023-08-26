const html = document.querySelector('.html-code');
const css = document.querySelector('.css-code');
const js = document.querySelector('.js-code');
const result = document.querySelector('#result');
const htmlCodeEl = document.querySelector("[data-html]");
const cssCodeEl = document.querySelector("[data-css]");
const jsCodeEl = document.querySelector("[data-js]");

function run() {
  // Storing data in cookies
  document.cookie = `html=${encodeURIComponent(html.value)}`;
  document.cookie = `css=${encodeURIComponent(css.value)}`;
  document.cookie = `js=${encodeURIComponent(js.value)}`;

  // Executing HTML, CSS & JS code
  result.contentDocument.body.innerHTML = `<style>${decodeURIComponent(getCookie('css'))}</style>` + decodeURIComponent(getCookie('html'));
  result.contentWindow.eval(decodeURIComponent(getCookie('js')));
}

// Checking if the user is typing anything in the input field
html.onkeyup = () => run();
css.onkeyup = () => run();
js.onkeyup = () => run();

// Accessing data stored in cookies
html.value = decodeURIComponent(getCookie('html'));
css.value = decodeURIComponent(getCookie('css'));
js.value = decodeURIComponent(getCookie('js'));

// Helper function to retrieve a specific cookie value
function getCookie(name) {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(`${name}=`)) {
      return cookie.substring(name.length + 1);
    }
  }
  return '';
}
