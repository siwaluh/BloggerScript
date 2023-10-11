# Live Search V1
Demo: [Click Disini](https://siwaluh.github.io/BloggerScript/source_code/live_search/index.html).

## Settings
Set post berdasarkan label ataupun tidak, cari kode yang mirip seperti berikut.
```
getPostByName(value, function(post) {

    /*Kode yang panjang*/

}, 'Series');
```
Kode di atas akan menampilkan postingan berdasarkan label 'Series', jika ingin menampilkan semua postingan tanpa filter label maka ubah 'Series' menjadi `false`. Seperti kode berikut.
```
getPostByName(value, function(post) {

    /*Kode yang panjang*/

}, false);
```