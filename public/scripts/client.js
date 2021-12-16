$(document).ready(function () {

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
      <p class="tweetedWords">${tweetObject.content.text}</p>
      <footer>
  
        <p> ${time} </p>
        <div class="icons">
          <div class="icon">
            <i class="fas fa-flag"></i>
          </div>
          <div class="icon">
            <i class="fas fa-retweet"></i>
          </div>
          <div class="icon">
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
      alert("Sorry! The text field cannot be empty!");
      event.preventDefault();
      return
    } 

    if (formData.length > 140) {
      alert("Sorry! The tweet is too long! Please stay under 140 characters.");
      event.preventDefault();
      return
    }
    
    event.preventDefault();
    $.post("http://localhost:8080/tweets/", $("#tweetForm").serialize())
    .then((response) => {
      loadTweets();
      $('#tweetForm')[0][0].value = "";
      $('#tweetForm')[0][0].focus();
 
    })
    .catch((error) => {
      console.log("error:", error);
    })

  });









});
