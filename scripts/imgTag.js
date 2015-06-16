hexo.extend.tag.register('responsive', function(args){

  var src = '',
      template = '',
      alt = '';

  for (var i = 0; i < args.length; i++) {

    if(args[i].indexOf('alt=') >= 0){
      alt = args[i].replace('alt=', '').trim();
      console.log(alt);
    }
  };

  if(args[0] === "mobile") {
    src = args[1];
    src = src.split(',');

    console.log('dva vedle sebe mobile rozlozeni');
    for (var o = 0; o < src.length; o++) {
      source = srcSuffix(src[o]);
      template +=  '<div class="beside mobile"><div class="unknown-ratio-container">'+
                    '<img class="lazyload container-page"'+
                      'data-src="'+source[0]+source[1]+'"'+
                      'data-srcset="'+source[0]+'@2x'+source[1]+' 2000w, '+source[0]+source[1]+' 1280w, '+source[0]+'@small'+source[1]+' 800w,"'+
                      'sizes="100%"'+
                      'alt="'+alt+'"></div></div>';
    };

  } else {
    src = args[0];
    src = src.split(',');

    if(src.length > 1){
      console.log('dva vedle sebe');
      for (var o = 0; o < src.length; o++) {
        source = srcSuffix(src[o]);
        template +=  '<div class="beside"><div class="unknown-ratio-container">'+
                      '<img class="lazyload container-page"'+
                        'data-src="'+source[0]+source[1]+'"'+
                        'data-srcset="'+source[0]+'@2x'+source[1]+' 2000w, '+source[0]+source[1]+' 1280w, '+source[0]+'@small'+source[1]+' 800w,"'+
                        'sizes="100%"'+
                        'alt="'+alt+'"></div></div>';
      };
    } else {
      src = srcSuffix(args[0]);

      template =  '<div class="unknown-ratio-container">'+
                  '<img class="lazyload container-page"'+
                    'data-src="'+src[0]+src[1]+'"'+
                    'data-srcset="'+src[0]+'@2x'+src[1]+' 2000w, '+src[0]+src[1]+' 1280w, '+src[0]+'@small'+src[1]+' 800w,"'+
                    'sizes="100%"'+
                    'alt="'+alt+'"></div>';
    }
  }

  function srcSuffix(src){
    suffix = src.match(/\.(?:jpg|gif|png|jpeg)/g) || false;
    src = src.replace(suffix[0], '');
    return [src, suffix];
  };

  return template;
});


