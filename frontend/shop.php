<?php

session_start();

$shop =
$_GET['shop']
??
'gadget-world';


$shops = [

'gadget-world'=>[
 'Gadget World',
 '📱',
 'Phones, laptops and electronic accessories.',
 '4.8',
 'Shop #105'
],

'fashion-street'=>[
 'Fashion House',
 '👗',
 'Fashion, shoes and accessories.',
 '4.7',
 'Shop #23'
],

'car-showroom'=>[
 'Car Empire',
 '🚗',
 'Cars, vehicles and automotive services.',
 '4.9',
 'Shop #52'
],

'furniture-city'=>[
 'Home Comforts',
 '🛋️',
 'Furniture and home decoration.',
 '4.6',
 'Shop #78'
],

'electronics-mall'=>[
 'Electronics Mall',
 '💻',
 'Phones, computers, TVs and electronics.',
 '4.8',
 'Mall #12'
],

'food-court'=>[
 'Food Court',
 '🍔',
 'Restaurants, meals and drinks.',
 '4.7',
 'Court #08'
],

'tech-hub'=>[
 'Tech Hub',
 '🖥️',
 'Technology services and devices.',
 '4.9',
 'Hub #04'
]

];


$data =
$shops[$shop]
??
$shops['gadget-world'];


$isLoggedIn =
!empty(
 $_SESSION['user_id']
);

?>

<!doctype html>

<html lang="en">

<head>

<meta charset="utf-8">

<meta
name="viewport"
content="width=device-width,initial-scale=1"
>

<title>
<?=htmlspecialchars($data[0])?>
—
KASUMET
</title>


<style>

body{

 margin:0;

 background:#06120c;

 color:#f4fff8;

 font-family:
 Arial,
 sans-serif;

}


.top{

 height:64px;

 padding:0 18px;

 display:flex;

 align-items:center;

 justify-content:
 space-between;

 background:#040d08;

 border-bottom:
 1px solid #173524;

}


.logo{

 font-weight:900;

 color:#22e66b;

 font-size:20px;

}


.back{

 color:#a7b8ae;

 text-decoration:none;

}


.hero{

 padding:30px 18px;

 background:
 radial-gradient(
  circle at 50% 40%,
  #174c2b,
  transparent 60%
 );

 text-align:center;

}


.icon{

 font-size:70px;

}


.hero h1{

 font-size:38px;

 margin:8px;

}


.hero p{

 color:#91a49a;

}


.meta{

 color:#22e66b;

}


.content{

 max-width:900px;

 margin:auto;

 padding:20px;

}


.content>p{

 color:#8fa39a;

 line-height:1.7;

}


.products{

 display:grid;

 grid-template-columns:
 repeat(3,1fr);

 gap:12px;

}


.card{

 padding:25px;

 border:
 1px solid #193a28;

 background:#0b1b13;

 border-radius:14px;

 text-align:center;

}


.contact{

 display:block;

 width:max-content;

 margin:25px auto;

 background:#22e66b;

 color:#031108;

 padding:13px 20px;

 border-radius:10px;

 text-decoration:none;

 font-weight:900;

}


@media(max-width:650px){

 .products{

  grid-template-columns:
  repeat(2,1fr);

 }

 .hero h1{

  font-size:30px;

 }

}

</style>

</head>


<body>


<header class="top">

<a
class="back"
href="index.php"
>
← Market
</a>


<div class="logo">
KASUMET
</div>


<span></span>

</header>


<section class="hero">

<div class="icon">

<?=$data[1]?>

</div>


<h1>

<?=htmlspecialchars($data[0])?>

</h1>


<p>

<?=htmlspecialchars($data[2])?>

</p>


<div class="meta">

⭐ <?=$data[3]?>

·

<?=$data[4]?>

</div>

</section>


<main class="content">

<h2>
Inside this Shop
</h2>


<p>

Ka shiga shagon

<b>
<?=htmlspecialchars($data[0])?>
</b>.

Duba kayan da mai shago ya saka,
sannan ka tuntube shi kai tsaye.

Babu online checkout ko Buy/Order
a wannan tsarin.

</p>


<div class="products">

<div class="card">
📱
<br>
Product 01
</div>


<div class="card">
🛍️
<br>
Product 02
</div>


<div class="card">
💻
<br>
Product 03
</div>


<div class="card">
🎧
<br>
Product 04
</div>


<div class="card">
⌚
<br>
Product 05
</div>


<div class="card">
🎮
<br>
Product 06
</div>

</div>


<a
class="contact"
href="<?=

$isLoggedIn

?

'messages.php?shop='
.urlencode($shop)

:

'login.html?redirect='
.urlencode(
'shop.php?shop='.$shop
)

?>"
>

💬 Talk to Seller

</a>


</main>

</body>

</html>
