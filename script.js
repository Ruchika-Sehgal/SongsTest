// functionality 1: create a slider that produces images of the same size
// functionality 2: make every image clickable and make their corresponding song play
//functionality 3: make the song stop when the next image is clicked
//functionality 4: make the song stop when the previous image is clicked
//functionality 5: make the song stop when the next image is clicked and the next song starts playing
//functionality 6: make the song stop when the pause button is clicked and resume when the play button is clicked
//functionality 7: Prev and next song functionality 


//dynamic slider
let bhaktiS = [
    { "img": "./images/bhakti/ganesha.jpeg", "song": "./songs/bhakti/DevaShreeGanesha.mp3" },
    { "img": "./images/bhakti/RamNaMilenge.jpeg", "song": "./songs/bhakti/RamNaMilenge.mp3" },
    { "img": "./images/bhakti/mangal_bhavan.jpg", "song": "./songs/bhakti/mangalBhawan.mp3" },
    { "img": "./images/bhakti/Sai.jpeg", "song": "./songs/bhakti/Sai.mp3" },
    { "img": "./images/bhakti/shriKrishna.jpeg", "song": "./songs/bhakti/ShriKrishnaGovindHareMurari.mp3" },
]
let currentIndex = 3;
let songs = document.getElementsByClassName("songs")[0];
let RightArrow = document.querySelector(".arrow");
RightArrow.addEventListener("click", createNextElement);
let songLoc="";
function createNextElement() {
    currentIndex++;
    if (currentIndex > bhaktiS.length - 1) {
        currentIndex = 0;
    }
    let thisIndex=currentIndex;
    let nextElement = document.createElement("div");
    let nextImage = document.createElement("img");
    nextImage.src = bhaktiS[currentIndex].img;
    nextElement.appendChild(nextImage);
    nextElement.classList.add("sC");
    nextElement.addEventListener("click", ()=>{songLoc=bhaktiS[thisIndex].song;
        playThis();});
        songs.appendChild(nextElement);
        songs.removeChild(songs.firstElementChild);
        songs.scroll({
            left:400*currentIndex,
            behavior:"smooth"
        })
        console.log("next element created");
    }
    
    
    //functionality 2: make every image clickable (done above) and make their corresponding song play
    let currTime=0;
let playing=false;
let audio=new Audio();
function playThis(){
    console.log("trying to play " + songLoc);
    audio.pause();
    audio.src=songLoc;
    audio.play(songLoc);
    setInterval(function(){
        currTime=audio.currentTime;
        console.log("Audio timestamp is " + audio.currentTime);}
        ,1000);
    playing=true;
}

//functionality 3: make the song stop when the next image is clicked (performed above)
//functionality 4: make the song stop when the previous image is clicked (performed above)
//functionality 5: make the song stop when the next image is clicked and the next song starts playing (performed above)

//functionality 6: make the song stop when the pause button is clicked and resume when the play button is clicked
let playButton=document.querySelector("#Play");
function switchPlay(){
    if(playing){
        // currTime=playButton.currentTime;
        console.log("current time is " + currTime);
        audio.pause();
        playing=false;
    }
    else{
        audio.currentTime=currTime;
        audio.play();
        playing=true;
    }
}
playButton.addEventListener("click", switchPlay);
