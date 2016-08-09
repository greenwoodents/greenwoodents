hexo.extend.tag.register('responsive', function(args,content){
  var src = '',
      template = '',
      alt = content || false,
      ratio,
      id;

  if(args[0] === "mobile") {
    ratio = calcRatio(args[1]);
    console.log(ratio);
    src = args[2];
    src = src.split(',');

    for (var o = 0; o < src.length; o++) {
      idn = "ent" + new Date().getTime();
      source = srcSuffix(src[o]);
      template +=  '<style>#'+id+':after { padding-bottom: '+ ratio +'%; }</style>'+
                   '<div class="beside mobile"><div  id="'+ id +'" class="ratio-container">'+
                    '<img class="lazyload container-page"'+
                      'data-src="'+source[0]+source[1]+'"'+
                      'data-srcset="'+source[0]+'@2x'+source[1]+' 2000w, '+source[0]+source[1]+' 1280w, '+source[0]+'@small'+source[1]+' 800w, sizes="100%"'+
                      'alt="'+alt+'"></div></div>';
    };

  } else {
    ratio = calcRatio(args[0]);
    src = args[1];
    src = src.split(',');

    console.log(ratio, src);
    console.log(src.length);

    if(src.length > 1){
      for (var o = 0; o < src.length; o++) {
        id = "ent" + new Date().getTime();
        source = srcSuffix(src[o]);
        template += '<style>#'+id+':after { padding-bottom: '+ ratio +'%; }</style>'+
                    '<div class="beside"><div id="'+ id +'" class="ratio-container">'+
                      '<img class="lazyload container-page"'+
                        'data-src="'+source[0]+source[1]+'"'+
                        'data-srcset="'+source[0]+'@2x'+source[1]+' 2000w, '+source[0]+source[1]+' 1280w, '+source[0]+'@small'+source[1]+' 800w, sizes="100%"'+
                        'alt="'+alt+'"></div></div>';
      };
    } else {
      id = "ent" + new Date().getTime();
      ratio = calcRatio(args[0]);
      src = srcSuffix(args[1]);

      console.log(id);

      template =  '<style>#'+id+':after { padding-bottom: '+ ratio +'%; }</style>'+
                  '<div class="ratio-container" id="'+ id +'" >'+
                    '<img class="lazyload container-page"'+
                      'data-src="'+src[0]+src[1]+'"'+
                      'data-srcset="'+src[0]+'@2x'+src[1]+' 2000w, '+src[0]+src[1]+' 1280w, '+src[0]+'@small'+src[1]+' 800w, sizes="100%"'+
                      'alt="'+alt+'"></div>';
      console.log(template);
    }
  }

  function srcSuffix(src){
    suffix = src.match(/\.(?:jpg|gif|png|jpeg)/g) || false;
    src = src.replace(suffix[0], '');
    return [src, suffix];
  };

  function calcRatio(number){
    console.log(number);
    var numbers = number.split(':');
    var finalNumber = (numbers[0] / numbers[1]) * 100
    console.log(finalNumber);
    return finalNumber;
  };

  return template;
}, {ends: true});
