// Test Driver Code
const data = [
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
]

const createTweetElement = function(tweet) {
  const $tweet = `
  <article class="tweet">
        <header class="tweet-header">
          <div>
          <img class="user-avatar" src="${tweet.user.avatars}" />
          <span class="tweet-creator-name">${tweet.user.name}</span>
          </div>
          <span class="tweet-creator-username">${tweet.user.handle}</span>
        </header>
            <div class="tweet-body">
              ${tweet.content.text}
            </div>
        <footer>
          <span class="date">${timeago.format(tweet.created_at)}</span>
          <div class="footericons">
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </div>
        </footer>
      </article>
`;
  return $tweet;
};


const renderTweets = function(tweets) {
  tweets.forEach(tweet => $('.tweet-container').prepend(createTweetElement(tweet)));
};

const isValid = (tweets) => {
  return (tweets.length > 0 && tweets !== null && tweets.length <= 140);
}

$(() => {
  const loadTweets = () => {
    $.ajax({
      method: "GET",
      url: "/tweets",
    }).then((tweets) =>{
      console.log(tweets);
      renderTweets(tweets);
    });
  };

  $('.new-tweet-from-form').on("submit", (event)=>{
    event.preventDefault();
    const data = $('.new-tweet-from-form').serialize();

    if(!isValid(data)){
      alert("Invalid request, please try again and make sure to have a min 1 to max 140 chatacters for your tweet!");
    }
    $.ajax({
      method: "POST",
      url: "/tweets",
      data: data
    }).then(loadTweets)
      .then($('.new-tweet-from-form').val(''));
  });

  renderTweets(data);
});