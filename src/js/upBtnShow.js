import { refs } from './variables';

export function upBtnShow() {
  if (scrollY >= 1000) {
    refs.upBtnEl.classList.remove('is-hidden');
  }
  if (scrollY <= 1000) {
    refs.upBtnEl.classList.add('is-hidden');
  }
}
