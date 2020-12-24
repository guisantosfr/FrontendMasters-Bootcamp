const BREEDS_URL = 'https://dog.ceo/api/breeds/list/all';
const select = document.querySelector('.breeds');

fetch(BREEDS_URL)
  .then(response => {
    return response.json();
  })
  .then(data => {
    const breedsArray = Object.keys(data.message);
  
    for(breed of breedsArray){
      const option = document.createElement('option');
      option.value = breed;
      option.innerText = breed;

      select.appendChild(option);
    }
  })

select.addEventListener('change', function(event){
  getDoggo(`https://dog.ceo/api/breed/${event.target.value}/images/random`);
})

const img = document.querySelector('.dog-img');
const spinner = document.querySelector('.spinner');

function getDoggo(url){
  spinner.classList.add('show');
  img.classList.remove('show');

  fetch(url)
    .then(response => response.json())
    .then(data => {
      img.src = data.message;
    })
}

img.addEventListener('load', () => {
  spinner.classList.remove('show');
  img.classList.add('show');
})

//make url
//show spinner
//fetch from api
//use URl to change current image
//stop showing spinner