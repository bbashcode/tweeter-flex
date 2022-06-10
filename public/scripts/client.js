const createTweetElement = function(tweet) {
  const result = `
  <article class="tweet">
        <header>
          <div>
          <img class="user-avatar" src=${tweet.user.avatars}>
          <span class="tweet-creator-name">${tweet.user.name}</span>
          </div>
          <span class="tweet-creator-username">${tweet.user.handle}</span>
        </header>
            <span>
              ${tweet.content.text}
            </span>
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
};


const renderTweets = function(tweet) {
  
};