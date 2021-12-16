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

    (tweets).forEach(tweet => {
      console.log("TWEET", tweet)
      const value = createTweetElement(tweet)
      console.log("VALUE", value)
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
      renderTweets(response);
  
    })
    .catch((error) => {
      console.log("error:", error);
    })
    
  }
  loadTweets();




  $('#tweetForm').on('submit', (event) => {
    event.preventDefault();
    console.log("Serialize this!", $('#tweetForm').serialize());
    console.log("Test - did this work?")

    $.post("http://localhost:8080/tweets/", $("#tweetForm").serialize());

  });









});
