$(document).ready(function () {
  // --- our code goes here ---

  const $tweetText = $('#tweet-text');

  const $tweetButton = $('#tweet-button');

  // const $counter = $('#counter');

  $tweetText.on('input', function () {
    // console.log(event.target.value);
    // console.log(this.value);
    const $newTweet = this.value.length;
    console.log("new tweet", $newTweet)
    const $parent = $(this).parent()[0]
    console.log("PARENT", $parent);

    const $counter = $($parent).find(".counter")[0];
    console.log("COUNTER", $counter);

$counter.value = 140 - this.value.length
// console.log("COUNT", $count)







// let $newCount = $counter - $newTweet
// console.log("new counter", $newCount)
    // if ($newTweet < $counter){
    //   $counter = $newTweet - $counter
    // }
  });

  
});

