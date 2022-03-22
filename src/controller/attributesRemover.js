const { JSDOM } = require('jsdom');

function getAttributes(element) {
	const arr = Array();
	for (let i = 0; i < element.attributes.length; i++) {
		arr.push(element.attributes[i].nodeName);
	}
  return arr;
}

function attributesRemover(req, res) {
  const { html } = req.body;

  if (!html) return res.status(400).json({ error: 'Missing html' });
  if (html.includes('<body' || html.includes('<head'))) return res.status(400).json({ error: "Don't send body and head tags" });

  const dom = new JSDOM(`<body>${html}</body>`);
  dom.window.document.querySelectorAll('*').forEach((el) => {
    getAttributes(el).forEach((attr) => {
      el.removeAttribute(attr);
    });
  });

  return res.status(200).json({
    html: dom.window.document.body.innerHTML,
  });
}

module.exports = attributesRemover;
