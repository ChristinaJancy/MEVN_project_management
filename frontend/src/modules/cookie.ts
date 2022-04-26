//https://www.w3schools.com/js/js_cookies.asp

function setCookie(cname: string, cvalue: any, exdays: number) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname: string) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

//set type of user 
function checkCookie() {
  let user = getCookie("user");
  if (user != "") {
    alert("Welcome again " + user);
  } else {
    user = prompt("Please enter your name:", "");
    if (user != "" && user != null) {
      setCookie("user", user, 365);
    }
  }
}
function deleteCookie(cname: string) {
  document.cookie = cname + '=' + '; ' + 'expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
}

export { setCookie, getCookie, checkCookie, deleteCookie }


