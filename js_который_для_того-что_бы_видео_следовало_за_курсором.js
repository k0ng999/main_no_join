  // Получаем элементы
  const card = document.querySelector('.card_shadow');
  const hl = document.querySelector('.hl_shadow');
  const qwe = document.querySelector('.main_shadow'); // Заменили getElementById на querySelector

  // Флаг для определения, находится ли курсор в блоке .qwe
  let cursorInsideQwe = false;

  // Переменные для хранения начальных позиций тени и блока
  let initialCardTransform = {
    rotateX: 0,
    rotateY: 0
  };

  let initialHlTransform = {
    translateX: 0,
    translateY: 0
  };

  // Сохраняем начальные позиции
  document.addEventListener('DOMContentLoaded', () => {
    const cardRect = card.getBoundingClientRect();
    const hlRect = hl.getBoundingClientRect();

    initialCardTransform.rotateX = cardRect.top + cardRect.height / 2 - window.innerHeight / 2;
    initialCardTransform.rotateY = cardRect.left + cardRect.width / 2 - window.innerWidth / 2;

    initialHlTransform.translateX = hlRect.left + hlRect.width / 2 - window.innerWidth / 2;
    initialHlTransform.translateY = hlRect.top + hlRect.height / 2 - window.innerHeight / 2;
  });

  // Функция для плавного перемещения блока за курсором
  function moveBlock(xPos, yPos) {
    card.style.transition = 'transform 0.1s ease';
    hl.style.transition = 'transform 0.1s ease';
    card.style.transform = `rotateY(${-xPos}deg) rotateX(${yPos}deg)`;
    hl.style.transform = `translate(${xPos}px, ${yPos}px)`;
  }

  // Добавляем слушатель события для движения блока и тени за курсором
  document.addEventListener('mousemove', (e) => {
    const xPos = (e.pageX - window.innerWidth / 2) / 8;
    const yPos = (e.pageY - window.innerHeight / 2) / 8;

    if (isCursorInsideCard(e)) {
      // Курсор внутри .card, возвращаем её в исходное положение
      card.style.transition = 'transform 0.8s ease';
      hl.style.transition = 'transform 0.8s ease';
      card.style.transform = 'rotateY(0deg) rotateX(0deg)';
      hl.style.transform = 'translate(0, 0)';
    } else if (cursorInsideQwe) {
      // Курсор внутри .qwe, перемещаем .card за курсором
      moveBlock(xPos, yPos);
    } else {
      // Курсор вне .qwe, возвращаем .card и hl в исходное положение
      card.style.transition = 'transform 0.8s ease';
      hl.style.transition = 'transform 0.8s ease';
      card.style.transform = 'rotateY(0deg) rotateX(0deg)';
      hl.style.transform = 'translate(0, 0)';
    }
  });

  // Добавляем слушатель события для плавного возвращения блока и тени в исходное положение при наведении на .qwe
  qwe.addEventListener('mouseenter', () => {
    cursorInsideQwe = true;
    card.style.transition = 'transform 0.8s ease';
    hl.style.transition = 'transform 0.8s ease';
    card.style.transform = 'rotateY(0deg) rotateX(0deg)';
    hl.style.transform = 'translate(0, 0)';
  });

  // Добавляем слушатель события для возвращения блока и тени в исходное положение при уходе курсора с блока .qwe
  qwe.addEventListener('mouseleave', () => {
    cursorInsideQwe = false;
    card.style.transition = 'transform 0.8s ease';
    hl.style.transition = 'transform 0.8s ease';
    card.style.transform = 'rotateY(0deg) rotateX(0deg)';
    hl.style.transform = 'translate(0, 0)';
  });

  // Функция для проверки, находится ли курсор внутри .card
  function isCursorInsideCard(event) {
    const cardRect = card.getBoundingClientRect();
    return (
      event.clientX >= cardRect.left &&
      event.clientX <= cardRect.right &&
      event.clientY >= cardRect.top &&
      event.clientY <= cardRect.bottom
    );
  }
