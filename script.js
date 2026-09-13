/* =========================================================
   AYAH - SCRIPT COMPLET v10.5 - UTF8-SAFE
   Tous les accents sont echappes en Unicode
   ========================================================= */

"use strict";

/* =========================================================
   1) DONNEES IMMEDIATES
   ========================================================= */

const DEMO_AYAHS = [
  { id: 1, surah: "Al-Fatiha", surahNumber: 1, ayahNumber: 1,
    arabic: "   ",
    translation: "Au nom d'Allah, le Tout Mis\u00e9ricordieux, le Tr\u00e8s Mis\u00e9ricordieux." },
  { id: 2, surah: "Ash-Sharh", surahNumber: 94, ayahNumber: 5,
    arabic: "   ",
    translation: "\u00c0 c\u00f4t\u00e9 de la difficult\u00e9 est, certes, une facilit\u00e9." },
  { id: 3, surah: "Ash-Sharh", surahNumber: 94, ayahNumber: 6,
    arabic: "   ",
    translation: "Certes, avec la difficult\u00e9 vient certes la facilit\u00e9." },
  { id: 4, surah: "Ar-Ra'd", surahNumber: 13, ayahNumber: 28,
    arabic: "    ",
    translation: "N'est-ce point par l'\u00e9vocation d'Allah que les c\u0153urs se tranquillisent ?" },
  { id: 5, surah: "Al-Baqarah", surahNumber: 2, ayahNumber: 286,
    arabic: "     ",
    translation: "Allah n'impose \u00e0 aucune \u00e2me une charge sup\u00e9rieure \u00e0 sa capacit\u00e9." }
];

const JUZ_STARTS = [
  { num: 1,  surah: 1,  ayah: 1,   name: "Alif L\u0101m M\u012bm",         end: { surah: 2,   ayah: 141 } },
  { num: 2,  surah: 2,  ayah: 142, name: "Sayaq\u016bl",              end: { surah: 2,   ayah: 252 } },
  { num: 3,  surah: 2,  ayah: 253, name: "Tilka r-Rusul",        end: { surah: 3,   ayah: 92 } },
  { num: 4,  surah: 3,  ayah: 93,  name: "Lan Tan\u0101l\u016b",           end: { surah: 4,   ayah: 23 } },
  { num: 5,  surah: 4,  ayah: 24,  name: "Wal-Mu\u1e25\u1e63an\u0101t",         end: { surah: 4,   ayah: 147 } },
  { num: 6,  surah: 4,  ayah: 148, name: "L\u0101 Yu\u1e25ibbu ll\u0101h",      end: { surah: 5,   ayah: 81 } },
  { num: 7,  surah: 5,  ayah: 82,  name: "Wa Idh\u0101 Sami\u02bf\u016b",       end: { surah: 6,   ayah: 110 } },
  { num: 8,  surah: 6,  ayah: 111, name: "Wa Law Annan\u0101",        end: { surah: 7,   ayah: 87 } },
  { num: 9,  surah: 7,  ayah: 88,  name: "Q\u0101la l-Mala\u02be",         end: { surah: 8,   ayah: 40 } },
  { num: 10, surah: 8,  ayah: 41,  name: "Wa \u02bfLam\u016b",             end: { surah: 9,   ayah: 92 } },
  { num: 11, surah: 9,  ayah: 93,  name: "Ya\u02bftadhir\u016bn",          end: { surah: 11,  ayah: 5 } },
  { num: 12, surah: 11, ayah: 6,   name: "Wa M\u0101 Min D\u0101bbah",     end: { surah: 12,  ayah: 52 } },
  { num: 13, surah: 12, ayah: 53,  name: "Wa M\u0101 Ubarri\u02beu",       end: { surah: 14,  ayah: 52 } },
  { num: 14, surah: 15, ayah: 1,   name: "Rubam\u0101",               end: { surah: 16,  ayah: 128 } },
  { num: 15, surah: 17, ayah: 1,   name: "Sub\u1e25\u0101na lladh\u012b",       end: { surah: 18,  ayah: 74 } },
  { num: 16, surah: 18, ayah: 75,  name: "Q\u0101la Alam",            end: { surah: 20,  ayah: 135 } },
  { num: 17, surah: 21, ayah: 1,   name: "Iqtaraba",             end: { surah: 22,  ayah: 78 } },
  { num: 18, surah: 23, ayah: 1,   name: "Qad Afla\u1e25a",           end: { surah: 25,  ayah: 20 } },
  { num: 19, surah: 25, ayah: 21,  name: "Wa Q\u0101la lladh\u012bna",     end: { surah: 27,  ayah: 55 } },
  { num: 20, surah: 27, ayah: 56,  name: "Amman Khalaq",         end: { surah: 29,  ayah: 45 } },
  { num: 21, surah: 29, ayah: 46,  name: "Utlu M\u0101 \u016a\u1e25iya",        end: { surah: 33,  ayah: 30 } },
  { num: 22, surah: 33, ayah: 31,  name: "Wa Man Yaqnut",        end: { surah: 36,  ayah: 27 } },
  { num: 23, surah: 36, ayah: 28,  name: "Wa M\u0101 Anzaln\u0101",        end: { surah: 39,  ayah: 31 } },
  { num: 24, surah: 39, ayah: 32,  name: "Fa Man A\u1e93lam",         end: { surah: 41,  ayah: 46 } },
  { num: 25, surah: 41, ayah: 47,  name: "Ilayhi Yuraddu",       end: { surah: 45,  ayah: 37 } },
  { num: 26, surah: 46, ayah: 1,   name: "\u1e24\u0101 M\u012bm",               end: { surah: 51,  ayah: 30 } },
  { num: 27, surah: 51, ayah: 31,  name: "Q\u0101la Fam\u0101 Kha\u1e6dbukum",  end: { surah: 57,  ayah: 29 } },
  { num: 28, surah: 58, ayah: 1,   name: "Qad Sami\u02bfa ll\u0101h",      end: { surah: 66,  ayah: 12 } },
  { num: 29, surah: 67, ayah: 1,   name: "Tab\u0101raka lladh\u012b",      end: { surah: 77,  ayah: 50 } },
  { num: 30, surah: 78, ayah: 1,   name: "\u02bfAmma Yatas\u0101\u02beal\u016bn",    end: { surah: 114, ayah: 6 } }
];

const SURAH_ARABIC = {
  1:"\u0627\u0644\u0641\u064e\u0627\u062a\u0650\u062d\u064e\u0629",2:"\u0627\u0644\u0628\u064e\u0642\u064e\u0631\u064e\u0629",3:"\u0622\u0644 \u0639\u0650\u0645\u0631\u064e\u0627\u0646",4:"\u0627\u0644\u0646\u0651\u0650\u0633\u064e\u0627\u0621",5:"\u0627\u0644\u0645\u064e\u0627\u0626\u0650\u062f\u064e\u0629",
  6:"\u0627\u0644\u0623\u064e\u0646\u0639\u064e\u0627\u0645",7:"\u0627\u0644\u0623\u064e\u0639\u0631\u064e\u0627\u0641",8:"\u0627\u0644\u0623\u064e\u0646\u0641\u064e\u0627\u0644",9:"\u0627\u0644\u062a\u0651\u064e\u0648\u0628\u064e\u0629",10:"\u064a\u064f\u0648\u0646\u064f\u0633",
  11:"\u0647\u064f\u0648\u062f",12:"\u064a\u064f\u0648\u0633\u064f\u0641",13:"\u0627\u0644\u0631\u0651\u064e\u0639\u062f",14:"\u0625\u0628\u0631\u064e\u0627\u0647\u0650\u064a\u0645",15:"\u0627\u0644\u062d\u0650\u062c\u0631",
  16:"\u0627\u0644\u0646\u0651\u064e\u062d\u0644",17:"\u0627\u0644\u0625\u0633\u0631\u064e\u0627\u0621",18:"\u0627\u0644\u0643\u064e\u0647\u0641",19:"\u0645\u064e\u0631\u064a\u064e\u0645",20:"\u0637\u0647",
  21:"\u0627\u0644\u0623\u064e\u0646\u0628\u0650\u064a\u064e\u0627\u0621",22:"\u0627\u0644\u062d\u064e\u062c",23:"\u0627\u0644\u0645\u064f\u0624\u0645\u0650\u0646\u064f\u0648\u0646",24:"\u0627\u0644\u0646\u0651\u064f\u0648\u0631",25:"\u0627\u0644\u0641\u064f\u0631\u0642\u064e\u0627\u0646",
  26:"\u0627\u0644\u0634\u0651\u064f\u0639\u064e\u0631\u064e\u0627\u0621",27:"\u0627\u0644\u0646\u0651\u064e\u0645\u0644",28:"\u0627\u0644\u0642\u064e\u0635\u064e\u0635",29:"\u0627\u0644\u0639\u064e\u0646\u0643\u064e\u0628\u064f\u0648\u062a",30:"\u0627\u0644\u0631\u0651\u064f\u0648\u0645",
  31:"\u0644\u064f\u0642\u0645\u064e\u0627\u0646",32:"\u0627\u0644\u0633\u0651\u064e\u062c\u062f\u064e\u0629",33:"\u0627\u0644\u0623\u064e\u062d\u0632\u064e\u0627\u0628",34:"\u0633\u064e\u0628\u064e\u0625",35:"\u0641\u064e\u0627\u0637\u0650\u0631",
  36:"\u064a\u0633",37:"\u0627\u0644\u0635\u0651\u064e\u0627\u0641\u0651\u064e\u0627\u062a",38:"\u0635",39:"\u0627\u0644\u0632\u0651\u064f\u0645\u064e\u0631",40:"\u063a\u064e\u0627\u0641\u0650\u0631",
  41:"\u0641\u064f\u0635\u0651\u0650\u0644\u064e\u062a",42:"\u0627\u0644\u0634\u0651\u064f\u0648\u0631\u064e\u0649",43:"\u0627\u0644\u0632\u0651\u064f\u062e\u0631\u064f\u0641",44:"\u0627\u0644\u062f\u0651\u064f\u062e\u064e\u0627\u0646",45:"\u0627\u0644\u062c\u064e\u0627\u062b\u0650\u064a\u064e\u0629",
  46:"\u0627\u0644\u0623\u064e\u062d\u0642\u064e\u0627\u0641",47:"\u0645\u064f\u062d\u064e\u0645\u0651\u064e\u062f",48:"\u0627\u0644\u0641\u064e\u062a\u062d",49:"\u0627\u0644\u062d\u064f\u062c\u064f\u0631\u064e\u0627\u062a",50:"\u0642",
  51:"\u0627\u0644\u0630\u0651\u064e\u0627\u0631\u0650\u064a\u064e\u0627\u062a",52:"\u0627\u0644\u0637\u0651\u064f\u0648\u0631",53:"\u0627\u0644\u0646\u0651\u064e\u062c\u0645",54:"\u0627\u0644\u0642\u064e\u0645\u064e\u0631",55:"\u0627\u0644\u0631\u0651\u064e\u062d\u0645\u064e\u0646",
  56:"\u0627\u0644\u0648\u064e\u0627\u0642\u0650\u0639\u064e\u0629",57:"\u0627\u0644\u062d\u064e\u062f\u0650\u064a\u062f",58:"\u0627\u0644\u0645\u064f\u062c\u064e\u0627\u062f\u064e\u0644\u064e\u0629",59:"\u0627\u0644\u062d\u064e\u0634\u0631",60:"\u0627\u0644\u0645\u064f\u0645\u062a\u064e\u062d\u0646\u064e\u0629",
  61:"\u0627\u0644\u0635\u0651\u064e\u0641",62:"\u0627\u0644\u062c\u064f\u0645\u064f\u0639\u064e\u0629",63:"\u0627\u0644\u0645\u064f\u0646\u064e\u0627\u0641\u0650\u0642\u064f\u0648\u0646",64:"\u0627\u0644\u062a\u0651\u064e\u063a\u064e\u0627\u0628\u064f\u0646",65:"\u0627\u0644\u0637\u0651\u064e\u0644\u064e\u0627\u0642",
  66:"\u0627\u0644\u062a\u0651\u064e\u062d\u0631\u0650\u064a\u0645",67:"\u0627\u0644\u0645\u064f\u0644\u0643",68:"\u0627\u0644\u0642\u064e\u0644\u064e\u0645",69:"\u0627\u0644\u062d\u064e\u0627\u0642\u0651\u064e\u0629",70:"\u0627\u0644\u0645\u064e\u0639\u064e\u0627\u0631\u0650\u062c",
  71:"\u0646\u064f\u0648\u062d",72:"\u0627\u0644\u062c\u0650\u0646",73:"\u0627\u0644\u0645\u064f\u0632\u0651\u064e\u0645\u0651\u0650\u0644",74:"\u0627\u0644\u0645\u064f\u062f\u0651\u064e\u062b\u0651\u0650\u0631",75:"\u0627\u0644\u0642\u0650\u064a\u064e\u0627\u0645\u064e\u0629",
  76:"\u0627\u0644\u0625\u0646\u0633\u064e\u0627\u0646",77:"\u0627\u0644\u0645\u064f\u0631\u0633\u064e\u0644\u064e\u0627\u062a",78:"\u0627\u0644\u0646\u0651\u064e\u0628\u064e\u0623",79:"\u0627\u0644\u0646\u0651\u064e\u0627\u0632\u0650\u0639\u064e\u0627\u062a",80:"\u0639\u064e\u0628\u064e\u0633",
  81:"\u0627\u0644\u062a\u0651\u064e\u0643\u0648\u0650\u064a\u0631",82:"\u0627\u0644\u0627\u0646\u0641\u0650\u0637\u064e\u0627\u0631",83:"\u0627\u0644\u0645\u064f\u0637\u064e\u0641\u0651\u0650\u0641\u0650\u064a\u0646",84:"\u0627\u0644\u0627\u0646\u0634\u0650\u0642\u064e\u0627\u0642",85:"\u0627\u0644\u0628\u064f\u0631\u064f\u0648\u062c",
  86:"\u0627\u0644\u0637\u0651\u064e\u0627\u0631\u0650\u0642",87:"\u0627\u0644\u0623\u064e\u0639\u0644\u064e\u0649",88:"\u0627\u0644\u063a\u064e\u0627\u0634\u0650\u064a\u064e\u0629",89:"\u0627\u0644\u0641\u064e\u062c\u0631",90:"\u0627\u0644\u0628\u064e\u0644\u064e\u062f",
  91:"\u0627\u0644\u0634\u0651\u064e\u0645\u0633",92:"\u0627\u0644\u0644\u0651\u064e\u064a\u0644",93:"\u0627\u0644\u0636\u0651\u064f\u062d\u064e\u0649",94:"\u0627\u0644\u0634\u0651\u064e\u0631\u062d",95:"\u0627\u0644\u062a\u0651\u0650\u064a\u0646",
  96:"\u0627\u0644\u0639\u064e\u0644\u064e\u0642",97:"\u0627\u0644\u0642\u064e\u062f\u0631",98:"\u0627\u0644\u0628\u064e\u064a\u0651\u0650\u0646\u064e\u0629",99:"\u0627\u0644\u0632\u0651\u064e\u0644\u0632\u064e\u0644\u064e\u0629",100:"\u0627\u0644\u0639\u064e\u0627\u062f\u0650\u064a\u064e\u0627\u062a",
  101:"\u0627\u0644\u0642\u064e\u0627\u0631\u0650\u0639\u064e\u0629",102:"\u0627\u0644\u062a\u0651\u064e\u0643\u064e\u0627\u062b\u064f\u0631",103:"\u0627\u0644\u0639\u064e\u0635\u0631",104:"\u0627\u0644\u0647\u064f\u0645\u064e\u0632\u064e\u0629",105:"\u0627\u0644\u0641\u0650\u064a\u0644",
  106:"\u0642\u064f\u0631\u064e\u064a\u0634",107:"\u0627\u0644\u0645\u064e\u0627\u0639\u064f\u0648\u0646",108:"\u0627\u0644\u0643\u064e\u0648\u062b\u064e\u0631",109:"\u0627\u0644\u0643\u064e\u0627\u0641\u0650\u0631\u064f\u0648\u0646",110:"\u0627\u0644\u0646\u0651\u064e\u0635\u0631",
  111:"\u0627\u0644\u0645\u064e\u0633\u064e\u062f",112:"\u0627\u0644\u0625\u062e\u0644\u064e\u0627\u0635",113:"\u0627\u0644\u0641\u064e\u0644\u064e\u0642",114:"\u0627\u0644\u0646\u0651\u064e\u0627\u0633"
};

const RECITERS = {
  alafasy:  { name: "Mishary Alafasy",   edition: "ar.alafasy",            everyayah: "Alafasy_128kbps" },
  husary:   { name: "Mahmoud Al-Husary", edition: "ar.husary",             everyayah: "Husary_128kbps" },
  minshawi: { name: "Al-Minshawi",       edition: "ar.minshawi",           everyayah: "Minshawy_Murattal_128kbps" },
  basit:    { name: "Abdul Basit",       edition: "ar.abdulbasitmurattal", everyayah: "Abdul_Basit_Murattal_192kbps" },
  sudais:   { name: "As-Sudais",         edition: "ar.abdurrahmaansudais", everyayah: "Sudais_192kbps" }
};

const SPECIFIC_REMINDERS = {
  "1:1": "Commence chaque action par le nom d'Allah.",
  "2:152": "Souviens-toi d'Allah dans l'aisance, Il se souviendra de toi dans l'\u00e9preuve.",
  "2:255": "Ayat al-Kurs\u012b : r\u00e9cite-la apr\u00e8s chaque pri\u00e8re et avant de dormir.",
  "2:286": "Allah ne te charge jamais au-del\u00e0 de tes forces.",
  "13:28": "C'est par le dhikr que les c\u0153urs s'apaisent.",
  "14:7": "Si vous \u00eates reconnaissants, Je vous donnerai davantage.",
  "39:53": "Ne d\u00e9sesp\u00e8re jamais de la mis\u00e9ricorde d'Allah.",
  "40:60": "Appelle-Moi, Je vous r\u00e9pondrai.",
  "65:3": "Quiconque place sa confiance en Allah, Il lui suffit.",
  "93:3": "Ton Seigneur ne t'a ni abandonn\u00e9 ni d\u00e9test\u00e9.",
  "94:5": "\u00c0 c\u00f4t\u00e9 de la difficult\u00e9, il y a une facilit\u00e9.",
  "94:6": "Certes, avec la difficult\u00e9 vient une facilit\u00e9.",
  "103:3": "Foi, \u0153uvres, v\u00e9rit\u00e9, patience."
};

const UNIVERSAL_REMINDERS = [
  "Chaque verset du Coran est une lumi\u00e8re.",
  "Allah te parle \u00e0 travers ce verset.",
  "Le Coran est un rappel pour ceux qui r\u00e9fl\u00e9chissent.",
  "Chaque mot du Coran est une mis\u00e9ricorde.",
  "Allah a voulu que tu lises ce verset aujourd'hui.",
  "Un verset lu avec attention vaut mieux que cent lus distraitement.",
  "Le Coran gu\u00e9rit les c\u0153urs.",
  "Allah guide qui Il veut.",
  "Ce verset est un cadeau d'Allah pour toi.",
  "Applique ce verset dans ta journ\u00e9e.",
  "Chaque verset te rapproche d'Allah.",
  "Le meilleur est celui qui apprend et enseigne le Coran.",
  "Laisse ce verset transformer quelque chose en toi.",
  "Allah conna\u00eet ce que tu ressens.",
  "Le Coran est un dialogue entre Allah et Son serviteur.",
  "M\u00e9diter un verset vaut mieux que r\u00e9citer sans y penser.",
  "Chaque verset est une graine.",
  "Allah t'aime. C'est pour cela qu'Il a mis ce verset sous tes yeux.",
  "Ce verset te sera utile dans cette vie ou dans l'autre.",
  "Le Coran \u00e9claire le chemin."
];

/* =========================================================
   2) ETAT
   ========================================================= */

const STATE = {
  ayahs: [],
  current: null,
  seen: new Set(),
  favorites: [],
  bookmarks: [],
  discovered: 0,
  reciter: "alafasy",
  font: "medium",
  autoPlay: false,
  vibrate: true,
  isChanging: false,
  audioPlaying: false,
  audioToken: 0,
  currentJuz: null,
  visitedJuz: new Set(),
  readerOpen: false,
  readerJuz: null,
  readerShowTranslation: true,
  surahTotalAyahs: {},
  quranLoaded: false,
  readerLastVerse: null,
  readerReadSet: new Set(),
  _readMap: {},
  playAllActive: false,
  playAllIndex: -1,
  playAllQueue: [],
  playAllJuz: null,
  playbackRate: 1,
  repeatCount: 1,
  repeatCurrent: 0,
  autoNextJuz: false,
  scrollAuto: true,
  downloading: false,
  downloadedJuz: new Set(),
  audioBookmarkAuto: true,
  nightMode: false,
  stats: {
    totalSeconds: 0,
    versesListened: 0,
    lastListenDate: null,
    currentStreak: 0,
    longestStreak: 0
  }
};

const KEYS = {
  seen: "ayah_seen", fav: "ayah_favorites", bookmarks: "ayah_bookmarks",
  disc: "ayah_discovered", cur: "ayah_current", reciter: "ayah_reciter",
  font: "ayah_font", autoplay: "ayah_autoplay", vibrate: "ayah_vibrate",
  theme: "ayah_theme", cache: "ayah_quran_v10", juz: "ayah_visited_juz",
  currentJuz: "ayah_current_juz", readerTrans: "ayah_reader_trans",
  lastVerse: "ayah_reader_last_verse", readPerJuz: "ayah_reader_read_per_juz",
  playbackRate: "ayah_playback_rate", repeatCount: "ayah_repeat_count",
  autoNextJuz: "ayah_autonext", scrollAuto: "ayah_scroll_auto",
  downloadedJuz: "ayah_downloaded_juz", audioBookmarkAuto: "ayah_audio_bm_auto",
  nightMode: "ayah_night_mode", stats: "ayah_stats", resumeState: "ayah_resume_state"
};

/* =========================================================
   3) DOM
   ========================================================= */

const $ = (id) => document.getElementById(id);
const EL = {};

const DOM_IDS = [
  "ayahScreen", "ayahCard", "arabicText", "translationText", "surahName",
  "referenceNumber", "ayahNumber", "reminderBox", "discoveredCount", "totalCount",
  "progressBar", "progressTrack", "discoverButton", "favoriteButton", "audioButton",
  "bookmarkButton", "shareButton", "menuButton", "closeMenu", "sideMenu", "menuOverlay",
  "toast", "toastMessage", "toastIcon",
  "favoritesModal", "favoritesList", "favoritesEmpty",
  "bookmarksModal", "bookmarksList", "bookmarksEmpty",
  "progressModal", "modalDiscovered", "modalProgressBar",
  "statsModal", "statsTotalTime", "statsVersesListened", "statsJuzCompleted",
  "statsBookmarks", "statsFavorites", "statsStreak", "statsResetBtn",
  "juzModal", "juzGrid", "juzInfo",
  "settingsModal", "reciterOptions", "themeOptions", "fontOptions",
  "autoPlayToggle", "vibrateToggle", "autoNextJuzToggle", "scrollAutoToggle",
  "audioBookmarkAutoToggle", "nightModeToggle", "resetButton",
  "themeButton", "ayahAudio", "ayahAnnouncer",
  "juzReader", "readerBack", "readerToggle", "readerTop",
  "readerJuzNum", "readerJuzName", "readerContent", "readerProgressBar",
  "readerPrev", "readerNext", "readerToc",
  "readerReadCount", "readerTotalCount", "readerCounter",
  "readerPlayAll", "readerPlayIcon",
  "readerAudioBar", "audioPrevVerse", "audioPlayPause", "audioNextVerse",
  "audioClose", "audioPlayIcon", "audioCurrentVerse", "audioCurrentReciter",
  "audioSpeed", "audioSpeedLabel", "audioRepeat", "audioRepeatLabel",
  "audioDownload", "audioDownloadIcon", "audioBookmark", "audioBookmarkIcon",
  "readerDownloadPanel", "readerDownloadText", "readerDownloadPercent", "readerDownloadBar",
  "resumeBadge", "resumeBadgeInfo"
];

function grabDOM() {
  for (const id of DOM_IDS) EL[id] = $(id);
}

/* =========================================================
   4) UTILITAIRES
   ========================================================= */

function store(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
}

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch { return fallback; }
}

function buzz(ms = 15) {
  if (!STATE.vibrate) return;
  if (navigator.vibrate) { try { navigator.vibrate(ms); } catch {} }
}

function toast(message, icon = "\u2726") {
  if (!EL.toast || !EL.toastMessage) return;
  EL.toastMessage.textContent = message;
  if (EL.toastIcon) EL.toastIcon.textContent = icon;
  EL.toast.classList.add("visible");
  clearTimeout(toast._t);
  toast._t = setTimeout(() => EL.toast.classList.remove("visible"), 2200);
}

function toArabicNum(n) {
  return String(n).replace(/\d/g, d => "\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669"[d]);
}

/* =========================================================
   5) STORAGE
   ========================================================= */

function loadAll() {
  STATE.discovered = Number(load(KEYS.disc, 0)) || 0;
  STATE.seen = new Set(load(KEYS.seen, []));
  STATE.favorites = load(KEYS.fav, []);
  STATE.bookmarks = load(KEYS.bookmarks, []);
  STATE.current = load(KEYS.cur, null);
  STATE.reciter = load(KEYS.reciter, "alafasy");
  STATE.font = load(KEYS.font, "medium");
  STATE.autoPlay = load(KEYS.autoplay, false);
  STATE.vibrate = load(KEYS.vibrate, true);
  STATE.visitedJuz = new Set(load(KEYS.juz, []));
  STATE.currentJuz = load(KEYS.currentJuz, null);
  STATE.readerShowTranslation = load(KEYS.readerTrans, true);
  STATE.readerLastVerse = load(KEYS.lastVerse, null);
  STATE._readMap = load(KEYS.readPerJuz, {});
  STATE.playbackRate = Number(load(KEYS.playbackRate, 1)) || 1;
  const rep = load(KEYS.repeatCount, 1);
  STATE.repeatCount = rep === "inf" ? Infinity : (Number(rep) || 1);
  STATE.autoNextJuz = load(KEYS.autoNextJuz, false);
  STATE.scrollAuto = load(KEYS.scrollAuto, true);
  STATE.downloadedJuz = new Set(load(KEYS.downloadedJuz, []));
  STATE.audioBookmarkAuto = load(KEYS.audioBookmarkAuto, true);
  STATE.nightMode = load(KEYS.nightMode, false);
  const savedStats = load(KEYS.stats, null);
  if (savedStats) STATE.stats = { ...STATE.stats, ...savedStats };
  if (!RECITERS[STATE.reciter]) STATE.reciter = "alafasy";
}

let saveTimer = null;
function saveAll() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    store(KEYS.disc, STATE.discovered);
    store(KEYS.seen, [...STATE.seen]);
    store(KEYS.fav, STATE.favorites);
    store(KEYS.bookmarks, STATE.bookmarks);
    if (STATE.current) store(KEYS.cur, STATE.current);
    store(KEYS.reciter, STATE.reciter);
    store(KEYS.font, STATE.font);
    store(KEYS.autoplay, STATE.autoPlay);
    store(KEYS.vibrate, STATE.vibrate);
    store(KEYS.juz, [...STATE.visitedJuz]);
    if (STATE.currentJuz) store(KEYS.currentJuz, STATE.currentJuz);
    store(KEYS.readerTrans, STATE.readerShowTranslation);
    if (STATE.readerLastVerse) store(KEYS.lastVerse, STATE.readerLastVerse);
    if (STATE._readMap) store(KEYS.readPerJuz, STATE._readMap);
    store(KEYS.playbackRate, STATE.playbackRate);
    store(KEYS.repeatCount, STATE.repeatCount === Infinity ? "inf" : STATE.repeatCount);
    store(KEYS.autoNextJuz, STATE.autoNextJuz);
    store(KEYS.scrollAuto, STATE.scrollAuto);
    store(KEYS.downloadedJuz, [...STATE.downloadedJuz]);
    store(KEYS.audioBookmarkAuto, STATE.audioBookmarkAuto);
    store(KEYS.nightMode, STATE.nightMode);
    store(KEYS.stats, STATE.stats);
  }, 200);
}

/* =========================================================
   6) INDEXEDDB - Cache audio
   ========================================================= */

const AudioCache = {
  DB_NAME: "ayah_audio_cache",
  STORE: "ayahs",
  db: null,

  async init() {
    if (this.db) return this.db;
    return new Promise((resolve, reject) => {
      const req = indexedDB.open(this.DB_NAME, 1);
      req.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains(this.STORE)) {
          db.createObjectStore(this.STORE, { keyPath: "id" });
        }
      };
      req.onsuccess = () => { this.db = req.result; resolve(this.db); };
      req.onerror = () => reject(req.error);
    });
  },

  async get(id) {
    try {
      const db = await this.init();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(this.STORE, "readonly");
        const req = tx.objectStore(this.STORE).get(id);
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
      });
    } catch { return null; }
  },

  async set(id, data) {
    try {
      const db = await this.init();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(this.STORE, "readwrite");
        const req = tx.objectStore(this.STORE).put({ id, ...data, timestamp: Date.now() });
        req.onsuccess = () => resolve(true);
        req.onerror = () => reject(req.error);
      });
    } catch { return false; }
  },

  async clearJuz(juzNum) {
    try {
      const db = await this.init();
      return new Promise((resolve) => {
        const tx = db.transaction(this.STORE, "readwrite");
        const req = tx.objectStore(this.STORE).openCursor();
        req.onsuccess = (e) => {
          const cursor = e.target.result;
          if (cursor) {
            if (cursor.value.juz === juzNum) cursor.delete();
            cursor.continue();
          } else resolve(true);
        };
      });
    } catch { return false; }
  }
};

/* =========================================================
   7) RENDU
   ========================================================= */

function render(ayah, notify = false) {
  if (!ayah) return;
  if (EL.arabicText) EL.arabicText.textContent = ayah.arabic;
  if (EL.translationText) EL.translationText.textContent = ayah.translation;
  if (EL.surahName) EL.surahName.textContent = String(ayah.surah || "").toUpperCase();
  if (EL.referenceNumber) EL.referenceNumber.textContent = `${ayah.surahNumber} : ${ayah.ayahNumber}`;
  if (EL.ayahNumber) EL.ayahNumber.textContent = String(ayah.ayahNumber);
  if (EL.ayahAnnouncer) {
    EL.ayahAnnouncer.textContent = `Verset ${ayah.ayahNumber} de la sourate ${ayah.surah}. ${ayah.translation}`;
  }
  renderReminder(ayah);
  updateFavoriteButton();
  updateBookmarkButton();
  if (notify) toast("Nouveau verset", "\u2726");
  saveAll();
}

function renderReminder(ayah) {
  const box = EL.reminderBox;
  if (!box) return;
  const key = `${ayah.surahNumber}:${ayah.ayahNumber}`;
  let text = SPECIFIC_REMINDERS[key];
  let title = "Rappel du verset";
  let icon = "\u2726";
  if (!text) {
    text = UNIVERSAL_REMINDERS[ayah.id % UNIVERSAL_REMINDERS.length];
    title = "R\u00e9flexion";
    icon = "\u25c8";
  }
  box.textContent = "";
  const header = document.createElement("div");
  header.className = "reminder-header";
  const i = document.createElement("span");
  i.className = "reminder-icon";
  i.textContent = icon;
  const t = document.createElement("span");
  t.className = "reminder-title";
  t.textContent = title;
  header.append(i, t);
  const p = document.createElement("p");
  p.className = "reminder-text";
  p.textContent = text;
  box.append(header, p);
  box.classList.add("visible");
}

function updateFavoriteButton() {
  if (!EL.favoriteButton || !STATE.current) return;
  const isFav = STATE.favorites.some(f => f.id === STATE.current.id);
  EL.favoriteButton.classList.toggle("active", isFav);
  EL.favoriteButton.setAttribute("aria-pressed", String(isFav));
  const icon = EL.favoriteButton.querySelector(".action-icon");
  if (icon) icon.textContent = isFav ? "\u2665" : "\u2661";
}

function updateBookmarkButton() {
  if (!EL.bookmarkButton || !STATE.current) return;
  const isBm = STATE.bookmarks.some(b => b.id === STATE.current.id);
  EL.bookmarkButton.classList.toggle("active", isBm);
  EL.bookmarkButton.setAttribute("aria-pressed", String(isBm));
  const icon = EL.bookmarkButton.querySelector(".action-icon");
  if (icon) icon.style.opacity = isBm ? "1" : "0.6";
}

function updateProgress() {
  const total = STATE.ayahs.length || 6236;
  const count = Math.min(STATE.discovered, total);
  const pct = Math.max(0.5, (count / total) * 100);
  if (EL.discoveredCount) EL.discoveredCount.textContent = count.toLocaleString("fr-FR");
  if (EL.totalCount) EL.totalCount.textContent = total.toLocaleString("fr-FR");
  if (EL.progressBar) EL.progressBar.style.width = `${pct}%`;
  if (EL.progressTrack) {
    EL.progressTrack.setAttribute("aria-valuemax", String(total));
    EL.progressTrack.setAttribute("aria-valuenow", String(count));
  }
  if (EL.modalDiscovered) EL.modalDiscovered.textContent = count.toLocaleString("fr-FR");
  if (EL.modalProgressBar) {
    EL.modalProgressBar.style.width = `${pct}%`;
    EL.modalProgressBar.setAttribute("aria-valuemax", String(total));
    EL.modalProgressBar.setAttribute("aria-valuenow", String(count));
  }
}

/* =========================================================
   8) FAVORIS + SIGNETS
   ========================================================= */

function renderFavorites() {
  if (!EL.favoritesList) return;
  EL.favoritesList.textContent = "";
  if (STATE.favorites.length === 0) {
    if (EL.favoritesEmpty) EL.favoritesEmpty.style.display = "block";
    return;
  }
  if (EL.favoritesEmpty) EL.favoritesEmpty.style.display = "none";
  const frag = document.createDocumentFragment();
  for (let i = STATE.favorites.length - 1; i >= 0; i--) {
    const a = STATE.favorites[i];
    const item = document.createElement("button");
    item.type = "button";
    item.className = "favorite-item";
    const ar = document.createElement("div");
    ar.className = "favorite-arabic";
    ar.dir = "rtl";
    ar.textContent = a.arabic;
    const ref = document.createElement("div");
    ref.className = "favorite-reference";
    ref.textContent = `${a.surah} \u2022 ${a.surahNumber}:${a.ayahNumber}`;
    item.append(ar, ref);
    item.addEventListener("click", () => {
      STATE.current = a;
      render(a, false);
      closeModals();
      toast("Verset charg\u00e9", "\u2726");
    });
    frag.appendChild(item);
  }
  EL.favoritesList.appendChild(frag);
}

function toggleFavorite() {
  if (!STATE.current) return;
  const idx = STATE.favorites.findIndex(f => f.id === STATE.current.id);
  if (idx === -1) {
    STATE.favorites.push({ ...STATE.current });
    toast("Ajout\u00e9 aux favoris", "\u2665");
  } else {
    STATE.favorites.splice(idx, 1);
    toast("Retir\u00e9 des favoris", "\u2661");
  }
  saveAll();
  updateFavoriteButton();
  renderFavorites();
  buzz(20);
}

function renderBookmarks() {
  if (!EL.bookmarksList) return;
  EL.bookmarksList.textContent = "";
  if (STATE.bookmarks.length === 0) {
    if (EL.bookmarksEmpty) EL.bookmarksEmpty.style.display = "block";
    return;
  }
  if (EL.bookmarksEmpty) EL.bookmarksEmpty.style.display = "none";
  const frag = document.createDocumentFragment();
  for (let i = STATE.bookmarks.length - 1; i >= 0; i--) {
    const b = STATE.bookmarks[i];
    const item = document.createElement("button");
    item.type = "button";
    item.className = "favorite-item";
    const ar = document.createElement("div");
    ar.className = "favorite-arabic";
    ar.dir = "rtl";
    ar.textContent = b.arabic;
    const ref = document.createElement("div");
    ref.className = "favorite-reference";
    ref.textContent = `\u2756 ${b.surah} \u2022 ${b.surahNumber}:${b.ayahNumber}`;
    item.append(ar, ref);
    item.addEventListener("click", () => {
      STATE.current = b;
      render(b, false);
      closeModals();
      toast("Signet charg\u00e9", "\u2756");
    });
    frag.appendChild(item);
  }
  EL.bookmarksList.appendChild(frag);
}

function toggleBookmark() {
  if (!STATE.current) return;
  const idx = STATE.bookmarks.findIndex(b => b.id === STATE.current.id);
  if (idx === -1) {
    STATE.bookmarks.push({ ...STATE.current });
    toast("Signet ajout\u00e9", "\u2756");
  } else {
    STATE.bookmarks.splice(idx, 1);
    toast("Signet retir\u00e9", "\u2756");
  }
  saveAll();
  updateBookmarkButton();
  updateAudioBookmarkBtn();
  renderBookmarks();
  buzz(20);
}

function updateAudioBookmarkBtn() {
  if (!EL.audioBookmark || !STATE.current) return;
  const isBm = STATE.bookmarks.some(b => b.id === STATE.current.id);
  EL.audioBookmark.classList.toggle("bookmarked", isBm);
  if (EL.audioBookmarkIcon) EL.audioBookmarkIcon.textContent = isBm ? "\u2713" : "\u2756";
}

/* =========================================================
   9) JUZ - Grille
   ========================================================= */

function renderJuzGrid() {
  const grid = EL.juzGrid || document.getElementById("juzGrid");
  if (!grid) return;
  grid.textContent = "";
  const frag = document.createDocumentFragment();

  for (const juz of JUZ_STARTS) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "juz-item";
    btn.dataset.juz = String(juz.num);
    btn.setAttribute("role", "radio");
    btn.setAttribute("aria-checked", String(STATE.currentJuz === juz.num));
    if (STATE.currentJuz === juz.num) btn.classList.add("active");
    if (STATE.visitedJuz.has(juz.num)) btn.classList.add("visited");
    if (STATE.downloadedJuz.has(juz.num)) btn.classList.add("downloaded");
    const num = document.createElement("span");
    num.className = "juz-num";
    num.textContent = String(juz.num);
    const label = document.createElement("span");
    label.className = "juz-label";
    label.textContent = `Juz ${juz.num}`;
    btn.append(num, label);
    btn.onclick = (e) => { e.preventDefault(); e.stopPropagation(); openJuzReader(juz.num); };
    frag.appendChild(btn);
  }
  grid.appendChild(frag);
}

function openJuzModal() {
  renderJuzGrid();
  if (STATE.currentJuz) showJuzInfo(STATE.currentJuz);
  openModal(EL.juzModal);
}

function showJuzInfo(juzNum) {
  if (!EL.juzInfo) return;
  const juz = JUZ_STARTS.find(j => j.num === juzNum);
  if (!juz) { EL.juzInfo.textContent = ""; return; }
  EL.juzInfo.textContent = "";
  const p = document.createElement("p");
  p.innerHTML = `<strong>Juz ${juz.num}</strong> \u2014 ${juz.name}<br>` +
                `Sourate <strong>${juz.surah}</strong>, verset <strong>${juz.ayah}</strong>`;
  EL.juzInfo.appendChild(p);
}

/* =========================================================
   10) LECTEUR
   ========================================================= */

function openJuzReader(juzNum) {
  const juz = JUZ_STARTS.find(j => j.num === juzNum);
  if (!juz) return;
  STATE.currentJuz = juz.num;
  STATE.visitedJuz.add(juz.num);
  STATE.readerOpen = true;
  STATE.readerJuz = juzNum;
  if (!STATE._readMap) STATE._readMap = {};
  const readList = STATE._readMap[juzNum] || [];
  STATE.readerReadSet = new Set(readList);
  saveAll();
  if (EL.readerJuzNum) EL.readerJuzNum.textContent = String(juz.num);
  if (EL.readerJuzName) EL.readerJuzName.textContent = juz.name;
  if (EL.readerProgressBar) EL.readerProgressBar.style.width = "0%";
  if (EL.readerPrev) EL.readerPrev.disabled = juz.num <= 1;
  if (EL.readerNext) EL.readerNext.disabled = juz.num >= 30;
  applyReaderTranslationPref();
  renderReaderToc(juzNum);
  if (STATE.quranLoaded && STATE.ayahs.length > DEMO_AYAHS.length) {
    renderJuzReader(juzNum);
  } else {
    renderReaderLoading();
  }
  updateReaderCounter();
  updateDownloadButton();
  updateSpeedLabel();
  updateRepeatLabel();
  updateAudioBookmarkBtn();
  if (EL.juzReader) {
    EL.juzReader.classList.add("active");
    EL.juzReader.setAttribute("aria-hidden", "false");
  }
  document.body.classList.add("reader-open");
  if (EL.readerContent) EL.readerContent.scrollTop = 0;
  if (EL.readerTop) EL.readerTop.classList.remove("visible");
  if (STATE.readerLastVerse && STATE.readerLastVerse.juz === juzNum) {
    setTimeout(() => scrollToVerse(STATE.readerLastVerse.id), 350);
  }
  closeModals();
  renderJuzGrid();
}

function closeJuzReader() {
  if (STATE.playAllActive) stopPlayAll();
  if (STATE.readerOpen && STATE.readerJuz) {
    if (!STATE._readMap) STATE._readMap = {};
    STATE._readMap[STATE.readerJuz] = [...STATE.readerReadSet];
    saveAll();
  }
  STATE.readerOpen = false;
  STATE.readerJuz = null;
  EL.juzReader?.classList.remove("active");
  EL.juzReader?.setAttribute("aria-hidden", "true");
  document.body.classList.remove("reader-open");
}

function goToPrevJuz() { if (STATE.readerJuz && STATE.readerJuz > 1) openJuzReader(STATE.readerJuz - 1); }
function goToNextJuz() { if (STATE.readerJuz && STATE.readerJuz < 30) openJuzReader(STATE.readerJuz + 1); }

function applyReaderTranslationPref() {
  if (STATE.readerShowTranslation) {
    document.body.classList.remove("reader-hide-translation");
    EL.readerToggle?.setAttribute("aria-pressed", "true");
  } else {
    document.body.classList.add("reader-hide-translation");
    EL.readerToggle?.setAttribute("aria-pressed", "false");
  }
}

function toggleReaderTranslation() {
  STATE.readerShowTranslation = !STATE.readerShowTranslation;
  saveAll();
  applyReaderTranslationPref();
  toast(STATE.readerShowTranslation ? "Traductions affich\u00e9es" : "Traductions masqu\u00e9es", "\u6587");
  buzz(15);
}

function renderReaderLoading() {
  if (!EL.readerContent) return;
  EL.readerContent.textContent = "";
  const l = document.createElement("div");
  l.className = "reader-loading";
  const i = document.createElement("div");
  i.className = "reader-loading-icon";
  i.textContent = "\u25cc";
  const p = document.createElement("p");
  p.textContent = "Chargement du Coran en cours\u2026";
  l.append(i, p);
  EL.readerContent.appendChild(l);
}

function renderReaderError() {
  if (!EL.readerContent) return;
  EL.readerContent.textContent = "";
  const e = document.createElement("div");
  e.className = "reader-empty";
  const i = document.createElement("div");
  i.className = "reader-empty-icon";
  i.textContent = "\u26a0";
  const p = document.createElement("p");
  p.textContent = "Impossible de charger le Coran.";
  e.append(i, p);
  EL.readerContent.appendChild(e);
}

function getJuzAyahs(juzNum) {
  const juz = JUZ_STARTS[juzNum - 1];
  if (!juz || !STATE.ayahs.length) return [];
  const sS = juz.surah, sA = juz.ayah, eS = juz.end.surah, eA = juz.end.ayah;
  return STATE.ayahs.filter(a => {
    const afterStart = a.surahNumber > sS || (a.surahNumber === sS && a.ayahNumber >= sA);
    if (!afterStart) return false;
    const beforeEnd = a.surahNumber < eS || (a.surahNumber === eS && a.ayahNumber <= eA);
    return beforeEnd;
  });
}

function groupBySurah(ayahs) {
  const groups = [];
  let current = null;
  for (const a of ayahs) {
    if (!current || current.surahNumber !== a.surahNumber) {
      current = { surahNumber: a.surahNumber, surah: a.surah, ayahs: [] };
      groups.push(current);
    }
    current.ayahs.push(a);
  }
  return groups;
}

function renderReaderToc(juzNum) {
  if (!EL.readerToc) return;
  EL.readerToc.textContent = "";
  const ayahs = getJuzAyahs(juzNum);
  if (!ayahs.length) return;
  const groups = groupBySurah(ayahs);
  const frag = document.createDocumentFragment();
  groups.forEach(group => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "toc-item";
    btn.dataset.targetSurah = String(group.surahNumber);
    const num = document.createElement("span");
    num.className = "toc-item-num";
    num.textContent = String(group.surahNumber);
    const name = document.createElement("span");
    name.textContent = group.surah;
    btn.append(num, name);
    btn.onclick = () => {
      const target = EL.readerContent?.querySelector(`.reader-surah[data-surah="${group.surahNumber}"]`);
      if (target) {
        EL.readerContent.scrollTo({ top: Math.max(0, target.offsetTop - 20), behavior: "smooth" });
      }
      EL.readerToc.querySelectorAll(".toc-item").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
    };
    frag.appendChild(btn);
  });
  EL.readerToc.appendChild(frag);
}

function updateReaderCounter(totalOverride) {
  if (!EL.readerReadCount || !EL.readerTotalCount) return;
  let total = totalOverride;
  if (!total && STATE.readerJuz) total = getJuzAyahs(STATE.readerJuz).length;
  if (!total) total = 0;
  EL.readerReadCount.textContent = String(STATE.readerReadSet.size);
  EL.readerTotalCount.textContent = String(total);
}

function scrollToVerse(verseId, instant = false) {
  if (!EL.readerContent) return;
  const el = EL.readerContent.querySelector(`.verse[data-id="${verseId}"]`);
  if (!el) return;
  const offset = el.offsetTop - (STATE.playAllActive ? EL.readerContent.clientHeight / 2 : 80);
  EL.readerContent.scrollTo({ top: Math.max(0, offset), behavior: instant ? "auto" : "smooth" });
  if (!STATE.playAllActive) {
    el.classList.add("selected");
    setTimeout(() => el.classList.remove("selected"), 2000);
  }
}

function renderJuzReader(juzNum) {
  if (!EL.readerContent) return;
  EL.readerContent.textContent = "";
  const ayahs = getJuzAyahs(juzNum);
  if (!ayahs.length) {
    const e = document.createElement("div");
    e.className = "reader-empty";
    e.innerHTML = `<div class="reader-empty-icon">\u25cc</div><p>Aucun verset disponible.</p>`;
    EL.readerContent.appendChild(e);
    return;
  }
  const groups = groupBySurah(ayahs);
  const frag = document.createDocumentFragment();
  for (const group of groups) frag.appendChild(renderSurahBlock(group));
  EL.readerContent.appendChild(frag);
  updateReaderCounter(ayahs.length);
}

function renderSurahBlock(group) {
  const surah = document.createElement("div");
  surah.className = "reader-surah";
  surah.dataset.surah = String(group.surahNumber);

  const header = document.createElement("div");
  header.className = "surah-header";

  const top = document.createElement("div");
  top.className = "surah-header-top";
  const l1 = document.createElement("span"); l1.className = "line";
  const n = document.createElement("span"); n.className = "surah-header-num";
  n.textContent = `Sourate ${group.surahNumber}`;
  const l2 = document.createElement("span"); l2.className = "line";
  top.append(l1, n, l2);

  const name = document.createElement("h2");
  name.className = "surah-header-name";
  name.textContent = group.surah;

  const ar = document.createElement("div");
  ar.className = "surah-header-arabic";
  ar.textContent = SURAH_ARABIC[group.surahNumber] || "";
  ar.setAttribute("lang", "ar");
  ar.setAttribute("dir", "rtl");

  header.append(top, name, ar);

  const first = group.ayahs[0].ayahNumber;
  const last = group.ayahs[group.ayahs.length - 1].ayahNumber;
  const totalSurah = STATE.surahTotalAyahs[group.surahNumber] || group.ayahs.length;

  const meta = document.createElement("div");
  meta.className = "surah-header-meta";
  const totalItem = document.createElement("span");
  totalItem.className = "surah-meta-item";
  totalItem.innerHTML = `<span class="surah-meta-icon">\u25cc</span><span>${totalSurah} versets</span>`;
  meta.appendChild(totalItem);
  if (first > 1 || last < totalSurah) {
    const sep = document.createElement("span");
    sep.className = "surah-meta-sep";
    meta.appendChild(sep);
    const rangeItem = document.createElement("span");
    rangeItem.className = "surah-meta-item";
    rangeItem.innerHTML = `<span class="surah-meta-icon">\u2194</span><span>Ici : ${first}\u2013${last}</span>`;
    meta.appendChild(rangeItem);
  }
  header.appendChild(meta);
  surah.appendChild(header);

  if (group.surahNumber !== 1 && group.surahNumber !== 9) {
    const bsm = document.createElement("div");
    bsm.className = "surah-bismillah";
    bsm.textContent = "\u0628\u0650\u0633\u0645\u0650 \u0627\u0644\u0644\u0647\u0650 \u0627\u0644\u0631\u064e\u062d\u0645\u064e\u0670\u0646\u0650 \u0627\u0644\u0631\u064e\u062d\u0650\u064a\u0645\u0650";
    bsm.setAttribute("lang", "ar");
    bsm.setAttribute("dir", "rtl");
    surah.appendChild(bsm);
  }

  const wrap = document.createElement("div");
  wrap.className = "surah-verses";
  for (const a of group.ayahs) wrap.appendChild(renderVerseBlock(a));
  surah.appendChild(wrap);

  return surah;
}

function renderVerseBlock(ayah) {
  const article = document.createElement("article");
  article.className = "verse";
  article.dataset.id = String(ayah.id);
  article.setAttribute("role", "button");
  article.setAttribute("tabindex", "0");
  if (STATE.readerReadSet.has(ayah.id) || STATE.seen.has(ayah.id)) article.classList.add("read");

  const wrap = document.createElement("div");
  wrap.className = "verse-arabic-wrap";
  const ar = document.createElement("div");
  ar.className = "verse-arabic";
  ar.textContent = ayah.arabic;
  ar.setAttribute("lang", "ar");
  ar.setAttribute("dir", "rtl");
  const num = document.createElement("span");
  num.className = "verse-num";
  num.textContent = toArabicNum(ayah.ayahNumber);
  wrap.append(ar, num);

  const trans = document.createElement("p");
  trans.className = "verse-translation";
  trans.textContent = ayah.translation;

  const actions = document.createElement("div");
  actions.className = "verse-actions";

  const audioBtn = document.createElement("button");
  audioBtn.type = "button";
  audioBtn.className = "verse-action";
  audioBtn.innerHTML = `<span class="verse-action-icon">\u25b6</span><span class="verse-action-label">\u00c9couter</span>`;
  audioBtn.onclick = (e) => { e.stopPropagation(); playVerseAudio(ayah, audioBtn); };

  const favBtn = document.createElement("button");
  favBtn.type = "button";
  favBtn.className = "verse-action";
  const isFav = STATE.favorites.some(f => f.id === ayah.id);
  if (isFav) favBtn.classList.add("active");
  favBtn.innerHTML = `<span class="verse-action-icon">${isFav ? "\u2665" : "\u2661"}</span><span class="verse-action-label">Favori</span>`;
  favBtn.onclick = (e) => { e.stopPropagation(); toggleFavoriteFromReader(ayah, favBtn); };

  const copyBtn = document.createElement("button");
  copyBtn.type = "button";
  copyBtn.className = "verse-action";
  copyBtn.innerHTML = `<span class="verse-action-icon">\u29c9</span><span class="verse-action-label">Copier</span>`;
  copyBtn.onclick = (e) => { e.stopPropagation(); copyVerseToClipboard(ayah); };

  actions.append(audioBtn, favBtn, copyBtn);
  article.append(wrap, trans, actions);

  article.addEventListener("click", (e) => {
    if (e.target.closest("button")) return;
    selectVerseFromReader(ayah, article);
  });

  article.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); selectVerseFromReader(ayah, article); }
  });

  return article;
}

function selectVerseFromReader(ayah, article) {
  STATE.current = ayah;
  STATE.readerLastVerse = { id: ayah.id, juz: STATE.readerJuz };
  STATE.readerReadSet.add(ayah.id);
  if (!STATE.seen.has(ayah.id)) { STATE.seen.add(ayah.id); STATE.discovered++; }
  article.classList.add("selected", "read");
  updateReaderCounter();
  saveAll();
  setTimeout(() => {
    render(ayah, false);
    updateProgress();
    closeJuzReader();
    toast("Verset s\u00e9lectionn\u00e9", "\u2726");
    buzz(20);
  }, 250);
}

function playVerseAudio(ayah, btn) {
  if (!EL.ayahAudio) return;
  if (EL.ayahAudio.dataset.verseId === String(ayah.id) && !EL.ayahAudio.paused) {
    EL.ayahAudio.pause();
    btn.querySelector(".verse-action-icon").textContent = "\u25b6";
    btn.classList.remove("active");
    return;
  }
  document.querySelectorAll(".verse-action").forEach(b => {
    const icon = b.querySelector(".verse-action-icon");
    if (icon && icon.textContent === "\u2161") { icon.textContent = "\u25b6"; b.classList.remove("active"); }
  });
  EL.ayahAudio.dataset.verseId = String(ayah.id);
  const r = RECITERS[STATE.reciter] || RECITERS.alafasy;
  const sss = String(ayah.surahNumber).padStart(3, "0");
  const aaa = String(ayah.ayahNumber).padStart(3, "0");
  const urls = [128, 64, 40, 32].map(b => `https://cdn.islamic.network/quran/audio/${b}/${r.edition}/${ayah.id}.mp3`);
  urls.push(`https://everyayah.com/data/${r.everyayah}/${sss}${aaa}.mp3`);
  const token = ++STATE.audioToken;
  tryReaderAudio(urls, 0, token, btn);
}

function tryReaderAudio(urls, i, token, btn) {
  if (token !== STATE.audioToken) return;
  if (i >= urls.length) { toast("Audio indisponible", "!"); btn.querySelector(".verse-action-icon").textContent = "\u25b6"; btn.classList.remove("active"); return; }
  const audio = EL.ayahAudio;
  audio.src = urls[i];
  audio.load();
  audio.playbackRate = checkNightMode();
  const p = audio.play();
  if (p && p.then) {
    p.then(() => {
      if (token !== STATE.audioToken) return;
      btn.querySelector(".verse-action-icon").textContent = "\u2161";
      btn.classList.add("active");
      audio.onended = () => { btn.querySelector(".verse-action-icon").textContent = "\u25b6"; btn.classList.remove("active"); };
    }).catch(() => { if (token === STATE.audioToken) tryReaderAudio(urls, i + 1, token, btn); });
  }
}

function toggleFavoriteFromReader(ayah, btn) {
  const idx = STATE.favorites.findIndex(f => f.id === ayah.id);
  if (idx === -1) {
    STATE.favorites.push({ ...ayah });
    btn.classList.add("active");
    btn.querySelector(".verse-action-icon").textContent = "\u2665";
    toast("Ajout\u00e9 aux favoris", "\u2665");
  } else {
    STATE.favorites.splice(idx, 1);
    btn.classList.remove("active");
    btn.querySelector(".verse-action-icon").textContent = "\u2661";
    toast("Retir\u00e9 des favoris", "\u2661");
  }
  saveAll();
  renderFavorites();
  buzz(20);
}

async function copyVerseToClipboard(ayah) {
  const text = `${ayah.arabic}\n\n"${ayah.translation}"\n\n${ayah.surah} ${ayah.surahNumber}:${ayah.ayahNumber}`;
  try { await navigator.clipboard.writeText(text); toast("Verset copi\u00e9", "\u29c9"); buzz(20); }
  catch { toast("Impossible de copier", "!"); }
}

function updateReaderProgress() {
  if (!EL.readerContent || !EL.readerProgressBar) return;
  const el = EL.readerContent;
  const sTop = el.scrollTop;
  const sH = el.scrollHeight - el.clientHeight;
  if (sH <= 0) { EL.readerProgressBar.style.width = "100%"; return; }
  const pct = Math.min(100, Math.max(0, (sTop / sH) * 100));
  EL.readerProgressBar.style.width = `${pct}%`;
  if (EL.readerTop) EL.readerTop.classList.toggle("visible", sTop > 400);
}

function scrollReaderTop() { EL.readerContent?.scrollTo({ top: 0, behavior: "smooth" }); }

/* =========================================================
   11) LECTURE CONTINUE
   ========================================================= */

function findStartIndex(ayahs) {
  if (STATE.readerLastVerse && STATE.readerLastVerse.juz === STATE.readerJuz) {
    const idx = ayahs.findIndex(a => a.id === STATE.readerLastVerse.id);
    if (idx !== -1) return idx;
  }
  if (EL.readerContent) {
    const verses = EL.readerContent.querySelectorAll(".verse");
    const contentTop = EL.readerContent.scrollTop;
    for (const v of verses) {
      if (v.offsetTop >= contentTop - 100) {
        const vid = Number(v.dataset.id);
        const idx = ayahs.findIndex(a => a.id === vid);
        if (idx !== -1) return idx;
        break;
      }
    }
  }
  return 0;
}

function startPlayAll() {
  if (!STATE.readerJuz) return;
  const ayahs = getJuzAyahs(STATE.readerJuz);
  if (!ayahs.length) { toast("Chargement du Coran en cours\u2026", "\u23f3"); return; }
  const startIndex = STATE.playAllQueue.length > 0 && STATE.playAllIndex >= 0
    ? STATE.playAllIndex : findStartIndex(ayahs);
  STATE.playAllActive = true;
  STATE.playAllQueue = ayahs;
  STATE.playAllJuz = STATE.readerJuz;
  STATE.playAllIndex = startIndex;
  STATE.repeatCurrent = 0;
  EL.readerAudioBar?.classList.add("visible");
  EL.readerAudioBar?.setAttribute("aria-hidden", "false");
  EL.readerPlayAll?.classList.add("playing");
  EL.readerPlayAll?.setAttribute("aria-pressed", "true");
  if (EL.readerPlayIcon) EL.readerPlayIcon.textContent = "\u2161";
  EL.readerCounter?.classList.add("listening");
  applyPlaybackRate();
  updateSpeedLabel();
  updateRepeatLabel();
  updateDownloadButton();
  updateAudioBookmarkBtn();
  startStatsSession();
  playVerseAt(startIndex);
}

function togglePlayAll() {
  if (STATE.playAllActive) { pausePlayAll(); return; }
  if (STATE.playAllQueue.length > 0 && STATE.playAllIndex >= 0) resumePlayAll();
  else startPlayAll();
}

function pausePlayAll() {
  if (EL.ayahAudio && !EL.ayahAudio.paused) EL.ayahAudio.pause();
  EL.readerPlayAll?.classList.remove("playing");
  EL.readerPlayAll?.setAttribute("aria-pressed", "false");
  if (EL.readerPlayIcon) EL.readerPlayIcon.textContent = "\u25b6";
  if (EL.audioPlayIcon) EL.audioPlayIcon.textContent = "\u25b6";
  EL.readerCounter?.classList.remove("listening");
  stopStatsSession();
  buzz(15);
}

function resumePlayAll() {
  if (STATE.playAllIndex < 0 || !STATE.playAllQueue.length) { startPlayAll(); return; }
  EL.readerPlayAll?.classList.add("playing");
  EL.readerPlayAll?.setAttribute("aria-pressed", "true");
  if (EL.readerPlayIcon) EL.readerPlayIcon.textContent = "\u2161";
  EL.readerCounter?.classList.add("listening");
  startStatsSession();
  playVerseAt(STATE.playAllIndex);
}

function stopPlayAll() {
  STATE.playAllActive = false;
  STATE.playAllIndex = -1;
  STATE.playAllQueue = [];
  STATE.playAllJuz = null;
  STATE.repeatCurrent = 0;
  if (EL.ayahAudio) {
    EL.ayahAudio.pause();
    if (EL.ayahAudio._blobUrl) { URL.revokeObjectURL(EL.ayahAudio._blobUrl); EL.ayahAudio._blobUrl = null; }
    EL.ayahAudio.removeAttribute("src");
    EL.ayahAudio.load();
  }
  EL.readerAudioBar?.classList.remove("visible");
  EL.readerAudioBar?.setAttribute("aria-hidden", "true");
  EL.readerPlayAll?.classList.remove("playing");
  EL.readerPlayAll?.setAttribute("aria-pressed", "false");
  if (EL.readerPlayIcon) EL.readerPlayIcon.textContent = "\u25b6";
  EL.readerCounter?.classList.remove("listening");
  highlightNowPlaying(null);
  clearRepeatTarget();
  stopStatsSession();
}

function playVerseAt(index) {
  const queue = STATE.playAllQueue;
  if (!queue.length || index < 0 || index >= queue.length) { stopPlayAll(); return; }
  STATE.playAllIndex = index;
  const ayah = queue[index];
  if (EL.audioCurrentVerse) {
    EL.audioCurrentVerse.textContent = `${ayah.surah} ${ayah.surahNumber}:${ayah.ayahNumber}`;
  }
  if (EL.audioCurrentReciter) {
    const r = RECITERS[STATE.reciter] || RECITERS.alafasy;
    const repText = STATE.repeatCount > 1
      ? ` \u00b7 r\u00e9p. ${STATE.repeatCurrent + 1}/${STATE.repeatCount === Infinity ? "\u221e" : STATE.repeatCount}`
      : "";
    EL.audioCurrentReciter.textContent = `${r.name.split(" ").pop()}${repText}`;
  }
  if (EL.audioPlayIcon) EL.audioPlayIcon.textContent = "\u2161";
  updateReaderCounter();
  updateAudioBookmarkBtn();
  if (STATE.scrollAuto) { highlightNowPlaying(ayah.id); scrollToVerse(ayah.id, true); }
  if (STATE.repeatCount > 1) markRepeatTarget(ayah.id);
  playAyahAudioForQueue(ayah);
}

async function playAyahAudioForQueue(ayah) {
  if (!EL.ayahAudio) return;
  const cached = await AudioCache.get(ayah.id);
  if (cached && cached.blob) { playFromBlob(cached.blob); return; }
  const r = RECITERS[STATE.reciter] || RECITERS.alafasy;
  const sss = String(ayah.surahNumber).padStart(3, "0");
  const aaa = String(ayah.ayahNumber).padStart(3, "0");
  const urls = [128, 64, 40, 32].map(b => `https://cdn.islamic.network/quran/audio/${b}/${r.edition}/${ayah.id}.mp3`);
  urls.push(`https://everyayah.com/data/${r.everyayah}/${sss}${aaa}.mp3`);
  const token = ++STATE.audioToken;
  tryQueueAudio(urls, 0, token);
}

function playFromBlob(blob) {
  const url = URL.createObjectURL(blob);
  const audio = EL.ayahAudio;
  if (audio._blobUrl) URL.revokeObjectURL(audio._blobUrl);
  audio._blobUrl = url;
  audio.src = url;
  audio.playbackRate = checkNightMode();
  const p = audio.play();
  if (p && p.catch) p.catch(() => {
    const ayah = STATE.playAllQueue[STATE.playAllIndex];
    if (ayah) {
      const r = RECITERS[STATE.reciter] || RECITERS.alafasy;
      audio.src = `https://cdn.islamic.network/quran/audio/128/${r.edition}/${ayah.id}.mp3`;
      audio.load();
      audio.play().catch(() => {});
    }
  });
}

function tryQueueAudio(urls, i, token) {
  if (token !== STATE.audioToken) return;
  if (!STATE.playAllActive) return;
  if (i >= urls.length) { setTimeout(() => playNextInQueue(), 200); return; }
  const audio = EL.ayahAudio;
  audio.src = urls[i];
  audio.load();
  audio.playbackRate = checkNightMode();
  const p = audio.play();
  if (p && p.then) {
    p.then(() => {}).catch(() => {
      if (token === STATE.audioToken && STATE.playAllActive) tryQueueAudio(urls, i + 1, token);
    });
  }
}

function playNextInQueue() {
  if (!STATE.playAllActive) return;
  const next = STATE.playAllIndex + 1;
  if (next >= STATE.playAllQueue.length) {
    if (STATE.autoNextJuz && STATE.playAllJuz < 30) {
      const nJ = STATE.playAllJuz + 1;
      toast(`Juz ${STATE.playAllJuz} termin\u00e9 \u2192 Juz ${nJ}`, "\u25b6|");
      setTimeout(() => {
        const wasActive = STATE.playAllActive;
        stopPlayAll();
        openJuzReader(nJ);
        if (wasActive) setTimeout(() => startPlayAll(), 500);
      }, 800);
      return;
    }
    toast("Juz termin\u00e9 \u2726", "\u2713");
    stopPlayAll();
    return;
  }
  playVerseAt(next);
}

function playPrevInQueue() {
  if (!STATE.playAllActive) return;
  const prev = STATE.playAllIndex - 1;
  playVerseAt(prev < 0 ? 0 : prev);
}

function highlightNowPlaying(ayahId) {
  if (!EL.readerContent) return;
  EL.readerContent.querySelectorAll(".verse.now-playing").forEach(el => el.classList.remove("now-playing"));
  if (ayahId != null) {
    const el = EL.readerContent.querySelector(`.verse[data-id="${ayahId}"]`);
    if (el) el.classList.add("now-playing");
  }
}

function markRepeatTarget(ayahId) {
  if (!EL.readerContent) return;
  EL.readerContent.querySelectorAll(".verse.repeat-target").forEach(el => el.classList.remove("repeat-target"));
  const el = EL.readerContent.querySelector(`.verse[data-id="${ayahId}"]`);
  if (el) el.classList.add("repeat-target");
}

function clearRepeatTarget() {
  if (!EL.readerContent) return;
  EL.readerContent.querySelectorAll(".verse.repeat-target").forEach(el => el.classList.remove("repeat-target"));
}

function showRepeatToast(n) {
  const ex = document.querySelector(".repeat-toast");
  if (ex) ex.remove();
  const el = document.createElement("div");
  el.className = "repeat-toast";
  el.textContent = STATE.repeatCount === Infinity ? "\u221e" : `\u00d7${n}`;
  EL.readerContent?.appendChild(el);
  requestAnimationFrame(() => el.classList.add("show"));
  setTimeout(() => el.remove(), 900);
}

/* =========================================================
   12) OPTIONS LECTURE
   ========================================================= */

const SPEED_OPTIONS = [0.75, 1, 1.25, 1.5, 2];
const REPEAT_OPTIONS = [1, 2, 3, Infinity];

function cycleSpeed() {
  const idx = SPEED_OPTIONS.indexOf(STATE.playbackRate);
  const next = SPEED_OPTIONS[(idx + 1) % SPEED_OPTIONS.length];
  STATE.playbackRate = next;
  saveAll();
  updateSpeedLabel();
  applyPlaybackRate();
  toast(`Vitesse : ${next}\u00d7`, "\u26a1");
  buzz(15);
}

function updateSpeedLabel() {
  if (!EL.audioSpeedLabel) return;
  const r = STATE.playbackRate;
  EL.audioSpeedLabel.textContent = r === 1 ? "1\u00d7" : `${r}\u00d7`;
  EL.audioSpeed?.classList.toggle("active", r !== 1);
}

function applyPlaybackRate() { if (EL.ayahAudio) EL.ayahAudio.playbackRate = checkNightMode(); }

function cycleRepeat() {
  const idx = REPEAT_OPTIONS.indexOf(STATE.repeatCount);
  const next = REPEAT_OPTIONS[(idx + 1) % REPEAT_OPTIONS.length];
  STATE.repeatCount = next;
  STATE.repeatCurrent = 0;
  saveAll();
  updateRepeatLabel();
  const label = next === Infinity ? "\u221e" : `\u00d7${next}`;
  toast(`R\u00e9p\u00e9tition : ${label}`, "\u21bb");
  buzz(15);
}

function updateRepeatLabel() {
  if (!EL.audioRepeatLabel) return;
  const r = STATE.repeatCount;
  EL.audioRepeatLabel.textContent = r === Infinity ? "\u221e" : `\u00d7${r}`;
  EL.audioRepeat?.classList.toggle("active", r !== 1);
}

function checkNightMode() {
  if (!STATE.nightMode) return STATE.playbackRate;
  const h = new Date().getHours();
  if (h >= 22 || h < 6) { if (STATE.playbackRate > 0.75) return 0.75; }
  return STATE.playbackRate;
}

/* =========================================================
   13) TELECHARGEMENT
   ========================================================= */

async function downloadCurrentJuz() {
  if (STATE.downloading) { toast("T\u00e9l\u00e9chargement en cours", "\u23f3"); return; }
  if (!STATE.readerJuz) return;
  const juzNum = STATE.readerJuz;
  if (STATE.downloadedJuz.has(juzNum)) {
    if (confirm(`Juz ${juzNum} d\u00e9j\u00e0 t\u00e9l\u00e9charg\u00e9. Supprimer ?`)) {
      await AudioCache.clearJuz(juzNum);
      STATE.downloadedJuz.delete(juzNum);
      saveAll();
      updateDownloadButton();
      renderJuzGrid();
      toast("T\u00e9l\u00e9chargement supprim\u00e9", "\u2715");
    }
    return;
  }
  const ayahs = getJuzAyahs(juzNum);
  if (!ayahs.length) { toast("Coran non charg\u00e9", "!"); return; }
  STATE.downloading = true;
  EL.readerPlayAll?.classList.add("downloading");
  EL.readerDownloadPanel?.classList.add("visible");
  EL.readerDownloadPanel?.setAttribute("aria-hidden", "false");
  const r = RECITERS[STATE.reciter] || RECITERS.alafasy;
  let success = 0, failed = 0;
  for (let i = 0; i < ayahs.length; i++) {
    const ayah = ayahs[i];
    updateDownloadProgress(`T\u00e9l\u00e9chargement : ${ayah.surah} ${ayah.ayahNumber}`, Math.round((i / ayahs.length) * 100));
    try {
      const url = `https://cdn.islamic.network/quran/audio/128/${r.edition}/${ayah.id}.mp3`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const blob = await res.blob();
      await AudioCache.set(ayah.id, { juz: juzNum, surahNumber: ayah.surahNumber, ayahNumber: ayah.ayahNumber, edition: r.edition, blob });
      success++;
    } catch { failed++; }
    updateDownloadProgress(`T\u00e9l\u00e9chargement : ${ayah.surah} ${ayah.ayahNumber}`, Math.round(((i + 1) / ayahs.length) * 100));
  }
  STATE.downloading = false;
  EL.readerPlayAll?.classList.remove("downloading");
  if (failed === 0) {
    STATE.downloadedJuz.add(juzNum);
    saveAll();
    updateDownloadButton();
    renderJuzGrid();
    toast(`Juz ${juzNum} t\u00e9l\u00e9charg\u00e9 \u2713 (${success} versets)`, "\u2193");
  } else {
    toast(`T\u00e9l\u00e9charg\u00e9 : ${success} \u2713 / ${failed} \u2717`, "\u26a0");
  }
  setTimeout(() => {
    EL.readerDownloadPanel?.classList.remove("visible");
    EL.readerDownloadPanel?.setAttribute("aria-hidden", "true");
  }, 2200);
}

function updateDownloadProgress(text, percent) {
  if (EL.readerDownloadText) EL.readerDownloadText.textContent = text;
  if (EL.readerDownloadPercent) EL.readerDownloadPercent.textContent = `${percent}%`;
  if (EL.readerDownloadBar) EL.readerDownloadBar.style.width = `${percent}%`;
}

function updateDownloadButton() {
  if (!EL.audioDownload) return;
  const juz = STATE.readerJuz;
  if (!juz) return;
  const d = STATE.downloadedJuz.has(juz);
  EL.audioDownload.classList.toggle("downloaded", d);
  if (EL.audioDownloadIcon) EL.audioDownloadIcon.textContent = d ? "\u2713" : "\u2193";
  EL.audioDownload.setAttribute("aria-label", d ? "Supprimer le t\u00e9l\u00e9chargement" : "T\u00e9l\u00e9charger le juz");
}

/* =========================================================
   14) MARQUE-PAGE AUDIO
   ========================================================= */

function saveResumeState() {
  if (!STATE.audioBookmarkAuto) return;
  if (!STATE.playAllActive || STATE.playAllIndex < 0) return;
  const ayah = STATE.playAllQueue[STATE.playAllIndex];
  if (!ayah) return;
  store(KEYS.resumeState, {
    juz: STATE.playAllJuz, ayahId: ayah.id, ayahNumber: ayah.ayahNumber,
    surahNumber: ayah.surahNumber, surah: ayah.surah, index: STATE.playAllIndex,
    timestamp: Date.now()
  });
}

function loadResumeState() { return load(KEYS.resumeState, null); }

function updateResumeBadge() {
  if (!EL.resumeBadge || !EL.resumeBadgeInfo) return;
  const st = loadResumeState();
  if (!st || !st.juz) { EL.resumeBadge.classList.remove("visible"); EL.resumeBadge.setAttribute("aria-hidden", "true"); return; }
  if (Date.now() - st.timestamp > 7 * 24 * 60 * 60 * 1000) { EL.resumeBadge.classList.remove("visible"); return; }
  EL.resumeBadgeInfo.textContent = `Juz ${st.juz} \u00b7 ${st.surah} ${st.ayahNumber}`;
  EL.resumeBadge.classList.add("visible");
  EL.resumeBadge.setAttribute("aria-hidden", "false");
}

async function resumeFromBadge() {
  const st = loadResumeState();
  if (!st || !st.juz) return;
  openJuzReader(st.juz);
  setTimeout(() => {
    const ayahs = getJuzAyahs(st.juz);
    const idx = ayahs.findIndex(a => a.id === st.ayahId);
    if (idx !== -1) {
      STATE.playAllIndex = idx;
      scrollToVerse(st.ayahId, true);
      setTimeout(() => {
        STATE.playAllActive = true;
        STATE.playAllQueue = ayahs;
        STATE.playAllJuz = st.juz;
        startPlayAll();
      }, 400);
    }
  }, 500);
}

/* =========================================================
   15) STATISTIQUES
   ========================================================= */

let statsTimer = null;
let statsSessionStart = null;

function startStatsSession() {
  if (statsSessionStart) return;
  statsSessionStart = Date.now();
  updateStreak();
  statsTimer = setInterval(() => { STATE.stats.totalSeconds = (STATE.stats.totalSeconds || 0) + 1; }, 1000);
}

function stopStatsSession() {
  if (statsTimer) { clearInterval(statsTimer); statsTimer = null; }
  statsSessionStart = null;
  saveAll();
}

function onVerseListened() {
  STATE.stats.versesListened = (STATE.stats.versesListened || 0) + 1;
  saveAll();
}

function updateStreak() {
  const today = new Date().toDateString();
  const last = STATE.stats.lastListenDate;
  if (last === today) return;
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  if (last === yesterday) STATE.stats.currentStreak = (STATE.stats.currentStreak || 0) + 1;
  else STATE.stats.currentStreak = 1;
  STATE.stats.longestStreak = Math.max(STATE.stats.longestStreak || 0, STATE.stats.currentStreak);
  STATE.stats.lastListenDate = today;
  saveAll();
}

function formatDuration(seconds) {
  if (!seconds || seconds < 60) return `${seconds || 0} s`;
  const m = Math.floor(seconds / 60);
  if (m < 60) return `${m} min`;
  const h = Math.floor(m / 60);
  const rem = m % 60;
  return `${h} h ${rem} min`;
}

function renderStats() {
  if (!EL.statsTotalTime) return;
  EL.statsTotalTime.textContent = formatDuration(STATE.stats.totalSeconds || 0);
  EL.statsVersesListened.textContent = (STATE.stats.versesListened || 0).toLocaleString("fr-FR");
  EL.statsJuzCompleted.textContent = STATE.visitedJuz.size;
  EL.statsBookmarks.textContent = STATE.bookmarks.length;
  EL.statsFavorites.textContent = STATE.favorites.length;
  const s = STATE.stats.currentStreak || 0;
  EL.statsStreak.textContent = `${s} jour${s > 1 ? "s" : ""}`;
}

function resetStats() {
  if (!confirm("R\u00e9initialiser toutes les statistiques ?")) return;
  STATE.stats = { totalSeconds: 0, versesListened: 0, lastListenDate: null, currentStreak: 0, longestStreak: 0 };
  saveAll();
  renderStats();
  toast("Statistiques r\u00e9initialis\u00e9es", "\u21bb");
}

function openStatsModal() { renderStats(); openModal(EL.statsModal); }

/* =========================================================
   16) PARTAGE / DEEP LINKS
   ========================================================= */

function buildShareLink(juzNum, ayah) {
  const base = window.location.origin + window.location.pathname;
  const params = new URLSearchParams();
  if (juzNum) params.set("juz", juzNum);
  if (ayah) { params.set("s", ayah.surahNumber); params.set("a", ayah.ayahNumber); }
  return `${base}?${params.toString()}`;
}

async function sharePosition(juzNum, ayah) {
  const url = buildShareLink(juzNum, ayah);
  const text = ayah ? `\u25a4 ${ayah.surah} ${ayah.surahNumber}:${ayah.ayahNumber}\n\n` : `\u25a4 Juz ${juzNum}\n\n`;
  try {
    if (navigator.share) { await navigator.share({ title: "AYAH", text, url }); toast("Position partag\u00e9e", "\u2197"); }
    else { await navigator.clipboard.writeText(`${text}${url}`); toast("Lien copi\u00e9", "\u2713"); }
  } catch (e) { if (e?.name !== "AbortError") toast("Partage annul\u00e9", "!"); }
}

function handleDeepLink() {
  const params = new URLSearchParams(window.location.search);
  const juz = Number(params.get("juz"));
  const s = Number(params.get("s"));
  const a = Number(params.get("a"));
  if (!juz && !s && !a) return;
  const tryOpen = () => {
    if (!STATE.quranLoaded) { setTimeout(tryOpen, 500); return; }
    if (juz >= 1 && juz <= 30) {
      openJuzReader(juz);
      if (s && a) setTimeout(() => {
        const ayah = STATE.ayahs.find(x => x.surahNumber === s && x.ayahNumber === a);
        if (ayah) { STATE.current = ayah; scrollToVerse(ayah.id, true); toast(`Verset ${s}:${a}`, "\u2726"); }
      }, 600);
    } else if (s && a) {
      const ayah = STATE.ayahs.find(x => x.surahNumber === s && x.ayahNumber === a);
      if (ayah) { STATE.current = ayah; render(ayah, false); toast(`Verset ${s}:${a}`, "\u2726"); }
    }
    window.history.replaceState({}, "", window.location.pathname);
  };
  tryOpen();
}

/* =========================================================
   17) SELECTION / AUDIO / THEME
   ========================================================= */

function pickAyah() {
  const pool = STATE.ayahs.length ? STATE.ayahs : DEMO_AYAHS;
  if (!pool.length) return null;
  if (pool === DEMO_AYAHS || STATE.ayahs.length === 0) {
    const idx = pool.findIndex(a => a.id === STATE.current?.id);
    return pool[(idx + 1) % pool.length];
  }
  const unseen = pool.filter(a => !STATE.seen.has(a.id));
  const list = unseen.length ? unseen : pool;
  const filtered = list.length > 1 && STATE.current ? list.filter(a => a.id !== STATE.current.id) : list;
  return filtered[Math.floor(Math.random() * filtered.length)];
}

function nextAyah() {
  if (STATE.isChanging) return;
  if (STATE.audioPlaying && EL.ayahAudio) { EL.ayahAudio.pause(); setAudioState(false); }
  STATE.isChanging = true;
  const ayah = pickAyah();
  if (!ayah) { STATE.isChanging = false; return; }
  EL.ayahCard?.classList.add("changing");
  buzz(10);
  setTimeout(() => {
    STATE.current = ayah;
    if (!STATE.seen.has(ayah.id)) { STATE.seen.add(ayah.id); STATE.discovered++; }
    render(ayah, true);
    updateProgress();
    EL.ayahCard?.classList.remove("changing");
    STATE.isChanging = false;
  }, 240);
}

function audioUrls(ayah) {
  const r = RECITERS[STATE.reciter] || RECITERS.alafasy;
  const sss = String(ayah.surahNumber).padStart(3, "0");
  const aaa = String(ayah.ayahNumber).padStart(3, "0");
  const urls = [128, 64, 40, 32].map(b => `https://cdn.islamic.network/quran/audio/${b}/${r.edition}/${ayah.id}.mp3`);
  urls.push(`https://everyayah.com/data/${r.everyayah}/${sss}${aaa}.mp3`);
  return urls;
}

function setAudioState(playing) {
  STATE.audioPlaying = playing;
  EL.audioButton?.classList.toggle("playing", playing);
  EL.audioButton?.setAttribute("aria-pressed", String(playing));
  const icon = EL.audioButton?.querySelector(".action-icon");
  const label = EL.audioButton?.querySelector(".action-label");
  if (icon) icon.textContent = playing ? "\u2161" : "\u25b6";
  if (label) label.textContent = playing ? "Pause" : "\u00c9couter";
}

function toggleAudio() {
  if (!STATE.current || !EL.ayahAudio) return;
  const audio = EL.ayahAudio;
  if (!audio.paused) { audio.pause(); setAudioState(false); return; }
  const urls = audioUrls(STATE.current);
  const token = ++STATE.audioToken;
  tryAudio(urls, 0, token);
}

function tryAudio(urls, i, token) {
  if (token !== STATE.audioToken) return;
  if (i >= urls.length) { toast("Audio indisponible", "!"); setAudioState(false); return; }
  const audio = EL.ayahAudio;
  audio.src = urls[i];
  audio.load();
  audio.playbackRate = checkNightMode();
  const p = audio.play();
  if (p && p.then) {
    p.then(() => {
      if (token !== STATE.audioToken) return;
      setAudioState(true);
      toast("Lecture en cours", "\u266a");
    }).catch(() => { if (token === STATE.audioToken) tryAudio(urls, i + 1, token); });
  }
}

function onAudioEnded() {
  if (STATE.playAllActive) {
    onVerseListened();
    saveResumeState();
    STATE.repeatCurrent++;
    if (STATE.repeatCurrent < STATE.repeatCount) {
      showRepeatToast(STATE.repeatCurrent + 1);
      setTimeout(() => playVerseAt(STATE.playAllIndex), 400);
      return;
    }
    STATE.repeatCurrent = 0;
    clearRepeatTarget();
    setTimeout(() => playNextInQueue(), 300);
    return;
  }
  setAudioState(false);
  if (STATE.autoPlay) setTimeout(() => { nextAyah(); setTimeout(toggleAudio, 500); }, 600);
}

function setReciter(key) {
  if (!RECITERS[key]) return;
  STATE.reciter = key;
  saveAll();
  if (STATE.audioPlaying && EL.ayahAudio) { EL.ayahAudio.pause(); setAudioState(false); }
  if (EL.audioCurrentReciter) EL.audioCurrentReciter.textContent = RECITERS[key].name.split(" ").pop();
  toast(`R\u00e9citateur : ${RECITERS[key].name}`, "\u266a");
  buzz(20);
}

async function shareAyah() {
  if (!STATE.current) return;
  const a = STATE.current;
  const key = `${a.surahNumber}:${a.ayahNumber}`;
  const reminder = SPECIFIC_REMINDERS[key] || "";
  let text = `${a.arabic}\n\n"${a.translation}"\n\n${a.surah} ${a.surahNumber}:${a.ayahNumber}`;
  if (reminder) text += `\n\n\u2726 ${reminder}`;
  text += `\n\n\u2014 AYAH`;
  try {
    if (navigator.share) { await navigator.share({ title: "AYAH", text }); toast("Verset partag\u00e9", "\u2197"); }
    else { await navigator.clipboard.writeText(text); toast("Verset copi\u00e9", "\u2713"); }
  } catch (e) { if (e?.name !== "AbortError") toast("Partage annul\u00e9", "!"); }
}

function setTheme(choice) {
  let actual = choice;
  if (choice === "auto") { const h = new Date().getHours(); actual = (h >= 7 && h < 19) ? "light" : "dark"; }
  document.documentElement.dataset.theme = actual;
  store(KEYS.theme, choice);
  if (EL.themeButton) EL.themeButton.textContent = actual === "dark" ? "\u263e" : "\u2600";
  document.querySelectorAll('meta[name="theme-color"]').forEach(meta => {
    const media = meta.getAttribute("media");
    if (media === "(prefers-color-scheme: dark)" && actual === "dark") meta.setAttribute("content", "#050807");
    else if (media === "(prefers-color-scheme: light)" && actual === "light") meta.setAttribute("content", "#f7f4ee");
  });
  toast(choice === "auto" ? "Th\u00e8me auto" : (actual === "dark" ? "Mode sombre" : "Mode clair"), actual === "dark" ? "\u263e" : "\u2600");
}

function toggleTheme() {
  const cur = document.documentElement.dataset.theme || "dark";
  setTheme(cur === "dark" ? "light" : "dark");
}

function applySavedTheme() {
  const saved = load(KEYS.theme, "dark");
  let actual = saved;
  if (saved === "auto") { const h = new Date().getHours(); actual = (h >= 7 && h < 19) ? "light" : "dark"; }
  document.documentElement.dataset.theme = actual;
  if (EL.themeButton) EL.themeButton.textContent = actual === "dark" ? "\u263e" : "\u2600";
}

/* =========================================================
   18) MENU / MODALES / PARAMETRES
   ========================================================= */

function openMenu() {
  EL.sideMenu?.classList.add("open");
  EL.sideMenu?.setAttribute("aria-hidden", "false");
  EL.menuOverlay?.classList.add("visible");
  EL.menuOverlay?.setAttribute("aria-hidden", "false");
  EL.menuButton?.setAttribute("aria-expanded", "true");
}

function closeMenu() {
  EL.sideMenu?.classList.remove("open");
  EL.sideMenu?.setAttribute("aria-hidden", "true");
  EL.menuOverlay?.classList.remove("visible");
  EL.menuOverlay?.setAttribute("aria-hidden", "true");
  EL.menuButton?.setAttribute("aria-expanded", "false");
}

function openModal(m) { if (!m) return; m.classList.add("visible"); m.setAttribute("aria-hidden", "false"); }

function closeModals() {
  document.querySelectorAll(".modal").forEach(m => { m.classList.remove("visible"); m.setAttribute("aria-hidden", "true"); });
}

function renderReciterOptions() {
  if (!EL.reciterOptions) return;
  EL.reciterOptions.textContent = "";
  const frag = document.createDocumentFragment();
  Object.entries(RECITERS).forEach(([key, rec]) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "setting-option" + (key === STATE.reciter ? " active" : "");
    btn.dataset.reciter = key;
    btn.setAttribute("role", "radio");
    btn.setAttribute("aria-checked", String(key === STATE.reciter));
    const icon = document.createElement("span");
    icon.className = "option-icon";
    icon.textContent = "\u266a";
    const label = document.createElement("span");
    label.className = "option-label";
    label.textContent = rec.name.split(" ").pop();
    btn.append(icon, label);
    frag.appendChild(btn);
  });
  EL.reciterOptions.appendChild(frag);
}

function renderThemeOptions() {
  if (!EL.themeOptions) return;
  const c = load(KEYS.theme, "dark");
  EL.themeOptions.querySelectorAll("[data-theme-choice]").forEach(btn => {
    const a = btn.dataset.themeChoice === c;
    btn.classList.toggle("active", a);
    btn.setAttribute("aria-checked", String(a));
  });
}

function renderFontOptions() {
  if (!EL.fontOptions) return;
  EL.fontOptions.querySelectorAll("[data-font]").forEach(btn => {
    const a = btn.dataset.font === STATE.font;
    btn.classList.toggle("active", a);
    btn.setAttribute("aria-checked", String(a));
  });
}

function applyFont() { document.body.dataset.font = STATE.font; }

function syncToggles() {
  if (EL.autoPlayToggle) EL.autoPlayToggle.checked = STATE.autoPlay;
  if (EL.vibrateToggle) EL.vibrateToggle.checked = STATE.vibrate;
  if (EL.autoNextJuzToggle) EL.autoNextJuzToggle.checked = STATE.autoNextJuz;
  if (EL.scrollAutoToggle) EL.scrollAutoToggle.checked = STATE.scrollAuto;
  if (EL.audioBookmarkAutoToggle) EL.audioBookmarkAutoToggle.checked = STATE.audioBookmarkAuto;
  if (EL.nightModeToggle) EL.nightModeToggle.checked = STATE.nightMode;
}

function openSettings() {
  renderReciterOptions();
  renderThemeOptions();
  renderFontOptions();
  syncToggles();
  openModal(EL.settingsModal);
}

function resetProgress() {
  if (!confirm("R\u00e9initialiser toute votre progression ?")) return;
  STATE.discovered = 0;
  STATE.seen.clear();
  STATE.favorites = [];
  STATE.bookmarks = [];
  STATE.visitedJuz.clear();
  STATE.currentJuz = null;
  STATE.readerLastVerse = null;
  STATE.readerReadSet.clear();
  STATE._readMap = {};
  saveAll();
  updateProgress();
  renderFavorites();
  renderBookmarks();
  renderJuzGrid();
  updateFavoriteButton();
  updateBookmarkButton();
  toast("Progression r\u00e9initialis\u00e9e", "\u21bb");
}

/* =========================================================
   19) EVENEMENTS
   ========================================================= */

function bindEvents() {
  const stop = (fn) => (e) => { e.stopPropagation(); fn(); };

  EL.discoverButton?.addEventListener("click", stop(nextAyah));
  EL.favoriteButton?.addEventListener("click", stop(toggleFavorite));
  EL.bookmarkButton?.addEventListener("click", stop(toggleBookmark));
  EL.audioButton?.addEventListener("click", stop(toggleAudio));
  EL.shareButton?.addEventListener("click", stop(shareAyah));
  EL.menuButton?.addEventListener("click", stop(openMenu));
  EL.themeButton?.addEventListener("click", stop(toggleTheme));
  EL.closeMenu?.addEventListener("click", closeMenu);
  EL.menuOverlay?.addEventListener("click", closeMenu);

  EL.ayahCard?.addEventListener("click", (e) => { if (!e.target.closest("button")) nextAyah(); });

  document.querySelectorAll(".menu-option").forEach(btn => {
    btn.addEventListener("click", () => { const page = btn.dataset.menu; closeMenu(); handleNavigation(page); });
  });

  document.querySelectorAll(".nav-item").forEach(btn => {
    btn.addEventListener("click", () => handleNavigation(btn.dataset.page));
  });

  document.querySelectorAll("[data-close-modal]").forEach(btn => btn.addEventListener("click", closeModals));
  [EL.favoritesModal, EL.bookmarksModal, EL.progressModal, EL.settingsModal, EL.juzModal, EL.statsModal].forEach(m => {
    m?.addEventListener("click", (e) => { if (e.target === m) closeModals(); });
  });

  document.addEventListener("click", (e) => {
    const r = e.target.closest("[data-reciter]");
    if (r) { setReciter(r.dataset.reciter); renderReciterOptions(); return; }
    const t = e.target.closest("[data-theme-choice]");
    if (t) { setTheme(t.dataset.themeChoice); renderThemeOptions(); return; }
    const f = e.target.closest("[data-font]");
    if (f) { STATE.font = f.dataset.font; saveAll(); applyFont(); renderFontOptions(); buzz(15); return; }
  });

  EL.autoPlayToggle?.addEventListener("change", (e) => { STATE.autoPlay = e.target.checked; saveAll(); toast(STATE.autoPlay ? "Lecture auto activ\u00e9e" : "Lecture auto d\u00e9sactiv\u00e9e", "\u21bb"); });
  EL.vibrateToggle?.addEventListener("change", (e) => { STATE.vibrate = e.target.checked; saveAll(); toast(STATE.vibrate ? "Vibration activ\u00e9e" : "Vibration d\u00e9sactiv\u00e9e", "\u25c9"); buzz(20); });
  EL.autoNextJuzToggle?.addEventListener("change", (e) => { STATE.autoNextJuz = e.target.checked; saveAll(); toast(STATE.autoNextJuz ? "Encha\u00eenement auto activ\u00e9" : "Encha\u00eenement auto d\u00e9sactiv\u00e9", "\u25b6|"); });
  EL.scrollAutoToggle?.addEventListener("change", (e) => { STATE.scrollAuto = e.target.checked; saveAll(); toast(STATE.scrollAuto ? "D\u00e9filement auto activ\u00e9" : "D\u00e9filement auto d\u00e9sactiv\u00e9", "\u25a4"); });
  EL.audioBookmarkAutoToggle?.addEventListener("change", (e) => { STATE.audioBookmarkAuto = e.target.checked; saveAll(); toast(STATE.audioBookmarkAuto ? "Marque-page auto activ\u00e9" : "Marque-page auto d\u00e9sactiv\u00e9", "\u2756"); });
  EL.nightModeToggle?.addEventListener("change", (e) => { STATE.nightMode = e.target.checked; saveAll(); toast(STATE.nightMode ? "Mode nuit activ\u00e9" : "Mode nuit d\u00e9sactiv\u00e9", "\u263e"); applyPlaybackRate(); });

  EL.resetButton?.addEventListener("click", () => { closeModals(); resetProgress(); });
  EL.ayahAudio?.addEventListener("ended", onAudioEnded);

  EL.readerBack?.addEventListener("click", () => { closeJuzReader(); buzz(15); });
  EL.readerPrev?.addEventListener("click", goToPrevJuz);
  EL.readerNext?.addEventListener("click", goToNextJuz);
  EL.readerToggle?.addEventListener("click", toggleReaderTranslation);
  EL.readerTop?.addEventListener("click", scrollReaderTop);
  EL.readerContent?.addEventListener("scroll", updateReaderProgress, { passive: true });

  EL.readerPlayAll?.addEventListener("click", togglePlayAll);
  EL.audioPlayPause?.addEventListener("click", togglePlayAll);
  EL.audioPrevVerse?.addEventListener("click", playPrevInQueue);
  EL.audioNextVerse?.addEventListener("click", playNextInQueue);
  EL.audioClose?.addEventListener("click", stopPlayAll);

  EL.audioSpeed?.addEventListener("click", cycleSpeed);
  EL.audioRepeat?.addEventListener("click", cycleRepeat);
  EL.audioDownload?.addEventListener("click", downloadCurrentJuz);

  EL.audioBookmark?.addEventListener("click", (e) => { e.stopPropagation(); if (STATE.current) toggleBookmark(); });
  EL.resumeBadge?.addEventListener("click", resumeFromBadge);
  EL.statsResetBtn?.addEventListener("click", resetStats);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (STATE.playAllActive) { stopPlayAll(); return; }
      if (STATE.readerOpen) { closeJuzReader(); return; }
      closeMenu(); closeModals(); return;
    }
    if (STATE.readerOpen) {
      const inInput = e.target.closest("input, textarea, select");
      if (!inInput) {
        if (e.key === "ArrowLeft") { goToPrevJuz(); return; }
        if (e.key === "ArrowRight") { goToNextJuz(); return; }
        if (e.code === "Space") { e.preventDefault(); togglePlayAll(); return; }
        if (e.key === "+" || e.key === "=") { cycleSpeed(); return; }
        if (e.key === "r" || e.key === "R") { cycleRepeat(); return; }
        if (e.key === "s" || e.key === "S") { downloadCurrentJuz(); return; }
      }
      return;
    }
    const tag = document.activeElement?.tagName;
    const inField = tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT";
    const onButton = tag === "BUTTON";
    if ((e.code === "Space" || e.code === "Enter") && !inField && !onButton && !e.repeat) {
      e.preventDefault(); nextAyah();
    }
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden && STATE.audioPlaying && EL.ayahAudio) { EL.ayahAudio.pause(); setAudioState(false); }
  });
}

function handleNavigation(page) {
  document.querySelectorAll(".nav-item").forEach(item => {
    const active = item.dataset.page === page;
    item.classList.toggle("active", active);
    if (active) item.setAttribute("aria-current", "page");
    else item.removeAttribute("aria-current");
  });
  switch (page) {
    case "home": closeModals(); window.scrollTo({ top: 0, behavior: "smooth" }); break;
    case "juz": openJuzModal(); break;
    case "favorites": renderFavorites(); openModal(EL.favoritesModal); break;
    case "bookmarks": renderBookmarks(); openModal(EL.bookmarksModal); break;
    case "progress": openStatsModal(); break;
    case "settings": openSettings(); break;
    case "language": toast("Fran\u00e7ais s\u00e9lectionn\u00e9", "\u6587"); break;
  }
}

/* =========================================================
   20) CHARGEMENT CORAN
   ========================================================= */

function loadQuran() {
  const cached = load(KEYS.cache, null);
  if (cached && Array.isArray(cached) && cached.length > 0) {
    STATE.ayahs = cached;
    STATE.quranLoaded = true;
    buildSurahMetadata();
    updateProgress();
    if (STATE.readerOpen && STATE.readerJuz) {
      renderReaderToc(STATE.readerJuz);
      renderJuzReader(STATE.readerJuz);
    }
    return;
  }
  const AR = "https://api.alquran.cloud/v1/quran/quran-uthmani";
  const FR = "https://api.alquran.cloud/v1/quran/fr.hamidullah";
  const fetchWithTimeout = (url) => {
    const c = new AbortController();
    const t = setTimeout(() => c.abort(), 25000);
    return fetch(url, { signal: c.signal }).finally(() => clearTimeout(t));
  };
  Promise.all([fetchWithTimeout(AR), fetchWithTimeout(FR)])
    .then(async ([arRes, frRes]) => {
      if (!arRes.ok || !frRes.ok) throw new Error("HTTP error");
      const [arJson, frJson] = await Promise.all([arRes.json(), frRes.json()]);
      const arSurahs = arJson?.data?.surahs;
      const frSurahs = frJson?.data?.surahs;
      if (!arSurahs || !frSurahs) throw new Error("Format");
      const list = [];
      let id = 1;
      for (let s = 0; s < arSurahs.length; s++) {
        const arS = arSurahs[s];
        const frS = frSurahs[s];
        for (let a = 0; a < arS.ayahs.length; a++) {
          list.push({
            id: id++,
            surah: frS.englishName || arS.englishName || arS.name,
            surahNumber: arS.number,
            ayahNumber: arS.ayahs[a].numberInSurah,
            arabic: arS.ayahs[a].text,
            translation: frS.ayahs[a].text
          });
        }
      }
      STATE.ayahs = list;
      STATE.quranLoaded = true;
      buildSurahMetadata();
      updateProgress();
      toast(`${list.length.toLocaleString("fr-FR")} versets pr\u00eats`, "\u2713");
      if (STATE.readerOpen && STATE.readerJuz) {
        renderReaderToc(STATE.readerJuz);
        renderJuzReader(STATE.readerJuz);
      }
      const save = () => { try { localStorage.setItem(KEYS.cache, JSON.stringify(list)); } catch {} };
      if ("requestIdleCallback" in window) requestIdleCallback(save, { timeout: 3000 });
      else setTimeout(save, 2000);
    })
    .catch(() => { if (STATE.readerOpen) renderReaderError(); });
}

function buildSurahMetadata() {
  STATE.surahTotalAyahs = {};
  const counts = new Map();
  for (const a of STATE.ayahs) counts.set(a.surahNumber, (counts.get(a.surahNumber) || 0) + 1);
  counts.forEach((count, num) => { STATE.surahTotalAyahs[num] = count; });
}

/* =========================================================
   21) INITIALISATION
   ========================================================= */

function init() {
  try {
    grabDOM();
    loadAll();
    applySavedTheme();
    applyFont();
    applyReaderTranslationPref();
    syncToggles();
    bindEvents();
    if (STATE.current) render(STATE.current, false);
    else { STATE.current = { ...DEMO_AYAHS[0] }; render(STATE.current, false); }
    updateProgress();
    renderFavorites();
    renderBookmarks();
    renderJuzGrid();
    updateResumeBadge();
    loadQuran();
    setTimeout(updateResumeBadge, 3000);
    setTimeout(updateResumeBadge, 8000);
    handleDeepLink();
  } catch (err) {
    console.error("[AYAH] Erreur init:", err);
    document.body.innerHTML =
      '<div style="padding:40px;text-align:center;font-family:Inter,sans-serif;color:#f2f0e9;background:#050807;min-height:100vh">' +
      '<h1 style="color:#d4af37;font-size:24px">AYAH</h1>' +
      '<p style="color:#ff6b6b">Erreur de chargement</p>' +
      '<p style="opacity:.6;font-size:14px">Ouvre la console (F12).</p>' +
      '</div>';
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init, { once: true });
} else {
  init();
}

/* =========================================================
   22) API PUBLIQUE
   ========================================================= */

window.AYAH = {
  next: nextAyah,
  current: () => STATE.current,
  favorites: () => [...STATE.favorites],
  bookmarks: () => [...STATE.bookmarks],
  reset: resetProgress,
  setReciter,
  setTheme,
  openJuz: openJuzReader,
  closeReader: closeJuzReader,
  getJuzAyahs,
  juzList: () => [...JUZ_STARTS],
  prevJuz: goToPrevJuz,
  nextJuz: goToNextJuz,
  playAll: startPlayAll,
  stopPlayAll,
  togglePlayAll,
  cycleSpeed,
  cycleRepeat,
  downloadJuz: downloadCurrentJuz,
  toggleBookmark,
  sharePosition,
  resetStats,
  audioCache: AudioCache,
  reciters: RECITERS,
  version: "10.5",
  clearCache: () => {
    localStorage.removeItem(KEYS.cache);
    localStorage.removeItem(KEYS.resumeState);
  },
  stats: () => ({
    ayahs: STATE.ayahs.length,
    quranLoaded: STATE.quranLoaded,
    discovered: STATE.discovered,
    favorites: STATE.favorites.length,
    bookmarks: STATE.bookmarks.length,
    currentJuz: STATE.currentJuz,
    visitedJuz: STATE.visitedJuz.size,
    readerOpen: STATE.readerOpen,
    readerJuz: STATE.readerJuz,
    readerRead: STATE.readerReadSet.size,
    playAllActive: STATE.playAllActive,
    playbackRate: STATE.playbackRate,
    repeatCount: STATE.repeatCount === Infinity ? "inf" : STATE.repeatCount,
    downloadedJuz: [...STATE.downloadedJuz],
    totalSeconds: STATE.stats.totalSeconds,
    versesListened: STATE.stats.versesListened,
    streak: STATE.stats.currentStreak
  })
};
