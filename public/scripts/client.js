

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
          <span class="date">${tweet.created_at}</span>
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
  tweets.forEach(tweet => $('.tweet-container').append(createTweetElement(tweet)));
};


$(() => {
  $('.new-tweet-from-form').on("submit", (event)=>{
    event.preventDefault();
    const data = $('.new-tweet-from-form').serialize();

    console.log(data);
    $.ajax({
      method: "POST",
      url: "/tweets",
      data: data
    })
  });

  renderTweets(data);

  const loadTweets = () => {
    $.ajax({
      method: "GET",
      url: "/tweets",
    }).then((tweets) =>{
      console.log(tweets);
      renderTweets(tweets);
    });
  };
  
  loadTweets();
});