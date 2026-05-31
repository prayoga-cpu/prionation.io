import type { LocalePages } from "./types";

export const pagesId: LocalePages = {
  common: {
    backToHome: "← Kembali ke beranda",
    faqTitle: "Pertanyaan yang sering diajukan",
    ctaTitle: "Mulai dengan Diagnostic",
    ctaBody:
      "Dua minggu. €5.000. Hambatan yang terpetakan dan rencana siap produksi — tanpa kewajiban melanjutkan ke Build.",
    ctaButton: "Mulai Diagnostic",
    anchorLabel: "Rekayasa produk AI",
  },

  methodology: {
    "evals-before-features": {
      navLabel: "Eval sebelum fitur",
      seoTitle: "Eval sebelum fitur · PRIONATION",
      metaDescription:
        "Mengapa PRIONATION menulis suite eval sebelum prompt — prinsip rekayasa yang membuat AI produksi harga tetap menjadi jujur.",
      badge: "Metodologi · 01",
      tldr: "Eval sebelum fitur berarti menulis suite uji yang mendefinisikan 'berfungsi' sebelum membangun AI yang harus melewatinya. Inilah prinsip yang memungkinkan harga tetap dan garansi pasca-peluncuran: tanpa ukuran 'selesai' yang disepakati, baik klien maupun pembangun tidak bisa mengatakan apakah sistem berhasil.",
      h1: "Eval sebelum fitur: suite uji sebelum prompt",
      intro: [
        "Dalam perangkat lunak konvensional, uji memeriksa bahwa kode melakukan yang seharusnya. Dalam AI, padanannya — eval — melakukan sesuatu yang lebih mendasar: mendefinisikan apa arti 'seharusnya' bagi sistem probabilistik. PRIONATION menulisnya lebih dulu, sebelum prompt atau model mana pun dipilih.",
        "Ini bukan sekadar preferensi proses. Ini mekanisme yang membuat proyek ruang lingkup dan harga tetap menjadi jujur, karena definisi keberhasilan disepakati dan terukur sebelum build dimulai.",
      ],
      sections: [
        {
          h2: "Apa arti prinsip ini",
          body: [
            "Eval adalah uji yang dapat diulang yang menilai keluaran sistem AI terhadap standar yang ditentukan: sekumpulan input representatif, perilaku yang diharapkan, dan metode penilaian. Sebuah suite eval mengubah pertanyaan kabur 'apakah AI sudah cukup baik?' menjadi angka yang disepakati semua pihak sejak awal.",
            "Menulisnya lebih dulu membalik urutan biasa. Alih-alih membangun fitur lalu bertanya apakah berfungsi, PRIONATION menentukan apa itu 'berfungsi' — dataset acuan, ambang kelulusan, kasus kegagalan — dan baru kemudian membangun sistem untuk memenuhinya.",
          ],
        },
        {
          h2: "Anti-pola",
          body: [
            "Mode kegagalan yang umum adalah pengembangan berbasis demo: prototipe tampak mengesankan pada beberapa input pilihan, semua orang antusias, lalu dirilis. Di produksi ia bertemu input yang tak pernah diuji, gagal diam-diam, dan perdebatan menjadi subjektif — 'modelnya salah' versus 'promptnya benar' — tanpa standar bersama untuk memutuskan.",
            "Tanpa eval, tidak ada pula garansi yang jujur. Jika 'selesai' tak pernah didefinisikan, tidak ada cara mengatakan apakah regresi di kemudian hari adalah bug yang diperbaiki gratis atau pekerjaan baru yang harus ditagih. Ketiadaan eval inilah yang membuat sebagian besar proyek AI diam-diam tak berujung.",
          ],
        },
        {
          h2: "Bagaimana PRIONATION menerapkannya",
          body: [
            "Setiap Build dimulai dengan menyusun dataset acuan dari input nyata dan representatif, serta menentukan rubrik penilaian masing-masing — pencocokan persis bila sesuai, penilaian oleh model bila perlu pertimbangan, dengan ambang eksplisit. Ini menjadi pemeriksaan regresi otomatis yang berjalan di CI pada setiap perubahan.",
            "Suite eval dispesifikasikan selama Diagnostic dua minggu, sebelum Build ditawarkan. Itu disengaja: suite adalah kontraknya. Itulah dasar penetapan harga tetap dan tolok ukur garansi pasca-peluncuran empat minggu.",
          ],
        },
        {
          h2: "Bagaimana kaitannya dengan tiga prinsip lain",
          body: [
            "Eval memberi makan telemetri: logika penilaian yang sama yang menjadi gerbang build dijalankan terhadap trafik produksi, sehingga performa langsung diukur dengan tolok ukur yang sama dengan build. Eval bergantung pada infrastruktur yang dimiliki, karena dataset acuan dan harness eval adalah aset klien yang dikirim bersama kode.",
            "Dan eval membuat pod ramping menjadi mungkin. Tim kecil bisa bergerak cepat justru karena suite eval menangkap regresi secara otomatis, menghapus QA manual yang jika tidak akan memperlambat pod dua hingga tiga orang.",
          ],
        },
        {
          h2: "Mengapa ini fondasi struktural pengiriman harga tetap",
          body: [
            "Harga tetap hanya jujur jika 'selesai' didefinisikan sebelum angka disepakati. Eval adalah definisi itu. Eval mengubah masalah riset terbuka menjadi masalah rekayasa yang berbatas: bangun sistem yang skornya di atas ambang pada suite yang disepakati.",
            "Itulah sebabnya PRIONATION memperlakukan spesifikasi eval sebagai keluaran sebenarnya dari Diagnostic. Begitu ia ada, Build menjadi minim risiko bagi kedua pihak — ruang lingkup tidak bisa membengkak diam-diam, dan hasilnya tidak bisa diperdebatkan.",
          ],
        },
      ],
      faq: [
        {
          q: "Apa itu eval AI?",
          a: "Uji yang dapat diulang yang menilai keluaran sistem AI terhadap standar yang ditentukan — sekumpulan input representatif, perilaku yang diharapkan, dan metode penilaian. Eval mengubah 'apakah AI cukup baik?' menjadi angka yang disepakati.",
        },
        {
          q: "Mengapa menulis eval sebelum prompt?",
          a: "Karena eval mendefinisikan apa arti 'berfungsi'. Menulisnya lebih dulu membuat keberhasilan terukur dan disepakati sebelum build, yang memungkinkan harga tetap dan garansi nyata. Membangun dulu dan menguji belakangan membuat 'selesai' tak terdefinisi.",
        },
        {
          q: "Bagaimana ini memungkinkan harga tetap?",
          a: "Harga tetap hanya jujur jika garis akhir ditentukan di muka. Suite eval adalah garis akhir itu: Build dihargai dan digaransi atas kelulusannya, sehingga ruang lingkup tidak bisa membengkak diam-diam.",
        },
        {
          q: "Apakah eval memperlambat build?",
          a: "Justru mempercepat. Pemeriksaan eval otomatis di CI menangkap regresi seketika, menghapus siklus QA manual. Itulah yang memungkinkan pod dua hingga tiga orang bergerak cepat tanpa merusak.",
        },
        {
          q: "Siapa yang memiliki suite eval?",
          a: "Klien. Dataset acuan dan harness eval dikirim bersama kode sebagai bagian dari infrastruktur yang dimiliki, sehingga standar yang sama terus berjalan setelah proyek berakhir.",
        },
      ],
    },

    "telemetry-from-day-one": {
      navLabel: "Telemetri sejak hari pertama",
      seoTitle: "Telemetri sejak hari pertama · PRIONATION",
      metaDescription:
        "Bagaimana PRIONATION menginstrumentasi AI produksi sejak penerapan pertama — praktik observabilitas yang mengakhiri perdebatan 'modelnya salah'.",
      badge: "Metodologi · 02",
      tldr: "Telemetri sejak hari pertama berarti menginstrumentasi sistem AI untuk mencatat apa yang dilakukannya, pada input apa, dan seberapa baik — sejak permintaan produksi pertamanya. Ini mengubah 'modelnya terasa aneh' menjadi bukti, dan begitulah retainer dan setiap iterasi berikutnya tetap berpijak pada kenyataan, bukan opini.",
      h1: "Telemetri sejak hari pertama: data produksi di atas opini",
      intro: [
        "Sebagian besar sistem AI diterapkan secara buta. Mereka menghasilkan keluaran, keluaran itu sampai ke pengguna, dan tak seorang pun bisa mengatakan setelahnya apa yang sebenarnya dilakukan sistem atau mengapa. PRIONATION menginstrumentasi sejak permintaan pertama, agar sistem menjelaskan dirinya sendiri.",
        "Telemetri adalah perbedaan antara beriterasi di atas data dan beriterasi di atas anekdot. Ia juga yang membuat suite eval menjadi sesuatu yang hidup, bukan gerbang sekali lewat.",
      ],
      sections: [
        {
          h2: "Apa arti prinsip ini",
          body: [
            "Telemetri adalah catatan terstruktur dari sistem AI di produksi: input yang diterima, keluaran yang dihasilkan, versi model dan prompt, skor terkait eval, latensi, biaya, dan setiap koreksi manusia. Ia dicatat sejak penerapan pertama, bukan ditambahkan setelah ada yang rusak.",
            "Tujuannya adalah observabilitas — mampu menjawab, untuk setiap keputusan yang dibuat sistem di produksi, apa yang terjadi dan apakah standar terpenuhi, tanpa menjalankan ulang atau menebak.",
          ],
        },
        {
          h2: "Anti-pola",
          body: [
            "Mode kegagalannya adalah keluhan yang tak terlacak. Pemangku kepentingan berkata AI 'makin buruk', dan tanpa telemetri tim tak bisa memastikan, melokalisasi, atau mengukurnya. Debugging menjadi arkeologi, dan perubahan dibuat berdasarkan firasat yang bisa memperburuk keadaan.",
            "Anti-pola kedua adalah pencatatan sia-sia: menangkap segalanya tetapi tak ada yang berguna — buangan permintaan mentah tanpa skor, tanpa versi, tanpa kaitan dengan kriteria eval — sehingga data ada tetapi tak bisa menjawab satu-satunya pertanyaan yang penting: apakah masih cukup baik?",
          ],
        },
        {
          h2: "Bagaimana PRIONATION menerapkannya",
          body: [
            "Instrumentasi adalah bagian dari build, bukan renungan belakangan. Setiap interaksi produksi dicatat dengan input, keluaran, versi model dan prompt, serta skor yang sama dengan suite eval, sehingga kualitas produksi dilacak dengan tolok ukur yang identik dengan build. Biaya dan latensi dilacak bersamaan, karena di produksi keduanya juga atribut kualitas.",
            "Pipeline telemetri menulis ke infrastruktur klien sendiri. Dasbor memunculkan penyimpangan terhadap ambang eval, dan kasus yang ditandai kembali mengalir ke dataset acuan, menutup lingkar antara realitas produksi dan iterasi berikutnya.",
          ],
        },
        {
          h2: "Bagaimana kaitannya dengan tiga prinsip lain",
          body: [
            "Telemetri adalah separuh 'saat berjalan' dari eval: suite mendefinisikan standar, telemetri mengukurnya terus-menerus terhadap trafik nyata. Ia berada di infrastruktur yang dimiliki, sehingga catatan operasional — sering kali aset paling berharga yang dihasilkan sebuah build — menjadi milik klien.",
            "Ia juga menjaga kejujuran pod ramping dari waktu ke waktu. Retainer hanya layak dibayar jika efeknya terlihat; telemetri membuat dampak setiap iterasi terukur, sehingga pekerjaan pod yang berkelanjutan dinilai dari pergerakan angka nyata.",
          ],
        },
        {
          h2: "Mengapa ini fondasi struktural pengiriman harga tetap",
          body: [
            "Garansi pasca-peluncuran empat minggu tak berarti tanpa telemetri. Untuk menghormati 'kami perbaiki jika turun di bawah ambang eval', Anda harus bisa melihat, di produksi, apakah memang demikian. Telemetri yang membuat garansi menjadi komitmen terukur, bukan slogan.",
            "Ia juga membatasi retainer. Karena dampak dapat diamati, pekerjaan berkelanjutan dilingkupi terhadap sinyal nyata alih-alih 'terus tingkatkan' yang tak berujung — justru jenis variansi yang harus dihapus agar penetapan harga tetap dan terprediksi mungkin.",
          ],
        },
      ],
      faq: [
        {
          q: "Apa itu telemetri AI?",
          a: "Catatan terstruktur dari sistem AI di produksi: setiap input, keluaran, versi model dan prompt, skor terkait eval, latensi dan biaya, serta setiap koreksi manusia. Ia membuat perilaku sistem dapat diamati dan diukur.",
        },
        {
          q: "Mengapa menginstrumentasi sejak hari pertama, bukan saat ada yang rusak?",
          a: "Karena masalah pada AI sering senyap dan menyimpang perlahan. Tanpa telemetri sejak permintaan pertama, Anda tak bisa memastikan, melokalisasi, atau mengukur regresi — debugging menjadi tebakan.",
        },
        {
          q: "Apa beda telemetri dengan logging aplikasi biasa?",
          a: "Logging umum mencatat bahwa sesuatu terjadi. Telemetri AI mencatat seberapa baik hal itu terjadi, dinilai dengan standar yang sama dengan suite eval dan terikat pada versi model dan prompt yang persis — sehingga bisa menjawab apakah sistem masih cukup baik.",
        },
        {
          q: "Di mana data telemetri berada?",
          a: "Di infrastruktur klien sendiri. Ia bagian dari infrastruktur yang dimiliki, sehingga catatan operasional tetap pada klien dan terus berfungsi setelah proyek berakhir.",
        },
        {
          q: "Bagaimana telemetri mendukung garansi dan retainer?",
          a: "Garansi menjanjikan perbaikan jika kualitas produksi turun di bawah ambang eval yang disepakati; telemetri yang membuat Anda melihatnya. Untuk retainer, ia membuat dampak setiap iterasi terukur, sehingga pekerjaan berkelanjutan dinilai dari angka nyata.",
        },
      ],
    },

    "owned-infrastructure": {
      navLabel: "Infrastruktur yang dimiliki",
      seoTitle: "Infrastruktur yang dimiliki · PRIONATION",
      metaDescription:
        "Mengapa klien PRIONATION memegang kode, hosting, data, dan model di akhir setiap proyek — argumen rekayasa melawan keterkuncian vendor.",
      badge: "Metodologi · 03",
      tldr: "Infrastruktur yang dimiliki berarti klien memegang kode, hosting, data, dan akun model — sejak hari pertama, bukan sebagai serah terima akhir proyek. Ini ekspresi rekayasa dari sikap komersial sederhana: kendali alih-alih ketergantungan. Saat proyek berakhir, klien tetap berjalan tanpa PRIONATION.",
      h1: "Infrastruktur yang dimiliki: kendali alih-alih ketergantungan",
      intro: [
        "Banyak vendor AI membangun sistem, menghostingnya sendiri, lalu menyewakannya kembali. Klien mendapat keluaran tetapi tak pernah asetnya, dan pergi berarti kehilangan segalanya. PRIONATION membangun sebaliknya: di dalam lingkungan klien, dengan klien memegang setiap kunci.",
        "Ini prinsip yang paling langsung dirasakan klien, karena inilah yang menentukan apa yang tersisa bagi mereka saat hubungan berakhir.",
      ],
      sections: [
        {
          h2: "Apa arti prinsip ini",
          body: [
            "Infrastruktur yang dimiliki berarti di setiap titik — bukan hanya di akhir — sistem produksi berjalan di akun dan repositori yang dikendalikan klien: organisasi GitHub, proyek cloud, akun penyedia model, basis data, dan penyimpanan telemetri. PRIONATION beroperasi di dalam lingkungan itu sebagai pembangun, bukan pemilik sewa.",
            "Karena itu, yang diserahkan bukan akses ke sistem melainkan sistem itu sendiri, tanpa satu komponen pun disandera vendor.",
          ],
        },
        {
          h2: "Anti-pola",
          body: [
            "Pola keterkuncian sudah dikenal: nama vendor ada di akun cloud, kode berada di repo privat vendor, kunci API milik vendor, dan data melewati pipeline vendor. Daya tawar klien terkikis bulan demi bulan, dan biaya berpindah menjadi parit yang tak pernah harus dipertahankan vendor atas dasar mutu.",
            "Versi yang lebih halus adalah 'platform' yang secara teknis memberi akses tetapi mengkodekan logika sebenarnya di lapisan proprietary yang tak bisa diekspor. Anda bisa pergi — tetapi tanpa apa pun yang berjalan.",
          ],
        },
        {
          h2: "Bagaimana PRIONATION menerapkannya",
          body: [
            "Penyediaan dilakukan di akun klien pada hari pertama Build. Kode dikomit ke repositori klien; infrastruktur didefinisikan sebagai kode agar dapat direproduksi dan diperiksa; rahasia menjadi milik klien sejak awal. Sebuah runbook serah terima mendokumentasikan setiap kredensial, layanan, dan prosedur operasional.",
            "Tidak ada yang esensial melewati layanan milik PRIONATION. Ujinya sederhana dan diterapkan dengan sengaja: jika PRIONATION lenyap dalam semalam, sistem tetap berjalan dan tim klien sendiri dapat mengoperasikannya.",
          ],
        },
        {
          h2: "Bagaimana kaitannya dengan tiga prinsip lain",
          body: [
            "Infrastruktur yang dimiliki adalah tempat eval dan telemetri berlabuh: dataset acuan, harness eval, dan telemetri produksi semuanya aset klien, sehingga standar dan catatan operasional tetap pada klien. Inilah yang membuat prinsip-prinsip itu tahan lama, bukan pinjaman.",
            "Ia juga membentuk hubungan pod ramping: karena klien memiliki segalanya, retainer adalah pilihan sejati yang diperbarui atas nilai, bukan ketergantungan yang tak bisa ditinggalkan.",
          ],
        },
        {
          h2: "Mengapa ini fondasi struktural pengiriman harga tetap",
          body: [
            "Infrastruktur yang dimiliki menyelaraskan insentif dengan cara yang membuat harga tetap menjadi koheren. Vendor yang untung dari keterkuncian dihargai atas ketergantungan; fondasi yang menyerahkan segalanya hanya dihargai karena mengirim sesuatu yang berfungsi. Yang kedua adalah satu-satunya sikap yang membuat harga tetap dan jalan keluar yang bersih saling jujur.",
            "Ia juga menjaga ruang lingkup tetap konkret. Membangun di lingkungan nyata klien sejak hari pertama memunculkan realitas integrasi lebih awal, saat bisa dihargai, alih-alih terlambat, saat menjadi sengketa.",
          ],
        },
      ],
      faq: [
        {
          q: "Apa saja yang termasuk 'klien memiliki infrastruktur'?",
          a: "Repositori kode, akun cloud dan hosting, akun penyedia model, basis data, dan data telemetri — semuanya di akun yang dikendalikan klien sejak hari pertama, ditambah runbook serah terima yang mendokumentasikan setiap kredensial dan prosedur.",
        },
        {
          q: "Kapan serah terima terjadi?",
          a: "Tidak ada peristiwa migrasi. PRIONATION membangun di dalam lingkungan klien sejak hari pertama, sehingga kepemilikan adalah keadaan baku sepanjang proyek, bukan transfer di akhir.",
        },
        {
          q: "Apa itu keterkuncian vendor AI, secara konkret?",
          a: "Ketika vendor memegang akun cloud, repo privat, kunci API, atau mengkodekan logika inti di lapisan proprietary yang tak bisa diekspor. Anda bisa pergi, tetapi tak ada yang ikut pergi yang masih berjalan.",
        },
        {
          q: "Bisakah kami mengoperasikan sistem tanpa PRIONATION?",
          a: "Ya — itulah uji desain yang eksplisit. Infrastruktur sebagai kode, runbook terdokumentasi, dan kredensial yang dipegang klien berarti tim Anda sendiri dapat menjalankannya, dan retainer opsional adalah pilihan, bukan keharusan.",
        },
        {
          q: "Bagaimana kepemilikan terkait data dan kepatuhan?",
          a: "Karena data dan hosting berada di akun Anda, Anda mengendalikan residensi dan akses. Infrastruktur klien dapat tetap pada hosting yang patuh bila diperlukan, tanpa melewati pihak ketiga.",
        },
      ],
    },

    "lean-pods-fixed-clocks": {
      navLabel: "Pod ramping, jam tetap",
      seoTitle: "Pod ramping, jam tetap · PRIONATION",
      metaDescription:
        "Bagaimana pod 2–3 insinyur dan jam 8 minggu memungkinkan pengiriman AI harga tetap — kaitan antara metodologi PRIONATION dan model komersialnya.",
      badge: "Metodologi · 04",
      tldr: "Pod ramping, jam tetap berarti tim senior kecil — dua hingga tiga insinyur — yang mengirim pada irama tetap delapan minggu alih-alih jadwal terbuka. Ini ekspresi komersial dari tiga prinsip lain: hanya karena eval, telemetri, dan infrastruktur yang dimiliki menghapus variansi, maka jam tetap dan harga tetap bisa dijanjikan dengan jujur.",
      h1: "Pod ramping, jam tetap: bagaimana harga tetap menjadi mungkin",
      intro: [
        "Sebagian besar proyek AI dijual per jam atau per bulan karena pekerjaannya terasa tak terprediksi. PRIONATION menjual ruang lingkup tetap pada jam tetap — dan alasan ia bisa bukanlah optimisme melainkan metode.",
        "Prinsip ini adalah tempat rekayasa bertemu model komersial. Ia menjelaskan mengapa Diagnostic wajib dan mengapa tim kecil adalah keunggulan, bukan keterbatasan.",
      ],
      sections: [
        {
          h2: "Apa arti prinsip ini",
          body: [
            "Pod adalah tim senior lintas fungsi yang kecil — biasanya dua hingga tiga insinyur — yang memiliki sebuah build dari ujung ke ujung. Jam tetap adalah unit pengiriman delapan minggu yang dikomitmenkan pod. Kombinasinya sengaja dibatasi: cukup kecil untuk bergerak tanpa beban koordinasi, cukup terbatas waktu untuk memaksa prioritas.",
            "Batasan itulah intinya. Jam tetap mengubah 'apa yang bisa kita bangun?' menjadi 'apa satu hal paling bernilai yang bisa kita kirim dan keraskan dalam delapan minggu?'",
          ],
        },
        {
          h2: "Anti-pola",
          body: [
            "Proyek terbuka adalah anti-polanya: tim besar, ruang lingkup kabur, dan jadwal yang melar karena tak ada yang memaksa keputusan tentang apa itu 'selesai'. Biaya membesar seiring waktu, dan insentif vendor diam-diam memihak lebih banyak waktu, bukan lebih banyak nilai.",
            "Kegagalan sebaliknya adalah kontraktor solo heroik tanpa metode — cepat sampai ia menemui variansi yang justru ingin diserap eval dan telemetri, saat itu jadwal menjadi tak terketahui.",
          ],
        },
        {
          h2: "Bagaimana PRIONATION menerapkannya",
          body: [
            "Delapan minggu punya bentuk: kira-kira dua minggu arsitektur dan penyiapan eval, empat minggu build terhadap eval itu, dan dua minggu pengerasan serta penyetelan yang dipandu telemetri. Pod cukup kecil sehingga setiap orang memegang seluruh sistem di kepalanya, dan itulah yang menjaga jam tetap tetap realistis.",
            "Yang penting, harga tetap baru ditawarkan setelah Diagnostic dua minggu, karena saat itulah ruang lingkup dipetakan dan kriteria eval ditetapkan. PRIONATION tidak menawarkan harga Build tetap pada masalah yang belum dipetakan.",
          ],
        },
        {
          h2: "Bagaimana kaitannya dengan tiga prinsip lain",
          body: [
            "Prinsip ini berada di hilir tiga lainnya. Eval membatasi pekerjaan dengan mendefinisikan selesai; telemetri membuat iterasi terukur sehingga pengerasan terarah; infrastruktur yang dimiliki menghapus kejutan integrasi yang meledakkan jadwal. Hapus salah satu saja dan jam tetap berhenti menjadi jujur.",
            "Dengan kata lain, pod ramping pada jam tetap bukan trik penjadwalan — ia adalah yang menjadi mungkin setelah variansi direkayasa keluar oleh tiga prinsip pertama.",
          ],
        },
        {
          h2: "Mengapa ini fondasi struktural pengiriman harga tetap",
          body: [
            "Harga tetap dan jam tetap adalah janji yang sama dilihat secara komersial dan operasional. Janji itu hanya aman dibuat ketika metodologi menyerap variansi — yang persis diverifikasi Diagnostic sebelum sebuah angka diberikan.",
            "Itulah sebabnya tak ada harga tetap yang jujur tanpa metode di baliknya. Agensi yang menawarkan harga tetap untuk AI tanpa eval, telemetri, dan infrastruktur yang dimiliki sedang menyerap risiko tersembunyi, atau diam-diam beralih ke tagihan per jam saat risiko itu menggigit.",
          ],
        },
      ],
      faq: [
        {
          q: "Apa itu pod PRIONATION?",
          a: "Tim senior kecil — biasanya dua hingga tiga insinyur — yang memiliki sebuah build dari ujung ke ujung pada jam tetap delapan minggu. Kecil secara desain, agar tim bergerak tanpa beban koordinasi dan memegang seluruh sistem di kepala.",
        },
        {
          q: "Mengapa delapan minggu?",
          a: "Jam tetap memaksa prioritas: ia mengubah pertanyaan terbuka menjadi 'apa satu hal paling bernilai yang bisa kita kirim dan keraskan dalam delapan minggu?' Iramanya kira-kira dua minggu arsitektur, empat minggu build, dua minggu pengerasan.",
        },
        {
          q: "Mengapa Diagnostic wajib sebelum harga tetap?",
          a: "Karena harga tetap hanya jujur setelah ruang lingkup dipetakan dan kriteria eval ditetapkan. Diagnostic dua minggu melakukannya; PRIONATION tidak menawarkan harga Build tetap pada masalah yang belum dipetakan.",
        },
        {
          q: "Bukankah tim kecil adalah keterbatasan?",
          a: "Itu keunggulan. Pod senior kecil menghindari beban koordinasi yang memperlambat tim besar, dan ia layak justru karena eval dan telemetri mengotomatiskan pemeriksaan yang jika tidak akan butuh lapisan QA.",
        },
        {
          q: "Bagaimana harga tetap bisa bekerja untuk AI saat yang lain menagih per jam?",
          a: "Ia bekerja hanya karena tiga prinsip lain menghapus variansi. Eval mendefinisikan selesai, telemetri membuat iterasi terukur, dan infrastruktur yang dimiliki mencegah kejutan integrasi. Tanpa metode itu, harga tetap menyembunyikan risiko alih-alih menghapusnya.",
        },
      ],
    },
  },

  frameworks: {
    "ai-build-vs-buy-calculator": {
      navLabel: "Kalkulator build vs buy",
      seoTitle: "Kalkulator AI build vs buy · PRIONATION",
      metaDescription:
        "Kerangka keputusan untuk operator mid-market: enam masukan yang menentukan apakah membangun AI khusus, membeli SaaS, atau hibrida.",
      badge: "Kerangka · Build vs buy",
      tldr: "Keputusan build-vs-buy untuk AI bermuara pada enam variabel: berapa biaya alur kerja, volumenya, seberapa spesifik ke bisnis Anda, sensitivitas data, perkakas yang ada, dan horizon waktu. Kerangka ini mengubahnya menjadi rekomendasi jelas — bangun, beli, atau hibrida — alih-alih firasat.",
      h1: "AI build vs buy: kerangka keputusan untuk operator mid-market",
      intro: [
        "Setiap operator yang menghadapi keputusan AI menanyakan hal yang sama: membangun yang khusus, membeli produk SaaS, atau menggabungkan keduanya? Jawaban yang salah mahal di kedua arah — build khusus untuk masalah generik memboroskan modal; SaaS untuk pembeda inti membatasi potensi Anda.",
        "Kerangka ini menyederhanakan keputusan menjadi enam masukan dan logika sederhana untuk menimbangnya. Inilah penalaran yang diterapkan PRIONATION dalam Diagnostic, dibuat eksplisit.",
      ],
      sections: [
        {
          h2: "Cara menggunakannya",
          body: [
            "Nilai alur kerja Anda terhadap enam masukan di bawah, dengan jujur. Tujuannya bukan angka presisi melainkan arah: sebagian besar keputusan menjadi jelas begitu variabelnya dinamai. Bila dua masukan menarik ke arah berlawanan, penentunya hampir selalu spesifisitas — seberapa unik alur kerja itu bagi cara Anda bersaing.",
            "Perlakukan hasilnya sebagai awal percakapan pelingkupan, bukan vonis. Sinyal 'bangun' tetap butuh Diagnostic untuk memastikan hambatannya nyata dan ruang lingkupnya berbatas.",
          ],
        },
        {
          h2: "Enam masukan",
          body: [
            "1) Biaya tahunan alur kerja — biaya penuh menjalankannya saat ini, termasuk orang. 2) Volume bulanan — seberapa sering dijalankan. 3) Spesifisitas — seberapa khas ke bisnis Anda dibanding tugas generik. 4) Sensitivitas data — apakah data boleh keluar lingkungan Anda. 5) Perkakas yang ada — apakah SaaS sudah menutup sebagian besar. 6) Horizon waktu — berapa lama Anda akan bergantung padanya.",
            "Biaya tinggi, volume tinggi, spesifisitas tinggi, dan data sensitif mendorong ke build. Spesifisitas rendah dan opsi SaaS kuat mendorong ke beli. Horizon panjang menaikkan imbal hasil sebuah build; horizon pendek mendukung membeli.",
          ],
        },
        {
          h2: "Logika keputusan",
          body: [
            "Beli ketika alur kerja generik, terlayani baik oleh SaaS matang, dan bukan sumber keunggulan kompetitif — jangan membangun infrastruktur komoditas. Bangun ketika alur kerja khas ke cara Anda bersaing, mahal, bervolume tinggi, atau dibatasi data yang tak boleh keluar lingkungan Anda, dan Anda akan bergantung padanya bertahun-tahun.",
            "Pilih hibrida ketika intinya generik tetapi mil terakhirnya milik Anda: beli lapisan komoditas, bangun lapisan pembeda tipis di atasnya. Sebagian besar kemenangan AI mid-market adalah hibrida — nilainya ada di 20% yang khas bagi operasi Anda.",
          ],
        },
        {
          h2: "Apa yang dilakukan dengan hasilnya",
          body: [
            "Hasil 'beli' berarti langkah berikutnya adalah pemilihan vendor, bukan proyek dengan PRIONATION. Kami akan mengatakannya. Hasil 'bangun' atau 'hibrida' berarti langkah berikutnya adalah Diagnostic dua minggu untuk memetakan hambatan, memastikan ruang lingkup, dan menetapkan harga Build tetap.",
            "Bagaimanapun, kerangka ini berhasil jika menghentikan Anda membangun yang seharusnya dibeli, atau membeli yang seharusnya dibangun.",
          ],
        },
      ],
      faq: [
        {
          q: "Kapan membangun AI khusus alih-alih membeli SaaS?",
          a: "Bangun ketika alur kerja khas ke cara Anda bersaing, mahal atau bervolume tinggi, atau dibatasi data yang tak boleh keluar lingkungan Anda — dan Anda akan bergantung padanya bertahun-tahun. Beli ketika generik dan terlayani baik oleh SaaS matang.",
        },
        {
          q: "Apa itu pendekatan AI hibrida?",
          a: "Membeli lapisan komoditas dan hanya membangun lapisan pembeda tipis di atasnya. Sebagian besar kemenangan AI mid-market adalah hibrida, karena nilainya ada di bagian kecil alur kerja yang khas bagi operasi Anda.",
        },
        {
          q: "Bagaimana sensitivitas data memengaruhi keputusan?",
          a: "Jika data tak boleh keluar lingkungan Anda karena alasan kepatuhan atau kompetisi, itu mendorong kuat ke build, karena infrastruktur yang dimiliki menjaga data di akun Anda alih-alih melewati SaaS pihak ketiga.",
        },
        {
          q: "Apakah hasil 'bangun' berarti harus merekrut insinyur?",
          a: "Tidak selalu. Build bisa dikirim oleh pod ramping berharga tetap lalu diserahkan ke tim Anda — lihat model biaya pod vs rekrut. Keputusan build terpisah dari keputusan perekrutan.",
        },
        {
          q: "Apa langkah berikutnya setelah kerangka ini?",
          a: "Jika hasilnya bangun atau hibrida, Diagnostic dua minggu memetakan hambatan dan menetapkan harga Build tetap. Jika beli, langkah berikutnya adalah pemilihan vendor — dan kami akan mengatakannya terus terang.",
        },
      ],
    },

    "pod-vs-hire-cost-model": {
      navLabel: "Model biaya pod vs rekrut",
      seoTitle: "Pod vs rekrut — model biaya · PRIONATION",
      metaDescription:
        "Biaya penuh pod AI ramping versus merekrut insinyur AI internal — gaji, tunjangan, rekrutmen, waktu adaptasi, dan risiko, dibandingkan dengan jujur.",
      badge: "Kerangka · Pod vs rekrut",
      tldr: "Membandingkan pod PRIONATION dengan rekrutan AI internal hanya berdasarkan tarif harian itu menyesatkan. Perbandingan jujur mencakup gaji, tunjangan, rekrutmen, waktu adaptasi, dan risiko salah rekrut. Pada satu build delapan minggu, pod berharga tetap hampir selalu lebih murah dan cepat; selama bertahun-tahun, tim internal akhirnya menang. Model ini menunjukkan di mana batasnya.",
      h1: "Pod vs rekrut: biaya sebenarnya membangun AI",
      intro: [
        "Naluri kita membandingkan harga pod dengan gaji insinyur lalu menyimpulkan merekrut lebih murah. Perbandingan itu mengabaikan sebagian besar biaya nyata sebuah rekrutan dan seluruh risikonya.",
        "Model ini memaparkan biaya penuh tiap jalur agar perbandingannya jujur — dan menunjukkan jawabannya sepenuhnya bergantung pada horizon waktu Anda.",
      ],
      sections: [
        {
          h2: "Cara menggunakannya",
          body: [
            "Pilih skenario yang sesuai: satu build terdefinisi, aliran pekerjaan AI berkelanjutan, atau ketidakpastian di antaranya. Lalu baca biaya penuh tiap jalur, bukan angka utamanya. Keputusan jarang soal harga per hari; ia soal risiko, kecepatan, dan seberapa banyak pekerjaan AI yang sebenarnya Anda punya.",
            "Model ini mengasumsikan konteks mid-market — gaji Eropa atau AS, satu alur kerja bernilai tinggi — dan dimaksudkan untuk membingkai keputusan, bukan menggantikan penawaran.",
          ],
        },
        {
          h2: "Biaya penuh sebuah rekrutan",
          body: [
            "Insinyur AI senior bukan sekadar gajinya. Biaya penuh menambahkan pajak dan tunjangan pemberi kerja, biaya rekrutmen atau berbulan-bulan waktu pendiri, perangkat dan perkakas, serta tiga hingga enam bulan adaptasi sebelum produktif. Lalu risikonya: salah rekrut di bidang langka yang sulit dinilai bisa memakan setahun tanpa apa pun terkirim.",
            "Secara tahunan, satu rekrutan AI senior di UE atau AS mencapai jauh ke enam digit dalam biaya penuh — sebelum mengirim apa pun, dan dengan asumsi rekrutannya berhasil.",
          ],
        },
        {
          h2: "Biaya penuh sebuah pod",
          body: [
            "Pod PRIONATION adalah harga tetap untuk build terdefinisi delapan minggu, dengan tim senior kecil, eval, telemetri, dan garansi empat minggu termasuk. Tidak ada rekrutmen, tidak ada adaptasi, tidak ada risiko mutu rekrut — metodologi dan harga tetap menyerap variansi.",
            "Imbangannya, pod dihargai per proyek. Untuk aliran pekerjaan AI yang berkelanjutan dan terbuka, biaya berulang pod akhirnya melampaui biaya tim internal yang sudah beradaptasi.",
          ],
        },
        {
          h2: "Di mana batasnya",
          body: [
            "Untuk satu atau dua build terdefinisi, pod menang jelas: lebih cepat, lebih murah setelah risiko dan adaptasi dihitung, dan Anda menyimpan kodenya. Untuk peta jalan AI permanen bervolume tinggi, membangun tim internal akhirnya menang — setelah direkrut, beradaptasi, dan dipertahankan.",
            "Jalur umumnya berurutan: gunakan pod untuk mengirim build pertama dan membuktikan nilai, lalu rekrut internal terhadap peta jalan yang terbukti — dengan serah terima infrastruktur yang dimiliki berarti tim baru Anda mewarisi sistem yang berjalan, bukan kotak hitam.",
          ],
        },
      ],
      faq: [
        {
          q: "Apakah pod lebih murah daripada merekrut insinyur AI?",
          a: "Untuk build terdefinisi, hampir selalu — setelah menghitung rekrutmen, tunjangan, tiga hingga enam bulan adaptasi, dan risiko mutu rekrut, bukan hanya gaji. Untuk peta jalan permanen bervolume tinggi, tim internal akhirnya lebih murah.",
        },
        {
          q: "Apa itu 'biaya penuh' sebuah rekrutan AI?",
          a: "Gaji plus pajak dan tunjangan pemberi kerja, biaya rekrutmen atau waktu pendiri, perangkat, dan berbulan-bulan adaptasi sebelum produktif — plus risiko salah rekrut di bidang langka yang memakan setahun tanpa hasil.",
        },
        {
          q: "Kapan merekrut internal lebih masuk akal?",
          a: "Ketika Anda punya aliran pekerjaan AI permanen bervolume tinggi. Setelah tim internal direkrut, beradaptasi, dan dipertahankan, biaya marginalnya per proyek turun di bawah proyek berulang.",
        },
        {
          q: "Bisakah memakai pod lalu merekrut?",
          a: "Ya, dan itu jalur umumnya: kirim build pertama dengan pod untuk membuktikan nilai, lalu rekrut terhadap peta jalan terbukti. Karena pod menyerahkan infrastruktur yang dimiliki, tim baru Anda mewarisi sistem yang berjalan.",
        },
        {
          q: "Apakah harga pod termasuk pemeliharaan?",
          a: "Setiap Build mencakup garansi pasca-peluncuran empat minggu. Pemeliharaan berkelanjutan adalah retainer opsional, dilingkupi terhadap telemetri nyata, bukan komitmen terbuka.",
        },
      ],
    },

    "8-week-build-readiness-checklist": {
      navLabel: "Daftar kesiapan build",
      seoTitle: "Daftar kesiapan build 8 minggu · PRIONATION",
      metaDescription:
        "Penilaian mandiri atas data, pemangku kepentingan, kriteria sukses, akses infrastruktur, dan komitmen — apakah perusahaan Anda siap untuk build AI 8 minggu?",
      badge: "Kerangka · Kesiapan",
      tldr: "Sebagian besar build AI yang gagal memang belum siap dimulai. Daftar ini menilai kesiapan di lima area — data, keselarasan pemangku kepentingan, kriteria sukses, akses infrastruktur, dan komitmen komersial. Lemah di lebih dari satu: Diagnostic dulu; kuat di kelimanya: Anda siap membangun.",
      h1: "Apakah Anda siap untuk build AI 8 minggu? Daftar kesiapan",
      intro: [
        "Build berharga tetap delapan minggu hanya berhasil jika lahannya disiapkan. Alasan paling umum sebuah build meleset bukan rekayasanya — melainkan salah satu dari lima prasyarat hilang dan tak ada yang memeriksanya.",
        "Gunakan daftar ini sebelum berkomitmen pada Build. Inilah penilaian kesiapan yang dilakukan Diagnostic, dijadikan sesuatu yang bisa Anda jalankan sendiri.",
      ],
      sections: [
        {
          h2: "Cara menggunakannya",
          body: [
            "Nilai diri Anda dengan jujur di lima area di bawah. 'Tidak' bukan diskualifikasi — itu hal yang harus diperbaiki sebelum jam berjalan. Inti daftar ini adalah memunculkan celah sekarang, saat murah ditutup, alih-alih di minggu ketiga build, saat mahal.",
            "Kuat di kelimanya berarti siap membangun. Lemah di satu, perbaiki dulu. Lemah di dua atau lebih, mulai dengan Diagnostic, yang ada justru untuk menyelesaikan ketidakpastian ini.",
          ],
        },
        {
          h2: "Lima area",
          body: [
            "1) Kesiapan data — apakah data representatif ada, dapat diakses, dan cukup baik untuk membangun eval? 2) Keselarasan pemangku kepentingan — apakah ada satu pengambil keputusan yang memiliki hasilnya, bukan komite? 3) Kriteria sukses — bisakah Anda menyatakan apa arti 'berfungsi' secara terukur? 4) Akses infrastruktur — bisakah tim menyediakan di lingkungan Anda tanpa rantai persetujuan berbulan-bulan? 5) Komitmen komersial — apakah anggaran dan kalender delapan minggu benar-benar dikomitmenkan?",
            "Area ini memetakan langsung ke empat prinsip: data dan kriteria sukses memberi makan eval; akses infrastruktur memungkinkan infrastruktur yang dimiliki; komitmen membuat jam tetap menjadi nyata.",
          ],
        },
        {
          h2: "Membaca skor Anda",
          body: [
            "Jika kuat di kelimanya, Build bisa dimulai dengan percaya diri dan harga tetap minim risiko. Jika data atau kriteria sukses lemah, itulah persis yang dihasilkan Diagnostic — ia memetakan hambatan dan menulis spesifikasi eval, mengubah 'belum' menjadi 'siap'.",
            "Jika celahnya keselarasan atau komitmen, perbaiki itu sebelum membelanjakan apa pun untuk rekayasa. Tak ada metodologi yang bertahan pada build yang sebenarnya belum dikomitmenkan organisasi.",
          ],
        },
        {
          h2: "Apa yang dilakukan dengan hasilnya",
          body: [
            "Skor kuat berarti langkah berikutnya adalah Diagnostic untuk mengunci ruang lingkup dan menetapkan harga Build — singkat, karena Anda sudah siap. Skor campuran berarti Diagnostic merangkap: menutup celah kesiapan dan menghasilkan rencana build.",
            "Bagaimanapun, daftar ini berhasil jika memindahkan masalah dari minggu ketiga build ke minggu sebelum ia mulai.",
          ],
        },
      ],
      faq: [
        {
          q: "Apa yang membuat perusahaan siap untuk build AI?",
          a: "Kekuatan di lima area: data representatif yang dapat diakses, satu pengambil keputusan yang bertanggung jawab, kriteria sukses terukur, akses infrastruktur cepat di lingkungan Anda, dan komitmen anggaran serta kalender yang nyata.",
        },
        {
          q: "Bagaimana jika data kami belum siap?",
          a: "Maka Diagnostic dulu. Membangun suite eval butuh data representatif; jika hilang atau berantakan, Diagnostic memunculkannya dan menentukan apa yang dibutuhkan sebelum Build berharga tetap masuk akal.",
        },
        {
          q: "Apakah perlu metrik sukses sebelum mulai?",
          a: "Ya — atau Diagnostic untuk mendefinisikannya. 'Berfungsi' harus terukur sebelum build, karena suite eval dan harga tetap ditulis terhadapnya. Sukses yang tak terdefinisi adalah penyebab paling umum proyek AI tak berujung.",
        },
        {
          q: "Mengapa keselarasan pemangku kepentingan begitu penting?",
          a: "Karena build dengan komite tanpa pemilik tunggal macet pada keputusan. Satu pengambil keputusan yang bertanggung jawab menjaga jam delapan minggu realistis; build yang belum benar-benar dikomitmenkan organisasi akan meleset apa pun metodenya.",
        },
        {
          q: "Apa langkah berikutnya setelah daftar ini?",
          a: "Diagnostic dua minggu — singkat jika skor Anda kuat, atau merangkap untuk menutup celah dan menghasilkan rencana build jika skor Anda campuran.",
        },
      ],
    },
  },

  guides: {
    "ai-consulting-cost-mid-market-companies": {
      navLabel: "Biaya konsultasi AI",
      seoTitle: "Biaya konsultasi AI untuk mid-market · PRIONATION",
      metaDescription:
        "Berapa biaya sebenarnya proyek AI untuk perusahaan €5–50 jt — harga Diagnostic, Build, dan Retainer, tiga model dibandingkan, dan di mana biaya tersembunyi berada.",
      badge: "Panduan · Harga",
      tldr: "Untuk perusahaan mid-market, proyek AI biasanya berkisar €5.000–7.000 untuk Diagnostic dua minggu, €25.000–55.000 untuk Build delapan minggu, dan €4.000–9.000/bulan untuk Retainer. Angka yang lebih penting daripada harga utama adalah model penetapan harga, karena ia menentukan siapa yang menanggung risiko saat pekerjaan ternyata lebih sulit dari perkiraan.",
      h1: "Biaya konsultasi AI untuk perusahaan mid-market",
      intro: [
        "Jawaban jujur atas 'berapa biaya konsultasi AI?' untuk perusahaan €5–50 jt adalah sebuah rentang — dengan peringatan bahwa rentang itu bagian yang paling tidak penting. Bagaimana pekerjaan ditagih lebih penting daripada angkanya, karena itu menentukan siapa menyerap variansi yang tak terhindarkan.",
        "Panduan ini memberi angka nyata, membandingkan tiga model penetapan harga, dan menyebut biaya yang cenderung tak disebut vendor di muka.",
      ],
      sections: [
        {
          h2: "Angka nyata",
          body: [
            "Struktur PRIONATION tetap dan terbuka: Diagnostic €5.000–7.000 selama dua minggu memetakan hambatan dan menetapkan ruang lingkup; Build €25.000–55.000 selama delapan minggu mengirim sistem produksi; Retainer €4.000–9.000/bulan menjaga pod tersedia sesudahnya, dengan minimum enam bulan. Situs Express tiga halaman mulai €1.500.",
            "Lebih dari 60% Diagnostic berlanjut ke Build — angka yang hanya bertahan karena Diagnostic dilingkupi untuk mengkualifikasi pekerjaan, bukan menjual tahap berikutnya apa pun caranya.",
          ],
        },
        {
          h2: "Tiga model penetapan harga",
          body: [
            "Pekerjaan AI dijual dengan tiga cara. Per jam atau time-and-materials menggeser seluruh risiko ketidakpastian ke Anda — meterannya berjalan entah pekerjaan konvergen atau tidak. Ruang lingkup tetap menetapkan harga hasil yang terdefinisi, jadi vendor menanggung variansi. Retainer membeli kapasitas berkelanjutan dengan tarif bulanan yang terprediksi.",
            "Poin strukturalnya: time-and-materials memberi imbalan vendor saat pekerjaan lebih lama. Ruang lingkup tetap hanya berhasil jika vendor punya metode yang menghapus variansi — itulah mengapa harga tetap dan metodologi tak terpisahkan.",
          ],
        },
        {
          h2: "Di mana biaya tersembunyi berada",
          body: [
            "Biaya yang diremehkan vendor adalah adaptasi, integrasi, dan keterkuncian. Adaptasi adalah minggu-minggu yang ditagih saat tim mempelajari domain Anda. Integrasi adalah pekerjaan tak glamor menghubungkan ke sistem nyata Anda, sering dilingkupi kabur dan ditagih saat membengkak. Keterkuncian adalah biaya tertunda dari sistem yang tak bisa Anda operasikan atau tinggalkan tanpa vendor.",
            "Proyek ruang lingkup tetap dengan infrastruktur yang dimiliki menghapus ketiganya: adaptasi dan integrasi ada di dalam harga tetap, dan tak ada yang mengunci karena Anda memegang segalanya.",
          ],
        },
        {
          h2: "Cara menganggarkan",
          body: [
            "Anggarkan Diagnostic dulu — ia kecil, dan itulah yang membuat harga Build andal. Anggap vendor mana pun yang menetapkan harga Build tetap tanpa langkah pelingkupan sebagai menebak, atau berniat menagih selisihnya nanti.",
            "Untuk total biaya kepemilikan, hitung apa yang Anda simpan: dengan infrastruktur yang dimiliki, Build adalah aset modal yang bisa dijalankan tim Anda, bukan langganan sistem milik orang lain.",
          ],
        },
      ],
      faq: [
        {
          q: "Berapa biaya konsultasi AI untuk perusahaan mid-market?",
          a: "Biasanya €5.000–7.000 untuk Diagnostic dua minggu, €25.000–55.000 untuk Build delapan minggu, dan €4.000–9.000/bulan untuk Retainer. Semua ruang lingkup tetap, harga tetap, ditagih dalam euro.",
        },
        {
          q: "Mengapa model penetapan harga lebih penting daripada harganya?",
          a: "Karena ia menentukan siapa menanggung risiko saat pekerjaan lebih sulit dari perkiraan. Time-and-materials menaruh risiko itu pada Anda dan memberi imbalan vendor yang lebih lama; ruang lingkup tetap menaruhnya pada vendor, tetapi hanya berhasil dengan metode nyata.",
        },
        {
          q: "Apa biaya tersembunyi dalam proyek AI?",
          a: "Adaptasi (minggu yang ditagih saat tim belajar domain Anda), integrasi (pekerjaan penghubungan yang dilingkupi kabur dan membengkak), dan keterkuncian (sistem yang tak bisa Anda operasikan atau tinggalkan). Ruang lingkup tetap dengan infrastruktur yang dimiliki menghapus ketiganya.",
        },
        {
          q: "Mengapa mulai dengan Diagnostic?",
          a: "Karena ia membuat harga Build andal. Harga Build tetap yang ditetapkan tanpa langkah pelingkupan adalah tebakan. Diagnostic memetakan hambatan dan menetapkan kriteria eval yang menjadi dasar harga.",
        },
        {
          q: "Apa yang bisa dibatalkan, dan bagaimana garansinya?",
          a: "Diagnostic tak mewajibkan melanjutkan ke Build. Setiap Build mencakup garansi pasca-peluncuran empat minggu terhadap ambang eval yang disepakati; Retainer punya minimum enam bulan dan selain itu berkelanjutan.",
        },
      ],
    },

    "scoping-ai-build-engagement": {
      navLabel: "Melingkupi build AI",
      seoTitle: "Cara melingkupi build AI · PRIONATION",
      metaDescription:
        "Enam komponen yang harus dimiliki setiap dokumen ruang lingkup AI sebelum bicara dengan vendor — dengan contoh baik dan buruk — serta kesalahan pelingkupan yang membunuh proyek.",
      badge: "Panduan · Pelingkupan",
      tldr: "Ruang lingkup AI yang baik punya enam komponen: target alur kerja, metrik sukses, inventaris data, titik integrasi, batasan, dan jangkar jadwal. Sebagian besar proyek AI yang gagal kurang dilingkupi pada salah satunya sebelum kontrak ditandatangani. Panduan ini menunjukkan seperti apa yang baik dan buruk untuk masing-masing.",
      h1: "Cara melingkupi build AI",
      intro: [
        "Prediktor terbesar apakah build AI berhasil adalah mutu ruang lingkup yang ditulis sebelum ia mulai. Ruang lingkup kabur bukan masalah administrasi — ia mekanisme yang membuat anggaran berlipat dan jadwal meleset.",
        "Panduan ini memecah ruang lingkup menjadi enam komponen, dengan contoh baik dan buruk untuk masing-masing, agar Anda bisa menguji ruang lingkup sebelum berkomitmen.",
      ],
      sections: [
        {
          h2: "Mengapa ruang lingkup menentukan hasil",
          body: [
            "Pekerjaan AI punya lebih banyak ketidakpastian bawaan daripada perangkat lunak biasa, jadi ruang lingkup longgar berlipat lebih cepat. Saat 'bangun asisten AI' menjadi ruang lingkupnya, tiap pihak mengisi celah dengan asumsi berbeda, dan celah itu menjadi sengketa begitu tagihan tiba.",
            "Ruang lingkup yang baik tidak menghapus ketidakpastian; ia melokalisasinya. Ia menyatakan persis apa yang dibangun, bagaimana sukses diukur, dan apa yang secara eksplisit di luar batas — agar ketidakpastian yang tersisa kecil dan bernama.",
          ],
        },
        {
          h2: "Enam komponen",
          body: [
            "1) Target alur kerja — operasi spesifik yang diubah, bukan kapabilitas. 2) Metrik sukses — definisi 'selesai' yang terukur. 3) Inventaris data — data apa yang ada, di mana, dan dalam keadaan apa. 4) Titik integrasi — sistem persis yang dihubungkan. 5) Batasan — residensi data, latensi, anggaran, hal yang tak bisa ditawar. 6) Jangkar jadwal — tanggal tetap yang menjadi irama kerja.",
            "Masing-masing memetakan ke sesuatu yang konkret: metrik sukses menjadi suite eval; inventaris data menentukan kelayakan; titik integrasi adalah tempat sebagian besar biaya tersembunyi berada.",
          ],
        },
        {
          h2: "Ruang lingkup baik vs buruk",
          body: [
            "Buruk: 'Gunakan AI untuk meningkatkan dukungan pelanggan.' Baik: 'Draf balasan pertama untuk tiket penagihan, dinilai terhadap golden set 200 tiket, terintegrasi dengan help desk kami, tanpa data pelanggan keluar cloud kami, tayang dalam delapan minggu.' Yang kedua dapat dibangun dan dihargai; yang pertama undangan untuk menagih per jam.",
            "Uji untuk tiap baris ruang lingkup: apakah dua vendor akan menghargainya sama. Jika tidak, barisnya terlalu kabur untuk dikomitmenkan.",
          ],
        },
        {
          h2: "Kesalahan yang membunuh proyek",
          body: [
            "Kesalahan pelingkupan yang fatal: mendefinisikan kapabilitas alih-alih alur kerja; membiarkan sukses tak terdefinisi; menemukan data tak terpakai setelah tanda tangan; dan menganggap integrasi sebagai detail. Masing-masing mengubah proyek tetap menjadi terbuka.",
            "Diagnostic ada untuk menghasilkan persis ruang lingkup ini — tetapi Anda bisa mengerjakan sebagian besarnya sendiri dulu, dan tiba di percakapan dengan ketidakpastian sudah dipersempit.",
          ],
        },
      ],
      faq: [
        {
          q: "Apa yang harus ada dalam dokumen ruang lingkup AI?",
          a: "Enam komponen: target alur kerja, metrik sukses terukur, inventaris data, titik integrasi, batasan (residensi, latensi, anggaran), dan jangkar jadwal. Masing-masing menghapus satu kelas sengketa di kemudian hari.",
        },
        {
          q: "Seperti apa ruang lingkup AI yang baik?",
          a: "Spesifik dan dapat diuji: alur kerja persis, definisi 'selesai' yang terukur, sistem yang diintegrasikan, batasan data, dan tanggal tetap. Ujinya: apakah dua vendor akan menghargainya identik.",
        },
        {
          q: "Apa kesalahan pelingkupan paling umum?",
          a: "Mendefinisikan kapabilitas ('gunakan AI untuk dukungan') alih-alih alur kerja ('draf balasan pertama tiket penagihan, dinilai terhadap golden set'). Kapabilitas tak bisa dihargai atau diselesaikan; alur kerja bisa.",
        },
        {
          q: "Bagaimana ruang lingkup terkait suite eval?",
          a: "Metrik sukses dalam ruang lingkup menjadi suite eval. Ruang lingkup tanpa kriteria sukses terukur tak bisa menghasilkan eval, itulah mengapa proyek semacam itu berakhir terbuka dan disengketakan.",
        },
        {
          q: "Bisakah Diagnostic melakukan pelingkupan untuk kami?",
          a: "Ya — menghasilkan ruang lingkup ini persis yang diberikan Diagnostic dua minggu. Mengerjakan dasarnya sendiri dulu membuat Diagnostic lebih cepat dan Build yang dihasilkan lebih murah.",
        },
      ],
    },

    "fixed-price-vs-hourly-ai-consulting": {
      navLabel: "Harga tetap vs per jam",
      seoTitle: "Harga tetap vs per jam konsultasi AI · PRIONATION",
      metaDescription:
        "Empat model penetapan harga AI, insentif yang diciptakan masing-masing bagi vendor, dan mengapa harga tetap AI hanya berhasil saat metodologi menghapus variansi.",
      badge: "Panduan · Model harga",
      tldr: "Ada empat cara membayar pekerjaan AI — per jam, ruang lingkup tetap, berbasis milestone, dan retainer — dan masing-masing menciptakan insentif berbeda bagi vendor. Per jam memberi imbalan kelambatan; ruang lingkup tetap memberi imbalan efisiensi tetapi hanya berhasil dengan metode nyata. Memilih model sebenarnya memilih kepentingan siapa yang selaras dengan menyelesaikan.",
      h1: "Harga tetap vs per jam konsultasi AI: model mana yang melindungi Anda",
      intro: [
        "Sebagian besar pembeli membandingkan vendor AI pada tarif dan kapabilitas. Perbandingan yang lebih penting adalah model penetapan harga, karena model menentukan apakah vendor untung dari menyelesaikan atau dari melanjutkan.",
        "Panduan ini memaparkan empat model, insentif yang dibangun masing-masing, dan mengapa harga tetap hanya tepercaya saat ada metodologi di baliknya.",
      ],
      sections: [
        {
          h2: "Empat model",
          body: [
            "Per jam / time-and-materials menagih waktu yang dihabiskan, tanpa memandang hasil. Ruang lingkup tetap menetapkan harga deliverable terdefinisi untuk harga tetap. Berbasis milestone mengikat pembayaran ke deliverable bertahap. Retainer membeli kapasitas berkelanjutan dengan biaya bulanan tetap.",
            "Masing-masing sah dalam konteks yang tepat. Kesalahannya memilih model tanpa melihat insentif yang diciptakannya — karena insentif itu membentuk setiap keputusan vendor begitu pekerjaan berjalan.",
          ],
        },
        {
          h2: "Insentif yang diciptakan masing-masing",
          body: [
            "Per jam memberi imbalan vendor saat pekerjaan lebih lama — bukan karena ketidakjujuran, tetapi karena meteran dan kepentingan berjalan searah. Ruang lingkup tetap memberi imbalan efisiensi: vendor menyimpan keuntungan menyelesaikan cepat, jadi kepentingannya selaras dengan Anda. Berbasis milestone menyelaraskan pembayaran dengan kemajuan tetapi bisa memecah sistem menjadi potongan yang bisa didemokan. Retainer memberi imbalan hubungan stabil tetapi bisa menyimpang tanpa ukuran nilai.",
            "Pertanyaan untuk setiap vendor sederhana: di bawah model Anda, apakah Anda untung lebih banyak dengan menyelesaikan atau dengan melanjutkan?",
          ],
        },
        {
          h2: "Mengapa harga tetap AI berbeda",
          body: [
            "Harga tetap adalah model yang paling selaras dengan pembeli — tetapi juga yang paling tak bisa ditawarkan jujur oleh sebagian besar vendor untuk AI, karena pekerjaan AI membawa variansi yang harus diserap harga tetap. Ditawarkan tanpa metode, harga tetap entah dilebihkan banyak atau diam-diam ditinggalkan begitu pekerjaan menyulitkan.",
            "Itulah mengapa PRIONATION memasangkan harga tetap dengan eval, telemetri, dan infrastruktur yang dimiliki. Metodologi menghapus variansi yang jika tidak akan membuat harga tetap sembrono — dan Diagnostic wajib adalah tempat variansi itu diukur sebelum sebuah angka diberikan.",
          ],
        },
        {
          h2: "Cara memilih",
          body: [
            "Utamakan ruang lingkup tetap untuk build terdefinisi, dan bersikeras melihat metode yang membuatnya aman — langkah pelingkupan, definisi 'selesai' berbasis eval, dan garansi. Gunakan retainer untuk pekerjaan yang benar-benar berkelanjutan, dilingkupi terhadap telemetri. Berhati-hatilah dengan per jam untuk apa pun yang bisa didefinisikan, dan dengan harga tetap yang ditawarkan tanpa langkah pelingkupan sama sekali.",
            "Model yang tepat adalah yang membuat vendor hanya menang ketika Anda menang.",
          ],
        },
      ],
      faq: [
        {
          q: "Harga tetap atau per jam, mana yang lebih baik untuk AI?",
          a: "Ruang lingkup tetap lebih selaras dengan pembeli karena vendor menyimpan keuntungan menyelesaikan cepat. Tetapi ia hanya tepercaya dengan metode nyata di baliknya; tanpa itu, harga tetap dilebihkan atau diam-diam ditinggalkan saat pekerjaan menyulitkan.",
        },
        {
          q: "Mengapa sebagian besar vendor menagih per jam untuk AI?",
          a: "Karena pekerjaan AI membawa variansi, dan per jam menggeser risiko itu ke klien. Itu pilihan aman bagi vendor tanpa metodologi untuk menghapus variansi — tetapi memberi imbalan vendor yang lebih lama.",
        },
        {
          q: "Bagaimana harga tetap bisa jujur untuk pekerjaan AI yang tak terprediksi?",
          a: "Hanya jika metodologi menghapus ketidakterprediksian dulu. Eval mendefinisikan selesai, telemetri membuat iterasi terukur, infrastruktur yang dimiliki mencegah kejutan integrasi, dan Diagnostic mengukur variansi sebelum harga ditetapkan.",
        },
        {
          q: "Untuk apa penetapan harga berbasis milestone?",
          a: "Mengikat pembayaran ke pengiriman bertahap pada program lebih besar. Risikonya memecah sistem menjadi potongan yang bisa didemokan yang tak menjumlah menjadi hasil produksi yang koheren, jadi milestone harus didefinisikan terhadap hasil nyata.",
        },
        {
          q: "Apa yang harus saya tanyakan ke vendor soal harga?",
          a: "Satu pertanyaan: di bawah model Anda, apakah Anda untung lebih banyak dengan menyelesaikan atau melanjutkan? Lalu minta lihat metodenya — langkah pelingkupan, definisi 'selesai' berbasis eval, dan garansi — yang membuat harga tetap aman.",
        },
      ],
    },
  },

  showcases: {
    "epidom-logistics-france": {
      navLabel: "Epidom",
      seoTitle: "Epidom — operasi inventaris, Prancis · PRIONATION",
      metaDescription:
        "Bagaimana PRIONATION mengganti pelacakan inventaris manual multi-lokasi dengan sistem produksi terpusat untuk Epidom, operator F&B Eropa — dan pelajaran yang dapat dialihkan.",
      badge: "Showcase · 🇫🇷 Prancis · F&B",
      tldr: "Epidom, operator F&B Eropa, menjalankan inventaris multi-lokasi dengan proses manual yang tak menskala. PRIONATION membangun sistem produksi terpusat untuk melacak inventaris antar lokasi dan memangkas beban operasional melakukannya secara manual. Ini profil proyek dan pelajaran yang dapat dialihkan untuk operator multi-lokasi.",
      h1: "Epidom: memusatkan operasi inventaris multi-lokasi",
      intro: [
        "Epidom adalah operator makanan dan minuman Eropa yang menjalankan inventaris di banyak lokasi. Seperti kebanyakan operator multi-lokasi, kendalanya bukan strategi — melainkan proses manual dan terfragmentasi untuk menjaga stok terlihat dan akurat di semua tempat sekaligus.",
        "Halaman ini memprofilkan proyek: hambatan operasional, bagaimana PRIONATION membangun, apa yang berubah, dan pelajaran yang dialihkan ke operasi multi-lokasi mana pun. Hasil terkuantifikasi akan dipublikasikan begitu difinalkan.",
      ],
      sections: [
        {
          h2: "Hambatan",
          body: [
            "Inventaris multi-lokasi yang dikerjakan manual gagal dengan cara yang dapat diprediksi: tiap lokasi punya pandangannya sendiri, angka-angka menyimpang, dan merekonsiliasinya menghabiskan waktu yang membengkak seiring tiap lokasi baru. Biayanya bukan satu kegagalan besar melainkan pajak operasional konstan — beban, kehabisan stok, dan keputusan atas data usang.",
            "Bagi Epidom, hambatannya persis ini: proses pelacakan manual multi-lokasi yang tak bisa mengimbangi laju operasi.",
          ],
        },
        {
          h2: "Bagaimana PRIONATION membangun",
          body: [
            "Pekerjaan mengikuti metode standar: memetakan operasi sebelum membangun, mendefinisikan apa arti pandangan inventaris yang benar dan terkini secara terukur, dan membangun sistem produksi terkecil yang memberikannya — pelacakan terpusat yang menggantikan proses manual alih-alih menumpuk di atasnya.",
            "Seperti tiap proyek, sistem dibangun untuk dimiliki dan dioperasikan klien, sehingga kapabilitasnya tetap internal setelah pengiriman.",
          ],
        },
        {
          h2: "Apa yang berubah",
          body: [
            "Proses manual per lokasi diganti satu sistem terpusat, menghapus beban rekonsiliasi dan memberi operasi satu pandangan akurat atas inventaris antar lokasi. Dalam kata-kata ringkasan proyek publik, ia memangkas beban operasional.",
            "Metrik sebelum-sesudah yang terperinci sedang disiapkan untuk publikasi dan akan muncul di sini dan di halaman transparansi.",
          ],
        },
        {
          h2: "Pelajaran yang dapat dialihkan",
          body: [
            "Pelajaran ini berlaku umum untuk operator multi-lokasi mana pun: build pertama dengan ROI tertinggi jarang yang mencolok — melainkan yang menghapus pajak rekonsiliasi manual yang tumbuh seiring tiap lokasi. Pusatkan sumber kebenaran dulu; selebihnya berlipat dari situ.",
            "Jika operasi Anda menjalankan angka kritis di spreadsheet yang dipelihara terpisah tiap lokasi, itu biasanya hambatan yang layak dipetakan pertama.",
          ],
        },
      ],
      faq: [
        {
          q: "Apa yang dibangun PRIONATION untuk Epidom?",
          a: "Sistem manajemen inventaris terpusat untuk operator F&B Eropa, dirancang untuk pelacakan multi-lokasi, mengganti proses manual dengan satu sistem produksi yang memangkas beban operasional.",
        },
        {
          q: "Industri dan pasar apa Epidom?",
          a: "Makanan dan minuman, beroperasi di Prancis dan Eropa. Proyek ini menangani operasi inventaris multi-lokasi.",
        },
        {
          q: "Di mana hasil dan metrik terperinci?",
          a: "Hasil terkuantifikasi sebelum-sesudah sedang disiapkan dan akan dipublikasikan di sini dan di halaman transparansi. Profil ini menjelaskan proyek dan pelajaran yang dapat dialihkan.",
        },
        {
          q: "Apa pelajaran yang dapat dialihkan untuk operator lain?",
          a: "Untuk operasi multi-lokasi, build pertama dengan ROI tertinggi biasanya yang menghapus pajak rekonsiliasi manual yang tumbuh seiring tiap lokasi — pusatkan sumber kebenaran sebelum apa pun.",
        },
        {
          q: "Bagaimana build serupa dimulai?",
          a: "Dengan Diagnostic dua minggu yang memetakan hambatan operasional dan mendefinisikan target terukur sebelum sistem apa pun dibangun.",
        },
      ],
    },

    "expeditoo-marketplace-france": {
      navLabel: "Expeditoo",
      seoTitle: "Expeditoo — marketplace logistik, Prancis · PRIONATION",
      metaDescription:
        "Bagaimana PRIONATION merekayasa marketplace logistik dan lelang untuk Expeditoo — menggabungkan penawaran dan pelacakan pengiriman dalam satu sistem produksi — dan pelajaran yang dapat dialihkan.",
      badge: "Showcase · 🇫🇷 Prancis · Marketplace",
      tldr: "Expeditoo butuh satu aplikasi yang menggabungkan penawaran ala lelang dengan pelacakan pengiriman — dua sistem kompleks yang kebanyakan tim bangun terpisah. PRIONATION merekayasanya menjadi satu marketplace produksi. Halaman ini memprofilkan proyek dan pelajaran bagi operator platform dua sisi.",
      h1: "Expeditoo: marketplace logistik dengan penawaran dan pelacakan dalam satu sistem",
      intro: [
        "Expeditoo adalah marketplace logistik Prancis yang menggabungkan mekanika lelang dengan pelacakan pengiriman. Bagian sulit dari platform seperti itu bukan salah satu fitur saja — melainkan membuat penawaran dan pelacakan operasional bekerja sebagai satu sistem koheren alih-alih dua yang ditempel.",
        "Halaman ini memprofilkan proyek: hambatan, pendekatan build, dan pelajaran yang dapat dialihkan bagi siapa pun yang membangun platform logistik dua sisi. Hasil terkuantifikasi dipublikasikan setelah difinalkan.",
      ],
      sections: [
        {
          h2: "Hambatan",
          body: [
            "Marketplace logistik membawa kompleksitas dua sisi: lapisan penawaran tempat harga ditemukan, dan lapisan operasional tempat pengiriman dilacak hingga selesai. Dibangun terpisah, keduanya menyimpang — marketplace menjanjikan apa yang tak bisa diberikan operasi dengan andal, dan datanya tak pernah cocok.",
            "Bagi Expeditoo, tantangannya menyatukannya menjadi satu aplikasi dengan logika bisnis konsisten di kedua sisi.",
          ],
        },
        {
          h2: "Bagaimana PRIONATION membangun",
          body: [
            "Pendekatannya memperlakukan penawaran dan pelacakan sebagai satu domain dengan satu sumber kebenaran, bukan dua integrasi. Itu berarti mendefinisikan model data bersama dulu, lalu membangun alur penawaran dan pelacakan di atasnya agar konsisten secara konstruksi.",
            "Hasilnya dikirim sebagai sistem produksi yang dimiliki klien — full-stack, menangani logika bisnis kompleks yang dibutuhkan platform logistik dua sisi.",
          ],
        },
        {
          h2: "Apa yang berubah",
          body: [
            "Alih-alih dua sistem untuk direkonsiliasi, Expeditoo menjalankan satu aplikasi tempat sebuah penawaran dan pengiriman yang dihasilkannya berbagi catatan yang sama. Ringkasan proyek publik menggambarkannya sebagai menunjukkan kapabilitas full-stack pada logika bisnis kompleks.",
            "Metrik operasional sedang disiapkan untuk publikasi dan akan muncul di sini dan di halaman transparansi.",
          ],
        },
        {
          h2: "Pelajaran yang dapat dialihkan",
          body: [
            "Untuk platform dua sisi, pelajarannya struktural: modelkan domain bersama sebelum membangun salah satu sisi. Sebagian besar kepedihan marketplace berasal dari sistem penawaran dan sistem operasi yang dibangun terpisah dan tak pernah menyepakati data. Satu sumber kebenaran menghapus seluruh kategori masalah di kemudian hari.",
            "Jika dua sisi platform Anda berdebat tentang apa yang terjadi, perbaikannya biasanya di hulu pada model data, bukan di salah satu fitur.",
          ],
        },
      ],
      faq: [
        {
          q: "Apa yang dibangun PRIONATION untuk Expeditoo?",
          a: "Marketplace logistik dan lelang yang menggabungkan mekanika penawaran dan pelacakan pengiriman menjadi satu aplikasi produksi dengan logika bisnis konsisten di kedua sisi.",
        },
        {
          q: "Apa yang membuat marketplace logistik sulit dibangun?",
          a: "Kompleksitas dua sisi: lapisan penawaran dan lapisan pelacakan operasional yang, jika dibangun terpisah, menyimpang. Bagian sulitnya membuat keduanya satu sistem koheren dengan sumber kebenaran bersama.",
        },
        {
          q: "Di mana metrik terperinci?",
          a: "Hasil operasional sedang disiapkan dan akan dipublikasikan di sini dan di halaman transparansi. Profil ini menjelaskan proyek dan pelajaran yang dapat dialihkan.",
        },
        {
          q: "Apa pelajaran yang dapat dialihkan?",
          a: "Untuk platform dua sisi mana pun, modelkan domain bersama sebelum membangun salah satu sisi — sebagian besar kepedihan marketplace berasal dari dua sistem yang tak pernah menyepakati data.",
        },
        {
          q: "Bagaimana build serupa dimulai?",
          a: "Dengan Diagnostic dua minggu untuk memetakan domain dan mendefinisikan model data bersama sebelum fitur apa pun dibangun.",
        },
      ],
    },

    "lead-agent-real-estate-australia": {
      navLabel: "The Lead Agent",
      seoTitle: "The Lead Agent — lead gen real estate, Australia · PRIONATION",
      metaDescription:
        "Bagaimana PRIONATION membangun platform generasi lead dan penjadwalan janji untuk The Lead Agent, mengotomatiskan manajemen pipeline bagi agen properti Australia — dan pelajaran yang dapat dialihkan.",
      badge: "Showcase · 🇦🇺 Australia · Real estate",
      tldr: "The Lead Agent, operasi real estate Australia, menjalankan generasi lead dan penjadwalan janji lewat pekerjaan pipeline manual yang membatasi berapa banyak agen yang bisa didukung. PRIONATION membangun platform produksi yang mengotomatiskan pipeline. Halaman ini memprofilkan proyek dan pelajaran bagi operator yang digerakkan penjualan.",
      h1: "The Lead Agent: mengotomatiskan pipeline lead real estate",
      intro: [
        "The Lead Agent adalah operasi real estate Australia yang pertumbuhannya dibatasi oleh pekerjaan manual menghasilkan, mengkualifikasi, dan menjadwalkan lead. Dalam bisnis yang digerakkan penjualan, pekerjaan pipeline ini sekaligus esensial dan hal pertama yang gagal menskala.",
        "Halaman ini memprofilkan proyek: hambatan, build, dan pelajaran yang dapat dialihkan bagi operator mana pun yang pertumbuhannya dibatasi manajemen pipeline manual. Hasil terkuantifikasi dipublikasikan setelah difinalkan.",
      ],
      sections: [
        {
          h2: "Hambatan",
          body: [
            "Generasi lead dan penjadwalan janji yang dikerjakan manual punya plafon keras: tiap agen tambahan melipatgandakan koordinasi manual, dan kualitas merosot persis saat volume naik. Kendalanya bukan usaha — melainkan pipeline tak menskala tanpa sistem untuk menjalankannya.",
            "Bagi The Lead Agent, hambatannya pipeline manual ini, yang membatasi berapa banyak agen ambisius yang bisa didukung operasi sekaligus.",
          ],
        },
        {
          h2: "Bagaimana PRIONATION membangun",
          body: [
            "Build menargetkan pipeline sebagai operasi, bukan generasi lead sebagai fitur: platform web menghadap klien yang mengotomatiskan manajemen pipeline ujung ke ujung, sehingga koordinasi yang manual menjadi sistematis. Targetnya didefinisikan sebelum build — seperti apa pipeline yang dikelola dengan benar — dan sistemnya dibangun untuk memberikannya.",
            "Ia dikirim sebagai platform produksi yang dimiliki dan dioperasikan klien di seluruh pasar Australia.",
          ],
        },
        {
          h2: "Apa yang berubah",
          body: [
            "Koordinasi pipeline manual diganti platform yang mengotomatiskannya, menaikkan jumlah agen yang bisa didukung operasi tanpa kenaikan kerja manual yang proporsional. Ringkasan proyek publik menggambarkan platform generasi lead dan penjadwalan janji lengkap yang mengotomatiskan manajemen pipeline.",
            "Metrik konversi dan throughput sedang disiapkan untuk publikasi dan akan muncul di sini dan di halaman transparansi.",
          ],
        },
        {
          h2: "Pelajaran yang dapat dialihkan",
          body: [
            "Pelajaran bagi operator yang digerakkan penjualan: hambatannya biasanya pipeline, bukan lead-nya. Menghasilkan lebih banyak lead ke pipeline manual hanya memindahkan hambatan ke hilir. Mengotomatiskan koordinasi — kualifikasi dan penjadwalan — yang benar-benar menaikkan kapasitas.",
            "Dan ada batas yang jujur: sistem menaikkan plafon volume dan konsistensi pipeline, tetapi tak menggantikan pertimbangan agen yang baik. Kemenangannya menghapus koordinasi manual, bukan hubungan manusia.",
          ],
        },
      ],
      faq: [
        {
          q: "Apa yang dibangun PRIONATION untuk The Lead Agent?",
          a: "Platform generasi lead dan penjadwalan janji lengkap — sistem web menghadap klien yang mengotomatiskan manajemen pipeline bagi agen properti yang beroperasi di seluruh Australia.",
        },
        {
          q: "Apa hambatan operasionalnya?",
          a: "Generasi lead dan penjadwalan janji manual yang tak menskala: tiap agen tambahan melipatgandakan koordinasi manual, membatasi berapa banyak yang bisa didukung operasi.",
        },
        {
          q: "Di mana metrik konversi terperinci?",
          a: "Hasil konversi dan throughput sedang disiapkan dan akan dipublikasikan di sini dan di halaman transparansi. Profil ini menjelaskan proyek dan pelajaran yang dapat dialihkan.",
        },
        {
          q: "Apa pelajaran yang dapat dialihkan untuk tim penjualan?",
          a: "Hambatannya biasanya pipeline, bukan lead. Mengotomatiskan kualifikasi dan penjadwalan menaikkan kapasitas; menghasilkan lebih banyak lead ke pipeline manual hanya memindahkan hambatan ke hilir.",
        },
        {
          q: "Apa yang tak bisa diperbaiki otomatisasi di sini?",
          a: "Ia menaikkan plafon volume dan konsistensi pipeline tetapi tak menggantikan pertimbangan agen yang baik. Kemenangannya menghapus koordinasi manual, bukan hubungan manusia.",
        },
      ],
    },
  },
};
