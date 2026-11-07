/* ============================================================
   DATA-PAMERAN.JS
   Render otomatis dari PAMERAN di config.js
   Jangan diubah — edit config.js saja!
   ============================================================ */

function buildPameranContent(item) {
  const paragraphs = (item.paragraphs || [])
    .map(p => `<p>${p}</p>`)
    .join('\n');
  const quote = item.quote
    ? `<p><em>"${item.quote}"</em></p>`
    : '';
  return paragraphs + quote;
}

// Inject content ke setiap item PAMERAN dari config
Object.values(PAMERAN).forEach(item => {
  if (!item.content) {
    item.content = buildPameranContent(item);
  }
});
