const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors("*"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let products = [
  {
    "id": 1,
    "name": "Smartphone X",
    "price": 12000000,
    "description": "Smartphone terbaru dengan fitur canggih dan kamera 48MP.",
    "seller": "Apple Store",
    "rating": 5,
    "comments": [
      {
        "user": "JohnDoe",
        "comment": "Sangat puas dengan performanya!",
        "rating": 5
      },
      {
        "user": "JaneSmith",
        "comment": "Kamera bagus, Cocok untuk fotografi.",
        "rating": 5
      }
    ],
    "image": "https://www.apple.com/newsroom/images/2024/09/apple-debuts-iphone-16-pro-and-iphone-16-pro-max/article/Apple-iPhone-16-Pro-finish-lineup-240909_big.jpg.large.jpg",
    "categoryId": 1
  },
  {
    "id": 2,
    "name": "Laptop Pro",
    "price": 15000000,
    "description": "Laptop high-end dengan prosesor M2 dan layar retina 16 inci.",
    "seller": "Apple Store",
    "rating": 4.5,
    "comments": [
      {
        "user": "TechLover",
        "comment": "Sangat cepat dan responsif, cocok untuk pekerjaan berat.",
        "rating": 5
      },
      {
        "user": "CoderPro",
        "comment": "Harga mahal, tapi performa tidak mengecewakan.",
        "rating": 4
      }
    ],
    "image": "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full/MTA-59823779/apple_macbook_pro_-16_inci-_full04_stl2e2i9.jpeg",
    "categoryId": 1
  },
  {
    "id": 3,
    "name": "Smartwatch Z",
    "price": 2500000,
    "description": "Jam tangan pintar dengan pelacak kesehatan dan GPS.",
    "seller": "Tech World",
    "rating": 4.5,
    "comments": [
      {
        "user": "FitLife",
        "comment": "Sangat membantu untuk tracking aktivitas harian.",
        "rating": 5
      },
      {
        "user": "SportyGirl",
        "comment": "Fitur oke, tapi kadang lag.",
        "rating": 4
      }
    ],
    "image": "https://cdsassets.apple.com/live/SZLF0YNV/images/sp/111985_alu-spacegray-sp.jpg",
    "categoryId": 1
  },
  {
    "id": 4,
    "name": "Wireless Earbuds",
    "price": 500000,
    "description": "Earbuds nirkabel dengan suara jernih dan bass yang kuat.",
    "seller": "Gadget Hub",
    "rating": 4.5,
    "comments": [
      {
        "user": "MusicLover",
        "comment": "Suara sangat bagus untuk harganya.",
        "rating": 4
      },
      {
        "user": "BassHunter",
        "comment": "Bass mantap! Nyaman dipakai seharian.",
        "rating": 5
      }
    ],
    "image": "https://images-cdn.ubuy.co.id/64daa85d603c3c70c0393990-apple-earpods-with-lightning-connector.jpg",
    "categoryId": 1
  },
  {
    "id": 5,
    "name": "Tablet S",
    "price": 8000000,
    "description": "Tablet dengan layar besar dan performa cepat untuk multitasking.",
    "seller": "Tech World",
    "rating": 4.5,
    "comments": [
      {
        "user": "Designer",
        "comment": "Sangat nyaman untuk desain dan ilustrasi.",
        "rating": 5
      },
      {
        "user": "Bookworm",
        "comment": "Bagus untuk membaca dan menonton film.",
        "rating": 4
      }
    ],
    "image": "https://www.hellostore.id/cdn/shop/products/MY_iPad_10th_Gen_Wi-Fi_Pink_PDP_Image_Position-1b_540x_a1a8e07b-9635-49bc-a376-c8798bb7ed43.jpg?v=1679930277&width=1946",
    "categoryId": 1
  },
  {
    "id": 6,
    "name": "Leather Jacket",
    "price": 3500000,
    "description": "Jaket kulit premium dengan desain elegan dan nyaman dipakai.",
    "seller": "Fashion Hub",
    "rating": 4.5,
    "comments": [
      {
        "user": "Biker",
        "comment": "Desain keren dan sangat nyaman.",
        "rating": 5
      },
      {
        "user": "Stylish",
        "comment": "Cukup mahal, tapi sepadan dengan kualitasnya.",
        "rating": 4
      }
    ],
    "image": "https://d29c1z66frfv6c.cloudfront.net/pub/media/catalog/product/zoom/5c332c15c382ca4aeeada197b063eef6e5f0745a_xxl-1.jpg",
    "categoryId": 2
  },
  {
    "id": 7,
    "name": "Casual T-Shirt",
    "price": 150000,
    "description": "Kaos kasual nyaman dipakai dengan desain simple.",
    "seller": "Fashion Hub",
    "rating": 4.5,
    "comments": [
      {
        "user": "TShirtLover",
        "comment": "Sangat nyaman, pas di badan.",
        "rating": 4
      },
      {
        "user": "SimpleWear",
        "comment": "Bahan adem, cocok untuk sehari-hari.",
        "rating": 4
      }
    ],
    "image": "https://img.ws.mms.shopee.co.id/d406932391a7f1bc4c8655e87b0c2938",
    "categoryId": 2
  },
  {
    "id": 8,
    "name": "Jeans Slim Fit",
    "price": 500000,
    "description": "Celana jeans slim fit dengan bahan stretch yang nyaman.",
    "seller": "Denim Store",
    "rating": 4.5,
    "comments": [
      {
        "user": "JeanDude",
        "comment": "Nyaman dan modelnya keren.",
        "rating": 5
      },
      {
        "user": "FashionGuy",
        "comment": "Bagus, tapi sedikit sempit di bagian paha.",
        "rating": 4
      }
    ],
    "image": "https://triplejeans.id/cdn/shop/files/338F82802BWD_1.jpg?v=1688371601",
    "categoryId": 2
  },
  {
    "id": 9,
    "name": "Sneakers",
    "price": 700000,
    "description": "Sepatu sneakers dengan desain trendy dan nyaman untuk dipakai seharian.",
    "seller": "Footwear Store",
    "rating": 4.5,
    "comments": [
      {
        "user": "SneakerHead",
        "comment": "Desainnya mantap, sangat nyaman dipakai.",
        "rating": 5
      },
      {
        "user": "CasualWear",
        "comment": "Cocok untuk dipakai jalan-jalan.",
        "rating": 4
      }
    ],
    "image": "https://cdn-images.farfetch-contents.com/12/96/03/49/12960349_13486594_1000.jpg",
    "categoryId": 2
  },
  {
    "id": 10,
    "name": "Wrist Watch",
    "price": 1200000,
    "description": "Jam tangan klasik dengan tali kulit asli dan fitur water-resistant.",
    "seller": "Watch Store",
    "rating": 4.5,
    "comments": [
      {
        "user": "TimeKeeper",
        "comment": "Desain elegan dan terlihat mahal.",
        "rating": 5
      },
      {
        "user": "Fashionable",
        "comment": "Bagus, tapi agak berat di pergelangan.",
        "rating": 4
      }
    ],
    "image": "https://blog.luxehouze.com/wp-content/uploads/2023/10/DSC05429-crop-1024x576.jpg",
    "categoryId": 2
  },
  {
    "id": 11,
    "name": "Vacuum Cleaner",
    "price": 2000000,
    "description": "Vacuum cleaner ringan dengan daya hisap kuat dan fitur anti-debu.",
    "seller": "Home Appliances",
    "rating": 4.5,
    "comments": [
      {
        "user": "CleanFreak",
        "comment": "Daya hisap sangat kuat, cocok untuk karpet tebal.",
        "rating": 5
      },
      {
        "user": "HomeCare",
        "comment": "Fungsi bagus, tapi kabelnya agak pendek.",
        "rating": 4
      }
    ],
    "image": "https://id.misumi-ec.com/linked/material/fs/KAR1/PHOTO/223005613338_001.jpg",
    "categoryId": 3
  },
  {
    "id": 12,
    "name": "Air Purifier",
    "price": 3000000,
    "description": "Pembersih udara yang efektif untuk mengurangi alergen dan partikel debu di ruangan.",
    "seller": "Health Store",
    "rating": 4.5,
    "comments": [
      {
        "user": "FreshAir",
        "comment": "Sangat membantu untuk mengurangi debu di kamar tidur.",
        "rating": 5
      },
      {
        "user": "CleanLiving",
        "comment": "Desain minimalis, bekerja sangat baik.",
        "rating": 4
      }
    ],
    "image": "https://images.philips.com/is/image/philipsconsumer/6ce358a831534c39b108adb200aeced6?wid=700&hei=700&$pnglarge$",
    "categoryId": 3
  },
  {
    "id": 13,
    "name": "Air Conditioner",
    "price": 6000000,
    "description": "Pendingin udara dengan fitur hemat energi dan pengatur suhu otomatis.",
    "seller": "Home Comfort",
    "rating": 4.5,
    "comments": [
      {
        "user": "CoolBreeze",
        "comment": "Sangat efektif dan tidak bising.",
        "rating": 5
      },
      {
        "user": "SummerHeat",
        "comment": "Fitur hemat energinya benar-benar terasa.",
        "rating": 4
      }
    ],
    "image": "https://static-siplah.blibli.com/data/images/SCHM-0025-00028/a9f0fa12-409e-419a-afd2-18081ad9612c.jpg",
    "categoryId": 3
  },
  {
    "id": 14,
    "name": "Refrigerator",
    "price": 7000000,
    "description": "Kulkas dengan kapasitas besar dan teknologi pendinginan cepat.",
    "seller": "Appliance World",
    "rating": 4.5,
    "comments": [
      {
        "user": "ColdStorage",
        "comment": "Muatan besar dan desainnya stylish.",
        "rating": 5
      },
      {
        "user": "FridgeMaster",
        "comment": "Pendinginan cepat, tapi cukup bising.",
        "rating": 4
      }
    ],
    "image": "https://image-us.samsung.com/SamsungUS/home/05312023/5400_01_Stainless_Steel_SCOM.jpg?$default$",
    "categoryId": 3
  },
  {
    "id": 15,
    "name": "Blender",
    "price": 500000,
    "description": "Blender dengan mata pisau tajam dan pengaturan kecepatan variabel.",
    "seller": "Kitchen Hub",
    "rating": 4.5,
    "comments": [
      {
        "user": "SmoothieLover",
        "comment": "Sangat bagus untuk membuat smoothie.",
        "rating": 4
      },
      {
        "user": "CookMaster",
        "comment": "Mudah digunakan dan dibersihkan.",
        "rating": 5
      }
    ],
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Blender_logo_no_text.svg/2503px-Blender_logo_no_text.svg.png",
    "categoryId": 3
  },
  {
    "id": 16,
    "name": "Football",
    "price": 250000,
    "description": "Bola sepak standar FIFA dengan material tahan lama.",
    "seller": "Sports World",
    "rating": 4.5,
    "comments": [
      {
        "user": "FootballFan",
        "comment": "Materialnya kuat dan nyaman saat digunakan.",
        "rating": 5
      },
      {
        "user": "SportyGuy",
        "comment": "Sangat bagus untuk latihan harian.",
        "rating": 4
      }
    ],
    "image": "https://upload.wikimedia.org/wikipedia/commons/1/1d/Football_Pallo_valmiina-cropped.jpg",
    "categoryId": 5
  },
  {
    "id": 17,
    "name": "Basketball",
    "price": 300000,
    "description": "Bola basket berbahan karet dengan grip kuat dan ketahanan tinggi.",
    "seller": "Sports Arena",
    "rating": 4.5,
    "comments": [
      {
        "user": "HoopsFan",
        "comment": "Grip sangat bagus, tidak licin saat digunakan.",
        "rating": 5
      },
      {
        "user": "BallPlayer",
        "comment": "Bagus, tapi agak berat untuk anak-anak.",
        "rating": 4
      }
    ],
    "image": "https://upload.wikimedia.org/wikipedia/commons/7/7a/Basketball.png",
    "categoryId": 5
  },
  {
    "id": 18,
    "name": "Tennis Racket",
    "price": 450000,
    "description": "Raket tenis ringan dengan grip yang nyaman dan tali senar kuat.",
    "seller": "Racket World",
    "rating": 4.5,
    "comments": [
      {
        "user": "TennisPro",
        "comment": "Raketnya sangat ringan dan nyaman dipakai.",
        "rating": 5
      },
      {
        "user": "SportAddict",
        "comment": "Grip bagus, tapi senarnya agak longgar setelah beberapa kali digunakan.",
        "rating": 4
      }
    ],
    "image": "https://www.racketworld.co.uk/cdn/shop/files/101lv9_600x.png?v=1707921936",
    "categoryId": 5
  },
  {
    "id": 19,
    "name": "Yoga Mat",
    "price": 150000,
    "description": "Matras yoga anti-selip yang nyaman dan ringan untuk berbagai pose.",
    "seller": "Healthy Living",
    "rating": 4.5,
    "comments": [
      {
        "user": "YogaLover",
        "comment": "Sangat nyaman untuk dipakai yoga, tidak licin.",
        "rating": 5
      },
      {
        "user": "FitMama",
        "comment": "Cukup tebal dan tidak mudah rusak.",
        "rating": 4
      }
    ],
    "image": "https://happyfit.co.id/cdn/shop/files/HAPPYFIT-Free-Strap-Yoga-Mat-Tpe-8mm-Asana-HAPPYFIT-5537.jpg?v=1709278542",
    "categoryId": 5
  },
  {
    "id": 20,
    "name": "Dumbbells Set",
    "price": 800000,
    "description": "Set dumbbell adjustable dengan pegangan ergonomis dan piring beban yang dapat disesuaikan.",
    "seller": "Fitness Gear",
    "rating": 4.5,
    "comments": [
      {
        "user": "GymRat",
        "comment": "Sangat nyaman dan mudah diatur beratnya.",
        "rating": 5
      },
      {
        "user": "FitLife",
        "comment": "Pegangan nyaman, tapi piring bebannya agak sulit dilepas.",
        "rating": 4
      }
    ],
    "image": "https://contents.mediadecathlon.com/p1248562/k$01448487cc01f6437afa685728065895/dumbbell-set-latihan-beban-10-kg-corength-8491830.jpg",
    "categoryId": 5
  }
]

app.get('/api/', (req, res) => {
  return res.send('Hello World');
})

app.get('/api/products', (req, res) => {
  const { search, category, sort } = req.query;

  let filteredProducts = products;

  if (search) {
    filteredProducts = filteredProducts.filter((product) => product.name.toLowerCase().includes(search.toLowerCase()))
  }

  if (category && category !== 'all') {
    filteredProducts = filteredProducts.filter((product) => product.categoryId == category)
  }

  if(sort) {
    if(sort === 'ascending') {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if(sort === 'descending') {
      filteredProducts.sort((a, b) => b.price - a.price);
    }
  }
  
  return res.status(200).json(filteredProducts);
})

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});