$(document).ready(function () {

  const escape = function (str) {
    let span = document.createElement("span");
    span.appendChild(document.createTextNode(str));
    return span.innerHTML;
  };

  const createTweetElement = function (tweetObject) {
    const time = timeago.format(`${tweetObject.created_at}`)
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
  }


  const renderTweets = function (tweets) {
    $('#tweets-container').empty();
    (tweets).forEach(tweet => {
      const value = createTweetElement(tweet)
      $('#tweets-container').append(value);
    });
  
  }
  
  const loadTweets = function () {
   
    $.ajax({
      url: 'http://localhost:8080/tweets/',
      method: 'GET' 
    
    })
    .then((response) => {
      console.log('response:', response[1]);
      renderTweets(response.sort((a,b) => b.created_at - a.created_at));

      // TRYING TO MAKE THE HEARTS STAY RED WHEN CLICKED //
const likeFunction = function () {
  console.log("this", this)
   $(this).toggleClass('liked');
  // $(this).addClass("liked");
  
}
console.log("heart", $('.heart'))
$('.heart').click("click", likeFunction)
    // $(this).toggleClass('clicked');
  // });

    })
    .catch((error) => {
      console.log("error:", error);
    })
    
  }

  loadTweets();




  $('#tweetForm').on('submit', (event) => {
   const formData =  $('#tweetForm')[0][0].value
   $('#errorEmpty').slideUp(250);
   $('#errorTooLong').slideUp(250)
  
 
    if (formData === "" || formData === null) {
      $('#errorEmpty').slideDown(250)
      event.preventDefault();
      return
    } 
    
    if (formData.length > 140) {
      $('#errorTooLong').slideDown(250)
      event.preventDefault();
      return
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

      $counter.value = 140
      
    })
    .catch((error) => {
      console.log("error:", error);
    })

  });


/// Code for 'Write New Tweet' toggle ///
  const toggleFunction = function () {
    $('#newTweet').toggle(700);
    $('#tweetForm')[0][0].focus();
   }
  $('#clickForTweet').click("click", toggleFunction);
  
  
  const myAvatar = function () {
    $('#newTweet').toggle(700);
    $('#tweetForm')[0][0].focus();
  }
  $('#avatar').click("click", myAvatar);

  






// Back To Top Button //

 //Check to see if the window is top if not then display button
 $(window).scroll(function(){

  // Show button after 100px
  const showAfter = 100;
  if ( $(this).scrollTop() > showAfter ) { 
   $('#backToTop').fadeIn();
  } else { 
   $('#backToTop').fadeOut();
  }

 });
 
 //Click event to scroll to top
 $('#backToTop').click(function(){
  $('html, body').animate({scrollTop : 0},800);
  return false;
 });


 $('#tweeter').click(function(){
  $('html, body').animate({scrollTop : 0},800);
  return false;
 });

});



{/* <p class="tweetedWords">${tweetObject.content.text}</p> */}