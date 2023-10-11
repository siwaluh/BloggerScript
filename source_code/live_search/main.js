function getPostByName(name, callback, label) {
  let bloggerFeed = new BloggerScript();
  if (label)
    label = 'label:%22' + label + '%22+';
  else label = '';
  bloggerFeed.xhr2(('https://mstream-clone.blogspot.com/feeds/posts/summary?q=' + label + name + '&max-results=20&alt=json-in-script'), (entry) => {
    let posts = bloggerFeed.getFeed(entry);
    callback(posts);
  });
};

(function (a, b) {
  let inputSearch = a.getElementById('search-input'),
    searchxListener = function () {
      let searchParent = inputSearch.parentElement.parentElement.parentElement,
        boundsearch = searchParent.getBoundingClientRect();
      if (boundsearch.width != 0 && b['searchLiveFiles'].getBoundingClientRect().width != 0) {
        b['searchLiveFiles'].style.top = (boundsearch.bottom + 10) + "px";
        b['searchLiveFiles'].style.left = boundsearch.left + "px";
        b['searchLiveFiles'].style.width = boundsearch.width + "px";
      }
    },
    timeout;

  b['searchLiveFiles'] = a.createElement('div');
  b['searchLiveFiles'].className = 'live_search_items';
  b['searchLiveFiles'].setAttribute('style', 'position:fixed;z-index:9999;');

  b.addEventListener('resize', searchxListener);
  b.addEventListener('scroll', searchxListener);
  a.addEventListener('click', (e) => {
    if (!e.target.closest('.live_search_items') && b['searchLiveFiles'].getBoundingClientRect().width != 0)
      b['searchLiveFiles'].remove();
  })

  inputSearch.addEventListener('keyup', (e) => {
    let value = inputSearch.value,
      child = b['searchLiveFiles'].firstChild,
      width = b['searchLiveFiles'].getBoundingClientRect().width;

    if (value && value.length >= 3) {
      if (!child || (child && child.nodeName != 'CENTER'))
        b['searchLiveFiles'].innerHTML = '<center>Loading...</center>';
      if (width == 0)
        a.body.appendChild(b['searchLiveFiles']), searchxListener();
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        getPostByName(value, function (post) {
          let val = inputSearch.value;
          console.log(`s: ${val}, d: ${value}`);
          if (val != value)
            return false;
          if (post.length != 0) {
            let html = '<ul>';
            post.forEach(item => {
              html += '<li><ul>';
              html += '<li>' + item.title + '</li>';
              html += '<li>' + item.label.join(', ') + '</li>';
              html += '<li>' + item.link + '</li>';
              html += '</ul></li>';
            });
            html += '</ul>';
            b['searchLiveFiles'].innerHTML = html;
          } else {
            b['searchLiveFiles'].innerHTML = '<center>Not Found</center>';
          }
        }, 'Series');
      }, 2000);
    }
  });
})(document, window);