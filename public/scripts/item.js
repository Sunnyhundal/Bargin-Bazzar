$(document).ready(() => {
  $.ajax({
    method: 'GET',
    url: '/item/6' // userId is hardcoded for now
  })
    .then((item) => {
      renderItemCards('.item', item);
    });
});
