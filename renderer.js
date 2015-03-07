var phantom = require('phantom'),
       path = require('path');

exports.render = function(o, cb){
  var content    = o.content,
      output     = o.output,
      values     = o.values     || {},
      width      = o.width      || 2550, //8.5 in * 300 dpi
      height     = o.height     || 3300, //11 in * 300 dpi
      paperSize  = o.paperSize  || { format: 'Letter', orientation: 'Landscape', margin: 0 }
      quality    = o.quality    || 100,
      zoomFactor = o.zoomFactor || 4.167,
      format     = o.format     || 'png';

  phantom.create(function(ph){
    ph.createPage(function(page){
      page.set('localToRemoteUrlAccessEnabled', true, function(){
        page.set('paperSize', paperSize, function(){
          page.set('zoomFactor', zoomFactor, function(){
            page.set('viewportSize', {
              width: width,
              height: height
            }, function(){
              page.setContent(content);
              page.set('onResourceRequested', function(request) {
                console.log('Request ' + JSON.stringify(request, undefined, 4));
              });
              page.set('onLoadFinished', function(){
                page.render(output, {
                  format: format,
                  quality: quality
                }, function(){
                  ph.exit();
                });
              });
            });
          });
        });
      });
    });
  });
};
