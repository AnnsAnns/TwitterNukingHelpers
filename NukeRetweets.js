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
}, 40);
