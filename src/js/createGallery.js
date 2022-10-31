import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { clearMarkup, rendering } from './rendering';
import { refs } from './variables';
import { options } from './notifications';
import { upBtnShow } from './upBtnShow';
import ImgService from './imgService';
import BtnControl from './btnControl';

refs.formEl.addEventListener('submit', onSearch);
window.addEventListener('scroll', onScroll);

// 🔑🔑🔑 Unlock for manual page updating
// refs.loadMoreBtnEl.addEventListener('click', fetchImages);
// 🔑🔑🔑

const imgService = new ImgService();
const loadMoreBtn = new BtnControl({
  selector: '.load-more',
  hidden: true,
});
const lightbox = new SimpleLightbox('.gallery a', {});
lightbox.on('show.simplelightbox', function () {});

function onSearch(e) {
  e.preventDefault();

  clearMarkup();
  imgService.resetFetchCounter();
  imgService.resetHits();
  imgService.query = e.currentTarget.elements.searchQuery.value;

  if (imgService.query === '') {
    return Notiflix.Notify.failure(options.noMatch);
  }

  loadMoreBtn.show();
  imgService.resetPage();
  fetchImages();
}

function fetchImages() {
  loadMoreBtn.disable();
  imgService.fetchImgs().then(data => {
    loadMoreBtn.enable();
    if (data.totalHits > 0 && imgService.page < 3) {
      Notiflix.Notify.success(options.success(data.totalHits));
    }
    if (
      data.totalHits === imgService.hitsAmount &&
      imgService.hitsAmount >= 1
    ) {
      Notiflix.Notify.failure(options.richEnd);
      loadMoreBtn.hide();
    }

    rendering(data);
    lightbox.refresh();

    // 🔑🔑🔑 Unlock for manual page updating
    // if (imgService.page > 2) {
    //   autoscroll();
    // }
    // 🔑🔑🔑

    return;
  });
}

function onScroll() {
  const docEl = document.documentElement.getBoundingClientRect();

  upBtnShow();

  if (
    docEl.top + docEl.height < 1000 &&
    imgService.fetchCounterVal === imgService.pageCount &&
    imgService.totalHitsAm !== imgService.hitsAmount
  ) {
    fetchImages();
    imgService.fetchCounter += 1;
  }
}

// 🔑🔑🔑 Unlock for manual page updating
// function autoscroll() {
//   const { height: cardHeight } = document
//     .querySelector('.gallery')
//     .firstElementChild.getBoundingClientRect();

//   window.scrollBy({
//     top: cardHeight * 2,
//     behavior: 'smooth',
//   });
// }
// 🔑🔑🔑
