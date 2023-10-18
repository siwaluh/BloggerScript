let postSitemap = new BloggerSitemap({
    'firstContent': true
  }),
  sitemapElement = document.getElementById('sitemap_navigation'),
  customPostElement = document.getElementById('custom_post_v1'),
  searchParams = new URLSearchParams(document.location.search),
  maxResults = searchParams.get('max-results') || 5,
  postSitemapPaginationArr,
  createNavigation,
  navigationElement;

postSitemap.run('https://mstream-clone.blogspot.com/feeds/posts/default/-/Series', (entry, totalGet, isLast, totalResults) => {
  if (totalGet == 1 && entry.length != 0) {
    let firstPosts = entry.slice(0, maxResults);

    //Create Custom Post
    bloggerHtml.custom_post_v1(firstPosts, customPostElement);

    //createPagination
    createNavigation = new Pagination({
      'callback': function (mainElement, currentPage) {
        if (mainElement.innerHTML == '')
          return;
        
        if (postSitemapPaginationArr || currentPage == 1) {

          //Remove Pagination Element
          if (navigationElement && 'mainElement' in navigationElement)
            navigationElement.mainElement.remove();

          //create new Pagination and postList
          navigationElement = {
            mainElement,
            currentPage
          };
          sitemapElement.appendChild(mainElement);
          if (postSitemapPaginationArr) {
            bloggerHtml.custom_post_v1(postSitemapPaginationArr[currentPage - 1].items, customPostElement);
          }

        } else {
          alert('Error: Sitemap Belum selesai dibuat.');
        }
      }
    });
    createNavigation.arrayToPage(totalResults, maxResults, true);
  }

  if (isLast) {
    postSitemapPaginationArr = createNavigation.arrayToPage(entry, maxResults);
  }
}, false);