
$(document).ready(function () {
  
  // Home Banner
  $(document).on('click', '#shopify-section-1625068259ec5d2342', function () {
    window.location.href = '/collections/topper';
  });
  
  // Show cart popup
  if (window.location.href.indexOf('#cart') >= 0) {
    $('.cart-popup').addClass('active');
  }

  // Product gallery
  $('.product-images__slider').slick({
    infinite: false,
    asNavFor: '.product-thumbs__slider'
  });
  $('.product-thumbs__slider').slick({
    infinite: false,
    asNavFor: '.product-images__slider',
    slidesToShow: 8,
    slidesToScroll: 8,
    arrows: false,
    focusOnSelect: true,
    centerMode: false
  });

 
/* 
  $(document).on('click', '.product-single__thumbnails-item', function() {
    $('.product-images__slider').slick('slickGoTo', $(this).index());
  });
  $(document).on('afterChange', '.product-images__slider', function(event, slick, currentSlide){
    $('.product-single__thumbnails-item:nth-child(' + (currentSlide + 1) +') img').trigger('click');
  });
  */

  // Mattress - rich text with tabs
  $(document).on('click', '.textTabs__title__item', function(e) {
    var index = $(this).attr('data-index');
    var $itemTitle = $('.textTabs__title__item[data-index="' + index + '"]');
    var $itemContent = $('.textTabs__content__item[data-index="' + index + '"]');
    if ($itemTitle.length === 0 || $itemTitle === 0) {
      return;
    }
    e.preventDefault();
    $('.textTabs__title__item.active').removeClass('active');
    $('.textTabs__content__item.active').removeClass('active');
    $itemTitle.addClass('active');
    $itemContent.addClass('active');
  });

  // Mattress - product item
  $(document).on('click', '.product-item .chevron', function(e) {
    var $item = $(this).parents('.product-item');
    if ($item.length === 0) {
      return;
    }
    e.preventDefault();
    if ($item.hasClass('product-item--active')) {
      $item.removeClass('product-item--active');
      $item.find('.product-item__hover').css('max-height', '0');
    }
    else {
      $item.addClass('product-item--active');
      console.log($item.find('.product-item__hover')[0].scrollHeight + 50);
      console.log($item.find('.product-item__content').height() + 50);
      var max_height = Math.max($item.find('.product-item__hover')[0].scrollHeight + 50, $item.find('.product-item__content').height() + 50);
      $item.find('.product-item__hover').css('max-height', max_height);
    }
  });

  // Navigation - active status
  $('.mainMenu .nav-link').each( function(){
    if ($(this).attr('href') == document.location.pathname) {
      $(this).parent().addClass('active');
    };
  });

  // Sticky nav - align center
  if (document.querySelector('.mobile-sticky') != null) {
    if (document.querySelector('.mobile-sticky').scrollWidth > document.querySelector('.mobile-sticky').clientWidth && $('.mobile-sticky__item.active').length) {
      var leftpos = (document.querySelector('.mobile-sticky').clientWidth - 160) / 2;
      var scrollpos = 0;
      if (document.querySelector('.mobile-sticky__item.active').offsetLeft > leftpos) {
        scrollpos = Math.min(document.querySelector('.mobile-sticky').scrollWidth - document.querySelector('.mobile-sticky').clientWidth, document.querySelector('.mobile-sticky__item.active').offsetLeft - leftpos);
      }
      document.querySelector('.mobile-sticky').scrollLeft = scrollpos;
    }
  }

  // Product page - Widget
  $(document).on('click', '.product-colors__active', function(e) {
    $(this).toggleClass('active');
    var $colors = $(this).parents('.product-colors');
    var $dropdown = $colors.find('.product-colors__dropdown');
    if ($dropdown.length == 0) {
      return;
    }
    e.preventDefault();
    if ($dropdown.hasClass('active')) {
      $dropdown.removeClass('active');
      $dropdown.css('max-height', '0px');
    }
    else {
      var max_height = $dropdown.find('.product-colors__dropdown__inner').height() + 1;
      $dropdown.addClass('active');
      $dropdown.css('max-height', max_height);
    }
  });

  // Schlafberatung Contact form toggle
  $(document).on('click', '.js-toggle-contact', function() {
    $('.contact-form--sch').toggleClass('active');
  });

  $(document).on('change', '.contact-form--sch .form__checkbox', function() {
    if ($(this).prop('checked') == true) {
      $('.contact-form--sch button').removeClass('button--disabled');
    }
    else {
      $('.contact-form--sch button').addClass('button--disabled');
    }
  })

  $(document).on('click', '.product-colors__dropdown .product-colors__item', function(e) {
    var $colors = $(this).parents('.product-colors');
    var color = $(this).data('color');
    $colors.find('.product-colors__active .product-colors__item').remove();
    $colors.find('.product-colors__active').append($(this).wrap('<p/>').parent().html());
    $colors.find('.product-colors__item.active').removeClass('active');
    /*
    $colors.find('.product-colors__item.product-colors__item--1').removeClass('product-colors__item--1');
    $colors.find('.product-colors__item.product-colors__item--2').removeClass('product-colors__item--2');
    */
    $colors.find('.product-colors__item[data-color="' + color + '"]').addClass('active');
    $colors.find('.product-colors__active').removeClass('active');
    $colors.find('.product-colors__dropdown').removeClass('active');
    $colors.find('.product-colors__dropdown').css('max-height', '0px');

    /*
    var count = 0;
    $colors.find('.product-colors__more .product-colors__item').each(function() {
      if (!$(this).hasClass('active')) {
        count ++;
        $(this).addClass('product-colors__item--' + count);
      }
    });
    */

    var left = $('.product-colors__left .product-colors__active .product-colors__item').attr('data-color');
    var right = $('.product-colors__right .product-colors__active .product-colors__item').attr('data-color');
    var size = parseInt($('#SingleOptionSelector-0').val().split('x')[0]);

    if (size >= 160) {
      if ($('.product-switch input').prop('checked') == true) {
        $('#SingleOptionSelector-2').val(left + '_' + right);
      }
      else {
        $('#SingleOptionSelector-2').val(left + '_' + left);
      }
      $('#SingleOptionSelector-2').trigger('change');
    }
    else {
      $('#SingleOptionSelector-1').val(left);
      $('#SingleOptionSelector-1').trigger('change');
    }
  });

  $(document).on('click', '.product-options__item', function(e) {
    if (!$(this).hasClass('product-options__item--active')) {
      $('.product-options__item--active').removeClass('product-options__item--active');
      $(this).addClass('product-options__item--active');
      $(this).parent().removeClass('active');
      if ($(this).data('option') == 'right') {
        $(this).parent().addClass('active');
        $('.product-colors__left').removeClass('product-colors--active');
        $('.product-colors__right').addClass('product-colors--active');
      }
      else {
        $('.product-colors__left').addClass('product-colors--active');
        $('.product-colors__right').removeClass('product-colors--active');
      }
    }
  });

  // Product page - variant change
  $(document).on('change', '#SingleOptionSelector-0', function(e) { // size

    if ($('#SingleOptionSelector-1').length && $('#SingleOptionSelector-2').length) {
      var val = parseInt($(this).val().split('x')[0]);
      if (val >= 160) {
        if ($('.product-switch input').prop('checked') == true) {
          $('.product-options').removeClass('hide');
        }
        else {
          if (!$('.product-options').hasClass('hide')) {
            $('.product-options').addClass('hide');
          }
        }
        $('#SingleOptionSelector-1').val('-');
        if (!$('.product-options-wrapper').hasClass('active')) {
          $('.product-options-wrapper').addClass('active');
        }
        if ($('#SingleOptionSelector-2').val().indexOf('-') >= 0) {
          var left = $('.product-colors__left .product-colors__active .product-colors__item').attr('data-color');
          var right = $('.product-colors__right .product-colors__active .product-colors__item').attr('data-color');
          if ($('.product-switch input').prop('checked') == true) {
            $('#SingleOptionSelector-2').val(left + '_' + right);
          }
          else {
            $('#SingleOptionSelector-2').val(left + '_' + left);
          }
        }

        $('#SingleOptionSelector-2').trigger('change');
        $('.product-switch').removeClass('hide');
      }
      else {
        $('#SingleOptionSelector-2').val('-');
        if (!$('.product-options').hasClass('hide')) {
          $('.product-options').addClass('hide');
        }

        if ($('#SingleOptionSelector-1').val().indexOf('-') >= 0) {
          var left = $('.product-colors__left .product-colors__active .product-colors__item').attr('data-color');
          $('#SingleOptionSelector-1').val(left);
        }
        $('.product-options-wrapper').removeClass('active');

        $('#SingleOptionSelector-1').trigger('change');
        if (!$('.product-switch').hasClass('hide')) {
          $('.product-switch').addClass('hide');
        }
      }
    }
  });

  // Product page - qty change
  $(document).on('change', '.js-product-qty__selector', function() {
    if ($('#product-bundle__check').length > 0) { // Bundle option exists
      var val = parseInt($(this).val());
      if (val > 1) {
        $('#product-bundle__check').prop('checked', true);
      
        // Update price
        var $regularPrice = $('[data-regular-price]');
        var regularPrice = parseFloat($regularPrice.attr('data-price'));
        var discount = parseFloat($regularPrice.attr('data-discount'));
        var new_price = 0.0, new_discount = 0.0;
        if ($('.product-price__compare').length > 0) {
          var $comparePrice = $('[data-compare-price]');
          var comparePrice = parseFloat($comparePrice.attr('data-price'));
          new_discount = 0 - discount - parseFloat($comparePrice.attr('data-discount'));
          new_price = parseFloat($comparePrice.attr('data-price')) * (100.0 + new_discount) / 100.0;
          $('.product-price__unit__left').text(parseInt(new_discount) + '%');
          $('.product-price__unit__right').text('Ersparnis: ' + theme.Currency.formatMoney(comparePrice - new_price, theme.moneyFormat));
        }
        else {
          new_price = regularPrice * (100.0 - discount) / 100.0;
        }
        $('[data-regular-price]').text(theme.Currency.formatMoney(new_price, theme.moneyFormat));        
      }
      else {
        $('#product-bundle__check').prop('checked', false);
      
        // Update price
        var $regularPrice = $('[data-regular-price]');
        var new_price = parseFloat($regularPrice.attr('data-price'));
        $('[data-regular-price]').text(theme.Currency.formatMoney(new_price, theme.moneyFormat));
        if ($('.product-price__compare').length > 0) {
          var $comparePrice = $('[data-compare-price]');
          var comparePrice = parseFloat($comparePrice.attr('data-price'));
          $('.product-price__unit__left').text('-' + $comparePrice.attr('data-discount') + '%');
          $('.product-price__unit__right').text('Ersparnis: ' + theme.Currency.formatMoney(comparePrice - new_price, theme.moneyFormat));
        }
      }
    }
  });
  
  // Product page - bundle option checkbox
  $(document).on('change', '.js-product-bundle__check', function() {
    var val = $(this).prop('checked');
    if (val) {
      $('.product-qty__selector').val(2);
      
      // Update price
      var $regularPrice = $('[data-regular-price]');
      var regularPrice = parseFloat($regularPrice.attr('data-price'));
      var discount = parseFloat($regularPrice.attr('data-discount'));
      var new_price = 0.0, new_discount = 0.0;
      if ($('.product-price__compare').length > 0) {
        var $comparePrice = $('[data-compare-price]');
        var comparePrice = parseFloat($comparePrice.attr('data-price'));
        new_discount = 0 - discount - parseFloat($comparePrice.attr('data-discount'));
        new_price = parseFloat($comparePrice.attr('data-price')) * (100.0 + new_discount) / 100.0;
        $('.product-price__unit__left').text(parseInt(new_discount) + '%');
        $('.product-price__unit__right').text('Ersparnis: ' + theme.Currency.formatMoney(comparePrice - new_price, theme.moneyFormat));
      }
      else {
        new_price = regularPrice * (100.0 - discount) / 100.0;
      }
      $('[data-regular-price]').text(theme.Currency.formatMoney(new_price, theme.moneyFormat)); 
    }
    else {
      $('.product-qty__selector').val(1);
      
      // Update price
      var $regularPrice = $('[data-regular-price]');
      var new_price = parseFloat($regularPrice.attr('data-price'));
      $('[data-regular-price]').text(theme.Currency.formatMoney(new_price, theme.moneyFormat));
      if ($('.product-price__compare').length > 0) {
        var $comparePrice = $('[data-compare-price]');
        var comparePrice = parseFloat($comparePrice.attr('data-price'));
        $('.product-price__unit__left').text('-' + $comparePrice.attr('data-discount') + '%');
        $('.product-price__unit__right').text('Ersparnis: ' + theme.Currency.formatMoney(comparePrice - new_price, theme.moneyFormat));
      }
    }
  });
  
  // Cart - bundle option checkbox
  $(document).on('change', '.js-cart-item__bundle__check', function() {
    var val = $(this).prop('checked');
    if (val) {
      $(this).parents('.cart-popup__item').find('.cart-popup__item__qty select').val(2);
      $(this).parents('.cart-popup__item').find('.cart-popup__item__qty select').trigger('change');
      //updateCart();
    }
    else {
      $(this).parents('.cart-popup__item').find('.cart-popup__item__qty select').val(1);
      $(this).parents('.cart-popup__item').find('.cart-popup__item__qty select').trigger('change');
      //updateCart();
    }
  });

  // Product page - switch change
  $(document).on('change', '.product-switch input', function(e) {
    var val = $(this).prop('checked');
    if (val == true) {
      $('.product-options-wrapper .product-options').removeClass('hide');
    }
    else {
      $('.product-options-wrapper .product-options').addClass('hide');
      if ($('.product-colors__right').hasClass('product-colors--active')) {
        $('.product-options__item[data-option="left"]').trigger('click');
        $('.product-colors__left .product-colors__dropdown .product-colors__item.active').trigger('click');
      }
    }
  });

  $('#SingleOptionSelector-0').trigger('change');

  // Product page - Add to cart
  $(document).on('click', '.js-product-add', function(e) {
    var $form = $('.product-form');
    var id = $form.find('#ProductSelect-product-template').val();
    var qty = 1;
    if ($('.product-qty__selector').length) {
      qty = parseInt($('.product-qty__selector').val());
    }
    var $this = $(this);
    if ($form.length === 0) {
      return;
    }
    e.preventDefault();
    $this.addClass('loading');
    $.ajax({
      type: 'POST',
      url: '/cart/add.js',
      data: {
        id: id,
        quantity: qty
      },
      dataType: "json",
      success: function(data) {
        $this.removeClass('loading');
        updateCart();        
        obApi('track', 'AddToCart', { orderValue: data.price, currency: 'EUR' });
        pintrk('track', 'addtocart', { value: data.price, order_quantity: qty, currency: 'EUR' });
      },
      error: function() {
        $this.removeClass('loading');
        updateCart();
      }
    });
  });

  // Update quantity
  $(document).on('change', '.cart-popup__item__qty select', function() {
    // Bundle checkbox
    if ($(this).parents('.cart-popup__item').find('.cart-item__bundle__check').length > 0) {
      if ($(this).val() > 1) {
        $(this).parents('.cart-popup__item').find('.cart-item__bundle__check').prop('checked', true);
      }
      else {
        $(this).parents('.cart-popup__item').find('.cart-item__bundle__check').prop('checked', false);
      }
    }
    
    var _ = $(this);
    var index = _.closest('.cart-popup__item').index(),
        indexget = index+1;
    var params = {
      type: "get",
      dataType: "json",
      url: '/cart/change?line='+indexget+'&quantity='+_.val(),
      success: function(data){
        var m = theme.Currency.formatMoney(data.items[index].line_price, theme.moneyFormat),
            o = _.closest('.cart-popup__item').find('.cart-popup__item__price span');
        o.text(m);
        m = theme.Currency.formatMoney(data.total_price, theme.moneyFormat);
        console.log(m);
        o = $('.cart-popup__box').find('.cart-popup__subtotal__price span');
        o.text(m);

        var cart_count = data.item_count;
        $('.cart-count').text(cart_count);
        $('.cart-popup__item_count').text('(' + cart_count + ')');
      },
      error: function(XMLHttpRequest, textStatus) {
        console.log('some ajax error with count');
      }
    }
    $.ajax(params);
  });

  // Remove item
  $(document).on('click', '.js-deleteitem-ajax', function(e) {
    $(this).css('pointer-events', 'none');

    e.preventDefault();

    var lineItem = $(this).closest('.cart-popup__item');
    var index = lineItem.index()+1;
    var href = $(this).attr('href');

    var params = {
      type: "get",
      dataType: "json",
      url: href,
      success: function(data){
        lineItem.fadeOut(400, function() {
          $(this).remove();

          if(data.item_count == 0) {
            $('.cart-popup__box').addClass('hide');
            $('.cart-popup__empty').removeClass('hide');
          }

          $('.cart-popup .js-deleteitem-ajax').length && $('.cart-popup .js-deleteitem-ajax').css('pointer-events', 'unset');

          m = theme.Currency.formatMoney(data.total_price, theme.moneyFormat);
          o = $('.cart-popup__box').find('.cart-popup__subtotal__price span');
          o.text(m);

          var cart_count = data.item_count;
          $('.cart-count').text(cart_count);
          $('.cart-popup__item_count').text('(' + cart_count + ')');
          if (cart_count == 0) {
            $('.cart-count').removeClass('cart-count--active');
          }
          else {
            if (!$('.cart-count').hasClass('cart-count--active')) {
              $('.cart-count').addClass('cart-count--active');
            }
          }
        });
      },
      error: function(XMLHttpRequest, textStatus) {
        console.log('some ajax error with delete');
        $('.cart-popup .js-deleteitem-ajax').length && $('.cart-popup .js-deleteitem-ajax').css('pointer-events', 'unset');
      }
    }
    $.ajax(params);
  });
  
  // Subscribe form
  $(document).on('submit', '.footer__item form', function() {
    fbq('track', 'Subscribe');
    obApi('track', 'Subscribe');
  });

  // Update cart
  function updateCart() {
    $.get('/cart?view=ajax', function(data) {
      $('.cart-popup').html(data);

      var cart_count = parseInt($('.cart-popup__item_count').text().replace('(', '').replace(')', ''));
      $('.cart-count').text(cart_count);
      if (cart_count == 0) {
        $('.cart-count').removeClass('cart-count--active');
      }
      else {
        if (!$('.cart-count').hasClass('cart-count--active')) {
          $('.cart-count').addClass('cart-count--active');
        }
      }

      if (!$('.cart-popup').hasClass('active')) {
        if (!$('.header__icons .cart-icon').hasClass('active')) {
          $('.header__icons .cart-icon').addClass('active');
          setTimeout(function() {
            $('.header__icons .cart-icon').removeClass('active');
          }, 5000);
        }
      }

      
      if (!$('.cart-popup').hasClass('active')) {
        setTimeout(function(){$('.cart-popup').addClass('active')}, 500);
      }
     
    });
  }

  // Add upsell
  $(document).on('click', '.js-cart-upsell__add', function() {
    var id = $(this).data('id');
    $.ajax({
      type: 'POST',
      url: '/cart/add.js',
      data: {
        id: id,
        quantity: 1
      },
      dataType: "json",
      success: function(data) {
        updateCart();
        obApi('track', 'AddToCart', { orderValue: data.price, currency: 'EUR' });
      },
      error: function() {
        updateCart();
      }
    });
  });

  $(document).on('click', '.js-cart-popup__checkout', function() {
    obApi('track', 'InitiateCheckout');
    window.location.href = '/checkout';
  });

  // Mobile Nav menu
  $(document).on('click', '.header__hamburger', function () {
    if ($(this).hasClass('active')) {
      $(this).removeClass('active');
      $('html').removeClass('disable-scroll');
      $('.mobile-nav').removeClass('active');
      if (!$('body').hasClass('body--dark')) {
        $('.header').removeClass('header--invert');
      }
    }
    else {
      $(this).addClass('active');
      $('html').addClass('disable-scroll');
      $('.mobile-nav').addClass('active');
      if (!$('body').hasClass('body--dark')) {
        $('.header').addClass('header--invert');
      }
    }
  });

  $(window).on('resize', function() {
    $('.header__hamburger.active').trigger('click');
  });

  // Rich text with selector
  $(document).on('change', '.section__selector select', function(e) {
    var $img = $(this).parent().find('img');
    var img_url = $(this).val();
    $img.attr('src', img_url);
  });

  // Cart popup
  $(document).on('click', '.js-cart-trigger', function() {
    $('.header__hamburger.active').trigger('click');
    $('.cart-popup').addClass('active');
    $('.header__icons .cart-icon').removeClass('active');
    $('body').addClass('disable-scroll');
  });

  $(document).on('click', '.js-cart-popup__overlay', function() {
    $(this).parents('.cart-popup.active').removeClass('active');
    $('body').removeClass('disable-scroll');
  });

  $(document).on('click', '.js-cart-popup__close', function () {
    $(this).parents('.cart-popup.active').removeClass('active');
    $('body').removeClass('disable-scroll');
  });
  
  // Video popup  
  $(document).on('click', '.js-video-trigger', function() {
    var video_url = $(this).data('video');
    $('.youtube-wrapper').append('<iframe class="youtube-embed" src="' + video_url + '?enablejsapi=1&amp;rel=0&amp;showinfo=0&amp;modestbranding=1&amp;autoplay=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen=""></iframe>');
    $('.video-popup').addClass('active');
    $('body').addClass('disable-scroll');
  });

  $(document).on('click', '.js-video-popup__overlay', function() {
    $(this).parents('.video-popup.active').removeClass('active');
    $('.youtube-wrapper iframe').remove();
    $('body').removeClass('disable-scroll');
  });

  $(document).on('click', '.js-video-popup__close', function () {
    $(this).parents('.video-popup.active').removeClass('active');
    $('.youtube-wrapper iframe').remove();
    $('body').removeClass('disable-scroll');
  });

  // Smooth Scroll Effect
  // ====================

  $(document).on('click', 'a[href^="#"]', function(e) {
    var id = $(this).attr('href');
    var $id = $(id);
    if ($id.length === 0) {
        return;
    }
    e.preventDefault();
    var pos = $id.offset().top - 100;
    $('body, html').animate({scrollTop: pos});
  });

  // Table Of Content Component
  // ==========================

  var headings = $('.article__body h2, .article__body h3');
  var tocContainer = $('.toc__wrapper');
  var toc = $('.toc');
  
  if (toc) {

    // create an id for headings

    headings.each(function() {
      var string = $(this).text().replace(/[^\w\s]|_/g, '').replace(/\s+/g,'-').toLowerCase();
      $(this).attr('id', string);
    });

    // generate toc

    String.prototype.repeat = function(num) {
      if(!num) return;
      return new Array(num + 1).join(this);
    }

    var ToC =
    '<p class="toc__title">Inhaltsverzeichnis</p>' +
      '<nav role="navigation">' + 
        '<ul class="toc__menu">';
    
    var newLine, element, title, link, level, baseLevel;
    
    headings.each(function() {
    
      element = $(this);
      title = element.text();
      link = '#' + element.attr('id');
     
      var prevLevel = level || 0;
      level = this.nodeName.substr(1);
      if (!baseLevel) {
        baseLevel = level;
      }
     
      if (prevLevel == 0) {
        newLine = '<li>';
      } else if (level == prevLevel) {
        newLine = '</li><li>';
      } else if (level > prevLevel) {
        newLine = '<ul class="toc__submenu"><li>'.repeat(level - prevLevel);
      } else if (level < prevLevel) {
        newLine = '</li></ul>'.repeat(prevLevel - level) +
        '</li><li>';
      }

      newLine += '<a class="toc__link" href="' + link + '">' + title + '</a>';
    
      ToC += newLine;
    
    });
    
    ToC += '</li></ul>'.repeat(level - baseLevel) +
          '</li>' +
        '</ul>' +
      '</nav>';

    var renderToc = function () {
      tocContainer.prepend(ToC);
    }
  }


  var addMarginToptoShareIcons = function () {

    var shareBlock = document.querySelector('[share]');
    var toc = document.querySelector('.toc__wrapper');
  
    if (shareBlock && window.matchMedia('(min-width: 992px)').matches) {
      shareBlock.style.marginTop = toc.offsetHeight + 128 + 'px';
    }
  }

  var observer = new IntersectionObserver(function (entries) {
		entries.forEach(function (entry) {

      var id = entry.target.getAttribute('id');
      var tocItem = document.querySelector('.toc__menu li a[href="#'+id+'"]');
      var submenu = document.querySelector('.toc__menu li a[href="#'+id+'"]').parentElement.parentElement;
      var tocItemParent = tocItem.parentNode;

			if (entry.intersectionRatio > 0) {
        tocItem.classList.add('is--active');
        tocItemParent.classList.add('is--active');
        if (submenu.classList.contains('toc__submenu')) {
          submenu.classList.add('is--visible');
        }
			} else {
        tocItem.classList.remove('is--active');
        tocItemParent.classList.remove('is--active');
        if (submenu.classList.contains('toc__submenu')) {
          submenu.classList.remove('is--visible');
        }
			}
		});
  });

  var toggleToc = function (event) {
  
    /**
     *  Hide/show Toc on click.
     */

    var toc = document.querySelector('.toc');
    var tocmenu = document.querySelector('.toc__wrapper');
  
    var toggleContainer = event.target.closest('.toc__toggle');
    if (!toggleContainer) return;
  
    event.preventDefault();

    toggleContainer.classList.toggle('is--opened');
    tocmenu.classList.toggle('is--opened');
    toc.classList.toggle('bottom-0');
  };

  var closeToc = function (event) {
  
    /**
     *  Hide/show Toc on click.
     */

    var toc = document.querySelector('.toc');
    var tocmenu = document.querySelector('.toc__wrapper');
    var toggle = document.querySelector('.toc__toggle');

    var tocItem = event.target.closest('.toc__link');
    if (!tocItem) return;
  
    event.preventDefault();

    if (window.matchMedia('(max-width: 992px)').matches) {
      toggle.classList.remove('is--opened');
      tocmenu.classList.remove('is--opened');
      toc.classList.remove('bottom-0');
    }
  };

  // fire the following functions when Toc is rendered

  $.when(renderToc()).then(function() {

    // set aside social icons margin-top
    addMarginToptoShareIcons();
    window.addEventListener('resize', addMarginToptoShareIcons);
    window.addEventListener('scroll', addMarginToptoShareIcons);

    // hide/show toc on click
    document.addEventListener('click', toggleToc, false);
    document.addEventListener('click', closeToc, false);

    // Track all headings that have an 'id' applied
    document.querySelectorAll('.article__body h2, .article__body h3').forEach(function (heading) {
      observer.observe(heading);
    });
  })

  // Menu Scroll Component
  // =====================

  $('button[data-action="scroll-right"]').click(function () {
    $(this).parent().animate({
      scrollLeft: "+=100px"
    }, 200);
  });
  $('button[data-action="scroll-left"]').click(function () {
    $(this).parent().animate({
      scrollLeft: "-=100px"
    }, 200);
  });

  var lastScrollTop = 0;
  $(window).scroll(function () {
    var st = $(this).scrollTop();
    if (st < lastScrollTop && st > 0) {
      if (!$('body').hasClass('show-logo')) {
        $('body').addClass('show-logo');
      }
    }
    else {
      $('body').removeClass('show-logo');
    }
    lastScrollTop = st;
    if ($(this).scrollTop() > 100) {
      $('body').addClass('fixed-header');
      setTimeout(function () {
          $('.header').addClass('show-in');  
      }, 200)
    } else {
      $('body').removeClass('fixed-header');
      $('.header').removeClass('show-in');
    }
  
    if ($(this).scrollTop() > 900) {
      if (!$('#scrollTop').hasClass('active')) {
        $('#scrollTop').fadeIn();
        $('#scrollTop').addClass('active');
        $('.mobile-sticky__item--chevron').fadeIn();
        $('.mobile-sticky__item--chevron').addClass('active');
      }
    } else {
      if($('#scrollTop').hasClass('active')) {
        $('#scrollTop').fadeOut();
        $('#scrollTop').removeClass('active');
        $('.mobile-sticky__item--chevron').fadeOut();
        $('.mobile-sticky__item--chevron').removeClass('active');
      }
    }
  
    var $window = $(this);
    var submenuScroll = $('.submenu [menu-scroll]');

    if (submenuScroll) {
      var sections = $('.section-check');
      var nav = $('.submenu__list');
      var nav_height = nav.outerHeight();
      var cur_pos = $window.scrollTop();
    
      sections.each(function () {
        var $section = $(this);
        var sectionTop = ($section.offset().top - 300) - nav_height;
        var sectionBottom = (sectionTop + $section.outerHeight() - 300);
    
        if (cur_pos >= sectionTop && cur_pos <= sectionBottom) {
          nav.find('a').removeClass('active');
          sections.removeClass('active');
    
          $section.addClass('active');
          
          var $href = nav.find('a[href="#' + $section.attr('id') + '"]');
          $href.addClass('active');
    
          if ($href.length) {
            var navPosition = submenuScroll.scrollLeft();
            var elemPosition = $($href).offset().left;
            var viewportWidth = $( window ).width();
            var containerWidth = submenuScroll.width();
            var result = (viewportWidth / 2) - (containerWidth / 2);
    
            submenuScroll.stop(1, 1).animate({scrollLeft: navPosition + elemPosition - result - 16}, 800);
          }
        }
      });
    }
      
  })

  // Add submenu items
  // =================

  $('.section-check').each(function(){
    var name = $(this).attr('name');
    var id = $(this).attr('id');

    $('.submenu__list').append('<li class="submenu__item"><a class="submenu__link" href="#'+id+'">'+name+'</a></li>');

    $(window).trigger('scroll');
  });

  // ScrollTop Button Component
  // ==========================

  $('#scrollTop').on('click',function(){
    window.scrollTo({top: 0, behavior: 'smooth'});
  })

  $(document).on('click', '.mobile-sticky__item--chevron', function() {
    window.scrollTo({top: 0, behavior: 'smooth'});
  });

  // Slick Slider Plugin
  // ===================

  var slckSlider = $('.slick-slider');

  if (slckSlider) {
    $('.gallery-slider').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      fade: true
    });
  
    $('.gallery-thumbs').slick({
      slidesToScroll: 1,
      asNavFor: '.gallery-slider',
      dots: true,
      centerMode: true,
      arrows: false,
      focusOnSelect: true
    });
  
    $('.sliding-content').slick({
      infinite: 0,
      dots: true,
      arrows: true
    });
  
    $('.slider-content-one').slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: true,
      arrows: true
    });
  
    $('.f-gallery').slick({
      centerMode: true,
      centerPadding: '50px',
      slidesToShow: 3,
      dots: true,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 3
          }
        },
        {
          breakpoint: 480,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 1
          }
        }
      ]
    });
  
    if($('.f-gallery').length){
      var a = $('.slick-center').offset(); $('.f-gallery .slick-prev').css('left', a.left + 80);$('.f-gallery .slick-next').css('left', a.left + ($('.slick-center').width() * 1.32) - 70);
    }
  }

  // Video Component
  // ===============

  
  $('#shopify-section-rich-text-video .video').find('video').removeAttr('controls');
  $('#shopify-section-rich-text-video .video').click(function () {
    $(this).find('.video__play').remove();
    $(this).find('video')[0].play();
    $(this).find('video').attr('controls', true);
  });
  

});

// Table Of Content Component
// ==========================

var tableOfContent = function () {
  
  /**
   *  Stickyfy and show/hide Toc on scroll and resize.
   */

  var toc = document.querySelector('.toc');
  if (!toc) return;

  window.addEventListener('scroll', function () {
  
    var section = document.querySelector('.section__main');
    var viewportHeight = document.documentElement.clientHeight || window.innerHeight;

    var header = document.querySelector('.header');
    var headerHeight = header.offsetHeight;

    toc.style.top = headerHeight + 'px';
    
    // set toc on desktop on scroll
  
    if (window.matchMedia('(min-width: 992px)').matches) {

      // add sticky when toc bottom is out of viewport
  
      if (toc.getBoundingClientRect().bottom <= 0 && !toc.classList.contains('is--sticky')) {
        if (toc.classList.contains('is--sticky')) return;
        toc.classList.add('is--sticky');
        toc.style.top = headerHeight + 'px';
      }

      // remove sticky when section top is in the viewport
  
      if (section.getBoundingClientRect().top >= 0 && toc.classList.contains('is--sticky')) {
        toc.classList.remove('is--sticky');
        toc.style.top = '0';
      }

      // close sticky toc when section ends
  
      if (section.getBoundingClientRect().bottom <= viewportHeight && toc.classList.contains('is--sticky')) {
        toc.classList.remove('is--sticky');
        toc.style.top = '0';
      }
    }

  });

  // set toc on mobile

  if (window.matchMedia('(max-width: 992px)').matches) {

    var header = document.querySelector('.header');
    var headerHeight = header.offsetHeight;

    // set toc to sticky on mobile

    toc.classList.add('is--sticky');
    toc.style.top = headerHeight + 'px';
  }

  // set toc on resize
  
  window.addEventListener('resize', function() {

    // set toc on mobile on resize
    headerHeight = header.offsetHeight;
  
    if (window.matchMedia('(max-width: 992px)').matches) {

      // set toc to sticky on mobile on resize

      toc.classList.add('is--sticky');
      toc.style.top = headerHeight + 'px';
    }

    // set toc on desktop on resize

    if (window.matchMedia('(min-width: 992px)').matches) {
      var section = document.querySelector('.section__main');

      // remove sticky on desktop on resize

      if (section.getBoundingClientRect().top >= 0 && toc.classList.contains('is--sticky')) {
        toc.classList.remove('is--sticky');
        toc.style.top = '0';
      }
    }
  });

}

tableOfContent();

var addClassNameToNumberSourceReference = function () {

  /**
   *  Add a class name to article anchor links
   *  which refers to a footnote
   */

  var references = document.querySelectorAll('.article__body > p a');
  if (!references) return;

  references.forEach(function (reference) {

    // check if text content of the anchor link is a number

    var number = reference.textContent.match(/\d+/g);

    // if yes add the class

    if (number != null){
      reference.classList.add('ftnref');
    }
  });
};

addClassNameToNumberSourceReference();

// Add invert syles to components in pages with dark background
// ============================================================

var pages = document.querySelectorAll('main[role="main"]');
var body = document.querySelector('body');
var header = document.querySelector('.header');
var tableOfContent = document.querySelector('.toc');
var relatedArticles = document.querySelector('.related');
var shareIcons = document.querySelectorAll('.share');
var accordions = document.querySelectorAll('.accordion');
var sections = document.querySelectorAll('.section', '.section.section--divider');
var infoBoxes = document.querySelectorAll('.infoBox');
var tables = document.querySelectorAll('.table');
var blockquotes = document.querySelectorAll('.blockquote');

for (page = 0; page < pages.length; page++) {

  if (pages[page].classList.contains('page--dark')) {
    body.classList.add('body--dark');
    header.classList.add('header--invert');

    if (tableOfContent) {
      tableOfContent.classList.add('toc--invert');
    }

    if (relatedArticles) {
      relatedArticles.classList.add('related--invert');
    }

    if (accordions) {
      for (accordion = 0; accordion < accordions.length; accordion++) {
        accordions[accordion].classList.add('accordion--invert');
      }
    }

    if (shareIcons) {
      for (shareIcon = 0; shareIcon < shareIcons.length; shareIcon++) {
        shareIcons[shareIcon].classList.add('share--invert');
      }
    }

    if (sections) {
      for (section = 0; section < sections.length; section++) {
        sections[section].classList.add('section--invert');
      }
    }

    if (infoBoxes) {
      for (infoBox = 0; infoBox < infoBoxes.length; infoBox++) {
        infoBoxes[infoBox].classList.add('infoBox--invert');
      }
    }

    if (tables) {
      for (table = 0; table < tables.length; table++) {
        tables[table].classList.add('table--invert');
      }
    }

    if (blockquotes) {
      for (blockquote = 0; blockquote < blockquotes.length; blockquote++) {
        blockquotes[blockquote].classList.add('blockquote--invert');
      }
    }
  }
}

// Gallery Component
// =================

var gallery = document.querySelector('.gallery');
var current = document.querySelector('.gallery #selected');
var thumbs = document.querySelectorAll('.gallery .gallery__thumbs img');
var previous = document.querySelector('[data-toggle="previous"]');
var next = document.querySelector('[data-toggle="next"]');
var slides = document.querySelectorAll('.gallery__thumbs img');
var currentSlide = 0;

var firstItem = thumbs[0];

if (gallery) {

  current.src = firstItem.src;
  current.alt = firstItem.alt;

  var imgActivate = function (e) {

    e.preventDefault();

    // Change current image to source of clicked image
    current.src = e.target.src;

    // Add fadeIn class
    current.classList.add('fade-in');

    // Remove fadeIn class after animation time elapsed
    setTimeout( function () {
      current.classList.remove('fade-in');
    }, 500);
  }

  thumbs.forEach(function (img) { 
    img.addEventListener('click', imgActivate)
  });


  var goToSlide = function (n) {
    currentSlide = (n+slides.length)%slides.length;

    var currentImage = slides[currentSlide];

    // Change current image to source of clicked image
    current.src = currentImage.src;

    // Add fadeIn class
    current.classList.add('fade-in');
  
    // Remove fadeIn class after animation time elapsed
    setTimeout( function () {
      current.classList.remove('fade-in');
    }, 500);
  }
  
  var nextSlide = function () {
    goToSlide(currentSlide+1);
  }
  
  var previousSlide = function () {
    goToSlide(currentSlide-1);
  }
  
  next.addEventListener('click', function() {
    nextSlide();
  });
  
  previous.addEventListener('click', function() {
    previousSlide();
  });
}

// Accordion Component
// ===================

var accordionToggles = document.querySelectorAll('[data-accordion]');
var i;

for (i = 0; i < accordionToggles.length; i++) {

  var label = accordionToggles[i].querySelector('span').textContent;
  var attribute = label.replace(new RegExp(' ', 'g'), '-').replace(/,/g, '').toLowerCase();
  accordionToggles[i].setAttribute('data-nested-control', attribute);

  var panel = accordionToggles[i].nextElementSibling;
  panel.setAttribute('data-nested-content', attribute);

}

for (i = 0; i < accordionToggles.length; i++) {
  accordionToggles[i].addEventListener('click', function() {
    var expanded = this.getAttribute('aria-expanded');

    if (expanded === 'false') {
      this.setAttribute('aria-expanded', 'true');
    } else {
      this.setAttribute('aria-expanded', 'false');
    }
  });
}

// Text Widgets
// ============

var textWidgets = document.querySelectorAll('.textwidget');

var unWrap = function (elem) {

  /**
   *  Remove wrapping <div class="textwidget"> 
   *  of text widget.
   */

  // get the element's parent node
  var parent = elem.parentNode;

  // move all children out of the element
  while (elem.firstChild) parent.insertBefore(elem.firstChild, elem);

  // remove the empty element
  parent.removeChild(elem);
};

if (textWidgets) {
  textWidgets.forEach(function (widget) {
    unWrap(widget);
  });
}

// Form Component
// ==============

// STEPS 1 and 2

var pure = {
  'layers' : ['Memory-Schicht', '5-Zone-Schicht'],
  'size1' : {
    'price' : '999,00',
    'duration' : '16,65'
  },
  'size2' : {
    'price' : '1.099,00',
    'duration' : '18,32'
  },
  'size3' : {
    'price' : '1.629,00',
    'duration' : '27,15'
  },
  'size4' : {
    'price' : '1.999,00',
    'duration' : '33,32'
  },
  'size5' : {
    'price' : '2.099,00',
    'duration' : '34,98'
  }
};

var classic = {
  'layers' : ['Memory-Schicht', 'Latex-Schicht', 'Softness-Schicht'],
  'size1' : {
    'price' : '1.599,00',
    'duration' : '26,65'
  },
  'size2' : {
    'price' : '1.759,00',
    'duration' : '29,32'
  },
  'size3' : {
    'price' : '2.609,00',
    'duration' : '43,48'
  },
  'size4' : {
    'price' : '3.199,00',
    'duration' : '53,32'
  },
  'size5' : {
    'price' : '3.299,00',
    'duration' : '54,98'
  },
  'latex' : {
    'size1' : {
      'price' : '1.669,00',
      'duration' : '27,82'
    },
    'size2' : {
      'price' : '1.839,00',
      'duration' : '30,65'
    },
    'size3' : {
      'price' : '2.729,00',
      'duration' : '45,48'
    },
    'size4' : {
      'price' : '3.339,00',
      'duration' : '55,65'
    },
    'size5' : {
      'price' : '3.439,00',
      'duration' : '57,32'
    }
  }
};

var supreme = {
  'layers' : ['Memory-Schicht', 'Latex-Schicht', 'Softness-Schicht'],
  'size1' : {
    'price' : '1.999,00',
    'duration' : '33,32'
  },
  'size2' : {
    'price' : '2.199,00',
    'duration' : '36,65'
  },
  'size3': {
    'price' : '3.259,00',
    'duration' : '54,32'
  },
  'size4' : {
    'price' : '3.999,00',
    'duration' : '66,65'
  },
  'size5' : {
    'price' : '4.099,00',
    'duration' : '68,32'
  },
  'latex' : {
    'size1' : {
      'price' : '2.069,00',
      'duration' : '34,48'
    },
    'size2' : {
      'price': '2.279,00',
      'duration' : '37,98'
    },
    'size3' : {
      'price' : '3.369,00',
      'duration' : '56,15'
    },
    'size4' : {
      'price' : '4.139,00',
      'duration' : '68,98'
    },
    'size5' : {
      'price' : '4.239,00',
      'duration' : '70,65'
    }
  }
};

var pickSize = document.querySelector('[data-action="pick-size"]');

if (pickSize) {
  var pickSize = document.querySelector('[data-action="pick-size"]').querySelector('select');
  var pickLayer = document.querySelector('[data-action="pick-layer"]').querySelector('select');
  
  var pricePure = document.querySelector('[data-target="price-pure"]');
  var durationPure = document.querySelector('[data-target="duration-pure"]');
  
  var priceClassic = document.querySelector('[data-target="price-classic"]');
  var durationClassic = document.querySelector('[data-target="duration-classic"]');
  
  var priceSupreme = document.querySelector('[data-target="price-supreme"]');
  var durationSupreme = document.querySelector('[data-target="duration-supreme"]');
  
  var sizes = ['90x200', '100x200', '140x200', '160x200', '180x200'];
  
  var updatePriceAfterSizePick = function () {
  
    if (this.value == sizes[0]) {
      pricePure.textContent = pure.size1.price;
      durationPure.textContent = pure.size1.duration;
  
      if (pickLayer && pickLayer.value == 'Latex Schicht [+70€]') {
        priceClassic.textContent = classic.latex.size1.price;
        durationClassic.textContent = classic.latex.size1.duration;
      
        priceSupreme.textContent = supreme.latex.size1.price;
        durationSupreme.textContent = supreme.latex.size1.duration;
      }
  
      else {
        priceClassic.textContent = classic.size1.price;
        durationClassic.textContent = classic.size1.duration;
      
        priceSupreme.textContent = supreme.size1.price;
        durationSupreme.textContent = supreme.size1.duration;
      }
    }
  
    if (this.value == sizes[1]) {
      pricePure.textContent = pure.size2.price;
      durationPure.textContent = pure.size2.duration;
  
      if (pickLayer && pickLayer.value == 'Latex Schicht [+70€]') {
        priceClassic.textContent = classic.latex.size2.price;
        durationClassic.textContent = classic.latex.size2.duration;
      
        priceSupreme.textContent = supreme.latex.size2.price;
        durationSupreme.textContent = supreme.latex.size2.duration;
      }
  
      else {
        priceClassic.textContent = classic.size2.price;
        durationClassic.textContent = classic.size2.duration;
      
        priceSupreme.textContent = supreme.size2.price;
        durationSupreme.textContent = supreme.size2.duration;
      }
    }
  
    if (this.value == sizes[2]) {
      pricePure.textContent = pure.size3.price;
      durationPure.textContent = pure.size3.duration;
  
      if (pickLayer && pickLayer.value == 'Latex Schicht [+70€]') {
        priceClassic.textContent = classic.latex.size3.price;
        durationClassic.textContent = classic.latex.size3.duration;
      
        priceSupreme.textContent = supreme.latex.size3.price;
        durationSupreme.textContent = supreme.latex.size3.duration;
      }
  
      else {
        priceClassic.textContent = classic.size3.price;
        durationClassic.textContent = classic.size3.duration;
      
        priceSupreme.textContent = supreme.size3.price;
        durationSupreme.textContent = supreme.size3.duration;
      }
    }
  
    if (this.value == sizes[3]) {
      pricePure.textContent = pure.size4.price;
      durationPure.textContent = pure.size4.duration;
  
      if (pickLayer && pickLayer.value == 'Latex Schicht [+70€]') {
        priceClassic.textContent = classic.latex.size4.price;
        durationClassic.textContent = classic.latex.size4.duration;
      
        priceSupreme.textContent = supreme.latex.size4.price;
        durationSupreme.textContent = supreme.latex.size4.duration;
      }
  
      else {
        priceClassic.textContent = classic.size4.price;
        durationClassic.textContent = classic.size4.duration;
      
        priceSupreme.textContent = supreme.size4.price;
        durationSupreme.textContent = supreme.size4.duration;
      }
    }
  
    if (this.value == sizes[4]) {
      pricePure.textContent = pure.size5.price;
      durationPure.textContent = pure.size5.duration;
  
      if (pickLayer && pickLayer.value == 'Latex Schicht [+70€]') {
        priceClassic.textContent = classic.latex.size5.price;
        durationClassic.textContent = classic.latex.size5.duration;
      
        priceSupreme.textContent = supreme.latex.size5.price;
        durationSupreme.textContent = supreme.latex.size5.duration;
      }
  
      else {
        priceClassic.textContent = classic.size5.price;
        durationClassic.textContent = classic.size5.duration;
      
        priceSupreme.textContent = supreme.size5.price;
        durationSupreme.textContent = supreme.size5.duration;
      }
    }
  }
  
  var pickLayerSection = document.querySelector('[data-action="pick-layer"]');
  
  if (pickLayerSection) {
    pickLayerSection.style.display = 'none';
  }
  
  var checkboxes = document.querySelectorAll('[data-action="pick-mattress"] input[type="checkbox"]');
  
  var tickBox = function (event) {
    var checkbox = event.target.closest('[data-action="pick-mattress"] input[type="checkbox"]');
    if (!checkbox) return;
  
    checkboxes.forEach(function (box) {
      box.checked = false;
    });
  
    checkbox.checked = true;
  
    updatePriceAfterLayerPick();
  };
  
  var displayLayers = function (event) {
    var checkbox = event.target.closest('[data-action="pick-mattress"] input[type="checkbox"]');
    if (!checkbox) return;
  
    renderLayers(checkbox);
  
    if (checkbox.checked) {
      pickLayerSection.style.display = 'block';
    }
  
    else {
      pickLayerSection.style.display = 'none';
    }
  };
  
  var renderLayers = function (checkbox) {
  
    var container = document.querySelector('select[name="mattress-layer"]');
    if (!container) return;
  
    var layers;
  
    if (checkbox.value == 'Pure Matratze') {
      layers = ['Memory Schicht', '5-Zonen Schicht'];
    } else {
      layers = ['Memory Schicht', 'Latex Schicht [+70€]', 'Softness Schicht'];
    }
  
    var options = Array.prototype.map.call(layers, function (layer) {
      return '<option value="' + layer + '">' + layer + '</option>';
    });
  
    if (container && options.length > 0) {
      container.innerHTML = options.join('');
    }
  }
  
  var updatePriceAfterLayerPick = function () {
  
    var tickedCheckbox = document.querySelector('[data-action="pick-mattress"] input[type="checkbox"]:checked');
    var parent = tickedCheckbox.parentElement.parentElement.parentElement.parentElement;
    var currentPrice = parent.nextElementSibling.querySelector('[data-price]');
    var currentDuration = parent.nextElementSibling.nextElementSibling.querySelector('[data-duration]');
  
    if (!tickedCheckbox) return;
  
    if (this.value == 'Latex Schicht [+70€]') {
  
      if (tickedCheckbox.value == 'Classic Matratze') {
        if (pickSize.value == sizes[0]) {
          currentPrice.textContent = classic.latex.size1.price;
          currentDuration.textContent = classic.latex.size1.duration;
        }
      
        if (pickSize.value == sizes[1]) {
          currentPrice.textContent = classic.latex.size2.price;
          currentDuration.textContent = classic.latex.size2.duration;
        }
      
        if (pickSize.value == sizes[2]) {
          currentPrice.textContent = classic.latex.size3.price;
          currentDuration.textContent = classic.latex.size3.duration;
        }
      
        if (pickSize.value == sizes[3]) {
          currentPrice.textContent = classic.latex.size4.price;
          currentDuration.textContent = classic.latex.size4.duration;
        }
      
        if (pickSize.value == sizes[4]) {
          currentPrice.textContent = classic.latex.size5.price;
          currentDuration.textContent = classic.latex.size5.duration;
        }
      }
  
      if (tickedCheckbox.value == 'Supreme Matratze') {
  
        if (pickSize.value == sizes[0]) {
          currentPrice.textContent = supreme.latex.size1.price;
          currentDuration.textContent = supreme.latex.size1.duration;
        }
      
        if (pickSize.value == sizes[1]) {
          currentPrice.textContent = supreme.latex.size2.price;
          currentDuration.textContent = supreme.latex.size2.duration;
        }
      
        if (pickSize.value == sizes[2]) {
          currentPrice.textContent = supreme.latex.size3.price;
          currentDuration.textContent = supreme.latex.size3.duration;
        }
      
        if (pickSize.value == sizes[3]) {
          currentPrice.textContent = supreme.latex.size4.price;
          currentDuration.textContent = supreme.latex.size4.duration;
        }
      
        if (pickSize.value == sizes[4]) {
          currentPrice.textContent = supreme.latex.size5.price;
          currentDuration.textContent = supreme.latex.size5.duration;
        }
      }
  
    } else {
  
      if (tickedCheckbox.value == 'Classic Matratze') {
        if (pickSize.value == sizes[0]) {
          currentPrice.textContent = classic.size1.price;
          currentDuration.textContent = classic.size1.duration;
        }
      
        if (pickSize.value == sizes[1]) {
          currentPrice.textContent = classic.size2.price;
          currentDuration.textContent = classic.size2.duration;
        }
      
        if (pickSize.value == sizes[2]) {
          currentPrice.textContent = classic.size3.price;
          currentDuration.textContent = classic.size3.duration;
        }
      
        if (pickSize.value == sizes[3]) {
          currentPrice.textContent = classic.size4.price;
          currentDuration.textContent = classic.size4.duration;
        }
      
        if (pickSize.value == sizes[4]) {
          currentPrice.textContent = classic.size5.price;
          currentDuration.textContent = classic.size5.duration;
        }
      }
  
      if (tickedCheckbox.value == 'Supreme Matratze') {
  
        if (pickSize.value == sizes[0]) {
          currentPrice.textContent = supreme.size1.price;
          currentDuration.textContent = supreme.size1.duration;
        }
      
        if (pickSize.value == sizes[1]) {
          currentPrice.textContent = supreme.size2.price;
          currentDuration.textContent = supreme.size2.duration;
        }
      
        if (pickSize.value == sizes[2]) {
          currentPrice.textContent = supreme.size3.price;
          currentDuration.textContent = supreme.size3.duration;
        }
      
        if (pickSize.value == sizes[3]) {
          currentPrice.textContent = supreme.size4.price;
          currentDuration.textContent = supreme.size4.duration;
        }
      
        if (pickSize.value == sizes[4]) {
          currentPrice.textContent = supreme.size5.price;
          currentDuration.textContent = supreme.size5.duration;
        }
      }
    }
  
  }
  
  document.addEventListener('click', tickBox, false);
  document.addEventListener('change', displayLayers);
  pickSize.addEventListener('change', updatePriceAfterSizePick);
  pickLayer.addEventListener('change', updatePriceAfterLayerPick);
  
  var radios = document.querySelectorAll('.wpcf7-list-item input[type="radio"]');
  
  var addBold = function (label) {
    var substrings = ['Gratis', 'Premium (+ 99,00 €)', 'Kauf auf Rechnung', 'Finanzierung'];
  
    if (label.textContent.includes(substrings[0])) {
      var tag = document.createElement('b');
      tag.innerHTML = substrings[0];
  
      var bold = tag.outerHTML;
  
      label.innerHTML = label.innerHTML.replace(substrings[0], '');
  
      label.innerHTML = bold + label.innerHTML;
    }
  
    if (label.textContent.includes(substrings[1])) {
      var tag = document.createElement('b');
      tag.innerHTML = substrings[1];
  
      var bold = tag.outerHTML;
  
      label.innerHTML = label.innerHTML.replace(substrings[1], '');
  
      label.innerHTML = bold + label.innerHTML;
    }
  
    if (label.textContent.includes(substrings[2])) {
      var tag = document.createElement('b');
      tag.innerHTML = substrings[2];
  
      var bold = tag.outerHTML;
  
      label.innerHTML = label.innerHTML.replace(substrings[2], '');
  
      label.innerHTML = bold + label.innerHTML;
    }
  
    if (label.textContent.includes(substrings[3])) {
      var tag = document.createElement('b');
      tag.innerHTML = substrings[3];
  
      var bold = tag.outerHTML;
  
      label.innerHTML = label.innerHTML.replace(substrings[3], '');
  
      label.innerHTML = bold + label.innerHTML;
    }
  };
  
  var addLabel = function (radio) {
    var label = radio.nextElementSibling;
    if (!label) return;
  
    addBold(label);
  };
  
  if (radios) {
    radios.forEach(function (radio) {
      addLabel(radio);
    });
  }
}

