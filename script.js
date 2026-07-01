const app = document.getElementById('app');

function createPage() {
  const page = document.createElement('main');
  page.className = 'page';

  const card = document.createElement('section');
  card.className = 'card';

  const eyebrow = document.createElement('p');
  eyebrow.className = 'eyebrow';
  eyebrow.textContent = 'A tiny love note';

  const title = document.createElement('h1');
  title.textContent = 'You make my world brighter';

  const intro = document.createElement('p');
  intro.className = 'intro';
  intro.textContent = 'A little moment of sweetness for someone who deserves all the happiness in the world.';

  const imageWrap = document.createElement('div');
  imageWrap.className = 'image-wrap';

  const image = document.createElement('img');
  image.src = 'assets/cat.svg';
  image.alt = 'A cute cat with a heart';

  const prompt = document.createElement('p');
  prompt.className = 'prompt';
  prompt.textContent = 'Will you forgive me?';

  const actions = document.createElement('div');
  actions.className = 'actions';

  const yesButton = document.createElement('button');
  yesButton.className = 'btn btn-yes';
  yesButton.textContent = 'YES';

  const noButton = document.createElement('button');
  noButton.className = 'btn btn-no is-starting';
  noButton.textContent = 'NO';

  const overlay = document.createElement('div');
  overlay.className = 'overlay';

  const modalCard = document.createElement('div');
  modalCard.className = 'modal-card';

  const modalTitle = document.createElement('h2');
  modalTitle.textContent = 'Thank you';

  const modalText = document.createElement('p');
  modalText.textContent = 'Your kindness means the world to me. I hope this little moment brings you a smile.';

  const closeButton = document.createElement('button');
  closeButton.className = 'close-btn';
  closeButton.textContent = 'Close';

  modalCard.append(modalTitle, modalText, closeButton);
  overlay.appendChild(modalCard);

  actions.appendChild(yesButton);
  card.append(eyebrow, title, intro, imageWrap, prompt, actions, noButton);
  page.appendChild(card);
  app.append(page, overlay);

  function positionNoButtonAtStart() {
    noButton.style.left = '50%';
    noButton.style.top = '50%';
    noButton.style.transform = 'translate(-50%, -50%)';
    noButton.classList.add('is-starting');
  }

  function moveNoButton() {
    noButton.classList.remove('is-starting');
    const padding = 16;
    const maxX = Math.max(0, card.clientWidth - noButton.offsetWidth - padding);
    const maxY = Math.max(0, card.clientHeight - noButton.offsetHeight - padding);
    const x = Math.max(padding, Math.floor(Math.random() * maxX));
    const y = Math.max(padding, Math.floor(Math.random() * maxY));

    noButton.style.left = `${x}px`;
    noButton.style.top = `${y}px`;
  }

  function showModal() {
    overlay.classList.add('visible');
  }

  function hideModal() {
    overlay.classList.remove('visible');
  }

  yesButton.addEventListener('click', showModal);
  closeButton.addEventListener('click', hideModal);
  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) {
      hideModal();
    }
  });

  noButton.addEventListener('mouseenter', moveNoButton);
  noButton.addEventListener('mousemove', moveNoButton);
  noButton.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    moveNoButton();
  });
  noButton.addEventListener('pointerdown', (event) => {
    event.preventDefault();
    event.stopPropagation();
    moveNoButton();
  });

  imageWrap.appendChild(image);

  window.addEventListener('resize', () => {
    positionNoButtonAtStart();
  });

  requestAnimationFrame(positionNoButtonAtStart);
}

createPage();
