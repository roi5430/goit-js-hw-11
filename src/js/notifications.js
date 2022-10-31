export const options = {
  noMatch:
    'Sorry, there are no images matching your search query. Please try again.',
  richEnd: "We're sorry, but you've reached the end of search results.",
  success(totalHits) {
    return `Hooray! We found ${totalHits} images.`;
  },
};
