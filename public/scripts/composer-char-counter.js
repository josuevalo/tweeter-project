$(document).ready(function() {
 // Code for character count on tweet entry field //

  const $tweetText = $('#tweet-text');

  $tweetText.on('input', function() {
    const $parent = $(this).parent()[0];
    const $counter = $($parent).find(".counter")[0];

    $counter.value = 140 - this.value.length;

    if ($counter.value <= 0) {
      $($counter).addClass("newCount");
    } else if ($counter.value > 0) {
      $($counter).removeClass("newCount");
    }
  });
});

