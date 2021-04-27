const routes = {
   '/': home,
   '/home': home,
   '': home,
   '/index.html': home,
   '/animals': animals,
   '/berries': berries,
   '/vegetables': vegetables,
   '/sports': sports,
   '/fruits': fruits,
   '/human': human,
   '/clothes': clothes,
   '/emotions': emotions,
};


const categoryWords = {
   '/animals': ['bird', 'cat', 'dog', 'fish', 'horse', 'lion', 'rabbit', 'turtle'],
   '/berries': ['blackberry', 'strawberry', 'cherry', 'gooseberry', 'grape', 'raspberry', 'sea-buckthorn', 'blueberry'],
   '/vegetables': ['beet', 'broccoli', 'carrot', 'corn', 'cucumber', 'pepper', 'potato', 'tomato'],
   '/sports': ['basketball', 'bicycling', 'boxing', 'football', 'hockey', 'karate', 'swimming', 'tennis'],
   '/fruits': ['banana', 'garnet', 'kiwi', 'lemon', 'mango', 'orange', 'peach', 'tangerine'],
   '/human': ['ear', 'eye', 'finger', 'lip', 'neck', 'nose', 'teeth', 'tongue'],
   '/clothes': ['blouse', 'boot', 'coat', 'dress', 'pants', 'shirt', 'shoe', 'skirt'],
   '/emotions': ['angry', 'cry', 'happy', 'laugh', 'sad', 'scared', 'smile', 'tired'],
};

const properties = {
   play: false,
   lesson: false,
}

const createIconHTML = (src) => {
   return `<img src="${src}">`;
};


function makeRandomArray(a, b) {
   return Math.random() - 0.5;
};


const body = document.querySelector('body'),
   burger = document.querySelector('.header__burger'),
   nav = document.querySelector('.header-menu'),
   container = document.querySelector('.container'),
   cardsList = [...document.querySelectorAll('.card')],
   changer = document.querySelector(".switch"),
   navItems = [...document.querySelectorAll(".header-item")],
   categoryImages = document.querySelectorAll(".front"),
   buttonStartGame = document.querySelector('.button-start-game'),
   overlay = document.querySelector('.overlay'),
   playMenu = document.querySelector('.play-menu-stars');


container.innerHTML = routes[window.location.pathname];


let mistakes = 0;
let counterWord = 0;
let WordsPlay = [];
const CardsQuantity = 8;

function move(loc) {
   if (loc !== '' && loc !== '/index.html' && loc !== '/home' && loc !== '/statistics') {
      for (let i = 0; i < cardsList.length; i++) {
         const soundButtons = [...document.querySelectorAll('.button-sound')];
         const rotateButtons = [...document.querySelectorAll('.button-rotate')];
         const backs = [...document.querySelectorAll('.back')];
         const fronts = [...document.querySelectorAll('.front')];
         const soundButton = soundButtons[i];
         const rotateButton = rotateButtons[i];
         const back = backs[i];
         const front = fronts[i];
         soundButton.addEventListener('click', () => {
            const WordsPlay = [...categoryWords[window.location.pathname]];
            playWord(window.location.pathname, WordsPlay[i])
         });
         rotateButton.addEventListener('click', () => {
            front.classList.add('rotate-small');
            back.classList.add('rotate-big');
         });
         back.addEventListener('mouseout', () => {
            front.classList.remove('rotate-small');
            back.classList.remove('rotate-big');
         });
      }
   }
}


const onNavigate = (pathname) => {
   overlay.classList.remove('active');
   window.history.pushState({},
      pathname,
      window.location.origin + pathname
   )
   container.innerHTML = routes[window.location.pathname];
   move(window.location.pathname);
   changer.checked = false;
   buttonStartGame.classList.remove('play', 'start');
   buttonStartGame.innerHTML = 'Start Game';
   playMenu.innerHTML = '';
   mistakes = 0;
   counterWord = 0;
   WordsPlay.length = 0;
   navItems.forEach((navItem) => {
      if (`/${navItem.children[1].innerHTML.toLowerCase()}` === window.location.pathname) {
         navItem.style.background = 'rgba(19, 34, 100, 0.5)';
      } else {
         navItem.style.background = '';
      }
   })
   if (window.location.pathname !== '/index.html' && window.location.pathname !== '' && window.location.pathname !== '/home' && window.location.pathname !== '/statistics') {
      const cardsList = [...document.querySelectorAll('.card')];

      buttonStartGame.classList.remove('play', 'start');
      buttonStartGame.innerHTML = 'Start Game';
      playMenu.innerHTML = '';
      cardsList.forEach(card => card.classList.remove('bad'));
      cardsList.forEach(card => card.children[0].children[0].classList.remove('play'));
      cardsList.forEach(card => card.children[0].children[0].style.cursor = 'auto');
   }
}


window.onpopstate = () => {
   container.innerHTML = routes[window.location.pathname]
}


function playWord(folder, word) {
   if (folder && word) {
      const audio = new Audio();
      audio.src = `/assets/audio${folder}/${word}.mp3`;
      audio.currentTime = 0;
      audio.play();
   }
   return word;
}


function playSound(song) {
   const audio = new Audio();
   audio.src = `/assets/audio/${song}.mp3`;
   audio.currentTime = 0;
   audio.play();
}


overlay.addEventListener('click', () => {
   burger.classList.toggle('active');
   nav.classList.toggle('active');
   body.classList.toggle('lock');
   overlay.classList.toggle('active');
});


burger.addEventListener('click', () => {
   body.classList.toggle('lock');
   burger.classList.toggle('active');
   nav.classList.toggle('active');
   overlay.classList.toggle('active');
});


for (let i = 0; i < navItems.length; i++) {
   const navItem = navItems[i];
   const navLink = navItem.children[1].innerHTML.toLowerCase();
   navItem.addEventListener('click', () => {
      onNavigate(`/${navLink}`);
      body.classList.toggle('lock');
      burger.classList.toggle('active');
      nav.classList.toggle('active');
   });
};


changer.addEventListener('click', function () {

   const cardsList = [...document.querySelectorAll('.card')];

   properties.play = false;

   function change(loc) {
      if (loc === '/index.html' || loc === '' || loc === '/home' || loc === '/statistics') {
         changer.checked ? cardsList.forEach(card => card.classList.add('play')) :
            cardsList.forEach(card => card.classList.remove('play'));
      } else {
         if (changer.checked) {
            cardsList.forEach(card => card.children[0].classList.remove('rotate-small'));
            cardsList.forEach(card => card.children[1].classList.remove('rotate-big'));
            cardsList.forEach(card => card.children[0].children[0].classList.add('play'));
            buttonStartGame.classList.add('start');
            WordsPlay = [...categoryWords[window.location.pathname]];
            WordsPlay.sort(makeRandomArray);
            startGame(window.location.pathname, WordsPlay)
            playGame(window.location.pathname, WordsPlay)
         } else {
            buttonStartGame.classList.remove('play', 'start');
            buttonStartGame.innerHTML = 'Start Game';
            playMenu.innerHTML = '';
            counterWord = 0;
            mistakes = 0;
            cardsList.forEach(card => card.classList.remove('bad'));
            cardsList.forEach(card => card.children[0].children[0].classList.remove('play'));
            cardsList.forEach(card => card.children[0].children[0].style.cursor = 'auto');
            WordsPlay.length = 0;
         }
      }
   }
   change(window.location.pathname)
});

function startGame(loc, array) {
   const fronts = [...document.querySelectorAll('.front')];

   buttonStartGame.addEventListener('click', () => {

      properties.play = true
      buttonStartGame.innerHTML = createIconHTML('/assets/icons/replay.png');
      buttonStartGame.classList.add('play');
      if (counterWord < CardsQuantity && array) playWord(loc, array[counterWord]);
      fronts.forEach(front => front.children[0].style.cursor = 'pointer');
   });
}

function playGame(loc, array) {
   const cardsList = [...document.querySelectorAll('.card')];
   for (let i = 0; i < cardsList.length; i++) {
      const card = cardsList[i];
      const image = card.children[0].children[0];
      const caption = card.children[0].children[1].children[1].innerHTML;

      image.addEventListener('click', () => {
         if (properties.play && array && playWord(loc, array[counterWord])) {
            if (caption === array[counterWord]) {

               counterWord += 1;
               playSound('correctly');
               setTimeout(function () {
                  if (counterWord < CardsQuantity) playWord(loc, array[counterWord]);
               }, 1500);
               playMenu.innerHTML += createIconHTML('/assets/icons/star-win.png');
               card.classList.add('bad');

               if (counterWord === CardsQuantity) {
                  changer.checked = false;
                  buttonStartGame.classList.remove('play', 'start');
                  buttonStartGame.innerHTML = 'Start Game';
                  playMenu.innerHTML = '';
                  cardsList.forEach(card => card.classList.remove('bad'));
                  cardsList.forEach(card => card.children[0].children[0].classList.remove('play'));
                  cardsList.forEach(card => card.children[0].children[0].style.cursor = 'auto');
                  setTimeout(function () {
                     onNavigate('/index.html');
                  }, 8000);
                  counterWord = 0;
                  WordsPlay.length = 0;
                  if (mistakes === 0) {

                     setTimeout(function () {
                        container.innerHTML = `
               <div class="end-game">
               <div class="yakubovich">
                  <img src="/assets/img/yakubovich.jpg" class="end-game-image">
                  <span class="end-game-caption">WIN!</span>
                  <span class="end-game-caption">Good job!</span>
                  </div>
                  </div> 
               `;
                     }, 1000)
                     setTimeout(function () {
                        playSound('win-song')
                     }, 1000);

                  } else {

                     setTimeout(function () {
                        container.innerHTML = `
               <div class="end-game">
               <div class="yakubovich">
                  <img src="/assets/img/yakubovich-rasstroen.jpg" class="end-game-image">
                  <span class="end-game-caption">Defeat!</span>
                  <span class="end-game-caption">Errors: ${mistakes}</span>
                  </div>
                  </div> 
               `;
                     }, 1000);

                     setTimeout(function () {
                        playSound('defeat-song')
                     }, 1000);
                  }
               }
            } else {
               playMenu.innerHTML += createIconHTML('/assets/icons/star.png');
               playSound('incorrectly');
               mistakes += 1;
            }
         }
      })
   }
}