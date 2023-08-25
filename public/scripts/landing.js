/* eslint-disable no-undef */

$(document).ready(() => {
  $.ajax({
    method: 'GET',
    userId: {},
    url: '/api/landing'
  })
    .then((featured) => {
      renderItemCards('.featured-items', featured);
    });
});
