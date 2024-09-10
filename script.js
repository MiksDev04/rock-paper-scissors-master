
// ==========  ANIMATION ==========
// ================================

// define elements
const weapons = document.querySelectorAll('.game-board .weapons');
const notSelectedDisappear = document.querySelectorAll('.game-board > *');
const computer = document.querySelector('.house-picked');
const winnerAnnounceSection = document.querySelector('.winner-announce-section');
const scoreDisplay = document.querySelector('.score');

// declare and initialize variables
const weaponIcons = [
    ['scissor', './images/icon-scissors.svg'],
    ['paper', './images/icon-paper.svg'],
    ['rock', './images/icon-rock.svg'],
    ['lizard', './images/icon-lizard.svg'],
    ['spock', './images/icon-spock.svg'],
]
let score = 0;


window.onload = chooseWeapon();
    

// choose weapon
function chooseWeapon() {

    scoreDisplay.textContent = JSON.parse(sessionStorage.getItem('SCORE')) || 0;
    weapons.forEach((weapon) => {
        weapon.addEventListener('click', battle)
    })
}

// battle
function battle(weapon) {
    weapons.forEach((weapon) => {
        weapon.removeEventListener('click', battle)
    })
   
    computer.style.overflow = 'hidden';
    let index = Array.from(weapons).indexOf(weapon.currentTarget)
    

    // remove unpick weapons
    notSelectedDisappear.forEach(not => {
        not.style.display = 'none';
    })
    console.log(weapon.currentTarget.classList)
    // element slide
    weapon.currentTarget.classList.add('picked')
    weapon.currentTarget.style.display = 'block';

    if (window.innerWidth > 800) {
        computer.style.right = '-40px';
        document.querySelector('.picked').style.left = '-40px';
    }
    
    // computer show up
    computer.style.display = 'block';
    
    // randomly pick weapon for computer
    let randomWeapon = Math.floor(Math.random() * 5);
    console.log("Player " + index + ", Computer " + randomWeapon);
    
    setTimeout(() => {

        computer.classList.add('computer');
        computer.style.overflow = 'visible';
        computer.querySelector('.inside > img').src = weaponIcons[randomWeapon][1];
        computer.classList.add(weaponIcons[randomWeapon][0])
        // check winner
        let youWin = checkWinner(index, randomWeapon);

        // announce winner
        announceWinner(youWin);
        console.log(youWin, computer.className)
    }, 5000);

}

// chech the winner
function checkWinner(playerWeapon, computerWeapon) {

    switch(playerWeapon) {

        // if player use scissor
        case 0:
            if (computerWeapon === 1 || computerWeapon === 3) {
                score++;
                return true;
            } else if (computerWeapon === 0) {
                score = score;
                return 'tie';
            } else {
                score--;
                return false;
            }
            break;

        // if player use scissor
        case 1:
            if (computerWeapon === 2 || computerWeapon === 4) {
                score++;
                return true;
            } else if (computerWeapon === 1) {
                score = score;
                return 'tie';
            } else {
                score--;
                return false;
            }
            break;
        
        // if player use scissor
        case 2:
            if (computerWeapon === 3 || computerWeapon === 0) {
                score++;
                return true;
            } else if (computerWeapon === 2) {
                score = score;
                return 'tie';
            } else {
                score--;
                return false;
            }
            break;
            
        // if player use scissor
        case 3:
            if (computerWeapon === 4 || computerWeapon === 1) {
                score++;
                return true;
            } else if (computerWeapon === 3) {
                score = score;
                return 'tie';
            } else {
                score--;
                return false;
            }
            break;

        // if player use scissor
        case 4:
            if (computerWeapon === 0 || computerWeapon === 2) {
                score++;
                return true;
            } else if (computerWeapon === 4) {
                score = score;
                return 'tie';
            } else {
                score--;
                return false;
            }
            break;
    }
}

// announce winner
function announceWinner(winner) {
    const playerPick = document.querySelector('.picked');
    const messageAnnounce = document.querySelector('.winner-announce-section .declared-winner');
    const playAgain = document.querySelector('.play-again');
   
    
    // player won
    if (winner === true) {
        playerPick.classList.add('winner');
        messageAnnounce.textContent = 'YOU WIN';
        
        // computer won
    } else if (winner === false) {
        computer.classList.add('winner');
        messageAnnounce.textContent = 'YOU LOSE';
        
        // tie game
    } else {
        messageAnnounce.textContent = 'TIE';
    }

   setTimeout(() => {
        // announce message show up
        winnerAnnounceSection.style.display = 'grid'
        scoreDisplay.textContent = score;
        sessionStorage.setItem("SCORE", JSON.stringify(score));
        if (window.innerWidth > 800) {
            // weapon adjust after announce
            computer.style.right = '-120px';
            playerPick.style.left = '-120px';

        }
   }, 4000)
    playAgain.addEventListener( 'click', function() {
        
        // weapon adjust after click the play again button
       if (window.innerWidth > 800) {
            computer.style.right = 'unset';
            playerPick.style.left = 'unset';
       }

        winnerAnnounceSection.style.display = 'none'
        notSelectedDisappear.forEach(not => {
            not.style.display = 'block';
            not.style.animation = '';
            not.classList.remove('winner');
            not.classList.remove('computer');
            not.classList.remove('picked');
        })
        document.querySelectorAll('.game-board *').forEach( each => {
            each.style.animation = '';
        }) 
        computer.style.display = 'none';
        computer.className = 'house-picked';

        // back to game again
        chooseWeapon();
    })
}