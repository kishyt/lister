 /*--------- 1.	Slider  -------*/

$(function(){
      $(".slides").slides({
        play: 5000,
        pause: 2500,
		effect: 'fade',
        hoverPause: true,
		currentClass: 'current',
       pagination: true
      });
    });
