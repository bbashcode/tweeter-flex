const createTweetElement = function(tweet) {
  const result = `
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
  return result;
};


// Test / driver code (temporary). Eventually will get this from the server.
const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}

$(() => {
  const $tweet = createTweetElement(tweetData);

  // Test / driver code (temporary)
  console.log($tweet); // to see what it looks like
  $('.tweet-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements,
});
// const renderTweets = function(tweet) {
  
// };