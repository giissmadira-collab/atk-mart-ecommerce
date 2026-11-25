const products=[
{id:1,name:"Buku Tulis 38 Lembar",desc:"Buku tulis untuk catatan sekolah dan kuliah.",price:5000,icon:"📓"},
{id:2,name:"Pulpen Gel",desc:"Pulpen nyaman digunakan, tinta hitam.",price:3500,icon:"🖊️"},
{id:3,name:"Pensil 2B",desc:"Pensil 2B untuk menulis dan menggambar.",price:2500,icon:"✏️"},
{id:4,name:"Penghapus",desc:"Penghapus bersih dan tidak mudah merusak kertas.",price:2000,icon:"🧽"},
{id:5,name:"Penggaris 30 cm",desc:"Penggaris transparan untuk mengukur.",price:4000,icon:"📏"},
{id:6,name:"Spidol",desc:"Spidol untuk kebutuhan presentasi.",price:7000,icon:"🖍️"},
{id:7,name:"Map Folder",desc:"Map untuk menyimpan dokumen.",price:3000,icon:"📁"},
{id:8,name:"Sticky Notes",desc:"Catatan kecil untuk pengingat.",price:6000,icon:"🗒️"}
];
let cart={};
const money=n=>"Rp"+n.toLocaleString("id-ID");
const productGrid=document.querySelector("#productGrid");
function renderProducts(filter=""){
 const list=products.filter(p=>p.name.toLowerCase().includes(filter.toLowerCase()));
 productGrid.innerHTML=list.map(p=>`<article class="product-card"><div class="product-icon">${p.icon}</div><h3>${p.name}</h3><p>${p.desc}</p><div class="price">${money(p.price)}</div><button onclick="addToCart(${p.id})">Tambah ke Keranjang</button></article>`).join("")||'<p>Produk tidak ditemukan.</p>';
}
function addToCart(id){cart[id]=(cart[id]||0)+1;renderCart();showToast("Produk berhasil ditambahkan ke keranjang.");}
function changeQty(id,delta){cart[id]=(cart[id]||0)+delta;if(cart[id]<=0)delete cart[id];renderCart();}
function removeItem(id){delete cart[id];renderCart();showToast("Produk dihapus dari keranjang.");}
function renderCart(){
 const entries=Object.entries(cart);const count=entries.reduce((sum,[,qty])=>sum+qty,0);
 document.querySelector("#cartCount").textContent=count;
 const area=document.querySelector("#cartItems");
 if(!entries.length){area.innerHTML='<p class="empty">Keranjang masih kosong. Tambahkan produk terlebih dahulu.</p>';}
 else area.innerHTML=entries.map(([id,qty])=>{const p=products.find(x=>x.id===Number(id));return `<div class="cart-item"><div><strong>${p.name}</strong><small>${money(p.price)} × ${qty} = ${money(p.price*qty)}</small><div class="qty-controls"><button onclick="changeQty(${id},-1)" aria-label="Kurangi jumlah">−</button><span>${qty}</span><button onclick="changeQty(${id},1)" aria-label="Tambah jumlah">+</button></div></div><button class="remove-btn" onclick="removeItem(${id})">Hapus</button></div>`}).join("");
 document.querySelector("#cartTotal").textContent=money(entries.reduce((sum,[id,qty])=>sum+products.find(p=>p.id===Number(id)).price*qty,0));
}
let toastTimer;
function showToast(message){const toast=document.querySelector("#toast");toast.textContent=message;toast.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove("show"),2200);}
document.querySelector("#searchInput").addEventListener("input",e=>renderProducts(e.target.value));
document.querySelector("#cartJump").addEventListener("click",()=>document.querySelector("#checkout").scrollIntoView({behavior:"smooth"}));
document.querySelector("#checkoutForm").addEventListener("submit",e=>{
 e.preventDefault();
 if(!Object.keys(cart).length){showToast("Keranjang masih kosong. Silakan pilih produk.");return;}
 const name=document.querySelector("#customerName").value.trim();
 const email=document.querySelector("#customerEmail").value.trim();
 const address=document.querySelector("#customerAddress").value.trim();
 const payment=document.querySelector("#payment").value;
 if(!name||!email||!address||!payment){showToast("Mohon lengkapi semua data wajib.");return;}
 const total=document.querySelector("#cartTotal").textContent;
 alert(`Pesanan simulasi berhasil!\nNama: ${name}\nEmail: ${email}\nTotal: ${total}\nPembayaran: ${payment}\n\nTerima kasih telah berbelanja di ATK Mart.`);
 cart={};renderCart();e.target.reset();showToast("Checkout simulasi berhasil.");
});
renderProducts();renderCart();