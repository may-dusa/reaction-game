var countdown = ["Ready", "Set", "Go!"];
var num;
var c_selector;
var height;
var width;
var start;
var avg;
var total = 0;
var shape_ctr=0;
var ctr = 0;

$(document).ready(function() {

  $("body").css({"height" : $(window).height()+"px", "width" : $(window).width()+"px"});

  $("#start").click(function() {
    count_down();
  });

  function count_down() {

    $("#body-container").animate({opacity: 0}, 200, function() {
      $(this).css('display', 'none');
    });

    var delay = setTimeout(function() {
      $("#countdown").css('display', 'block');
    },300);


    var interval = setInterval(function(){

      if(ctr == 3) {

        clearInterval(interval);
        $("#countdown").css('display', 'none');
        $("#top-bar").css('display' , 'flex');
        continue_prog();

        ctr = -1;

      }

      $("#countdown").html(countdown[ctr]);
      $("#countdown").animate({opacity: 1}, 300)
      $("#countdown").delay(300).animate({opacity: 0}, 100)

      ctr++;

    }, 1000);
  }

  function continue_prog() {

    start = new Date().getTime();

    $("#shapes").animate({opacity: 1}, 200);
    $("#top-bar").animate({opacity: 1}, 200);

    $("#shapes").attr({"class" : "shape", "style" : ""});
    num = Math.floor((Math.random()*50)) + 100;
    c_selector = Math.floor((Math.random()*4));

    height = Math.floor((Math.random()*$(window).height()));
    width = Math.floor((Math.random()*$(window).width()));

    height = Math.min(height, ($(window).height()-50));
    width = Math.min(width, ($(window).width()-50));

    $("#shapes").css({"top" : height+"px", "left" : width+"px"});

    switch(c_selector) {
      case 0:
        $("#shapes").addClass("box");
        $("#shapes").css({"height" : num+"px", "width" : num+"px"});
        break;

      case 1:
        $("#shapes").addClass("circle");
        $("#shapes").css({"height" : num+"px", "width" : num+"px"});

        break;

      case 2:
        $("#shapes").addClass("rect");
        $("#shapes").css({"height" : num+"px", "width" : (1.5*num)+"px"});
        break;

      case 3:
        $("#shapes").addClass("triangle");
        $("#shapes").css({"border-left" : (0.5*num) + "px solid transparent" , "border-right" : (0.5*num) + "px solid transparent" , "border-bottom" : num + "px solid #fedd2a"});
        break;
    }
  }

  $("#shapes").click(function() {

    var time = (new Date().getTime() - start)/1000;

    $("#time-num").html(time + "<span style=color:white;>s<span>");
    $("#time-num").css('color', '#fedd2a');

    total = total + time;

    shape_ctr++;

    $("#click-num").html(shape_ctr);
    $("#click-num").css('color', '#fedd2a');

    continue_prog();

  });

  $("#end").click(function() {

    $("#shapes").animate({opacity: 0}, 200)
    $("#top-bar").css('display', 'none');

    $("#result").css('display', 'flex');
    $("#result").animate({opacity: 1}, 200);

    avg = total/shape_ctr;

    $("#time-result > span").html(avg.toFixed(3)+"<span style=color:white>s<span>");
    console.log(shape_ctr);

    $("#shapes-result > span").html(shape_ctr);

  });

  $("#restart").click(function() {

    shape_ctr = 0;
    avg = 0;
    total = 0;

    $("#result").animate({opacity: 0}, 200, function(){
      $(this).css('display', 'none');
    });

    count_down();
  });

});
