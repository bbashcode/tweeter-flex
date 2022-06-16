//For XSS Attack Prevention Measure
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};


//Function to create a tweet
const createTweetElement = function(tweet) {
  const $tweet = `
  <article class="tweet">
    <header class="tweet-header">
      <div>
        <img class="user-avatar" src="${tweet.user.avatars}" />
        <span class="tweet-creator-name">${escape(tweet.user.name)}</span>
      </div>
      <span class="tweet-creator-username">${escape(tweet.user.handle)}</span>
    </header>
    <div class="tweet-body">
      ${escape(tweet.content.text)}
    </div>
    <footer>
      <span class="date">${escape(timeago.format(tweet.created_at))}</span>
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


//function to render tweets and add it to the dom
const renderTweets = function(tweets) {
  tweets.forEach(tweet => $('.tweet-container').prepend(createTweetElement(tweet)));
};

//function to either show or hide error message
const setErrorsHidden = (hide) => {
  return (hide? $('#error-message').hide(): $('#error-message').slideDown());
};

//Document ready block, this section will only run once the page Document Object Model (DOM) is ready for JavaScript code to execute
$(() => {
  //function to fetch tweets using a GET call and render them
  const loadTweets = () => {
    $.ajax({
      method: "GET",
      url: "/tweets",
    }).then((tweets) =>{
      renderTweets(tweets);
    });
  };

  //function to add/submit new tweet using POST
  $('.new-tweet-from-form').on("submit", (event)=>{
    event.preventDefault();
    const data = $('.new-tweet-from-form').serialize();

    //error handling

    //checking if the tweet is null or less than or equal to 0
    if(!($('#tweet-text').val())){
      $("#error-message p").text("Error! Pls respect our arbitrary limit of characters greater than 0. #kthxbye");
      setErrorsHidden(false);
      return;
    //checking if the tweet is greater than 140 charcters
    } else if(($('#tweet-text').val().length > 140)){
      $("#error-message p").text("Error! Pls respect our arbitrary limit of characters less than 140. #kthxbye");
      setErrorsHidden(false);
      return;
    }
    $.ajax({
      method: "POST",
      url: "/tweets",
      data
    }).then(loadTweets)
      .then(()=>{
        //clearing out the tweet box once tweet has been posted
        $('#tweet-text').val('');
        //resetting character count to 140 once a tweet has been posted
        $('.counter').val(140);
        setErrorsHidden(true);
      });
  });

  //tweets should always be visible as long as the app instance is running
  loadTweets();
});