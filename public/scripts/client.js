$(document).ready(function() {

  const escape = function(str) {
    let span = document.createElement("span");
    span.appendChild(document.createTextNode(str));
    return span.innerHTML;
  };


  // Creating Markup for new posts //
  const createTweetElement = function(tweetObject) {
    const time = timeago.format(`${tweetObject.created_at}`);
    const $markup = `
  <section>
    <article class="existingTweet">
      <header>
        <div class="tweetingUser">
          <img src=${tweetObject.user.avatars} alt=${tweetObject.user.name} class="userAvatar">
          <p class="name">${tweetObject.user.name}</p>
        </div>
        <div class="handle">
          <p class="atUserHandle">${tweetObject.user.handle}</p>
        </div>
      </header>
      <body>
      <p class="tweetedWords">${escape(tweetObject.content.text)}</p>
      </body>
      <footer>
        <p> ${time} </p>
        <div class="icons">
          <div class="icon">
            <i class="fas fa-flag"></i>
          </div>
          <div class="icon">
            <i class="fas fa-retweet"></i>
          </div>
          <div class="icon heart">
            <i class="fas fa-heart"></i>
          </div>
        </div>
      </footer>
    </article>
  </section>
 `;
    return $markup;
  };

  // Render Tweets//
  const renderTweets = function(tweets) {
    $('#tweets-container').empty();
    (tweets).forEach(tweet => {
      const value = createTweetElement(tweet);
      $('#tweets-container').append(value);
    });
  
  };
  // Load Tweets //
  const loadTweets = function() {
   
    $.ajax({
      url: 'http://localhost:8080/tweets/',
      method: 'GET'
    
    })
      .then((response) => {
        renderTweets(response.sort((a,b) => b.created_at - a.created_at));

        // Make the hearts stay red when clicked //
        const likeFunction = function() {
          $(this).toggleClass('liked');
        };
        $('.heart').click("click", likeFunction);
  
      })
      .catch((error) => {
        console.log("error:", error);
      });
  };
  loadTweets();


  // Form entry on new tweets - includes user error handling //

  $('#tweetForm').on('submit', (event) => {
    const formData =  $('#tweetForm')[0][0].value;
    $('#errorEmpty').slideUp(250);
    $('#errorTooLong').slideUp(250);
  
 
    if (formData === "" || formData === null) {
      $('#errorEmpty').slideDown(250);
      event.preventDefault();
      return;
    }
    
    if (formData.length > 140) {
      $('#errorTooLong').slideDown(250);
      event.preventDefault();
      return;
    }
    
    event.preventDefault();
    $.post("http://localhost:8080/tweets/", $("#tweetForm").serialize())
      .then((response) => {
        loadTweets();
        $('#tweetForm')[0][0].value = "";
        $('#tweetForm')[0][0].focus();
   
     
        // This restarts the counter after submitting //
        const $tweetText = $('#tweet-text').parent()[0];
        const $counter = $($tweetText).find(".counter")[0];

        $counter.value = 140;
      
      })
      .catch((error) => {
        console.log("error:", error);
      });
  });


  /// Code for 'Write New Tweet' toggle ///
  const toggleFunction = function() {
    $('#newTweet').toggle(700);
    $('#tweetForm')[0][0].focus();
  };
  $('#clickForTweet').click("click", toggleFunction);
  
  // Code for extra toggle function on avatar (same as above) //
  const myAvatar = function() {
    $('#newTweet').toggle(700);
    $('#tweetForm')[0][0].focus();
  };
  $('#avatar').click("click", myAvatar);


  // Back To Top Button //
 
  $(window).scroll(function() {

    const showAfter = 100;
    if ($(this).scrollTop() > showAfter) {
      $('#backToTop').fadeIn();
      $('.write-tweet').fadeOut();
      $('#arrow').fadeOut();
    } else {
      $('#backToTop').fadeOut();
      $('.write-tweet').fadeIn();
      $('#arrow').fadeIn();
    }
  });
 
  $('#backToTop').click(function() {
    $('html, body').animate({scrollTop : 0},800);
    $('#newTweet').slideDown(700);
    $('#tweetForm')[0][0].focus();
    
    
    return false;
  });

  // Back To Top when clicking on Tweeter logo //
  $('#tweeter').click(function() {
    $('html, body').animate({scrollTop : 0},800);
    $('#newTweet').slideDown(700);
    $('#tweetForm')[0][0].focus();
    return false;
  });

});


