// EVมานี่มา — independent editorial website, built with vanilla JavaScript.
// Image URLs link to Wikimedia Commons; check each file's license before publishing.
const photos = {"m3": "https://commons.wikimedia.org/wiki/Special:FilePath/Tesla%20Model%203%20front%20%28October%2031%2C%202024%29.jpg?width=1200", "my": "https://commons.wikimedia.org/wiki/Special:FilePath/Tesla%20Model%20Y%20%28Facelift%29%20%E2%80%93%20f%2005052026.jpg?width=1200", "ct": "https://commons.wikimedia.org/wiki/Special:FilePath/2024%20Tesla%20Cybertruck.jpg?width=1200", "ms": "https://commons.wikimedia.org/wiki/Special:FilePath/0%20Tesla%20Model%20S%20%282016%29%200.jpg?width=1200", "mx": "https://commons.wikimedia.org/wiki/Special:FilePath/0%20Tesla%20Model%20X%20%282016%29%201.jpg?width=1200"};
const stories = [
 {id:'model-3',category:'legends',categoryLabel:'MODELS',date:'NOV 12, 2026',read:'5 MIN READ',title:'MODEL 3: THE EVERYDAY ELECTRIC',excerpt:'A closer look at Tesla’s streamlined electric sedan and why it remains such a talking point.',image:photos.m3,body:['Model 3 is Tesla’s compact electric sedan, built around a low-profile silhouette, a minimalist cabin and software-focused controls.','Its appeal is not just acceleration. Everyday usability, charging habits and the quiet feel of an electric drivetrain are central to ownership.','Specifications and availability vary by market and model year, so confirm details on Tesla’s official website.']},
 {id:'model-y',category:'legends',categoryLabel:'MODELS',date:'NOV 06, 2026',read:'5 MIN READ',title:'MODEL Y: ROOM TO MOVE',excerpt:'An electric crossover built for daily commutes, weekend escapes and everything in between.',image:photos.my,body:['Model Y brings the Tesla experience to a practical crossover format with space for passengers and luggage.','For families or frequent road-trippers, storage, access and charging planning may matter as much as performance.','This is an editorial overview, not a listing for a specific vehicle or trim.']},
 {id:'charging',category:'garage',categoryLabel:'EV GUIDES',date:'OCT 25, 2026',read:'6 MIN READ',title:'YOUR FIRST EV ROAD TRIP',excerpt:'Home charging, route planning and practical habits for confident electric travel.',image:photos.my,body:['The key to a relaxed EV road trip is planning charging stops around your route and real driving conditions.','Explore charging options before departure and account for weather, elevation, speed and available charging facilities.','For accurate connector, network and charging information, consult local operators and the vehicle documentation.']},
 {id:'cybertruck',category:'legends',categoryLabel:'MODELS',date:'OCT 12, 2026',read:'4 MIN READ',title:'CYBERTRUCK: DESIGN WITHOUT COMPROMISE?',excerpt:'The angular stainless-steel pickup that turned an electric vehicle into a design conversation.',image:photos.ct,body:['Cybertruck stands apart with sharp geometry and an unconventional stainless-steel exterior.','It rethinks the familiar silhouette of a pickup, making its design as discussed as its capabilities.','Features, legal availability and configuration differ between regions.']},
 {id:'software',category:'culture',categoryLabel:'LIFESTYLE',date:'SEP 30, 2026',read:'5 MIN READ',title:'A CAR THAT KEEPS EVOLVING',excerpt:'How software has changed the way drivers think about vehicle features and the cabin.',image:photos.m3,body:['Modern electric vehicles bring a different kind of ownership experience: screens, apps and frequent software-centric features.','Tesla has helped make over-the-air software updates a familiar part of automotive conversation.','Always review current feature availability and driver-assistance limitations for your particular car.']},
 {id:'electric-style',category:'culture',categoryLabel:'LIFESTYLE',date:'SEP 14, 2026',read:'4 MIN READ',title:'THE NEW LANGUAGE OF PERFORMANCE',excerpt:'Quiet cabins, instant torque and sculpted forms are rewriting the automotive mood board.',image:photos.ct,body:['Electric vehicles can feel dramatically different from traditional combustion cars, even before the first turn.','From minimalist controls to the sensation of electric acceleration, a new design language has emerged.','We explore that shift through the lens of models, ownership and the culture growing around them.']}
];
const cars = [
 {year:'ELECTRIC SEDAN',name:'TESLA MODEL 3',code:'COMPACT SEDAN',badge:'EVERYDAY ELECTRIC',image:photos.m3,note:'MINIMALIST · ALL ELECTRIC',link:'https://www.tesla.com/model3'},
 {year:'ELECTRIC SUV',name:'TESLA MODEL Y',code:'CROSSOVER SUV',badge:'THE ALL-ROUNDER',image:photos.my,note:'VERSATILE · ALL ELECTRIC',link:'https://www.tesla.com/modely'},
 {year:'FLAGSHIP SEDAN',name:'TESLA MODEL S',code:'FULL-SIZE SEDAN',badge:'PERFORMANCE ICON',image:photos.ms,note:'PREMIUM · ALL ELECTRIC',link:'https://www.tesla.com/models'},
 {year:'FLAGSHIP SUV',name:'TESLA MODEL X',code:'FULL-SIZE SUV',badge:'SIGNATURE DESIGN',image:photos.mx,note:'SPACIOUS · ALL ELECTRIC',link:'https://www.tesla.com/modelx'},
 {year:'ELECTRIC PICKUP',name:'TESLA CYBERTRUCK',code:'ELECTRIC PICKUP',badge:'BOLD BY DESIGN',image:photos.ct,note:'STAINLESS STEEL · ALL ELECTRIC',link:'https://www.tesla.com/cybertruck'}
];

const grid = document.querySelector('#storiesGrid');
const emptyState = document.querySelector('#emptyState');
const searchInput = document.querySelector('#searchInput');
let activeCategory = 'all';

function makeStoryCard(story, index) {
  const card = document.createElement('article');
  card.className = 'story-card';
  card.tabIndex = 0;
  card.setAttribute('role', 'button');
  card.setAttribute('aria-label', `Read article: ${story.title}`);
  card.innerHTML = `
    <div class="story-visual"><img class="story-image" src="${story.image}" alt="Tesla vehicle photograph" loading="lazy" onerror="this.style.opacity='.15'" /><span class="story-index">0${index + 1} / 06</span></div>
    <div class="story-info"><div class="story-meta"><span class="tag">${story.categoryLabel}</span><span>•</span><span>${story.date}</span></div>
      <h3 class="story-title">${story.title}</h3><p class="story-excerpt">${story.excerpt}</p><span class="read-more">READ THE STORY <span>↗</span></span></div>`;
  card.addEventListener('click', () => openStory(story));
  card.addEventListener('keydown', e => {if (e.key === 'Enter' || e.key === ' ') {e.preventDefault();openStory(story);}});
  return card;
}

function renderStories() {
  const query = searchInput.value.toLowerCase().trim();
  const visible = stories.filter(s => (activeCategory === 'all' || s.category === activeCategory) &&
    [s.title, s.excerpt, s.categoryLabel, ...s.body].join(' ').toLowerCase().includes(query));
  grid.replaceChildren(...visible.map((story, index) => makeStoryCard(story, index)));
  emptyState.hidden = visible.length !== 0;
}

document.querySelectorAll('.filter').forEach(button => {
  button.addEventListener('click', () => {
    activeCategory = button.dataset.filter;
    document.querySelectorAll('.filter').forEach(b => {
      const selected = b === button;
      b.classList.toggle('active', selected);
      b.setAttribute('aria-pressed', String(selected));
    });
    renderStories();
  });
});

const dialog = document.querySelector('#articleDialog');
function openStory(story) {
  const content = document.querySelector('#articleContent');
  content.replaceChildren();
  const photo = document.createElement('img');
  photo.src = story.image;
  photo.alt = 'Tesla vehicle photograph';
  photo.className = 'dialog-image';
  const body = document.createElement('div');
  body.className = 'dialog-body';
  const meta = document.createElement('div');
  meta.className = 'story-meta';
  meta.textContent = `${story.categoryLabel}  /  ${story.date}  /  ${story.read}`;
  const title = document.createElement('h2');
  title.id = 'dialogTitle';
  title.textContent = story.title;
  const lede = document.createElement('p');
  lede.className = 'dialog-lede';
  lede.textContent = story.excerpt;
  body.append(meta, title, lede);
  for (const text of story.body) {
    const p = document.createElement('p'); p.textContent = text; body.append(p);
  }
  const tail = document.createElement('div');
  tail.className = 'dialog-tail';
  tail.textContent = 'EVมานี่มา  /  THE FUTURE IS ELECTRIC';
  body.append(tail);
  content.append(photo, body);
  dialog.showModal();
}
document.querySelector('#dialogClose').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', e => {if (e.target === dialog) dialog.close();});

const carGrid = document.querySelector('#carGrid');
cars.forEach((car, index) => {
  const card = document.createElement('article');
  card.className = 'car-card';
  card.innerHTML = `<div class="car-visual"><img class="car-image" src="${car.image}" alt="${car.name} exterior photo" loading="lazy" onerror="this.style.opacity='.12'" /><span class="car-number">0${index + 1} / COLLECTION</span><span class="car-badge">${car.badge}</span></div><div class="car-info"><span class="car-year">${car.year}</span><h3>${car.name}</h3><p>${car.code} · ${car.note}</p><div class="car-bottom"><span>MODEL SPOTLIGHT</span><a href="${car.link}" target="_blank" rel="noopener noreferrer">DETAILS ↗</a></div></div>`;
  carGrid.append(card);
});

const searchBar = document.querySelector('#searchBar');
function showSearch() {searchBar.hidden = false;searchInput.focus();document.querySelector('#stories').scrollIntoView({behavior:'smooth'});}
function hideSearch() {searchBar.hidden = true;searchInput.value = '';renderStories();}
document.querySelector('#searchToggle').addEventListener('click', () => searchBar.hidden ? showSearch() : hideSearch());
document.querySelector('#closeSearch').addEventListener('click', hideSearch);
searchInput.addEventListener('input', renderStories);
document.querySelector('#resetSearch').addEventListener('click', () => {searchInput.value='';document.querySelector('.filter[data-filter="all"]').click();});

const menu = document.querySelector('#mainNav');
const menuToggle = document.querySelector('#menuToggle');
menuToggle.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});
menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  menu.classList.remove('open');menuToggle.setAttribute('aria-expanded', 'false');
}));

// Front-end demo only: replace with your email platform API before publishing.
document.querySelector('#newsletterForm').addEventListener('submit', event => {
  event.preventDefault();
  const emailInput = document.querySelector('#emailInput');
  if (!emailInput.reportValidity()) return;
  document.querySelector('#formMessage').textContent = 'THANK YOU! THIS IS A DEMO FORM — MAILING-LIST DELIVERY IS NOT YET CONNECTED.';
  emailInput.value = '';
});

document.querySelector('#year').textContent = new Date().getFullYear();
renderStories();
