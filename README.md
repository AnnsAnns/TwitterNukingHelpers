# Twitter Nuking Helpers
Wipe your retweets, likes and tweets from Twitter using the browser console. For free without a developer token 😉

These scripts were made by a lot of people around the entire web so please visit the originals as credited below.

***Warning:** User Scripting is against the Twitter Rules.
Please do not use these, pay $42k for API access instead, otherwise it would make Elon Musk really sad 😥*

### How to use:

1. Visit the relevant page, e.g. https://twitter.com/USERNAME/likes or https://twitter.com/USERNAME
1. Paste the script into your web console.
1. Wait for the script to finish. This might take a long time depending on the amount of tweets/retweets/likes you have.
1. Success 🎉


## [Nuke Likes](./NukeLikes.js) <- Click for newest version
This script nukes your likes at the ratelimit of 900/15mins. So be prepared for it to take a long time.

```js
// Credits adjusted script: tumGER
// Credits for original script to https://github.com/lukejones/delete-twitter-likes 
// and original original script to https://www.techjunkie.com/delete-all-twitter-likes/#comment-47485

// Copy and paste into your Console while on https://twitter.com/<username>/likes

let requests = 0;
while(true) {
  var divs = document.getElementsByTagName('div')
  var arr = Array.prototype.slice.call(divs)
  var hearts = arr.filter(x => x.getAttribute('data-testid') == 'unlike')
  hearts.forEach(h => h.click())
  window.scrollTo(0, document.body.scrollHeight ||document.documentElement.scrollHeight);
  requests += 1;
  await new Promise(r => setTimeout(r, 1000));

  if (requests >= 895) {
    requests = 0;
    console.log("🛌 Reached Rate Limit, going to sleep!");
    await new Promise(r => setTimeout(r, 15*60*1000));
    console.log("🌞 Good Morning, it's time to nuke your likes again!");
  };
}
```

## [Nuke Tweets](./NukeTweets.js) <- Click for newest version

```js
// Credits: Uzay https://stackoverflow.com/a/72515907

// Paste into Console on https://twitter.com/<username>

var delTweets = function () {
var tweetsRemaining = 
document.querySelectorAll('[role="heading"]+div')[1].textContent;
console.log('Remaining: ', tweetsRemaining);
window.scrollBy(0, 10000);
document.querySelectorAll('[aria-label="More"]').forEach(function 
(v, i, a) {
    v.click();
    document.querySelectorAll('span').forEach(function (v2, i2, a2) {
        if (v2.textContent === 'Delete') {
            v2.click();
            document.querySelectorAll('[data-testid="confirmationSheetConfirm"]').forEach(function (v3, i3, a3) {
                v3.click();
            });
        }
        else {
            document.body.click();
        }
    });
});
setTimeout(delTweets, 4000); //less than 4000 might be rate limited or account suspended. increase timeout if any suspend or rate limit happens
}
delTweets();
```

## [Nuke Retweets](./NukeRetweets.js) <- Click for newest version

```js
// Credits to this script: Unknown - This script gets shared around everywhere with absolutely zero credit to the original author

// Copy and Paste into Web Console when on https://twitter.com/<username>
// Note that I had some success trying to remove via https://twitter.com/<username>/with_replies but some threads can break the script

const timer = ms => new Promise(res => setTimeout(res, ms));

// Unretweet normally
const unretweetTweet = async (tweet) => {
      await tweet.querySelector('div[data-testid="unretweet"]').click();
      await timer(250);
      await document.querySelector('div[data-testid="unretweetConfirm"]').click();
      console.log('****// Unretweeted Successfully //****')
}

// Sometimes twitter shows your retweet but green retweet button is invisible and therefore you need to retweet again for make unreweet. This function is for that.
const unretweetUnretweetedTweet = async (tweet) => {
      await tweet.querySelector('div[data-testid="retweet"]').click();
      await timer(250);
      await document.querySelector('div[data-testid="retweetConfirm"]').click();
      console.log('****// Retweeted Successfully //****')
      await timer(250);
      unretweetTweet(tweet);
}

setInterval(async () =>
{
      // Get all tweets
      const retweetedTweetList = document.querySelectorAll('span[data-testid="socialContext"]');
      console.log('****// Retweeted Tweet List Collected //****')
      for (const retweet of retweetedTweetList) {
            const tweetWrapper = retweet.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
            
            tweetWrapper.scrollIntoView();
            
            const isRetweeted = tweetWrapper.querySelector('div[data-testid="unretweet"]');
        
            if (isRetweeted) {
                  console.log('****// Green Retweet Button Found - Starting "unretweetTweet" process //****')
                  await unretweetTweet(tweetWrapper);
            } else {
                  console.log('****// Green Retweet Button Not Found - Starting "unretweetUnretweetedTweet" process //****')
                  await unretweetUnretweetedTweet(tweetWrapper);
            }
            await timer(2000);
      }
      console.log('****// List Completed //****')
      console.log('****// Scrolling //****')
      await window.scrollTo(0, document.body.scrollHeight);
}, 1000);
```
