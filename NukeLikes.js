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
