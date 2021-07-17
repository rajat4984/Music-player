const heart = document.querySelector(".heart");
const cover = document.querySelector("#cover");
const songName = document.querySelector(".song-name");
const audio = document.querySelector("#audio");
const next = document.querySelector("#next-btn");
const prev = document.querySelector("#prev-btn");
const play = document.querySelector("#play-btn");
const playText = document.querySelector("#play-text");
const playNow = document.querySelector(".playing-now");
const progressContainer = document.querySelector(".progress");
const progress = document.querySelector(".p-line");
const arrowDown = document.querySelector('#down-arrow');


const songs = ["Attack on titan", "Demonslayer", "Onepunchman", "sk8"];

let songIndex = 0; 
loadSong(songs[songIndex]);


function loadSong(song) {
  songName.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}

//changes color of heart
function heartColor() {
  heart.classList.toggle("pink");
}

function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);
  playSong();
}


function playSong() {
  playText.innerHTML = "Playing now";
  playNow.classList.add(".play-check");
  playText.style.transition = "ease-in 1s";
  play.classList.remove("fa-play");
  play.classList.add("fa-pause");
  audio.play();
}

function stopSong() {
  playText.innerHTML = "Paused now";
  playNow.classList.remove(".play-check");
  play.classList.add("fa-play");
  play.classList.remove("fa-pause");
  audio.pause();
}
function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);
  playSong();
}

function progressUpdate(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
  const width = this.clientWidth; //returns width of progress bar
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

//FUNCTION TO MAKE LIST ITEMS
function makeUl(array){
  //creating list element
  var list = document.createElement('ul');

  for(var i=0;i<array.length;i++){
    //creat list item
    var item = document.createElement('li');

    //sets its contents:
    item.appendChild(document.createTextNode(array[i]));

    //Add it to list
    list.appendChild(item);

  }

 
  return list;
}
document.getElementById("song-list").appendChild(makeUl(songs));



//play and pause on clicking space bar
document.onkeypress = function (event) {
  switch (
    event.keyCode //return what we click
  ) {
    case 32: //code for space bar
      var isPlaying = playNow.classList.contains(".play-check");
      if (isPlaying) {
        stopSong();
      } else {
        playSong();
      }
      break;

    case 110:
      nextSong();
      break;

      case 112:
        prevSong();
        break;
  
  }

};

//EVENT LISTENERS

next.addEventListener("click", nextSong);
prev.addEventListener("click", prevSong);
play.addEventListener("click", () => {
  const isPlaying = playNow.classList.contains(".play-check");
  if (isPlaying) {
    stopSong();
  } else {
    playSong();
  }
});

audio.addEventListener("ended", nextSong);
audio.addEventListener("timeupdate", progressUpdate);
progressContainer.addEventListener("click", setProgress);
