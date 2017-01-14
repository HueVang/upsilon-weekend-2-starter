$(document).ready(function(){
  var count = 0;
  var indexCount = 0;
  var timer = 10;
  var change = setInterval(addCount, 10000);
  setInterval(updateTimer, 1000);
  setInterval(watchForReset, 100);
  indexMaker();
  showPerson();
  flashIndex();

    //Click listener for next button
    $('#next').on('click', function() {
      clearInterval(change);
      resetTime();
      addCount();
      change = setInterval(addCount, 10000);
    });

    //Click listener for prev button
    $('#prev').on('click', function () {
      clearInterval(change);
      resetTime();
      minusCount();
      change = setInterval(addCount, 10000);
    });

    //Click listener for index buttons
    $('.index').on('click', function() {
      count = $(this).attr('id');
      clearInterval(change);
      resetTime();
      minusCount();
      change = setInterval(addCount, 10000);
    });

    //Highlights the index that is currently selected, and removes highlights from all other indices.
    function flashIndex() {
      indexCount = count + 1;
      // console.log(count);
      // console.log('Index count',indexCount);
      $('.index').removeClass('special');
      $('#' + indexCount).addClass('special');
    }

    // function indexMaker() {
    //   for (var i = 1; i < 18; i++) {
    //     var $index = $('<div class="index" id="'+ i +'"></div>');
    //     $index.append('<span>'+ i +'</span>');
    //     $index.appendTo('#index');
    //   }
    // }

    //Creates button indices and appends to the DOM once the DOCUMENT is ready.
    function indexMaker() {
      for (var i = 1; i < 18; i++) {
        var $index = $('<button type="button" class="index" id="' + i +'">'+ i +'</button>');
        $index.appendTo('#index');
      }
    }

    //Adds 1 to count, but only if it's less than 16. Then calls functions to show the selected person and highlight the appropriate index.
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

    //Remove 1 from count, but only if it doesn't equal 0. Then calls functions to show the selected person and highlight the appropriate index.
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

    //Uses AJAX request to GET specified person from the JSON data file.
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

    //Creates a div with all the person information and appends it to the DOM with fadeIn/fadeOut effect.
    function appendDom(person) {
      $('.person').fadeOut(1000);
      var $personDiv = $('<div class="person"></div>');
      $personDiv.append('<h2>' + person.githubUserName + '</h2>');
      $personDiv.append('<p class="name">' + person.name + '</p>');
      $personDiv.append('<p>"' + person.shoutout  + '"</p>');

      if ($('#slideShow').children().hasClass('person')) {
        setTimeout(function() {
          $('div').remove('.person');
          $($personDiv).hide().appendTo('#slideShow').fadeIn(1500);
        }, 1000);
      } else {
        $($personDiv).hide().appendTo('#slideShow').fadeIn(1500);
      };
    };

    //If conditional within a function to check the timer, increments the time and adds a color to the text depending on the conditions.
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

    //Changes the text of the time so the user can see it on the DOM.
    function incrementTime() {
      $('#timeLeft').text(timer).fadeIn(800);
      $('#timeLeft').text(timer).fadeOut(200);
    }

    //Resets the time on the DOM to 10 and also resets the time to 10.
    function resetTime() {
      $('#timeLeft').css('color','black').css('font-size', '1em')
      $('#timeLeft').text(10).fadeIn(800);
      $('#timeLeft').text(10).fadeOut(200);
      timer = 10;
    }

    //When the time resets to 10, rotate the h1 text and animate the slideShow div.
    function watchForReset() {
      if (timer == 10) {
        $('h1').css('transform', 'rotate(360deg)');
        setTimeout(function() {
          $('h1').css('transform', 'none');
        }, 1000);
        $('#slideShow').addClass('wiggle');
        setTimeout(function() {
          $('#slideShow').removeClass('wiggle');
        }, 2000);
      }
    }

});
