const { JSDOM } = require('jsdom');

function attributesRemover(req, res) {
  const { html } = req.body;

  if (!html) res.status(400).json({ error: 'Missing html' });
  if (html.includes('<body' || html.includes('<head'))) res.status(400).json({ error: "Don't send body and head tags" });

  const dom = new JSDOM(`<body>${html}</body>`);
  dom.window.document.querySelectorAll('*').forEach((el) => {
    const attributes = Object.fromEntries(Array.from(el.attributes)
      .map((item) => [item.name, item.value]));
    if (Object.keys(attributes).length === 0) return;
    Object.entries(attributes).forEach((atribute) => {
      el.removeAttribute(atribute);
    });
  });

  res.status(200).json({
    html: dom.window.document.body.innerHTML,
  });
}

module.exports = attributesRemover;
