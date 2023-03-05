// functionality 1: create a slider that produces images of the same size
// functionality 2: make every image clickable and make their corresponding song play
//functionality 3: make the song stop when the next image is clicked
//functionality 4: make the song stop when the previous image is clicked
//functionality 5: make the song stop when the next image is clicked and the next song starts playing
//functionality 6: make the song stop when the pause button is clicked and resume when the play button is clicked
//functionality 7: Prev and next song functionality 
//functionality 8: Set Bg on load
//functionality 9: Add and maintain seekbar
//functionality 10: Add and maintain volume bar
//functionality 11: Stop songs when spacebar press


let seekBar=document.querySelector("#seekBar");
//functionality 8: Set Bg on load
async function setbg(){
        let res;
            res = await fetch("https://api.unsplash.com/photos/random?query=nature&&orientation=landscape&&client_id=FLuFbodIvYwjqO7o0QLiUnP--AsUH_FGyhEMuC_04Bg")
        if(res.statusCode==200) {
            res=await res.json()
            let body= document.body;
            body.style.backgroundImage=`${url(res.urls.full)}`;
            console.log("bg set");
            
        }
        else{
        let img = new Image()
            document.body.style.backgroundImage = "url('https://api.api-ninjas.com/v1/randomimage?category=nature&&X-Api-Key=uESwJXgZw6vRiWYy2E+QEg==8kcm4Bz0TkUAoJWT)";
        }
        console.log(res);
    


}
// setbg();

//dynamic slider
//functionality 1: create a slider that produces images of the same size
let bhaktiS = [
    { "img": "https://github.com/Ruchika-Sehgal/SongsTest/images/bhakti/ganesha.jpeg", "song": "songs/Bhakti/DevaShreeGanesha.mp3" },
    { "img": "https://github.com/Ruchika-Sehgal/SongsTest/images/bhakti/RamNaMilenge.jpeg", "song": "songs/Bhakti/RamNaMilenge.mp3" },
    { "img": "https://github.com/Ruchika-Sehgal/SongsTest/images/bhakti/mangal_bhavan.jpg", "song": "songs/Bhakti/mangalBhawan.mp3" },
    { "img": "https://github.com/Ruchika-Sehgal/SongsTest/images/bhakti/Sai.jpeg", "song": "songs/Bhakti/Sai.mp3" },
    { "img": "https://github.com/Ruchika-Sehgal/SongsTest/images/bhakti/shriKrishna.jpeg", "song": "songs/Bhakti/ShriKrishnaGovindHareMurari.mp3" },
]
let currentIndex = 4;
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
        let playButton = document.querySelector("#Play");
        seekbar.style.display="flex";
        updateSeekbar();
    playButton.classList.remove("fa-play");
    playButton.classList.add("fa-pause");
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
        playButton.classList.remove("fa-pause");
        playButton.classList.add("fa-play");
        playing=false;
    }
    else{
        audio.currentTime=currTime;
        audio.play();
        playButton.classList.remove("fa-play");
        playButton.classList.add("fa-pause");
        playing=true;
    }
}
playButton.addEventListener("click", switchPlay);


//functionality 11: Stop songs when spacebar press
document.body.addEventListener("keypress", function(e){
    if(e.key==" "){
        switchPlay();
    }
});

//functoinality 9: Add and maintain seekbar
function updateSeekbar(){
setInterval(function(){
    if(!audio.ended){
        seekbar.value=(audio.currentTime/audio.duration)*100;
    }
    else{
        seekbar.value=0;
        audio.play();
        updateSeekbar();
    }
},1);
}

//functionality 10: Add and maintain volume bar
let volumeBar = document.querySelector("#volBar");
let volumeButton=document.querySelector("#vol");
volumeButton.addEventListener("click", function(){
    if (volumeBar.style.display =="none"){

        volumeBar.style.display="flex";
        volumeButton.style.margin="0.5rem";
    }
    else{

        volumeBar.style.display = "none";
        volumeButton.style.margin="0.5rem 10rem 0.5rem 0.5rem";
    }

});
    
volumeBar.addEventListener("change", function(){
    audio.volume=volumeBar.value/100;
});


//functionality 7: Prev and next song functionality 
let prev = document.querySelector("#PrevSong");
prev.addEventListener("click", function(){
    audio.pause();
    audio.currentTime=audio.currentTime-5;
audio.play();});
let next = document.querySelector("#NextSong");
next.addEventListener("click", function(){
    audio.pause();
    audio.currentTime=audio.currentTime+5;
audio.play();});
