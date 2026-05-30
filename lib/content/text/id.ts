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
};
