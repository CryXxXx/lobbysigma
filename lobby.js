
const Back = document.querySelector('#go-back')

Back.addEventListener('click', () => {
    window.history.back();
  });


const MoneyCircle = document.querySelector('.change');
const moneyCircleElement = document.querySelector('.money-circle');
const translateXValue = MoneyCircle.offsetWidth - moneyCircleElement.offsetWidth - 6;
let isMovingRight = true;
const balance = 500; // Объявляем переменную balance
const profitElement = document.getElementById('profit'); // Получаем доступ к элементу с числом
const textElement = document.querySelector('.gray-text'); // Получаем доступ к элементу с текстом
const Percent = document.querySelector('.percent');
let infoChanged = false; // Флаг, указывающий, была ли информация изменена
  
MoneyCircle.addEventListener('click', () => {
    infoChanged = false; // Сбрасываем флаг при каждом нажатии кнопки
    if (isMovingRight) {
      anime({
        targets: '.money-circle',
        translateX: `${translateXValue}px`,
        duration: 500,
        easing: 'easeInOutExpo',
        update: (anim) => {
          const progress = anim.currentTime;
          if (progress < 250) {
            profitElement.style.opacity = 1 - (progress / 250);
            textElement.style.opacity = 1 - (progress / 250);
            Percent.style.opacity = 1 - (progress / 250);
          } else {
            if (!infoChanged) {
              profitElement.textContent = balance;
              textElement.textContent = 'Current balance';
              infoChanged = true; // Устанавливаем флаг, чтобы не менять информацию снова
            }
            profitElement.style.opacity = (progress - 250) / 250;
            textElement.style.opacity = (progress - 250) / 250;
            Percent.style.opacity = 0;
            document.getElementById('lob-icon').style.display = 'none';
            document.getElementById('wal-icon').style.display = 'block';
          }
        },
        complete: () => {
          isMovingRight = false;
        }
      });
    } else {
      anime({
        targets: '.money-circle',
        translateX: '0',
        duration: 500,
        easing: 'easeInOutExpo',
        update: (anim) => {
          const progress = anim.currentTime;
          if (progress < 250) {
            profitElement.style.opacity = 1 - (progress / 250);
            textElement.style.opacity = 1 - (progress / 250);
            Percent.style.opacity = 0;
          } else {
            if (!infoChanged) {
              profitElement.textContent = 105;
              textElement.textContent = 'Investment profit';
              infoChanged = true; // Устанавливаем флаг, чтобы не менять информацию снова
            }
            profitElement.style.opacity = (progress - 250) / 250;
            textElement.style.opacity = (progress - 250) / 250;
            Percent.style.opacity = (progress - 250) / 250;
            document.getElementById('wal-icon').style.display = 'none';
            document.getElementById('lob-icon').style.display = 'block';
          }
        },
        complete: () => {
          isMovingRight = true;
        }
      });
    }
  });


const amounts = [50, 100, 150, 200, 250, 300, 350, 400, 450, 500];
let currentIndex = 0;
let currentAmountValue = amounts[currentIndex]; 
const betAmount = document.querySelector('.bet-amount');
let isAnimating = false;

const animationConfig = {
  duration: 300,
  easing: 'easeInOutExpo'
};

function changeAmount(direction) {
  if (isAnimating) return;
  isAnimating = true;

  let newIndex;
  const isMore = direction === 'more';

  if (isMore) {
    newIndex = (currentIndex + 1) % amounts.length;
  } else {
    newIndex = (currentIndex - 1 + amounts.length) % amounts.length;
  }

  // Анимация исчезновения текущего числа
  anime({
    targets: betAmount,
    translateY: isMore? '100%' : '-100%',
    opacity: 0,
   ...animationConfig,
    complete: () => {
      betAmount.innerText = amounts[newIndex];
      currentAmountValue = amounts[newIndex];
      currentIndex = newIndex;

      betAmount.style.transform = 'translateY(0)';
      betAmount.style.opacity = 0;

      // Анимация нового числа
      anime({
        targets: betAmount,
        translateY: isMore? ['-100%', '0%'] : ['100%', '0%'],
        opacity: [0, 1],
       ...animationConfig,
        complete: () => {
          isAnimating = false;
        }
      });
    }
  });
}

// Добавляем обработчики событий для кнопок "more" и "less"
const moreButton = document.querySelector('.bet-circle.more');
const lessButton = document.querySelector('.bet-circle.less');

moreButton.addEventListener('click', () => {
  changeAmount('more');
});

lessButton.addEventListener('click', () => {
  changeAmount('less');
});






const BetIconElement = document.querySelector('.bet-icon');
const translateXBetBox = BetIconElement.offsetWidth + 6;

const buyButton = document.querySelector('.buy-button');
const betBox = document.querySelector('.bet-box');
const betCircleLess = document.querySelector('.bet-circle.less');
const betCircleMore = document.querySelector('.bet-circle.more');

buyButton.addEventListener('click', animateBetBox);

function animateBetBox() {
  // Создаем анимацию исчезновения кнопки buyButton
  anime({
    targets: buyButton,
    opacity: [1, 0], // Изменяем прозрачность от 1 до 0
    duration: 250,
    easing: 'easeInOutSine',
  });

  // Уменьшаем ширину betBox
  anime({
    targets: betBox,
    width: `${translateXBetBox}px`, // Уменьшаем ширину
    height: `${translateXBetBox}px`,
    duration: 250,
    easing: 'easeInOutSine',
  });

  // Вращаем элемент.bet-circle.less по часовой стрелке
  anime({
    targets: betCircleLess,
    rotate: ['0deg', '360deg'], // Вращаем от 0 до 360 градусов
    duration: 250,
    easing: 'easeInOutSine',
  });

  // Вращаем элемент.bet-circle.more против часовой стрелки
  anime({
    targets: betCircleMore,
    rotate: ['0deg', '-360deg'], // Вращаем от 0 до -360 градусов
    duration: 250,
    easing: 'easeInOutSine',
  });

  // Прячем.bet-amount в начале анимации
  anime({
    targets: document.querySelector('.bet-amount'),
    opacity: [1, 0], // Изменяем прозрачность от 1 до 0
    duration: 250,
    easing: 'easeInOutSine',
  });

  // Меняем иконку.bet-icon за 10 мс до конца анимации
  setTimeout(() => {
    const betIcons = document.querySelectorAll('.bet-icon');
    betIcons.forEach((icon) => {
      icon.src = 'assets/bet-tick.svg'; // Замените на новый адрес иконки
    });

    // Подпрыгиваем и исчезаем
    anime({
      targets: betBox,
      translateY: '-40%', // Подпрыгиваем
      opacity: [1, 0], // Исчезаем
      duration: 400,
      easing: 'easeInOutSine',
    });
  }, 240);
}

