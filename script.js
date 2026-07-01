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
//   intro.textContent = 'A little moment of sweetness for someone who deserves all the happiness in the world.';

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
  modalText.textContent = 'I am incredibly sorry for hurting you and causing you disappointment. I value you more than I can say, and I hate knowing that I let you down today. Please know that none of this was intentional, and I truly hope you can find it in your heart to forgive me so we can move forward. 🫶.';

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
    page.classList.add('is-hidden');
    overlay.classList.add('visible');
    createConfetti();
  }

  function createConfetti() {
    const confettiCount = 50;
    const colors = ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#9400d3', '#ff1493', '#00ffff', '#ff69b4', '#ff6fa5', '#ff8fa3', '#ffb3c1', '#ffc0cb', '#fff0f5'];
    
    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      
      const color = colors[Math.floor(Math.random() * colors.length)];
      const size = Math.random() * 10 + 5;
      const left = Math.random() * window.innerWidth;
      const delay = Math.random() * 0.1;
      const duration = Math.random() * 1.5 + 1.5;
      
      confetti.style.left = `${left}px`;
      confetti.style.top = '-10px';
      confetti.style.width = `${size}px`;
      confetti.style.height = `${size}px`;
      confetti.style.backgroundColor = color;
      confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
      confetti.style.opacity = '1';
      confetti.style.animation = `confetti-swing 1s ease-in, confetti-fall ${duration}s ease-in forwards`;
      confetti.style.animationDelay = `${delay}s`;
      confetti.style.filter = `hue-rotate(${Math.random() * 60}deg)`;
      
      document.body.appendChild(confetti);
      
      setTimeout(() => {
        confetti.remove();
      }, (duration + delay) * 1000);
    }
  }

  function hideModal() {
    page.classList.remove('is-hidden');
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
