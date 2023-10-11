(function (a, b) {
  let inputSearch = a.getElementById('search-input'),
    timeout;

  function createHTML(post) {
    let html = '',
      image = BloggerScript.prototype.resizeImage(post.image, 'w40-h60-c-rw'),
      label = post.label.join(', ');

    html += "<li class='live-search-post'><a href='" + post.link + "'>";
    html += "<div class='live-search-thumb'><img src='" + image + "'></div><div class='over'><div class='autotitle'>" + post.title + "</div><span class='live-meta'>" + label + "</span></div></a></li>";

    return html;
  };

  function getPostByName(name, callback, label) {
    let bloggerFeed = new BloggerScript();
    if (label)
      label = 'label:%22' + label + '%22+';
    else label = '';
    bloggerFeed.xhr2(('https://komikav-clone.blogspot.com/feeds/posts/summary?q=' + label + name + '&max-results=20&alt=json-in-script'), (entry) => {
      let posts = bloggerFeed.getFeed(entry);
      callback(posts);
    });
  };

  function searchxListener() {
    let searchParent = inputSearch.parentElement.parentElement.parentElement,
      boundsearch = searchParent.getBoundingClientRect();
    if (boundsearch.width != 0 && b['searchLiveFiles'].getBoundingClientRect().width != 0) {
      b['searchLiveFiles'].style.top = (boundsearch.bottom + 10) + "px";
      b['searchLiveFiles'].style.left = boundsearch.left + "px";
      b['searchLiveFiles'].style.width = boundsearch.width + "px";
    }
  };

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
          if (val != value)
            return false;
          if (post.length != 0) {

            let html = '<ul>';
            post.forEach(item => {
              console.log(item);
              html += createHTML(item);
            });
            html += '</ul>';

            b['searchLiveFiles'].innerHTML = html;

          } else {
            b['searchLiveFiles'].innerHTML = '<div><center>Not Found</center></div>';
          }
        }, 'Series');
      }, 2000);
    } else {
      if (width != 0)
        b['searchLiveFiles'].remove();
    }
  });
})(document, window);