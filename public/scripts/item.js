$.ajax({
  method: 'GET',
  userId: {},
  url: '/'
})
  .then((favorites) => {
    renderItemCards('.favorites-list', favorites);
  });
