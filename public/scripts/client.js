const createTweetElement = function(tweet) {
  const $footer = $('<footer>');
  const $header = $('<header>');
  const $article = $('<article>');
  const $img = $('<img>');

  const $divAvatar = $('<div>').attr('id', 'avatar-name');
  const $divTDesc = $('<div>').addClass('tweet-description');
  const $divFooter = $('<div>').addClass('footer-icons');
  const $iRetweet = $('<i>').addClass('fa-solid fa-retweet');
  const $iFlag = $('<i>').addClass('fa-regular fa-flag');
  const $iHeart = $('<i>').addClass('fa-solid fa-heart');
  const $imgAvatar = $img.attr('src', `${tweet.user.avatars}`);
  const $headerTweeter = $header.attr('id', 'article-tweeter');

  const $pTimeAgo = $('<p>').text(`${timeago.format(tweet.created_at)}`);
  const $pUserHandle = $('<p>').text(`${tweet.user.handle}`);
  const $pName = $('<p>').text(`${tweet.user.name}`);

  $divFooter.append($pTimeAgo);
  $divFooter.append($('<a>').append($iRetweet));
  $divFooter.append($('<a>').append($iFlag));
  $divFooter.append($('<a>').append($iHeart));
  
  $divAvatar.append($imgAvatar);
  $divAvatar.append($pName);
  
  $header.append($divAvatar);
  $header.append($pUserHandle);
  
  $divTDesc.text(`${tweet.content.text}`);

  $footer.append($pTimeAgo);
  $footer.append($divFooter);

  $article.append($headerTweeter);
  $article.append($divTDesc);
  $article.append($footer);
  return $article;
};

const renderTweets = function(tweets) {
  $.each(tweets, function(index, tweet) {
    const newTweet = createTweetElement(tweet);
    $('#tweets-container').prepend(newTweet);
  });
};

const handleSubmit = (event) => {
  try {
    event.preventDefault();
    if ($('#tweet-text').val() === "" || null) {
      $('#error').text("Input cannot be empty!");
      $( "#error" ).css('visibility', "visible" ).hide().slideDown("slow");

      throw "Input cannot be empty";
    } else if ($('#tweet-text').val().length > 140) {
      $('#error').text("Please limit your input to 140 characters!");
      $( "#error" ).css('visibility', "visible" ).hide().slideDown("slow");

      throw "Input should be less than 140 characters";
    }
    const formData = $('form').serialize();
    
    $.ajax({
      method: "POST",
      url: "/tweets",
      data: formData
    })
    .then(() => {
      $.ajax({
        method: "GET",
        url: "/tweets"
      })
      .then((tweets) => {
        $('#tweets-container').empty();
        renderTweets(tweets);
        $('#error').css('visibility', 'hidden');

      })
        .then(() => $('#tweet-text').val(""))
        .then(() => $('.counter').val("140"))
    })
    .catch(err => console.log(err));
  } catch (error) {
    console.log(error);
  }
};

$(document).ready(function() {
  $('form').on('submit', handleSubmit);
  
  const loadTweets = () => {
    $.ajax('/tweets', { method: 'GET' })
    .then(function(res) {
      console.log('Success: ', res);
      renderTweets(res);
    });
  };
  loadTweets();
});