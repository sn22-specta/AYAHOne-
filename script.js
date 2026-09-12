/* =========================================================
AYAH TOUCH — SCRIPT COMPLET
Une touche. Un verset. Un rappel. Un audio.
========================================================= */

"use strict";

/* =========================================================
CONFIGURATION
========================================================= */

const TOTAL_AYAHS = 6236;

const STORAGE_KEYS = {
  discovered: "ayah_discovered",
  favorites: "ayah_favorites",
  seen: "ayah_seen",
  current: "ayah_current",
  theme: "ayah_theme",
  reciter: "ayah_reciter",
  font: "ayah_font",
  autoPlay: "ayah_autoplay",
  vibrate: "ayah_vibrate"
};

/* =========================================================
🎧 RÉCITATEURS AVEC FALLBACK AUDIO
========================================================= */

const RECITERS = {
  alafasy:  { name: "Mishary Alafasy",       code: "ar.alafasy",            everyayah: "Alafasy_128kbps" },
  husary:   { name: "Mahmoud Al-Husary",     code: "ar.husary",             everyayah: "Husary_128kbps" },
  minshawi: { name: "Al-Minshawi",           code: "ar.minshawi",           everyayah: "Minshawy_Murattal_128kbps" },
  basit:    { name: "Abdul Basit",           code: "ar.abdulbasitmurattal", everyayah: "Abdul_Basit_Murattal_192kbps" },
  sudais:   { name: "Abdurrahman As-Sudais", code: "ar.abdurrahmaansudais", everyayah: "Sudais_192kbps" }
};

let currentReciter = "alafasy";
let audioSourceIndex = 0;

/**
 * Retourne une LISTE d'URLs audio (fallback en cascade).
 */
function buildAudioUrls(globalAyahNumber, surahNumber, ayahNumber) {
  const r = RECITERS[currentReciter] || RECITERS.alafasy;

  const sss = String(surahNumber).padStart(3, "0");
  const aaa = String(ayahNumber).padStart(3, "0");

  return [
    `https://cdn.islamic.network/quran/audio/128/${r.code}/${globalAyahNumber}.mp3`,
    `https://cdn.islamic.network/quran/audio/64/${r.code}/${globalAyahNumber}.mp3`,
    `https://everyayah.com/data/${r.everyayah}/${sss}${aaa}.mp3`
  ];
}

/**
 * URL unique (compatibilité)
 */
function buildAudioUrl(globalAyahNumber) {
  return buildAudioUrls(globalAyahNumber, 1, 1)[0];
}

/* =========================================================
RAPPELS SPÉCIFIQUES
========================================================= */

const SPECIFIC_REMINDERS = {
  "1:1": "Commence chaque action par le nom d'Allah. La basmala est la clé de toute bénédiction.",
  "1:2": "Remercie avant de demander. La gratitude précède toujours le don.",
  "1:5": "C'est Toi seul que nous adorons. Purifie ton intention dans chaque acte.",
  "1:6": "Demande la guidée chaque jour. Le droit chemin ne se devine pas, il s'implore.",
  "2:152": "Souviens-toi d'Allah dans l'aisance, Il se souviendra de toi dans l'épreuve.",
  "2:186": "Allah est tout proche. Le du'a n'est pas un dernier recours — c'est un premier réflexe.",
  "2:216": "Il se peut que vous aimiez une chose qui est mauvaise pour vous. Allah sait, vous ne savez pas.",
  "2:255": "Ayat al-Kursī : récite-la après chaque prière et avant de dormir. Elle est une protection.",
  "2:286": "Allah ne te charge jamais au-delà de tes forces. Ce que tu traverses, tu peux le porter.",
  "3:139": "Ne faiblis pas, ne t'attriste pas — la victoire appartient aux croyants patients.",
  "3:173": "HasbunAllahu wa ni'mal-wakīl : Allah nous suffit, et Il est le meilleur Garant.",
  "9:40": "Ne t'attriste pas, Allah est avec nous. La solitude du croyant n'en est jamais une.",
  "13:28": "C'est par le dhikr que les cœurs s'apaisent. Répète, apaise, apaise encore.",
  "14:7": "Si vous êtes reconnaissants, Je vous donnerai davantage. La gratitude ouvre les portes.",
  "17:80": "Demande toujours une entrée de vérité et une sortie de vérité : demande l'honnêteté.",
  "18:10": "Quand tu es perdu, fais du'a comme les jeunes de la caverne : demande la guidée.",
  "20:114": "Dis : Seigneur, augmente ma science. La science est un du'a, pas un titre.",
  "24:35": "Allah est la Lumière des cieux et de la terre. Laisse-Le éclairer ton cœur.",
  "39:53": "Ne désespère jamais de la miséricorde d'Allah — aucun péché n'est plus grand que Son pardon.",
  "40:60": "Appelle-Moi, Je vous répondrai. Le du'a n'est pas un dernier recours.",
  "50:16": "Allah est plus proche de toi que ta veine jugulaire. Tu n'es jamais seul.",
  "65:3": "Quiconque place sa confiance en Allah, Il lui suffit.",
  "93:3": "Ton Seigneur ne t'a ni abandonné ni détesté. Même dans le silence, Il t'aime.",
  "94:5": "À côté de la difficulté, il y a une facilité. Elle est DÉJÀ là, pas après.",
  "94:6": "Répété deux fois : certes, avec la difficulté vient une facilité.",
  "103:3": "Foi, œuvres, vérité, patience : ces 4 piliers sauvent de la perte."
};

/* =========================================================
RAPPELS PAR SOURATE
========================================================= */

const SURAH_REMINDERS = {
  "1": "Al-Fâtiha : la mère du Livre, récitée dans chaque prière.",
  "2": "Al-Baqarah : la plus longue sourate, patience et loi.",
  "3": "Al-Imrān : la fermeté dans la foi face aux épreuves.",
  "4": "An-Nisā' : les femmes, justice et droits.",
  "5": "Al-Mā'idah : les engagements, la fidélité.",
  "6": "Al-An'ām : l'unicité d'Allah face à l'association.",
  "7": "Al-A'rāf : l'histoire des peuples et leurs messagers.",
  "8": "Al-Anfāl : la victoire vient d'Allah.",
  "9": "At-Tawbah : le repentir sincère.",
  "10": "Yūnus : la miséricorde pour les peuples.",
  "11": "Hūd : la constance des prophètes.",
  "12": "Yūsuf : la plus belle histoire du Coran.",
  "13": "Ar-Ra'd : le tonnerre, le dhikr apaise les cœurs.",
  "14": "Ibrāhīm : la gratitude ouvre les portes.",
  "15": "Al-Hijr : Allah protège le Coran.",
  "16": "An-Nahl : les bienfaits innombrables d'Allah.",
  "17": "Al-Isrā' : le voyage nocturne.",
  "18": "Al-Kahf : récite-la le vendredi, elle protège du Dajjāl.",
  "19": "Maryam : la miséricorde et les prophètes.",
  "20": "Tā-Hā : Mūsā et la confiance en Allah.",
  "21": "Al-Anbiyā' : les prophètes, miséricorde envoyée.",
  "22": "Al-Hajj : le pèlerinage, pilier de la foi.",
  "23": "Al-Mu'minūn : les croyants qui réussissent.",
  "24": "An-Nūr : la lumière et la pudeur.",
  "25": "Al-Furqān : le discernement entre vérité et faux.",
  "26": "Ash-Shu'arā' : les poètes et la vérité.",
  "27": "An-Naml : Salomon et la fourmi, sagesse.",
  "28": "Al-Qasas : Mūsā, l'humilité et la patience.",
  "29": "Al-'Ankabūt : l'épreuve révèle les cœurs.",
  "30": "Ar-Rūm : la promesse d'Allah s'accomplit.",
  "31": "Luqmān : la sagesse du père à son fils.",
  "32": "As-Sajdah : la prosternation des croyants.",
  "33": "Al-Ahzāb : le Prophète ﷺ, modèle à suivre.",
  "34": "Saba' : la gratitude attire les bienfaits.",
  "35": "Fātir : la création, preuve du Créateur.",
  "36": "Yā-Sīn : le cœur du Coran.",
  "37": "As-Sāffāt : les rangs des anges.",
  "38": "Sād : la patience d'Ayyūb.",
  "39": "Az-Zumar : ne désespère jamais d'Allah.",
  "40": "Ghāfir : Allah répond au du'a.",
  "41": "Fussilat : le Coran, guidée et guérison.",
  "42": "Ash-Shūrā : la consultation et la miséricorde.",
  "43": "Az-Zukhruf : les illusions de ce monde.",
  "44": "Ad-Dukhān : la nuit bénie du destin.",
  "45": "Al-Jāthiyah : le jour du jugement.",
  "46": "Al-Ahqāf : la patience des messagers.",
  "47": "Muhammad : la foi et le combat.",
  "48": "Al-Fath : la victoire claire.",
  "49": "Al-Hujurāt : le respect entre croyants.",
  "50": "Qāf : la proximité d'Allah.",
  "51": "Adh-Dhāriyāt : l'adoration, but de la création.",
  "52": "At-Tūr : la promesse du paradis.",
  "53": "An-Najm : la révélation authentique.",
  "54": "Al-Qamar : le Coran, facile à retenir.",
  "55": "Ar-Rahmān : la sourate de la miséricorde.",
  "56": "Al-Wāqi'ah : récite-la, elle éloigne la pauvreté.",
  "57": "Al-Hadīd : Allah, Premier et Dernier.",
  "58": "Al-Mujādilah : Allah entend tout.",
  "59": "Al-Hashr : les noms sublimes d'Allah.",
  "60": "Al-Mumtahanah : l'épreuve de la foi.",
  "61": "As-Saff : l'unité des croyants.",
  "62": "Al-Jumu'ah : la valeur du vendredi.",
  "63": "Al-Munāfiqūn : la sincérité du cœur.",
  "64": "At-Taghābun : le jour de la récompense.",
  "65": "At-Talāq : la confiance en Allah suffit.",
  "66": "At-Tahrīm : la famille du Prophète ﷺ.",
  "67": "Al-Mulk : 30 versets qui intercèdent la nuit.",
  "68": "Al-Qalam : l'écriture et la patience.",
  "69": "Al-Hāqqah : la vérité inévitable.",
  "70": "Al-Ma'ārij : la patience et la prière.",
  "71": "Nūh : la patience de Nūh, 950 ans.",
  "72": "Al-Jinn : les djinns écoutent le Coran.",
  "73": "Al-Muzzammil : la prière de la nuit.",
  "74": "Al-Muddaththir : lève-toi et avertis.",
  "75": "Al-Qiyāmah : le jour de la résurrection.",
  "76": "Al-Insān : la générosité des vertueux.",
  "77": "Al-Mursalāt : les vents envoyés.",
  "78": "An-Naba' : la grande nouvelle.",
  "79": "An-Nāzi'āt : les anges qui arrachent.",
  "80": "Abasa : ne méprise jamais personne.",
  "81": "At-Takwīr : le soleil sera plié.",
  "82": "Al-Infitār : les anges enregistrent.",
  "83": "Al-Mutaffifīn : la fraude détruit.",
  "84": "Al-Inshiqāq : la reddition finale.",
  "85": "Al-Burūj : la foi persécutée triomphe.",
  "86": "At-Tāriq : l'étoile nocturne.",
  "87": "Al-A'lā : glorifie le Nom de ton Seigneur.",
  "88": "Al-Ghāshiyah : le jour qui couvre.",
  "89": "Al-Fajr : l'aube et les peuples anciens.",
  "90": "Al-Balad : la cité et le chemin difficile.",
  "91": "Ash-Shams : le succès purifie l'âme.",
  "92": "Al-Layl : la nuit et la générosité.",
  "93": "Ad-Duhā : ton Seigneur ne t'a pas abandonné.",
  "94": "Ash-Sharh : avec la difficulté vient la facilité.",
  "95": "At-Tīn : l'homme créé au meilleur profil.",
  "96": "Al-'Alaq : la première révélation, Lis !",
  "97": "Al-Qadr : la nuit du destin, meilleure que 1000 mois.",
  "98": "Al-Bayyinah : la preuve claire.",
  "99": "Az-Zalzalah : la terre tremblera.",
  "100": "Al-'Ādiyāt : la course et l'ingratitude.",
  "101": "Al-Qāri'ah : le fracas du jour.",
  "102": "At-Takāthur : la course aux richesses égare.",
  "103": "Al-'Asr : foi, œuvres, vérité, patience.",
  "104": "Al-Humazah : malheur au moqueur.",
  "105": "Al-Fīl : l'armée d'Abraha détruite.",
  "106": "Quraysh : la sécurité, don d'Allah.",
  "107": "Al-Mā'ūn : la prière sans sincérité.",
  "108": "Al-Kawthar : l'abondance offerte au Prophète ﷺ.",
  "109": "Al-Kāfirūn : la foi sans compromis.",
  "110": "An-Nasr : la victoire et la gratitude.",
  "111": "Al-Masad : l'orgueil puni.",
  "112": "Al-Ikhlāṣ : un tiers du Coran.",
  "113": "Al-Falaq : protection matin et soir.",
  "114": "An-Nās : protection contre les murmures."
};

/* =========================================================
RAPPELS THÉMATIQUES
========================================================= */

const THEME_REMINDERS = [
  { keywords: ["miséricorde", "pardon", "pardonner", "clément", "indulgent"],
    advice: "Allah est plus miséricordieux envers toi que ta propre mère. Aucun péché n'est plus grand que Son pardon — reviens, Il t'attend." },
  { keywords: ["amour", "aimer", "aimé", "proche"],
    advice: "Allah dit : « Je suis avec Mon serviteur quand il M'évoque. » Tu n'es jamais seul, jamais oublié." },
  { keywords: ["patience", "endurer", "épreuve", "difficulté", "souffrance"],
    advice: "Chaque larme versée compte. Le Prophète ﷺ a dit : « Aucun chagrin ne touche un croyant, même une épine, sans qu'Allah n'efface par elle certains de ses péchés. »" },
  { keywords: ["prière", "salât", "invoquer", "du'a", "appeler"],
    advice: "Quand tu lèves les mains vers Allah, tu parles au Roi des rois sans intermédiaire. C'est l'honneur le plus grand accordé à l'être humain." },
  { keywords: ["paradis", "jardin", "jannah", "récompense"],
    advice: "Le Paradis contient ce qu'aucun œil n'a vu, ce qu'aucune oreille n'a entendu." },
  { keywords: ["repentir", "revenir", "tawbah", "péché"],
    advice: "Allah se réjouit du retour de Son serviteur plus qu'une mère qui retrouve son enfant perdu. Le repentir n'est jamais trop tard." },
  { keywords: ["gratitude", "remercier", "bienfait", "grâce"],
    advice: "Chaque souffle que tu respires est un cadeau. Chaque battement de ton cœur est une déclaration d'amour d'Allah pour toi." },
  { keywords: ["confiance", "tawakkal", "Allah suffit", "remettre"],
    advice: "Attache ton chameau, puis place ta confiance en Allah." },
  { keywords: ["cœur", "apaiser", "tranquillité", "paix", "repos"],
    advice: "Les cœurs ne trouvent la paix qu'en Allah. Le vide que tu ressens n'est pas un manque de choses — c'est un manque de Lui." },
  { keywords: ["prophète", "muhammad", "messager", "rasûl"],
    advice: "Le Prophète ﷺ pleurait pour sa communauté dans ses prières nocturnes — toi qui lis ceci, tu étais dans ses pensées." },
  { keywords: ["coran", "livre", "verset", "révélation"],
    advice: "Le Coran est la lettre d'amour d'Allah à l'humanité." },
  { keywords: ["nuit", "qiyam", "tahajjud"],
    advice: "Allah descend au ciel le plus bas chaque nuit et appelle : « Qui M'invoque que Je lui réponde ? »" },
  { keywords: ["aumône", "charité", "sadaqa", "donner"],
    advice: "Ce que tu donnes ne diminue jamais ta richesse. La sadaqa éteint les péchés comme l'eau éteint le feu." },
  { keywords: ["mère", "père", "parent", "famille"],
    advice: "Le Prophète ﷺ a dit : « Le Paradis est sous les pieds des mères. »" },
  { keywords: ["mort", "dernier", "fin", "tombe"],
    advice: "La mort n'est pas une fin — c'est un retour à la Maison." },
  { keywords: ["maladie", "souffrir", "douleur"],
    advice: "Allah n'éprouve pas celui qu'Il méprise — Il éprouve celui qu'Il aime." },
  { keywords: ["unité", "frère", "communauté", "musulmans"],
    advice: "Les croyants sont comme un seul corps : si une partie souffre, tout le corps souffre." },
  { keywords: ["savoir", "science", "connaissance", "apprendre"],
    advice: "Le Prophète ﷺ a dit : « Quiconque emprunte un chemin à la recherche du savoir, Allah lui facilite un chemin vers le Paradis. »" },
  { keywords: ["joie", "bonheur", "plaisir", "sourire"],
    advice: "Sourire à ton frère est une sadaqa. L'Islam n'est pas triste — il est la joie du cœur." }
];

/* =========================================================
RAPPELS UNIVERSAUX
========================================================= */

const UNIVERSAL_REMINDERS = [
  "Chaque verset du Coran est une lumière. Laisse-le éclairer ton cœur aujourd'hui.",
  "Allah te parle à travers ce verset. Écoute avec ton cœur, pas seulement avec tes yeux.",
  "Le Coran est un rappel pour ceux qui réfléchissent. Prends un instant pour méditer.",
  "Chaque mot du Coran est une miséricorde. Médite-le avant de passer au suivant.",
  "Allah a voulu que tu lises ce verset aujourd'hui. Il y a un message pour toi.",
  "Un verset lu avec attention vaut mieux que cent lus distraitement.",
  "Le Coran guérit les cœurs. Laisse ce verset apaiser le tien.",
  "Allah guide qui Il veut. Remercie-Le de t'avoir conduit jusqu'ici.",
  "Ce verset est un cadeau d'Allah pour toi. Reçois-le avec gratitude.",
  "Applique ce verset dans ta journée. Le Coran se vit, pas seulement se lit.",
  "Chaque verset te rapproche d'Allah. Continue, ne t'arrête pas.",
  "Le Prophète ﷺ disait : « Le meilleur d'entre vous est celui qui apprend le Coran et l'enseigne. »",
  "Laisse ce verset transformer quelque chose en toi, même petit.",
  "Allah connaît ce que tu ressens. Ce verset est peut-être une réponse.",
  "Le Coran est un dialogue entre Allah et Son serviteur. Continue la conversation.",
  "Méditer un verset vaut mieux que réciter tout le Coran sans y penser.",
  "Chaque verset est une graine. Plante-la dans ton cœur et laisse-la pousser.",
  "Allah t'aime. C'est pour cela qu'Il a mis ce verset sous tes yeux.",
  "Ce verset te sera utile dans cette vie ou dans l'autre. Garde-le précieusement.",
  "Le Coran éclaire le chemin. Marche dans cette lumière aujourd'hui."
];

/* =========================================================
DÉMO
========================================================= */

const DEMO_AYAHS = [
  {
    id: 1, surah: "Al-Fatiha", surahNumber: 1, ayahNumber: 1,
    arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    translation: "Au nom d'Allah, le Tout Miséricordieux, le Très Miséricordieux."
  },
  {
    id: 2, surah: "Ash-Sharh", surahNumber: 94, ayahNumber: 5,
    arabic: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا",
    translation: "À côté de la difficulté est, certes, une facilité."
  }
];

/* =========================================================
ÉTAT
========================================================= */

let ayahs = [...DEMO_AYAHS];
let currentAyah = null;
let discoveredCount = 0;
let seenIds = [];
let favorites = [];
let isChanging = false;
let audioPlaying = false;
let toastTimer = null;
let currentFont = "medium";
let autoPlayEnabled = false;
let vibrateEnabled = true;

/* =========================================================
DOM
========================================================= */

const DOM = {
  ayahScreen: document.getElementById("ayahScreen"),
  ayahCard: document.getElementById("ayahCard"),
  arabicText: document.getElementById("arabicText"),
  translationText: document.getElementById("translationText"),
  surahName: document.getElementById("surahName"),
  referenceNumber: document.getElementById("referenceNumber"),
  ayahNumber: document.getElementById("ayahNumber"),
  reminderBox: document.getElementById("reminderBox"),
  discoveredCount: document.getElementById("discoveredCount"),
  totalCount: document.getElementById("totalCount"),
  progressBar: document.getElementById("progressBar"),
  discoverButton: document.getElementById("discoverButton"),
  favoriteButton: document.getElementById("favoriteButton"),
  audioButton: document.getElementById("audioButton"),
  shareButton: document.getElementById("shareButton"),
  menuButton: document.getElementById("menuButton"),
  closeMenu: document.getElementById("closeMenu"),
  sideMenu: document.getElementById("sideMenu"),
  menuOverlay: document.getElementById("menuOverlay"),
  toast: document.getElementById("toast"),
  toastMessage: document.getElementById("toastMessage"),
  toastIcon: document.getElementById("toastIcon"),
  favoritesModal: document.getElementById("favoritesModal"),
  progressModal: document.getElementById("progressModal"),
  favoritesList: document.getElementById("favoritesList"),
  favoritesEmpty: document.getElementById("favoritesEmpty"),
  modalDiscovered: document.getElementById("modalDiscovered"),
  modalProgressBar: document.getElementById("modalProgressBar"),
  themeButton: document.getElementById("themeButton"),
  ayahAudio: document.getElementById("ayahAudio"),
  settingsModal: document.getElementById("settingsModal"),
  reciterOptions: document.getElementById("reciterOptions"),
  themeOptions: document.getElementById("themeOptions"),
  fontOptions: document.getElementById("fontOptions"),
  autoPlayToggle: document.getElementById("autoPlayToggle"),
  vibrateToggle: document.getElementById("vibrateToggle"),
  resetButton: document.getElementById("resetButton")
};

/* =========================================================
INITIALISATION
========================================================= */

document.addEventListener("DOMContentLoaded", init);

async function init() {
  loadStorage();
  updateTotal();

  await loadQuran();

  if (currentAyah === null || !ayahs.some(a => a.id === currentAyah.id)) {
    currentAyah = getRandomNewAyah();
  }

  if (currentAyah) renderAyah(currentAyah, false);

  updateProgress();
  renderFavorites();
  applySavedTheme();
  applyFont();
  bindEvents();
}

/* =========================================================
STORAGE
========================================================= */

function loadStorage() {
  try {
    const d = localStorage.getItem(STORAGE_KEYS.discovered);
    const s = localStorage.getItem(STORAGE_KEYS.seen);
    const f = localStorage.getItem(STORAGE_KEYS.favorites);
    const c = localStorage.getItem(STORAGE_KEYS.current);
    const r = localStorage.getItem(STORAGE_KEYS.reciter);
    const fo = localStorage.getItem(STORAGE_KEYS.font);
    const ap = localStorage.getItem(STORAGE_KEYS.autoPlay);
    const vb = localStorage.getItem(STORAGE_KEYS.vibrate);

    discoveredCount = d ? Number(d) : 0;
    seenIds = s ? JSON.parse(s) : [];
    favorites = f ? JSON.parse(f) : [];
    currentAyah = c ? JSON.parse(c) : null;

    if (r && RECITERS[r]) currentReciter = r;
    if (fo) currentFont = fo;
    if (ap !== null) autoPlayEnabled = ap === "true";
    if (vb !== null) vibrateEnabled = vb === "true";
  } catch (error) {
    console.warn("Storage error", error);
  }
}

function saveStorage() {
  try {
    localStorage.setItem(STORAGE_KEYS.discovered, String(discoveredCount));
    localStorage.setItem(STORAGE_KEYS.seen, JSON.stringify(seenIds));
    localStorage.setItem(STORAGE_KEYS.favorites, JSON.stringify(favorites));
    localStorage.setItem(STORAGE_KEYS.reciter, currentReciter);
    localStorage.setItem(STORAGE_KEYS.font, currentFont);
    localStorage.setItem(STORAGE_KEYS.autoPlay, String(autoPlayEnabled));
    localStorage.setItem(STORAGE_KEYS.vibrate, String(vibrateEnabled));
    if (currentAyah) {
      localStorage.setItem(STORAGE_KEYS.current, JSON.stringify(currentAyah));
    }
  } catch (error) {
    console.warn("Save error", error);
  }
}

/* =========================================================
CHARGEMENT DU CORAN
========================================================= */

async function loadQuran() {
  const ARABIC_URL = "https://api.alquran.cloud/v1/quran/quran-uthmani";
  const FRENCH_URL = "https://api.alquran.cloud/v1/quran/fr.hamidullah";

  try {
    console.log("📥 Chargement du Coran...");

    const [arRes, frRes] = await Promise.all([
      fetch(ARABIC_URL),
      fetch(FRENCH_URL)
    ]);

    if (!arRes.ok || !frRes.ok) throw new Error("Erreur réseau");

    const arData = (await arRes.json()).data;
    const frData = (await frRes.json()).data;

    const list = [];
    let globalId = 1;

    for (let s = 0; s < arData.surahs.length; s++) {
      const arSurah = arData.surahs[s];
      const frSurah = frData.surahs[s];

      for (let a = 0; a < arSurah.ayahs.length; a++) {
        const ar = arSurah.ayahs[a];
        const fr = frSurah.ayahs[a];

        const thisId = globalId++;

        list.push({
          id: thisId,
          surah: frSurah.englishName || arSurah.englishName || arSurah.name,
          surahNumber: arSurah.number,
          ayahNumber: ar.numberInSurah,
          arabic: ar.text,
          translation: fr.text
        });
      }
    }

    ayahs = list;
    updateTotal();
    updateProgress();
    console.log(`✅ ${ayahs.length} versets chargés`);
    showToast(`${ayahs.length} versets prêts`, "✓");

  } catch (error) {
    console.error("❌ Erreur chargement Coran", error);
    showToast("Mode démo (2 versets)", "!");
    ayahs = [...DEMO_AYAHS];
  }
}

/* =========================================================
ÉVÉNEMENTS
========================================================= */

function bindEvents() {
  DOM.discoverButton?.addEventListener("click", e => {
    e.stopPropagation();
    showNextAyah();
  });

  DOM.favoriteButton?.addEventListener("click", e => {
    e.stopPropagation();
    toggleFavorite();
  });

  DOM.audioButton?.addEventListener("click", e => {
    e.stopPropagation();
    toggleAudio();
  });

  DOM.shareButton?.addEventListener("click", e => {
    e.stopPropagation();
    shareAyah();
  });

  DOM.menuButton?.addEventListener("click", e => {
    e.stopPropagation();
    openMenu();
  });

  DOM.closeMenu?.addEventListener("click", closeMenu);
  DOM.menuOverlay?.addEventListener("click", closeMenu);

  document.querySelectorAll(".menu-option").forEach(btn => {
    btn.addEventListener("click", () => handleMenuAction(btn.dataset.menu));
  });

  document.querySelectorAll(".nav-item").forEach(btn => {
    btn.addEventListener("click", () => handleNavigation(btn.dataset.page));
  });

  document.querySelectorAll("[data-close-modal]").forEach(btn => {
    btn.addEventListener("click", closeAllModals);
  });

  [DOM.favoritesModal, DOM.progressModal, DOM.settingsModal].forEach(modal => {
    modal?.addEventListener("click", e => {
      if (e.target === modal) closeAllModals();
    });
  });

  DOM.themeButton?.addEventListener("click", e => {
    e.stopPropagation();
    toggleTheme();
  });

  DOM.ayahScreen?.addEventListener("click", handleScreenTouch);

  // Paramètres : options cliquables
  document.addEventListener("click", (e) => {
    const reciterBtn = e.target.closest("[data-reciter]");
    if (reciterBtn) {
      setReciter(reciterBtn.dataset.reciter);
      renderReciterOptions();
      vibrate(20);
      return;
    }

    const themeBtn = e.target.closest("[data-theme-choice]");
    if (themeBtn) {
      setTheme(themeBtn.dataset.themeChoice);
      renderThemeOptions();
      vibrate(20);
      return;
    }

    const fontBtn = e.target.closest("[data-font]");
    if (fontBtn) {
      currentFont = fontBtn.dataset.font;
      saveStorage();
      applyFont();
      renderFontOptions();
      vibrate(20);
      return;
    }
  });

  // Toggles
  DOM.autoPlayToggle?.addEventListener("change", (e) => {
    autoPlayEnabled = e.target.checked;
    saveStorage();
    showToast(autoPlayEnabled ? "Lecture auto activée" : "Lecture auto désactivée", "🔁");
  });

  DOM.vibrateToggle?.addEventListener("change", (e) => {
    vibrateEnabled = e.target.checked;
    saveStorage();
    showToast(vibrateEnabled ? "Vibration activée" : "Vibration désactivée", "📳");
    vibrate(20);
  });

  DOM.resetButton?.addEventListener("click", () => {
    closeAllModals();
    resetProgress();
  });

  document.addEventListener("keydown", event => {
    if (event.code === "Space" || event.code === "Enter") {
      const tag = document.activeElement?.tagName;
      if (tag !== "BUTTON" && tag !== "INPUT" && tag !== "TEXTAREA") {
        event.preventDefault();
        showNextAyah();
      }
    }
    if (event.key === "Escape") {
      closeMenu();
      closeAllModals();
    }
  });
}

/* =========================================================
TOUCHER L'ÉCRAN
========================================================= */

function handleScreenTouch(event) {
  const target = event.target;
  if (
    target.closest("button") ||
    target.closest(".bottom-navigation") ||
    target.closest(".side-menu") ||
    target.closest(".modal")
  ) return;
  showNextAyah();
}

/* =========================================================
NOUVEAU VERSET
========================================================= */

function showNextAyah() {
  if (isChanging || !ayahs.length) return;

  if (audioPlaying && DOM.ayahAudio) {
    DOM.ayahAudio.pause();
    setAudioState(false);
  }

  isChanging = true;
  const nextAyah = getRandomNewAyah();

  if (!nextAyah) {
    isChanging = false;
    showToast("Aucun verset disponible.", "✦");
    return;
  }

  DOM.ayahCard?.classList.add("changing");

  setTimeout(() => {
    currentAyah = nextAyah;
    registerAyah(nextAyah);
    renderAyah(nextAyah, true);
    DOM.ayahCard?.classList.remove("changing");
    isChanging = false;
  }, 280);
}

/* =========================================================
CHOIX ALÉATOIRE
========================================================= */

function getRandomNewAyah() {
  if (!ayahs.length) return null;

  let available = ayahs.filter(a => !seenIds.includes(a.id));

  if (available.length === 0 && ayahs.length > 0) {
    seenIds = [];
    available = [...ayahs];
    showToast("Nouveau cycle ✦", "↻");
  }

  if (available.length === 0) return null;

  const index = Math.floor(Math.random() * available.length);
  return available[index];
}

/* =========================================================
ENREGISTRER
========================================================= */

function registerAyah(ayah) {
  if (!seenIds.includes(ayah.id)) {
    seenIds.push(ayah.id);
    discoveredCount++;
  }
  saveStorage();
  updateProgress();
}

/* =========================================================
AFFICHER UN VERSET
========================================================= */

function renderAyah(ayah, showNotification = true) {
  if (!ayah) return;

  if (DOM.arabicText) DOM.arabicText.textContent = ayah.arabic;
  if (DOM.translationText) DOM.translationText.textContent = ayah.translation;
  if (DOM.surahName) DOM.surahName.textContent = (ayah.surah || "").toUpperCase();
  if (DOM.referenceNumber) DOM.referenceNumber.textContent = `${ayah.surahNumber} : ${ayah.ayahNumber}`;
  if (DOM.ayahNumber) DOM.ayahNumber.textContent = ayah.ayahNumber;

  updateFavoriteButton();
  renderReminder(ayah);

  if (showNotification) showToast("Nouveau verset", "✦");
  saveStorage();
}

/* =========================================================
RAPPELS
========================================================= */

function getReminderForAyah(ayah) {
  if (!ayah) return null;

  const specificKey = `${ayah.surahNumber}:${ayah.ayahNumber}`;
  if (SPECIFIC_REMINDERS[specificKey]) {
    return { icon: "✦", title: "Rappel du verset", text: SPECIFIC_REMINDERS[specificKey] };
  }

  const text = (ayah.translation || "").toLowerCase();
  for (const theme of THEME_REMINDERS) {
    if (theme.keywords.some(kw => text.includes(kw.toLowerCase()))) {
      return { icon: "💡", title: "Réflexion", text: theme.advice };
    }
  }

  if (SURAH_REMINDERS[String(ayah.surahNumber)]) {
    return {
      icon: "📖",
      title: `À propos de ${ayah.surah}`,
      text: SURAH_REMINDERS[String(ayah.surahNumber)]
    };
  }

  const fallbackIndex = ayah.id % UNIVERSAL_REMINDERS.length;
  return { icon: "✦", title: "Rappel", text: UNIVERSAL_REMINDERS[fallbackIndex] };
}

function renderReminder(ayah) {
  const container = DOM.reminderBox;
  if (!container) return;

  const reminder = getReminderForAyah(ayah);

  if (!reminder) {
    container.innerHTML = "";
    container.classList.remove("visible");
    return;
  }

  container.innerHTML = `
    <div class="reminder-header">
      <span class="reminder-icon">${reminder.icon}</span>
      <span class="reminder-title">${escapeHTML(reminder.title)}</span>
    </div>
    <p class="reminder-text">${escapeHTML(reminder.text)}</p>
  `;

  container.classList.add("visible");
}

/* =========================================================
PROGRESSION
========================================================= */

function updateProgress() {
  const total = ayahs.length || TOTAL_AYAHS;
  const safeCount = Math.min(discoveredCount, total);
  const percentage = Math.max(0.01, (safeCount / total) * 100);

  if (DOM.discoveredCount) DOM.discoveredCount.textContent = safeCount.toLocaleString("fr-FR");
  if (DOM.totalCount) DOM.totalCount.textContent = total.toLocaleString("fr-FR");
  if (DOM.progressBar) DOM.progressBar.style.width = `${percentage}%`;
  if (DOM.modalDiscovered) DOM.modalDiscovered.textContent = safeCount.toLocaleString("fr-FR");
  if (DOM.modalProgressBar) DOM.modalProgressBar.style.width = `${percentage}%`;
}

function updateTotal() {
  if (DOM.totalCount) DOM.totalCount.textContent = (ayahs.length || TOTAL_AYAHS).toLocaleString("fr-FR");
}

/* =========================================================
FAVORIS
========================================================= */

function toggleFavorite() {
  if (!currentAyah) return;

  const index = favorites.findIndex(item => item.id === currentAyah.id);

  if (index === -1) {
    favorites.push(currentAyah);
    showToast("Ajouté aux favoris", "♡");
  } else {
    favorites.splice(index, 1);
    showToast("Retiré des favoris", "♡");
  }

  saveStorage();
  updateFavoriteButton();
  renderFavorites();
}

function updateFavoriteButton() {
  if (!DOM.favoriteButton || !currentAyah) return;

  const isFavorite = favorites.some(item => item.id === currentAyah.id);
  DOM.favoriteButton.classList.toggle("active", isFavorite);

  const icon = DOM.favoriteButton.querySelector(".action-icon");
  if (icon) icon.textContent = isFavorite ? "♥" : "♡";
}

function renderFavorites() {
  if (!DOM.favoritesList) return;
  DOM.favoritesList.innerHTML = "";

  if (favorites.length === 0) {
    if (DOM.favoritesEmpty) DOM.favoritesEmpty.style.display = "block";
    return;
  }

  if (DOM.favoritesEmpty) DOM.favoritesEmpty.style.display = "none";

  [...favorites].reverse().forEach(ayah => {
    const item = document.createElement("div");
    item.className = "favorite-item";
    item.innerHTML = `
      <div class="favorite-arabic" dir="rtl">${escapeHTML(ayah.arabic)}</div>
      <div class="favorite-reference">${escapeHTML(ayah.surah)} • ${ayah.surahNumber}:${ayah.ayahNumber}</div>
    `;
    item.addEventListener("click", () => {
      currentAyah = ayah;
      renderAyah(ayah, false);
      closeAllModals();
      showToast("Verset chargé", "✦");
    });
    DOM.favoritesList.appendChild(item);
  });
}

/* =========================================================
⭐ AUDIO AVEC FALLBACK
========================================================= */

function toggleAudio() {
  if (!currentAyah || !DOM.ayahAudio) return;

  const audio = DOM.ayahAudio;

  if (!audio.paused) {
    audio.pause();
    setAudioState(false);
    return;
  }

  const urls = buildAudioUrls(
    currentAyah.id,
    currentAyah.surahNumber,
    currentAyah.ayahNumber
  );

  if (!audio.src || !urls.some(u => audio.src === u)) {
    audioSourceIndex = 0;
  }

  tryPlayFromIndex(urls, audioSourceIndex);
}

function tryPlayFromIndex(urls, index) {
  if (index >= urls.length) {
    showToast("Audio indisponible", "!");
    setAudioState(false);
    console.warn("❌ Aucune URL audio n'a fonctionné :", urls);
    return;
  }

  const audio = DOM.ayahAudio;
  const url = urls[index];

  console.log(`🎧 Tentative ${index + 1}/${urls.length} : ${url}`);

  audio.src = url;
  audio.load();

  const playPromise = audio.play();

  if (playPromise && typeof playPromise.then === "function") {
    playPromise
      .then(() => {
        audioSourceIndex = index;
        setAudioState(true);
        showToast("Lecture en cours", "🎧");
      })
      .catch((err) => {
        console.warn(`⚠️ Échec source ${index + 1}:`, err.message);
        tryPlayFromIndex(urls, index + 1);
      });
  }
}

function setAudioState(playing) {
  audioPlaying = playing;
  DOM.audioButton?.classList.toggle("playing", playing);
  const icon = DOM.audioButton?.querySelector(".action-icon");
  if (icon) icon.textContent = playing ? "Ⅱ" : "▶";
  const label = DOM.audioButton?.querySelector(".action-label");
  if (label) label.textContent = playing ? "Pause" : "Écouter";
}

DOM.ayahAudio?.addEventListener("ended", () => {
  setAudioState(false);

  if (autoPlayEnabled) {
    setTimeout(() => {
      showNextAyah();
      setTimeout(() => {
        toggleAudio();
      }, 500);
    }, 600);
  }
});

/* Changer de récitateur */
function setReciter(key) {
  if (!RECITERS[key]) return;
  currentReciter = key;
  audioSourceIndex = 0;
  saveStorage();

  if (audioPlaying && DOM.ayahAudio) {
    DOM.ayahAudio.pause();
    setAudioState(false);
  }

  showToast(`Récitateur : ${RECITERS[key].name}`, "🎧");
}

/* =========================================================
PARTAGE
========================================================= */

async function shareAyah() {
  if (!currentAyah) return;

  const reminder = getReminderForAyah(currentAyah);
  let text =
    `${currentAyah.arabic}\n\n` +
    `"${currentAyah.translation}"\n\n` +
    `${currentAyah.surah} ${currentAyah.surahNumber}:${currentAyah.ayahNumber}`;

  if (reminder) text += `\n\n${reminder.icon} ${reminder.text}`;
  text += `\n\n— AYAH`;

  try {
    if (navigator.share) {
      await navigator.share({ title: "AYAH", text });
      showToast("Verset partagé", "↗");
      return;
    }
    await navigator.clipboard.writeText(text);
    showToast("Verset copié", "✓");
  } catch (error) {
    if (error?.name !== "AbortError") showToast("Partage annulé", "!");
  }
}

/* =========================================================
MENU
========================================================= */

function openMenu() {
  DOM.sideMenu?.classList.add("open");
  DOM.menuOverlay?.classList.add("visible");
  DOM.menuOverlay?.setAttribute("aria-hidden", "false");
}

function closeMenu() {
  DOM.sideMenu?.classList.remove("open");
  DOM.menuOverlay?.classList.remove("visible");
  DOM.menuOverlay?.setAttribute("aria-hidden", "true");
}

function handleMenuAction(page) {
  closeMenu();
  switch (page) {
    case "home":
      window.scrollTo({ top: 0, behavior: "smooth" });
      break;
    case "favorites":
      openModal(DOM.favoritesModal);
      break;
    case "progress":
      updateProgress();
      openModal(DOM.progressModal);
      break;
    case "settings":
      openSettingsModal();
      break;
    case "language":
      showToast("Français sélectionné", "文");
      break;
  }
}

function handleNavigation(page) {
  document.querySelectorAll(".nav-item").forEach(item => {
    item.classList.toggle("active", item.dataset.page === page);
  });

  switch (page) {
    case "home":
      closeAllModals();
      break;
    case "favorites":
      openModal(DOM.favoritesModal);
      break;
    case "progress":
      updateProgress();
      openModal(DOM.progressModal);
      break;
    case "settings":
      openSettingsModal();
      break;
  }
}

/* =========================================================
MODALES
========================================================= */

function openModal(modal) {
  if (!modal) return;
  modal.classList.add("visible");
  modal.setAttribute("aria-hidden", "false");
}

function closeAllModals() {
  document.querySelectorAll(".modal").forEach(modal => {
    modal.classList.remove("visible");
    modal.setAttribute("aria-hidden", "true");
  });
}

/* =========================================================
⚙️ PARAMÈTRES
========================================================= */

function openSettingsModal() {
  renderReciterOptions();
  renderThemeOptions();
  renderFontOptions();
  syncToggles();
  openModal(DOM.settingsModal);
}

function renderReciterOptions() {
  if (!DOM.reciterOptions) return;
  DOM.reciterOptions.innerHTML = "";

  Object.entries(RECITERS).forEach(([key, reciter]) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "setting-option";
    btn.dataset.reciter = key;

    if (key === currentReciter) btn.classList.add("active");

    const shortName = reciter.name.split(" ").slice(-1)[0];

    btn.innerHTML = `
      <span class="option-icon">🎧</span>
      <span class="option-label">${escapeHTML(shortName)}</span>
    `;

    DOM.reciterOptions.appendChild(btn);
  });
}

function renderThemeOptions() {
  if (!DOM.themeOptions) return;

  const current = localStorage.getItem(STORAGE_KEYS.theme) || "dark";

  DOM.themeOptions.querySelectorAll("[data-theme-choice]").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.themeChoice === current);
  });
}

function setTheme(choice) {
  let theme = choice;

  if (choice === "auto") {
    const hour = new Date().getHours();
    theme = (hour >= 7 && hour < 19) ? "light" : "dark";
  }

  document.documentElement.dataset.theme = theme;
  localStorage.setItem(STORAGE_KEYS.theme, choice);

  if (DOM.themeButton) {
    DOM.themeButton.textContent = theme === "dark" ? "☾" : "☀";
  }

  showToast(
    choice === "auto" ? "Thème automatique" : (theme === "dark" ? "Mode sombre" : "Mode clair"),
    theme === "dark" ? "☾" : "☀"
  );
}

function renderFontOptions() {
  if (!DOM.fontOptions) return;

  DOM.fontOptions.querySelectorAll("[data-font]").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.font === currentFont);
  });
}

function applyFont() {
  document.body.dataset.font = currentFont;
}

function syncToggles() {
  if (DOM.autoPlayToggle) DOM.autoPlayToggle.checked = autoPlayEnabled;
  if (DOM.vibrateToggle) DOM.vibrateToggle.checked = vibrateEnabled;
}

function vibrate(duration = 15) {
  if (!vibrateEnabled) return;
  if (navigator.vibrate) {
    try { navigator.vibrate(duration); } catch (e) {}
  }
}

/* =========================================================
TOAST
========================================================= */

function showToast(message, icon = "✦") {
  if (!DOM.toast || !DOM.toastMessage) return;

  DOM.toastMessage.textContent = message;
  if (DOM.toastIcon) DOM.toastIcon.textContent = icon;
  DOM.toast.classList.add("visible");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    DOM.toast.classList.remove("visible");
  }, 2200);
}

/* =========================================================
THÈME
========================================================= */

function toggleTheme() {
  const current = document.documentElement.dataset.theme || "dark";
  const next = current === "dark" ? "light" : "dark";

  document.documentElement.dataset.theme = next;
  localStorage.setItem(STORAGE_KEYS.theme, next);

  if (DOM.themeButton) {
    DOM.themeButton.textContent = next === "dark" ? "☾" : "☀";
  }

  showToast(next === "dark" ? "Mode sombre" : "Mode clair", next === "dark" ? "☾" : "☀");
}

function applySavedTheme() {
  const saved = localStorage.getItem(STORAGE_KEYS.theme) || "dark";
  let actual = saved;

  if (saved === "auto") {
    const hour = new Date().getHours();
    actual = (hour >= 7 && hour < 19) ? "light" : "dark";
  }

  document.documentElement.dataset.theme = actual;

  if (DOM.themeButton) {
    DOM.themeButton.textContent = actual === "dark" ? "☾" : "☀";
  }
}

/* =========================================================
ÉCHAPPEMENT HTML
========================================================= */

function escapeHTML(value) {
  const div = document.createElement("div");
  div.textContent = String(value);
  return div.innerHTML;
}

/* =========================================================
RESET
========================================================= */

function resetProgress() {
  if (!window.confirm("Réinitialiser toute votre progression ?")) return;

  discoveredCount = 0;
  seenIds = [];
  currentAyah = null;
  audioSourceIndex = 0;

  saveStorage();

  currentAyah = getRandomNewAyah();
  renderAyah(currentAyah, false);
  updateProgress();

  showToast("Progression réinitialisée", "↻");
}

/* =========================================================
EXPORT
========================================================= */

window.AYAH = {
  next: showNextAyah,
  current: () => currentAyah,
  favorites: () => favorites,
  resetProgress,
  setReciter,
  reciters: RECITERS,
  testAudio: () => {
    console.log("URLs pour le verset actuel :");
    if (currentAyah) {
      const urls = buildAudioUrls(currentAyah.id, currentAyah.surahNumber, currentAyah.ayahNumber);
      urls.forEach((u, i) => console.log(`  ${i+1}. ${u}`));
    }
  }
};
