/* ============================================================
   DATA / CONFIG — PUSAT KONFIGURASI PORTFOLIO MIKHAYL
   Dipindahkan dari config.js + data-pameran.js
   ============================================================ */

/* ============================================================
   1. PROFIL & INFO DASAR
   ============================================================ */
export const CONFIG_PROFIL = {
  nama        : 'Mikhayl',
  username_gh : 'Mikhayl-05',
  sub_title   : '/ Designer · Dev · Creator /',
  badge       : 'Available for collab',
  foto_navbar : '/img/profil/profil.jpg',
  foto_hero   : '/img/profil/profil.jpg',

  sosial: {
    instagram : 'https://instagram.com/mhmyl_',
    whatsapp  : 'https://wa.me/6285398285037',
    trakteer  : 'https://trakteer.id/mikhayll',
  },
};


/* ============================================================
   2. MUSIK & NOW PLAYING WIDGET
   ============================================================ */
export const CONFIG_MUSIK = {
  file    : '/musik/About you 1975.mp3',
  judul   : 'About You',
  artis   : 'The 1975',
  durasi  : '5:24',
};

/* ============================================================
   2b. PLAYLIST — Tambahkan lagu baru di sini!
   ============================================================ */
export const PLAYLIST = [
  { id: 1, judul: 'About You',                          artis: 'The 1975',     file: '/musik/About you 1975.mp3', durasi: '5:24' },
  { id: 2, judul: 'Guilty as Sin?',                     artis: 'Taylor Swift', file: '/musik/nostalgia.mp3',      durasi: '0:37' },
  { id: 3, judul: "Merry Christmas, Please Don't Call", artis: 'Bleachers',    file: "/musik/Merry Christmas Please Don't Call.mp3", durasi: '0:40' },
  // Tambahkan lagu baru di bawah ini:
  // { id: 4, judul: 'Judul Lagu', artis: 'Artis', file: '/musik/nama-file.mp3', durasi: '3:45' },
];


/* ============================================================
   3. FLIP CARDS — BELAKANG FOTO
   ============================================================ */
export const CONFIG_FLIPCARD = {
  about: {
    type : 'nowplaying',
  },
  personality: {
    type  : 'info',
    emoji : '🎭',
    judul : 'Vibes Gw',
    isi   : 'Introvert yang betah di depan layar. Suka ngulik hal random dari linux sampe desain. Yhh Temen aja dikit, barangkali ada yang mau temenan? 😉',
    chips : ['Linux 🐧', 'Design 🎨', 'OSINT 🕵️'],
  },
  daily: {
    type  : 'info',
    emoji : '🎈',
    judul : 'Keseharian Gw',
    isi   : 'Kebanyakan di Rumah. Kalau di rumah ya natap layar aja — ngulik, desain, atau main game.',
    chips : ['Pesantren 🕌', 'Gaming ⚔️', 'Coding 💻'],
  },
};


/* ============================================================
   4. PAMERAN / DISPLAY CARDS
   ============================================================ */
function buildContent(item) {
  const paragraphs = (item.paragraphs || []).map(p => `<p>${p}</p>`).join('\n');
  const quote = item.quote ? `<p><em>"${item.quote}"</em></p>` : '';
  return paragraphs + quote;
}

const _PAMERAN_RAW = {
  poster: {
    title       : 'Genshin Impact: Game Terbaik ⚔️',
    description : 'Game fantasy yang sering bikin gw ketagihan!',
    thumb       : '/img/pameran/game-gw.png',
    meta        : 'Jumat, 26 Desember 2025 • Mikhayl',
    media       : { type: 'image', images: ['/img/pameran/game-gw.png'] },
    paragraphs  : [
      `Genshin Impact tuh udah kayak paket lengkap buat gamer yang suka eksplorasi, cerita, dan karakter keren. Bayangin aja, lo bisa jalan-jalan di dunia Teyvat yang luas banget, dari Mondstadt yang adem kayak Eropa klasik sampe Inazuma yang vibes-nya Jepang banget. Rasanya kayak backpacking digital, tapi tiap langkah ada kejutan baru. Gw suka banget main Genshin Impact, karena menurut gw rasanya kayak nge eksplor dunia fantasy yang luas banget. Kadang malah kebayang sama dunianya Novel Bumi Series karya Tere Liye, wkwk.`,
      `Yang bikin gw makin betah itu sistem karakternya. Setiap karakter punya elemen dan gaya main unik, jadi rasanya kayak ngumpulin tim superhero versi anime. Kadang gw ngerasa lagi main puzzle juga, karena harus mikirin kombinasi elemen biar damage makin gokil. Dan jujur aja, gacha-nya bikin deg-degan—banget dapet karakter bintang lima, rasanya kayak jackpot di dunia gaming.`,
      `Selain itu, ceritanya juga dalem banget. Gw suka gimana Genshin nggak cuma kasih quest biasa, tapi juga bikin kita mikir tentang politik, budaya, dan konflik tiap region. Jadi bukan sekadar game, tapi kayak novel interaktif yang bisa lo mainin. Buat gw, Genshin Impact itu bukan cuma hiburan, tapi dunia kedua tempat gw bisa kabur, eksplorasi, dan ngerasain petualangan epik bareng karakter favorit.🌌`,
    ],
    quote       : 'Genshin tuh pelarian dari dunia nyata menuju dunia fantasy penuh imajinasi',
  },
  komputer: {
    title       : 'Digital Playground Gw 🚀',
    description : 'Komputer, Coding, OSINT, dan Hacking',
    thumb       : '/img/pameran/komputer.jpg',
    meta        : 'Minggu, 28 Desember 2025 • Mikhayl',
    media       : { type: 'image', images: ['/img/pameran/komputer.jpg'] },
    paragraphs  : [
      `Menurut gw komputer tuh paling seru, kayak portal ajaib yang bisa bawa kita ke dunia kreatif tanpa batas. Dari utak-atik browser, VPN, sampe mainin software desain, rasanya kayak punya dapur digital sendiri di mana setiap aplikasi jadi bahan masakan, tinggal dicampur sesuai selera biar hasilnya unik. Dan kalau ngomongin sistem operasi, Linux tuh favorit gw banget—ibarat playground bebas yang bisa dioprek sesuka hati. Mau ganti tampilan, utak-atik kernel, atau nyoba distro baru, rasanya kayak punya mainan lego digital yang bisa dirakit ulang kapan aja.`,
      `Coding juga nggak kalah gokil, karena tiap baris kode tuh kayak puzzle yang bikin otak kepo terus. Debugging? Buat gw itu bukan masalah, tapi level baru yang harus ditaklukin. Gw suka bikin cheat sheet visual dan analogi kocak biar belajar coding berasa kayak main game—serius tapi tetep fun. Linux juga jadi partner setia buat coding, karena fleksibel banget dan bikin gw ngerasa kayak punya panggung sendiri buat eksperimen.`,
      `Nah, OSINT sama hacking jadi bumbu tambahan yang bikin perjalanan digital makin greget. OSINT bikin gw berasa jadi detektif dunia maya, ngulik jejak digital kayak lagi berburu harta karun. Sementara hacking gw anggap seni buat ngerti sistem lebih dalam, bukan sekadar ngerusak. Buat gw, dunia komputer, Linux, coding, OSINT, dan hacking itu arena bermain paling seru—tempat kreativitas, tantangan, dan rasa penasaran ketemu jadi satu. 🚀`,
    ],
    quote       : 'Belajar komputer bikin elu keliatan keren',
  },
  media: {
    title       : 'MEDIA CREATIVE SANTRI 📹',
    description : 'Kamera, OBS, dan dokumentasi live',
    thumb       : '/img/pameran/media.png',
    meta        : 'Minggu, 28 Desember 2025 • Admin',
    media       : { type: 'image', images: ['/img/pameran/media.png'] },
    paragraphs  : [
      `Dulu gw pernah jadi bagian dari organisasi pesantren gw, namanya MEDIA CREATIVE SANTRI. Di sana, gw masuk ke divisi cinematography karena emang udah klik banget sama dunia kamera dan dokumentasi. Rasanya tuh seru banget—tiap kali ada kegiatan di pesantren, gw langsung siap dengan kamera, nyari angle terbaik, dan bikin momen-momen itu jadi kenangan digital yang bisa ditonton lagi kapan aja.`,
      `Selain ngurusin video dokumentasi, gw juga pernah ngajarin temen-temen gimana cara pakai OBS Studio buat live dokumentasi <em>kayak gambar diatas</em>. Jadi kalau ada acara penting kayak seminar, lomba, atau kegiatan bareng santri, kita bisa siarin langsung dengan setup yang proper. OBS tuh kayak alat sihir digital—bisa atur layout, transisi, dan audio biar tampilannya kece. Gw suka banget momen ngajarin itu, karena rasanya kayak jadi mentor kecil yang ngebagiin ilmu sambil tetap seru-seruan bareng.`,
      `Buat gw, jadi bagian dari MEDIA CREATIVE SANTRI bukan cuma soal teknis kamera atau software, tapi soal gimana kita bisa bikin cerita dari sudut pandang santri. Lewat lensa kamera dan layar OBS, gw belajar bahwa dokumentasi itu bukan sekadar rekaman, tapi cara kita menghargai momen, berbagi inspirasi, dan bikin jejak digital yang bermakna. 🎥✨`,
    ],
    quote       : 'Seandainya gw direkrut kembali dan bisa mengulang momen-momen itu kembali..',
  },
  templat: {
    title       : 'Kenangan yang membekas🌇',
    description : 'SURABAYA - Bagian dimana kehidupan kedua gw berada',
    thumb       : '/img/pameran/surabaya2.png',
    meta        : 'Minggu, 28 Desember 2025 • Admin',
    media       : { type: 'image', images: ['/img/pameran/surabaya2.png'] },
    paragraphs  : [
      `<b id="surabaya-title" style="cursor:pointer;">KOTA SURABAYA</b>`,
      `Buat gw bukan cuma kota besar dengan jalanan rame dan gedung-gedung tinggi, tapi rumah kedua yang selalu bikin hati hangat. Ada sesuatu di udara Surabaya yang bikin gw betah—campuran antara semangat warganya, aroma kuliner kaki lima, dan suara motor yang nggak pernah berhenti. Ada nuansa nostalgia yang kuat banget di sana—kayak pintu ke masa kecil gw. Dari main di gang kecil, denger suara motor lewat tiap sore, sampai aroma kuliner kaki lima yang selalu bikin gw inget masa-masa sederhana tapi penuh kebahagiaan. Surabaya itu kayak album foto hidup, tiap sudutnya nyimpen cerita lama yang masih gw bawa sampai sekarang.`,
      `Yang bikin Surabaya makin berkesan adalah interaksi kecil sehari-hari. Dari sapaan ramah tetangga "Sini mas, mampir sek.", pedagang yang selalu senyum, sampai momen nongkrong di Taman Bungkul bareng temen atau orang spesial. Taman Bungkul sendiri jadi simbol kebersamaan buat gw—tempat di mana obrolan sederhana bisa berubah jadi kenangan yang dalam. Di sana gw ngerasa Surabaya bukan cuma kota, tapi ruang aman buat ketawa, cerita, dan bersosial dengan orang-orang.`,
      `Sore hari di Surabaya selalu magis: langit berubah warna dari pink ke ungu, lampu jalan mulai nyala, dan suasana kota terasa hidup. Kayak di jalan Diponegoro, di mana langit senja dan lalu lintas jadi latar nostalgia gw. Gw sering mikir, Surabaya itu panggung besar di mana masa kecil gw pernah jadi salah satu adegan penting.`,
      `Buat gw, Surabaya adalah kota yang nggak pernah sekadar jadi latar. Dia adalah rumah nostalgia masa kecil, ruang kebersamaan, dan saksi persahabatan yang bikin hati gw selalu hangat dan rindu. Surabaya itu cerita yang nggak pernah selesai ditulis, dan tiap kali gw inget, rasanya kayak... entahlah...`,
    ],
    quote       : 'Surabaya bukan sekadar kota, tapi bagian dari kenangan gw yang nggak bisa hilang.',
  },
  bot: {
    title       : 'Gw Bikin Tools Curang👾',
    description : 'Bot instagram yang bisa main sendiri🤖',
    thumb       : '/img/pameran/bot_emote.png',
    meta        : 'Minggu, 28 Desember 2025 • Admin',
    media       : { type: 'video', src: '/img/pameran/bot_emote.mp4' },
    paragraphs  : [
      `Kemarin gw baru aja ngerjain project kecil yang cukup seru: bikin bot Instagram yang bisa main game emote di DM secara otomatis. Awalnya cuma iseng karena malas kalah mulu-skor tertinggi gw aja cuma 49, tapi lama-lama kepikiran buat bikin robot yang bisa mainin otomatis. Dari yang cuma pengen coba-coba, malah jadi serius ngulik logikanya biar botnya beneran bisa jalan sendiri.`,
      `Bot ini kerjanya dengan cara "ngeliat" layar. Gw pake computer vision buat nangkep posisi bola, <em>Tracking</em> gerakannya, terus perhitungkan dan prediksi bolanya bakal jatuh di mana. Setelah itu mouse langsung digeser ke posisi yang pas buat mantulin bolanya, jadi bola-nya bisa kepantul tanpa gw sentuh sama sekali.`,
      `Biar makin kerasa hidup, gw tambahin visual debug: ada titik, ada garis merah, dan gw bisa liat langsung apa yang lagi dipikirin si bot. Garisnya bergetar karena lagi memperhitungkan dimana bolanya bakalan jatuh. Gw juga bikin sistem kalibrasi layar biar bot tau dimana dia bakalan main, kayak ngasih dia "lapangan" buat bergerak tanpa nyasar.`,
      `Intinya, project ini seru buat gw karena bisa gabungin logika, sedikit matematika, dan automation dalam satu hal yang simpel. Nggak ribet, tapi cukup bikin puas pas akhirnya botnya bisa main sendiri dengan lancar. Bahkan skor awal gw bisa dilampaui jauh dua kali lipat oleh bot gw ini.`,
    ],
    quote       : 'Kalah gak bikin kamu menurun,tapi ngasih kamu ide untuk cari cara lain buat menang sekalipun itu curang..',
  },
  Coming: {
    title       : 'Coming Soon✨',
    description : 'COMING SOON 🌟✨ — cerita baru lagi dalam perjalanan. Stay tuned, bakal ada yang fresh!',
    thumb       : '/img/pameran/coming-soon.png',
    meta        : '2025 • Mikhayl',
    media       : { type: 'image', images: ['/img/pameran/coming-soon.png'] },
    paragraphs  : [
      `<b>COMING SOON</b>`,
      `Setiap blog yang gw tulis selalu punya potongan cerita—tentang kota, nostalgia, editan visual, atau momen kecil yang penuh makna. Tapi cerita gw gak cuman itu doang. Masih banyak hal yang pengen gw bagi dan ceritain, dan gw lagi siapin sesuatu yang baru buat kalian...`,
      `Blog berikutnya bakal jadi lanjutan dari cerita-cerita sebelumnya. Atau mungkin cerita-cerita untuk blog-blog baru gw.`,
      `Jadi, tungguin ya… karena sebentar lagi akan ada blog dan cerita baru yang siap hadir... dan kalau males nungguin, lu bisa ngeDM gw lewat Instagram yang udah gw taruh di atas Portfolio 🔥`,
      `<em><b>Instagram - @MHMYL_</b></em>`,
    ],
    quote       : null,
  },
};

// Build content for each item
export const PAMERAN = Object.fromEntries(
  Object.entries(_PAMERAN_RAW).map(([key, item]) => [
    key,
    { ...item, content: buildContent(item) }
  ])
);


/* ============================================================
   5. EASTER EGGS
   ============================================================ */
export const EE_LIST = [
  { keyword: 'credit',       text: 'Thanks & Credit :\nBacksong — About You (The 1975)\n*Music used for personal, non-commercial purposes only.' },
  { keyword: 'crush',        text: 'Crush gwehj.. 🤧🙃',     img: '/img/easter/crush.jpg',     audio: '/musik/nokup.mp3' },
  { keyword: 'sayangku',     text: 'My bini kesayangannn.. 🤧🙃', img: '/img/easter/Sayangku.png', audio: '/musik/crush.mp3' },
  { keyword: 'oshi',         text: 'Oshi gwehj.. 🤧🙃',       video: '/img/easter/oshi.mp4' },
  { keyword: 'fineshyt',     text: 'Dibilangin ini pacar gwehj gak percaya.. 🤧🙃', img: '/img/easter/berandalan.jpg', audio: '/musik/berandalan.mp3' },
  { keyword: 'kimmy',        text: 'Vlog kimmy Heheh.....🙃', video: '/img/easter/kimmy.mp4' },
  { keyword: 'matrix',       noPopup: true },
  { keyword: 'linux',        noPopup: true },
  { keyword: 'snake',        noPopup: true },
  { keyword: 'pesantren',    text: '🕌 SANTRI MODE ACTIVATED\nStatus: Di pesantren, bosen, tapi produktif\nWifi: lemot parah\nMood: ⚡' },
  { keyword: 'mikhayl',      text: '👤 FOUND THE REAL MIKHAYL\nNama: Mikhayl (nama samaran)\nAsal: Jakarta → Surabaya → Gorontalo\nStatus: Exploring the world digitally\nMotto: "Belajar komputer bikin elu keliatan keren" 🚀' },
  { keyword: 'nerd',         text: '🤓 NERD STATS:\nOS: Windows (favorit)\nEditor: probably VSCode\nStack: HTML, CSS, JS, Python\nHobby: OSINT, hacking, desain\nFineshyt: Rahasiaaa..' },
  { keyword: 'bored',        text: '😐 GW TAU LO BOSEN...\nSame bro. Keseharian gw tuh ya gitu.\nTapi minimal ada portofolio kece kan? 😂\n\nTip: coba Konami Code ↑↑↓↓←→←→BA' },
  { keyword: 'siapacewekitu',text: 'Jadii.. dia ituu sebenarnya teman/sahabat gw dari kecil.. bukan yang difoto itu yaa gw gak bakalan pernah taruh fotonya disini!, gw suka ama dia dan dia juga sukaa tapi gak sampai pacaran karena kita lebih nyaman temenan dan kayaknya gak perlu pacaran dulu.. dan trus kenapa gw pakai foto kimmy?? karena yaa kimmy cantik aja wkwkwk.. (ini rahasia yang baru gw ceritain ke beberapa orang, jadi buat yang baru tau yaa.. yaa gituu.. wkwk) Lopyuu Liee.. ;)', audio: '/musik/nostalgia.mp3' },
];


/* ============================================================
   6. TOGGLE 🥚 — MENU EASTER EGG MOBILE
   ============================================================ */
export const EE_MOBILE_MENU = [
  { label: '🐍 Snake Arcade',   keyword: 'snake'     },
  { label: '🐧 Linux Terminal', keyword: 'linux'     },
  { label: '🕶️ Matrix Code',    keyword: 'matrix'    },
  { label: '🎵 Credit Song',    keyword: 'credit'    },
  { label: '🎀 fineshyt',       keyword: 'fineshyt'  },
  { label: '🎥 kimmy',          keyword: 'kimmy'     },
  { label: '💚 Crush',          keyword: 'crush'     },
  { label: '💝 Sayangku',       keyword: 'sayangku'  },
  { label: '🌸 Oshi',           keyword: 'oshi'      },
];


/* ============================================================
   7. LINUX TERMINAL SCRIPT
   ============================================================ */
export const TERM_SCRIPT = [
  {type:'prompt',cmd:'whoami'}, {type:'out',text:'mikhayl'},
  {type:'prompt',cmd:'uname -a'}, {type:'out',text:'Linux mikhayl-laptop 6.1.0 #1 SMP x86_64 GNU/Linux'},
  {type:'prompt',cmd:'ls skills/'}, {type:'out',text:'linux/  coding/  hacking/  design/  videografi/  fotografi/'},
  {type:'prompt',cmd:'cat about.txt'},
  {type:'out',text:'> Pelajar iseng yang suka ngulik hal random.'},
  {type:'out',text:'> Hobi: komputer, linux, desain, kamera.'},
  {type:'out',text:'> Status: di pesantren, bosen, tapi produktif.'},
  {type:'prompt',cmd:'sudo apt install creativity'},
  {type:'out',text:'[sudo] password for mikhayl: ••••••••'},
  {type:'out',text:'Reading package lists... Done'},
  {type:'ok',text:'Setting up creativity (∞.0) ... OK ✓'},
  {type:'prompt',cmd:'ping happiness -c 3'},
  {type:'ok',text:'64 bytes: icmp_seq=0 ttl=64 time=0.042 ms'},
  {type:'ok',text:'64 bytes: icmp_seq=1 ttl=64 time=0.038 ms'},
  {type:'ok',text:'3 packets, 0% packet loss 🚀'},
  {type:'prompt',cmd:'echo "easter egg ketemu!"'}, {type:'ok',text:'easter egg ketemu!'},
  {type:'prompt',cmd:''},
];

