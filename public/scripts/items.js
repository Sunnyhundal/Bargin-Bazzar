/* eslint-disable no-undef */

/**
 * @typedef {import('../../db/queries/items.js').Items} Items
 */

const ITEMS_PER_ROW = 4;

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
 * @param {Items} items - favorite is an object
 * @return {string} HTML string of the items
 */
const createItem = (item) => `
  <div class="card" style="width: 18rem;">
    <img class="card-img-top" src="${item.photo_url}" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">${item.title}</h5>
      <span>${formatCurrency(item.price)}</span>
      <form class="favorite-form" id="${item.item_id}">
        <button type="submit">Favorite</button>
      </form>
      <form class="unFavorite-form" id="${item.id}">
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
  const rowId = Math.floor(index / ITEMES_PER_ROW);
  return $(`<ul class="items-row" id="items-row-${rowId}"}></ul>`);
};

/**
 * @param {Item[]} items - favorites is an array of favorite objects
 * @return {void}
 */
const renderItems = (items) => {
  $('.items-container').empty();

  const rowSize = Math.ceil(items.length / ITEMS_PER_ROW);
  // rows for favorites. each row should contain 4 favorite items based on design spec
  const rows = Array.from({ length: rowSize}, createRow);

  // append favorites to each row to be 4 items per row
  rows.forEach(($row, index) => {
    const startIndex = index * ITEMS_PER_ROW;
    const endIndex = (index + 1) * ITEMS_PER_ROW;
    const slicedITEMS = items.slice(startIndex, endIndex);

    slicedItems.forEach((item) => {
      $row.append(createItem(item));
    });

    $('.items-container').append($row);
  });
};
