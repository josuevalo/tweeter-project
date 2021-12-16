$(document).ready(function() {

  const tweetData = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];

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
  };
  // Test / driver code (temporary). Eventually will get this from the server.


  // const $tweet = createTweetElement(tweetData);

  // Test / driver code (temporary)
  // console.log($tweet); // to see what it looks like
  // $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.


  const renderTweets = function(tweets) {

    (tweets).forEach(tweet => {
      console.log("TWEET", tweet);
      const value = createTweetElement(tweet);
      console.log("VALUE", value);
      $('#tweets-container').append(value);
    });
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  };


  renderTweets(tweetData);


  $('#tweetForm').on('submit', (event) => {
    event.preventDefault();
    console.log("Serialize this!", $('#tweetForm').serialize());
    console.log("Test - did this work?");
  
    $.post("http://localhost:8080/tweets/", $("#tweetForm").serialize());
  
  });

  // $.ajax({
  //   url: 'http://localhost:8080/tweets/',
  //   method: 'POST'
  // })

  // .then((response) => {
  //   console.log('response:', response[1]);
  //   // renderTweets(response);
    
  // })
  // .catch((error) => {
  //   console.log("error:", error);
  // })



  // });




  // $('#tweetForm').on('submit', (event) => {
  //   event.preventDefault();
  //   console.log("Test - did this work?");
  //   console.log("Serialize this!", $(this).serialize());
  
  //   .then((response) => {
  //     console.log('response:', response[1]);
  //     // renderTweets(response);
    
//   });
//   .catch((error) => {
//     console.log("error:", error);
//   });
});
