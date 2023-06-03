import { fetchBreeds, fetchCatByBreed } from './cat-api.js'
import SlimSelect from 'slim-select'
import Notiflix from 'notiflix';
import 'slim-select/dist/slimselect.css';

const breedSelect = document.querySelector('.breed-select')
const catInfo = document.querySelector('.cat-info')
const error = document.querySelector('.error')
const loader = document.querySelector('.loader')



fetchBreeds().then(breeds => {

    error.classList.add('error')

  breeds.forEach(breed => {
    const option = document.createElement('option');
    option.value = breed.id;
    option.textContent = breed.name
    breedSelect.append(option)
  });
  new SlimSelect({
    select: '#selectElement'
  });
}).catch(() => {
   error.classList.add('error')
   Notiflix.Notify.failure(`${error.innerText}`);
}).finally(() => {
  loader.classList.remove('loader');
  })
  
  
const onSelectMarkup = event => {
const selectBreed = event.target.value;
loader.classList.add('loader');
  setTimeout(() => {
    fetchCatByBreed(selectBreed)
    .then(data => {

      const catsData = data.map(cat =>
        `<img src="${cat.url}" alt="Cat Image">
        <h1>${cat.breeds[0].name}</h1>
        <p><strong>Description:</strong> ${cat.breeds[0].description}</p>
        <p><strong>Temperament:</strong> ${cat.breeds[0].temperament}</p>
    `
      )
      catInfo.innerHTML = catsData.join('');
    }).catch(() => {
   error.classList.add('error')
   Notiflix.Notify.failure(`${error.innerText}`);
    }).finally(() => {
      loader.classList.remove('loader');
  })
  },500)
  
  };
   breedSelect.addEventListener('change', onSelectMarkup);

