/* eslint-disable no-undef */

/**
 * @typedef {import('../../db/queries/favorites.js').Favorite} Favorite
 */

const FAVORITES_PER_ROW = 4;

/**
 * @param {number} price - price is in cents
 * @return {string} currency formatted string of the price
 */
const formatCurrency = (price) => {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 2
  }).format(price / 100);
};

/**
 * @param {Favorite} favorite - favorite is an object
 * @return {string} HTML string of the favorite
 */
const createItem = (favorite) => `
  <div class="card" style="width: 18rem;">
    <img class="card-img-top" src="${favorite.photo_url}" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">${favorite.title}</h5>
      <span>${formatCurrency(favorite.price)}</span>
      <form class="favorite-form" id="${favorite.item_id}">
        <button type="submit">Favorite</button>
      </form>
      <form class="unFavorite-form" id="${favorite.id}">
        <button type="submit">UnFavorite</button>
      </form>
    </div>
  </div>
`;

/**
 * Creates a row of favorites. Each row contains 4 favorites items.
 *
 * @param {any} _ - unused
 * @param {number} index - index is the index of the favorites
 * @returns {jQuery} jQuery object of the row
 */
const createRow = (_, index) => {
  const rowId = Math.floor(index / FAVORITES_PER_ROW);
  return $(`<ul class="favorites-row" id="favorites-row-${rowId}"}></ul>`);
};

/**
 * @param {Favorite[]} favorites - favorites is an array of favorite objects
 * @return {void}
 */
const renderFavorites = (favorites) => {
  $('.favorites-container').empty();

  const rowSize = Math.ceil(favorites.length / FAVORITES_PER_ROW);
  // rows for favorites. each row should contain 4 favorite items based on design spec
  const rows = Array.from({ length: rowSize}, createRow);

  // append favorites to each row to be 4 items per row
  rows.forEach(($row, index) => {
    const startIndex = index * FAVORITES_PER_ROW;
    const endIndex = (index + 1) * FAVORITES_PER_ROW;
    const slicedFavorites = favorites.slice(startIndex, endIndex);

    slicedFavorites.forEach((favorite) => {
      $row.append(createItem(favorite));
    });

    $('.favorites-container').append($row);
  });

  // temporary event listeners for testing favoring and unfavoring items
  $('.favorite-form').on('submit', function(event) {
    event.preventDefault();
    const itemId = $(this).attr('id');

    console.log(itemId);

    $.ajax({
      url: '/favorites',
      method: 'POST',
      data: {
        itemId
      },
      error: (error) => {
        console.log('Error: ', error);
      }
    });
  });

  $('.unFavorite-form').on('submit', function(event) {
    event.preventDefault();
    const favoriteId = $(this).attr('id');

    console.log(favoriteId);

    $.ajax({
      url: `/favorites/${favoriteId}`,
      method: 'DELETE',
      error: (error) => {
        console.log('Error: ', error);
      }
    });
  });
};

$(document).ready(() => {
  $.ajax({
    method: 'GET',
    url: '/favorites/6' // userId is hardcoded for now
  })
    .then((favorites) => {
      renderFavorites(favorites);
    });
});
