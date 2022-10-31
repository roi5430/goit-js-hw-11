import Notiflix from 'notiflix';
import { refs } from './variables';
import { options } from './notifications';
import BtnControl from './btnControl';

const loadMoreBtn = new BtnControl({
  selector: '.load-more',
});

export function rendering(data) {
  if (data.hits.length === 0) {
    Notiflix.Notify.failure(options.noMatch);
    loadMoreBtn.hide();
    return;
  }
  const markup = createMarkup(data);
  refs.galleryEl.insertAdjacentHTML('beforeend', markup);
}

export function clearMarkup() {
  refs.galleryEl.innerHTML = '';
}

function createMarkup(data) {
  return data.hits.reduce(
    (
      acc,
      { likes, views, comments, downloads, tags, webformatURL, largeImageURL }
    ) =>
      (acc += `<div class="gallery__item photo-card">
        <div class="thumb">
          <a class="gallery__link" href="${largeImageURL}"><img class="gallery__image prev-img" src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
          </div>
          <div class="info">
            <p class="info-item">
              <b>Likes</b>
              <span class="info-data">${likes}</span>
            </p>
            <p class="info-item">
              <b>Views</b>
              <span class="info-data">${views}</span>
            </p>
            <p class="info-item">
              <b>Comments</b>
              <span class="info-data">${comments}</span>
            </p>
            <p class="info-item">
              <b>Downloads</b>
              <span class="info-data">${downloads}</span>
            </p>
          </div>
        </div>`),
    ' '
  );
}
