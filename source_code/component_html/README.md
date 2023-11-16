## Component HTML khusus BloggerScript
Membuat Daftar Postingan dengan html yang sudah disiapkan.

### Cara menggunakan
Buatlah element dengan class bernama `custom_post_v1`.
```
<div class='custom_post_v1'></div>
```
Selanjut nya tambahkan BloggerScript untuk mengambil daftar postingan.
```
let getPosts = new BloggerScript();
getPosts.xhr('https://nama.blogspot.com/feeds/posts/default?alt=json-in-script&max-results=5', (posts) => {
  let feeds = getPosts.getFeed(posts);

  console.log(feeds); // Output: list posts
});
```
Script di atas adalah contoh untuk mengambil daftar postingan, selanjutnya tinggal menambahkan component html nya.
```
let getPosts = new BloggerScript();
getPosts.xhr('https://nama.blogspot.com/feeds/posts/default?alt=json-in-script&max-results=5', (posts) => {
  let feeds = getPosts.getFeed(posts);

  console.log(feeds); // Output: list posts

  //Selector element custom_post_v1
  let element = document.querySelector('.custom_post_v1');
  
  //Eksekusi Element atau penambahan html kedalam element
  bloggerHtml.custom_post_v1(feeds, element);
});
```
Untuk Eksekusi Element nya ada dua cara, pertama seperti di atas dan kedua seperti berikut.
```
let element = document.querySelector('.custom_post_v1');
let html = bloggerHtml.custom_post_v1(feeds);
if(element) {
  element.innerHTML = html;
}
```
Demo: [Click Disini](https://siwaluh.github.io/BloggerScript/source_code/component_html/custom_post_v1).