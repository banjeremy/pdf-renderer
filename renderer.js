var phantom = require('phantom'),
    path = require('path');

exports.render = function(options, cb){
const defaults = {
  values: {},
  width: 2550,  // 8.5 * 300dpi
  height: 3300, // 11 * 300dpi
  paperSize: { format: 'Letter', orientation: 'Portrait', margin: 0 },
  quality: 100,
  zoomFactor: 1,
  format: 'pdf'
};

const o = Object.assign({}, defaults, options);

var _ph, _page;

phantom.create()
  .then(ph => {
    _ph = ph;
    return _ph.createPage();
  })
  .then(page => {
    _page = page;
  })
  .then(() => _page.property('localToRemoteUrlAccessEnabled', true))
  .then(() => _page.property('paperSize', o.paperSize))
  .then(() => _page.property('zoomFactor', o.zoomFactor))
  .then(() => _page.property('viewportSize', {
    width: o.width,
    height: o.height
  }))
  .then(() => _page.property('content', o.content))
  .then(() => {
    return _page.on('onLoadFinished', () => {
      _page.render(
        o.output, {
          format: o.format,
          quality: o.quality
        }
      );
      _ph.exit();
    });
  })
  .catch((err) => {
    console.log(err)
    _ph.exit();
  });
};
