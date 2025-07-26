document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.plan-table tbody tr').forEach(row => {
    row.addEventListener('click', async () => {
      const date = row.dataset.date;
      try {
        await axios.post('/api/complete', { date });
        row.classList.toggle('completed');
      } catch (err) {
        console.error('Error toggling completion:', err);
      }
    });
  });
});
