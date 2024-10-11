//Play sound when a key is pressed (keyboard or mouse click)
function playSound(e) {
    let keyCode;

    //Handle both keydown and click events
    if (e.type === 'keydown') {
        keyCode = e.keyCode // If keyboard event, use keycode
    } else if (e.type === 'click') {
        keyCode = e.target.closest('.key').getAttribute('data-key'); // If click event, use the data-key attribute
    }

    const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
    const key = document.querySelector(`.key[data-key="${keyCode}"]`);

    if (!audio) {
        console.log(`No audio sound file for this key: ${keyCode}`);
        return; //Stop the function if no audio
    }
    
    
    audio.currentTime = 0; //Rewind to start for rapid play
    audio.play();

    //Check if the key element exists  before adding class
    if (key) {
        key.classList.add('playing');
        document.body.classList.add('flash');

        //Remove the flash effect after a short time
        setTimeout(() => {
            document.body.classList.remove('flash');
        }, 100);
    }
}

//Remove the 'playing' class after animation
function removeTransition(e) {
    if (e.propertyName !== 'transform') return; //Skip if it is not transform
    this.classList.remove('playing');
}

//Remove the 'playing' class when the key is released
function handleKeyRelease(e) {
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
    if (key) {
        key.classList.remove('playing');
    }
}

//Add event listener for both keydown and mouse clicks
const keys = document.querySelectorAll('.key');
keys.forEach(key => {
    key.addEventListener('transitionend', removeTransition);
    key.addEventListener('click', playSound); //Add click listener for mouse
});


window.addEventListener('keydown', playSound);
window.addEventListener('keyup', handleKeyRelease);