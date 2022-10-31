const axios = require('axios');
const PIX_ROUTE = 'https://pixabay.com/api/?key=';
const PIX_KEY = '30103302-a3ef06cdfdc78e2e196d775c9';

export default class ImgService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.hits = 0;
    this.fetchCounter = 2;
    this.totalHits = 0;
  }

  async fetchImgs() {
    const fetchResult = await axios.get(
      `${PIX_ROUTE}${PIX_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`
    );
    this.page += 1;
    this.hits += fetchResult.data.hits.length;
    this.totalHits = fetchResult.data.totalHits;
    return fetchResult.data;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  get pageCount() {
    return this.page;
  }

  get hitsAmount() {
    return this.hits;
  }

  get fetchCounterVal() {
    return this.fetchCounter;
  }

  get totalHitsAm() {
    return this.totalHits;
  }

  resetFetchCounter() {
    this.fetchCounter = 2;
  }

  resetPage() {
    this.page = 1;
  }

  resetHits() {
    this.hits = 0;
  }
}
