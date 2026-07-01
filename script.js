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
  noButton.className = 'btn btn-no';
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

  actions.append(yesButton, noButton);
  card.append(eyebrow, title, intro, imageWrap, prompt, actions);
  page.appendChild(card);
  app.append(page, overlay);

  let hasButtonMoved = false;

  function moveNoButton() {
    if (!hasButtonMoved) {
      hasButtonMoved = true;
      noButton.classList.add('is-moving');
      noButton.style.position = 'absolute';
    }
    
    const minPadding = 16;
    const btnWidth = noButton.offsetWidth;
    const btnHeight = noButton.offsetHeight;
    const cardWidth = card.clientWidth;
    const cardHeight = card.clientHeight;

    // Calculate bounds within the card, accounting for button size and centering via transform
    const minX = minPadding + btnWidth / 2;
    const maxX = cardWidth - minPadding - btnWidth / 2;
    const minY = minPadding + btnHeight / 2;
    const maxY = cardHeight - minPadding - btnHeight / 2;

    const x = Math.floor(Math.random() * (maxX - minX) + minX);
    const y = Math.floor(Math.random() * (maxY - minY) + minY);

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

  // Optional: Reset on window resize if needed
  // window.addEventListener('resize', () => {
  //   // Reset movement on resize if desired
  // });
}

createPage();
