const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];


const refs = {
  imageGalleryContainer:document.querySelector('.js-gallery'),
  divEl: document.querySelector ('.js-lightbox'),
  backdrop: document.querySelector ('.lightbox__overlay'),
  modalmgEl: document.querySelector ('.lightbox__image'),
  closeModalBtn:document.querySelector ('button[data-action ="close-lightbox"]'),
};

const  imageGalleryMarkup = createImageGalleryMarkup (galleryItems);
refs.imageGalleryContainer.insertAdjacentHTML("beforeend", imageGalleryMarkup);

refs.imageGalleryContainer.addEventListener('click', onImageGalleryClick);
refs.closeModalBtn.addEventListener('click', onCloseModalBtnCLick);
refs.backdrop.addEventListener('click', onBackdropCLick);


function createImageGalleryMarkup (galleryItems){
  return  galleryItems
  .map (({preview, original, description}) =>{
    return `
    <li class="gallery__item">
    <a
      class="gallery__link"
      href="${original}"
    >
      <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
      />
    </a>
    </li> 
    `;
  })
  .join ('');

}

 
function onImageGalleryClick(event) {
  // console.log(event.target)
  // console.log(event.currentTarget)
  if (!event.target.classList.contains('gallery__image')) {
    return;
  }
event.preventDefault();

refs.divEl.classList.add('is-open');
refs.modalmgEl.src = event.target.dataset.source;
refs.modalmgEl.alt = event.target.getAttribute('alt');


window.addEventListener('keydown', onESCBtnPress);
window.addEventListener('keydown', onArrowBtnPress);
}

function onCloseModalBtnCLick (e){
  refs.divEl.classList.remove('is-open');
  window.removeEventListener('keydown', onESCBtnPress);
  refs.modalmgEl.src ='';
  refs.modalmgEl.alt ='';
}

function onBackdropCLick(e){
if (e.currentTarget === e.target){
  onCloseModalBtnCLick();
}
}

function onESCBtnPress(e){
  if (e.code === 'Escape'){
    onCloseModalBtnCLick();
  }
}

function onArrowBtnPress (e){
  if (e.code === 'ArrowRight'){
  return goToTheRight();
  // console.log('to the right')
  }
  if (e.code === 'ArrowLeft'){
    return goToTheLeft();
    // console.log('to the left')
  }
}


// function goToTheRight() {
//   const src = refs.modalmgEl.src;
//   let newArr = galleryItems.map(item => item)
 
//   for (let i = 0; i < newArr.length-1; i+=1){
//     if (newArr[i].original === src) {
//       refs.modalmgEl.src = newArr[i + 1].original;
//       refs.modalmgEl.alt = newArr[i + 1].description;
//       }

//   }
// }
  

// function goToTheLeft() {
//   const src = refs.modalmgEl.src;
//   let newArr = galleryItems.map(item => item)
 
//   for (let i = 0; i < newArr.length-1; i+=1){
//     if (newArr[i].original === src) {
//       refs.modalmgEl.src = newArr[i - 1].original;
//       refs.modalmgEl.alt = newArr[i - 1].description;
//       }
    
//   }
// };


function goToTheRight(e) {

    const sources = galleryItems.map(({ original }) => original);
    let indexOfCurrentImg = sources.indexOf(refs.modalmgEl.src);

    if (indexOfCurrentImg === 0) {
      indexOfCurrentImg = sources.length;
    }
    refs.modalmgEl.src = sources[indexOfCurrentImg - 1];
    console.log(indexOfCurrentImg);
  }


function goToTheLeft(e) {


    const sources = galleryItems.map(({ original }) => original);
    let indexOfCurrentImg = sources.indexOf(refs.modalmgEl.src);

    if (indexOfCurrentImg + 1 > sources.length - 1) {
      indexOfCurrentImg = -1;
    }
    refs.modalmgEl.src = sources[indexOfCurrentImg + 1];
    console.log(indexOfCurrentImg + 1);
  }

