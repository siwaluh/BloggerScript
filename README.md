# BloggerScript
Create Simple Feed Blogger with BloggerScript

## How to use
Get Feed Blogger Basic.
```
const bloggerFeed = new BloggerScript();
bloggerFeed.xhr('https://blog_url.blogspot.com/feeds/posts/default?alt=json-in-script&max-results=20', function(entry) {
  console.log(entry);
  //Output Array entry
})
```
