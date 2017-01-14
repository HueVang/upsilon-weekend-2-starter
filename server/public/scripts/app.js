$(document).ready(function(){
  var count = 0;
  var indexCount = 0;
  var timer = 10;
  var change = setInterval(addCount, 10000);
  setInterval(updateTimer, 1000);
  indexMaker();
  showPerson();
  flashIndex();

    $('#next').on('click', function() {
      clearInterval(change);
      resetTime();
      addCount();
      change = setInterval(addCount, 10000);
    });

    $('#prev').on('click', function () {
      clearInterval(change);
      resetTime();
      minusCount();
      change = setInterval(addCount, 10000);
    });

    function flashIndex() {
      indexCount = count + 1;
      // console.log(count);
      // console.log('Index count',indexCount);
      $('.index').removeClass('special');
      $('#' + indexCount).addClass('special');
    }

    function indexMaker() {
      for (var i =1; i < 18; i++) {
        var $index = $('<div class="index" id="'+ i +'"></div>');
        $index.append('<span>'+ i +'</span>');
        $index.appendTo('#index');
      }
    }

    function addCount() {
      if (count == 16) {
          count = 0;
          // console.log(count);
          showPerson();
          // console.log('count:',count);
          flashIndex();
      } else {
      count += 1;
      // console.log(count);
      showPerson();
      // console.log('count:', count);
      flashIndex();
      }
    }

    function minusCount() {
      if (count == 0) {
          count = 16;
          // console.log(count);
          showPerson();
          flashIndex();
      } else {
      count -= 1;
      // console.log(count);
      showPerson();
      flashIndex();
      }
    };

    function showPerson() {
      $.ajax({
        type: "GET",
        url: "/data",
        success: function(response){
          console.log(response[count].name);
          appendDom(response[count]);
        }
      });
    };

    function appendDom(person) {
      $('.person').fadeOut(1000);
      var $personDiv = $('<div class="person"></div>');
      $personDiv.append('<h2>' + person.githubUserName + '</h2>');
      $personDiv.append('<p class="name">' + person.name + '</p>');
      $personDiv.append('<p>"' + person.shoutout  + '"</p>');

      if ($('#slideShow').children().hasClass('person')) {
        setTimeout(function() {
          $('div').remove('.person');
          $($personDiv).hide().appendTo('#slideShow').fadeIn(1000);
        }, 1000);
      } else {
        $($personDiv).hide().appendTo('#slideShow').fadeIn(1000);
      };
    };

    function updateTimer(){
      if(timer > 1){
        timer--;
        incrementTime()
        if(timer < 4){
          $('#timeLeft').css('color','#00F5FF').css('font-size', '1.5em');
        }
      } else {
        console.log('switch');
        timer = 10;
        // $('#timeLeft').text(timer).fadeOut(250);
        incrementTime()
        $('#timeLeft').css('color','black').css('font-size', '1em')
      }
    }

    function incrementTime() {
      $('#timeLeft').text(timer).fadeIn(800);
      $('#timeLeft').text(timer).fadeOut(200);
    }

    function resetTime() {
      $('#timeLeft').text(10).fadeIn(800);
      $('#timeLeft').text(10).fadeOut(200);
      timer = 10;
    }

});
