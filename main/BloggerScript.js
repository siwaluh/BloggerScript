class BloggerScript {
  constructor(obj) {
    this.config = obj || {};
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

  createURL() {
    let q = this.config,
      url = document.location.protocol + '//' + q.host + '/feeds/';

    if (typeof q.type == 'object') {
      if (q.type.name == 'comments')
        url += q.type.id + '/' + q.type.name + '/' + q.feed;
      else
        url += q.type.name + '/' + q.feed + '/' + q.type.id;
    } else
      url += q.type + '/' + q.feed;

    if (q.label != false && typeof q.type != 'object')
      url += '/-/' + q.label;
    url = new URL(url);
    ['q', 'category', 'start-index', 'max-results', 'orderby', 'alt'].forEach(item => {
      if (q[item] != false && typeof q.type != 'object')
        url.searchParams.set(item, q[item]);
      else if (typeof q.type == 'object' && item == 'alt')
        url.searchParams.set(item, q[item]);
      else if (typeof q.type == 'object' && q.type.name == 'comments' && (item == 'start-index' || item == 'max-results'))
        url.searchParams.set(item, q[item]);
    });
    return url;

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
    if (b === 0) return [];
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

  getXHRtype(url) {
    return new URL(url).hostname == document.location.hostname ? 'xhr' : 'xhr2'
  }

  get config() {
    return this._config;
  }

  set config(obj) {
    if (!('_config' in this))
      this._config = {
        'host': document.location.hostname,
        'feed': 'default',
        'type': 'posts',
        'alt': 'json-in-script',
        'max-results': 10,
        'start-index': 1,
        'category': false,
        'label': false,
        'q': false,
        'orderby': 'published'
      };

    for (const key in obj) {
      if (Object.hasOwnProperty.call(obj, key)) {
        if ('jumlah' == key)
          this._config['max-results'] = obj[key], this._config[key] = obj[key];
        else
          this._config[key] = obj[key];
      }
    }
  }

  getId(e) {
    return e.split('post-')[1] || e.split('page-')[1];
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
    let arr = new Array,
      entry = (e.feed && e.feed.entry) || (e.entry && [e.entry]) || false;
    if (entry) {
      for (let i = 0; i < entry.length; i++) {
        const item = entry[i];
        let obj = this.getDefault(item);
        obj['id'] = this.getId(item.id.$t);
        obj['link'] = item.link.find(k => k.rel == 'alternate').href;
        obj['image'] = this.getImage(item);
        'category' in item && (obj['label'] = item.category.map(k => k.term));
        'author' in item && (obj['author'] = this.getAuthor(item.author[0]));
        'thr$total' in item && (obj['comments_count'] = item.thr$total.$t);
        arr.push(obj);
      }
    }
    return arr;
  }

  run(callback) {
    let url = this.createURL().href,
      xhr = this.getXHRtype(url);
    this[xhr](url, (e) => (callback || this.err)(this.getFeed(e)));
  }
};

class BloggerRandom extends BloggerScript {
  constructor(mainScript = {}) {
    super(mainScript);
    this.config = {
      'max-results': 0
    };
  }

  getTotalResults(e) {
    let index = e.feed.openSearch$totalResults.$t,
      jumlah = this.config['jumlah'];
    if (jumlah) {
      if (index < jumlah)
        index = 1;
      else
        index = this.shuffle2(1, (index - jumlah));
    } else {
      index = index <= 100 ? 1 : this.shuffle2(1, (index - 100));
      jumlah = 100;
    }

    this.config = {
      'max-results': jumlah,
      'start-index': index
    };
    return this.createURL().href;
  }

  getItems(e) {
    if ('entry' in e.feed) {
      let arr = this.getFeed(e);
      arr = this.shuffle(arr);
      return arr;
    }
    return [];
  }

  run(callback) {
    let url = this.createURL().href,
      xhr = this.getXHRtype(url);

    this[xhr](url, (entry) => {
      let url = this.getTotalResults(entry);
      if (url == false) {
        this.config = {
          'max-results': 0,
          'start-index': 1
        };
        return (callback || this.err)([]);
      }
      this[xhr](url, (entry) => {
        this.config = {
          'max-results': 0,
          'start-index': 1
        };
        (callback || this.err)(this.getItems(entry));
      });
    });
  }
};

class BloggerRelated extends BloggerScript {
  constructor(mainScript = {}) {
    super(mainScript);
  }

  run(callback) {
    let i = 0,
      path = document.location.pathname,
      labels = this.config.label,
      jumlah = this.config.jumlah,
      arr = new Array;

    if (typeof labels == 'object') {
      labels.forEach((item, index, items) => {
        this._config['label'] = item;
        let url = this.createURL().href,
          xhr = this.getXHRtype(url);

        this[xhr](url, (entry) => {
          let feed = this.getFeed(entry);

          feed.forEach(item => !arr.some(l => l.id == item.id) && arr.push(item));

          i++;
          if (i == items.length) {
            let spltIndx = arr.map(k => (new URL(k.link).pathname == path)).indexOf(true);
            arr.splice(spltIndx, 1);
            arr = this.shuffle(arr).slice(0, jumlah);
            (callback || this.err)(arr);
          }
        });
      });
    } else if (typeof labels == 'string') {
      let url = this.createURL().href,
        xhr = this.getXHRtype(url);
      this[xhr](url, entry => {
        (callback || this.err)(this.getFeed(entry));
      })
    } else(callback || this.err)([]);
  }
};

class BloggerSitemap extends BloggerScript {
  constructor(mainScript) {
    super(mainScript);
    this.config = {
      'max-results': 100,
      'total-get': 0
    }
    this.posts = [];
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

  get posts() {
    return this._posts;
  }

  set posts(array) {
    if (!('_posts' in this))
      this._posts = new Array;
    Array.prototype.push.apply(this._posts, array);
  }

  resetPosts() {
    if ('_posts' in this)
      this._posts = new Array;
  }

  async run(callback) {
    let getTotalPages = async () => {
      let url = this.createURL().href;
      return new Promise((resolve) => {
        this[this.getXHRtype(url)](url, (feeds) => {
          if (feeds?.feed?.entry) {
            let totalPosts = feeds.feed.openSearch$totalResults.$t || 0;
            let totalPages = Math.ceil(totalPosts / this.config['max-results']);
            resolve(totalPages);
          } else {
            resolve(0);
          }
        });
      });
    };

    let getAllPages = async (totalPages) => {
      let promises = [];
      for (let page = 1; page <= totalPages; page++) {
        this.config['start-index'] = ((page - 1) * this.config['max-results']) + 1;
        let url = this.createURL().href;
        promises.push(new Promise((resolve) => {
          this[this.getXHRtype(url)](url, (feeds) => {
            if (feeds?.feed?.entry) {
              resolve(this.getFeed(feeds));
            } else {
              resolve([]);
            }
          });
        }));
      }
      return Promise.all(promises);
    };

    try {
      let totalPages = await getTotalPages();
      let allResults = await getAllPages(totalPages);
      let posts = allResults.flat();
      
      callback({
        totalPosts: posts.length,
        totalGet: totalPages,
        posts: posts,
        completed: true
      });
      
      // Reset config
      this.config = {
        'max-results': 100,
        'start-index': 1,
        'total-get': 0
      };
      this.resetPosts();

    } catch (err) {
      console.error(err);
      callback({
        totalPosts: 0,
        totalGet: 0,
        posts: [],
        completed: true
      });
    }
  }
};

class BloggerComments extends BloggerScript {
  constructor(e) {
    super(e);
    this.config = {
      'type': (this.config.type != 'comments' && this.config.type.name != 'comments') ? 'comments' : this.config.type,
      'max-results': this.config.jumlah ? this.config.jumlah : 500
    }
  }

  getComments(e) {
    let arr = new Array;
    if (e.feed && e.feed.entry) {
      for (let index = 0; index < e.feed.entry.length; index++) {
        const item = e.feed.entry[index];
        let obj = this.getDefault(item);
        obj['id'] = this.getId(item['id']['$t']);
        'thr$in-reply-to' in item && (obj['post-id'] = this.getId(item['thr$in-reply-to']['ref']));
        'thr$in-reply-to' in item && (obj['post-source'] = item['thr$in-reply-to']['source'].replace('http://', 'https://'));
        obj['link'] = item.link.find(k => 'alternate' == k.rel).href;
        'author' in item && (obj['author'] = this.getAuthor(item.author[0]));
        arr.push(obj);
      }
    }
    return arr;
  }

  getPostInfo(array, callback) {
    if (array.length != 0) {
      let x = 0,
        z = 0,
        w = this.config.type,
        y = this.config.feed,
        arr = new Array;

      array.forEach(item => 'post-id' in item && 'post-source' in item && !(item['post-id'] in arr) && (arr[item['post-id']] = {
        'check': true,
        'type': /\/p\//.test(item['link']) ? 'pages' : 'posts'
      }, x++));

      for (const key in arr) {
        if (Object.hasOwnProperty.call(arr, key)) {
          this.config = {
            'type': {
              'name': arr[key].type,
              'id': key
            },
            'feed': 'summary'
          };
          let url = this.createURL().href,
            xhr = this.getXHRtype(url);
          this[xhr](url, (entry) => {
            if (entry && 'entry' in entry)
              arr[key] = this.getFeed(entry);
            z++
            if (z == x) {
              array = array.map(item => {
                if ('post-id' in item)
                  item['post-info'] = arr[item['post-id']][0] || false;
                else
                  item['post-info'] = false;
                return item;
              });
              this.config = {
                'type': w,
                'feed': y
              };
              (callback || this.err)(array);
            }
          });
        }
      }
    } else(callback || this.err)(array);
  }

  run(callback) {
    let url = this.createURL().href,
      xhr = this.getXHRtype(url);
    this[xhr](url, (entry) => (callback || this.err)(this.getComments(entry)));
  }
};
