const eventList = document.querySelector('.timeline-1');
const seccion1 = document.getElementById('seccion');
const seccion2 = document.getElementById('seccion-2');
const seccion3 = document.getElementById('seccion-3');
const cardContainer1 = seccion1.querySelector('.card-container');
const cardContainer2 = seccion2.querySelector('.card-container');
const cardContainer3 = seccion3.querySelector('.card-container');

const createCard = ({ name, height, mass }) => {
  return `
    <div class="card">
      <div class="card-body p-4">
        <div class="title-container">
          <div class="circle circle-green"></div>
          <h5>${name}</h5>
        </div>
        <p class="mt-2 mb-0">Altura: ${height}</p>
        <p class="mt-2 mb-0">Peso: ${mass}</p>
      </div>
    </div>
  `;
};

const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
  }
};

const getCharacters = async (startIndex, endIndex, section) => {
  const page = Math.floor((startIndex - 1) / 5) + 1;
  const { results } = await fetchData(`https://swapi.dev/api/people/?page=${page}`);
  const cards = results.slice(startIndex - 1, endIndex).map(createCard).join('');
  section.querySelector('.card-container').innerHTML = cards;
};

seccion1.addEventListener('mouseover', () => {
  getCharacters(1, 5, seccion1);
});

seccion2.addEventListener('mouseover', () => {
  getCharacters(6, 11, seccion2);
});

seccion3.addEventListener('mouseover', () => {
  getCharacters(12, 17, seccion3);
});
