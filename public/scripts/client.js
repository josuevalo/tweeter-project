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
        <div class="tweetedAt">
          <p class="tweetingAtUser">${tweetObject.user.handle}</p>
        </div>
      </header>
      <p class="tweetedWords">${escape(tweetObject.content.text)}</p>
      <footer>
        <p> ${time} </p>
        <div class="icons">
          <div class="icon">
            <i class="fas fa-flag"></i>
          </div>
          <div class="icon">
            <i class="fas fa-retweet"></i>
          </div>
          <div class="icon" id="heart">
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
      renderTweets(response.sort((a,b) => b.created_at - a.created_at))
    })
    .catch((error) => {
      console.log("error:", error);
    })
    
  }

  loadTweets();




  $('#tweetForm').on('submit', (event) => {
   const formData =  $('#tweetForm')[0][0].value
  
 
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
      $('#errorEmpty').slideUp(250);
      $('#errorTooLong').slideUp(250)
     
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

  


// TRYING TO MAKE THE HEARTS STAY RED WHEN CLICKED //
// const likeFunction = function () {
//   $('#heart').addClass("heart");
//   alert('hi')
// }
// $('#heart').click("click", likeFunction)
  // $('#heart').click(function(){
  //   $(this).toggleClass('clicked');
  // });

});
{/* <p class="tweetedWords">${tweetObject.content.text}</p> */}