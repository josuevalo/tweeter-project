$(document).ready(function () {
 
  const $tweetText = $('#tweet-text');

  $tweetText.on('input', function () {
    const $parent = $(this).parent()[0]
    const $counter = $($parent).find(".counter")[0];

$counter.value = 140 - this.value.length

if ($counter.value <= 0) {
  $($counter).addClass("newCount"); 
}

if ($counter.value > 0) {
  $($counter).removeClass("newCount"); 
}






// let $newCount = $counter - $newTweet
// console.log("new counter", $newCount)
    // if ($newTweet < $counter){
    //   $counter = $newTweet - $counter
    // }
  });

  
});

