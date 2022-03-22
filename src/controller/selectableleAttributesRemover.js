const { JSDOM } = require('jsdom');

function selectableleAttributesRemover(req, res) {
  const { html, attributes } = req.body;

  if (!html) return res.status(400).json({ error: 'Missing html' });
  if (!attributes) return res.status(400).json({ error: 'Missing attributes' });
  if (html.includes('<body' || html.includes('<head'))) res.status(400).json({ error: "Don't send body and head tags" });

  const dom = new JSDOM(`<body>${html}</body>`);
  attributes.forEach((attribute) => {
    dom.window.document.querySelectorAll('*').forEach((el) => {
      el.removeAttribute(attribute);
    });
  });

  return res.status(200).json({
    html: dom.window.document.body.innerHTML,
  });
}

module.exports = selectableleAttributesRemover;
