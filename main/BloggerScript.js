class BloggerScript {
  constructor(obj = {}) {
    this._config = obj;
  }

  err(e) {
    console.log(e)
    return e;
  }

  createRT(a) {
    let result = '',
      characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
      charactersLength = characters.length;
    for (let i = 0; i < a; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  resizeImage(e, b = false) {
    if (!b) return e;
    let f = /\/(s|w|h)\d{1,4}-((w|s|h)(\d{1,4})+-)?(c{1,2}|p-k-no-nu|rw)/gi;
    let l = /\=(s|w|h)\d{1,4}-((w|s|h)(\d{1,4})+-)?(c{1,2}|p-k-no-nu|rw)/gi;
    let k = /(\/(w|h|s)\d{1,4}\/)/gi,
      x = /(\=(w|h|s)\d{1,4})$/gi;
    let val = /\-(rw)$/.test(b);
    if (k.test(e)) {
      e = e.replace(k, '/s72-c/');
    }

    if (x.test(e)) {
      e = e.replace(x, '=s72-c');
    }
    if (val) e = e.replace(/\.(gif|jpe?g|tiff?|png|bmp)$/, '.webp');
    return e.match(f) ? e.replace(f, `/${b}`) : e.match(l) ? e.replace(l, `=${b}`) : e;
  }

  shuffle(a) {
    var b = a.length,
      c, d;
    if (b === 0) return false;
    while (--b) {
      c = Math.floor(Math.random() * (b + 1));
      d = a[b];
      a[b] = a[c];
      a[c] = d
    };
    return a
  }

  shuffle2(a, b) {
    return Math.floor(Math.random() * (b - a)) + a
  }

  sort(items, sortBy) {
    if (sortBy == 'Update' || sortBy == 'Added') {
      let key = sortBy == 'Update' ? 'updated' : 'published';
      items = items.sort(function (a, b) {
        return (a[key] < b[key]) ? -1 : ((a[key] > b[key]) ? 1 : 0);
      }).reverse();
    } else if (sortBy == 'A-Z' || sortBy == 'Z-A') {
      items = items.sort((a, b) => a.title.localeCompare(b.title, undefined, {
        numeric: true
      }));
      if (sortBy == 'Z-A') items = items.reverse();
    }
    return items;
  }

  xhr(b, c = this.err) {
    let d = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    d.onreadystatechange = function () {
      if ((this.readyState == 4 && this.status == 200) || this.status == 304) {
        let f = this.responseText,
          g = JSON.parse(f.substring(f.indexOf('{'), f.lastIndexOf('}') + 1));
        c && c(g)
      } else if (this.readyState == 4) {
        c && c({});
      }
    }
    d.open('GET', b, true);
    d.send();
  }

  xhr2(a, b = this.err) {
    let script = document.createElement('script'),
      text = 'xhr2' + this.createRT(7);
    window[text] = function (e) {
      return b(e);
    }
    script.src = `${a}&callback=window.${text}`;
    script.onerror = function (e) {
      console.log(e);
      b({});
    };
    script.async = true;
    return (document.body || document.getElementsByTagName('body')[0]).appendChild(script);
  }

  getId(e) {
    return e.split('post-')[1];
  }

  getAuthor(e) {
    let obj = {};
    'name' in e && (obj['name'] = e.name.$t);
    'uri' in e && (obj['uri'] = e.uri.$t);
    if ('gd$image' in e && 'src' in e.gd$image && e.gd$image.src.indexOf('https://img1.blogblog.com/') == -1) {
      obj['image'] = this.resizeImage(e.gd$image.src, this._config.sizeImage);
    } else {
      obj['image'] = this._config.noImage ? this.resizeImage(this._config.noImage, this._config.sizeImage) : '';
    }
    return obj;
  }

  getDefault(e) {
    let a = ['published', 'updated', 'content', 'summary', 'title'],
      b = {};
    a.forEach(i => {
      if (i in e) {
        b[i] = e[i]['$t'];
        if (i == 'published')
          b['date'] = this.getTime(e[i]['$t']);
      }
    });
    return b;
  }

  getImage(e) {
    let noImage = this._config.noImage ? this.resizeImage(this._config.noImage, this._config.sizeImage) : '';
    if ('media$thumbnail' in e) {
      return this.resizeImage(e.media$thumbnail.url, this._config.sizeImage);
    } else {
      if ('content' in e) {
        let s = e.content.$t,
          a = s.indexOf("<img"),
          b = s.indexOf("src=\"", a),
          c = s.indexOf("\"", b + 5),
          d = s.substr(b + 5, c - b - 5);
        if ((a != -1) && (b != -1) && (c != -1) && (d != "")) {
          return d;
        } else {
          return noImage;
        }
      } else {
        return noImage;
      }
    }
  }

  getTime(t) {
    if (/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/.test(t)) {
      var e = t,
        i = e.substring(0, 4),
        n = e.substring(5, 7),
        r = e.substring(8, 10),
        o = new Array;
      return o[1] = "Jan", o[2] = "Feb", o[3] = "Mar", o[4] = "Apr", o[5] = "May", o[6] = "Jun", o[7] = "Jul", o[8] = "Aug", o[9] = "Sep", o[10] = "Oct", o[11] = "Nov", o[12] = "Dec", r + " " + o[parseInt(n, 10)] + " " + i
    }
    return !1
  }

  getFeed(e) {
    let arr = new Array;
    if (e.feed && e.feed.entry) {
      for (let i = 0; i < e.feed.entry.length; i++) {
        const item = e.feed.entry[i];
        let obj = this.getDefault(item);
        obj['id'] = this.getId(item.id.$t);
        obj['link'] = item.link.find(k => k.rel == 'alternate').href;
        obj['image'] = this.getImage(item);
        obj['label'] = item.category.map(k => k.term);
        'author' in item && (obj['author'] = this.getAuthor(item.author[0]));
        arr.push(obj);
      }
    }
    return arr;
  }
};

class BloggerRandom extends BloggerScript {
  constructor(mainScript = {}) {
    super(mainScript);
  }

  getTotalResults(e) {
    let index = e.feed.openSearch$totalResults.$t,
      jumlah = this._config.jumlah;
    if (jumlah) {
      if (index < jumlah) return false;
      index = this.shuffle2(1, (index - jumlah));
    } else {
      index = index <= 150 ? 1 : this.shuffle2(1, (index - 150));
      jumlah = 150;
    }
    return {
      'start-index': index,
      'max-results': jumlah
    }
  }

  getItems(e) {
    if ('entry' in e.feed) {
      let arr = this.getFeed(e);
      arr = this.shuffle(arr);
      return arr;
    }
    return [];
  }

  run(d, e = this.err, c = true) {
    let _this = this,
      type = c ? 'xhr' : 'xhr2';
    _this[type](`${d}?alt=json-in-script&max-results=0`, (v) => {
      let index = _this.getTotalResults(v);
      _this[type](`${d}?alt=json-in-script&start-index=${index['start-index']}&max-results=${index['max-results']}`, (s) => {
        e(_this.getItems(s));
      })
    })
  }
};

class BloggerRelated extends BloggerScript {
  constructor(mainScript = {}) {
    super(mainScript);
  }

  run(url, e = this.err, c = true) {
    let _this = this,
      j = 0,
      doc = document.location.pathname,
      labels = _this._config.labels,
      jumlah = _this._config.jumlah,
      type = c ? 'xhr' : 'xhr2';
    _this._config.arr = new Array;

    if (labels != 'undefined' && labels != '' && labels['length'] != 0) {
      labels.forEach((item) => {
        _this[type](`${url}/-/${item}?alt=json-in-script&max-results=${jumlah}`, (entry) => {
          let feed = _this.getFeed(entry);
          feed.forEach(post => {
            if (!(_this._config.arr.some(l => l.id == post.id)))
              _this._config.arr.push(post);
          });

          j++;
          if (j == labels.length) {
            if (_this._config.arr.length == 0) return e([]);

            let indexItem = _this._config.arr.map(k => (new URL(k.link).pathname == doc)).indexOf(true);
            _this._config.arr.splice(indexItem, 1);

            let arr = _this.shuffle(_this._config.arr).slice(0, jumlah);
            return e(arr);
          };
        });
      });
    } else {
      return e([]);
    }
  }
};

class BloggerSitemap extends BloggerScript {
  constructor(mainScript) {
    super(mainScript);
    this._settings = {
      'start-index': 1,
      'max-results': 150,
      'total-get': 0,
      'posts': new Array
    };
  }

  alphaSort(array) {
    let array1 = new Array,
      array2 = new Array,
      alpha = '';
    if (array.length != 0)
      this.sort(array, 'A-Z').forEach(item => {
        let firstChar = item.title.charAt(0).toLowerCase();
        if (-1 == alpha.indexOf(firstChar)) {
          alpha += firstChar;
          array1[firstChar] = [item];
        } else {
          array1[firstChar].push(item);
        }
      })
    for (const key in array1) {
      if (Object.hasOwnProperty.call(array1, key)) {
        const item = array1[key];
        array2.push({
          'id': key,
          'items': item
        })
      }
    };
    return array2;
  }

  run(url, callback = this.err, check = true) {
    const settings = this._settings,
      config = this._config,
      order = config.order || 'updated',
      newUrl = `${url}?alt=json-in-script&start-index=${settings['start-index']}&max-results=${settings['max-results']}&orderby=${order}`,
      newCallback = (feeds) => {
        if ('entry' in feeds.feed) {
          let index = (feeds.feed.openSearch$totalResults.$t || 0);
          Array.prototype.push.apply(settings['posts'], this.getFeed(feeds));
          if (feeds.feed.entry.length >= settings['max-results']) {
            settings['start-index'] += settings['max-results'];
            if (config['firstContent'] && settings['total-get'] == 1) callback(settings['posts'], settings['total-get'], false, index);
            this.run(url, callback, check);
          } else {
            callback(settings['posts'], settings['total-get'], true, index);
          }
        } else {
          callback(settings['posts'], settings['total-get'], true, settings['posts'].length);
        }
      },
      type = check ? 'xhr' : 'xhr2';
    settings['total-get']++;
    this[type](newUrl, newCallback);
  }
};

class BloggerComments extends BloggerScript {
  constructor(e) {
    super(e);
  }

  getComments(e) {
    let arr = new Array;
    if (e.feed && e.feed.entry) {
      for (let index = 0; index < e.feed.entry.length; index++) {
        const item = e.feed.entry[index];
        let obj = this.getDefault(item);
        obj['id'] = this.getId(item['id']['$t']);
        obj['link'] = item.link.find(k => 'alternate' == k.rel).href;
        'author' in item && (obj['author'] = this.getAuthor(item.author[0]));
        arr.push(obj);
      }
    }
    return arr;
  }

  run(id, jumlahComments, callback, ex = true) {
    let xhr = !ex ? 'xhr2' : 'xhr',
      uri = this._config.mainUrl || '',
      contentType = this._config.contentType || 'default',
      postId = id ? `/${id}/` : '/';
    this[xhr](`${uri}/feeds${postId}comments/${contentType}?alt=json&max-results=${jumlahComments}`, (e) => {
      let entry = this.getComments(e);
      callback(entry);
    });
  }
}