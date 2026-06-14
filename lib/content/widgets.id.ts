import type { WidgetText } from "./widgets";

export const id: WidgetText = {
  buildVsBuy: {
    title: "Build vs buy: nilai alur kerja Anda",
    intro:
      "Jawab enam pertanyaan tentang alur kerja yang sedang Anda timbang. Alat ini mengubahnya menjadi sebuah arah — build, buy, atau hibrida — memakai logika yang sama dengan yang diterapkan sebuah Diagnostic. Perlakukan hasilnya sebagai awal percakapan pelingkupan, bukan vonis.",
    questions: [
      {
        label:
          "Biaya tahunan menjalankan alur kerja ini saat ini (biaya penuh, termasuk orang)",
        options: ["Rendah", "Sedang", "Tinggi"],
      },
      {
        label: "Seberapa sering dijalankan",
        options: ["Volume rendah", "Stabil", "Volume tinggi"],
      },
      {
        label: "Seberapa khas terhadap cara Anda bersaing",
        options: [
          "Generik — perusahaan mana pun memilikinya",
          "Campuran",
          "Sangat khas bagi kami",
        ],
      },
      {
        label: "Sensitivitas data",
        options: [
          "Boleh keluar lingkungan kami",
          "Ada sejumlah kendala",
          "Harus tetap di internal",
        ],
      },
      {
        label: "SaaS yang ada dan sudah menutupinya",
        options: [
          "Ada produk yang kuat",
          "Cakupan sebagian",
          "Sedikit atau tidak ada",
        ],
      },
      {
        label: "Berapa lama Anda akan bergantung pada alur kerja ini",
        options: ["Kurang dari setahun", "Satu hingga tiga tahun", "Bertahun-tahun"],
      },
    ],
    resultLabel: "Arah yang direkomendasikan",
    scoreNote:
      "Bila dua jawaban menarik ke arah berlawanan, spesifisitas adalah penentunya — seberapa unik alur kerja itu bagi cara Anda bersaing.",
    verdicts: {
      build: {
        title: "Build",
        body: "Sinyalnya mengarah ke build khusus: alur kerja ini khas, mahal atau bervolume tinggi, atau dibatasi data yang tak boleh keluar lingkungan Anda, dan Anda akan bergantung padanya bertahun-tahun. Langkah berikutnya adalah Diagnostic dua minggu untuk memetakan hambatan dan menetapkan harga Build tetap.",
      },
      hybrid: {
        title: "Hibrida",
        body: "Intinya tampak generik, tetapi mil terakhirnya milik Anda. Beli lapisan komoditasnya dan bangun hanya lapisan pembeda tipis di atasnya — di situlah sebagian besar kemenangan AI mid-market sesungguhnya berada. Sebuah Diagnostic dapat memastikan persis di mana garis itu jatuh.",
      },
      buy: {
        title: "Buy",
        body: "Alur kerja ini generik dan terlayani baik oleh SaaS matang — Anda tidak perlu membangun infrastruktur komoditas. Langkah berikutnya adalah pemilihan vendor, bukan sebuah proyek. Jika ini berubah seiring pertumbuhan Anda, kasus build mudah ditinjau ulang.",
      },
    },
    cta: "Petakan dalam sebuah Diagnostic",
  },
  podVsHire: {
    title: "Pod vs rekrut: perkirakan biaya nyatanya",
    intro:
      "Bandingkan pod berharga tetap dengan rekrutan AI internal sepanjang horizon waktu Anda. Nilai default berasal dari angka yang diterbitkan di situs ini; setiap masukan dapat diubah, dan hasilnya adalah estimasi untuk membingkai keputusan — bukan penawaran.",
    fields: {
      hireCost: "Biaya penuh satu rekrutan AI senior (€/tahun)",
      podCost: "Harga tetap per Build (€)",
      years: "Horizon waktu (tahun)",
      buildsPerYear: "Build yang Anda harapkan per tahun",
    },
    hireTotalLabel: "Rekrutan internal",
    podTotalLabel: "Pod PRIONATION",
    podWins:
      "Sepanjang horizon ini, pod keluar kira-kira {amount} lebih murah — dan Anda tak menanggung risiko rekrutmen, adaptasi, atau mutu rekrut.",
    hireWins:
      "Sepanjang horizon ini, tim internal keluar kira-kira {amount} lebih murah — pertanda peta jalan AI Anda mungkin cukup permanen untuk dijadikan dasar merekrut.",
    evenLabel:
      "Sepanjang horizon ini keduanya kira-kira setara — faktor penentunya menjadi risiko, kecepatan, dan seberapa permanen peta jalannya.",
    note: "Jalur yang umum bersifat berurutan: kirim build pertama dengan pod untuk membuktikan nilai, lalu merekrut terhadap peta jalan yang terbukti — mewarisi sistem yang berjalan, bukan kotak hitam. Sebuah rekrutan juga menanggung adaptasi tiga hingga enam bulan serta biaya rekrutmen yang tidak ditambahkan estimasi ini.",
    disclaimer:
      "Estimasi saja, berdasarkan masukan Anda dan harga publik. Bukan penawaran. Sebuah rekrutan adalah satu insinyur; sebuah pod adalah tim senior dengan eval, telemetri, dan garansi empat minggu.",
    cta: "Dapatkan harga Build tetap",
  },
  readiness: {
    title: "Apakah Anda siap untuk build 8 minggu?",
    intro:
      "Nilai diri Anda terhadap lima prasyarat yang menjadi sandaran build berharga tetap delapan minggu. Sebuah celah bukanlah diskualifikasi — ia adalah hal yang harus ditutup sebelum jam mulai berdetak, dan itulah persis yang dilakukan sebuah Diagnostic.",
    areas: [
      "Data representatif ada, dapat diakses, dan cukup baik untuk dijadikan dasar eval",
      "Satu pengambil keputusan yang bertanggung jawab memiliki hasilnya — bukan sebuah komite",
      "Anda dapat menyatakan apa arti 'berfungsi' dalam istilah yang terukur",
      "Sebuah tim dapat menyediakan di lingkungan Anda tanpa rantai persetujuan berbulan-bulan",
      "Anggaran dan kalender delapan minggu benar-benar dikomitmenkan",
    ],
    scale: ["Tidak", "Sebagian", "Ya"],
    resultLabel: "Kesiapan Anda",
    verdicts: {
      ready: {
        title: "Siap build",
        body: "Anda kuat di seluruh prasyarat, sehingga Build dapat dimulai dengan percaya diri dan harga tetapnya berisiko rendah. Diagnostic menjadi konfirmasi singkat alih-alih pekerjaan dasar.",
      },
      partial: {
        title: "Hampir sampai — tutup celahnya",
        body: "Sebagian besar fondasi sudah ada. Mantapkan dulu area di bawah ini; sebuah Diagnostic dapat melakukan pekerjaan itu dan menghasilkan rencana build dalam langkah yang sama.",
      },
      diagnostic: {
        title: "Mulai dengan sebuah Diagnostic",
        body: "Cukup banyak prasyarat yang masih terbuka sehingga memulai Build sekarang akan berisiko. Diagnostic dua minggu ada justru untuk menyelesaikan hal-hal tak diketahui ini dan mengubah 'belum' menjadi 'siap'.",
      },
    },
    weakLabel: "Area yang harus dimantapkan dulu",
    cta: "Mulai sebuah Diagnostic",
  },
};
