// main variables that used in code
const slideContainer = document.querySelector('.slide__container')

// additional function for detecting correct font-size
function heightDetect(percent) {
  const height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

  return (percent * (height - 6)) / 100;
}
function widthDetect(percent) {
  const width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

  return (percent * width) / 100;
}
function setResponsiveFontSize() {
  $('.slide__container').css({
    'font-size': `clamp(1px, ${heightDetect(0.925925)}px,${widthDetect(0.520833)}px)`
  });
}

// function for action after last slide
function lastSlideAction() {
  let id = $('#presentation', window.parent.document).attr('data-id');
  let $url = $('#presentation', window.parent.document).attr('data-request-url');
  let href = $('#presentation', window.parent.document).attr('data-href');
  let $token = $('meta[name="csrf-token"]', window.parent.document).attr('content');
  $.ajaxSetup({
    headers: {
      'X-CSRF-TOKEN': $token
    }
  });
  $.ajax({
    type: "POST",
    url: $url,
    data: {"id": id},
    success: function (data) {
      if (data !== false) {
        parent.location.href = href;
      }
    },
    error: function (data) {
      console.log(data);
    }
  });
}

$('#finish-tech-task').on('click', function() {
  lastSlideAction();
})

$('.accordeon__item-btn').on('click', function () {
  const currentEl = $(this);

  $('.accordeon__item-btn').not(currentEl).removeClass('active').next().slideUp();
  $('.accordeon__item-btn').not(currentEl).find('img.finger').fadeIn();
  $('.accordeon__item-btn').not(currentEl).find('img.cross').fadeOut();

  if (currentEl.hasClass('active')) {
    currentEl.removeClass('active');
    currentEl.find('img.finger').fadeIn();
    currentEl.find('img.cross').fadeOut();
  } else {
    currentEl.addClass('active');
    currentEl.find('img.finger').fadeOut();
    currentEl.find('img.cross').fadeIn();
  }

  currentEl.next().slideToggle();
});

//window and document listeners
$(document).ready(function () {
  setResponsiveFontSize();
});
$(window).on('resize', function () {
  setResponsiveFontSize();
});
$(window).on('orientationchange', function () {
  setResponsiveFontSize();
});
