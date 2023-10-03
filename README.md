# BloggerScript
Create Simple Feed Blogger with BloggerScript

## Cara Menggunakan
### Mengambil sebagian postingan, hanya bisa mengambil maksimal 150 post.
```
const bloggerFeed = new BloggerScript();

bloggerFeed.xhr('https://blog_url.blogspot.com/feeds/posts/default?alt=json-in-script&max-results=20', function(entry) {
  console.log(entry); //Output Array entry
});
```


### Mengambil seluruh postingan yang ada, bisa mengambil lebih dari 150.
```
const bloggerSitemap = new BloggerSitemap();

bloggerSitemap.run('https://blog_url.blogspot.com/feeds/posts/default', function(entry) {
  console.log(entry); //Output Array Entry
});
```


### Mengambil postingan random, hanya bisa mengambil maksimal 150 post.
```
const bloggerRandom = new BloggerRandom({
  //Atur Jumlah Postingan yang ingin di tampilkan maksimal 150
  'jumlah': 10
});

bloggerRandom.run('https://blog_url.blogspot.com/feeds/posts/default', function(entry) {
  console.log(entry); //Output Array Entry
});
```


### Mengambil postingan per category, cocok untuk related post.
```
const bloggerRelated = new BloggerRelated({
  'labels': ['Blogger', 'Otomotif', 'Hiburan'],
  //Jumlah Post yang akan di ambil, maksimal post yang dapat di ambil adalah jumlah label di kalikan 15, contoh: 15x3 = 45.
  'jumlah': 10
});

bloggerRelated.run('https://blog_url.blogspot.com/feeds/posts/default', function(entry) {
  console.log(entry); //Output Array Entry
});
```


## Array Entry
Output Dari Array Entry
```
const bloggerFeed = new BloggerScript();

bloggerFeed.xhr('https://blog_url.blogspot.com/feeds/posts/default?alt=json-in-script&max-results=20', function(entry) {
  console.log(entry); //Output Array entry

  entry.forEach(function(post) {

    console.log(post.title); // judul postingan (string)
    console.log(post.link); // link postingan (string)
    console.log(post.image); // gambar postingan (string)
    console.log(post.label); // label postingan (array)
    console.log(post.date); //Tanggal postingan (string)
    console.log(post.published); //Tanggal postingan berformat ISO (string)
    console.log(post.updated); //Tanggal postingan terupdate berformat ISO (string)

    if ('summary' in post) {
      console.log(post.summary); // summary postingan berupa text (string)
    };

    if ('content' in post) {
      console.log(post.content); // isi postingan termasuk html (string)
    };

    if ('author' in post) {
      console.log(post.author); //informasi penulis
    };
  })
});
```

## Fungsi warisan
Beberapa fungsi yang bisa di pakai selain mengambil postingan

### Fungsi Resize Image
Mengubah ukuran gambar, jika gambar tidak di upload dari server blogger maka ukuran gambar tidak bisa di ubah.
```
const bloggerFeed = new BloggerScript();

let image = 'image_url';
let newSizeImage = 's800-c-rw';
let newImage = bloggerFeed.resizeImage(image, newSizeImage);

console.log(newImage) // output image resized;
```
Adapun Format untuk ukuran gambar nya sebagai berikut:
```
1. s800-c => Konversi berdasarkan lebar gambar yakni 800.
2. w480-h360-c => Konversi berdasarkan gambar lebar 480 dan tinggi gambar 360.

Dukungan Format Webp;
untuk mengubah format gambar menjadi webp tambahkan "-rw" di akhir ukuran gambar.
1. s800-c-rw
2. w480-h360-c-rw
```
