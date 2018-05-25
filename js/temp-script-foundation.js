// Custom javascript
$(document).foundation();

$(document).on("scroll",function(){
  if($(document).scrollTop()>30){
    $("nav").addClass("nav-bg");
  } else{
    $("nav").removeClass("nav-bg");
  }
});

$(document).ready(function(){
	//Sticky Bottom Bar When distance from top = 600px fade button in/out
  $(window).scroll(function(){
      if ($(this).scrollTop() > 400) {
          $('.sticky-bottom-bar').fadeIn(300);
      } else {
          $('.sticky-bottom-bar').fadeOut(300);
      }
  });
});