function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _typeof(o) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}

function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var BloggerScript = /*#__PURE__*/ function () {
  function BloggerScript() {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, BloggerScript);
    this._config = obj;
  }
  _createClass(BloggerScript, [{
    key: "err",
    value: function err(e) {
      console.log(e);
      return e;
    }
  }, {
    key: "createRT",
    value: function createRT(a) {
      var result = '',
        characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
        charactersLength = characters.length;
      for (var i = 0; i < a; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
    }
  }, {
    key: "resizeImage",
    value: function resizeImage(e) {
      var b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (!b) return e;
      var f = /\/(s|w|h)\d{1,4}-((w|s|h)(\d{1,4})+-)?(c{1,2}|p-k-no-nu|rw)/gi;
      var l = /\=(s|w|h)\d{1,4}-((w|s|h)(\d{1,4})+-)?(c{1,2}|p-k-no-nu|rw)/gi;
      var k = /(\/(w|h|s)\d{1,4}\/)/gi,
        x = /(\=(w|h|s)\d{1,4})$/gi;
      var val = /\-(rw)$/.test(b);
      if (k.test(e)) {
        e = e.replace(k, '/s72-c/');
      }
      if (x.test(e)) {
        e = e.replace(x, '=s72-c');
      }
      if (val) e = e.replace(/\.(gif|jpe?g|tiff?|png|bmp)$/, '.webp');
      return e.match(f) ? e.replace(f, "/".concat(b)) : e.match(l) ? e.replace(l, "=".concat(b)) : e;
    }
  }, {
    key: "shuffle",
    value: function shuffle(a) {
      var b = a.length,
        c,
        d;
      if (b === 0) return false;
      while (--b) {
        c = Math.floor(Math.random() * (b + 1));
        d = a[b];
        a[b] = a[c];
        a[c] = d;
      };
      return a;
    }
  }, {
    key: "shuffle2",
    value: function shuffle2(a, b) {
      return Math.floor(Math.random() * (b - a)) + a;
    }
  }, {
    key: "sort",
    value: function sort(items, sortBy) {
      if (sortBy == 'Update' || sortBy == 'Added') {
        var key = sortBy == 'Update' ? 'updated' : 'published';
        items = items.sort(function (a, b) {
          return a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0;
        }).reverse();
      } else if (sortBy == 'A-Z' || sortBy == 'Z-A') {
        items = items.sort(function (a, b) {
          return a.title.localeCompare(b.title, undefined, {
            numeric: true
          });
        });
        if (sortBy == 'Z-A') items = items.reverse();
      }
      return items;
    }
  }, {
    key: "xhr",
    value: function xhr(b) {
      var c = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.err;
      var d = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
      d.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200 || this.status == 304) {
          var f = this.responseText,
            g = JSON.parse(f.substring(f.indexOf('{'), f.lastIndexOf('}') + 1));
          c && c(g);
        } else if (this.readyState == 4) {
          c && c({});
        }
      };
      d.open('GET', b, true);
      d.send();
    }
  }, {
    key: "xhr2",
    value: function xhr2(a) {
      var b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.err;
      var script = document.createElement('script'),
        text = 'xhr2' + this.createRT(7);
      window[text] = function (e) {
        return b(e);
      };
      script.src = "".concat(a, "&callback=window.").concat(text);
      script.onerror = function (e) {
        console.log(e);
        b({});
      };
      script.async = true;
      return (document.body || document.getElementsByTagName('body')[0]).appendChild(script);
    }
  }, {
    key: "getId",
    value: function getId(e) {
      return e.split('post-')[1];
    }
  }, {
    key: "getAuthor",
    value: function getAuthor(e) {
      var obj = {};
      'name' in e && (obj['name'] = e.name.$t);
      'uri' in e && (obj['uri'] = e.uri.$t);
      if ('gd$image' in e && 'src' in e.gd$image && e.gd$image.src.indexOf('https://img1.blogblog.com/') == -1) {
        obj['image'] = this.resizeImage(e.gd$image.src, this._config.sizeImage);
      } else {
        obj['image'] = this._config.noImage ? this.resizeImage(this._config.noImage, this._config.sizeImage) : '';
      }
      return obj;
    }
  }, {
    key: "getDefault",
    value: function getDefault(e) {
      var _this2 = this;
      var a = ['published', 'updated', 'content', 'summary', 'title'],
        b = {};
      a.forEach(function (i) {
        if (i in e) {
          b[i] = e[i]['$t'];
          if (i == 'published') b['date'] = _this2.getTime(e[i]['$t']);
        }
      });
      return b;
    }
  }, {
    key: "getImage",
    value: function getImage(e) {
      var noImage = this._config.noImage ? this.resizeImage(this._config.noImage, this._config.sizeImage) : '';
      if ('media$thumbnail' in e) {
        return this.resizeImage(e.media$thumbnail.url, this._config.sizeImage);
      } else {
        if ('content' in e) {
          var s = e.content.$t,
            a = s.indexOf("<img"),
            b = s.indexOf("src=\"", a),
            c = s.indexOf("\"", b + 5),
            d = s.substr(b + 5, c - b - 5);
          if (a != -1 && b != -1 && c != -1 && d != "") {
            return d;
          } else {
            return noImage;
          }
        } else {
          return noImage;
        }
      }
    }
  }, {
    key: "getTime",
    value: function getTime(t) {
      if (/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/.test(t)) {
        var e = t,
          i = e.substring(0, 4),
          n = e.substring(5, 7),
          r = e.substring(8, 10),
          o = new Array();
        return o[1] = "Jan", o[2] = "Feb", o[3] = "Mar", o[4] = "Apr", o[5] = "May", o[6] = "Jun", o[7] = "Jul", o[8] = "Aug", o[9] = "Sep", o[10] = "Oct", o[11] = "Nov", o[12] = "Dec", r + " " + o[parseInt(n, 10)] + " " + i;
      }
      return !1;
    }
  }, {
    key: "getFeed",
    value: function getFeed(e) {
      var arr = new Array();
      if (e.feed && e.feed.entry) {
        for (var i = 0; i < e.feed.entry.length; i++) {
          var item = e.feed.entry[i];
          var obj = this.getDefault(item);
          obj['id'] = this.getId(item.id.$t);
          obj['link'] = item.link.find(function (k) {
            return k.rel == 'alternate';
          }).href;
          obj['image'] = this.getImage(item);
          obj['label'] = item.category.map(function (k) {
            return k.term;
          });
          'author' in item && (obj['author'] = this.getAuthor(item.author[0]));
          arr.push(obj);
        }
      }
      return arr;
    }
  }]);
  return BloggerScript;
}();;
var BloggerRandom = /*#__PURE__*/ function (_BloggerScript) {
  _inherits(BloggerRandom, _BloggerScript);
  var _super = _createSuper(BloggerRandom);

  function BloggerRandom() {
    var mainScript = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, BloggerRandom);
    return _super.call(this, mainScript);
  }
  _createClass(BloggerRandom, [{
    key: "getTotalResults",
    value: function getTotalResults(e) {
      var index = e.feed.openSearch$totalResults.$t,
        jumlah = this._config.jumlah;
      if (jumlah) {
        if (index < jumlah) return false;
        index = this.shuffle2(1, index - jumlah);
      } else {
        index = index <= 150 ? 1 : this.shuffle2(1, index - 150);
        jumlah = 150;
      }
      return {
        'start-index': index,
        'max-results': jumlah
      };
    }
  }, {
    key: "getItems",
    value: function getItems(e) {
      if ('entry' in e.feed) {
        var arr = this.getFeed(e);
        arr = this.shuffle(arr);
        return arr;
      }
      return [];
    }
  }, {
    key: "run",
    value: function run(d) {
      var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.err;
      var c = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var _this = this,
        type = c ? 'xhr' : 'xhr2';
      _this[type]("".concat(d, "?alt=json-in-script&max-results=0"), function (v) {
        var index = _this.getTotalResults(v);
        _this[type]("".concat(d, "?alt=json-in-script&start-index=").concat(index['start-index'], "&max-results=").concat(index['max-results']), function (s) {
          e(_this.getItems(s));
        });
      });
    }
  }]);
  return BloggerRandom;
}(BloggerScript);;
var BloggerRelated = /*#__PURE__*/ function (_BloggerScript2) {
  _inherits(BloggerRelated, _BloggerScript2);
  var _super2 = _createSuper(BloggerRelated);

  function BloggerRelated() {
    var mainScript = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, BloggerRelated);
    return _super2.call(this, mainScript);
  }
  _createClass(BloggerRelated, [{
    key: "run",
    value: function run(url) {
      var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.err;
      var c = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var _this = this,
        j = 0,
        doc = document.location.pathname,
        labels = _this._config.labels,
        jumlah = _this._config.jumlah,
        type = c ? 'xhr' : 'xhr2';
      _this._config.arr = new Array();
      if (labels != 'undefined' && labels != '' && labels['length'] != 0) {
        labels.forEach(function (item) {
          _this[type]("".concat(url, "/-/").concat(item, "?alt=json-in-script&max-results=").concat(jumlah), function (entry) {
            var feed = _this.getFeed(entry);
            feed.forEach(function (post) {
              if (!_this._config.arr.some(function (l) {
                  return l.id == post.id;
                })) _this._config.arr.push(post);
            });
            j++;
            if (j == labels.length) {
              if (_this._config.arr.length == 0) return e([]);
              var indexItem = _this._config.arr.map(function (k) {
                return new URL(k.link).pathname == doc;
              }).indexOf(true);
              _this._config.arr.splice(indexItem, 1);
              var arr = _this.shuffle(_this._config.arr).slice(0, jumlah);
              return e(arr);
            };
          });
        });
      } else {
        return e([]);
      }
    }
  }]);
  return BloggerRelated;
}(BloggerScript);;
var BloggerSitemap = /*#__PURE__*/ function (_BloggerScript3) {
  _inherits(BloggerSitemap, _BloggerScript3);
  var _super3 = _createSuper(BloggerSitemap);

  function BloggerSitemap(mainScript) {
    var _this3;
    _classCallCheck(this, BloggerSitemap);
    _this3 = _super3.call(this, mainScript);
    _this3._settings = {
      'start-index': 1,
      'max-results': 150,
      'total-get': 0,
      'posts': new Array()
    };
    return _this3;
  }
  _createClass(BloggerSitemap, [{
    key: "alphaSort",
    value: function alphaSort(array) {
      var array1 = new Array(),
        array2 = new Array(),
        alpha = '';
      if (array.length != 0) this.sort(array, 'A-Z').forEach(function (item) {
        var firstChar = item.title.charAt(0).toLowerCase();
        if (-1 == alpha.indexOf(firstChar)) {
          alpha += firstChar;
          array1[firstChar] = [item];
        } else {
          array1[firstChar].push(item);
        }
      });
      for (var key in array1) {
        if (Object.hasOwnProperty.call(array1, key)) {
          var item = array1[key];
          array2.push({
            'id': key,
            'items': item
          });
        }
      };
      return array2;
    }
  }, {
    key: "run",
    value: function run(url) {
      var _this4 = this;
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.err;
      var check = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var settings = this._settings,
        config = this._config,
        order = config.order || 'updated',
        newUrl = "".concat(url, "?alt=json-in-script&start-index=").concat(settings['start-index'], "&max-results=").concat(settings['max-results'], "&orderby=").concat(order),
        newCallback = function newCallback(feeds) {
          if ('entry' in feeds.feed) {
            var index = feeds.feed.openSearch$totalResults.$t || 0;
            Array.prototype.push.apply(settings['posts'], _this4.getFeed(feeds));
            if (feeds.feed.entry.length >= settings['max-results']) {
              settings['start-index'] += settings['max-results'];
              if (config['firstContent'] && settings['total-get'] == 1) callback(settings['posts'], settings['total-get'], false, index);
              _this4.run(url, callback, check);
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
  }]);
  return BloggerSitemap;
}(BloggerScript);;
var BloggerComments = /*#__PURE__*/ function (_BloggerScript4) {
  _inherits(BloggerComments, _BloggerScript4);
  var _super4 = _createSuper(BloggerComments);

  function BloggerComments(e) {
    _classCallCheck(this, BloggerComments);
    return _super4.call(this, e);
  }
  _createClass(BloggerComments, [{
    key: "getComments",
    value: function getComments(e) {
      var arr = new Array();
      if (e.feed && e.feed.entry) {
        for (var index = 0; index < e.feed.entry.length; index++) {
          var item = e.feed.entry[index];
          var obj = this.getDefault(item);
          obj['id'] = this.getId(item['id']['$t']);
          obj['link'] = item.link.find(function (k) {
            return 'alternate' == k.rel;
          }).href;
          'author' in item && (obj['author'] = this.getAuthor(item.author[0]));
          arr.push(obj);
        }
      }
      return arr;
    }
  }, {
    key: "run",
    value: function run(id, jumlahComments, callback, ex) {
      var _this5 = this;
      var xhr = !ex ? 'xhr2' : 'xhr',
        uri = this._config.mainUrl || '',
        contentType = this._config.contentType || 'default',
        postId = id ? "/".concat(id, "/") : '/';
      this[xhr]("".concat(uri, "/feeds").concat(postId, "comments/").concat(contentType, "?alt=json&max-results=").concat(jumlahComments), function (e) {
        var entry = _this5.getComments(e);
        callback(entry);
      });
    }
  }]);
  return BloggerComments;
}(BloggerScript);