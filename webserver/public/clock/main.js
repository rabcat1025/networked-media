window.onload = () => {
  setInterval(currenttime, 1000);
};

function currenttime() {
  // let h = 7; //for testing
  // let m = 3 //for testing

  //Create Date Variables
  const date = new Date();
  let h = date.getHours(); // 0 - 23 == 0-11; 12-23
  let m = date.getMinutes(); // 0 - 59
  let s = date.getSeconds(); // 0 - 59

  //Create id variables
  let positiontime = document.getElementById("clock");
  let positionhour = document.getElementById("moveContainer");
  let indicator = document.getElementById("indicator");
  let showtime = document.getElementById("hovertime");

  //Set Hour 
  //Change style for PM = black ; AM = white
  if (h > 11) {
    h = h - 12;
    document.body.style.backgroundColor = "black ";
    positionhour.style.backgroundColor = "black";
    positionhour.style.border = "solid white";
    positionhour.style.color = "white";
    indicator.textContent = "⚪️";
  } else {
    indicator.textContent = "⚫️";
    positionhour.style.border = "solid black";
  }

  //Change hours   
  if ([2, 6, 10].includes(h)) {
    positionhour.style.left = 25 + "%";
  } else if ([3, 7, 11].includes(h)) {
    positionhour.style.left = 50 + "%";
  } else if ([4, 8, 12].includes(h)) {
    positionhour.style.left = 75 + "%";
  } else {
    positionhour.style.left = 0;
  }

  if ([1, 2, 3, 4].includes(h)) {
    positionhour.style.top = 0;
  } else if ([5, 6, 7, 8].includes(h)) {
    positionhour.style.top = 100 / 3 + "%";
  } else if ([9, 10, 11, 12].includes(h)) {
    positionhour.style.top = 200 / 3 + "%";
  }

  //Set minutes + seconds
  let hourheight = positionhour.clientHeight;
  let clockheight = positiontime.clientHeight;
  let clockheightperct = (clockheight / hourheight) * 100;

  let hourwidth = positionhour.clientWidth;
  let clockwidth = positiontime.clientWidth;
  let clockwidthperct = (clockwidth / hourwidth) * 100;

  positiontime.style.bottom = s * ((100 - clockheightperct) / 59) + "%";
  positiontime.style.left = m * ((100 - clockwidthperct) / 59) + "%";

  //add tick sound
  let audio = new Audio("clock.mp3");
  audio.play();

  // Time text shown when hover
  let h2 = date.getHours();
  let m2 = m;
  let s2 = s;
  h2 = h2 < 10 ? "0" + h2 : h2;
  m2 = m < 10 ? "0" + m2 : m2;
  s2 = s < 10 ? "0" + s2 : s2;
  showtime.textContent = h2 + ":" + m2 + ":" + s2;

  //mouse hover event
  // let showtime = document.getElementById("hovertime");
  // positiontime.addEventListener('mouseenter', (e) => {
  //     showtime.style.visibility = "visible";
  //     // positiontime.style.backgroundColor = "yellow"
  // }, false);

  // positiontime.addEventListener('mouseleave', (e) => {
  //     showtime.style.visibility = "hidden";
  //     // positiontime.style.backgroundColor = "white"
  // }, false);
}
