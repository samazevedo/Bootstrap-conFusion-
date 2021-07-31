$(document).ready(function() {
    $('#mycarousel').carousel({ interval: 2000});
    $('#carouselButton').click(function(){
        if ($('$carouselButton').children("span").hasClass('fa-pause')) {
            $("#mycarousel").carousel('pause');
            $("mycarouselButton").children("span").removeClass('fa-pause');
            $("#carouselButton").children("span").addClass('fa-play'); 
        }
        else if ($("#carouselButton").children("span").hasClass('fa-play')) {
            $("#mycarousel").children('cycle');
            $("#carouselButton").children("span").removeClass('fa-play');
            $("#carouselButton").children("span").addClass('fa-pause');
        }
    });
});


$(document).ready(function() {
    $('#reservation').modal('hide');
    $('#reserveButton').click(function() {
        $('#reservation').modal('show');
    });
});


$(document).ready(function(){
    $('#loginModal').modal('hide');
    $('#loginButton').click(function(){
        $('#loginModal').modal('show');
    });           
});