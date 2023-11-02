(function (a, b) {
  let x = b['bloggerHtml'] || {};
  if (!('custom_post_v2' in x)) {
    x['custom_post_v2'] = function (items, element) {
      let html = '',
        filterStatus = ['Completed', 'Ongoing'],
        filterType = ['Manga', 'Manhua', 'Manhwa'],
        regexScore = /^(\d{1,3}\.\d{1,2})$/,
        regexChapter = /((chapter|episode|ep|ch|vol|volume|bab)(\.\s|\s|\.)(\d{1,4})(\.\d{1,2})?)/gi;

      for (let index = 0; index < items.length; index++) {
        let item = items[index],
          status, score, type, chapter,
          image = BloggerScript.prototype.resizeImage(item.image, 'w150-h210-c-rw');
        item.label.forEach(label => {
          if (!status && filterStatus.includes(label))
            status = label;
          if (!score && regexScore.test(label))
            score = label;
          if (!type && filterType.includes(label))
            type = label;
          if (!chapter && regexChapter.test(label))
            chapter = label;
        });

        if (!chapter && item.title.match(regexChapter))
          chapter = item.title.match(regexChapter)[0].replace(/((chapter|episode|ep|ch|vol|volume|bab)(\.\s|\s|\.))/gi, 'Chapter ');

        html += `<div class='cp1_items'><div class='cp1_item'><a href='${item.link}' title='${item.title}'><div class='cp1_limit'><div class='cp1_ply'></div>`;

        if (type)
          html += `<span class='cp1_type ${type}'>${type}</span>`;

        if (status)
          html += `<span class='cp1_status ${status}'>${status}</span>`;

        html += `<img loading='lazy' src='${image}' height='210' width='150'></div><div class='cp1_bigor'><div class='cp1_tt'>${item.title}</div><div class='cp1_adds'>`;

        if (chapter)
          html += `<div class='cp1_epxs'>${chapter}</div>`;

        if (score)
          html += `<div class='cp1_rt'><div class='cp1_rating'><div class='cp1_rating-prc'><div class='cp1_rtp'><div class='cp1_rtb'><span style='width:${score.replace(/./g, '').slice(0, 2)}%;'></span></div></div></div><div class='cp1_numscore'>${score}</div></div></div>`;

        html += `</div></div></a></div></div>`;
      };

      if (element)
        element.innerHTML = html;
      return html;
    };
    b['bloggerHtml'] = x;
  }
})(document, window);