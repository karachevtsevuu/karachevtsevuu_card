(function($) {
  "use strict"; // Start of use strict

  $('#experience-year').text(new Date().getFullYear() - 2006);

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top)
        }, 500, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#sideNav'
  });
  
  $('.btn-simple').click(function() {
	var el = $(this);
	el.addClass('push');
	var aux = document.createElement("input");
	aux.setAttribute("value", 'karachevtsevuu@gmail.com');
	document.body.appendChild(aux);
	aux.select();
	document.execCommand("copy");
	document.body.removeChild(aux);
	setTimeout(function() {
		el.removeClass('push');
	}, 500);
	
  });

})(jQuery); // End of use strict
