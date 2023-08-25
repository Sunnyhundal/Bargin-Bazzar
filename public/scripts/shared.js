/* eslint-disable no-undef */

const ITEMS_PER_ROW = 4;

const itemsStore = {
  items: [],
};

/**
 * Formats a price to Canadian dollar string.
 *
 * @param {number} price - price is in cents
 * @return {string} eg. $23.40
 */
const formatCurrency = (price) => {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 2
  }).format(price / 100);
};


/**
 * @typedef {Object} Item
 * @property {string} title - the title of the item
 * @property {number} id - the id of the favorite
 * @property {number} price - the price of the item in cents
 * @property {number} item_id - the id of the item
 */


/**
 * @param {Item} item - item is an object containing item information
 * @return {string} HTML string of the item card
 */
const createItem = (item, showSoldTag) => `
<a href="api/items/${item.item_id}">
<li class="item-card">
    <img class="item-card-thumbnail" src="${item.photo_url}" alt="Item thumbnail">
    <div class="card-body">
      <div class="card-price">${formatCurrency(item.price)}</div>
      <div class="card-title-container">
        <h5 class="card-title">${item.title}</h5>
        ${(item.favorite_id || item.is_favorite) ? `
            <form class="unFavorite-form" id="${item.favorite_id}">
              <button class="unfavorite-form-button" type="submit"><i class="fa-solid fa-star unfavorite-icon"></i></button>
            </form>
          ` : `
            <form class="favorite-form" id="${item.item_id}">
              <button class="favorite-form-button" type="submit"><i class="fa-solid fa-star favorite-icon"></i></button>
            </form>
          `}
      </div>
    </div>
    ${item.is_sold && showSoldTag ? '<div class="sold-tag">SOLD</div>' : ''}
  </li>
</a>
`;

/**
 * Creates a row of favorites. Each row contains 4 favorites items.
 *
 * @param {any} _ - unused
 * @param {number} index - index is the index of the favorites
 * @returns {jQuery} jQuery object of the row
 */
const createRow = (_, index) => {
  const rowId = Math.floor(index / ITEMS_PER_ROW);
  return $(`<ul class="items-row" id="items-row-${rowId}"}></ul>`);
};

/**
 * @param {string} mainContainerName - mainContainerName is the name of the main container
 * @param {Item[]} items - favorites is an array of favorite objects
 * @return {void}
 */
const renderItemCards = (mainContainerName, items, showSoldTag) => {
  // initially store items in itemsStore for later modifications
  itemsStore.items = items;

  // empty if there are items in the container
  $(mainContainerName).empty();

  // create a new container for items
  const $container = $('<div class="items-container"></div>');

  const rowSize = Math.ceil(items.length / ITEMS_PER_ROW);
  // rows for favorites. each row should contain 4 favorite items based on design spec
  const rows = Array.from({ length: rowSize}, createRow);

  // append favorites to each row to be 4 items per row
  rows.forEach(($row, index) => {
    const startIndex = index * ITEMS_PER_ROW;
    const endIndex = (index + 1) * ITEMS_PER_ROW;
    const slicedItems = items.slice(startIndex, endIndex);

    slicedItems.forEach((item) => {
      $row.append(createItem(item, showSoldTag));
    });

    $container.append($row);
  });

  $(mainContainerName).append($container);

  // add event listeners to favorite and unfavorite button
  $('.favorite-form').on('submit', function(event) {
    event.preventDefault();
    const itemId = $(this).attr('id');

    $.ajax({
      url: '/favorites',
      method: 'POST',
      data: {
        itemId
      },
      success: (favorite) => {
        itemsStore.items = items.map((item) => {
          if (item.item_id === favorite.item_id) {
            return {
              ...item,
              favorite_id: favorite.id,
              is_favorite: true,
            };
          }

          return item;
        });

        // rerender items cards for updated favorites
        renderItemCards(mainContainerName, itemsStore.items, showSoldTag);
      },
      error: (error) => {
        console.log('Error: ', error);
      }
    });
  });

  $('.unFavorite-form').on('submit', function(event) {
    event.preventDefault();
    const favoriteId = $(this).attr('id');

    $.ajax({
      url: `/favorites/${favoriteId}`,
      method: 'DELETE',
      success: () => {
        itemsStore.items = items.map((item) => {
          if (item.favorite_id === Number(favoriteId)) {
            return {
              ...item,
              favorite_id: null,
              is_favorite: false,
            };
          }

          return item;
        });

        // rerender items cards for updated favorites
        renderItemCards(mainContainerName, itemsStore.items, showSoldTag);
      },
      error: (error) => {
        console.log('Error: ', error);
      }
    });
  });
};
