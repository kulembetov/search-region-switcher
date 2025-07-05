class RegionSwitcher {
  regionSelect = document.getElementById("regionSelect");
  languageSelect = document.getElementById("languageSelect");
  applyButton = document.getElementById("applyRegion");
  status = document.getElementById("status");
  languageLabel = document.getElementById("currentLanguage");
  regionLabel = document.getElementById("currentRegion");
  regionLanguages = this.getRegionLanguages();
  languageNames = this.getLanguageNames();
  lastRegion = null;
  lastLanguages = [];
  contentContainer = document.querySelector(".region-switcher__content");

  constructor() {
    this.init();
  }

  init = () => {
    this.regionSelect.addEventListener("change", this.onRegionChange);
    this.applyButton.addEventListener("click", this.applySelection);
    this.checkGoogleSearchContext();
  };

  checkGoogleSearchContext = async () => {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    const isGoogleSearch =
      tab?.url && /^https?:\/\/(www\.)?google\.[^\/]+\/search/.test(tab.url);
    if (!isGoogleSearch) {
      this.disableUI(
        "This extension only works on Google Search result pages."
      );
    } else {
      this.enableUI();
      this.renderLanguageOptions();
      this.displayCurrentSettings();
    }
  };

  disableUI = (message) => {
    this.regionSelect.disabled = true;
    this.languageSelect.disabled = true;
    this.applyButton.disabled = true;
    this.applyButton.classList.add("region-switcher__btn--disabled");
    this.status.textContent = "";
    if (!document.getElementById("not-google-message")) {
      const msg = document.createElement("div");
      msg.id = "not-google-message";
      msg.className = "region-switcher__not-google-message";
      msg.innerHTML = `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="display:block;margin:0 auto 8px auto;opacity:0.7;"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg><div style="font-size:1.1em;opacity:0.85;">${message}</div>`;
      this.contentContainer.style.opacity = "0.3";
      this.contentContainer.parentNode.insertBefore(
        msg,
        this.contentContainer.nextSibling
      );
    }
  };

  enableUI = () => {
    this.regionSelect.disabled = false;
    this.languageSelect.disabled = false;
    this.applyButton.disabled = false;
    this.applyButton.classList.remove("region-switcher__btn--disabled");
    this.contentContainer.style.opacity = "1";
    const msg = document.getElementById("not-google-message");
    if (msg) msg.remove();
  };

  getRegionLanguages() {
    return {
      US: ["en"],
      AF: ["ps", "uz", "tk", "en"],
      AL: ["sq", "en"],
      DZ: ["ar", "fr", "en"],
      AS: ["en", "sm"],
      AD: ["ca", "en"],
      AO: ["pt", "en"],
      AI: ["en"],
      AQ: ["en"],
      AG: ["en"],
      AR: ["es", "en"],
      AM: ["hy", "en"],
      AW: ["nl", "en"],
      AU: ["en"],
      AT: ["de", "en"],
      AZ: ["az", "en"],
      BS: ["en"],
      BH: ["ar", "en"],
      BD: ["bn", "en"],
      BB: ["en"],
      BY: ["be", "ru", "en"],
      BE: ["nl", "fr", "de", "en"],
      BZ: ["en", "es"],
      BJ: ["fr", "en"],
      BM: ["en"],
      BT: ["dz", "en"],
      BO: ["es", "qu", "ay", "en"],
      BA: ["bs", "hr", "sr", "en"],
      BW: ["en", "tn"],
      BR: ["pt", "en"],
      IO: ["en"],
      VG: ["en"],
      BN: ["ms", "en"],
      BG: ["bg", "en"],
      BF: ["fr", "en"],
      BI: ["fr", "rn", "en"],
      KH: ["km", "en"],
      CM: ["fr", "en"],
      CA: ["en", "fr"],
      CV: ["pt", "en"],
      KY: ["en"],
      CF: ["fr", "sg", "en"],
      TD: ["fr", "ar", "en"],
      CL: ["es", "en"],
      CN: ["zh-CN", "en"],
      CX: ["en"],
      CC: ["en"],
      CO: ["es", "en"],
      KM: ["ar", "fr", "en"],
      CK: ["en", "rar"],
      CR: ["es", "en"],
      HR: ["hr", "en"],
      CU: ["es", "en"],
      CW: ["nl", "en", "pap"],
      CY: ["el", "tr", "en"],
      CZ: ["cs", "en"],
      CD: ["fr", "en"],
      DK: ["da", "en"],
      DJ: ["fr", "ar", "en"],
      DM: ["en"],
      DO: ["es", "en"],
      EC: ["es", "en"],
      EG: ["ar", "en"],
      SV: ["es", "en"],
      GQ: ["es", "fr", "pt", "en"],
      ER: ["ti", "ar", "en"],
      EE: ["et", "en"],
      SZ: ["en", "ss"],
      ET: ["am", "en"],
      FK: ["en"],
      FO: ["fo", "da", "en"],
      FJ: ["en", "fj", "hi"],
      FI: ["fi", "sv", "en"],
      FR: ["fr", "en"],
      GF: ["fr", "en"],
      PF: ["fr", "en"],
      GA: ["fr", "en"],
      GM: ["en"],
      GE: ["ka", "en"],
      DE: ["de", "en"],
      GH: ["en"],
      GI: ["en"],
      GR: ["el", "en"],
      GL: ["kl", "da", "en"],
      GD: ["en"],
      GP: ["fr", "en"],
      GU: ["en", "ch"],
      GT: ["es", "en"],
      GG: ["en"],
      GN: ["fr", "en"],
      GW: ["pt", "en"],
      GY: ["en"],
      HT: ["fr", "ht", "en"],
      HN: ["es", "en"],
      HK: ["zh-HK", "en"],
      HU: ["hu", "en"],
      IS: ["is", "en"],
      IN: [
        "hi",
        "en",
        "bn",
        "te",
        "mr",
        "ta",
        "ur",
        "gu",
        "kn",
        "ml",
        "or",
        "pa",
        "as",
        "ma",
        "sa",
      ],
      ID: ["id", "en"],
      IR: ["fa", "en"],
      IQ: ["ar", "ku", "en"],
      IE: ["en", "ga"],
      IM: ["en", "gv"],
      IL: ["he", "ar", "en"],
      IT: ["it", "en"],
      JM: ["en"],
      JP: ["ja", "en"],
      JE: ["en"],
      JO: ["ar", "en"],
      KZ: ["kk", "ru", "en"],
      KE: ["en", "sw"],
      KI: ["en"],
      XK: ["sq", "sr", "en"],
      KW: ["ar", "en"],
      KG: ["ky", "ru", "en"],
      LA: ["lo", "en"],
      LV: ["lv", "en"],
      LB: ["ar", "fr", "en"],
      LS: ["en", "st"],
      LR: ["en"],
      LY: ["ar", "en"],
      LI: ["de", "en"],
      LT: ["lt", "en"],
      LU: ["fr", "de", "lb", "en"],
      MO: ["zh-MO", "pt", "en"],
      MG: ["fr", "mg", "en"],
      MW: ["en", "ny"],
      MY: ["ms", "en"],
      MV: ["dv", "en"],
      ML: ["fr", "en"],
      MT: ["mt", "en"],
      MH: ["en", "mh"],
      MQ: ["fr", "en"],
      MR: ["ar", "fr", "en"],
      MU: ["en", "fr", "mfe"],
      YT: ["fr", "en"],
      MX: ["es", "en"],
      FM: ["en"],
      MD: ["ro", "ru", "en"],
      MC: ["fr", "en"],
      MN: ["mn", "en"],
      ME: ["srp", "en"],
      MS: ["en"],
      MA: ["ar", "fr", "en"],
      MZ: ["pt", "en"],
      MM: ["my", "en"],
      NA: ["en", "af"],
      NR: ["en", "na"],
      NP: ["ne", "en"],
      NL: ["nl", "en"],
      NC: ["fr", "en"],
      NZ: ["en", "mi"],
      NI: ["es", "en"],
      NE: ["fr", "en"],
      NG: ["en"],
      NU: ["en", "niu"],
      NF: ["en"],
      MK: ["mk", "sq", "en"],
      MP: ["en", "ch"],
      NO: ["no", "nb", "nn", "en"],
      OM: ["ar", "en"],
      PK: ["ur", "en"],
      PW: ["en", "pau", "jpn", "sov", "to", "fil", "zh"],
      PS: ["ar", "en"],
      PA: ["es", "en"],
      PG: ["en", "ho", "meu", "tpi"],
      PY: ["es", "gn", "en"],
      PE: ["es", "en"],
      PH: ["en", "fil"],
      PL: ["pl", "en"],
      PT: ["pt", "en"],
      PR: ["es", "en"],
      QA: ["ar", "en"],
      RO: ["ro", "en"],
      RU: ["ru", "en"],
      RW: ["rw", "en", "fr"],
      RE: ["fr", "en"],
      BL: ["fr", "en"],
      SH: ["en"],
      KN: ["en"],
      LC: ["en"],
      MF: ["fr", "en"],
      PM: ["fr", "en"],
      VC: ["en"],
      WS: ["sm", "en"],
      SM: ["it", "en"],
      ST: ["pt", "en"],
      SA: ["ar", "en"],
      SN: ["fr", "en"],
      RS: ["sr", "en"],
      SC: ["fr", "en"],
      SL: ["en"],
      SG: ["en", "ms", "ta", "zh"],
      SX: ["nl", "en"],
      SK: ["sk", "en"],
      SI: ["sl", "en"],
      SB: ["en"],
      SO: ["so", "ar", "en"],
      ZA: ["af", "en", "nr", "st", "ss", "tn", "ts", "ve", "xh", "zu"],
      KR: ["ko", "en"],
      SS: ["en"],
      ES: ["es", "ca", "eu", "gl", "en"],
      LK: ["si", "ta", "en"],
      SD: ["ar", "en"],
      SR: ["nl", "en"],
      SJ: ["no", "ru", "en"],
      SE: ["sv", "en"],
      CH: ["de", "fr", "it", "rm", "en"],
      SY: ["ar", "en"],
      TW: ["zh-TW", "en"],
      TJ: ["tg", "ru", "en"],
      TZ: ["sw", "en"],
      TH: ["th", "en"],
      TL: ["pt", "tet", "en"],
      TG: ["fr", "en"],
      TK: ["en"],
      TO: ["en", "to"],
      TT: ["en"],
      TN: ["ar", "fr", "en"],
      TR: ["tr", "en"],
      TM: ["tk", "ru", "en"],
      TC: ["en"],
      TV: ["en"],
      UG: ["en", "sw"],
      UA: ["uk", "ru", "en"],
      AE: ["ar", "en"],
      GB: ["en", "cy", "gd"],
      VI: ["en"],
      UY: ["es", "en"],
      UZ: ["uz", "ru", "en"],
      VU: ["bi", "en", "fr"],
      VA: ["it", "la", "en"],
      VE: ["es", "en"],
      VN: ["vi", "en"],
      WF: ["fr", "en"],
      EH: ["ar", "es", "fr", "en"],
      YE: ["ar", "en"],
      ZM: ["en"],
      ZW: ["en", "sn", "nd"],
    };
  }

  getLanguageNames() {
    return {
      af: "Afrikaans",
      ak: "Akan",
      sq: "Albanian",
      ws: "Samoa",
      am: "Amharic",
      ar: "Arabic",
      hy: "Armenian",
      az: "Azerbaijani",
      eu: "Basque",
      be: "Belarusian",
      bem: "Bemba",
      bn: "Bengali",
      bh: "Bihari",
      "xx-bork": "Bork, bork, bork!",
      bs: "Bosnian",
      br: "Breton",
      bg: "Bulgarian",
      bt: "Bhutanese",
      km: "Cambodian",
      ca: "Catalan",
      chr: "Cherokee",
      ny: "Chichewa",
      "zh-cn": "Chinese (Simplified)",
      "zh-tw": "Chinese (Traditional)",
      co: "Corsican",
      hr: "Croatian",
      cs: "Czech",
      da: "Danish",
      nl: "Dutch",
      "xx-elmer": "Elmer Fudd",
      en: "English",
      eo: "Esperanto",
      et: "Estonian",
      ee: "Ewe",
      fo: "Faroese",
      tl: "Filipino",
      fi: "Finnish",
      fr: "French",
      fy: "Frisian",
      gaa: "Ga",
      gl: "Galician",
      ka: "Georgian",
      de: "German",
      el: "Greek",
      kl: "Greenlandic",
      gn: "Guarani",
      gu: "Gujarati",
      "xx-hacker": "Hacker",
      ht: "Haitian Creole",
      ha: "Hausa",
      haw: "Hawaiian",
      iw: "Hebrew",
      he: "Hebrew",
      hi: "Hindi",
      hu: "Hungarian",
      is: "Icelandic",
      ig: "Igbo",
      id: "Indonesian",
      ia: "Interlingua",
      ga: "Irish",
      it: "Italian",
      ja: "Japanese",
      jw: "Javanese",
      kn: "Kannada",
      kk: "Kazakh",
      rw: "Kinyarwanda",
      rn: "Kirundi",
      "xx-klingon": "Klingon",
      kg: "Kongo",
      ko: "Korean",
      kri: "Krio (Sierra Leone)",
      ku: "Kurdish",
      ckb: "Kurdish (Soranî)",
      ky: "Kyrgyz",
      lo: "Laothian",
      la: "Latin",
      lv: "Latvian",
      ln: "Lingala",
      lt: "Lithuanian",
      loz: "Lozi",
      lg: "Luganda",
      ach: "Luo",
      mk: "Macedonian",
      mg: "Malagasy",
      ms: "Malay",
      ml: "Malayalam",
      mt: "Maltese",
      mv: "Maldives",
      mi: "Maori",
      mr: "Marathi",
      mfe: "Mauritian Creole",
      mo: "Moldavian",
      mn: "Mongolian",
      "sr-me": "Montenegrin",
      my: "Myanmar",
      ne: "Nepali",
      pcm: "Nigerian Pidgin",
      nso: "Northern Sotho",
      no: "Norwegian",
      nn: "Norwegian (Nynorsk)",
      oc: "Occitan",
      or: "Oriya",
      om: "Oromo",
      ps: "Pashto",
      fa: "Persian",
      "xx-pirate": "Pirate",
      pl: "Polish",
      pt: "Portuguese",
      "pt-br": "Portuguese (Brazil)",
      "pt-pt": "Portuguese (Portugal)",
      pa: "Punjabi",
      qu: "Quechua",
      ro: "Romanian",
      rm: "Romansh",
      nyn: "Runyakitara",
      ru: "Russian",
      gd: "Scots Gaelic",
      sr: "Serbian",
      sh: "Serbo-Croatian",
      st: "Sesotho",
      tn: "Setswana",
      crs: "Seychellois Creole",
      sn: "Shona",
      sd: "Sindhi",
      si: "Sinhalese",
      sk: "Slovak",
      sl: "Slovenian",
      so: "Somali",
      es: "Spanish",
      "es-419": "Spanish (Latin American)",
      su: "Sundanese",
      sw: "Swahili",
      sv: "Swedish",
      tg: "Tajik",
      ta: "Tamil",
      tt: "Tatar",
      te: "Telugu",
      th: "Thai",
      ti: "Tigrinya",
      to: "Tonga",
      lua: "Tshiluba",
      tum: "Tumbuka",
      tr: "Turkish",
      tk: "Turkmen",
      tw: "Twi",
      ug: "Uighur",
      uk: "Ukrainian",
      ur: "Urdu",
      uz: "Uzbek",
      vu: "Vanuatu",
      vi: "Vietnamese",
      cy: "Welsh",
      wo: "Wolof",
      xh: "Xhosa",
      yi: "Yiddish",
      yo: "Yoruba",
      zu: "Zulu"
    };
  }

  onRegionChange = () => {
    const region = this.regionSelect.value;
    if (region === this.lastRegion) return;
    this.lastRegion = region;
    this.renderLanguageOptions();
  };

  renderLanguageOptions = () => {
    const region = this.regionSelect.value.toUpperCase();
    let languages = this.regionLanguages[region] || ["en"];
    if (!languages.includes("en")) languages.push("en");
    languages = [...new Set(languages)];
    if (JSON.stringify(languages) === JSON.stringify(this.lastLanguages))
      return;
    this.lastLanguages = languages;
    const fragment = document.createDocumentFragment();
    for (const code of languages) {
      const option = document.createElement("option");
      option.value = code;
      option.textContent = this.languageNames[code] || code;
      fragment.appendChild(option);
    }
    this.languageSelect.innerHTML = "";
    this.languageSelect.appendChild(fragment);
  };

  applySelection = async () => {
    const region = this.regionSelect.value;
    const language = this.languageSelect.value;
    this.setStatus("Applying...", "loading");
    this.applyButton.disabled = true;
    try {
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });
      if (!tab.url.includes("google.")) {
        this.setStatus("Please navigate to a Google Search page.", "error");
        this.applyButton.disabled = false;
        return;
      }
      const url = new URL(tab.url);
      url.searchParams.set("gl", region);
      url.searchParams.set("hl", language);
      await chrome.tabs.update(tab.id, { url: url.toString() });
      this.setStatus("Region and language applied.", "success");
      const onTabUpdated = (updatedTabId, changeInfo, updatedTab) => {
        if (updatedTabId === tab.id && changeInfo.status === "complete") {
          chrome.tabs.onUpdated.removeListener(onTabUpdated);
          this.displayCurrentSettings();
        }
      };
      chrome.tabs.onUpdated.addListener(onTabUpdated);
    } catch (e) {
      this.setStatus("Error applying region/language.", "error");
    } finally {
      this.applyButton.disabled = false;
    }
  };

  setStatus = (message, type) => {
    if (this.status.textContent === message) return;
    this.status.textContent = message;
    this.status.className =
      "region-switcher__status region-switcher__status--" + (type || "info");
  };

  displayCurrentSettings = async () => {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    let lang = "Unknown";
    let region = "Unknown";
    if (tab?.url) {
      try {
        const url = new URL(tab.url);
        lang = url.searchParams.get("hl") ?? lang;
        region = url.searchParams.get("gl") ?? region;
        if (
          (!region || region === "Unknown") &&
          url.hostname.includes("google.")
        ) {
          const domainMap = {
            "google.com": "US",
            "google.co.uk": "GB",
            "google.ca": "CA",
            "google.com.au": "AU",
            "google.de": "DE",
            "google.fr": "FR",
            "google.it": "IT",
            "google.es": "ES",
            "google.co.jp": "JP",
            "google.co.kr": "KR",
            "google.com.br": "BR",
            "google.co.in": "IN",
            "google.com.mx": "MX",
            "google.ru": "RU",
            "google.nl": "NL",
            "google.se": "SE",
            "google.no": "NO",
            "google.dk": "DK",
            "google.fi": "FI",
            "google.pl": "PL",
            "google.cz": "CZ",
            "google.hu": "HU",
            "google.gr": "GR",
            "google.pt": "PT",
            "google.be": "BE",
            "google.at": "AT",
            "google.ch": "CH",
            "google.ie": "IE",
          };
          const found = Object.entries(domainMap).find(([domain]) =>
            url.hostname.endsWith(domain)
          );
          if (found) region = found[1];
        }
      } catch {}
    }
    let normalizedLang = (lang || "").toLowerCase().replace(/_/g, "-");
    let languageDisplay = this.languageNames[normalizedLang] || lang || "Unknown";
    let regionDisplay = region && region !== "Unknown" ? region.toUpperCase() : "Unknown";
    if (this.regionSelect && regionDisplay !== "Unknown") {
      this.regionSelect.value = regionDisplay;
      this.lastRegion = regionDisplay;
      this.renderLanguageOptions();
    }
    if (this.languageSelect && normalizedLang && normalizedLang !== "unknown") {
      this.languageSelect.value = normalizedLang;
    }
    if (!lang || lang === "Unknown") {
      try {
        const [tab] = await chrome.tabs.query({
          active: true,
          currentWindow: true,
        });
        chrome.tabs.sendMessage(
          tab.id,
          { action: "getHtmlLang" },
          (response) => {
            if (response && response.lang) {
              let htmlLang = (response.lang || "").toLowerCase().replace(/_/g, "-");
              this.languageLabel.textContent = this.languageNames[htmlLang] || response.lang || "Unknown";
              if (this.languageSelect && htmlLang && htmlLang !== "unknown") {
                this.languageSelect.value = htmlLang;
              }
            } else {
              this.languageLabel.textContent = "Unknown";
            }
          }
        );
      } catch {
        this.languageLabel.textContent = "Unknown";
      }
    } else {
      this.languageLabel.textContent = languageDisplay;
    }
    let regionName = null;
    if (this.regionSelect) {
      const selectedOption = Array.from(this.regionSelect.options).find(
        (opt) => opt.value.toUpperCase() === regionDisplay
      );
      if (selectedOption) {
        regionName = selectedOption.textContent.trim();
      }
    }
    this.regionLabel.textContent = regionName ? `${regionDisplay} (${regionName})` : regionDisplay;
  };
}

document.addEventListener("DOMContentLoaded", () => new RegionSwitcher());
