let feedComments = new BloggerComments({
    'mainUrl': 'https://emissionhex.blogspot.com',
    'contentType': 'summary',
    'noImage': 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjV9If19vg78tsJxn3XjVw8PucpAGqcwzUvKG2HUTxyM76mOt2pmL6jvLoukMDesvQtybcVMaJPt5K_upLAiUDcAS5XJ3h1m4IdI7qPvd_k4c9CJHMoN8J2V_MC981i7F8/w100-h100-p-k-no-nu/images.jpg',
    'sizeImage': 'w40-h40-c-rw'
  }),
  recentElement = document.getElementById('recent_comments');

if (recentElement) {
  feedComments.run(false, 10, function (entry) {
    if (entry.length != 0) {
      let html = '';
      entry.forEach(item => {
        html += '<li><div class="rc_head">';
        html += `<div class="rc_avatar"><img src="${item.author.image}" title="${item.author.name}"/></div>`;
        html += `<a href="${item.link}">${item.author.name}</a>`;
        html += `<div class="rc_date">${item.date}</div>`;
        html += '</div>';
        html += `<p>${item.summary || item.title || item.content || 'nothing'}</p>`;
        html +`</li>`;
      });
      recentElement.innerHTML = html;
    }
  }, false);
}