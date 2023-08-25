const express = require('express');
const router = express.Router();

// Sample array of items (for demonstration purposes)
const items = [
  { name: 'Item A', price: 50 },
  { name: 'Item B', price: 30 },
  { name: 'Item C', price: 70 },
  // ... more items ...
];

router.post('/itemsView', (req, res) => {
  // Handle the filtering logic here
  const selectedChoice = req.body.choice;

  let filteredItems = [...items]; // Copy the original array for filtering

  if (selectedChoice === 'High-To-Low') {
    filteredItems.sort((a, b) => b.price - a.price);
  } else if (selectedChoice === 'Low-To-High') {
    filteredItems.sort((a, b) => a.price - b.price);
  } else if (selectedChoice === 'Alphabetical') {
    filteredItems.sort((a, b) => a.name.localeCompare(b.name));
  } else if (selectedChoice === 'Alphabetical-Reverse') {
    filteredItems.sort((a, b) => b.name.localeCompare(a.name));
  }

  // Send the filtered items to a template for rendering
  res.render('filtered-items', { items: filteredItems });
});

module.exports = router;
