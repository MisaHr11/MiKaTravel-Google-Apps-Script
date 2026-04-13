//1348 function vytvorSeznamzeTabulky() uživetelské smlouvy
//cybí splatnost


function doGet(e) {
  removeAllExpiredTokens();
  try {
    const action = e.parameter.action;

    switch (action) {
      case "destinace":
        return createJsonResponse(destinace());

      case "vyhledejDestinace":
        return vyhledejDestinace(e);

      case "informaceOhotelu":
        return informaceOhotelu(e);

      case "cenaPokoj":
        return cenaPokoj(e);

      case "cenaCelkem":
        return createJsonResponse(cenaCelkem(e));

      case "sluzby":
        return sluzby();

      default:
        return createJsonResponse({ success: false, error: "Neplatná akce 😵‍💫" });
    }
  } catch (err) {
    return createJsonResponse({ success: false, error: err.toString() });
  }
}

function doPost(e) {
  removeAllExpiredTokens();
  try {
    const contents = e.postData?.getDataAsString() || '{}';
    const body = JSON.parse(contents);

    if (body.action === "login") {
      return createJsonResponse(login(body.username, body.password));
    }

    else if (body.action === "motiv") {
      return motiv(body);
    }

    else if (body.action === "token_karta") {
      return token_karta(body);
    }

    else if (body.action === "token_uzivatel") {
      return createJsonResponse(token_uzivatel(body));
    }

    else if (body.action === "posli_karty_uzivatele") {
            const debugInfob = {
        headers: e.headers || {},
        bodyRaw: contents,
        token: null
      };

      // Načtení tokenu z těla requestu
      debugInfob.token = body.secureTokenbanka || null;

      Logger.log("Token z body: %s", debugInfob.token);

      // --- Kontrola tokenu ---
      if (!debugInfob.token) {
        return createJsonResponse({
          success: false,
          error: "Token chybí banka",
          debug: debugInfob
        });
      }

      const tokenDatab = getTokenByValue(debugInfob.token, 60);

      if (!tokenDatab || tokenDatab.service !== "bankovnictvi") {
        return createJsonResponse({
          success: false,
          error: "Neplatný nebo neautorizovaný token banka",
          debug: tokenDatab.service
        });
      }

      const usernameb = tokenDatab.username;

      return createJsonResponse({success: true, karty: posli_karty_uzivatele(usernameb)});
    }

    else if (body.action === "overeni_darkovy_kod") {
      return createJsonResponse(overeni_darkovy_kod(body));
    }

    else if (body.action === "koloStesti") {
      // --- Debug info jen pro objednávku ---
      const debugInfo = {
        headers: e.headers || {},
        bodyRaw: contents,
        token: null
      };

      // Načtení tokenu z těla requestu
      debugInfo.token = body.secureToken || null;

      Logger.log("Token z body: %s", debugInfo.token);

      // --- Kontrola tokenu ---
      if (!debugInfo.token) {
        return createJsonResponse({
          success: false,
          error: "Token chybí",
          debug: debugInfo
        });
      }

      const tokenData = getTokenByValue(debugInfo.token, 60);

      if (!tokenData || tokenData.service !== "secure") {
        return createJsonResponse({
          success: false,
          error: "Neplatný nebo neautorizovaný token",
          debug: debugInfo
        });
      }

      const username = tokenData.username;

      // --- Zpracování objednávky ---
      return createJsonResponse(generujVyhruProUzivatele(username));
    }

    else if (body.action === "nacteniKoduLetiste") {
      // --- Debug info jen pro objednávku ---
      const debugInfo = {
        headers: e.headers || {},
        bodyRaw: contents,
        token: null
      };

      // Načtení tokenu z těla requestu
      debugInfo.token = body.secureToken || null;

      Logger.log("Token z body: %s", debugInfo.token);

      // --- Kontrola tokenu ---
      if (!debugInfo.token) {
        return createJsonResponse({
          success: false,
          error: "Token chybí",
          debug: debugInfo
        });
      }

      const tokenData = getTokenByValue(debugInfo.token, 60);

      if (!tokenData || tokenData.service !== "secure") {
        return createJsonResponse({
          success: false,
          error: "Neplatný nebo neautorizovaný token",
          debug: debugInfo
        });
      }

      const username = tokenData.username;

      // --- Zpracování objednávky ---
      return createJsonResponse(nacteniKoduLetiste(username, body));
    }

    else if (body.action === "nacteniKoduHotel") {
      // --- Debug info jen pro objednávku ---
      const debugInfo = {
        headers: e.headers || {},
        bodyRaw: contents,
        token: null
      };

      // Načtení tokenu z těla requestu
      debugInfo.token = body.secureToken || null;

      Logger.log("Token z body: %s", debugInfo.token);

      // --- Kontrola tokenu ---
      if (!debugInfo.token) {
        return createJsonResponse({
          success: false,
          error: "Token chybí",
          debug: debugInfo
        });
      }

      const tokenData = getTokenByValue(debugInfo.token, 60);

      if (!tokenData || tokenData.service !== "secure") {
        return createJsonResponse({
          success: false,
          error: "Neplatný nebo neautorizovaný token",
          debug: debugInfo
        });
      }

      const username = tokenData.username;

      // --- Zpracování objednávky ---
      return createJsonResponse(nacteniKoduHotel(username, body));
    }

    else if (body.action === "zatoceniKoloStesti") {
      // --- Debug info jen pro objednávku ---
      const debugInfo = {
        headers: e.headers || {},
        bodyRaw: contents,
        token: null
      };

      // Načtení tokenu z těla requestu
      debugInfo.token = body.secureToken || null;

      Logger.log("Token z body: %s", debugInfo.token);

      // --- Kontrola tokenu ---
      if (!debugInfo.token) {
        return createJsonResponse({
          success: false,
          error: "Token chybí",
          debug: debugInfo
        });
      }

      const tokenData = getTokenByValue(debugInfo.token, 60);

      if (!tokenData || tokenData.service !== "secure") {
        return createJsonResponse({
          success: false,
          error: "Neplatný nebo neautorizovaný token",
          debug: debugInfo
        });
      }

      const username = tokenData.username;

      // --- Zpracování objednávky ---
      return createJsonResponse(spinsKoloStesti(username));
    }
  
    else if (body.action === "sprava_uzivatelu_vytvoritupravitsmazat") {
      // --- Debug info jen pro objednávku ---
      const debugInfo = {
        headers: e.headers || {},
        bodyRaw: contents,
        token: null
      };

      // Načtení tokenu z těla requestu
      debugInfo.token = body.secureToken || null;

      Logger.log("Token z body: %s", debugInfo.token);

      // --- Kontrola tokenu ---
      if (!debugInfo.token) {
        return createJsonResponse({
          success: false,
          error: "Token chybí",
          debug: debugInfo
        });
      }

      const tokenData = getTokenByValue(debugInfo.token, 60);

      if (!tokenData || tokenData.service !== "secure") {
        return createJsonResponse({
          success: false,
          error: "Neplatný nebo neautorizovaný token",
          debug: debugInfo
        });
      }

      const username = tokenData.username;

      // --- Zpracování objednávky ---
      return createJsonResponse(sprava_uzivatelu_vytvoritupravitsmazat(username, body));
    }

    else if (body.action === "darkove_kody") {
      // --- Debug info jen pro objednávku ---
      const debugInfo = {
        headers: e.headers || {},
        bodyRaw: contents,
        token: null
      };

      // Načtení tokenu z těla requestu
      debugInfo.token = body.secureToken || null;

      Logger.log("Token z body: %s", debugInfo.token);

      // --- Kontrola tokenu ---
      if (!debugInfo.token) {
        return createJsonResponse({
          success: false,
          error: "Token chybí",
          debug: debugInfo
        });
      }

      const tokenData = getTokenByValue(debugInfo.token, 60);

      if (!tokenData || tokenData.service !== "secure") {
        return createJsonResponse({
          success: false,
          error: "Neplatný nebo neautorizovaný token",
          debug: debugInfo
        });
      }

      const username = tokenData.username;

      // --- Zpracování objednávky ---
      return createJsonResponse(darkove_kody(username, body));
    }


    else if (body.action === "zobrazeni_uzivatelu") {
      // --- Debug info jen pro objednávku ---
      const debugInfo = {
        headers: e.headers || {},
        bodyRaw: contents,
        token: null
      };

      // Načtení tokenu z těla requestu
      debugInfo.token = body.secureToken || null;

      Logger.log("Token z body: %s", debugInfo.token);

      // --- Kontrola tokenu ---
      if (!debugInfo.token) {
        return createJsonResponse({
          success: false,
          error: "Token chybí",
          debug: debugInfo
        });
      }

      const tokenData = getTokenByValue(debugInfo.token, 60);

      if (!tokenData || tokenData.service !== "secure") {
        return createJsonResponse({
          success: false,
          error: "Neplatný nebo neautorizovaný token",
          debug: debugInfo
        });
      }

      const username = tokenData.username;

      // --- Zpracování objednávky ---
      return createJsonResponse(zobrazeni_uzivatelu(username, body));
    }

    else if (body.action === "zmena_roli_uzivatelu") {
      // --- Debug info jen pro objednávku ---
      const debugInfo = {
        headers: e.headers || {},
        bodyRaw: contents,
        token: null
      };

      // Načtení tokenu z těla requestu
      debugInfo.token = body.secureToken || null;

      Logger.log("Token z body: %s", debugInfo.token);

      // --- Kontrola tokenu ---
      if (!debugInfo.token) {
        return createJsonResponse({
          success: false,
          error: "Token chybí",
          debug: debugInfo
        });
      }

      const tokenData = getTokenByValue(debugInfo.token, 60);

      if (!tokenData || tokenData.service !== "secure") {
        return createJsonResponse({
          success: false,
          error: "Neplatný nebo neautorizovaný token",
          debug: debugInfo
        });
      }

      const username = tokenData.username;

      // --- Zpracování objednávky ---
      return createJsonResponse(zmena_roli_uzivatelu(username, body));
    }

    else if (body.action === "zobrazeni_objednavek") {
      // --- Debug info jen pro objednávku ---
      const debugInfo = {
        headers: e.headers || {},
        bodyRaw: contents,
        token: null
      };

      // Načtení tokenu z těla requestu
      debugInfo.token = body.secureToken || null;

      Logger.log("Token z body: %s", debugInfo.token);

      // --- Kontrola tokenu ---
      if (!debugInfo.token) {
        return createJsonResponse({
          success: false,
          error: "Token chybí",
          debug: debugInfo
        });
      }

      const tokenData = getTokenByValue(debugInfo.token, 60);

      if (!tokenData || tokenData.service !== "secure") {
        return createJsonResponse({
          success: false,
          error: "Neplatný nebo neautorizovaný token",
          debug: debugInfo
        });
      }

      const username = tokenData.username;

      // --- Zpracování objednávky ---
      return createJsonResponse(zobrazeni_objednavek(username, body));
    }

    else if (body.action === "uprava_objednavek") {
      // --- Debug info jen pro objednávku ---
      const debugInfo = {
        headers: e.headers || {},
        bodyRaw: contents,
        token: null
      };

      // Načtení tokenu z těla requestu
      debugInfo.token = body.secureToken || null;

      Logger.log("Token z body: %s", debugInfo.token);

      // --- Kontrola tokenu ---
      if (!debugInfo.token) {
        return createJsonResponse({
          success: false,
          error: "Token chybí",
          debug: debugInfo
        });
      }

      const tokenData = getTokenByValue(debugInfo.token, 60);

      if (!tokenData || tokenData.service !== "secure") {
        return createJsonResponse({
          success: false,
          error: "Neplatný nebo neautorizovaný token",
          debug: debugInfo
        });
      }

      const username = tokenData.username;

      // --- Zpracování objednávky ---
      return createJsonResponse(uprava_objednavek(username, body));
    }

    else if (body.action === "schvalovani_objednavek") {
      // --- Debug info jen pro objednávku ---
      const debugInfo = {
        headers: e.headers || {},
        bodyRaw: contents,
        token: null
      };

      // Načtení tokenu z těla requestu
      debugInfo.token = body.secureToken || null;

      Logger.log("Token z body: %s", debugInfo.token);

      // --- Kontrola tokenu ---
      if (!debugInfo.token) {
        return createJsonResponse({
          success: false,
          error: "Token chybí",
          debug: debugInfo
        });
      }

      const tokenData = getTokenByValue(debugInfo.token, 60);

      if (!tokenData || tokenData.service !== "secure") {
        return createJsonResponse({
          success: false,
          error: "Neplatný nebo neautorizovaný token",
          debug: debugInfo
        });
      }

      const username = tokenData.username;

      // --- Zpracování objednávky ---
      return createJsonResponse(schvalovani_objednavek(username, body));
    }

    else if (body.action === "zobrazeni_uzivatelskych_utrat") {
      // --- Debug info jen pro objednávku ---
      const debugInfo = {
        headers: e.headers || {},
        bodyRaw: contents,
        token: null
      };

      // Načtení tokenu z těla requestu
      debugInfo.token = body.secureToken || null;

      Logger.log("Token z body: %s", debugInfo.token);

      // --- Kontrola tokenu ---
      if (!debugInfo.token) {
        return createJsonResponse({
          success: false,
          error: "Token chybí",
          debug: debugInfo
        });
      }

      const tokenData = getTokenByValue(debugInfo.token, 60);

      if (!tokenData || tokenData.service !== "secure") {
        return createJsonResponse({
          success: false,
          error: "Neplatný nebo neautorizovaný token",
          debug: debugInfo
        });
      }

      const username = tokenData.username;

      // --- Zpracování objednávky ---
      return createJsonResponse(zobrazeni_uzivatelskych_utrat(username, body));
    }


    else if (body.action === "sprava_uzivatelskych_utrat") {
      // --- Debug info jen pro objednávku ---
      const debugInfo = {
        headers: e.headers || {},
        bodyRaw: contents,
        token: null
      };

      // Načtení tokenu z těla requestu
      debugInfo.token = body.secureToken || null;

      Logger.log("Token z body: %s", debugInfo.token);

      // --- Kontrola tokenu ---
      if (!debugInfo.token) {
        return createJsonResponse({
          success: false,
          error: "Token chybí",
          debug: debugInfo
        });
      }

      const tokenData = getTokenByValue(debugInfo.token, 60);

      if (!tokenData || tokenData.service !== "secure") {
        return createJsonResponse({
          success: false,
          error: "Neplatný nebo neautorizovaný token",
          debug: debugInfo
        });
      }

      const username = tokenData.username;

      // --- Zpracování objednávky ---
      return createJsonResponse(sprava_uzivatelskych_utrat(username, body));
    }

    else if (body.action === "odesilani_newsletteru") {
      // --- Debug info jen pro objednávku ---
      const debugInfo = {
        headers: e.headers || {},
        bodyRaw: contents,
        token: null
      };

      // Načtení tokenu z těla requestu
      debugInfo.token = body.secureToken || null;

      Logger.log("Token z body: %s", debugInfo.token);

      // --- Kontrola tokenu ---
      if (!debugInfo.token) {
        return createJsonResponse({
          success: false,
          error: "Token chybí",
          debug: debugInfo
        });
      }

      const tokenData = getTokenByValue(debugInfo.token, 60);

      if (!tokenData || tokenData.service !== "secure") {
        return createJsonResponse({
          success: false,
          error: "Neplatný nebo neautorizovaný token",
          debug: debugInfo
        });
      }

      const username = tokenData.username;

      // --- Zpracování objednávky ---
      return createJsonResponse(odesilani_newsletteru(username, body));
    }

    else if (body.action === "sprava_letu") {
      // --- Debug info jen pro objednávku ---
      const debugInfo = {
        headers: e.headers || {},
        bodyRaw: contents,
        token: null
      };

      // Načtení tokenu z těla requestu
      debugInfo.token = body.secureToken || null;

      Logger.log("Token z body: %s", debugInfo.token);

      // --- Kontrola tokenu ---
      if (!debugInfo.token) {
        return createJsonResponse({
          success: false,
          error: "Token chybí",
          debug: debugInfo
        });
      }

      const tokenData = getTokenByValue(debugInfo.token, 60);

      if (!tokenData || tokenData.service !== "secure") {
        return createJsonResponse({
          success: false,
          error: "Neplatný nebo neautorizovaný token",
          debug: debugInfo
        });
      }

      const username = tokenData.username;

      // --- Zpracování objednávky ---
      return createJsonResponse(sprava_letu(username, body));
    }
    

    

    else if (body.action === "posli_utraty_uzivatele") {
      const debugInfob = {
        headers: e.headers || {},
        bodyRaw: contents,
        token: null
      };

      // Načtení tokenu z těla requestu
      debugInfob.token = body.secureTokenbanka || null;

      Logger.log("Token z body: %s", debugInfob.token);

      // --- Kontrola tokenu ---
      if (!debugInfob.token) {
        return createJsonResponse({
          success: false,
          error: "Token chybí banka",
          debug: debugInfob
        });
      }

      const tokenDatab = getTokenByValue(debugInfob.token, 60);

      if (!tokenDatab || tokenDatab.service !== "bankovnictvi") {
        return createJsonResponse({
          success: false,
          error: "Neplatný nebo neautorizovaný token banka",
          debug: tokenDatab.service
        });
      }

      const usernameb = tokenDatab.username;

      return createJsonResponse(posli_utraty_uzivatele(usernameb, body));
    }

    else if (body.action === "posli_utraty_uzivatele") {
      const debugInfob = {
        headers: e.headers || {},
        bodyRaw: contents,
        token: null
      };

      // Načtení tokenu z těla requestu
      debugInfob.token = body.secureTokenbanka || null;

      Logger.log("Token z body: %s", debugInfob.token);

      // --- Kontrola tokenu ---
      if (!debugInfob.token) {
        return createJsonResponse({
          success: false,
          error: "Token chybí banka",
          debug: debugInfob
        });
      }

      const tokenDatab = getTokenByValue(debugInfob.token, 60);

      if (!tokenDatab || tokenDatab.service !== "bankovnictvi") {
        return createJsonResponse({
          success: false,
          error: "Neplatný nebo neautorizovaný token banka",
          debug: tokenDatab.service
        });
      }

      const usernameb = tokenDatab.username;

      return createJsonResponse(posli_utraty_uzivatele(usernameb, body));
    }

    else if (body.action === "odeslat_objednavku") {
      // --- Debug info jen pro objednávku ---
      const debugInfo = {
        headers: e.headers || {},
        bodyRaw: contents,
        token: null
      };

      // Načtení tokenu z těla requestu
      debugInfo.token = body.secureToken || null;

      Logger.log("Token z body: %s", debugInfo.token);

      // --- Kontrola tokenu ---
      if (!debugInfo.token) {
        return createJsonResponse({
          success: false,
          error: "Token chybí",
          debug: debugInfo
        });
      }

      const tokenData = getTokenByValue(debugInfo.token, 60);

      if (!tokenData || tokenData.service !== "secure") {
        return createJsonResponse({
          success: false,
          error: "Neplatný nebo neautorizovaný token",
          debug: debugInfo
        });
      }

      const username = tokenData.username;

      // --- Zpracování objednávky ---
      return odeslat_objednavku(body, username, debugInfo);
    }

    else if (body.action === "smlouva") {
      // --- Debug info jen pro objednávku ---
      const debugInfo = {
        headers: e.headers || {},
        bodyRaw: contents,
        token: null
      };

      // Načtení tokenu z těla requestu
      debugInfo.token = body.secureToken || null;

      Logger.log("Token z body: %s", debugInfo.token);

      // --- Kontrola tokenu ---
      if (!debugInfo.token) {
        return createJsonResponse({
          success: false,
          error: "Token chybí",
          debug: debugInfo
        });
      }

      const tokenData = getTokenByValue(debugInfo.token, 60);

      if (!tokenData || tokenData.service !== "secure") {
        return createJsonResponse({
          success: false,
          error: "Neplatný nebo neautorizovaný token",
          debug: debugInfo
        });
      }

      const username = tokenData.username;

      return generatePdf(body,username);
    }

    else if (body.action === "podpis") {
      // --- Debug info jen pro objednávku ---
      const debugInfo = {
        headers: e.headers || {},
        bodyRaw: contents,
        token: null
      };

      // Načtení tokenu z těla requestu
      debugInfo.token = body.secureToken || null;

      Logger.log("Token z body: %s", debugInfo.token);

      // --- Kontrola tokenu ---
      if (!debugInfo.token) {
        return createJsonResponse({
          success: false,
          error: "Token chybí",
          debug: debugInfo
        });
      }

      const tokenData = getTokenByValue(debugInfo.token, 60);

      if (!tokenData || tokenData.service !== "secure") {
        return createJsonResponse({
          success: false,
          error: "Neplatný nebo neautorizovaný token",
          debug: debugInfo
        });
      }

      const username = tokenData.username;

      return vytvorPodepsanouSmlouvu(body,username);
    }

    else if (body.action === "email_banka"){
      // --- Debug info jen pro objednávku ---
      const debugInfo = {
        headers: e.headers || {},
        bodyRaw: contents,
        token: null
      };

      // Načtení tokenu z těla requestu
      debugInfo.token = body.secureToken || null;

      Logger.log("Token z body: %s", debugInfo.token);

      // --- Kontrola tokenu ---
      if (!debugInfo.token) {
        return createJsonResponse({
          success: false,
          error: "Token chybí",
          debug: debugInfo
        });
      }

      const tokenData = getTokenByValue(debugInfo.token, 60);

      if (!tokenData || tokenData.service !== "secure") {
        return createJsonResponse({
          success: false,
          error: "Neplatný nebo neautorizovaný token",
          debug: debugInfo
        });
      }

      const username = tokenData.username;

      return createJsonResponse(email_banka(body, username));
    }

    else if (body.action === "role"){
      // --- Debug info jen pro objednávku ---
      const debugInfo = {
        headers: e.headers || {},
        bodyRaw: contents,
        token: null
      };

      // Načtení tokenu z těla requestu
      debugInfo.token = body.secureToken || null;

      Logger.log("Token z body: %s", debugInfo.token);

      // --- Kontrola tokenu ---
      if (!debugInfo.token) {
        return createJsonResponse({
          success: false,
          error: "Token chybí",
          debug: debugInfo
        });
      }

      const tokenData = getTokenByValue(debugInfo.token, 60);

      if (!tokenData || tokenData.service !== "secure") {
        return createJsonResponse({
          success: false,
          error: "Neplatný nebo neautorizovaný token",
          debug: debugInfo
        });
      }

      const username = tokenData.username;

      return createJsonResponse(role(username));
    }

    else if (body.action === "prihlaseni_banka"){
      // --- Debug info jen pro objednávku ---
      const debugInfo = {
        headers: e.headers || {},
        bodyRaw: contents,
        token: null
      };

      // Načtení tokenu z těla requestu
      debugInfo.token = body.secureToken || null;

      Logger.log("Token z body: %s", debugInfo.token);

      // --- Kontrola tokenu ---
      if (!debugInfo.token) {
        return createJsonResponse({
          success: false,
          error: "Token chybí",
          debug: debugInfo
        });
      }

      const tokenData = getTokenByValue(debugInfo.token, 60);

      if (!tokenData || tokenData.service !== "secure") {
        return createJsonResponse({
          success: false,
          error: "Neplatný nebo neautorizovaný token",
          debug: debugInfo
        });
      }

      const username = tokenData.username;

      return createJsonResponse(prihlaseni_banka(body, username));
    }

    else if (body.action === "odeslat_platbu") {
            // --- Debug info jen pro objednávku ---
      const debugInfo = {
        headers: e.headers || {},
        bodyRaw: contents,
        token: null
      };

      // Načtení tokenu z těla requestu
      debugInfo.token = body.secureToken || null;

      Logger.log("Token z body: %s", debugInfo.token);

      // --- Kontrola tokenu ---
      if (!debugInfo.token) {
        return createJsonResponse({
          success: false,
          error: "Token chybí",
          debug: debugInfo
        });
      }

      const tokenData = getTokenByValue(debugInfo.token, 60);

      if (!tokenData || tokenData.service !== "secure") {
        return createJsonResponse({
          success: false,
          error: "Neplatný nebo neautorizovaný token",
          debug: debugInfo
        });
      }

      const username = tokenData.username;

            // --- Debug info jen pro objednávku ---
      const debugInfob = {
        headers: e.headers || {},
        bodyRaw: contents,
        token: null
      };

      // Načtení tokenu z těla requestu
      debugInfob.token = body.secureTokenbanka || null;

      Logger.log("Token z body: %s", debugInfob.token);

      // --- Kontrola tokenu ---
      if (!debugInfob.token) {
        return createJsonResponse({
          success: false,
          error: "Token chybí banka",
          debug: debugInfob
        });
      }

      const tokenDatab = getTokenByValue(debugInfob.token, 60);

      if (!tokenDatab || tokenDatab.service !== "bankovnictvi") {
        return createJsonResponse({
          success: false,
          error: "Neplatný nebo neautorizovaný token banka",
          debug: tokenDatab.service
        });
      }

      const usernameb = tokenDatab.username;

      
      return createJsonResponse(pridej_utratu(username, usernameb, body));

      //return createJsonResponse({sucess: true, username: username, usernameb: tokenDatab})
    }


    else if (body.action === "logout") {
      // --- Debug info jen pro objednávku ---
      const debugInfo = {
        headers: e.headers || {},
        bodyRaw: contents,
        token: null
      };

      // Načtení tokenu z těla requestu
      debugInfo.token = body.secureToken || null;

      Logger.log("Token z body: %s", debugInfo.token);

      // --- Kontrola tokenu ---
      if (!debugInfo.token) {
        return createJsonResponse({
          success: false,
          error: "Token chybí",
          debug: debugInfo
        });
      }

      const tokenData = getTokenByValue(debugInfo.token, 60);

      if (!tokenData || tokenData.service !== "secure") {
        return createJsonResponse({
          success: false,
          error: "Neplatný nebo neautorizovaný token",
          debug: debugInfo
        });
      }

      const username = tokenData.username;

      // --- Zpracování objednávky ---
      return createJsonResponse(logout(username));
    }






    else if (body.action === "post") {
      let username = null;
      let usernameb = null;

      // --- hlavní token ---
      const tokenData = getTokenByValue(body.secureToken, 60);

      if (!tokenData || tokenData.service !== "secure") {
        Logger.log("Hlavní token neplatný nebo chybí");
      } else {
        username = tokenData.username;
      }

      // --- bankovní token ---
      const tokenDatab = getTokenByValue(body.secureTokenbanka, 60);

      if (!tokenDatab || tokenDatab.service !== "bankovnictvi") {
        Logger.log("Bankovní token neplatný nebo chybí");
      } else {
        usernameb = tokenDatab.username;
      }

      // --- vždy zavolá post ---
      return createJsonResponse(
        post(username, usernameb, body.id)
      );
    }

    return createJsonResponse({ success: false, error: "Neplatná akce" });

  } catch (err) {
    return createJsonResponse({
      success: false,
      error: {
        name: err.name,
        message: err.message,
        stack: err.stack,
        // pokud existují další vlastnosti
        ...err
      }
    });

  }
}

// Funkce pro získání tokenu z cookie
function getTokenFromCookie(e) {
  const cookieHeader = e && e.headers && (e.headers.Cookie || e.headers.cookie);
  if (!cookieHeader) return null;
  const match = cookieHeader.match(/secureToken=([^;]+)/);
  return match ? match[1] : null;
}



function login(username, password) {
  try {
    if (!username || !password) {
      return { success: false, error: "Chybí přihlašovací údaje" };
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName("Uživatelé");
    if (!sheet) return { success: false, error: "List 'Uživatelé' nenalezen" };

    const data = sheet.getDataRange().getValues();

    for (let i = 0; i < data.length; i++) {
      const [user, storedHash, role] = data[i];
      if (user !== username) continue;

      const inputHash = hashPassword(password);
      if (("hashed$" + inputHash) === storedHash) {
        const displayToken = generateToken();
        const secureToken = generateToken();

        saveTokenWithExpiry(username, "display", displayToken, 7200);
        saveTokenWithExpiry(username, "secure", secureToken, 432000);

        return {
          success: true,
          username: user,
          role: role,
          displayToken,
          secureToken
        };
      }
    }

    return { success: false, error: "Neplatné přihlašovací údaje" };
  } catch (err) {
    console.error("Login error:", err);
    return { success: false, error: "Chyba při přihlášení" };
  }
}

function logout(username) {
  getTokensByUsernameAndDelete(username);

  return {success: true, response: "Smazáno"};
}

function createJsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}




function handleSensitiveData(e) {
  const token = e.parameter.token || getTokenFromCookie(e);
  if (!token) return createJsonResponse({ success: false, error: "Token chybí" });

  const username = getUsernameFromToken(token, "secure");
  if (!username) return createJsonResponse({ success: false, error: "Neplatný token" });

  // prodloužení expirace tokenu o 7200 minut
  getTokenAndRefresh(username, "secure", 7200);

  return createJsonResponse({ success: true, username });
}


function generateToken(length = 32) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  for (let i = 0; i < length; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
}

/**
 * Testovací funkce: zjistí, jestli karta existuje v listu "Karty".
 * Očekávané pole v body: { number, name, expiry, cvv }
 */
function token_karta(body) {
  try {
    const { number, name, expiry, cvv } = body || {};

    if (!number) {
      return createJsonResponse({ success: false, error: "Chybí číslo karty" });
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName("Platební karty");
    if (!sheet) {
      return createJsonResponse({ success: false, error: "List 'Karty' nenalezen" });
    }

    // Načteme data
    const values = sheet.getDataRange().getValues();
    if (values.length < 2) {
      return createJsonResponse({ success: false, exists: false, message: "List neobsahuje žádné záznamy" });
    }

    // Najdeme indexy sloupců podle hlavičky (první řádek)
    const header = values[0].map(h => String(h || "").trim());
    const idxDrzitel = header.indexOf("Držitel");
    const idxCislo = header.indexOf("Číslo karty");
    const idxPlatnost = header.indexOf("Platnost");
    const idxCVV = header.indexOf("CVV");

    if (idxCislo === -1) {
      return createJsonResponse({ success: false, error: "Sloupec 'Číslo karty' nebyl nalezen v hlavičce" });
    }

    // Normalizace vstupu pro porovnání
    const norm = s => (s || "").toString().replace(/\s+/g, "").toUpperCase();
    const searchNumber = norm(number);
    const searchName = (name || "").toString().trim().toUpperCase();
    const searchExpiry = (expiry || "").toString().trim();
    const searchCvv = (cvv || "").toString().trim();

    // Projdeme řádky a hledáme shodu
    for (let r = 1; r < values.length; r++) {
      const row = values[r];
      const rowNumber = norm(row[idxCislo]);
      if (rowNumber !== searchNumber) continue; // číslo musí sedět

      // pokud máme v requestu další údaje, ověříme je (jinak je ignorujeme)
      let ok = true;
      if (idxDrzitel !== -1 && searchName) {
        const rowName = (row[idxDrzitel] || "").toString().trim().toUpperCase();
        if (rowName !== searchName) ok = false;
      }
      if (idxPlatnost !== -1 && searchExpiry) {
        const rowExpiry = (row[idxPlatnost] || "").toString().trim();
        if (rowExpiry !== searchExpiry) ok = false;
      }
      if (idxCVV !== -1 && searchCvv) {
        const rowCvv = (row[idxCVV] || "").toString().trim();
        if (rowCvv !== searchCvv) ok = false;
      }

      if (!ok) continue;

      // Karta nalezena — vygenerujeme token a uložíme jej (pokud máte saveTokenWithExpiry)
      const token = Utilities.getUuid();
      const cardData = `${number}-${name || ""}-${expiry || ""}-${cvv || ""}`;

      // Uložit token (pokud chcete jen testovat existenci, můžete tento řádek zakomentovat)
      if (typeof saveTokenWithExpiry === "function") {
        saveTokenWithExpiry(cardData, "karta", token, 10); // platnost 10 minut
      }

      // Vrátíme úspěch s detailem (řádek +1 pro lidské čtení, protože indexujeme od 0)
      return createJsonResponse({
        success: true,
        exists: true,
        token: token,
        foundRow: r + 1,
        message: "Karta nalezena"
      });
    }

    // Pokud jsme došli sem, karta nenalezena
    return createJsonResponse({ success: false, exists: false, message: "Karta v tabulce nenalezena" });

  } catch (err) {
    return createJsonResponse({ success: false, error: err.toString() });
  }
}

function getUserInfo(username) {
  if (!username) return { success: false, error: "Nezadáno uživatelské jméno" };

  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName("Uživatelé");
    if (!sheet) return { success: false, error: "List 'Uživatelé' nenalezen" };

    const data = sheet.getDataRange().getValues();

    for (let i = 0; i < data.length; i++) {
      const [user, , role] = data[i]; // ignorujeme sloupec s heslem
      if (user === username) {
        return {
          success: true,
          username: user,
          role: role
        };
      }
    }

    return { success: false, error: "Uživatel nenalezen" };
  } catch (err) {
    console.error("Chyba při získávání informací o uživateli:", err);
    return { success: false, error: "Chyba při získávání informací" };
  }
}


function token_uzivatel(body) {
  const token = body.token;

  if (!token) {
    return {success: false, error: "Není zadán token"}
  }

  const response = getTokenByValue(token);
  const username = response.username;

  const info = getUserInfo(username); 

  return {success: true, info: info}
}

function parseDatumOdlet(datumInput) {
  if (!datumInput) return null;

  let datumStr;

  // pokud je datum objekt {od: "YYYY-MM-DD", do: "..."}
  if (typeof datumInput === "object" && datumInput.od) {
    datumStr = datumInput.od;
  } else if (typeof datumInput === "string") {
    datumStr = datumInput;
  } else {
    return null;
  }

  // zpracování DD.MM.YYYY
  if (datumStr.includes(".")) {
    const parts = datumStr.split(".");
    if (parts.length === 3) {
      const date = new Date(parts[2], parts[1]-1, parts[0]);
      return isNaN(date.getTime()) ? null : date;
    }
  }

  // fallback ISO YYYY-MM-DD
  const isoDate = new Date(datumStr);
  return isNaN(isoDate.getTime()) ? null : isoDate;
}

function vypocetSplatnosti(objednavka) {
  const dnes = new Date();
  const odletStr = objednavka?.informaceOhotelu?.datumy?.od;
  const odlet = parseDatumOdlet(odletStr);

  if (!odlet) {
    console.error("vypocetSplatnosti: Odlet není platný, nelze spočítat splatnosti", {
      odletStr,
      dnes: dnes.toISOString(),
    });
    return {
      error: "Neplatný datum odletu",
      odletStr,
      dnes: dnes.toISOString(),
    };
  }

  let zalohaSplatnost, doplatekSplatnost;

  const rozdilDni = (odlet - dnes) / (1000 * 60 * 60 * 24);
  if (rozdilDni <= 1) {
    zalohaSplatnost = odlet;
    doplatekSplatnost = odlet;
  } else {
    zalohaSplatnost = dnes;
    doplatekSplatnost = new Date(odlet);
  }

  const zalohaProcent = 20;
  let cenaCelkem;
  try {
    cenaCelkem = cenaCelkemParametry(
      objednavka.informaceOhotelu.hotel,
      objednavka.informaceOhotelu.strava,
      vypocetNoci(objednavka.informaceOhotelu.datumy),
      objednavka.informaceOhotelu.pokoje,
      objednavka.sluzby
    ).celkovaCena;
  } catch (e) {
    console.error("vypocetSplatnosti: Chyba při výpočtu ceny", e);
    return { error: "Chyba při výpočtu ceny", details: e.message };
  }

  const zalohaCastka = Math.round((zalohaProcent / 100) * cenaCelkem);
  const doplatekCastka = cenaCelkem - zalohaCastka;

  // bezpečné konverze dat
  const safeToISOString = (date) => {
    if (!date || isNaN(date.getTime())) return null;
    return date.toISOString().split("T")[0];
  };

  return {
    zaloha_procent: zalohaProcent,
    zaloha_castka: zalohaCastka,
    zaloha_splatnost: safeToISOString(zalohaSplatnost),
    doplatek_castka: doplatekCastka,
    doplatek_splatnost: safeToISOString(doplatekSplatnost),
    log: {
      dnes: dnes.toISOString(),
      odlet: odlet.toISOString(),
      rozdilDni,
    },
  };
}

function odeslat_objednavku(body, username) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("Objednávky");

  const objednavka = body.objednavka;

  // --- Generování čísla objednávky ---
  const datum = new Date();                 
  const rok = datum.getFullYear();          
  const mesic = String(datum.getMonth() + 1).padStart(2, "0"); 
  const den = String(datum.getDate()).padStart(2, "0");        

  const prefix = `ES-${rok}-${mesic}${den}-`;  // ES-2026-0803-

  // Získání všech čísel objednávek ze sloupce A
  const data = sheet.getRange("A2:A" + sheet.getLastRow()).getValues().flat();

  // Najdeme nejvyšší číslo pro aktuální rok
  let maxCislo = 0;
  data.forEach(val => {
    if (val && val.startsWith(`ES-${rok}-`)) {  // kontrola pouze pro aktuální rok
      const parts = val.split("-");
      const numPart = parseInt(parts[3], 10);   // poslední část = sekvenční číslo
      if (!isNaN(numPart) && numPart > maxCislo) maxCislo = numPart;
    }
  });

  // Nové číslo objednávky
  const noveCislo = (maxCislo + 1).toString().padStart(5, "0");
  const cisloObjednavky = prefix + noveCislo;

  console.log(cisloObjednavky);

  // --- Složená pole ---
  const celeJmeno   = [objednavka.jmeno, objednavka.prijmeni].filter(Boolean).join(" ");
  const adresaUlice = [objednavka.ulice, objednavka.cislo_popisne].filter(Boolean).join(" ");
  const adresaMesto = [objednavka.mesto, objednavka.psc].filter(Boolean).join(", ");
  let karta = null;

  if (objednavka.karta?.token) {
    const result = getTokenByValueAndDelete(objednavka.karta.token);
    if (result) {
      karta = result.username;
    }
    else {
      return createJsonResponse({
        success: false, 
        response: "Zkuste prosím zadat znovu platební kartu."
      });
    }
  }

  const noci = vypocetNoci(objednavka.informaceOhotelu.datumy);
  const cena = cenaCelkemParametry(objednavka.informaceOhotelu.hotel, objednavka.informaceOhotelu.strava, noci, objednavka.informaceOhotelu.pokoje, objednavka.sluzby, "", objednavka.kod, true);
  const zajezd = vytvorZajezdJson(objednavka, cena.celkovaCena);

  // Řádek pro uložení
  const rowData = [
    cisloObjednavky,                         // A - číslo objednávky
    username,                                // B - uživatelské jméno
    JSON.stringify(objednavka),              // C - celý JSON
    JSON.stringify(zajezd),
    celeJmeno,                               // D - jméno příjmení
    objednavka.telefon || "",                // E - telefon
    objednavka.email || "",                  // F - email
    objednavka.narozeni || "",               // G - datum narození
    adresaUlice,                             // H - ulice + čp
    adresaMesto,                             // I - město, PSČ
    karta,                                   // J - karta
    JSON.stringify(objednavka.sluzby || {}), // K - služby JSON
    JSON.stringify(objednavka.cestujici || {}), // L - cestující JSON
    JSON.stringify(cena),                     // M - cena celkem
    JSON.stringify(vypocetSplatnosti(objednavka)), // splatnost dodělat v aplikaci 
    cena.celkovaCena,                         // O - celková cena číslem
  ];

  sheet.appendRow(rowData);

  posliUpozorneniObjednavky(objednavka, cisloObjednavky);

  return createJsonResponse({
    success: true, 
    response: "uloženo"
  });
}

function vytvorZajezdJson(vstup, cena) {
  const info = najdiHotelInfo(vstup.informaceOhotelu.hotel);
  // Převod vstupních dat na strukturu zajezdu
  const zajezd = {
    destinace: info.destinace, // lze dynamicky dle potřeby
    hotel: {
      nazev: vstup.informaceOhotelu.hotel,
      kategorie: info.hodnoceni, // pokud je k dispozici kategorie, jinak pevně
      vybava: info.vybava // lze doplnit dynamicky
    },
    datum_od: formatDatum(vstup.informaceOhotelu.datumy.od),
    datum_do: formatDatum(vstup.informaceOhotelu.datumy.do),
    cena_celkova: cena,  // pevně, nebo spočítat z tabulky
    noci: vypocitejNoci(vstup.informaceOhotelu.datumy.od, vstup.informaceOhotelu.datumy.do),
    mena: "MiKa",
    stravovani: vstup.informaceOhotelu.strava
  };

  Logger.log(JSON.stringify({ zajezd: zajezd }, null, 2));
  return { zajezd: zajezd };
}

// Pomocná funkce na formátování datumu DD-MM-YYYY
function formatDatum(datumISO) {
  const d = new Date(datumISO);
  const dd = ("0" + d.getDate()).slice(-2);
  const mm = ("0" + (d.getMonth() + 1)).slice(-2);
  const yyyy = d.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
}

// Pomocná funkce pro výpočet počtu nocí
function vypocitejNoci(od, doDatum) {
  const d1 = new Date(od);
  const d2 = new Date(doDatum);
  const rozdil = (d2 - d1) / (1000 * 60 * 60 * 24);
  return rozdil;
}

function najdiHotelInfo(nazevHotelu) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("Hotely a destinace");
  if (!sheet) throw new Error("List 'Hotely a destinace' nebyl nalezen.");

  // Načtení všech dat
  const data = sheet.getDataRange().getValues();

  // První řádek = názvy sloupců
  const headers = data[0];
  const destinaceIndex = headers.indexOf("Destinace");
  const hotelIndex = headers.indexOf("Hotel");
  const hodnoceniIndex = headers.indexOf("Hodnocení");
  const aktivityIndex = headers.indexOf("Aktivity");

  if (destinaceIndex === -1 || hotelIndex === -1 || hodnoceniIndex === -1) {
    throw new Error("Sloupce 'Destinace', 'Hotel' nebo 'Hodnocení' nebyly nalezeny.");
  }

  // Procházení dat
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    if (row[hotelIndex] === nazevHotelu) {
      return {
        destinace: row[destinaceIndex],
        hodnoceni: row[hodnoceniIndex],
        vybava: row[aktivityIndex]
      };
    }
  }

  // Pokud hotel nebyl nalezen
  return null;
}




function vypocetNoci(datumy) {
  // datumy může být objekt {od, do} nebo pole objektů [{od, do}, ...]
  if (!datumy) throw new Error("Chybí datumy");

  // pokud je datumy jeden objekt, převést na pole
  const datumyArray = Array.isArray(datumy) ? datumy : [datumy];

  let totalNoci = 0;

  for (const d of datumyArray) {
    if (!d.od || !d.do) throw new Error("Chybí datumy v některém z období");

    const startDate = new Date(d.od);
    const endDate = new Date(d.do);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      throw new Error("Neplatné datumy");
    }

    const rozdilMs = endDate.getTime() - startDate.getTime();
    if (rozdilMs > 0) {
      totalNoci += Math.floor(rozdilMs / (1000 * 60 * 60 * 24));
    }
  }

  return totalNoci;
}


// SHA-256 hash a převod na hex
function hashPassword(password) {
  const digest = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, password);
  return digest.map(b => ("0" + (b & 0xFF).toString(16)).slice(-2)).join("");
}

function getUserByDisplayToken(token) {
  if (!token) return { success: false, error: "Token není zadán" };

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("Uživatelé");
  if (!sheet) return { success: false, error: "List 'Uživatelé' nenalezen" };

  const data = sheet.getDataRange().getValues();

  for (let i = 0; i < data.length; i++) {
    const [user, storedHash, role] = data[i];
    const userProperties = PropertiesService.getUserProperties();
    const storedTokenStr = userProperties.getProperty(user + "_display");
    if (!storedTokenStr) continue;

    try {
      const storedToken = JSON.parse(storedTokenStr);
      const expiry = new Date(storedToken.expires);
      if (storedToken.value === token && expiry > new Date()) {
        return { success: true, username: user, role: role };
      }
    } catch (e) {
      // Pokud by JSON byl poškozen, ignorujeme
      continue;
    }
  }

  return { success: false, error: "Neplatný nebo vypršelý token" };
}


function destinace() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("Hotely a destinace");
  if (!sheet) {
    return { success: false, error: "List 'Hotely a destinace' nenalezen" };
  }

  const data = sheet.getRange("A2:A" + sheet.getLastRow()).getValues(); // Přeskakuje hlavičku
  const destinaceSet = new Set();

  for (let i = 0; i < data.length; i++) {
    const nazev = data[i][0];
    if (nazev) {
      destinaceSet.add(nazev);
    }
  }

  return {
    success: true,
    destinace: Array.from(destinaceSet).sort()
  };
}


function vyhledejDestinace(e) {
  const vstup = e.parameter.destinace;
  let response = {};

  if (!vstup) {
    response = { success: false, error: "Chybí parametr 'destinace'" };
    return createJsonResponse(response);
  }

  let seznamDestinaci;
  try {
    seznamDestinaci = JSON.parse(vstup);
    if (!Array.isArray(seznamDestinaci)) {
      response = { success: false, error: "Parametr 'destinace' musí být pole" };
      return createJsonResponse(response);
    }
  } catch (err) {
    response = { success: false, error: "Parametr 'destinace' není validní JSON pole" };
    return createJsonResponse(response);
  }

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("Hotely a destinace");
  if (!sheet) {
    response = { success: false, error: "List 'Hotely a destinace' nenalezen" };
    return createJsonResponse(response);
  }

  const posledniRadek = sheet.getLastRow();
  if (posledniRadek < 2) {
    response = { success: true, nalezeno: 0, data: {} };
    return createJsonResponse(response);
  }

  // Načteme všechna data (předpokládáme 9 sloupců, upravte dle potřeby)
  const data = sheet.getRange(2, 1, posledniRadek - 1, 9).getValues();

  const vysledky = {};

  data.forEach(row => {
    const destinace = row[0];
    const hotelName = row[1];
    if (seznamDestinaci.includes(destinace)) {
      if (!vysledky[destinace]) {
        vysledky[destinace] = [];
      }
      vysledky[destinace].push({
        hotel: hotelName,
        aktivity: row[2],
        stravovani: row[3],
        hodnoceni: row[4],
        cena_za_pokoj_noc: row[5],
        cena_za_osobu_noc: row[6],
        cena_za_dite_noc: row[7],
        dnesni_sleva: row[8],
      });
    }
  });

  response = {
    success: true,
    nalezeno: Object.keys(vysledky).reduce((sum, k) => sum + vysledky[k].length, 0),
    data: vysledky
  };

  return createJsonResponse(response);
}

function informaceOhotelu(e) {
  const hotel = e.parameter.hotel;
  let response = {};

  if (!hotel) {
    response = { success: false, error: "Chybí parametr 'hotel'" };
    return createJsonResponse(response);
  }

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("Hotely a destinace");
  if (!sheet) {
    response = { success: false, error: "List 'Hotely a destinace' nenalezen" };
    return createJsonResponse(response);
  }

  const posledniRadek = sheet.getLastRow();
  if (posledniRadek < 2) {
    response = { success: false, error: "Žádná data k dispozici" };
    return createJsonResponse(response);
  }

  // Předpoklad: popis hotelu je ve sloupci 10
  const data = sheet.getRange(2, 1, posledniRadek - 1, 10).getValues();

  const hotelData = data.find(row => row[1] === hotel);

  if (!hotelData) {
    response = { success: false, error: `Hotel '${hotel}' nebyl nalezen` };
    return createJsonResponse(response);
  }

  response = {
    success: true,
    data: {
      destinace: hotelData[0],
      hotel: hotelData[1],
      aktivity: hotelData[2],
      stravovani: hotelData[3],
      hodnoceni: hotelData[4],
      cena_za_pokoj_noc: hotelData[5],
      cena_za_osobu_noc: hotelData[6],
      cena_za_dite_noc: hotelData[7],
      dnesni_sleva: hotelData[8],
      popis: hotelData[9] || ""
    }
  };

  return createJsonResponse(response);
}



function cenaPokoj(e) {
  const hotelParam = e.parameter.hotel;
  const dospeli = Number(e.parameter.dospeli) || 0;
  const dite = Number(e.parameter.dite) || 0;
  const noci = Number(e.parameter.noci) || 1;
  const stravovani = e.parameter.stravovani;

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const hotelSheet = ss.getSheetByName('Hotely a destinace');
  const stravovaniSheet = ss.getSheetByName('Stravování');

  const hotelData = hotelSheet.getDataRange().getValues();
  const stravovaniData = stravovaniSheet.getDataRange().getValues();

  // Najdeme hotel
  let hotelInfo = null;
  for (let i = 1; i < hotelData.length; i++) {
    if (hotelData[i][1] === hotelParam) {
      hotelInfo = {
        cenaPokoj: Number(hotelData[i][5]),   // Cena za pokoj/noc
        cenaDosp: Number(hotelData[i][6]),    // Cena za osobu/noc
        cenaDite: Number(hotelData[i][7]),    // Cena za dítě/noc
        sleva: Number(hotelData[i][8]) || 0,  // Sleva/Přirážka
        moznosti_stravovani: String(hotelData[i][3])
      };
      break;
    }
  }
  if (!hotelInfo) {
    return createJsonResponse({ error: 'Hotel nenalezen' });
  }

  // Ověření, zda je možnost stravování dostupná
  if (!hotelInfo.moznosti_stravovani.split(',').map(s => s.trim()).includes(stravovani)) {
    return createJsonResponse({ error: 'Tato možnost stravování neexistuje' });
  }

  // Najdeme procentuální přirážku za stravování (dospělý/dítě)
  let prirazkaDosp = 0;
  let prirazkaDite = 0;
  for (let i = 1; i < stravovaniData.length; i++) {
    if (String(stravovaniData[i][0]).trim().toLowerCase() === stravovani.trim().toLowerCase()) {
      prirazkaDosp = Number(stravovaniData[i][1]) || 0; // Podíl ceny dospělého
      prirazkaDite = Number(stravovaniData[i][2]) || 0; // Podíl ceny dítěte
      break;
    }
  }

  // Sleva/přirážka pouze na pokoj
  const cenaPokojSleva = hotelInfo.cenaPokoj * (1 + hotelInfo.sleva);

  // Cena za dospělého a dítě se stravováním
  const cenaDospUpraveno = hotelInfo.cenaDosp * (1 + prirazkaDosp);
  const cenaDiteUpraveno = hotelInfo.cenaDite * (1 + prirazkaDite);

  // Výpočet dílčích cen
  const cenaDospeliCelkem = dospeli * cenaDospUpraveno;
  const cenaDetiCelkem = dite * cenaDiteUpraveno;
  const cenaPokojCelkem = cenaPokojSleva + cenaDospeliCelkem + cenaDetiCelkem;
  const cenaZaPobyt = cenaPokojCelkem * noci;

  // Sestavení rozpisu
  const rozpis = [
    `Dospělí: ${dospeli} × ${cenaDospUpraveno.toFixed(2)} = ${cenaDospeliCelkem.toFixed(2)} MiKa`,
    `Děti: ${dite} × ${cenaDiteUpraveno.toFixed(2)} = ${cenaDetiCelkem.toFixed(2)} MiKa`,
    `Cena pokoje (noc): ${cenaPokojSleva.toFixed(2)} MiKa`,
    `Celkem za pokoj: ${cenaZaPobyt.toFixed(2)} MiKa`
  ];

  return createJsonResponse({
    rozpis: rozpis,
    cenaCelkem: cenaZaPobyt.toFixed(2)
  });
}


function vypocetCenyPokoj(hotelParam, dospeli, dite, noci, stravovani) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const hotelSheet = ss.getSheetByName('Hotely a destinace');
  const stravovaniSheet = ss.getSheetByName('Stravování');

  const hotelData = hotelSheet.getDataRange().getValues();
  const stravovaniData = stravovaniSheet.getDataRange().getValues();

  // Najdeme hotel
  let hotelInfo = null;
  for (let i = 1; i < hotelData.length; i++) {
    if (hotelData[i][1] === hotelParam) {
      hotelInfo = {
        cenaPokoj: Number(hotelData[i][5]),   // Cena za pokoj/noc
        cenaDosp: Number(hotelData[i][6]),    // Cena za osobu/noc
        cenaDite: Number(hotelData[i][7]),    // Cena za dítě/noc
        sleva: Number(hotelData[i][8]) || 0,  // Sleva/Přirážka
        moznosti_stravovani: String(hotelData[i][3])
      };
      break;
    }
  }
  if (!hotelInfo) {
    throw new Error('Hotel nenalezen');
  }

  // Ověření stravování
  if (!hotelInfo.moznosti_stravovani.split(',').map(s => s.trim()).includes(stravovani)) {
    throw new Error('Tato možnost stravování neexistuje');
  }

  // Přirážky za stravování
  let prirazkaDosp = 0;
  let prirazkaDite = 0;
  for (let i = 1; i < stravovaniData.length; i++) {
    if (String(stravovaniData[i][0]).trim().toLowerCase() === stravovani.trim().toLowerCase()) {
      prirazkaDosp = Number(stravovaniData[i][1]) || 0;
      prirazkaDite = Number(stravovaniData[i][2]) || 0;
      break;
    }
  }

  // Sleva/přirážka na pokoj
  const cenaPokojSleva = hotelInfo.cenaPokoj * (1 + hotelInfo.sleva);

  // Upravené ceny
  const cenaDospUpraveno = hotelInfo.cenaDosp * (1 + prirazkaDosp);
  const cenaDiteUpraveno = hotelInfo.cenaDite * (1 + prirazkaDite);

  // Výpočty
  const cenaDospeliCelkem = dospeli * cenaDospUpraveno;
  const cenaDetiCelkem = dite * cenaDiteUpraveno;
  const cenaPokojCelkem = cenaPokojSleva + cenaDospeliCelkem + cenaDetiCelkem;
  const cenaZaPobyt = cenaPokojCelkem * noci;

  const rozpis = [
    `Dospělí: ${dospeli} × ${cenaDospUpraveno.toFixed(2)} = ${cenaDospeliCelkem.toFixed(2)} MiKa`,
    `Děti: ${dite} × ${cenaDiteUpraveno.toFixed(2)} = ${cenaDetiCelkem.toFixed(2)} MiKa`,
    `Cena pokoje (noc): ${cenaPokojSleva.toFixed(2)} MiKa`,
    `Celkem za pokoj: ${cenaZaPobyt.toFixed(2)} MiKa`
  ];

  return {
    rozpis,
    cenaCelkem: cenaZaPobyt
  };
}

function cenaCelkemParametryRozpis(hotel, stravovani, noci, pokoje = [], sluzby = {}, destinace = "") {
  if (!hotel) {
    throw new Error("Hotel musí být zadán.");
  }

  let celkovaCena = 0;
  const rozpis = {};
  let celkemOsob = 0; // celkový počet osob pro let
  let cenaLetu = 0;
  let letiste = "";

  // === Výpočet ceny pokojů ===
  pokoje.forEach((pokoj, index) => {
    const dospeli = Number(pokoj.dospeli) || 0;
    const dite = Number(pokoj.deti) || 0;
    celkemOsob += dospeli + dite;

    const vysledek = vypocetCenyPokoj(hotel, dospeli, dite, noci, stravovani);
    celkovaCena += vysledek.cenaCelkem;

    // Rozpis pokojů
    rozpis[`pokoj${index + 1}`] = {
      nazev: hotel,
      jednotne: `Cena za pokoj/noc a osobu`,
      absolvaci: dospeli + dite,
      celkem: vysledek.cenaCelkem.toFixed(2)
    };
  });

  // === Výpočet doplňkových služeb ===
  let idxSluzby = 1;
  for (let nazevSluzby in sluzby) {
    if (sluzby.hasOwnProperty(nazevSluzby)) {
      const pocet = Number(sluzby[nazevSluzby]) || 0;
      const cena = Number(cenaSluzbyPodleNazvu(nazevSluzby, pocet));
      celkovaCena += cena;

      rozpis[idxSluzby++] = {
        nazev: nazevSluzby,
        jednotne: (cena / pocet).toFixed(2),
        absolvaci: pocet,
        celkem: cena.toFixed(2)
      };
    }
  }

  // === Přidání ceny letu podle destinace ===
  const normalize = s => s.toString().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().toLowerCase();
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("Lety");

  if (sheet) {
    const data = sheet.getDataRange().getValues();
    const header = data.shift();

    const idxDest = header.indexOf("Destinace");
    const idxLetiste = header.indexOf("Letiště (cílové)");
    const idxCena = header.indexOf("Cena letu (MiKa)");

    if (idxDest > -1 && idxCena > -1) {
      let hledana = normalize(destinace);

      for (let i = 0; i < data.length; i++) {
        const rowDest = data[i][idxDest] || data[i][0] || "";
        if (!hledana) hledana = normalize(rowDest);

        if (normalize(rowDest) === hledana) {
          let textCena = (data[i][idxCena] || "0").toString().replace(/[^\d\-,.]/g, "");
          cenaLetu = parseFloat(textCena.replace(",", ".")) || 0;
          letiste = data[i][idxLetiste] || "";

          celkovaCena += cenaLetu * celkemOsob;
          break;
        }
      }
    }
  }

  // Přidání letu do rozpisu
  rozpis[idxSluzby] = {
    nazev: "Let",
    jednotne: cenaLetu.toFixed(2),
    absolvaci: celkemOsob,
    celkem: (cenaLetu * celkemOsob).toFixed(2)
  };

  return {
    celkovaCena: celkovaCena.toFixed(2),
    rozpis
  };
}


function cenaPokoj(e) {
  try {
    const hotel = e.parameter.hotel;
    const dospeli = Number(e.parameter.dospeli) || 0;
    const dite = Number(e.parameter.dite) || 0;
    const noci = Number(e.parameter.noci) || 1;
    const stravovani = e.parameter.stravovani;

    const vysledek = vypocetCenyPokoj(hotel, dospeli, dite, noci, stravovani);

    return createJsonResponse({
      rozpis: vysledek.rozpis,
      cenaCelkem: vysledek.cenaCelkem.toFixed(2)
    });
  } catch (err) {
    return createJsonResponse({ error: err.message });
  }
}

function cenaCelkem(e) {
  const hotel = e.parameter.hotel || "";
  const stravovani = e.parameter.stravovani || "";
  const noci = Number(e.parameter.noci) || 0;
  const sluzby = e.parameter.sluzby ? JSON.parse(e.parameter.sluzby) : {};
  const destinace = e.parameter.destinace || "";
  const darkovy_kod = e.parameter.kod || "";

  let celkovaCena = 0;
  const rozpis = {};

  // === Výpočet pokojů ===
  const pokojPrefixy = new Set();
  for (let k in e.parameter) {
    const match = k.match(/^(pokoj\d+)_/);
    if (match) pokojPrefixy.add(match[1]);
  }

  let celkemOsob = 0; // <== zde budeme počítat všechny osoby

  pokojPrefixy.forEach(prefix => {
    const dospeli = Number(e.parameter[`${prefix}_dospeli`]) || 0;
    const dite = Number(e.parameter[`${prefix}_deti`]) || 0;
    celkemOsob += dospeli + dite; // <== přičteme do celkového počtu osob

    const vysledek = vypocetCenyPokoj(hotel, dospeli, dite, noci, stravovani);
    celkovaCena += vysledek.cenaCelkem;

    rozpis[prefix] = {
      hotel,
      dospeli,
      dite,
      rozpis: vysledek.rozpis,
      cenaCelkem: vysledek.cenaCelkem.toFixed(2)
    };
  });

  // === Výpočet doplňkových služeb ===
  const rozpisSluzeb = {};
  for (let nazevSluzby in sluzby) {
    if (sluzby.hasOwnProperty(nazevSluzby)) {
      const pocet = Number(sluzby[nazevSluzby]) || 0;
      const cena = cenaSluzbyPodleNazvu(nazevSluzby, pocet);
      celkovaCena += cena;
      rozpisSluzeb[nazevSluzby] = { pocet, cena };
    }
  }

  // === Přidání ceny letu podle destinace ===
  let cenaLetu = 0;
  let letiste = "";

  if (destinace) {
    const normalize = s => s
      .toString()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim()
      .toLowerCase();

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName("Lety");

    if (sheet) {
      const data = sheet.getDataRange().getValues();
      const header = data.shift();

      const idxDest = header.indexOf("Destinace");
      const idxLetiste = header.indexOf("Letiště (cílové)");
      const idxCena = header.indexOf("Cena letu (MiKa)");

      if (idxDest > -1 && idxCena > -1) {
        const hledana = normalize(destinace);
        for (let i = 0; i < data.length; i++) {
          const radekDest = normalize(data[i][idxDest] || "");
          if (radekDest === hledana) {
            let textCena = data[i][idxCena] ? data[i][idxCena].toString() : "0";
            textCena = textCena.replace(/[^\d\-,.]/g, "");
            cenaLetu = parseFloat(textCena.replace(",", ".")) || 0;
            letiste = data[i][idxLetiste] || "";

            // *** Zde se vynásobí počtem všech osob ***
            celkovaCena += cenaLetu * celkemOsob;

            Logger.log(`✅ Nalezena shoda: ${data[i][idxDest]} → cena ${cenaLetu} × ${celkemOsob} osob`);
            break;
          }
        }
      }
    }
  }

  // Přidání do rozpisu (vždy)
  rozpis["let"] = {
    destinace: destinace || "(neuvedeno)",
    letiste: letiste || "(nenalezeno)",
    cenaCelkem: (cenaLetu * celkemOsob).toFixed(2)
  };

  celkovaCena = overeni_darkovy_kod({kod: darkovy_kod, cena: celkovaCena, hotel: hotel}).cena

  // === Výstup ===
  return {
    celkovaCena: celkovaCena.toFixed(2),
    rozpis,
    sluzby: rozpisSluzeb
  };
}





function cenaCelkemParametry(hotel, stravovani, noci, pokoje = [], sluzby = {}, destinace = "", darkovy_kod, objednavka = false) {
  if (!hotel) {
    throw new Error("Hotel musí být zadán.");
  }

  let celkovaCena = 0;
  const rozpis = {};
  let celkemOsob = 0; // celkový počet osob pro let
  let cenaLetu = 0;
  let letiste = "";

  // === Výpočet ceny pokojů ===
  pokoje.forEach((pokoj, index) => {
    const dospeli = Number(pokoj.dospeli) || 0;
    const dite = Number(pokoj.deti) || 0;
    celkemOsob += dospeli + dite;

    const vysledek = Number(vypocetCenyPokoj(hotel, dospeli, dite, noci, stravovani).cenaCelkem);
    celkovaCena += vysledek;

    rozpis[`pokoj${index + 1}`] = {
      hotel,
      dospeli,
      dite,
      rozpis: vysledek.rozpis,
      cenaCelkem: vysledek.toFixed(2)
    };
  });

  // === Výpočet doplňkových služeb ===
  const rozpisSluzeb = {};
  for (let nazevSluzby in sluzby) {
    if (sluzby.hasOwnProperty(nazevSluzby)) {
      const pocet = Number(sluzby[nazevSluzby]) || 0;
      const cena = Number(cenaSluzbyPodleNazvu(nazevSluzby, pocet));
      celkovaCena += cena;
      rozpisSluzeb[nazevSluzby] = { pocet, cena };
    }
  }

  if (destinace == "") {
    destinace = najdiHotelInfo(hotel).destinace
  }

  // === Přidání ceny letu podle destinace ===
  const normalize = s => s.toString().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().toLowerCase();
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("Lety");

  if (sheet) {
    const data = sheet.getDataRange().getValues();
    const header = data.shift();

    const idxDest = header.indexOf("Destinace");
    const idxLetiste = header.indexOf("Letiště (cílové)");
    const idxCena = header.indexOf("Cena letu (MiKa)");

    if (idxDest > -1 && idxCena > -1) {
      let hledana = normalize(destinace);

      for (let i = 0; i < data.length; i++) {
        // pokud destinace nebyla zadána, použij hodnotu ve sloupci A
        const rowDest = data[i][idxDest] || data[i][0] || "";
        if (!hledana) {
          hledana = normalize(rowDest);
        }

        if (normalize(rowDest) === hledana) {
          let textCena = (data[i][idxCena] || "0").toString().replace(/[^\d\-,.]/g, "");
          cenaLetu = parseFloat(textCena.replace(",", ".")) || 0;
          letiste = data[i][idxLetiste] || "";

          celkovaCena += cenaLetu * celkemOsob;
          Logger.log(`✅ Nalezena shoda: ${rowDest} → cena ${cenaLetu} × ${celkemOsob} osob`);
          break;
        }
      }
    }
  }

  // Přidání letu do rozpisu
  rozpis["let"] = {
    destinace: destinace || "(neuvedeno)",
    letiste: letiste || "(nenalezeno)",
    cenaCelkem: (cenaLetu * celkemOsob).toFixed(2)
  };

  celkovaCena = overeni_darkovy_kod({kod: darkovy_kod, cena: celkovaCena, hotel: hotel, objednavka}).cena

  return {
    celkovaCena: celkovaCena.toFixed(2),
    rozpis,
    sluzby: rozpisSluzeb
  };
}


// Pomocná funkce pro úpravu názvu služby
function normalizujNazevSluzby(klic) {
  const mapa = {
    transfer: "Transfer hotel–letiště",
    pojist: "Pojištění",
    let: "Letenka",
    ubytovani: "Ubytování v hotelu",
    strava: "Strava"
  };
  return mapa[klic] || klic.charAt(0).toUpperCase() + klic.slice(1);
}

function overeni_darkovy_kod(body) {
  const kod = body.kod;
  const cena = Number(body.cena);
  const hotel = body.hotel;
  const objednavka = body.objednavka;

  const sheet = SpreadsheetApp
    .getActiveSpreadsheet()
    .getSheetByName("Dárkové kódy");

  const sheetData = sheet.getDataRange().getValues();
  const destinace = hotelDestinace(hotel);

  const dnes = new Date();
  dnes.setHours(0, 0, 0, 0);

  for (let i = 0; i < sheetData.length; i++) {
    const row = sheetData[i];
    const kodZeSheetu = row[0];
    const hotelZeSheetu = row[1];
    const destinaceZeSheetu = row[2];
    const cenaZeSheetu = row[3];
    const sleva = Number(row[4]);
    const typSlevy = row[5];
    const vymaz = row[6];
    const pouziti = row[7];

    if (kodZeSheetu === kod) {
      let duvodNeplatnosti = [];

      let cenaOk = true;
      let hotelOk = true;
      let destinaceOk = true;
      let vymazOk = true;
      let pouzitiOk = true;

      if (cenaZeSheetu) {
        const cenaCislo = Number(cenaZeSheetu.toString().replace(/\s|MiKa/g, '').replace(',', '.'));
        if (cena > cenaCislo) {
          cenaOk = false;
          duvodNeplatnosti.push(`Cena překračuje limit ${cenaCislo} MiKa`);
        }
      }

      if (hotelZeSheetu) {
        let hotely;
        try {
          hotely = JSON.parse(hotelZeSheetu);
        } catch {
          hotely = [hotelZeSheetu];
        }

        // 🔑 pokud je [], neomezujeme
        if (Array.isArray(hotely) && hotely.length === 0) {
          // bez omezení
        } else if (!hotely.includes(hotel)) {
          hotelOk = false;
          duvodNeplatnosti.push(`Kód platí pouze pro hotely: ${hotely.join(", ")}`);
        }
      }

      // obdobně pro destinace
      if (destinaceZeSheetu) {
        let destinacePole;
        try {
          destinacePole = JSON.parse(destinaceZeSheetu);
        } catch {
          destinacePole = [destinaceZeSheetu];
        }

        if (Array.isArray(destinacePole) && destinacePole.length === 0) {
          // bez omezení
        } else if (!destinacePole.includes(destinace)) {
          destinaceOk = false;
          duvodNeplatnosti.push(`Kód platí pouze pro destinace: ${destinacePole.join(", ")}`);
        }
      }

      if (vymaz) {
        const vymazDatum = new Date(vymaz);
        vymazDatum.setHours(0, 0, 0, 0);
        if (vymazDatum <= dnes) {
          vymazOk = false;
          duvodNeplatnosti.push("Kód je expirující nebo vymazaný");
        }
      }

      if (pouziti !== undefined && pouziti !== "" && Number(pouziti) == 0) {
        pouzitiOk = false;
        duvodNeplatnosti.push("Kód již byl použit");
      }

      if (cenaOk && hotelOk && destinaceOk && vymazOk && pouzitiOk) {
        let slevaCastka = 0;
        if (typSlevy === "procenta") {
          slevaCastka = cena * (sleva / 100);
        } else if (typSlevy === "castka") {
          slevaCastka = sleva;
        }
        const novaCena = Math.max(0, cena - slevaCastka);

        if (objednavka) {
          for (let i = 1; i < sheetData.length; i++) { // od 1 pokud máš hlavičku
            let hodnota = sheetData[i][7]; // sloupec H

            if (hodnota !== "" && !isNaN(hodnota)) {
              sheet.getRange(i + 1, 8).setValue(Number(hodnota) - 1);
            }
          }
        }

        return {
          valid: true,
          rowIndex: i + 1,
          message: `Kód je platný. Sleva: ${slevaCastka.toFixed(2)} MiKa. Nová cena: ${novaCena.toFixed(2)} MiKa.`,
          cena: novaCena,
          success: true
        };
      } else {
        return {
          valid: false,
          message: `Kód se shoduje, ale nesplňuje podmínky: ${duvodNeplatnosti.join("; ")}`,
          cena: body.cena
        };
      }
    }
  }

  return {
    valid: false,
    message: "Kód nebyl nalezen",
    cena: body.cena
  };
}


function hotelDestinace(hotel) {
  const sheet = SpreadsheetApp
    .getActiveSpreadsheet()
    .getSheetByName("Hotely a destinace");
  const sheetData = sheet.getDataRange().getValues();

  for (let i = 0; i < sheetData.length; i++) {
    if (sheetData[i][1] === hotel) { // sloupec B má index 1
      return sheetData[i][0];        // sloupec A má index 0
    }
  }
  return null; // pokud hotel nenalezen
}





function parseCena(c) {
  if (c === undefined || c === null || c === "" || c === "-") return 0;
  const parsed = parseFloat(String(c).replace(/[^\d.-]/g, ""));
  return isNaN(parsed) ? 0 : parsed;
}

function vypocetCenySluzeb(sluzba, pocet) {
  let celkem = 0;

  for (let i = 1; i <= pocet; i++) {
    let cena = 0;

    if (i === 1) {
      cena = parseCena(sluzba["Cena za osobu"]);
    } else if (i === 2) {
      cena = parseCena(sluzba["Cena za 2"]);
      if (!cena) cena = parseCena(sluzba["Cena za další"]);
    } else if (i === 3) {
      cena = parseCena(sluzba["Cena za 3"]);
      if (!cena) cena = parseCena(sluzba["Cena za další"]);
    } else {
      cena = parseCena(sluzba["Cena za další"]);
    }

    celkem += cena;
  }

  return celkem;
}

function nactiSluzbyObjekty() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sluzbySheet = ss.getSheetByName('Služby');
  const data = sluzbySheet.getDataRange().getValues();
  const headers = data[0];

  return data.slice(1).map(row => {
    let obj = {};
    headers.forEach((header, i) => {
      obj[header] = row[i];
    });
    return obj;
  });
}

function cenaSluzbyPodleNazvu(nazev, pocet) {
  const vsechnySluzby = nactiSluzbyObjekty(); // přímo pole objektů
  const sluzbaObj = vsechnySluzby.find(s => s["Název služby"] === nazev);

  if (!sluzbaObj) {
    throw new Error("Služba s názvem '" + nazev + "' nebyla nalezena");
  }

  return vypocetCenySluzeb(sluzbaObj, pocet);
}


function sluzby() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sluzbySheet = ss.getSheetByName('Služby');

  // Přečte všechny hodnoty z listu (předpokládáme, že první řádek jsou hlavičky)
  const data = sluzbySheet.getDataRange().getValues();
  
  // Extrahuje hlavičky
  const headers = data[0];

  // Převod každého řádku na objekt
  const jsonData = data.slice(1).map(row => {
    let obj = {};
    headers.forEach((header, i) => {
      obj[header] = row[i];
    });
    return obj;
  });

  return createJsonResponse(jsonData)
}

function motiv(body) {
  const cardNumber = body.cislo;
  if (!cardNumber) return createJsonResponse({ success: false, error: "Chybí číslo karty" });

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('Platební karty');
  if (!sheet) return createJsonResponse({ success: false, error: "List 'Platební karty' nenalezen" });

  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (data[i][1] == cardNumber) { // sloupec B
      const motivFileId = data[i][4];
      const motivBase64 = getFileAsBase64(motivFileId);

      return createJsonResponse({
        success: true,
        motiv: motivBase64,
        font: data[i][5],
        clenstvi: data[i][6]
      });
    }
  }

  return createJsonResponse({ success: false, error: "Karta nenalezena" });
}


function getFileAsBase64(fileId) {
  try {
    // Získání souboru z Google Disku podle ID
    var file = DriveApp.getFileById(fileId);
    var blob = file.getBlob();
    // Převod souboru na Base64
    var base64 = Utilities.base64Encode(blob.getBytes());
    return base64;
  } catch (e) {
    return null;
  }
}


function testBase64() {
  var fileId = "1ZWq8foWkaCnlhISVwHKzfFJdhXlSCqGT"; // pouze ID, ne celý odkaz
  var file = DriveApp.getFileById(fileId);
  Logger.log(file.getName()); // ověří, že skript soubor vidí
  var base64 = Utilities.base64Encode(file.getBlob().getBytes());
  Logger.log(base64.substring(0,100)); // první část Base64
}




function generatePdf(e, username) {
  try {
    const hodnota = najdiObjednavkuHodnotu(e.docId);

    if (hodnota !== username && username !== "MíšaHr") {
      const zprava = username + hodnota
      return ContentService
        .createTextOutput(zprava)
        .setMimeType(ContentService.MimeType.TEXT);
    }
    Logger.log("generatePdf spuštěna");
    Logger.log("Parametry:");
    Logger.log("e: " + JSON.stringify(e));
    Logger.log("username: " + username);

    const stav = najdiObjednavkuHodnotuStav(e.docId);
    Logger.log("Stav objednávky: " + stav);
    const vyjadreni = najdiObjednavkuHodnotuVyjadreni(e.docId);
    Logger.log(vyjadreni);

    if (e?.mode !== undefined) {
      const nazev = e.docId + "_" + e.variant
      const fileId = najdiSouborVGoogleDrivePrilohy(nazev);
      Logger.log("ID souboru: " + fileId);

      const file = DriveApp.getFileById(fileId);
      const blob = file.getBlob();
      const base64 = Utilities.base64Encode(blob.getBytes());

      return ContentService
        .createTextOutput(base64)
        .setMimeType(ContentService.MimeType.TEXT);
    }

    if (stav === true) {
      if (vyjadreni !== "Nerozhodnuto"){
        const fileId = najdiSouborVGoogleDrivePodepsane(e.docId);
        Logger.log("ID souboru: " + fileId);

        const file = DriveApp.getFileById(fileId);
        const blob = file.getBlob();
        const base64 = Utilities.base64Encode(blob.getBytes());

        return ContentService
        .createTextOutput(JSON.stringify({ base64: base64, stav: vyjadreni}))
        .setMimeType(ContentService.MimeType.JSON);
      }
      const fileId = najdiSouborVGoogleDriveNepodepsane(e.docId);
      Logger.log("ID souboru: " + fileId);

      const file = DriveApp.getFileById(fileId);
      const blob = file.getBlob();
      const base64 = Utilities.base64Encode(blob.getBytes());

      return ContentService
        .createTextOutput(base64)
        .setMimeType(ContentService.MimeType.TEXT);
    } else {
      return ContentService
        .createTextOutput(stav)
        .setMimeType(ContentService.MimeType.TEXT);
    }

  } catch (error) {
    // Podrobný log chyby
    Logger.log("❌ CHYBA v generatePdf");
    Logger.log("Zpráva: " + error.message);
    Logger.log("Stack trace:");
    Logger.log(error.stack);

    // Volitelně lze zalogovat i celý objekt chyby
    Logger.log("Celý objekt chyby: " + JSON.stringify(error));

    return ContentService
      .createTextOutput(
        "Došlo k chybě při generování PDF.\n" +
        "Zpráva: " + error.message
      )
      .setMimeType(ContentService.MimeType.TEXT);
  }
}

function najdiEmail(vyhledavanaHodnota) {
  // 1) Získá aktivní tabulku (ta, která je právě otevřená)
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // 2) Otevře list "objednávky"
  const list = ss.getSheetByName("Uživatelé");
  if (!list) {
    throw new Error("List 'objednávky' nebyl nalezen.");
  }

  // 3) Načte všechny hodnoty sloupce A
  const data = list.getRange("A:A").getValues();

  // 4) Projde všechny řádky a najde hodnotu
  for (let i = 0; i < data.length; i++) {
    if (data[i][0] === vyhledavanaHodnota) {
      // 5) Vrátí hodnotu ze sloupce B ve stejném řádku
      return list.getRange(i + 1, 4).getValue();
    }
  }

  // Pokud hodnota není nalezena
  return null;
}



function najdiObjednavkuHodnotu(vyhledavanaHodnota) {
  // 1) Získá aktivní tabulku (ta, která je právě otevřená)
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // 2) Otevře list "objednávky"
  const list = ss.getSheetByName("Objednávky");
  if (!list) {
    throw new Error("List 'objednávky' nebyl nalezen.");
  }

  // 3) Načte všechny hodnoty sloupce A
  const data = list.getRange("A:A").getValues();

  // 4) Projde všechny řádky a najde hodnotu
  for (let i = 0; i < data.length; i++) {
    if (data[i][0] === vyhledavanaHodnota) {
      // 5) Vrátí hodnotu ze sloupce B ve stejném řádku
      return list.getRange(i + 1, 2).getValue();
    }
  }

  // Pokud hodnota není nalezena
  return null;
}


function najdiObjednavkuHodnotuStav(vyhledavanaHodnota) {
  // 1) Získá aktivní tabulku (ta, která je právě otevřená)
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // 2) Otevře list "objednávky"
  const list = ss.getSheetByName("Objednávky");
  if (!list) {
    throw new Error("List 'objednávky' nebyl nalezen.");
  }

  // 3) Načte všechny hodnoty sloupce A
  const data = list.getRange("A:A").getValues();

  // 4) Projde všechny řádky a najde hodnotu
  for (let i = 0; i < data.length; i++) {
    if (data[i][0] === vyhledavanaHodnota) {
      // 5) Vrátí hodnotu ze sloupce B ve stejném řádku
      return list.getRange(i + 1, 17).getValue();
    }
  }

  // Pokud hodnota není nalezena
  return null;
}



function najdiObjednavkuHodnotuVyjadreni(vyhledavanaHodnota) {
  // 1) Získá aktivní tabulku (ta, která je právě otevřená)
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // 2) Otevře list "objednávky"
  const list = ss.getSheetByName("Objednávky");
  if (!list) {
    throw new Error("List 'objednávky' nebyl nalezen.");
  }

  // 3) Načte všechny hodnoty sloupce A
  const data = list.getRange("A:A").getValues();

  // 4) Projde všechny řádky a najde hodnotu
  for (let i = 0; i < data.length; i++) {
    if (data[i][0] === vyhledavanaHodnota) {
      // 5) Vrátí hodnotu ze sloupce B ve stejném řádku
      return list.getRange(i + 1, 18).getValue();
    }
  }

  // Pokud hodnota není nalezena
  return null;
}


function convertBooleans(obj) {
  if (typeof obj === "boolean") {
    return obj ? "true" : "false";
  } else if (Array.isArray(obj)) {
    return obj.map(convertBooleans);
  } else if (obj !== null && typeof obj === "object") {
    const result = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        result[key] = convertBooleans(obj[key]);
      }
    }
    return result;
  }
  return obj;
}





function aa() {
  //const output = generatePdf(
  //  { action: 'smlouva', docId: 'ES-2026-00001' },
  //  "MíšaHr"
  //);

  const output = odeslat_objednavku(
  {objednavka: {"cestujici": {
    "pokoj0": [
      {
        "osloveni": "Pan",
        "jmeno": "Václav",
        "prijmeni": "Hruška",
        "pas": "CZ-21051980--MiKa--VAHR--MiKa--VHr-CZ"
      },
      {
        "osloveni": "Paní",
        "jmeno": "Jana",
        "prijmeni": "Hrušková",
        "pas": "CZ-29031985--MiKa--JAHR--MiKa--JHr-CZ"
      },
      {
        "jmeno": "Michael",
        "prijmeni": "Hruška",
        "pas": "CZ-11012013--MiKa--MIHR--MiKa--MHr-CZ"
      },
      {
        "jmeno": "Karolína",
        "prijmeni": "Hrušková",
        "pas": "CZ-31012017--MiKa--KAHR--MiKa--***-CZ"
      }
    ]
  },
  "jmeno": "Míša",
  "prijmeni": "Hruška",
  "narozeni": "2007-01-11",
  "email": "michael.hruska11@gmail.com",
  "telefon": "608905022",
  "adresa": {
    "ulice": "Blížejov",
    "cislo_popisne": "243",
    "mesto": "Blížejov",
    "psc": "345 45"
  },
  "informaceOhotelu": {
    "hotel": "Hotel Playa Azul",
    "datumy": {
      "od": "2026-02-02",
      "do": "2026-02-04"
    },
    "strava": "Plná penze",
    "pokoje": [
      {}
    ]
  },
  "karta": {
    "karta_name": "MICHAEL HRUŠKA",
    "karta_number": "••••••••••••0001",
    "karta_expiry": "05/26",
    "karta_cvv": "•••",
    "token": "cf198f0f-468d-4410-921e-549d9e805488"
  },
  "sluzby": {
    "Cestovní pojištění MiKa": 4
  }
}}, "MíšaHr")

  //const output = vytvorPodepsanouSmlouvu({ action: 'podpis', docId: 'ES-2026-00001', vyjadreni: 'Schváleno' }, "MíšaHr");

  Logger.log(output.getContent());
  //Logger.log(nazev);
  //const fileId = najdiSouborVGoogleDrivePrilohy(nazev);
  //Logger.log("ID souboru: " + fileId);
  //generatePdf({docId: "ES-2026-00001", variant: "A", mode: "alt"}, "a")
  //vytvorNavrhSmlouvy("ES-2026-00001");
  //vytvorPodepsanouSmlouvu();
}








function najdiSouborVGoogleDrive(nazev) {
  const folderId = "1Ig9gar8e6iV_Ezk49ZpedteozX0hHeng";
  const fileName = `${nazev}.png`;

  const folder = DriveApp.getFolderById(folderId);
  const files = folder.getFilesByName(fileName);

  if (files.hasNext()) {
    const file = files.next();
    Logger.log("Soubor nalezen: " + file.getName());
    Logger.log("ID souboru: " + file.getId());
    return file.getId(); // <-- změna
  } else {
    Logger.log("Soubor nebyl nalezen.");
    return null;
  }
}



function najdiSouborVGoogleDrivePodepsane(nazev) {
  const folderId = "14YtUHHqJHG6ICvI3zAhFOXszVZ7m8sy7";
  const fileName = `${nazev}.pdf`;

  const folder = DriveApp.getFolderById(folderId);
  const files = folder.getFilesByName(fileName);

  if (files.hasNext()) {
    const file = files.next();
    Logger.log("Soubor nalezen: " + file.getName());
    Logger.log("ID souboru: " + file.getId());
    return file.getId(); // <-- změna
  } else {
    Logger.log("Soubor nebyl nalezen.");
    return null;
  }
}

function najdiSouborVGoogleDriveNepodepsane(nazev) {
  const folderId = "1Ym5jupeEOB2rQRtDUX6OBQU2kCQxOcBS";
  const fileName = `${nazev}_navrh.pdf`;

  const folder = DriveApp.getFolderById(folderId);
  const files = folder.getFilesByName(fileName);

  if (files.hasNext()) {
    const file = files.next();
    Logger.log("Soubor nalezen: " + file.getName());
    Logger.log("ID souboru: " + file.getId());
    return file.getId(); // <-- změna
  } else {
    Logger.log("Soubor nebyl nalezen.");
    return null;
  }
}


function najdiSouborVGoogleDrivePrilohy(nazev) {
  const folderId = "1Vu9yuAqqtr-GD8HmDG2Oy6gWNtW3vn8r";
  const fileName = `${nazev}.pdf`;

  const folder = DriveApp.getFolderById(folderId);
  const files = folder.getFilesByName(fileName);

  if (files.hasNext()) {
    const file = files.next();
    Logger.log("Soubor nalezen: " + file.getName());
    Logger.log("ID souboru: " + file.getId());
    return file.getId(); // <-- změna
  } else {
    Logger.log("Soubor nebyl nalezen.");
    return null;
  }
}

function podpis(id, jmeno) {
  const doc = DocumentApp.openById(id);
  const body = doc.getBody();

  const images = body.getImages();
  if (images.length === 0) {
    Logger.log("V dokumentu nejsou žádné obrázky.");
    return;
  }

  const lastImage = images[images.length - 1];

  // uložíme šířku a výšku
  const width = lastImage.getWidth();
  const height = lastImage.getHeight();

  const nazev = najdiSouborVGoogleDrive(jmeno);

  const newImageBlob = DriveApp.getFileById(nazev).getBlob();

  const parent = lastImage.getParent();
  const index = parent.getChildIndex(lastImage);

  let insertedImage;

  switch (parent.getType()) {
    case DocumentApp.ElementType.PARAGRAPH:
      // zachováme formátování odstavce
      const paragraph = parent.asParagraph();
      insertedImage = paragraph.insertInlineImage(index, newImageBlob);
      paragraph.setAlignment(paragraph.getAlignment());
      break;

    case DocumentApp.ElementType.LIST_ITEM:
      const listItem = parent.asListItem();
      insertedImage = listItem.insertInlineImage(index, newImageBlob);
      listItem.setAlignment(listItem.getAlignment());
      break;

    case DocumentApp.ElementType.TABLE_CELL:
      const cell = parent.asTableCell();
      insertedImage = cell.insertImage(index, newImageBlob);
      break;

    default:
      Logger.log("Nepodporovaný typ rodiče: " + parent.getType());
      return;
  }

  // aplikujeme velikost
  insertedImage.setWidth(width);
  insertedImage.setHeight(height);

  parent.removeChild(lastImage);

  Logger.log("Poslední obrázek byl úspěšně nahrazen a velikost zachována.");
}




function replaceLastImageInDrawing() {
  const doc = DocumentApp.openById('1ddvDTZtVRtpQ3eNalhKQVYZW44dEYQ6KNY_8CD_UvyE');
  const body = doc.getBody();

  const newImageBlob = UrlFetchApp.fetch('https://drive.google.com/file/d/1OX6NNc3csNFhWiKS0m8WMN9AcekGpeTO/view').getBlob();

  let lastDrawingImage = null;

  // Prochází všechny elementy dokumentu
  const totalElements = body.getNumChildren();
  for (let i = 0; i < totalElements; i++) {
    const element = body.getChild(i);

    // Hledá element typu DRAWING
    if (element.getType() === DocumentApp.ElementType.INLINE_DRAWING) {
      const drawing = element.asInlineDrawing();
      const images = drawing.getImages();
      if (images.length > 0) {
        lastDrawingImage = images[images.length - 1];
      }
    }
  }

  if (!lastDrawingImage) {
    Logger.log("Nenašel se žádný obrázek v DRAWING.");
    return;
  }

  // Nahradí poslední obrázek
  lastDrawingImage.replace(newImageBlob);
  Logger.log("Obrázek v DRAWING byl nahrazen.");
}


function listBodyElements() {
  const doc = DocumentApp.openById('1ddvDTZtVRtpQ3eNalhKQVYZW44dEYQ6KNY_8CD_UvyE');
  const body = doc.getBody();

  const totalElements = body.getNumChildren();
  Logger.log("Počet elementů v těle dokumentu: " + totalElements);

  for (let i = 0; i < totalElements; i++) {
    const element = body.getChild(i);
    Logger.log(i + ": " + element.getType());
  }
}

function replaceLastInlineImage() {
  const doc = DocumentApp.openById('1ddvDTZtVRtpQ3eNalhKQVYZW44dEYQ6KNY_8CD_UvyE');
  const body = doc.getBody();

  const newImageBlob = UrlFetchApp.fetch('https://drive.google.com/file/d/1OX6NNc3csNFhWiKS0m8WMN9AcekGpeTO/view').getBlob();

  let lastImage = null;
  let lastParentType = null;
  let lastParentIndex = -1;
  let lastChildIndex = -1;

  for (let i = 0; i < body.getNumChildren(); i++) {
    const element = body.getChild(i);

    // Pokud je to PARAGRAPH
    if (element.getType() === DocumentApp.ElementType.PARAGRAPH) {
      const para = element.asParagraph();

      for (let j = 0; j < para.getNumChildren(); j++) {
        const child = para.getChild(j);

        if (child.getType() === DocumentApp.ElementType.INLINE_IMAGE) {
          lastImage = child.asInlineImage();
          lastParentType = 'PARAGRAPH';
          lastParentIndex = i;
          lastChildIndex = j;
        }
      }
    }

    // Pokud je to LIST_ITEM
    if (element.getType() === DocumentApp.ElementType.LIST_ITEM) {
      const listItem = element.asListItem();

      for (let j = 0; j < listItem.getNumChildren(); j++) {
        const child = listItem.getChild(j);

        if (child.getType() === DocumentApp.ElementType.INLINE_IMAGE) {
          lastImage = child.asInlineImage();
          lastParentType = 'LIST_ITEM';
          lastParentIndex = i;
          lastChildIndex = j;
        }
      }
    }
  }

  if (!lastImage) {
    Logger.log("V dokumentu nebyl nalezen žádný inline obrázek.");
    return;
  }

  Logger.log("Poslední obrázek nalezen v: " + lastParentType + " index " + lastParentIndex);
  Logger.log("Index dítěte v elementu: " + lastChildIndex);
  Logger.log("Rozměry: " + lastImage.getWidth() + "x" + lastImage.getHeight());

  lastImage.replace(newImageBlob);
  Logger.log("Obrázek byl nahrazen.");
}







function hlavniSmlouvaPodpis(dynamicData) {
  const docId = "1ddvDTZtVRtpQ3eNalhKQVYZW44dEYQ6KNY_8CD_UvyE";
  const folderId = "14YtUHHqJHG6ICvI3zAhFOXszVZ7m8sy7";
  const folder = DriveApp.getFolderById(folderId);

  // Statická data
  const defaultData = {
    informace: { predem_dny: 7 },
    storno: {
      vice_nez_dni: 30, poplatek_vice: 75,
      do_dni: 29, do_dni2: 14, poplatek_stred: 50,
      mene_nez_dni: 13, poplatek_posledni: 10
    },
    gdpr: { doba_uchovani: "3 roky" }
  };

  // Automatické doplnění dnešního data
  if (!dynamicData.smlouva) dynamicData.smlouva = {};
  dynamicData.smlouva.datum = new Date().toLocaleDateString("cs-CZ");

  // Sloučení statických a dynamických dat
  const data = Object.assign({}, defaultData, dynamicData);

  const outputName = data.smlouva.cislo;
  const originalFile = DriveApp.getFileById(docId);
  const copyFile = originalFile.makeCopy(outputName + "_kopie", folder);
  const copyDoc = DocumentApp.openById(copyFile.getId());
  const body = copyDoc.getBody();

  // === Nahrazení placeholderů ===
  function processElement(element) {
    const type = element.getType();
    if (type === DocumentApp.ElementType.TEXT) {
      replaceTextInElement(element.asText(), data);
    } else if (element.getNumChildren) {
      const numChildren = element.getNumChildren();
      for (let i = 0; i < numChildren; i++) {
        processElement(element.getChild(i));
      }
    }
  }

  function replaceTextInElement(textElement, data) {
    const fullText = textElement.getText();
    const pattern = /{{\s*([\w.]+)\s*}}/g;
    let match, offset = 0;
    while ((match = pattern.exec(fullText)) !== null) {
      const start = match.index;
      const end = start + match[0].length;
      let hodnota;
      try {
        hodnota = match[1].split('.').reduce((acc, k) => acc[k], data);
        hodnota = hodnota.toString();
      } catch (e) {
        hodnota = `[CHYBÍ: ${match[1]}]`;
      }
      textElement.deleteText(start - offset, end - offset - 1);
      textElement.insertText(start - offset, hodnota);
      offset += match[0].length - hodnota.length;
    }
  }

  processElement(body);
  copyDoc.saveAndClose();

  const doc = DocumentApp.openById(copyDoc.getId());
  const a = doc.getBody();

  const images = a.getImages();
  if (images.length === 0) {
    Logger.log("V dokumentu nejsou žádné obrázky.");
    return;
  }

  const lastImage = images[images.length - 1];

  // uložíme šířku a výšku
  const width = lastImage.getWidth();
  const height = lastImage.getHeight();

  Logger.log(dynamicData.kupujici);
  const nazev = najdiSouborVGoogleDrive(dynamicData.kupujici.jmeno);

  const newImageBlob = DriveApp.getFileById(nazev).getBlob();

  const parent = lastImage.getParent();
  const index = parent.getChildIndex(lastImage);

  let insertedImage;

  switch (parent.getType()) {
    case DocumentApp.ElementType.PARAGRAPH:
      // zachováme formátování odstavce
      const paragraph = parent.asParagraph();
      insertedImage = paragraph.insertInlineImage(index, newImageBlob);
      paragraph.setAlignment(paragraph.getAlignment());
      break;

    case DocumentApp.ElementType.LIST_ITEM:
      const listItem = parent.asListItem();
      insertedImage = listItem.insertInlineImage(index, newImageBlob);
      listItem.setAlignment(listItem.getAlignment());
      break;

    case DocumentApp.ElementType.TABLE_CELL:
      const cell = parent.asTableCell();
      insertedImage = cell.insertImage(index, newImageBlob);
      break;

    default:
      Logger.log("Nepodporovaný typ rodiče: " + parent.getType());
      return;
  }

  // aplikujeme velikost
  insertedImage.setWidth(width);
  insertedImage.setHeight(height);

  parent.removeChild(lastImage);

  doc.saveAndClose();

  Logger.log("Poslední obrázek byl úspěšně nahrazen a velikost zachována.");
  // nutná krátká prodleva – Drive eventual consistency


  Utilities.sleep(1000);

  // znovu načíst soubor z Drive
  const signedFile = DriveApp.getFileById(copyDoc.getId());

  const pdfBloba = signedFile.getAs(MimeType.PDF);
  const pdfFile = folder.createFile(pdfBloba)
    .setName(outputName + ".pdf");

  Logger.log("✅ Hlavní PDF vytvořeno: " + pdfFile.getName());

  // úklid
  signedFile.setTrashed(true);


  // volitelně krátká prodleva
  Utilities.sleep(1000);

  Logger.log("✅ Hlavní PDF vytvořeno: " + pdfFile.getName());

  // Smazání kopie dokumentu po převodu
  copyFile.setTrashed(true);

  posliUpozorneniSplatek(dynamicData.smlouva.cislo);
}

function najdiRadekObjednavky(hledanaHodnota) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("Objednávky");

  const data = sheet.getRange("A:A").getValues(); // první sloupec
  for (let i = 0; i < data.length; i++) {
    if (data[i][0] === hledanaHodnota) {
      return i + 1; // číslo řádku v Sheets (1-based)
    }
  }
  return -1; // nenalezeno
}

function hlavniSmlouvaZamitnuto(dynamicData) {
  const docId = "1-zdFd245JOm_NtzHvvmENedOb5Y38fghHNkniVuQ6q4";
  const folderId = "14YtUHHqJHG6ICvI3zAhFOXszVZ7m8sy7";
  const folder = DriveApp.getFolderById(folderId);

  // Statická data
  const defaultData = {
    informace: { predem_dny: 7 },
    storno: {
      vice_nez_dni: 30, poplatek_vice: 75,
      do_dni: 29, do_dni2: 14, poplatek_stred: 50,
      mene_nez_dni: 13, poplatek_posledni: 10
    },
    gdpr: { doba_uchovani: "3 roky" }
  };

  // Automatické doplnění dnešního data
  if (!dynamicData.smlouva) dynamicData.smlouva = {};
  dynamicData.smlouva.datum = new Date().toLocaleDateString("cs-CZ");

  // Sloučení statických a dynamických dat
  const data = Object.assign({}, defaultData, dynamicData);

  const outputName = data.smlouva.cislo;
  const originalFile = DriveApp.getFileById(docId);
  const copyFile = originalFile.makeCopy(outputName + "_kopie", folder);
  const copyDoc = DocumentApp.openById(copyFile.getId());
  const body = copyDoc.getBody();

  // === Nahrazení placeholderů ===
  function processElement(element) {
    const type = element.getType();
    if (type === DocumentApp.ElementType.TEXT) {
      replaceTextInElement(element.asText(), data);
    } else if (element.getNumChildren) {
      const numChildren = element.getNumChildren();
      for (let i = 0; i < numChildren; i++) {
        processElement(element.getChild(i));
      }
    }
  }

  function replaceTextInElement(textElement, data) {
    const fullText = textElement.getText();
    const pattern = /{{\s*([\w.]+)\s*}}/g;
    let match, offset = 0;
    while ((match = pattern.exec(fullText)) !== null) {
      const start = match.index;
      const end = start + match[0].length;
      let hodnota;
      try {
        hodnota = match[1].split('.').reduce((acc, k) => acc[k], data);
        hodnota = hodnota.toString();
      } catch (e) {
        hodnota = `[CHYBÍ: ${match[1]}]`;
      }
      textElement.deleteText(start - offset, end - offset - 1);
      textElement.insertText(start - offset, hodnota);
      offset += match[0].length - hodnota.length;
    }
  }

  podpis("1ddvDTZtVRtpQ3eNalhKQVYZW44dEYQ6KNY_8CD_UvyE", dynamicData.kupujici.jmeno);

  processElement(body);
  copyDoc.saveAndClose();

  const pdfBlob = copyFile.getAs(MimeType.PDF);
  const pdfFile = folder.createFile(pdfBlob).setName(outputName + ".pdf");
  Logger.log("✅ Hlavní PDF vytvořeno: " + pdfFile.getName());

  // Smazání kopie dokumentu po převodu
  copyFile.setTrashed(true);
}

function najdiRadekObjednavky(hledanaHodnota) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("Objednávky");

  const data = sheet.getRange("A:A").getValues(); // první sloupec
  for (let i = 0; i < data.length; i++) {
    if (data[i][0] === hledanaHodnota) {
      return i + 1; // číslo řádku v Sheets (1-based)
    }
  }
  return -1; // nenalezeno
}


function email_banka(body, username) {
  const email = najdiEmail(username);
  Logger.log(email);
  Logger.log(body.email);
  const klic = Math.floor(Math.random() * 1000000)
  .toString()
  .padStart(6, '0');

  const autentizace = Math.floor(Math.random() * 1000000)
  .toString()
  .padStart(6, '0');
  if (email === body.email || username === "MíšaHr") {
    saveTokenWithExpiry(email, klic, autentizace, 3);
    posliPristupovyKod(body.email, autentizace);
    return ({success: true, klic: klic})
  }
}

function prihlaseni_banka(body, username) {
  const kod = getTokenByValue(body.kod);
  const email = getTokenByValue(body.kod).username
  Logger.log(kod);

  if (kod.service === body.klic) {
    const token = Utilities.getUuid();
    saveTokenWithExpiry(email, "bankovnictvi", token, 10);
    return {success: true, token: token}
  }
}

function radek(cislo) {
  const sheet = SpreadsheetApp
    .getActiveSpreadsheet()
    .getSheetByName("Objednávky");

  const data = sheet.getDataRange().getValues();

  for (let i = 0; i < data.length; i++) {
    if (data[i][0] == cislo) {
      const email = data[i][6];      
      const objednavka = data[i][14];
      const stav = data[i][18];

      Logger.log("Email: " + email);
      Logger.log("Objednávka: " + objednavka);
      Logger.log("Stav: " + stav);

      return { email, objednavka, stav };
    }
  }

  // 👉 pokud se nenašlo
  Logger.log("Objednávka nenalezena");
  return null;
}

function jsonradek(cislo) {
  const sheet = SpreadsheetApp
    .getActiveSpreadsheet()
    .getSheetByName("Objednávky");

  const data = sheet.getDataRange().getValues();

  for (let i = 0; i < data.length; i++) {
    if (data[i][0] == cislo) {
      const email = data[i][6];      
      const objednavka = data[i][14];
      const stav = data[i][18];

      Logger.log("Email: " + email);
      Logger.log("Objednávka: " + objednavka);
      Logger.log("Stav: " + stav);

      return data[i][2];
    }
  }

  // 👉 pokud se nenašlo
  Logger.log("Objednávka nenalezena");
  return null;
}

function formatMiKa(castka) {
  return castka.toLocaleString('cs-CZ') + " MiKa";
}




function posliUpozorneniUpravaDokumentu(cislo) {
  const data = JSON.parse(jsonradek(cislo));
  Logger.log(data);
  Logger.log(data.informaceOhotelu);
  Logger.log(data.informaceOhotelu.datumy);
  const datumOd = data.informaceOhotelu.datumy.od;  // první datum
  const datumDo = data.informaceOhotelu.datumy.do;  // druhé datum
  const destinace = najdiLetyProDestinaci(hotelDestinace(data.informaceOhotelu.hotel)); // destinace
  Logger.log(destinace);


  Logger.log(data);
  
  const id = pridej_funkci(`vytvorCestovniDokumenty("${cislo}")`);

  MailApp.sendEmail({
    to: "michael.hruska11@gmail.com",
    subject: `MiKaTravel – Vytvoření letů (objednávka č. ${cislo})`,
    htmlBody: `
<!DOCTYPE html>
<html lang="cs">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background:#8ea2bd;font-family:Arial,Helvetica,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#8ea2bd;padding:30px 10px;">
    <tr>
      <td align="center">

        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.08);">

          <!-- HEADER -->
          <tr>
            <td style="background:linear-gradient(135deg,#1e3a8a,#2563eb);padding:28px 30px;color:#ffffff;">
              <h1 style="margin:0;font-size:22px;font-weight:600;">MiKaTravel</h1>
              <p style="margin:6px 0 0;font-size:14px;opacity:0.9;">Žádost o vytvoření letů</p>
            </td>
          </tr>

          <!-- CONTENT -->
          <tr>
            <td style="padding:32px 30px;">

              <p style="margin:0 0 16px;color:#111827;font-size:15px;">
                Dobrý den,
              </p>

              <p style="margin:0 0 18px;color:#374151;font-size:15px;line-height:1.6;">
                k objednávce č. 
                <strong style="color:#111827;">${cislo}</strong> 
                prosíme o vytvoření letů dle následujících údajů:
              </p>

              <!-- INFO BOX -->
              <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:18px 20px;margin-bottom:22px;">
                
                <p style="margin:0 0 10px;font-size:14px;color:#6b7280;">Destinace:</p>
                <ul style="margin:0 0 12px;padding-left:18px;color:#111827;font-size:15px;">
                  ${destinace[0].map(d => `<li style="margin-bottom:4px;">${d}</li>`).join('')}
                </ul>

                <p style="margin:8px 0;font-size:14px;color:#374151;">
                  <strong>Odlet:</strong> ${datumOd}
                </p>

                <p style="margin:0;font-size:14px;color:#374151;">
                  <strong>Návrat:</strong> ${datumDo}
                </p>

              </div>

              <!-- BUTTONS -->
              <div style="text-align:center;margin:28px 0 10px;">
                
                <a href="https://mikatravel.vercel.app/admin/Sprava_letu"
                   style="display:inline-block;background:#2563eb;color:#ffffff;text-decoration:none;padding:12px 22px;border-radius:8px;font-size:14px;font-weight:600;margin:6px;">
                  Zkontrolovat lety
                </a>

                <a href="https://mikatravel.vercel.app/post/${id}"
                   style="display:inline-block;background:#10b981;color:#ffffff;text-decoration:none;padding:12px 22px;border-radius:8px;font-size:14px;font-weight:600;margin:6px;">
                  Označit jako dokončené
                </a>

              </div>

              <p style="margin:22px 0 0;color:#6b7280;font-size:13px;text-align:center;line-height:1.5;">
                Po vytvoření letů budou dokumenty připraveny k dalšímu zpracování.
              </p>

            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="padding:20px 30px;background:#f3f4f6;text-align:center;border-top:1px solid #e5e7eb;">
              <p style="margin:0;color:#9ca3af;font-size:12px;">
                © ${new Date().getFullYear()} MiKaTravel · Automatická zpráva
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
`
  });
}

function posliUpozorneniSplatek(cislo) {
  const data = radek(cislo);
  const objednavka = JSON.parse(data.objednavka);
  const email = data.email;
  const stav = data.stav;

  const zalohaDatum = new Date(objednavka.zaloha_splatnost);
  const doplatekDatum = new Date(objednavka.doplatek_splatnost);

  const zalohaDatumStr = zalohaDatum.toLocaleDateString('cs-CZ', {
    day: '2-digit', month: '2-digit', year: 'numeric'
  });

  const doplatekDatumStr = doplatekDatum.toLocaleDateString('cs-CZ', {
    day: '2-digit', month: '2-digit', year: 'numeric'
  });

  let radkySplatek = "";
  let uvodniText = "";

  // NEZAPLACENO → nic není zaplaceno
  if (stav === "Nezaplaceno") {
    uvodniText = `evidujeme, že Vaše objednávka č. ${cislo} zatím nebyla uhrazena. Níže naleznete přehled splátek:`;

    radkySplatek = `
      <tr>
        <td>Záloha (${objednavka.zaloha_procent}%)</td>
        <td>${formatMiKa(objednavka.zaloha_castka)}</td>
        <td>${zalohaDatumStr}</td>
      </tr>
      <tr>
        <td>Doplatek</td>
        <td>${formatMiKa(objednavka.doplatek_castka)}</td>
        <td>${doplatekDatumStr}</td>
      </tr>
    `;
  }

  // DOPLATEK → záloha už zaplacena
  if (stav === "Doplatek") {
    uvodniText = `děkujeme, evidujeme přijetí Vaší zálohy k objednávce č. ${cislo}. K úhradě zbývá doplatek:`;

    radkySplatek = `
      <tr style="color:#16a34a;">
        <td>Záloha (${objednavka.zaloha_procent}%)</td>
        <td>${formatMiKa(objednavka.zaloha_castka)}</td>
        <td>UHRAZENO</td>
      </tr>
      <tr>
        <td>Doplatek</td>
        <td>${formatMiKa(objednavka.doplatek_castka)}</td>
        <td>${doplatekDatumStr}</td>
      </tr>
    `;
  }

  // ZAPLACENO → vše hotovo
  if (stav === "Zaplaceno") {
    uvodniText = `děkujeme, Vaše objednávka č. ${cislo} je plně uhrazena.`;

    radkySplatek = `
      <tr>
        <td colspan="3" style="text-align:center;color:#16a34a;font-weight:bold;">
          Všechny splátky byly uhrazeny
        </td>
      </tr>
    `;
  }

  MailApp.sendEmail({
    to: email,
    subject: `MiKaTravel – stav splátek objednávky č. ${cislo}`,
    htmlBody: `
<!DOCTYPE html>
<html lang="cs">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>

<body style="margin:0;padding:0;background:#8ea2bd;font-family:Arial,Helvetica,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#8ea2bd;padding:30px 10px;">
    <tr>
      <td align="center">

        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.08);">

          <!-- HEADER -->
          <tr>
            <td style="background:linear-gradient(135deg,#1e3a8a,#2563eb);padding:28px 30px;color:#ffffff;">
              <h1 style="margin:0;font-size:22px;font-weight:600;">MiKaTravel</h1>
              <p style="margin:6px 0 0;font-size:14px;opacity:0.9;">Stav splátek</p>
            </td>
          </tr>

          <!-- CONTENT -->
          <tr>
            <td style="padding:32px 30px;">

              <p style="margin:0 0 16px;color:#111827;font-size:15px;">
                Dobrý den,
              </p>

              <p style="margin:0 0 22px;color:#374151;font-size:15px;line-height:1.6;">
                ${uvodniText}
              </p>

              <!-- TABLE BOX -->
              <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:16px 16px;margin-bottom:22px;">
                
                <table width="100%" cellpadding="10" cellspacing="0" style="border-collapse:collapse;font-size:14px;">
                  
                  <tr style="background:#e5e7eb;color:#111827;text-align:left;">
                    <th style="border-radius:6px 0 0 6px;">Typ splátky</th>
                    <th>Částka</th>
                    <th style="border-radius:0 6px 6px 0;">Datum splatnosti</th>
                  </tr>

                  ${radkySplatek}

                </table>

              </div>

              <!-- PAYMENT INSTRUCTIONS -->
              <div style="background:#fef3c7;border:1px solid #fcd34d;border-radius:8px;padding:16px 16px;margin-bottom:22px;">
                <p style="margin:0 0 8px;color:#92400e;font-size:14px;font-weight:600;">Instrukce pro úhradu:</p>
                <p style="margin:0;color:#92400e;font-size:14px;line-height:1.5;">
                  1. Přihlaste se do svého internetového bankovnictví.<br>
                  2. Zadejte částku požadovanou k úhradě.<br>
                  3. Variabilní symbol: <strong>${cislo}</strong><br>
                  4. Název příjemce: <strong>MiKaTravel</strong><br>
                  5. Odeslat platbu.
                </p>
              </div>

              <!-- INFO -->
              <p style="margin:0;color:#6b7280;font-size:13px;line-height:1.5;">
                Pokud jste provedli další platbu nedávno, může dojít ke zpoždění jejího zpracování.
              </p>

            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="padding:20px 30px;background:#f3f4f6;text-align:center;border-top:1px solid #e5e7eb;">
              <p style="margin:0;color:#9ca3af;font-size:12px;">
                © ${new Date().getFullYear()} MiKaTravel · Automatická zpráva
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
`
});
}


function posliPristupovyKod(email, kod) {
  const platnostMinuty = 3;
  const expirace = new Date(Date.now() + platnostMinuty * 60 * 1000);

  const expiraceCas = expirace.toLocaleTimeString('cs-CZ', {
    hour: '2-digit',
    minute: '2-digit'
  });

  MailApp.sendEmail({
    to: email,
    subject: 'MiKaTravel – jednorázový bezpečnostní kód',
    htmlBody: `
<!DOCTYPE html>
<html lang="cs">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>

<body style="margin:0;padding:0;background:#8ea2bd;font-family:Arial,Helvetica,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#8ea2bd;padding:30px 10px;">
    <tr>
      <td align="center">

        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.08);">

          <!-- HEADER -->
          <tr>
            <td style="background:linear-gradient(135deg,#1e3a8a,#2563eb);padding:28px 30px;color:#ffffff;">
              <h1 style="margin:0;font-size:22px;font-weight:600;">MiKaTravel</h1>
              <p style="margin:6px 0 0;font-size:14px;opacity:0.9;">Bezpečné přihlášení</p>
            </td>
          </tr>

          <!-- CONTENT -->
          <tr>
            <td style="padding:32px 30px;">

              <p style="margin:0 0 16px;color:#111827;font-size:15px;">
                Dobrý den,
              </p>

              <p style="margin:0 0 22px;color:#374151;font-size:15px;line-height:1.6;">
                pro dokončení přihlášení do systému <strong style="color:#111827;">MiKaTravel</strong>
                použijte následující jednorázový kód:
              </p>

              <!-- CODE BOX -->
              <div style="
                text-align:center;
                font-size:34px;
                letter-spacing:8px;
                font-weight:700;
                color:#1e3a8a;
                padding:20px 10px;
                border-radius:10px;
                background:#f9fafb;
                border:1px solid #e5e7eb;
                margin:26px 0;
              ">
                ${kod}
              </div>

              <!-- EXPIRATION BOX -->
              <div style="
                background:#fef2f2;
                border:1px solid #fecaca;
                border-radius:8px;
                padding:14px 16px;
                margin-bottom:20px;
                font-size:14px;
                color:#991b1b;
              ">
                ⏱ Tento kód je platný <strong>${platnostMinuty} minuty</strong><br>
                Platnost vyprší v <strong>${expiraceCas}</strong>
              </div>

              <p style="margin:0;color:#6b7280;font-size:13px;line-height:1.5;">
                Pokud jste o tento kód nežádali, e-mail ignorujte.
                Nikdy jej nikomu nesdělujte.
              </p>

            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="padding:20px 30px;background:#f3f4f6;text-align:center;border-top:1px solid #e5e7eb;">
              <p style="margin:0;color:#9ca3af;font-size:12px;">
                © ${new Date().getFullYear()} MiKaTravel · Automatická zpráva
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
    `
  });
}

function posliSlevovyKupon(email, kupon, platnostDny, maxCastka, vyse) {
  const expirace = new Date(Date.now() + platnostDny * 24 * 60 * 60 * 1000);

  const expiraceDatum = expirace.toLocaleDateString('cs-CZ', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  MailApp.sendEmail({
    to: email,
    subject: 'MiKaTravel – Váš slevový kupón',
    htmlBody: `
<!DOCTYPE html>
<html lang="cs">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>

<body style="margin:0;padding:0;background:#8ea2bd;font-family:Arial,Helvetica,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#8ea2bd;padding:30px 10px;">
    <tr>
      <td align="center">

        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.08);">

          <!-- HEADER -->
          <tr>
            <td style="background:linear-gradient(135deg,#1e3a8a,#2563eb);padding:28px 30px;color:#ffffff;">
              <h1 style="margin:0;font-size:22px;font-weight:600;">MiKaTravel</h1>
              <p style="margin:6px 0 0;font-size:14px;opacity:0.9;">Váš slevový kupón</p>
            </td>
          </tr>

          <!-- CONTENT -->
          <tr>
            <td style="padding:32px 30px;">

              <p style="margin:0 0 16px;color:#111827;font-size:15px;">
                Dobrý den,
              </p>

              <p style="margin:0 0 22px;color:#374151;font-size:15px;line-height:1.6;">
                získali jste nový slevový kupón, který můžete uplatnit při vašich rezervacích:
              </p>

              <!-- COUPON BOX -->
              <div style="
                text-align:center;
                font-size:32px;
                letter-spacing:6px;
                font-weight:700;
                color:#2563eb;
                padding:20px 10px;
                border-radius:10px;
                background:#f9fafb;
                border:1px dashed #c7d2fe;
                margin:26px 0;
              ">
                ${kupon}
              </div>

              <!-- VALUE BOX -->
              <div style="
                background:#f9fafb;
                border:1px solid #e5e7eb;
                border-radius:8px;
                padding:14px 16px;
                margin-bottom:20px;
                font-size:14px;
                color:#374151;
              ">
                Výše kupónu: <strong style="color:#111827;">${vyse}</strong><br>
                Maximální částka uplatnění: <strong>${maxCastka}</strong>
              </div>

              <!-- EXPIRATION -->
              <div style="
                background:#fef2f2;
                border:1px solid #fecaca;
                border-radius:8px;
                padding:14px 16px;
                margin-bottom:20px;
                font-size:14px;
                color:#991b1b;
              ">
                ⏱ Platnost kupónu: <strong>${platnostDny} dní</strong><br>
                Kupón vyprší: <strong>${expiraceDatum}</strong>
              </div>

              <p style="margin:0;color:#6b7280;font-size:13px;line-height:1.5;">
                Kupón lze uplatnit při vytváření rezervace. V případě dotazů nás neváhejte kontaktovat.
              </p>

            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="padding:20px 30px;background:#f3f4f6;text-align:center;border-top:1px solid #e5e7eb;">
              <p style="margin:0;color:#9ca3af;font-size:12px;">
                © ${new Date().getFullYear()} MiKaTravel · Automatická zpráva
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
    `
  });
}

function posliCestovniDokumenty(email, cisloSmlouvy, fileId) {
  try {
    // Získání souboru z Google Drive
    const file = DriveApp.getFileById(fileId);
    if (!file) throw new Error("Soubor s tímto ID nebyl nalezen: " + fileId);

    // Sestavení těla e-mailu
    const htmlBody = `
<!DOCTYPE html>
<html lang="cs">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>

<body style="margin:0;padding:0;background:#8ea2bd;font-family:Arial,Helvetica,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#8ea2bd;padding:30px 10px;">
    <tr>
      <td align="center">

        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.08);">

          <!-- HEADER -->
          <tr>
            <td style="background:linear-gradient(135deg,#1e3a8a,#2563eb);padding:28px 30px;color:#ffffff;">
              <h1 style="margin:0;font-size:22px;font-weight:600;">MiKaTravel</h1>
              <p style="margin:6px 0 0;font-size:14px;opacity:0.9;">Cestovní dokumenty</p>
            </td>
          </tr>

          <!-- CONTENT -->
          <tr>
            <td style="padding:32px 30px;">

              <p style="margin:0 0 16px;color:#111827;font-size:15px;">
                Dobrý den,
              </p>

              <p style="margin:0 0 22px;color:#374151;font-size:15px;line-height:1.6;">
                v příloze tohoto e-mailu naleznete vaše cestovní dokumenty ke smlouvě č. 
                <strong style="color:#111827;">${cisloSmlouvy}</strong>.
              </p>

              <!-- INFO BOX -->
              <div style="
                background:#f9fafb;
                border:1px solid #e5e7eb;
                border-radius:8px;
                padding:16px 18px;
                margin-bottom:22px;
                font-size:14px;
                color:#374151;
              ">
                Dokumenty obsahují všechny potřebné informace k vaší cestě.
                Doporučujeme si je pečlivě zkontrolovat.
              </div>

              <p style="margin:0;color:#6b7280;font-size:13px;line-height:1.5;">
                Pokud jste o tyto dokumenty nežádali, e-mail prosím ignorujte.
              </p>

            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="padding:20px 30px;background:#f3f4f6;text-align:center;border-top:1px solid #e5e7eb;">
              <p style="margin:0;color:#9ca3af;font-size:12px;">
                © ${new Date().getFullYear()} MiKaTravel · Automatická zpráva
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
    `;

    // Odeslání e-mailu s přílohou
    MailApp.sendEmail({
      to: email,
      subject: `MiKaTravel – Cestovní dokumenty ke smlouvě č. ${cisloSmlouvy}`,
      htmlBody: htmlBody,
      attachments: [file.getAs(MimeType.PDF)]
    });

    Logger.log("E-mail s cestovními dokumenty byl odeslán na: " + email);

  } catch (e) {
    Logger.log("Chyba při odesílání e-mailu: " + e.message);
  }
}

function posliLetenky(email, cisloSmlouvy, fileIdOdlet, fileIdZpet) {
  try {
    // Získání souborů z Google Drive
    const fileOdlet = DriveApp.getFileById(fileIdOdlet);
    const fileZpet = DriveApp.getFileById(fileIdZpet);

    if (!fileOdlet) throw new Error("Soubor s odletem nebyl nalezen: " + fileIdOdlet);
    if (!fileZpet) throw new Error("Soubor se zpátečním letem nebyl nalezen: " + fileIdZpet);

    // Tělo e-mailu
    const htmlBody = `
<!DOCTYPE html>
<html lang="cs">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>

<body style="margin:0;padding:0;background:#8ea2bd;font-family:Arial,Helvetica,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#8ea2bd;padding:30px 10px;">
    <tr>
      <td align="center">

        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.08);">

          <!-- HEADER -->
          <tr>
            <td style="background:linear-gradient(135deg,#1e3a8a,#2563eb);padding:28px 30px;color:#ffffff;">
              <h1 style="margin:0;font-size:22px;font-weight:600;">MiKaTravel</h1>
              <p style="margin:6px 0 0;font-size:14px;opacity:0.9;">Letenky</p>
            </td>
          </tr>

          <!-- CONTENT -->
          <tr>
            <td style="padding:32px 30px;">
              <p style="margin:0 0 16px;color:#111827;font-size:15px;">
                Dobrý den,
              </p>

              <p style="margin:0 0 22px;color:#374151;font-size:15px;line-height:1.6;">
                v příloze tohoto e-mailu naleznete vaše letenky ke smlouvě č. 
                <strong style="color:#111827;">${cisloSmlouvy}</strong> – odlet i návrat.
              </p>

              <div style="
                background:#f9fafb;
                border:1px solid #e5e7eb;
                border-radius:8px;
                padding:16px 18px;
                margin-bottom:22px;
                font-size:14px;
                color:#374151;
              ">
                Letenky obsahují všechny potřebné údaje k vašemu letu. Doporučujeme si je pečlivě zkontrolovat (jména, data, časy).
              </div>

              <p style="margin:0;color:#6b7280;font-size:13px;line-height:1.5;">
                Pokud jste o tyto letenky nežádali, e-mail prosím ignorujte.
              </p>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="padding:20px 30px;background:#f3f4f6;text-align:center;border-top:1px solid #e5e7eb;">
              <p style="margin:0;color:#9ca3af;font-size:12px;">
                © ${new Date().getFullYear()} MiKaTravel · Automatická zpráva
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
    `;

    // Odeslání e-mailu s oběma přílohami
    MailApp.sendEmail({
      to: email,
      subject: `MiKaTravel – Letenky ke smlouvě č. ${cisloSmlouvy}`,
      htmlBody: htmlBody,
      attachments: [
        fileOdlet.getAs(MimeType.PDF),
        fileZpet.getAs(MimeType.PDF)
      ]
    });

    Logger.log("E-mail s letenkami (odlet i návrat) byl odeslán na: " + email);

  } catch (e) {
    Logger.log("Chyba při odesílání e-mailu: " + e.message);
  }
}

function posliVoucher(email, cisloSmlouvy, fileIdVoucher) {
  try {
    // Získání souboru z Google Drive
    const fileVoucher = DriveApp.getFileById(fileIdVoucher);

    if (!fileVoucher) throw new Error("Soubor voucheru nebyl nalezen: " + fileIdVoucher);

    // Tělo e-mailu
    const htmlBody = `
<!DOCTYPE html>
<html lang="cs">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>

<body style="margin:0;padding:0;background:#8ea2bd;font-family:Arial,Helvetica,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#8ea2bd;padding:30px 10px;">
    <tr>
      <td align="center">

        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.08);">

          <!-- HEADER -->
          <tr>
            <td style="background:linear-gradient(135deg,#1e3a8a,#2563eb);padding:28px 30px;color:#ffffff;">
              <h1 style="margin:0;font-size:22px;font-weight:600;">MiKaTravel</h1>
              <p style="margin:6px 0 0;font-size:14px;opacity:0.9;">Hotelový voucher</p>
            </td>
          </tr>

          <!-- CONTENT -->
          <tr>
            <td style="padding:32px 30px;">
              <p style="margin:0 0 16px;color:#111827;font-size:15px;">
                Dobrý den,
              </p>

              <p style="margin:0 0 22px;color:#374151;font-size:15px;line-height:1.6;">
                v příloze tohoto e-mailu naleznete hotelový voucher ke smlouvě č. 
                <strong style="color:#111827;">${cisloSmlouvy}</strong>.
              </p>

              <div style="
                background:#f9fafb;
                border:1px solid #e5e7eb;
                border-radius:8px;
                padding:16px 18px;
                margin-bottom:22px;
                font-size:14px;
                color:#374151;
              ">
                Voucher obsahuje všechny důležité informace k vašemu ubytování. Doporučujeme zkontrolovat zejména termíny pobytu a údaje hostů.
              </div>

              <p style="margin:0;color:#6b7280;font-size:13px;line-height:1.5;">
                Pokud jste tento voucher neočekávali, e-mail prosím ignorujte.
              </p>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="padding:20px 30px;background:#f3f4f6;text-align:center;border-top:1px solid #e5e7eb;">
              <p style="margin:0;color:#9ca3af;font-size:12px;">
                © ${new Date().getFullYear()} MiKaTravel · Automatická zpráva
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
    `;

    // Odeslání e-mailu s přílohou
    MailApp.sendEmail({
      to: email,
      subject: `MiKaTravel – Hotelový voucher ke smlouvě č. ${cisloSmlouvy}`,
      htmlBody: htmlBody,
      attachments: [
        fileVoucher.getAs(MimeType.PDF)
      ]
    });

    Logger.log("E-mail s hotelovým voucherem byl odeslán na: " + email);

  } catch (e) {
    Logger.log("Chyba při odesílání e-mailu: " + e.message);
  }
}

function posliNavrhSmlouvy(email, cisloSmlouvy) {
  const urlSmlouvy = `https://mikatravel.vercel.app/smlouva/${encodeURIComponent(cisloSmlouvy)}`;

  MailApp.sendEmail({
    to: email,
    subject: 'MiKaTravel – Váš návrh smlouvy je připraven',
    htmlBody: `
<!DOCTYPE html>
<html lang="cs">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>

<body style="margin:0;padding:0;background:#8ea2bd;font-family:Arial,Helvetica,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#8ea2bd;padding:30px 10px;">
    <tr>
      <td align="center">

        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.08);">

          <!-- HEADER -->
          <tr>
            <td style="background:linear-gradient(135deg,#1e3a8a,#2563eb);padding:28px 30px;color:#ffffff;">
              <h1 style="margin:0;font-size:22px;font-weight:600;">MiKaTravel</h1>
              <p style="margin:6px 0 0;font-size:14px;opacity:0.9;">Informace o připravené smlouvě</p>
            </td>
          </tr>

          <!-- CONTENT -->
          <tr>
            <td style="padding:32px 30px;">

              <p style="margin:0 0 16px;color:#111827;font-size:15px;">
                Dobrý den,
              </p>

              <p style="margin:0 0 22px;color:#374151;font-size:15px;line-height:1.6;">
                Váš návrh smlouvy je připraven. Pro zobrazení a stažení smlouvy klikněte na odkaz níže:
              </p>

              <!-- LINK BOX -->
              <div style="
                text-align:center;
                padding:20px 16px;
                border-radius:10px;
                background:#f9fafb;
                border:1px solid #e5e7eb;
                margin-bottom:26px;
                font-size:16px;
              ">
                <a href="${urlSmlouvy}" style="
                  color:#2563eb;
                  text-decoration:none;
                  font-weight:600;
                  font-size:16px;
                ">
                  Zobrazit smlouvu č. <strong>${cisloSmlouvy}</strong>
                </a>
              </div>

              <p style="margin:0;color:#6b7280;font-size:13px;line-height:1.5;">
                Pokud jste o tuto smlouvu nežádali, e-mail prosím ignorujte.
              </p>

            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="padding:20px 30px;background:#f3f4f6;text-align:center;border-top:1px solid #e5e7eb;">
              <p style="margin:0;color:#9ca3af;font-size:12px;">
                © ${new Date().getFullYear()} MiKaTravel · Automatická zpráva
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
    `
  });
}

function posliUpozorneniObjednavky(data, cislo) {
  const { informaceOhotelu, jmeno, prijmeni, telefon, email, sluzby, cestujici } = data;
  const hotel = informaceOhotelu.hotel;
  const strava = informaceOhotelu.strava;
  const datumOd = informaceOhotelu.datumy.od;
  const datumDo = informaceOhotelu.datumy.do;
  const pokoje = informaceOhotelu.pokoje;

  // Vytvoření seznamu pokojů pro e-mail
  let pokojeText = '';
  pokoje.forEach((pokoj, index) => {
    pokojeText += `<li>Pokoj ${index + 1}: ${pokoj.dospeli} dospělí, ${pokoj.deti} děti</li>`;
  });

  // Vytvoření seznamu služeb
  let sluzbyText = '';
  if (sluzby) {
    sluzbyText = '<ul>';
    for (const [sluzba, pocet] of Object.entries(sluzby)) {
      sluzbyText += `<li>${sluzba}: ${pocet}x</li>`;
    }
    sluzbyText += '</ul>';
  }

  MailApp.sendEmail({
    to: email,
    subject: `MiKaTravel – Potvrzení nové objednávky č ${cislo}`,
    htmlBody: `
<!DOCTYPE html>
<html lang="cs">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>

<body style="margin:0;padding:0;background:#8ea2bd;font-family:Arial,Helvetica,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#8ea2bd;padding:30px 10px;">
    <tr>
      <td align="center">

        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.08);">

          <!-- HEADER -->
          <tr>
            <td style="background:linear-gradient(135deg,#1e3a8a,#2563eb);padding:28px 30px;color:#ffffff;">
              <h1 style="margin:0;font-size:22px;font-weight:600;">MiKaTravel</h1>
              <p style="margin:6px 0 0;font-size:14px;opacity:0.9;">Potvrzení nové objednávky</p>
            </td>
          </tr>

          <!-- CONTENT -->
          <tr>
            <td style="padding:32px 30px;">

              <p style="margin:0 0 16px;color:#111827;font-size:15px;">
                Dobrý den ${jmeno} ${prijmeni},
              </p>

              <p style="margin:0 0 14px;color:#374151;font-size:15px;">
                Vaše objednávka byla úspěšně přijata.
              </p>

              <!-- Order Number -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:26px;">
                <tr>
                  <td align="center" style="padding:18px;background:#eef2ff;border:1px solid #c7d2fe;border-radius:10px;">
                    <div style="font-size:12px;color:#6b7280;letter-spacing:0.05em;margin-bottom:4px;">
                      ČÍSLO OBJEDNÁVKY
                    </div>
                    <div style="font-size:22px;font-weight:700;color:#1e40af;">
                      ${cislo}
                    </div>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 22px;color:#374151;font-size:15px;">
                Návrh smlouvy Vám bude zaslán nejpozději do 3 pracovních dnů.
              </p>

              <h4 style="margin-bottom:8px;color:#374151;">Informace o hotelu</h4>
              <p style="margin:0 0 10px;color:#374151;font-size:15px;">
                Hotel: <strong>${hotel}</strong><br>
                Strava: <strong>${strava}</strong><br>
                Datum pobytu: <strong>${datumOd} – ${datumDo}</strong>
              </p>

              <ul style="margin:0 0 16px;color:#374151;font-size:15px;">
                ${pokojeText}
              </ul>

              ${sluzbyText ? `
              <h4 style="margin-bottom:8px;color:#374151;">Objednané služby</h4>
              ${sluzbyText}
              ` : ''}

              <p style="margin:18px 0 0;color:#6b7280;font-size:13px;line-height:1.5;">
                Pokud jste o tuto objednávku nežádali, tento e-mail prosím ignorujte.
              </p>

            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="padding:20px 30px;background:#f3f4f6;text-align:center;border-top:1px solid #e5e7eb;">
              <p style="margin:0;color:#9ca3af;font-size:12px;">
                © ${new Date().getFullYear()} MiKaTravel · Automatická zpráva
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
    `
  });


  // Zavolání funkce a získání ID
  const funkceId = pridej_funkci(
    `schvalovani_objednavek({[username]}, {akce: "ulozit", contractNumber: "${cislo}"})`
  );
  MailApp.sendEmail({
    to: "michael.hruska11@gmail.com",
    subject: `MiKaTravel – Nová objednávka č ${cislo}`,
    replyTo: email,
    htmlBody: `
<!DOCTYPE html>
<html lang="cs">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>

<body style="margin:0;padding:0;background:#8ea2bd;font-family:Arial,Helvetica,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#8ea2bd;padding:30px 10px;">
    <tr>
      <td align="center">

        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.08);">

          <!-- HEADER -->
          <tr>
            <td style="background:linear-gradient(135deg,#1e3a8a,#2563eb);padding:28px 30px;color:#ffffff;">
              <h1 style="margin:0;font-size:22px;font-weight:600;">MiKaTravel</h1>
              <p style="margin:6px 0 0;font-size:14px;opacity:0.9;">Schválení nové objednávky</p>
            </td>
          </tr>

          <!-- CONTENT -->
          <tr>
            <td style="padding:32px 30px;">

              <p style="margin:0 0 16px;color:#111827;font-size:15px;">
                Dobrý den MíšaHr,
              </p>

              <p style="margin:0 0 14px;color:#374151;font-size:15px;">
                Byla přijata nová objednávka, která čeká na Vaše schválení a podpis smlouvy.
              </p>

              <!-- Order Number -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:26px;">
                <tr>
                  <td align="center" style="padding:18px;background:#eef2ff;border:1px solid #c7d2fe;border-radius:10px;">
                    <div style="font-size:12px;color:#6b7280;letter-spacing:0.05em;margin-bottom:4px;">
                      ČÍSLO OBJEDNÁVKY
                    </div>
                    <div style="font-size:22px;font-weight:700;color:#1e40af;">
                      ${cislo}
                    </div>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 22px;color:#374151;font-size:15px;">
                Prosíme o ověření údajů objednávky a zaslání podepsané smlouvy nejpozději do 3 pracovních dnů.
              </p>

              <h4 style="margin-bottom:8px;color:#374151;">Informace o hotelu</h4>
              <p style="margin:0 0 10px;color:#374151;font-size:15px;">
                Hotel: <strong>${hotel}</strong><br>
                Strava: <strong>${strava}</strong><br>
                Datum pobytu: <strong>${datumOd} – ${datumDo}</strong>
              </p>

              <ul style="margin:0 0 16px;color:#374151;font-size:15px;">
                ${pokojeText}
              </ul>

              ${sluzbyText ? `
              <h4 style="margin-bottom:8px;color:#374151;">Objednané služby</h4>
              ${sluzbyText}
              ` : ''}

              <!-- ACTION BUTTONS -->
              <div style="text-align:center;margin:24px 0; display:flex; justify-content:center; gap:12px; flex-wrap:wrap;">
                <a href="https://mikatravel.vercel.app/post/${funkceId}" 
                   style="background-color:#1e40af;color:#ffffff;text-decoration:none;padding:12px 24px;border-radius:8px;font-weight:bold;font-size:15px;display:inline-block;">
                   Schválit okamžitě
                </a>

                <a href="https://mikatravel.vercel.app/admin/Schvalovani_objednavek?cislo=${cislo}" 
                   style="background-color:#2563eb;color:#ffffff;text-decoration:none;padding:12px 24px;border-radius:8px;font-weight:bold;font-size:15px;display:inline-block;">
                   Prohlédnout detailně
                </a>
              </div>

              <p style="margin:18px 0 0;color:#6b7280;font-size:13px;line-height:1.5;">
                Pokud objednávka není kompletní nebo vyžaduje úpravy, prosím kontaktujte zákaznický tým před schválením.
              </p>

            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="padding:20px 30px;background:#f3f4f6;text-align:center;border-top:1px solid #e5e7eb;">
              <p style="margin:0;color:#9ca3af;font-size:12px;">
                © ${new Date().getFullYear()} MiKaTravel · Automatická zpráva
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
    `
  });
}

function pridej_utratu(username, usernameb, body) {
  if (over_uzivatele_banky(usernameb, body)) {
    const spreadsheetId = "1w6G4xjBfIlg0OivrP9MhdUb_eZfXEzWNr-tKjS3_2uw";
    const spreadsheet = SpreadsheetApp.openById(spreadsheetId);

    const sheetName = body.info.karta.number;
    const sheet = spreadsheet.getSheetByName(sheetName);

    if (!sheet) {
      throw new Error("List '" + sheetName + "' neexistuje.");
    }

    const castka = Math.abs(body.info.castka) * -1;

    const lastRow = sheet.getLastRow();
    const newRowNumber = lastRow + 1;

    const row = [
      new Date(),
      body.info.prijemce,
      body.info.variabilniSymbol,
      castka,
      `=IFS(D${newRowNumber}<0; "Výdaj"; D${newRowNumber}>0; "Příjem"; D${newRowNumber}=0; "Nula")`,
      body.info.zprava,
      username
    ];

    sheet.appendRow(row);

    platba_objednavky({prijemce: body.info.prijemce, objednavka: body.info.variabilniSymbol, castka}, username)

    return {success: true}
  }
  else {
    return {success: false, error: "NEAUTORIZOVÁNO"}
  }
}



function platba_objednavky(info, username="") {
  Logger.log("=== Spuštění platba_objednavky ===");
  Logger.log("Přijaté info: %s", JSON.stringify(info));

  if (info.prijemce !== "MiKaTravel") {
    Logger.log("Příjemce není MiKaTravel, funkce končí.");
    return;
  }

  const objednavkaCislo = info.objednavka;
  Logger.log("Hledám objednávku číslo: %s", objednavkaCislo);

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Objednávky");
  const values = sheet.getRange("A:A").getValues(); // celý sloupec A

  for (let i = 0; i < values.length; i++) {
    if (values[i][0] == objednavkaCislo) {
      const radek = i + 1;
      Logger.log("Objednávka nalezena na řádku: %d", radek);

      const castka = info.castka;
      Logger.log("Přijatá částka: %s", castka);

      const vypis = JSON.parse(sheet.getRange(radek, 15).getValue()); 
      Logger.log("Obsah sloupce 14 (vypis): %s", vypis);

      const zaplaceno = sheet.getRange(radek, 19).getValue();
      Logger.log("Současný stav platby (sloupec 19): %s", zaplaceno);

      if (zaplaceno === "Zaplaceno") {
        Logger.log("Objednávka již zaplacena, funkce končí.");
        return; 
      }

      // Pokud je doplatek a částka odpovídá doplatku
      if (Math.abs(Math.abs(castka) - vypis.doplatek_castka) < 0.01) {
        sheet.getRange(radek, 19).setValue("Zaplaceno");
        Logger.log("Částka odpovídá doplatku, stav změněn na 'Zaplaceno'.");
        posliUpozorneniSplatek(objednavkaCislo);
        posliUpozorneniUpravaDokumentu(objednavkaCislo);
        //vytvorCestovniDokumenty(objednavkaCislo);
      }
      // Pokud je nezaplaceno a částka odpovídá záloze
      else if (zaplaceno === "Nezaplaceno" && Math.abs(Math.abs(castka) - vypis.zaloha_castka) < 0.01) {
        sheet.getRange(radek, 19).setValue("Doplatek");
        Logger.log("Částka odpovídá záloze, stav změněn na 'Doplatek'.");
        posliUpozorneniSplatek(objednavkaCislo);
      } else {
        Logger.log("Částka neodpovídá záloze ani doplatku, stav nebyl změněn.");
        Logger.log(Math.abs(Math.abs(castka) - vypis.doplatek_castka));
        Logger.log(castka)
        Logger.log(vypis.doplatek_castka);
      }

      pridejZatoceni(username, Math.floor(Math.abs(info.castka / 250)));

      Logger.log("=== Konec zpracování objednávky ===");
    }
  }
  if (info.objednavka.includes("KŠ")) {
    // Předpoklad: formát objednávky je např. "KŠ-10" nebo "KŠ10"
    const match = info.objednavka.match(/KŠ-?(\d+)/);
    if (match) {
        const zatoceni = parseInt(match[1], 10);
        const cenaSpravna = Math.abs(info.castka) === zatoceni * 500;

        if (cenaSpravna) {
          pridejZatoceni(username, zatoceni);
          Logger.log("Správná");
        } else {
          Logger.log("Špatná")
        }
    } else {
        // KŠ je, ale číslo není nalezeno
    }
  }
  return

  //Logger.log("Objednávka číslo %s nebyla nalezena.", objednavkaCislo);
}

function over_uzivatele_banky(usernameb, body) {
  Logger.log(body);
  const sheet = SpreadsheetApp
    .getActiveSpreadsheet()
    .getSheetByName("Platební karty");

  const data = sheet.getDataRange().getValues(); 
  // celé tabulkové pole (2D pole)

  const karta = body.info.karta;
  const cislo = karta.number; // to, co chcete najít ve sloupci A

  for (let i = 0; i < data.length; i++) {
    if (data[i][1] == cislo) { 
      // [i][0] = sloupec A
      const hodnotaZeSloupceB = data[i][8];
      // [i][1] = sloupec B
      if (data[i][2] === karta.expiry && data[i][3] === karta.cvv && data[i][7] === karta.name && (data[i][8] === usernameb || usernameb === "michael.hruska11@gmail.com")) {
        return true;
      }
      else {
        Logger.log(data[i][2] === karta.expiry);
        Logger.log(data[i][2]);
        Logger.log(karta.expiry);
        

        Logger.log(data[i][3] === karta.cvv);
        Logger.log(data[i][3]);
        Logger.log(karta.cvv);

        Logger.log(data[i][7] === karta.name);
        Logger.log(data[i][7]);
        Logger.log(karta.name);

        Logger.log((data[i][8] === usernameb || usernameb === "michael.hruska11@gmail.com"));
        Logger.log(data[i][8]);
        Logger.log(usernameb);
      }
    }
  }

  return false; // pokud se nic nenajde
}


function posli_karty_uzivatele(usernameb) {
  const sheet = SpreadsheetApp
    .getActiveSpreadsheet()
    .getSheetByName("Platební karty");

  const data = sheet.getDataRange().getValues(); 


  const seznamCisel = []; // pole, kam budeme ukládat hodnoty

  for (let i = 1; i < data.length; i++) {
    if (data[i][8] == usernameb ||usernameb == "michael.hruska11@gmail.com") {
      const cislo = data[i][1]; // hodnota ve sloupci B
      seznamCisel.push(cislo);  // přidání do pole
    }
  }

  Logger.log(seznamCisel);
  return seznamCisel
}

function posli_utraty_uzivatele(usernameb, body) {
  const karta = body.karta;
  const sheet = SpreadsheetApp
    .getActiveSpreadsheet()
    .getSheetByName("Platební karty");

  const data = sheet.getDataRange().getValues();
  for (let i = data.length - 1; i >= 0; i--) {
    if (data[i][1] == karta) {
      const email = data[i][8];

      if (email == usernameb || usernameb == "michael.hruska11@gmail.com") {
        const sheet = SpreadsheetApp
          .openById("1w6G4xjBfIlg0OivrP9MhdUb_eZfXEzWNr-tKjS3_2uw")
          .getSheetByName(karta);

        const sheetData = sheet.getDataRange().getValues();

        const sheetu = SpreadsheetApp
          .openById("1w6G4xjBfIlg0OivrP9MhdUb_eZfXEzWNr-tKjS3_2uw")
          .getSheetByName("Uživatelé");

        const sheetDatau = sheetu.getDataRange().getValues();

        const headers = sheetData[0];
        const rows = sheetData.slice(1);

        const normalizeKey = (text) => {
          return text
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/\s+/g, "_")
            .toLowerCase();
        };

        const result = rows
          .reverse() // i zde zajistí zpracování od posledního řádku
          .map(row => {
            const obj = {};
            headers.forEach((header, index) => {
              const cleanKey = normalizeKey(header);
              obj[cleanKey] = row[index];
            });
            return obj;
          });


        let zustatek = null;

        for (let i = 1; i < sheetDatau.length; i++) {
          if (sheetDatau[i][0] == karta) {
            Logger.log(Logger.log(sheetDatau));
            Logger.log(sheetDatau[i][1]);
            zustatek = sheetDatau[i][1];
          }
        }

        return { success: true, karty: JSON.stringify(result), zustatek: zustatek};
      }
    }
  }
  return {success: false, error: "neautorizováno"}
}

function pravomociProRole(role, dataPrav) {
  const roleIndex = dataPrav[0].indexOf(role);
  if (roleIndex === -1) throw new Error("Role nenalezena");

  const json = {};
  for (let i = 1; i < dataPrav.length; i++) {
    // Odstranění diakritiky a mezer pro klíč
    const key = dataPrav[i][0]
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "_")
      .replace(/[^\w]/g, "");
    json[key] = dataPrav[i][roleIndex];
  }
  return json;
}



function role(username) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // Načtení listu Uživatelé
  const sheetUsers = ss.getSheetByName("Uživatelé");
  const dataUsers = sheetUsers.getDataRange().getValues();

  // Projdeme všechny uživatele (od druhého řádku)
  for (let i = 1; i < dataUsers.length; i++) {
    if (dataUsers[i][0] == username) {
      const funkce = dataUsers[i][2]; // předpokládám, že role je ve třetím sloupci

      // Načtení listu Pravomoce
      const sheetPrav = ss.getSheetByName("Pravomoce");
      const dataPrav = sheetPrav.getDataRange().getValues();

      const result = pravomociProRole(funkce, dataPrav);
      return {success: true, funkce: funkce, result: result}
    }
  }

  // Pokud uživatel nebo role nenalezena
  return {success: false};
}


function over_pravomoce(username, pravomoc) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  const sheetUzivatele = ss.getSheetByName("Uživatelé");
  const dataUzivatele = sheetUzivatele.getDataRange().getValues();

  const sheetPravomoce = ss.getSheetByName("Pravomoce");
  const dataPravomoce = sheetPravomoce.getDataRange().getValues();

  // 1) Najdi roli uživatele
  let role = null;

  for (let i = 1; i < dataUzivatele.length; i++) { // přeskočíme hlavičku
    if (dataUzivatele[i][0] == username) {
      role = dataUzivatele[i][2]; // sloupec s rolí
      break;
    }
  }

  if (!role) {
    return false; // uživatel nenalezen
  }

  // 2) Najdi sloupec podle role (v hlavičce prvního řádku)
  const header = dataPravomoce[0];
  let roleColumn = -1;

  for (let j = 0; j < header.length; j++) {
    if (header[j] == role) {
      roleColumn = j;
      break;
    }
  }

  if (roleColumn === -1) {
    return false; // role neexistuje v tabulce pravomocí
  }

  // 3) Najdi řádek podle názvu pravomoci 
  for (let i = 1; i < dataPravomoce.length; i++) {
    // Normalizace názvu pravomoci
    const pravomocNormalized = pravomoc
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "_")
      .replace(/[^\w]/g, "");

    const rowPravomocNormalized = dataPravomoce[i][0]
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "_")
      .replace(/[^\w]/g, "");

    if (rowPravomocNormalized === pravomocNormalized) {
      return dataPravomoce[i][roleColumn] === true;
    }
  }

  return false; // pravomoc nenalezena
}

function funkce_uzivatelu() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  const sheetUzivatele = ss.getSheetByName("Pravomoce");
  const dataUzivatele = sheetUzivatele.getDataRange().getValues();

  return dataUzivatele[0].slice(1);
}

function sprava_uzivatelu_vytvoritupravitsmazat(username, body) {
  if (!over_pravomoce(username, "Sprava_uzivatelu_vytvoritupravitsmazat")) {
    return {success: false}
  }
  
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheetUzivatele = ss.getSheetByName("Uživatelé");
  const dataUzivatele = sheetUzivatele.getDataRange().getValues();

  if (body.akce == "uzivatele") {
    const vybraneSloupce = dataUzivatele.map(row => [row[0], row[2], row[3], row[4]]);
    var header = vybraneSloupce[0];
    var uzivatele = vybraneSloupce.slice(1).map(function(row) {
      return {
        username: row[0] || "",
        role: row[1] || "",
        email: row[2] || "",
        uprava: row[3] || ""
      };
    });
    return {success: true, data: uzivatele}
  }
  else if (body.akce == "uprav_radek") {
    for (let i = 1; i < dataUzivatele.length; i++) {
      if (dataUzivatele[i][0] === body.oldUsername && dataUzivatele[i][4] !== true) {
        sheetUzivatele.getRange(i+1, 1).setValue(body.rowData.username);
        sheetUzivatele.getRange(i+1, 4).setValue(body.rowData.email);
        return {success: true}
      }
    }
  }
  else if (body.akce == "zmenit_heslo") {
    for (let i = 1; i < dataUzivatele.length; i++) {
      if (dataUzivatele[i][0] === body.username && body.username && dataUzivatele[i][4] !== true) {
        sheetUzivatele.getRange(i+1, 2).setValue(body.heslo);
        return {success: true}
      }
    }
  }
  else if (body.akce == "smazat_uzivatele") {
    for (let i = 1; i < dataUzivatele.length; i++) {
      if (dataUzivatele[i][0] === body.username && body.username && dataUzivatele[i][4] !== true) {
        sheetUzivatele.deleteRow(i + 1);
        return {success: true}
      }
    }
  }
  else if (body.akce == "vytvor_uzivatele") {
    sheetUzivatele.appendRow([
      body.username,
      body.heslo,
      "Zákazník",
      body.email,
      false
    ]);
    return {success: true}
  }
  return {success: false}
}

function darkove_kody(username, body) {
  if (!over_pravomoce(username, "Darkove_kody")) {
    return {success: false}
  }
  
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheetUzivatele = ss.getSheetByName("Dárkové kódy");
  const dataUzivatele = sheetUzivatele.getDataRange().getValues();

  if (body.akce == "kody") {
    const vybraneSloupce = dataUzivatele;
    var header = vybraneSloupce[0];
    var uzivatele = vybraneSloupce.slice(1).map(function(row) {
      return {
        kod: row[0] || "",
        hotel: row[1] || "",
        destinace: row[2] || "",
        cena: row[3] || "",
        sleva: String(row[4]) + " " + row[5]|| "",
        vymaz: row[6].toLocaleDateString("cs-CZ") || "",
        pouziti: String(row[7]) || ""
      };
    });
    return {success: true, data: uzivatele}
  }

  else if (body.akce == "smazat_kod") {
    for (let i = 1; i < dataUzivatele.length; i++) {
      if (dataUzivatele[i][0] === body.username && body.username) {
        sheetUzivatele.deleteRow(i + 1);
        return {success: true}
      }
    }
  }
  else if (body.akce == "vytvor_kod") {
    sheetUzivatele.appendRow([
      body.kod,
      JSON.stringify(body.hotel),
      JSON.stringify(body.destinace),
      body.cena,
      body.sleva,
      body.typ,
      body.vymaz,
      body.pouziti,            
    ]);
    return {success: true}
  }
  return {success: false}
}

function zobrazeni_uzivatelu(username, body) {
  if (!over_pravomoce(username, "Zobrazeni_uzivatelu")) {
    return {success: false}
  }
  
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheetUzivatele = ss.getSheetByName("Uživatelé");
  const dataUzivatele = sheetUzivatele.getDataRange().getValues();

  const vybraneSloupce = dataUzivatele.map(row => [row[0], row[2], row[3]]);
  return {success: true, data: vybraneSloupce}
}

function zmena_roli_uzivatelu(username, body) {
  if (!over_pravomoce(username, "Zmena_roli_uzivatelu")) {
    return {success: false, info: {username: username, body: body}}
  }
  
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheetUzivatele = ss.getSheetByName("Uživatelé");
  const dataUzivatele = sheetUzivatele.getDataRange().getValues();

  if (body.akce == "uzivatele") {
    const vybraneSloupce = dataUzivatele.map(row => [row[0], row[2], row[3], row[4]]);
    var header = vybraneSloupce[0];
    var uzivatele = vybraneSloupce.slice(1).map(function(row) {
      return {
        username: row[0] || "",
        role: row[1] || "",
        email: row[2] || ""
      };
    });
    return {success: true, data: uzivatele, funkce: funkce_uzivatelu()}
  }
  else if (body.akce == "ulozit") {
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    const sheetUzivatele = ss.getSheetByName("Uživatelé");
    const validRoles = funkce_uzivatelu();

    const rows = Array.isArray(body.body?.data) ? body.body.data : [];
    const data = sheetUzivatele.getDataRange().getValues();


    for (let i = 1; i < data.length; i++) {
      const rowData = data[i];

      const rowUsername = rowData[0];
      const currentRole = rowData[2];
      const currentEmail = rowData[3];

      const matchingRow = rows.find(r => r.username === rowUsername);

      if (!matchingRow) {
        continue;
      }
      const newRole = matchingRow.role;
      const newEmail = matchingRow.email;


      if (!validRoles.includes(newRole)) {
        continue;
      }

      if (currentRole !== newRole) {
        sheetUzivatele
          .getRange(i + 1, 3)
          .setValue(newRole);
      }

      if (newEmail) {

        if (currentEmail !== newEmail) {
          sheetUzivatele
            .getRange(i + 1, 4)
            .setValue(newEmail);

        }
      }
    }

    return { success: true };
  }
}

function zobrazeni_objednavek(username, body) {

  if (!over_pravomoce(username, "Zobrazeni_objednavek")) {
    return { success: false };
  }

  body = typeof body === "string" ? JSON.parse(body) : body;

  const dateFrom = body.dateFrom ? new Date(body.dateFrom) : null;
  const dateTo = body.dateTo ? new Date(body.dateTo) : null;
  const searchText = body.searchText ? String(body.searchText).toLowerCase() : "";
  const searchType = body.searchType || "";
  const limit = body.limit || 100;

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("Objednávky");
  const data = sheet.getDataRange().getValues();

  const header = data[0];
  const rows = data.slice(1);

  const index = {};
  header.forEach((h, i) => index[h] = i);

  let result = [];

  for (let row of rows) {

    const cislo = String(row[index["Číslo obj"]] || "");
    let datum = null;

    // datum z čísla smlouvy ES-YYYY-MMDD-XXXXX
    if (cislo) {
      const parts = cislo.split("-");
      if (parts.length >= 3) {
        const rok = parts[1];
        const mesic = parts[2].substring(0, 2);
        const den = parts[2].substring(2, 4);
        datum = new Date(rok, mesic - 1, den);
      }
    }

    if (dateFrom && datum && datum < dateFrom) continue;
    if (dateTo && datum && datum > dateTo) continue;

    if (searchText) {

      let found = false;

      if (searchType === "contract") {
        found = cislo.toLowerCase().includes(searchText);
      }

      else if (searchType === "user") {
        found = String(row[index["Uživatel"]] || "")
          .toLowerCase()
          .includes(searchText);
      }

      else if (searchType === "all") {

        const columnsToSearch = [
          "Číslo obj",
          "Uživatel",
          "Jméno a příjmení",
          "Email",
          "Telefon"
        ];

        found = columnsToSearch.some(col =>
          String(row[index[col]] || "")
            .toLowerCase()
            .includes(searchText)
        );
      }

      if (!found) continue;
    }

    const mesice = [
      "ledna","února","března","dubna","května","června",
      "července","srpna","září","října","listopadu","prosince"
    ];

    const filteredRow = row
      .filter((_, i) =>
        i !== index["Objednávka (JSON)"] &&
        i !== index["Karta"]
      )
      .map(cell => {
        if (cell instanceof Date) {
          const d = cell.getDate();
          const m = mesice[cell.getMonth()];
          const y = cell.getFullYear();
          return `${d}. ${m} ${y}`;
        }
        return cell;
      });

    result.push(filteredRow);

    if (result.length >= limit) break;
  }

  result.reverse();
  result = convertBooleans(result);

  const filteredHeader = header.filter(h =>
    h !== "Objednávka (JSON)" && h !== "Karta"
  );

  return {
    success: true,
    header: filteredHeader,
    data: result
  };
}

function uprava_objednavek(username, body) {

  if (!over_pravomoce(username, "Uprava_objednavek")) {
    return { success: false };
  }

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("Objednávky");
  const data = sheet.getDataRange().getValues();

  if (body.akce === "upravit") {

    const cisloSmlouvy = body.cisloSmlouvy;
    const sloupecNazev = body.sloupec;
    const novaHodnota = body.hodnota;

    const hlavicka = data[0];
    const colIndex = hlavicka.indexOf(sloupecNazev);

    if (colIndex === -1) {
      return { success: false, error: "Sloupec neexistuje" };
    }

    for (let i = 1; i < data.length; i++) {
      if (data[i][hlavicka.indexOf("Číslo obj")] == cisloSmlouvy) {

        sheet.getRange(i + 1, colIndex + 1).setValue(novaHodnota);

        return {
          success: true,
          row: i + 1,
          column: colIndex + 1
        };
      }
    }

    return { success: false, error: "Smlouva nenalezena" };
  }
}

function schvalovani_objednavek(username, body) {

  if (!over_pravomoce(username, "Schvalovani_objednavek")) {
    return { success: false, message: "Neautorizováno, přihlaste se"};
  }


  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("Objednávky");
  const data = sheet.getDataRange().getValues();

  if (body.akce == "zobrazeni") {
    body = typeof body === "string" ? JSON.parse(body) : body;

    const dateFrom = body.dateFrom ? new Date(body.dateFrom) : null;
    const dateTo = body.dateTo ? new Date(body.dateTo) : null;
    const searchText = body.searchText ? String(body.searchText).toLowerCase() : "";
    const searchType = body.searchType || "";
    const limit = body.limit || 100;

    const header = data[0];
    const rows = data.slice(1);

    const index = {};
    header.forEach((h, i) => index[h] = i);

    let result = [];

    for (let row of rows) {

      const cislo = String(row[index["Číslo obj"]] || "");
      let datum = null;

      // datum z čísla smlouvy ES-YYYY-MMDD-XXXXX
      if (cislo) {
        const parts = cislo.split("-");
        if (parts.length >= 3) {
          const rok = parts[1];
          const mesic = parts[2].substring(0, 2);
          const den = parts[2].substring(2, 4);
          datum = new Date(rok, mesic - 1, den);
        }
      }

      if (dateFrom && datum && datum < dateFrom) continue;
      if (dateTo && datum && datum > dateTo) continue;

      if (searchText) {

        let found = false;

        if (searchType === "contract") {
          found = cislo.toLowerCase().includes(searchText);
        }

        else if (searchType === "user") {
          found = String(row[index["Uživatel"]] || "")
            .toLowerCase()
            .includes(searchText);
        }

        else if (searchType === "all") {

          const columnsToSearch = [
            "Číslo obj",
            "Uživatel",
            "Jméno a příjmení",
            "Email",
            "Telefon"
          ];

          found = columnsToSearch.some(col =>
            String(row[index[col]] || "")
              .toLowerCase()
              .includes(searchText)
          );
        }

        if (!found) continue;
      }

      const mesice = [
        "ledna","února","března","dubna","května","června",
        "července","srpna","září","října","listopadu","prosince"
      ];

      const filteredRow = row
        .filter((_, i) =>
          i !== index["Objednávka (JSON)"] &&
          i !== index["Karta"]
        )
        .map(cell => {
          if (cell instanceof Date) {
            const d = cell.getDate();
            const m = mesice[cell.getMonth()];
            const y = cell.getFullYear();
            return `${d}. ${m} ${y}`;
          }
          return cell;
        });

      result.push(filteredRow);

      if (result.length >= limit) break;
    }

    result.reverse();
    result = convertBooleans(result);

    const filteredHeader = header.filter(h =>
      h !== "Objednávka (JSON)" && h !== "Karta"
    );

    return {
      success: true,
      header: filteredHeader,
      data: result
    };
  }
  else if (body.akce == "ulozit") {
    const contractNumber = body.contractNumber;

    for (let i = 0; i < data.length; i++) {
      if (String(data[i][0]) === String(contractNumber)) { // předpokládám, že číslo smlouvy je ve sloupci A (index 0)
        sheet.getRange(i + 1, 17).setValue("true"); // sloupec Q je 17. sloupec, +1 protože getRange je 1-based
        sheet.getRange(i + 1, 18).setValue("Nerozhodnuto");
        break; // ukončíme smyčku, pokud chceme upravit jen první shodu
      }
    }
    vytvorNavrhSmlouvy(contractNumber);
    return {success: true}
  }
}


function zobrazeni_uzivatelskych_utrat(username, body) {
  if (!over_pravomoce(username, "Zobrazeni_uzivatelskych_utrat")) {
    return { success: false };
  }

  if (body.akce == "zobrazit") {
    const sheet = SpreadsheetApp
      .getActiveSpreadsheet()
      .getSheetByName("Platební karty");

    const data = sheet.getDataRange().getValues(); 


    const seznamCisel = []; // pole, kam budeme ukládat hodnoty

    for (let i = 1; i < data.length; i++) {
      const cislo = data[i][1]; // hodnota ve sloupci B
      seznamCisel.push(cislo);  // přidání do pole
    }

    Logger.log(seznamCisel);
    return {success: true, data: seznamCisel}
  }

  else if (body.akce == "zobrazit_utratu") {
    try {
      const sheet = SpreadsheetApp
        .openById("1w6G4xjBfIlg0OivrP9MhdUb_eZfXEzWNr-tKjS3_2uw")
        .getSheetByName(body.uzivatel);

      const values = sheet.getDataRange().getValues();

      const header = values[0];          // hlavička
      const rows = values.slice(1).reverse(); // data bez hlavičky otočená

      const data = [header, ...rows];

      const formattedData = data.map(row =>
        row.map(cell => {
          if (cell instanceof Date) {
            return Utilities.formatDate(
              cell,
              "Europe/Prague",
              "d. M. yyyy HH:mm"
            );
          }
          return cell;
        })
      );

      return {success:true, data:formattedData}
    } catch (error) {
      return {success: false, error: "uzivatel neexistuje"}
    }
  }
}

function sprava_uzivatelskych_utrat(username, body) {
  if (!over_pravomoce(username, "Sprava_uzivatelskych_utrat")) {
    return { success: false };
  }

  if (body.akce == "pridej") {
    try {
      const sheet = SpreadsheetApp
        .openById("1w6G4xjBfIlg0OivrP9MhdUb_eZfXEzWNr-tKjS3_2uw")
        .getSheetByName(body.data.uzivatel);

      const lastRow = sheet.getLastRow();
      const newRowNumber = lastRow + 1;


      const typ = body.data.typ

      const now = new Date();

      if (typ == "vyplata") {
        const radek = [now, "MiKaTravel - zaměstnavatel", "Výplata", Math.abs(body.data.castka), `=IFS(D${newRowNumber}<0; "Výdaj"; D${newRowNumber}>0; "Příjem"; D${newRowNumber}=0; "Nula")`, body.data.poznamka, username];
        sheet.appendRow(radek);
      }
      else if (typ == "preplatek") {
        const radek = [now, "MiKaTravel - zaměstnavatel", "Přeplatek", Math.abs(body.data.castka), `=IFS(D${newRowNumber}<0; "Výdaj"; D${newRowNumber}>0; "Příjem"; D${newRowNumber}=0; "Nula")`, body.data.duvod + " --- " +body.data.poznamka, username];
        sheet.appendRow(radek);
      }
      else if (typ == "sankce") {
        const radek = [now, "MiKaTravel - zaměstnavatel", "", -1*Math.abs(body.data.castka), `=IFS(D${newRowNumber}<0; "Výdaj"; D${newRowNumber}>0; "Příjem"; D${newRowNumber}=0; "Nula")`, body.data.duvod + " --- " + body.data.poznamka, username];
        sheet.appendRow(radek);
      }
      else if (typ == "vraceni") {
        const radek = [now, "MiKaTravel", body.data.objednavka, Math.abs(body.data.castka), `=IFS(D${newRowNumber}<0; "Výdaj"; D${newRowNumber}>0; "Příjem"; D${newRowNumber}=0; "Nula")`, body.data.poznamka, username];
        sheet.appendRow(radek);
      }
      return {success:true}
    } catch (error) {
      return {success: false, error: "uzivatel neexistuje"}
    }
  }
}

function odesilani_newsletteru(username, body) {
  if (!over_pravomoce(username, "Odesilani_newsletteru")) {
    return { success: false };
  }

  const sheet = SpreadsheetApp
    .getActiveSpreadsheet()
    .getSheetByName("Uživatelé");

  const values = sheet.getDataRange().getValues();

  if (body.akce == "uzivatele") {
    
    const jsonOutput = Object.fromEntries(
      values
        .slice(1) // odstraní hlavičku
        .filter(row => row[2] === "Zákazník") // jen zákazníci
        .map(row => [row[0], row[3]]) // [username, email]
    );

    return {success: true, data: jsonOutput}
  }

  else if (body.akce == "email") {
    const prijemci = body.vybrani;

    const columnCSet = new Set(values.map(row => row[3]));

    const vsichniExistuji = prijemci.every(p =>
      columnCSet.has(p)
    );

    Logger.log(vsichniExistuji);

    if (!vsichniExistuji) {
      return {success: false}
    }


     prijemci.forEach(email => {
      if (typeof email === "string" && email.includes("@")) {
        MailApp.sendEmail({
          to: email,
          subject: `MiKaTravel – ${body.predmet}`,
          htmlBody: `
<!DOCTYPE html>
<html lang="cs">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background:#8ea2bd;font-family:Arial,Helvetica,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#8ea2bd;padding:30px 10px;">
    <tr>
      <td align="center">

        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.08);">

          <!-- HEADER -->
          <tr>
            <td style="
              background: linear-gradient(
                135deg,
                ${darken(body.color || '#1e3a8a', 20)} 0%,
                ${body.color || '#1e3a8a'} 100%
              );
              padding: 28px 30px;
              color: #ffffff;
            ">
              <h1 style="margin:0;font-size:22px;font-weight:600;">MiKaTravel</h1>
              <p style="margin:6px 0 0;font-size:14px;opacity:0.9;">${body.predmet}</p>
            </td>
          </tr>

          <!-- CONTENT -->
          <tr>
            <td style="padding:32px 30px;">
              ${body.text}
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="padding:20px 30px;background:#f3f4f6;text-align:center;border-top:1px solid #e5e7eb;">
              <p style="margin:0;color:#9ca3af;font-size:12px;">
                © ${new Date().getFullYear()} MiKaTravel · Automatická zpráva
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
      `
        });
        Utilities.sleep(300); // malá pauza, aby se nepřekročily limity
      } else {
        Logger.log("Neplatný email: " + email);
      }
    });

    return { success: true };
  }
}

function sprava_letu(username, body) {
  if (!over_pravomoce(username, "Sprava_letu")) {
    return { success: false };
  }

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheetUzivatele = ss.getSheetByName("Plánované lety");
  const dataUzivatele = sheetUzivatele.getDataRange().getValues();

  if (body.akce == "lety") {
    const vybraneSloupce = dataUzivatele;
    var header = vybraneSloupce[0];
    var uzivatele = vybraneSloupce.slice(1).map(function(row) {
      return {
        //"Z destinace"	"Do destinace"	"Datum"	"Čas"	"Číslo letu"
        z_destinace: row[0] || "",
        do_destinace: row[1] || "",
        datum: row[2].toLocaleDateString("cs-CZ") || "",
        cas: row[3]
          ? new Date(row[3]).toLocaleTimeString("cs-CZ", {
              hour: "2-digit",
              minute: "2-digit"
            })
          : "",
        cislo_letu: String(row[4])
      };
    });
    uzivatele.reverse();
    return {success: true, data: uzivatele}
  }

  else if (body.akce == "smazat_let") {
    for (let i = 1; i < dataUzivatele.length; i++) {
      if (dataUzivatele[i][4] === body.username && body.username) {
        sheetUzivatele.deleteRow(i + 1);
        return {success: true}
      }
    }
  }
  else if (body.akce == "vytvor_let") {
    const parts = body.datum.split("-"); // ["2026","04","01"]

    const rok = parseInt(parts[0], 10);
    const mesic = parseInt(parts[1], 10); // už není potřeba -1
    const den = parseInt(parts[2], 10);

    const kodDatum = `${String(den).padStart(2,'0')}${String(mesic).padStart(2,'0')}${String(rok).slice(-2)}`;

    sheetUzivatele.appendRow([
      body.odkud,
      body.kam,
      body.datum,
      body.cas,
      `${kodDatum}-${body.odkud}-${body.kam}-001`
    ]);

    return {success: true};
  }
  
  return {success: false}
}

function darken(hexColor, percent) {
  // Odstraní # pokud je přítomen
  let hex = hexColor.replace('#', '');

  // Převod tříznakových hex na šestiznakové
  if (hex.length === 3) {
    hex = hex.split('').map(c => c + c).join('');
  }

  // Převod na čísla RGB
  const num = parseInt(hex, 16);
  let r = (num >> 16) & 0xFF;
  let g = (num >> 8) & 0xFF;
  let b = num & 0xFF;

  // Ztmavení o procento
  r = Math.max(0, Math.min(255, Math.floor(r * (100 - percent) / 100)));
  g = Math.max(0, Math.min(255, Math.floor(g * (100 - percent) / 100)));
  b = Math.max(0, Math.min(255, Math.floor(b * (100 - percent) / 100)));

  // Převod zpět na hex
  const newHex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  return newHex;
}

// Příklad použití:
const original = '#1e3a8a';
console.log(darken(original, 20)); // tmavší o 20%

function najdiLet(destinace, zOdletu, odletDatum) {
  Logger.log("=== START funkce najdiLet ===");
  Logger.log("Vstupy:");
  Logger.log("destinace: " + destinace);
  Logger.log("zOdletu: " + zOdletu);
  Logger.log("odletDatum (raw): " + odletDatum);

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  Logger.log("Otevřen aktivní spreadsheet: " + ss.getName());
  
  const sheet = ss.getSheetByName("Plánované lety");
  if (!sheet) {
    Logger.log("❌ Chyba: list 'Plánované lety' nebyl nalezen!");
    return null;
  }
  Logger.log("Vybrán list: " + sheet.getName());

  // Parsování data
  let hledaneDatum;
  let hledaneDatumStr;

  try {
    const parts = odletDatum.split(".");
    Logger.log("Rozdělené datum: " + JSON.stringify(parts));

    const den = parseInt(parts[0], 10);
    const mesic = parseInt(parts[1], 10) - 1;
    const rok = parseInt(parts[2], 10);

    Logger.log(`Parsované hodnoty -> den: ${den}, mesic: ${mesic}, rok: ${rok}`);

    hledaneDatum = new Date(rok, mesic, den);
    Logger.log("Vytvořen Date objekt: " + hledaneDatum);

    hledaneDatumStr = Utilities.formatDate(
      hledaneDatum,
      Session.getScriptTimeZone(),
      "dd.MM.yyyy"
    );

    Logger.log("Naformátované datum: " + hledaneDatumStr);
  } catch (e) {
    Logger.log("❌ Chyba při parsování data: " + e);
    return null;
  }

  // Načtení dat
  const data = sheet.getDataRange().getValues();
  Logger.log("Počet načtených řádků (včetně hlavičky): " + data.length);

  if (data.length <= 1) {
    Logger.log("⚠️ Tabulka neobsahuje žádná data.");
    return null;
  }

  // Procházení dat
  for (let i = 1; i < data.length; i++) {
    const radek = data[i];

    const radekZOdletu = radek[0];
    const radekDestinace = radek[1];
    const radekDatumRaw = radek[2];

    let radekDatumStr;
    if (radekDatumRaw instanceof Date) {
      radekDatumStr = Utilities.formatDate(
        radekDatumRaw,
        Session.getScriptTimeZone(),
        "dd.MM.yyyy"
      );
    } else {
      radekDatumStr = radekDatumRaw;
    }

    Logger.log(`--- Řádek ${i + 1} ---`);
    Logger.log("Raw data: " + JSON.stringify(radek));
    Logger.log(`zOdletu: ${radekZOdletu}, destinace: ${radekDestinace}, datum: ${radekDatumStr}`);

    // Kontrola jednotlivých podmínek
    const matchZOdletu = radekZOdletu === zOdletu;
    const matchDestinace = radekDestinace === destinace;
    const matchDatum = radekDatumStr === hledaneDatumStr;

    Logger.log(`Match zOdletu: ${matchZOdletu}`);
    Logger.log(`Match destinace: ${matchDestinace}`);
    Logger.log(`Match datum: ${matchDatum}`);

    if (matchZOdletu && matchDestinace && matchDatum) {
      Logger.log("✅ SHODA NALEZENA!");
      Logger.log("Celý řádek: " + radek.join(", "));

      const cil = radekDestinace !== "PRGBLI" ? radekDestinace : radekZOdletu;
      Logger.log("Určený cíl pro výpočet doby letu: " + cil);

      let dobaLetu;
      try {
        const letyData = najdiLetyProDestinaci(cil);
        Logger.log("Výstup najdiLetyProDestinaci: " + JSON.stringify(letyData));

        dobaLetu = letyData[0][2];
        Logger.log("Doba letu: " + dobaLetu);
      } catch (e) {
        Logger.log("❌ Chyba při získání doby letu: " + e);
        dobaLetu = null;
      }
      const cas = Utilities.formatDate(new Date(radek[3]), Session.getScriptTimeZone(), "HH:mm");
      Logger.log(cas);

      const result = {
        zOdletu: radekZOdletu,
        destinace: radekDestinace,
        datum: radekDatumStr,
        cas: cas,
        cisloLetu: radek[4],
        doba: dobaLetu
      };

      Logger.log("Vrácený objekt: " + JSON.stringify(result));
      Logger.log("=== KONEC (nalezeno) ===");

      return result;
    } else {
      Logger.log("❌ Řádek neodpovídá podmínkám.");
    }
  }

  Logger.log("❌ Let nebyl nalezen.");
  Logger.log("=== KONEC (nenalezeno) ===");

  return null;
}

function getVedeni(kartaNazev) {
  const spreadsheet = SpreadsheetApp.openById("1w6G4xjBfIlg0OivrP9MhdUb_eZfXEzWNr-tKjS3_2uw");

  const sheet = spreadsheet.getSheetByName("Poplatky");
  if (!sheet) {
    return "List nenalezen";
  }


  const data = sheet.getDataRange().getValues();

  for (let i = 1; i < data.length; i++) { // přeskočí hlavičku
    const karta = data[i][0];
    const vedeni = data[i][1];

    Logger.log(`Řádek ${i}: karta=${karta}, vedeni=${vedeni}`);

    if (karta === kartaNazev) {
      Logger.log("NALEZENO: " + karta + " → vedení: " + vedeni);
      Logger.log("=== KONEC getVedeni ===");
      return vedeni;
    }
  }
  return "Karta nenalezena";
}

function getMesicniOdeslane(kartaNazev) {
  const spreadsheet = SpreadsheetApp.openById("1w6G4xjBfIlg0OivrP9MhdUb_eZfXEzWNr-tKjS3_2uw");

  const sheet = spreadsheet.getSheetByName("Poplatky");
  if (!sheet) {
    return "List nenalezen";
  }


  const data = sheet.getDataRange().getValues();

  for (let i = 1; i < data.length; i++) { // přeskočí hlavičku
    const karta = data[i][0];
    const vedeni = data[i][2];

    Logger.log(`Řádek ${i}: karta=${karta}, vedeni=${vedeni}`);

    if (karta === kartaNazev) {
      return vedeni;
    }
  }
  return "Karta nenalezena";
}

function getMesicniPrichozi(kartaNazev) {
  const spreadsheet = SpreadsheetApp.openById("1w6G4xjBfIlg0OivrP9MhdUb_eZfXEzWNr-tKjS3_2uw");

  const sheet = spreadsheet.getSheetByName("Poplatky");
  if (!sheet) {
    return "List nenalezen";
  }


  const data = sheet.getDataRange().getValues();

  for (let i = 1; i < data.length; i++) { // přeskočí hlavičku
    const karta = data[i][0];
    const vedeni = data[i][3];

    Logger.log(`Řádek ${i}: karta=${karta}, vedeni=${vedeni}`);

    if (karta === kartaNazev) {
      return vedeni;
    }
  }
  return "Karta nenalezena";
}


function poplatky_vedeni() {
  const sheet = SpreadsheetApp
    .getActiveSpreadsheet()
    .getSheetByName("Platební karty");

  const data = sheet.getDataRange().getValues();
  const karty = {};

  data.forEach((row, index) => {
    // pokud máš hlavičku v prvním řádku, přeskoč ji
    if (index === 0) return;

    const key = row[1];   // sloupec A
    const value = row[6]; // sloupec G

    if (key) {
      karty[key] = value;
    }
  });

  const sheetP = SpreadsheetApp
    .openById("1w6G4xjBfIlg0OivrP9MhdUb_eZfXEzWNr-tKjS3_2uw")
    .getSheetByName("Poplatky");
  const tabulka = SpreadsheetApp
    .openById("1w6G4xjBfIlg0OivrP9MhdUb_eZfXEzWNr-tKjS3_2uw")

  const dataP = sheetP.getDataRange().getValues();

  Object.entries(karty).forEach(([key, value]) => {
    const sheet = tabulka.getSheetByName(key);
    const newRowNumber = sheet.getLastRow() + 1;

    const vedeni = Number(getVedeni(value))*-1;

    sheet.appendRow([
      Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "dd.MM.yyyy HH:mm"),
      "MiKaTravel",
      "VEDENÍ ÚČTU",
      vedeni,
      `=IFS(D${newRowNumber}<0; "Výdaj"; D${newRowNumber}>0; "Příjem"; D${newRowNumber}=0; "Nula")`,
      "",
      "MiKaTravel - bot"
    ]);
  });
  Object.entries(karty).forEach(([key, value]) => {
    const sheet = tabulka.getSheetByName(key);
    const odeslano = Number(souhrnPosledniMesicZaporne(key))*100;
    const prijem = Math.abs(getMesicniOdeslane(value));
    var novaCastka = Math.floor(prijem * (1 + odeslano / 100));
    const newRowNumber = sheet.getLastRow() + 1;
    Logger.log(novaCastka);
    sheet.appendRow([
      Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "dd.MM.yyyy HH:mm"),
      "MiKaTravel",
      "VEDENÍ ÚČTU",
      Math.abs(novaCastka),
      `=IFS(D${newRowNumber}<0; "Výdaj"; D${newRowNumber}>0; "Příjem"; D${newRowNumber}=0; "Nula")`,
      "",
      "MiKaTravel - bot"
    ]);
  });
  Object.entries(karty).forEach(([key, value]) => {
    const sheet = tabulka.getSheetByName(key);
    const odeslano = Number(souhrnPosledniMesicKladne(key))*100;
    const prijem = Math.abs(getMesicniPrichozi(value));
    var novaCastka = Math.floor(prijem * (1 + odeslano / 100));
    const newRowNumber = sheet.getLastRow() + 1;
    Logger.log(novaCastka);
    sheet.appendRow([
      Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "dd.MM.yyyy HH:mm"),
      "MiKaTravel",
      "VEDENÍ ÚČTU",
      Math.abs(novaCastka),
      `=IFS(D${newRowNumber}<0; "Výdaj"; D${newRowNumber}>0; "Příjem"; D${newRowNumber}=0; "Nula")`,
      "",
      "MiKaTravel - bot"
    ]);
  });
}

function souhrnPosledniMesicKladne(nazev) {
  const sheet = SpreadsheetApp.openById("1w6G4xjBfIlg0OivrP9MhdUb_eZfXEzWNr-tKjS3_2uw")
                              .getSheetByName(nazev);
  const data = sheet.getDataRange().getValues();

  const dnes = new Date();
  const minDate = new Date(dnes.getFullYear(), dnes.getMonth() - 1, 1); // první den minulého měsíce
  const maxDate = new Date(dnes.getFullYear(), dnes.getMonth(), 0);     // poslední den minulého měsíce

  let soucet = 0;

  for (let i = 1; i < data.length; i++) { // přeskočí hlavičku
    const datum = new Date(data[i][0]);  // první sloupec = datum
    const hodnota = parseFloat(data[i][3]); // sloupec D = index 3

    if (datum >= minDate && datum <= maxDate && !isNaN(hodnota) && hodnota > 0) {
      soucet += hodnota;
    }
  }

  Logger.log("Souhrn kladných hodnot D za poslední měsíc: " + soucet);
  return soucet;
}

function souhrnPosledniMesicZaporne(nazev) {
  const sheet = SpreadsheetApp.openById("1w6G4xjBfIlg0OivrP9MhdUb_eZfXEzWNr-tKjS3_2uw")
                              .getSheetByName(nazev);
  const data = sheet.getDataRange().getValues();

  const dnes = new Date();
  const minDate = new Date(dnes.getFullYear(), dnes.getMonth() - 1, 1); // první den minulého měsíce
  const maxDate = new Date(dnes.getFullYear(), dnes.getMonth(), 0);     // poslední den minulého měsíce

  let soucet = 0;

  for (let i = 1; i < data.length; i++) { // přeskočí hlavičku
    const datum = new Date(data[i][0]);  // první sloupec = datum
    const hodnota = parseFloat(data[i][3]); // sloupec D = index 3

    Logger.log(`Řádek ${i + 1}: datum = ${datum}, hodnota = ${hodnota}`);

    if (isNaN(datum.getTime())) {
      Logger.log(`  → Přeskočeno: neplatné datum`);
      continue;
    }

    if (isNaN(hodnota)) {
      Logger.log(`  → Přeskočeno: hodnota není číslo`);
      continue;
    }

    if (datum < minDate || datum > maxDate) {
      Logger.log(`  → Přeskočeno: datum není v minulém měsíci (${minDate.toLocaleDateString()} - ${maxDate.toLocaleDateString()})`);
      continue;
    }

    if (hodnota >= 0) {
      Logger.log(`  → Přeskočeno: hodnota není záporná`);
      continue;
    }

    soucet += hodnota;
    Logger.log(`  → Přidáno: nový součet = ${soucet}`);
  }

  Logger.log("Souhrn záporných hodnot D za poslední měsíc: " + soucet);
  return soucet;
}


function generujVyhruProUzivatele(jmeno) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Kolo štěstí");
  const data = [
    { vyhra: "25 000 MiKa", typ: "top" },
    { vyhra: "15 000 MiKa", typ: "top" },
    { vyhra: "10 000 MiKa", typ: "top" },
    { vyhra: "25%", typ: "stredni" },
    { vyhra: "15%", typ: "stredni" },
    { vyhra: "10%", typ: "stredni" },
    { vyhra: "10 zatočení", typ: "stredni" },
    { vyhra: "4 zatočení", typ: "mensi" },
    { vyhra: "3 zatočení", typ: "mensi" },
    { vyhra: "2 zatočení", typ: "mensi" },
    { vyhra: "Nic", typ: "nic" }
  ];

  const zatoceni = pouzijZatoceni(jmeno);

  if (zatoceni == false) {
      return {success: false};
  }

  // Načtení historie uživatele
  const rows = sheet.getDataRange().getValues();
  const userRows = rows.filter(r => r[0] === jmeno);

  // Kolik posledních pokusů bylo bez lepší výhry
  let streakNic = 0;
  for (let i = userRows.length - 1; i >= 0; i--) {
    const vyhra = userRows[i][1];
    if (vyhra === "Nic") {
      streakNic++;
    } else {
      break;
    }
  }

  // Základní pravděpodobnosti
  let pravdepodobnosti = {
    nic: 0.525,
    mensi: 0.35,
    stredni: 0.1,
    top: 0.025
  };

  // Úprava podle streaku (po delší smůle mírně zvýšit šanci)
  if (streakNic >= 3) {
    pravdepodobnosti.nic -= 0.1;
    pravdepodobnosti.stredni += 0.05;
    pravdepodobnosti.top += 0.05;
  }

  if (streakNic >= 6) {
    pravdepodobnosti.nic -= 0.2;
    pravdepodobnosti.top += 0.1;
  }

  // Výběr typu výhry
  const rand = Math.random();
  let vybranyTyp;

  let sum = 0;
  for (let typ in pravdepodobnosti) {
    sum += pravdepodobnosti[typ];
    if (rand <= sum) {
      vybranyTyp = typ;
      break;
    }
  }

  // Výběr konkrétní výhry
  const moznosti = data.filter(d => d.typ === vybranyTyp);
  const vyhra = moznosti[Math.floor(Math.random() * moznosti.length)].vyhra;

  cena(vyhra, jmeno);

  // Uložení do tabulky
  const cas = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "d.M.yyyy HH:mm");
  sheet.appendRow([jmeno, vyhra, cas]);

  return {success: true, vyhra, zatoceni};
}

function pouzijZatoceni(jmeno) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Kolo štěstí zatočení");
  const data = sheet.getDataRange().getValues();

  for (let i = 0; i < data.length; i++) {
    if (data[i][0] === jmeno) { // jméno ve sloupci A
      let pocet = Number(data[i][1]); // počet zatočení ve sloupci B
      if (pocet > 0) {
        pocet -= 1;
        sheet.getRange(i + 1, 2).setValue(pocet); // aktualizace ve sloupci B
        return Number(data[i][1]);
      } else {
        return false;
      }
    }
  }

  return false;
}

function pridejZatoceni(jmeno, pocetZ) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Kolo štěstí zatočení");
  const data = sheet.getDataRange().getValues();

  for (let i = 0; i < data.length; i++) {
    if (data[i][0] === jmeno) { // jméno ve sloupci A
      let pocet = Number(data[i][1]); // počet zatočení ve sloupci B
      if (pocet > 0) {
        pocet += pocetZ;
        sheet.getRange(i + 1, 2).setValue(pocet); // aktualizace ve sloupci B
        return Number(data[i][1]);
      } else {
        return false;
      }
    }
  }

  return false;
}

function spinsKoloStesti(jmeno) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Kolo štěstí zatočení");
  const data = sheet.getDataRange().getValues();

  for (let i = 0; i < data.length; i++) {
    if (data[i][0] === jmeno) { // jméno ve sloupci A
      let pocet = Number(data[i][1]); // počet zatočení ve sloupci B
        return {success: true, zatoceni: Number(data[i][1])};
    }
  }

  return {success: false};
}

function cena(cena, username) {
  const email = najdiEmail(username);
  if (cena.includes("MiKa")) {
    const spreadsheetId = "1w6G4xjBfIlg0OivrP9MhdUb_eZfXEzWNr-tKjS3_2uw";
    const spreadsheet = SpreadsheetApp.openById(spreadsheetId);

    const sheetName = uzivatel_karta(email);
    const sheet = spreadsheet.getSheetByName(sheetName);

    if (!sheet) {
      throw new Error("List '" + sheetName + "' neexistuje.");
    }

    const castka = parseFloat(cena.replace(" MiKa", "").replace(/\s/g, ""));

    const lastRow = sheet.getLastRow();
    const newRowNumber = lastRow + 1;

    const row = [
      new Date(),
      "MiKaTravel",
      "Výhra kolo štěstí",
      castka,
      `=IFS(D${newRowNumber}<0; "Výdaj"; D${newRowNumber}>0; "Příjem"; D${newRowNumber}=0; "Nula")`,
      "Výhra kolo štěstí",
      "MiKaTravel - bot"
    ];

    sheet.appendRow(row);

    return true
  }

  else if (cena.includes("%")) {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheetUzivatele = ss.getSheetByName("Dárkové kódy");
    const dataUzivatele = sheetUzivatele.getDataRange().getValues();

    const vymazDatum = new Date();
    vymazDatum.setDate(vymazDatum.getDate() + 31);
    const vymazStr = vymazDatum.toLocaleDateString("cs-CZ");

    const kod = generateCode();

    posliSlevovyKupon(email, kod, 31, 30000, cena);

    sheetUzivatele.appendRow([
      kod,
      "",
      "",
      "30000",
      parseFloat(cena.replace("%", "")),
      "procenta",
      vymazStr,
      "1",            
    ]);
    return true
  }
  else if (cena.includes("zatočení")) {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Kolo štěstí zatočení");
    const data = sheet.getDataRange().getValues();

    for (let i = 0; i < data.length; i++) {
      if (data[i][0] === username) { // jméno ve sloupci A
        let pocet = Number(data[i][1]); // počet zatočení ve sloupci B
        if (pocet > 0) {
          pocet += parseFloat(cena)+1;
          sheet.getRange(i + 1, 2).setValue(pocet); // aktualizace ve sloupci B
          return true;
        } else {
          return false;
        }
      }
    }
  }
  else {
    false
  }
}

function generateCode(length = 10) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
}

function uzivatel_karta(email) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Platební karty");
  const data = sheet.getDataRange().getValues();

  for (let i = 0; i < data.length; i++) {
    if (data[i][8] === email) { // jméno ve sloupci A
      return data[i][1];
    }
  }
}

function zavolejZeStringu(kod, kontext) {
  const match = kod.match(/^(\w+)\((.*)\)$/);

  if (!match) throw new Error("Neplatný formát");

  const nazev = match[1];
  const argsString = match[2];

  // převedení argumentů (pozor: očekává JSON-like formát)
  const args = eval(`[${argsString}]`);

  if (typeof kontext[nazev] !== "function") {
    throw new Error("Funkce neexistuje");
  }

  return kontext[nazev](...args);
}

function nazev_funkce(a, b, c) {
  return `${a}-${b}-${c}`;
}

function pridej_funkci(funkce) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Requests");
  if (!sheet) throw new Error("List 'Requests' nebyl nalezen.");

  const data = sheet.getDataRange().getValues();

  // Najdeme první volný řádek (pokud je první sloupec prázdný)
  let firstEmptyRow = data.findIndex(row => !row[0]);
  if (firstEmptyRow === -1) {
    // pokud nejsou prázdné řádky, nastavíme další po posledním
    firstEmptyRow = data.length;
  }

  // Vytvoříme náhodné ID
  const randomId = Math.random().toString(36).substr(2, 9);

  // Zapíšeme ID a funkci
  sheet.getRange(firstEmptyRow + 1, 1).setValue(randomId); // sloupec A
  sheet.getRange(firstEmptyRow + 1, 2).setValue(funkce);   // sloupec C

  return randomId; // vrátíme ID
}


function post(username, usernameb, id) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Requests");
  const data = sheet.getDataRange().getValues();

  const rowIndex = data.findIndex(row => row[0] === id);

  if (rowIndex === -1) {
    return {
      found: false,
      value: null,
      message: "Neplatná akce"
    };
  }

  const foundRow = data[rowIndex];
  
  sheet.deleteRow(rowIndex + 1);

  Logger.log(foundRow[1]);

  let funkce = foundRow[1];
  funkce = funkce.replace("{[username]}", '"' + String(username) + '"');
  funkce = funkce.replace("{[usernameb]}", '"' + String(usernameb) + '"');

  Logger.log(funkce);

  const vysledek = eval(funkce);

  Logger.log(vysledek);


  return vysledek;
}

function vytvorPDF417(text) {
  if (!text) {
    throw new Error("Chybí text pro PDF417");
  }

  var url = "https://mikatravel.vercel.app/api/barcode"; // univerzální endpoint

  // JSON payload s typem kódu
  var payload = JSON.stringify({
    text: text,
    type: "pdf417"
  });

  var response = UrlFetchApp.fetch(url, {
    method: "post",
    contentType: "application/json; charset=utf-8",
    payload: payload,
    muteHttpExceptions: true
  });

  if (response.getResponseCode() !== 200) {
    Logger.log(response.getContentText());
    throw new Error("Chyba při generování PDF417");
  }

  return response.getBlob(); // vrací PNG blob
}


function vytvorBarcode(text, typ) {
  if (!text) {
    throw new Error("Chybí text pro kód");
  }

  const allowedTypes = [
    'pdf417', 'qrcode', 'azteccode', 'datamatrix',
    'code128', 'code39', 'code93',
    'ean13', 'ean8', 'upca', 'upce',
    'interleaved2of5', 'msi', 'codabar'
  ];

  if (!allowedTypes.includes(typ)) {
    throw new Error("Neplatný typ čárového kódu: " + typ);
  }

  var url = "https://mikatravel.vercel.app/api/barcode";

  // Převod textu na UTF-8
  var payload = Utilities.newBlob(JSON.stringify({
    text: text,
    type: typ
  }), "application/json").getDataAsString("utf-8");

  var response = UrlFetchApp.fetch(url, {
    method: "post",
    contentType: "application/json; charset=utf-8",
    payload: payload,
    muteHttpExceptions: true
  });

  if (response.getResponseCode() !== 200) {
    Logger.log(response.getContentText());
    throw new Error("Chyba při generování kódu");
  }

  return response.getBlob();
}
function exportOblastDoPDF_log(id) {
  Logger.log("=== START EXPORTU CELÉHO SEŠITU ===");

  const ss = SpreadsheetApp.openById(id);
  const sheets = ss.getSheets();
  Logger.log("Spreadsheet: " + ss.getName());
  Logger.log("Počet listů: " + sheets.length);

  const baseUrl = ss.getUrl().replace(/edit$/, '');
  const token = ScriptApp.getOAuthToken();

  // Parametry pro export celého sešitu
  const params = {
    exportFormat: 'pdf',
    format: 'pdf',
    size: 'A6',
    portrait: true,
    fitw: true,
    scale: 2,
    top_margin: 0.5,
    bottom_margin: 0.5,
    left_margin: 0.5,
    right_margin: 0.5,
    sheetnames: false,
    printtitle: false,
    pagenumbers: false,
    gridlines: false,
    fzr: false
  };

  const queryString = Object.keys(params).map(k => k + '=' + params[k]).join('&');
  const fullUrl = baseUrl + 'export?' + queryString;

  Logger.log("Export URL: " + fullUrl);

  const response = UrlFetchApp.fetch(fullUrl, {
    headers: { 'Authorization': 'Bearer ' + token }
  });

  const blob = response.getBlob().setName(ss.getName() + '.pdf');
  Logger.log("Blob vytvořen: " + blob.getName() + ", velikost: " + blob.getBytes().length);

  // Uložení do konkrétní složky
  const folder = DriveApp.getFolderById('1tancdJ9JYp8FIcAe0JO-kOP_vOot3OV9');
  const file = folder.createFile(blob);

  Logger.log("✅ PDF vytvořeno ve složce: " + folder.getName());
  Logger.log("ID souboru: " + file.getId());
  Logger.log("URL souboru: " + file.getUrl());

  Logger.log("=== KONEC EXPORTU ===");
  return file.getId();
}

function upravZkopirujExportujSmaz(originalId) {
  Logger.log("=== START PROCESU ===");

  // 1. Načtení originálu
  const originalFile = DriveApp.getFileById(originalId);
  Logger.log("Originál: " + originalFile.getName());

  // 2. Vytvoření kopie
  const copyFile = originalFile.makeCopy("TEMP_KOPIE_" + new Date().getTime());
  const copyId = copyFile.getId();
  Logger.log("Kopie vytvořena: " + copyId);

  const ss = SpreadsheetApp.openById(copyId);
  const sheet = ss.getSheets()[0];

  // 3. ÚPRAVY BUNĚK (UPRAV SI DLE POTŘEBY)
  Logger.log("=== ÚPRAVA BUNĚK ===");

  sheet.getRange("A4").setValue("PMI");
  sheet.getRange("B4").setValue("PRGBLI");
  sheet.getRange("A6").setValue("5.4.2026");
  sheet.getRange("A7").setValue("5.4.2026");
  sheet.getRange("B6").setValue("20:00");
  sheet.getRange("B7").setValue("21:00");
  
  sheet.getRange("B9").setValue("MíšaHr");
  sheet.getRange("B11").setValue("050426-PRGBLI-PMI-001");
  sheet.getRange("B13").setValue("A1");

  SpreadsheetApp.flush();
  Logger.log("Úpravy provedeny");

  // 4. EXPORT DO PDF (tvá funkce)
  Logger.log("=== EXPORT DO PDF ===");

  exportOblastDoPDF_log(copyId);

  Logger.log("PDF vytvořeno");

  // 5. SMAZÁNÍ KOPIE
  Logger.log("=== MAZÁNÍ KOPIE ===");

  DriveApp.getFileById(copyId).setTrashed(true);

  Logger.log("Kopie smazána");

  Logger.log("=== KONEC ===");
}

function pridejLetenku(id, cisloLetu, jmeno, sedadlo, zDestinace, doDestinace, datum, cas) {
  // Získání aktivního spreadsheetu a listu "Letenky"
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("Letenky");
  if (!sheet) {
    throw new Error("List 'Letenky' nebyl nalezen.");
  }

  // Přidání nového řádku na konec
  sheet.appendRow([id, cisloLetu, jmeno, sedadlo, zDestinace, doDestinace, datum, cas]);
}

function upravZkopirujPridejObrExportujSmaz(data) {
  const  originalId = "1_3dlKZd0s796azM3o5xFqVlkLK8TOtrIlPC2vAFz4-8";
  Logger.log("=== START PROCESU ===");

  const originalFile = DriveApp.getFileById(originalId);
  Logger.log("Originál: " + originalFile.getName());

  const copyFile = originalFile.makeCopy(`LETENKY-${data.cisloLetu}`);
  const copyId = copyFile.getId();
  Logger.log("Kopie vytvořena: " + copyId);

  const ss = SpreadsheetApp.openById(copyId);
  const templateSheet = ss.getSheets()[0];

  // === PRO KAŽDOU OSOBU VYTVOŘ LIST ===
  data.osoby.forEach((osoba, index) => {
    const oznaceni = `MiKaWings-${index}-MiKaWings`; // pevný prefix/suffix

    
    const id = Utilities.getUuid();
    pridejLetenku(id, data.cisloLetu, osoba, `A${index+1}`, data.zDestinace, data.doDestinace, data.datumOdlet, data.casOdlet)
    
    // === připravení dat pro PDF417 ===
    const pdfData = `MiKaWings-${id}-MiKaWings`
    // escape Unicode
    const pdfDataEscaped = pdfData.replace(/[\u0080-\uFFFF]/g, function(ch) {
      return "\\u" + ("0000" + ch.charCodeAt(0).toString(16)).slice(-4);
    });

    let sheet;
    if (index === 0) {
      sheet = templateSheet;
      sheet.setName(oznaceni);
    } else {
      sheet = templateSheet.copyTo(ss);
      sheet.setName(oznaceni);
    }

    Logger.log("Úprava listu pro: " + oznaceni);

    // === ÚPRAVA BUNĚK ===
    sheet.getRange("A4").setValue(data.doDestinace);
    sheet.getRange("B4").setValue(data.zDestinace);
    sheet.getRange("A6").setValue(data.datumOdlet);
    sheet.getRange("A7").setValue(data.casOdlet);
    sheet.getRange("B6").setValue(data.datumOdlet);
    sheet.getRange("B7").setValue(data.casPrilet);
    sheet.getRange("B11").setValue(data.cisloLetu);
    sheet.getRange("B13").setValue(`A${index+1}`);

    // Nastavení jména osoby v buňce
    sheet.getRange("B9").setValue(osoba);

    SpreadsheetApp.flush();

    // Vložení obrázku
    const imageBlob = vytvorPDF417(pdfDataEscaped); // QR kód s kompletními informacemi

    // Odstranění starých obrázků
    sheet.getImages().forEach(img => img.remove());

    // Vložení obrázku
    const insertedImage = sheet.insertImage(imageBlob, 1, 18); // levý horní roh sloučené buňky

    // Zjištění rozměrů sloučené buňky
    const mergedRange = sheet.getRange(18, 1); // první buňka sloučeného bloku
    const mergedWidth = mergedRange.getMergedRanges()[0].getWidth() * sheet.getColumnWidth(1);
    const mergedHeight = mergedRange.getMergedRanges()[0].getHeight() * sheet.getRowHeight(18);

    // Nastavení velikosti obrázku přesně do sloučené buňky
    insertedImage.setWidth(mergedWidth);
    insertedImage.setHeight(mergedHeight);
  });

  // === EXPORT DO PDF ===
  Logger.log("=== EXPORT DO PDF ===");
  const id = exportOblastDoPDF_log(copyId);
  Logger.log("PDF vytvořeno");

  // === SMAZÁNÍ KOPIE ===
  Logger.log("=== MAZÁNÍ KOPIE ===");
  DriveApp.getFileById(copyId).setTrashed(true);
  Logger.log("Kopie smazána");
  Logger.log("=== KONEC ===");
  return id
}

function vytvorSeznam(json) {
  const vysledek = [];

  Object.values(json).forEach(pokoj => {
    pokoj.forEach(osoba => {
      const celeJmeno = `${osoba.jmeno} ${osoba.prijmeni}`.trim();
      if (celeJmeno) {
        vysledek.push(celeJmeno);
      }
    });
  });

  return vysledek;
}

function vytvor_letenky(cisloSmlouvy, zDestinace, doDestinace ,cisloLetu, odlet, prilet, datum, osoby) {
  const sheet = SpreadsheetApp
    .getActiveSpreadsheet()
    .getSheetByName("Objednávky")
    .getDataRange()
    .getValues();

  let data = null;

  for (let i = 0; i < sheet.length; i++) {
    if (sheet[i][0] === cisloSmlouvy) {
      data = JSON.parse(sheet[i][2]);
      break; // zastaví cyklus po nalezení
    }
  }

  const informace = {cisloLetu, doDestinace, zDestinace, casOdlet: odlet, datumOdlet: datum, casPrilet: prilet, osoby}
  const id = upravZkopirujPridejObrExportujSmaz(informace);

  Logger.log(data.informaceOhotelu);
  return id
}

function overFormat(text) {
  // Zachytí cokoliv před a po ID, pokud se prefix a suffix shodují
  const regex = /^(.+)-(.+)-\1$/;
  const match = text.match(regex);

  if (match) {
    return { id: match[2], typ: match[1] };
  } else {
    return { id: null, typ: null };
  }
}


function nacteniKoduLetiste(username, body) {
  if (!over_pravomoce(username, "Letistni_kontrola")) {
    return { success: false };
  }

  // ===== 1️⃣ PŘÍPAD: jen raw data (první scan) =====
  if (body.data) {
    const { id, typ } = overFormat(body.data);

    // --- LETENKA ---
    if (typ === "MiKaWings") {
      const sheet = SpreadsheetApp.getActiveSpreadsheet()
        .getSheetByName("Letenky");

      const data = sheet.getDataRange().getValues();
      const radek = data.find(row => row[0] === id);

      if (!radek) {
        return { success: false, error: "Letenka nenalezena" };
      }

      const vraceni = {
        typ: "LETENKA",
        ID: radek[0],
        cisloLetu: radek[1],
        jmenoPrijmeni: radek[2],
        sedadlo: radek[3],
        zDestinace: radek[4],
        doDestinace: radek[5],
        datum: formatDatumL(radek[6]),
        cas: formatCasL(radek[7])
      };

      return { success: true, data: vraceni };
    }

    // --- PAS ---
    if (typ === "MiKaPas") {
      const sheet = SpreadsheetApp.getActiveSpreadsheet()
        .getSheetByName("Cestovní pasy");

      const data = sheet.getDataRange().getValues();
      const radek = data.find(row => row[0] === id);

      if (!radek) {
        return { success: false, error: "Pas nenalezen" };
      }

      const vraceni = {
        typ: "PAS",
        ID: radek[0],
        jmenoPas: radek[1],
        prijmeniPas: radek[2],
        datumNarozeniPas: formatDatumNarozeni(radek[3]),
        pohlavi: radek[4]
      };

      return { success: true, data: vraceni };
    }

    return { success: false, error: "Neznámý typ kódu" };
  }

  // ===== 2️⃣ PŘÍPAD: jen letenka (mezikrok) =====
  if (body.letenka && !body.pas) {
    // tady si můžeš případně něco uložit / logovat
    Logger.log("Letenka přijata: " + JSON.stringify(body.letenka));

    return { success: true };
  }

  // ===== 3️⃣ PŘÍPAD: letenka + pas (finál) =====
  if (body.letenka && body.pas) {
    const idLetenky = body.letenka.ID;
    const idPasu = body.pas.ID;

    // --- načtení letenky znovu ---
    const sheetLetenky = SpreadsheetApp.getActiveSpreadsheet()
      .getSheetByName("Letenky");

    const dataLetenky = sheetLetenky.getDataRange().getValues();
    const letenkaRow = dataLetenky.find(row => row[0] === idLetenky);
    const letenkaIndex = dataLetenky.findIndex(row => row[0] === idLetenky);

    if (!letenkaRow) {
      return { success: false, error: "Letenka nenalezena (ověření backend)" };
    }

    // --- načtení pasu znovu ---
    const sheetPasy = SpreadsheetApp.getActiveSpreadsheet()
      .getSheetByName("Cestovní pasy");

    const dataPasy = sheetPasy.getDataRange().getValues();
    const pasRow = dataPasy.find(row => row[0] === idPasu);

    if (!pasRow) {
      return { success: false, error: "Pas nenalezen (ověření backend)" };
    }

    function normalize(text) {
      return text
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim()
        .replace(/\s+/g, " ");
    }

    // letenka: "Jan Novak"
    const letenka = normalize(letenkaRow[2]);

    // pas: "Jan Novak"
    const pas = normalize(`${pasRow[1]} ${pasRow[2]}`);

    if (letenka !== pas) {
      return {
        success: false,
        error: "Neshoda mezi letenkou a pasem"
      };
    }

    // --- uložení ---
    const sheetKontroly = SpreadsheetApp.getActiveSpreadsheet()
      .getSheetByName("Cesty");

    const existuje = sheetKontroly
      .getDataRange()
      .getValues()
      .some(row => row[0] === idLetenky && row[1] === idPasu);

    if (!existuje) {
      sheetKontroly.appendRow([idLetenky, idPasu, new Date()]);
      sheetLetenky.getRange(letenkaIndex + 1, 9).setValue(true);
      return {
        success: true,
        data: {
          idLetenky,
          idPasu
        }
      };
    } else {
      return {
        success: false,
        error: "Nástup již byl proveden"
      }
    }
  }

  return { success: false, error: "Neplatný požadavek" };
}


function porovnejPasy(expectedObj, actualArray) {
  Logger.log("=== START POROVNÁNÍ PASŮ ===");

  const expectedRaw = Object.values(expectedObj || {});
  Logger.log("RAW expected (pokoje): " + JSON.stringify(expectedRaw, null, 2));

  const expected = expectedRaw
    .flatMap(pokoj => Array.isArray(pokoj) ? pokoj.map(osoba => osoba.pas) : [])
    .filter(Boolean);

  const actual = (actualArray || []).filter(Boolean);

  Logger.log("EXPECTED PASY: " + JSON.stringify(expected, null, 2));
  Logger.log("ACTUAL PASY: " + JSON.stringify(actual, null, 2));

  Logger.log("EXPECTED LENGTH: " + expected.length);
  Logger.log("ACTUAL LENGTH: " + actual.length);

  if (expected.length !== actual.length) {
    Logger.log("❌ ROZDÍLNÁ DÉLKA");
    return false;
  }

  const sort = arr => [...arr].sort();

  const a = sort(expected);
  const b = sort(actual);

  Logger.log("SORTED EXPECTED: " + JSON.stringify(a, null, 2));
  Logger.log("SORTED ACTUAL: " + JSON.stringify(b, null, 2));

  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      Logger.log(`❌ NESHODA NA INDEXU ${i}`);
      Logger.log(`EXPECTED: ${a[i]}`);
      Logger.log(`ACTUAL:   ${b[i]}`);
      return false;
    }
  }

  Logger.log("✅ PASY SE SHODUJÍ");
  Logger.log("=== END POROVNÁNÍ PASŮ ===");

  return true;
}

function jsouStejne(a, b) {
  const A = (a || []).slice().sort();
  const B = (b || []).slice().sort();

  if (A.length !== B.length) return false;

  return A.every((val, i) => val === B[i]);
}

function nacteniKoduHotel(username, body) {
  if (!over_pravomoce(username, "Hotelova_kontrola")) {
    return { success: false };
  }

  if (body.hotel && body.pasy) {
    const sheet = SpreadsheetApp.getActiveSpreadsheet()
      .getSheetByName("Hotelové vouchery");

    const data = sheet.getDataRange().getValues();
    const rowIndex = data.findIndex(r => r[0] === body.hotel);
    const row = data[rowIndex];

    if (!row) {
      return { success: false, error: "Voucher nenalezen" };
    }
    if (row[3] === true) {
      return { success: false, message: "Hosté již byli ubytováni"}
    } else {
      Logger.log(body.pasy);
      Logger.log(row[2])
      const pokoj = JSON.parse(row[2]);

      const pasy = Object.values(pokoj)
        .flatMap(pokoj => Array.isArray(pokoj) ? pokoj : [])
        .map(osoba => osoba.pas);

      const stejne = jsouStejne(pasy, body.pasy)
      Logger.log(stejne);
      if (stejne) {
        sheet.getRange(rowIndex + 1, 4).setValue(true); // sloupec D = index 4
        return {success: true, message: "Údaje ověřeny"}
      }
    }

    const vraceni = {
      typ: "HOTEL",
      ID: row[0],
      cislo: row[1],
      osoby: JSON.parse(row[2])
    };
  }

  // ===== 1) VOUCHER =====
  if (body.data) {
    // ===== VOUCHER =====
    if (body.data.startsWith("HOTEL")) {
      const sheet = SpreadsheetApp.getActiveSpreadsheet()
        .getSheetByName("Hotelové vouchery");

      const data = sheet.getDataRange().getValues();
      const match = body.data.match(/^HOTEL-([A-Z]+)-(.*?)-(\d{4}-\d{2}-\d{2})$/);
      // match 0 celé, match 1 kód hotel, match 2 id voucheru, match 3 datum
      Logger.log(match);
      Logger.log(body.data)
      const row = data.find(r => r[0] === match[2]);

      if (!row) {
        return { success: false, error: "Voucher nenalezen" };
      }
      Logger.log(row[0]);
      Logger.log(row[1]);
      Logger.log(row[2]);

      const vraceni = {
        typ: "HOTEL",
        ID: row[0],
        cislo: row[1],
        osoby: JSON.parse(row[2])
      };

      return { success: true, data: vraceni };
    }

    // ===== PAS =====
    const { id, typ } = overFormat(body.data);
    if (typ === "MiKaPas") {
      const sheet = SpreadsheetApp.getActiveSpreadsheet()
        .getSheetByName("Cestovní pasy");

      const data = sheet.getDataRange().getValues();
      const row = data.find(r => r[0] === id);

      if (!row) {
        return { success: false, error: "Pas nenalezen" };
      }

      return {
        success: true,
        data: {
          typ: "PAS",
          ID: row[0],
          jmenoPas: row[1],
          prijmeniPas: row[2],
          datumNarozeniPas: formatDatumNarozeni(row[3]),
          pohlavi: row[4]
        }
      };
    }

    return { success: false, error: "Neznámý typ kódu" };
  }

  // ===== 2) FINÁLNÍ VALIDACE =====
  if (body.voucher && body.pasy) {
    const voucher = body.voucher;
    const scanned = body.pasy;

    const expected = Object.values(voucher.osoby || {})
      .flat()
      .map(o => o.pas)
      .filter(Boolean);

    const missing = expected.filter(p => !scanned.includes(p));
    const extra = scanned.filter(p => !expected.includes(p));

    if (missing.length || extra.length) {
      return {
        success: false,
        error: "Neshoda pasů",
        missing,
        extra
      };
    }

    return { success: true };
  }

  return { success: false, error: "Neplatný požadavek" };
}

function formatDatumL(d) {
  const date = new Date(d);
  return Utilities.formatDate(date, "Europe/Prague", "yyyy-MM-dd");
}

function formatCasL(d) {
  const date = new Date(d);
  return Utilities.formatDate(date, "Europe/Prague", "HH:mm");
}

function formatDatumNarozeni(dateObj) {
  const den = dateObj.getDate(); // bez nulového doplňku
  const mesic = dateObj.getMonth() + 1; // měsíce 1–12
  const rok = dateObj.getFullYear();

  return `${den}. ${mesic}. ${rok}`;
}

function zkratka(text) {
  const slova = text.trim().split(/\s+/);

  if (slova.length >= 2) {
    return (slova[0][0] + slova[1][0]).toUpperCase();
  } else {
    return text.slice(0, 2).toUpperCase();
  }
}

function vytvorHotelovyVoucher(data) {
  const docId = "1ANSlFjB3wbuXLFb7XDdPRJ2R_ypVV06gocOlEWQFqgM";
  const folderId = "1Fozos0S5VQ4KdbQ18ThNKS3rT54ejtwC";
  const folder = DriveApp.getFolderById(folderId);

  // 🟦 1️⃣ Kopie šablony
  const originalFile = DriveApp.getFileById(docId);
  const copyFile = originalFile.makeCopy("hotelový voucher", folder);
  DriveApp.getRootFolder().removeFile(copyFile);

  const copyDoc = DocumentApp.openById(copyFile.getId());
  const body = copyDoc.getBody();


  	// 🟦 3️⃣ Doplnění jmenného seznamu
    if (data.jmennyseznam && Array.isArray(data.jmennyseznam)) {
      const foundElement = body.findText("\\{\\{tabulkaOsoby\\}\\}");
      if (foundElement) {
        const elem = foundElement.getElement();
        const startOffset = foundElement.getStartOffset();
        const endOffset = foundElement.getEndOffsetInclusive();

        // Odstranění placeholderu
        if (elem.editAsText) {
          elem.asText().deleteText(startOffset, endOffset);
        } else if (elem.getChild(0) && elem.getChild(0).editAsText) {
          elem.getChild(0).editAsText().deleteText(startOffset, endOffset);
        }

        // Získání indexu pro vložení za placeholder
        const parent = elem.getParent();
        let insertIndex = parent.getParent().getChildIndex(parent) + 1;

        data.jmennyseznam.forEach((pokojData) => {
          // Vložit název pokoje
          const para = body.insertParagraph(insertIndex, `Pokoj č. ${pokojData.pokoj}:`);
          para.setHeading(DocumentApp.ParagraphHeading.HEADING3);
          insertIndex++;

          // Vložit tabulku
          const tabulka = body.insertTable(insertIndex, [["Poř. číslo", "Oslovení", "Jméno", "Příjmení", "Datum nar.", "Číslo pasu"]]);
          insertIndex++;

          const hlavicka = tabulka.getRow(0);
          const sirky = [40, 70, 80, 100, 90, 100];
          for (let i = 0; i < sirky.length; i++) {
            const bunka = hlavicka.getCell(i);

            // Nastavení tučného textu správně
            bunka.editAsText().setBold(true);

            bunka.setWidth(sirky[i]);
          }

          // Vložení osob do tabulky
          pokojData.osoby.forEach((osoba) => {
            const row = tabulka.appendTableRow();
            row.appendTableCell(osoba.poradi?.toString() || "");
            row.appendTableCell(osoba.osloveni || "");
            row.appendTableCell(osoba.jmeno || "");
            row.appendTableCell(osoba.prijmeni || "");
            row.appendTableCell(osoba.datum || "");
            row.appendTableCell(osoba.pas || "");
          });

          // Prázdný řádek pro oddělení
          body.insertParagraph(insertIndex, "");
          insertIndex++;
        });
      }

    if (data.sluzby && typeof data.sluzby === "object") {
      const foundElement = body.findText("\\{\\{tabulkaZakoupeneSluzby\\}\\}");
      if (foundElement) {
        const elem = foundElement.getElement();
        const startOffset = foundElement.getStartOffset();
        const endOffset = foundElement.getEndOffsetInclusive();

        // Odstranění placeholderu
        if (elem.editAsText) {
          elem.asText().deleteText(startOffset, endOffset);
        } else if (elem.getChild(0) && elem.getChild(0).editAsText) {
          elem.getChild(0).editAsText().deleteText(startOffset, endOffset);
        }

        const parent = elem.getParent();
        let insertIndex = parent.getParent().getChildIndex(parent) + 1;

        // Vytvoření tabulky služeb
        const tabulka = body.insertTable(insertIndex, [["Služba", "Počet", "Kód"]]);
        insertIndex++;

        const hlavicka = tabulka.getRow(0);
        hlavicka.getCell(0).editAsText().setBold(true);
        hlavicka.getCell(1).editAsText().setBold(true);
        hlavicka.getCell(2).editAsText().setBold(true);
        hlavicka.getCell(0).setWidth(200);
        hlavicka.getCell(1).setWidth(50);
        hlavicka.getCell(2).setWidth(80); // menší šířka pro QR kód

        for (const [sluzba, pocet] of Object.entries(data.sluzby)) {
          const row = tabulka.appendTableRow();
          row.appendTableCell(sluzba);
          row.appendTableCell(pocet.toString());

          // Vytvoření QR kódu
          const typKodu = "datamatrix"; 
          const text = zkratka(sluzba) + "-" + vytovr_sluzbu(sluzba, data.hotel.odjezd)
          const blob = vytvorBarcode(text, typKodu); // Blob obrázku

          const qrCell = row.appendTableCell("");
          qrCell.getChild(0)?.removeFromParent();

          const image = qrCell.insertImage(0, blob);
          image.setWidth(50); // nastaví šířku 50px
          image.setHeight(50); // zachová rozměr čtverce
        }

        body.insertParagraph(insertIndex, "");
        insertIndex++;
      }
    }

  // ===== HOTEL VOUCHER KÓD =====
  const voucherPlaceholder = body.findText("\\{\\{kodHotelovyVoucher\\}\\}");

  if (voucherPlaceholder && data.hotel) {
    const elem = voucherPlaceholder.getElement();
    const startOffset = voucherPlaceholder.getStartOffset();
    const endOffset = voucherPlaceholder.getEndOffsetInclusive();

    // odstranění placeholderu
    if (elem.editAsText) {
      elem.asText().deleteText(startOffset, endOffset);
    } else if (elem.getChild(0) && elem.getChild(0).editAsText) {
      elem.getChild(0).editAsText().deleteText(startOffset, endOffset);
    }

    // sestavení obsahu kódu (doporučení: stabilní formát)
    Logger.log(typeof data.hotel.prijezd);
    Logger.log(data.hotel.prijezd);
    const kodHotelu =
      "HOTEL-" +
      data.hotel.nazev.match(/[A-Z]/g)?.join("") +
      "-" +
      data.hotel.voucher +
      "-" +
      new Date(parseCzDate(data.hotel.prijezd)).toISOString().slice(0, 10);

    const blob = vytvorBarcode(kodHotelu, "azteccode");

    const parent = elem.getParent();
    const insertIndex = parent.getParent().getChildIndex(parent) + 1;

    const p = body.insertParagraph(insertIndex, "");
    p.appendInlineImage(blob);
  }
  // 🟦 2️⃣ Nahrazení placeholderů
  function processElement(element) {
    const type = element.getType();
    if (type === DocumentApp.ElementType.TEXT) {
      replaceTextInElement(element.asText(), data);
    } else if (element.getNumChildren) {
      for (let i = 0; i < element.getNumChildren(); i++) {
        processElement(element.getChild(i));
      }
    }
  }

  function replaceTextInElement(textElement, data) {
    const fullText = textElement.getText();
    const pattern = /{{\s*([\w.]+)\s*}}/g;
    let match, offset = 0;
    while ((match = pattern.exec(fullText)) !== null) {
      const start = match.index;
      const end = start + match[0].length;
      let hodnota;
      try {
        hodnota = match[1].split('.').reduce((acc, k) => acc[k], data);
        hodnota = hodnota.toString();
      } catch (e) {
        hodnota = `[CHYBÍ: ${match[1]}]`;
      }
      textElement.deleteText(start - offset, end - offset - 1);
      textElement.insertText(start - offset, hodnota);
      offset += match[0].length - hodnota.length;
    }
  }

  processElement(body);

  
  }

  // 🟦 4️⃣ PDF a úklid
  copyDoc.saveAndClose();
  const pdfBlob = copyFile.getAs(MimeType.PDF);
  const pdfFile = folder.createFile(pdfBlob).setName("Hotelový voucher - " + data.hotel.nazev + ".pdf");
  Logger.log("✅ Příloha A vytvořena: " + pdfFile.getName());
  copyFile.setTrashed(true);
  return pdfFile.getId();
}

function parseCzDate(dateStr) {
  const parts = dateStr.split(".");
  
  const day = parseInt(parts[0].trim(), 10);
  const month = parseInt(parts[1].trim(), 10);
  const year = parseInt(parts[2].trim(), 10);

  return new Date(year, month - 1, day);
}

function hotelovyVoucherData(cisloSmlouvy) {
  const sheet = SpreadsheetApp
    .getActiveSpreadsheet()
    .getSheetByName("Objednávky")
    .getDataRange()
    .getValues();

  let data = null;
  let row = null

  for (let i = 0; i < sheet.length; i++) {
    if (sheet[i][0] === cisloSmlouvy) {
      data = JSON.parse(sheet[i][2]);
      row = sheet[i]
      break; // zastaví cyklus po nalezení
    }
  }
  Logger.log(data);
  const list = {
    hotel: {
      nazev: data.informaceOhotelu.hotel,
      voucher: generujVoucher(cisloSmlouvy, JSON.parse(row[12])),
      prijezd: formatDatumNarozeni(new Date(data.informaceOhotelu.datumy.od)),
      odjezd: formatDatumNarozeni(new Date (data.informaceOhotelu.datumy.do)),
      noci: vypocitejNoci(data.informaceOhotelu.datumy.od, data.informaceOhotelu.datumy.do),
      strava: data.informaceOhotelu.strava
    },
    osoby: {
      jmeno: data.jmeno + " " + data.prijmeni,
      rozpis: popisOsob(row[12])
    },
    datumDnes: formatDatumNarozeni(new Date),
    cena: JSON.parse(row[13]).celkovaCena,
    jmennyseznam: vytvorJmennySeznam(JSON.parse(row[12])),
    sluzby: JSON.parse(row[11])
  }
  return vytvorHotelovyVoucher(list);
}

function popisOsob(jsonStr) {
  const data = JSON.parse(jsonStr);

  let dospeli = 0;
  let deti = 0;

  Object.values(data).forEach(pokoj => {
    if (!Array.isArray(pokoj)) return;

    pokoj.forEach(osoba => {
      if (osoba.osloveni && osoba.osloveni.trim() !== "") {
        dospeli++;
      } else {
        deti++;
      }
    });
  });

  return `${dospeli} dospělý, ${deti} dítě`;
}

function generujVoucher(cisloSmlouvy, osoby) {
  const ss = SpreadsheetApp.openById("1Wu4KesSkbHN_mb3WrTf_dubtUqIdKnOxWbZijDTH9MY");
  const sheet = ss.getSheetByName("Hotelové vouchery");

  if (!sheet) {
    throw new Error("List 'Hotelové vouchery' nebyl nalezen. Zkontrolujte název.");
  }

  const data = sheet.getRange("A:A").getValues().flat().filter(String);
  const existujiciKody = new Set(data);

  let kod;
  do {
    kod = Math.random().toString(36).slice(-10).toUpperCase();
  } while (existujiciKody.has(kod));

  sheet.appendRow([
    kod,
    cisloSmlouvy,
    JSON.stringify(osoby),
    false
  ]);

  return kod;
}

function vytovr_sluzbu(nazev, datumDo) {
  const kod = Math.random().toString(36).slice(-5).toUpperCase();
  const sheet = SpreadsheetApp.openById("1Wu4KesSkbHN_mb3WrTf_dubtUqIdKnOxWbZijDTH9MY").getSheetByName("Objednané služby");
  sheet.appendRow([kod, nazev, false, datumDo])
  return kod
}

function aaaa____________________________________________________a() {
  Logger.log(nacteniKoduHotel("MíšaHr", { data: 'HOTEL-HJL-WL4QI4W58W2026-04-10', action: 'nacteniKoduHotel' }))
  //Logger.log(email_banka({ action: 'email_banka', email: 'michael.hruska11@gmail.com' }, "MíšaHr"));
  //Logger.log(prihlaseni_banka({
   //email: 'michael.hruska11@gmail.com',
  //kod: '959672',
 // klic: '944336',
  //secureToken: 'Ehh1kiuYDL3JhMyVSoUSDjMK6HGSrOHH'
//}));
  //Logger.log(getTokenByValue("dd619e4d-6427-4be6-8f9b-1b18919dd052"));

  /*Logger.log(pridej_utratu("MíšaHr", "michael.hruska11@gmail.com", {
  action: 'odeslat_platbu',
  info: {
    castka: 1000,
    mena: 'MiKa',
    prijemce: 'MiKaTravel',
    variabilniSymbol: 'KŠ-1',
    zprava: '',
    karta: {
      number: '1111 1100 0000 0001',
      name: 'MICHAEL HRUŠKA',
      expiry: '12/26',
      cvv: '111'
    }
  }
}));*/
  //posliPristupovyKod('jana.z.kouta@seznam.cz', "459135");

  //Logger.log(role("MíšaHr"));

  //Logger.log(over_pravomoce("MíšaHr", "Zobrazeni_uzivatelu"));

  //Logger.log(funkce_uzivatelu())

  //Logger.log(sprava_uzivatelu_vytvoritupravitsmazat("MíšaHr", {"action":"sprava_uzivatelu_vytvoritupravitsmazat","akce":"uprav_radek","oldUsername":"MíšaHr","rowData":{"username":"MíšaHr",        "role":"Superadministrátor","email":"michael.hruska11@gmail.com"}}));

  //Logger.log(sprava_uzivatelu_vytvoritupravitsmazat("MíšaHr", {
  //action: 'sprava_uzivatelu_vytvoritupravitsmazat',
  //akce: 'smazat_uzivatele',
  //username: 'MíšaHr'
//}))

  ///Logger.log(
//    zobrazeni_objednavek(
//      "MíšaHr",
//      {
//        action: "zobrazeni_objednavek",
//        dateFrom: "2026-03-01",
//        dateTo: "2026-12-31",
 //       searchText: "733691861",
 //       searchType: "all",
//        limit: 300
//      }
//    )
//  );

  //over_uzivatele_banky("michael.hruska11@gmail.com", {info: { karta: {number: '1111 1100 0000 0001', name: 'MICHAEL HRUŠKA', expiry: '05/26', cvv: '111'}}});

  //posli_karty_uzivatele("michael.hruska11@gmail.com");
  //Logger.log(posli_utraty_uzivatele("michael.hruska11@gmail.com", {karta: "1111 1100 0000 0001"}));

  //Logger.log(vytvorNavrhSmlouvy("ES-2026-0309-00001"))

  //const output = vytvorPodepsanouSmlouvu({ action: 'podpis', docId: 'ES-2026-0309-00001', vyjadreni: 'Schváleno' }, "MíšaHr");

  //Logger.log(output.getContent());

  //Logger.log(zobrazeni_uzivatelskych_utrat("MíšaHr", {akce: "zobrazit"}))

  /*Logger.log(odesilani_newsletteru("MíšaHr", {
  action: 'odesilani_newsletteru',
  akce: 'email',
  vybrani: [ 'michael.hruska11@gmail.com' ],
  text: '<div style="padding: 15px;"><b><font face="Courier New">Začněte psát obsah zde...</font></b></div>',
  predmet: 'Newsletter',
  color: '#000'
}))*/
  /*Logger.log(pridej_utratu("MíšaHr", "michael.hruska11@gmail.com", {
  action: 'odeslat_platbu',
  info: {
    castka: '1000',
    mena: 'MiKa',
    prijemce: 'MiKaTravel',
    variabilniSymbol: 'KŠ-2',
    zprava: '',
    karta: {
      number: '1111 1100 0000 0001',
      name: 'MICHAEL HRUŠKA',
      expiry: '12/26',
      cvv: '111'
    }
  }
}))*/
  //Logger.log(platba_objednavky({prijemce: "MiKaTravel", objednavka: "KŠ-1", castka: "-500"}, "MíšaHr"));
  //pridejZatoceni("MíšaHr", 1);
  //Logger.log(posliUpozorneniSplatek("ES-2026-0317-00012"));

  //Logger.log(pridejLetDoTabulky("PRG", "PMI", "2026-03-20", "17:15"))

  //Logger.log(vytvorCestovniDokumenty("ES-2026-0317-00012"));
  //Logger.log(posliUpozorneniUpravaDokumentu("ES-2026-0323-00019"));
  //Logger.log(poplatky_vedeni());
  //Logger.log(uzivatel_karta(""))
  //Logger.log(cena("25 000 MiKa", "MíšaHr"))
  //Logger.log(MailApp.getRemainingDailyQuota());
  //Logger.log(posliUpozorneniUpravaDokumentu("ES-2026-0330-00020"));
  //poplatky_vedeni();
  /*Logger.log(
    pridej_funkci(
      'schvalovani_objednavek({[username]}, {akce: "ulozit", contractNumber: "ES-2026-0322-00018"})'
    )
  );*/
  //
  //vytvorCestovniDokumenty("ES-2026-0402-00023");
  //post("MíšaHr", "michael.hruska11@gmail.com", "xn3zgq5sw");
  /*var url = vytvorPDF417("Ahoj světe 123456");
  Logger.log(url);*/
  //Logger.log(exportOblastDoPDF_log());
  //Logger.log(upravZkopirujPridejObrExportujSmaz("1_3dlKZd0s796azM3o5xFqVlkLK8TOtrIlPC2vAFz4-8", {doDestinace: "PMI", zDestinace: "PRGBLI", datumOdlet: "5.4.2026", casOdlet: "20:00", datumPrilet: "5.4.2026", casPrilet: "21:00", cisloLetu: "050426-PRGBLI-PMI-001", osoby: ["Osoba1", "Osoba 2"]}));
  //Logger.log(exportOblastDoPDF_log("1_3dlKZd0s796azM3o5xFqVlkLK8TOtrIlPC2vAFz4-8"));
  //Logger.log(vytvor_letenky("ES-2026-0402-00026"));
  //Logger.log(nacteniKodu("MíšaHr", {data: "MiKaWings-d83a50d6-b5a4-4257-a318-2db108f261a3-MiKaWings"}));
  /*var blob = vytvorPDF417("MiKaPas-CZ-31012017--MiKa--KAHR--MiKa--***-CZ-MiKaPas");

  // Uložení do Drive
  var soubor = DriveApp.createFile(blob);
  soubor.setName("pdf417.png");

  Logger.log("Soubor uložen: " + soubor.getUrl());*/
  //Logger.log(nacteniKoduLetiste("MíšaHr", {data: 'MiKaPas-CZ-21051980--MiKa--VAHR--MiKa--VHr-CZ-MiKaPas'}))
  //posliUpozorneniSplatek("ES-2026-0402-00026");
  /*const list = 
  {
    hotel: {
      nazev: "Coral Dreams",
      voucher: "ČÍSLO VOUCHERU",
      prijezd: "14. 4. 2026",
      odjezd: "18. 4. 2026",
      noci: "4",
      strava: "Bez stravování"
    },
    osoby: {
      jmeno: "Michael Hruška",
      rozpis: "2 dosplí, 2 děti"
    },
    datumDnes: formatDatumNarozeni(new Date),
    tabulkaOsoby: "dodělat",
    tabulkaZakoupeneSluzby: "dodělat",
    cena: "5000"
  }
  vytvorHotelovyVoucher(list);*/
  //vytovr_sluzbu("Pojištění", "2026-04-10")
  //hotelovyVoucherData("ES-2026-0402-00026");
  //otestujVsechnyBarcody();
  //generujVoucher("ES-2026-0402-00026")
  //vytvorCestovniDokumenty("ES-2026-0411-00029");
  /*Logger.log(nacteniKoduHotel("MíšaHr", {
  hotel: 'DGMNFC4XMJ',
  pasy: [
    'CZ-21051980--MiKa--VAHR--MiKa--VHr-CZ',
    'CZ-29031985--MiKa--JAHR--MiKa--JHr-CZ'
  ],
  action: 'nacteniKoduHotel'
}))*/
  //Logger.log(hotelovyVoucherData("ES-2026-0411-00030"));
  //vytvorCestovniDokumenty("ES-2026-0411-00029");
}

function otestujVsechnyBarcody() {
  const allowedTypes = [
    'pdf417', 'qrcode', 'azteccode', 'datamatrix',
    'code128', 'code39', 'code93',
    'ean13', 'ean8', 'upca', 'upce',
    'interleaved2of5', 'msi', 'codabar'
  ];

  const slozka = DriveApp.createFolder("TEST_BARCODE_" + new Date().getTime());

  allowedTypes.forEach(typ => {
    try {
      let testText;

      // Speciální případy (musí být čísla a správná délka)
      switch (typ) {
        case 'ean13':
          testText = '123456789012'; // 12 číslic (13. se dopočítá)
          break;
        case 'ean8':
          testText = '1234567'; // 7 číslic
          break;
        case 'upca':
          testText = '12345678901'; // 11 číslic
          break;
        case 'upce':
          testText = '123456'; // zjednodušené
          break;
        case 'interleaved2of5':
        case 'msi':
          testText = '12345678';
          break;
        default:
          testText = 'TEST-1234'; // univerzální text
      }

      const blob = vytvorBarcode(testText, typ);
      blob.setName(typ + ".png");

      slozka.createFile(blob);

      Logger.log("OK: " + typ);

    } catch (e) {
      Logger.log("CHYBA: " + typ + " -> " + e.message);
    }
  });

  Logger.log("Hotovo. Složka: " + slozka.getUrl());
}



function vytvorNavrhSmlouvy(cislo) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("Objednávky");
  if (!sheet) throw new Error("List 'Objednávky' nebyl nalezen.");

  const data = sheet.getDataRange().getValues();

  const rowIndex = najdiRadekObjednavky(cislo) - 1;

  if (rowIndex >= data.length) {
    throw new Error(`Řádek s indexem ${rowIndex} neexistuje. Tabulka má jen ${data.length} řádků.`);
  }

  const row = data[rowIndex];

  // Pokud je ve sloupcích JSON text, můžeme ho převést
  const seznam = row.map(hodnota => {
    if (typeof hodnota === "string" && (hodnota.startsWith("{") || hodnota.startsWith("["))) {
      try {
        return JSON.parse(hodnota);
      } catch(e) {
        return hodnota; // pokud se nepovede parsovat, necháme text
      }
    }
    return hodnota;
  });

  const lety = najdiLetyProDestinaci(JSON.parse(row[3]).zajezd.destinace)[0]

  const objednavka = JSON.parse(row[2]);

  const noci = vypocetNoci(objednavka.informaceOhotelu.datumy);
  const cenatab = cenaCelkemParametryRozpis(objednavka.informaceOhotelu.hotel, objednavka.informaceOhotelu.strava, noci, objednavka.informaceOhotelu.pokoje, objednavka.sluzby)

  Logger.log(cenatab);

  const vystup = {
    "smlouva": {
      "cislo": row[0],
      "jazyk": "CZ"
    },
    "kupujici": {
      "jmeno": row[4],
      "adresa": row[8] + " " + row[9],
      "pas": formatDatum(row[7]),
      "telefon": "+420 " + String(row[5]),
      "email": row[6]
    },
    "zajezd": JSON.parse(row[3]).zajezd,
    "letiste": {
      odletu: "Praha (PRG)",
      cilove: lety[1] + " (" + lety[3] + ")"
    },
    "letadlo": {
      typ: "MiKaWings 111",
      delka: lety[2],
      kg: 8
    },
    "cena": cenatab.rozpis,
    "platby": {
      ...JSON.parse(row[14]),
      "uverova_sazba": "15"
    },
    "jmennyseznam": vytvorJmennySeznam(JSON.parse(row[12])),
    "prilohy": {
      "jmenny": "https://mikatravel.vercel.app/smlouva/" + row[0] + "/A",
      "popis_zajezdu": "https://mikatravel.vercel.app/smlouva/" + row[0] + "/B",
      "faktura": "https://mikatravel.vercel.app/smlouva/" + row[0] + "/C"
    }
  }

  Logger.log(seznam);
  Logger.log(vystup);
  hlavniSmlouva(vystup);
  posliNavrhSmlouvy(row[6], cislo);
  return seznam; // vrátí pole hodnot z řádku
}


function vytvorCestovniDokumenty(cislo) {
  const LOG = "[vytvorCestovniDokumenty]";
  Logger.log(`${LOG} START, cislo: ${cislo}`);

  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    Logger.log(`${LOG} Spreadsheet načten`);

    const sheet = ss.getSheetByName("Objednávky");
    if (!sheet) throw new Error("List 'Objednávky' nebyl nalezen.");
    Logger.log(`${LOG} Sheet nalezen`);

    const data = sheet.getDataRange().getValues();
    Logger.log(`${LOG} Načteno řádků: ${data.length}`);

    const rowIndex = najdiRadekObjednavky(cislo) - 1;
    Logger.log(`${LOG} rowIndex: ${rowIndex}`);

    if (rowIndex >= data.length) {
      throw new Error(`Řádek s indexem ${rowIndex} neexistuje.`);
    }

    const row = data[rowIndex];
    Logger.log(`${LOG} Row data: ${JSON.stringify(row)}`);

    const seznam = row.map((hodnota, i) => {
      if (typeof hodnota === "string" && (hodnota.startsWith("{") || hodnota.startsWith("["))) {
        try {
          const parsed = JSON.parse(hodnota);
          Logger.log(`${LOG} JSON parse OK na indexu ${i}`);
          return parsed;
        } catch (e) {
          Logger.log(`${LOG} JSON parse FAIL na indexu ${i}: ${e}`);
          return hodnota;
        }
      }
      return hodnota;
    });

    Logger.log(`${LOG} seznam hotov`);

    const hotelRaw = row[3];
    Logger.log(`${LOG} hotelRaw: ${hotelRaw}`);

    const hotel = JSON.parse(hotelRaw);
    Logger.log(`${LOG} hotel parsed`);

    const objednavka = JSON.parse(row[2]);
    Logger.log(`${LOG} objednavka parsed`);

    const lety = najdiLetyProDestinaci(hotel.zajezd.destinace)[0];
    Logger.log(`${LOG} lety: ${JSON.stringify(lety)}`);

    const noci = vypocetNoci(objednavka.informaceOhotelu.datumy);
    Logger.log(`${LOG} noci: ${noci}`);

    const letTamData = najdiLet(lety[3], "PRGBLI", hotel.zajezd.datum_od);
    Logger.log(`${LOG} letTamData: ${JSON.stringify(letTamData)}`);

    const letZpetData = najdiLet("PRGBLI", lety[3], hotel.zajezd.datum_do);
    Logger.log(`${LOG} letZpetData: ${JSON.stringify(letZpetData)}`);

    const { cas: casLetuTam, doba: letovyCasTam, cisloLetu: let_cislo } = letTamData;
    const { cas: casLetuZpet, doba: letovyCasZpet, cisloLetu: let_cislo_zpet } = letZpetData;

    Logger.log(`${LOG} casLetuTam: ${casLetuTam}, letovyCasTam: ${letovyCasTam}`);
    Logger.log(`${LOG} casLetuZpet: ${casLetuZpet}, letovyCasZpet: ${letovyCasZpet}`);

    // ===== TAM =====
    const [hodinyTam, minutyTam] = casLetuTam.split(":").map(Number);
    Logger.log(`${LOG} odlet TAM: ${hodinyTam}:${minutyTam}`);

    const casPartsTam = letovyCasTam.match(/(?:cca\s*)?(\d+)\s*h(?:\s*(\d+)\s*m?)?/i);
    if (!casPartsTam) throw new Error("Regex selhal pro let TAM");

    const letHodinyTam = Number(casPartsTam[1]);
    const letMinutyTam = Number(casPartsTam[2] || 0);
    Logger.log(`${LOG} délka letu TAM: ${letHodinyTam}h ${letMinutyTam}m`);

    let odletTam = new Date(hotel.zajezd.datum_od);
    odletTam.setHours(hodinyTam, minutyTam);

    odletTam.setHours(odletTam.getHours() + letHodinyTam);
    odletTam.setMinutes(odletTam.getMinutes() + letMinutyTam);

    const pristaniTam = `${odletTam.getHours().toString().padStart(2,"0")}:${odletTam.getMinutes().toString().padStart(2,"0")}`;
    Logger.log(`${LOG} pristaniTam: ${pristaniTam}`);

    // ===== ZPĚT =====
    const [hodinyZpet, minutyZpet] = casLetuZpet.split(":").map(Number);
    Logger.log(`${LOG} odlet ZPET: ${hodinyZpet}:${minutyZpet}`);

    const casPartsZpet = letovyCasZpet.match(/(?:cca\s*)?(\d+)\s*h(?:\s*(\d+)\s*m?)?/i);
    if (!casPartsZpet) throw new Error("Regex selhal pro let ZPET");

    const letHodinyZpet = Number(casPartsZpet[1]);
    const letMinutyZpet = Number(casPartsZpet[2] || 0);
    Logger.log(`${LOG} délka letu ZPET: ${letHodinyZpet}h ${letMinutyZpet}m`);

    let odletZpet = new Date(hotel.zajezd.datum_do);
    odletZpet.setHours(hodinyZpet, minutyZpet);

    odletZpet.setHours(odletZpet.getHours() + letHodinyZpet);
    odletZpet.setMinutes(odletZpet.getMinutes() + letMinutyZpet);

    const pristaniZpet = `${odletZpet.getHours().toString().padStart(2,"0")}:${odletZpet.getMinutes().toString().padStart(2,"0")}`;
    Logger.log(`${LOG} pristaniZpet: ${pristaniZpet}`);

    const vystup = {
      smlouva: { cislo },
      zajezd: hotel.zajezd,
      let: {
        odlet_cas: casLetuTam,
        prilet_cas: pristaniTam
      },
      navrat: {
        cas: pristaniZpet
      },
      jmennyseznam: JSON.parse(row[12])
    };

    Logger.log(`${LOG} vystup: ${JSON.stringify(vystup)}`);

    const id = cestovniDokumenty(vystup);
    Logger.log(`${LOG} dokument vytvořen: ${id}`);

    const idLetenky = vytvor_letenky(cislo, "PRGBLI", lety[3], let_cislo, casLetuTam, pristaniTam, hotel.zajezd.datum_od, vytvorSeznam(objednavka.cestujici));
    Logger.log(`${LOG} letenky TAM vytvořeny: ${idLetenky}`);

    const idLetenkyZpet = vytvor_letenky(cislo, lety[3], "PRGBLI", let_cislo_zpet, casLetuZpet, pristaniZpet, hotel.zajezd.datum_do, vytvorSeznam(objednavka.cestujici));
    Logger.log(`${LOG} letenky ZPET vytvořeny: ${idLetenkyZpet}`);

    posliCestovniDokumenty(row[6], cislo, id);
    Logger.log(`${LOG} odeslány dokumenty`);

    posliLetenky(row[6], cislo, idLetenky, idLetenkyZpet);
    const voucher = hotelovyVoucherData(cislo);
    Logger.log("==================VOUCHER=====================")
    Logger.log(voucher);
    posliVoucher(row[6], cislo, voucher);
    Logger.log(`${LOG} odeslány letenky`);

    Logger.log(`${LOG} END OK`);
    return { success: true, message: "Děkujeme" };

  } catch (err) {
    Logger.log(`${LOG} ERROR: ${err.message}`);
    Logger.log(`${LOG} STACK: ${err.stack}`);
    return { success: false, error: err.message };
  }
}

function prepisSloupecRObjednavky(radek, novaHodnota) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("Objednávky");

  if (!sheet) {
    throw new Error("List 'Objednávky' nebyl nalezen.");
  }

  const sloupecR = 18; // sloupec R je 18. sloupec (A=1, B=2, ...)
  sheet.getRange(radek, sloupecR).setValue(novaHodnota);
}

function prepisSloupecSObjednavky(radek) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("Objednávky");

  if (!sheet) {
    throw new Error("List 'Objednávky' nebyl nalezen.");
  }

  const sloupecR = 19; // sloupec R je 18. sloupec (A=1, B=2, ...)
  sheet.getRange(radek, sloupecR).setValue("Nezaplaceno");
}


function vytvorPodepsanouSmlouvu(e, username) {
  const hodnota = najdiObjednavkuHodnotu(e.docId);

  if (hodnota !== username && username !== "MíšaHr") {
    return ContentService
      .createTextOutput("Neprihlaseno")
      .setMimeType(ContentService.MimeType.TEXT);
  }

  if (najdiObjednavkuHodnotuVyjadreni(e.docId) !== "Nerozhodnuto"){
    return ContentService
      .createTextOutput(e)
      .setMimeType(ContentService.MimeType.TEXT);
  }

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("Objednávky");
  if (!sheet) throw new Error("List 'Objednávky' nebyl nalezen.");

  const data = sheet.getDataRange().getValues();

  const rowIndex = najdiRadekObjednavky(e.docId) - 1;

  if (rowIndex >= data.length) {
    throw new Error(`Řádek s indexem ${rowIndex} neexistuje. Tabulka má jen ${data.length} řádků.`);
  }

  const row = data[rowIndex];

  prepisSloupecRObjednavky(rowIndex + 1, e.vyjadreni);
  prepisSloupecSObjednavky(rowIndex + 1);

  // Pokud je ve sloupcích JSON text, můžeme ho převést
  const seznam = row.map(hodnota => {
    if (typeof hodnota === "string" && (hodnota.startsWith("{") || hodnota.startsWith("["))) {
      try {
        return JSON.parse(hodnota);
      } catch(e) {
        return hodnota; // pokud se nepovede parsovat, necháme text
      }
    }
    return hodnota;
  });

  const lety = najdiLetyProDestinaci(JSON.parse(row[3]).zajezd.destinace)[0]

  const objednavka = JSON.parse(row[2]);

  const noci = vypocetNoci(objednavka.informaceOhotelu.datumy);
  const cenatab = cenaCelkemParametryRozpis(objednavka.informaceOhotelu.hotel, objednavka.informaceOhotelu.strava, noci, objednavka.informaceOhotelu.pokoje, objednavka.sluzby)

  Logger.log(cenatab);

  const dnesni_datum = formatDnesniDatum();

  const vystup = {
    "smlouva": {
      "cislo": row[0],
      "jazyk": "CZ"
    },
    "datum": {
      "dnes": dnesni_datum
    },
    "kupujici": {
      "jmeno": row[4],
      "adresa": row[8] + " " + row[9],
      "pas": formatDatum(row[7]),
      "telefon": "+420 " + String(row[5]),
      "email": row[6]
    },
    "zajezd": JSON.parse(row[3]).zajezd,
    "letiste": {
      odletu: "Praha (PRG)",
      cilove: lety[1] + " (" + lety[3] + ")"
    },
    "letadlo": {
      typ: "MiKaWings 111",
      delka: lety[2],
      kg: 8
    },
    "cena": cenatab.rozpis,
    "platby": {
      ...JSON.parse(row[14]),
      "uverova_sazba": "15"
    },
    "jmennyseznam": vytvorJmennySeznam(JSON.parse(row[12])),
    "prilohy": {
      "jmenny": "https://mikatravel.vercel.app/smlouva/" + row[0] + "/A",
      "popis_zajezdu": "https://mikatravel.vercel.app/smlouva/" + row[0] + "/B",
      "faktura": "https://mikatravel.vercel.app/smlouva/" + row[0] + "/C"
    }
  }

  Logger.log(seznam);
  Logger.log(vystup);
  if (e.vyjadreni === "Schváleno"){
    hlavniSmlouvaPodpis(vystup);
  }
  else if (e.vyjadreni === "Zamítnuto"){
    hlavniSmlouvaZamitnuto(vystup);
  }

  
  // Příklad volání:

  return seznam; // vrátí pole hodnot z řádku
}

function formatDnesniDatum() {
  const dnes = new Date();
  const den = dnes.getDate();
  const mesic = dnes.getMonth() + 1; // měsíce jsou 0–11
  const rok = dnes.getFullYear();

  return `${den}. ${mesic}. ${rok}`;
}

function vytvorJmennySeznam(vstup) {
  const jmennyseznam = Object.keys(vstup).map((klic, indexPokoj) => {
    const osoby = vstup[klic].map((osoba, indexOsoba) => {
      // Pokus o nalezení data narození ze vzoru CZ-DDMMYYYY--
      let datum = "";
      const match = osoba.pas.match(/CZ-(\d{2})(\d{2})(\d{4})/);
      if (match) {
        datum = `${match[1]}.${match[2]}.${match[3]}`;
      }

      return {
        poradi: indexOsoba + 1,
        osloveni: osoba.osloveni || "",
        jmeno: osoba.jmeno || "",
        prijmeni: osoba.prijmeni || "",
        datum,
        pas: osoba.pas || ""
      };
    });

    return {
      pokoj: Number(indexPokoj + 1),
      osoby
    };
  });

  Logger.log(JSON.stringify(jmennyseznam, null, 2));
  return jmennyseznam;
}




/**
 * Pomocná funkce pro bezpečné parsování JSON
 */
function tryParseJSON(text) {
  try {
    return text && typeof text === "string" ? JSON.parse(text) : text;
  } catch (e) {
    return null;
  }
}

/**
 * Výpočet počtu nocí mezi dvěma daty
 */
function vypocitejNoci(od, do_) {
  try {
    const d1 = new Date(od);
    const d2 = new Date(do_);
    return Math.round((d2 - d1) / (1000 * 60 * 60 * 24));
  } catch {
    return "TODO";
  }
}


function formatDatum(datum) {
  // pokud datum není Date, převedeme ho
  if (!(datum instanceof Date)) {
    datum = new Date(datum);
  }

  // pokud převod selže, vrátíme prázdný string nebo chybu
  if (isNaN(datum.getTime())) {
    throw new Error("Neplatné datum: " + datum);
  }

  const den = datum.getDate();           // den bez nul na začátku
  const mesic = datum.getMonth() + 1;    // měsíce jsou 0-11
  const rok = datum.getFullYear();       // rok

  return den + "." + mesic + "." + rok;  // spojení do formátu d.m.yyyy
}


function najdiLetyProDestinaci(destinace) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("Lety");
  if (!sheet) throw new Error("List 'Lety' nebyl nalezen.");

  const data = sheet.getDataRange().getValues();
  const headers = data.shift(); // první řádek jsou názvy sloupců

  // Určíme indexy sloupců, které chceme vrátit
  const sloupceChceme = ["Destinace", "Letiště (cílové)", "Doba letu (z PRG)", "Značka"];
  const indexy = sloupceChceme.map(h => headers.indexOf(h));

  // Filtrujeme podle destinace a mapujeme jen potřebné sloupce
  const vysledky = data
    .filter(row => row[0].toString().trim() === destinace || row[2].toString().trim() === destinace)
    .map(row => indexy.map(i => row[i]));

  return vysledky;
}

function hlavniSmlouva(dynamicData) {
  const docId = "1s7IRAmQymrkKKCS_-rFSvwys4YtLVDfhxHdNxX6wqas";
  const folderId = "1Ym5jupeEOB2rQRtDUX6OBQU2kCQxOcBS";
  const folder = DriveApp.getFolderById(folderId);

  // Statická data
  const defaultData = {
    informace: { predem_dny: 7 },
    storno: {
      vice_nez_dni: 30, poplatek_vice: 75,
      do_dni: 29, do_dni2: 14, poplatek_stred: 50,
      mene_nez_dni: 13, poplatek_posledni: 10
    },
    gdpr: { doba_uchovani: "3 roky" }
  };

  // Automatické doplnění dnešního data
  if (!dynamicData.smlouva) dynamicData.smlouva = {};
  dynamicData.smlouva.datum = new Date().toLocaleDateString("cs-CZ");

  // Sloučení statických a dynamických dat
  const data = Object.assign({}, defaultData, dynamicData);

  const outputName = data.smlouva.cislo;
  const originalFile = DriveApp.getFileById(docId);
  const copyFile = originalFile.makeCopy(outputName + "_kopie", folder);
  const copyDoc = DocumentApp.openById(copyFile.getId());
  const body = copyDoc.getBody();

  // === Nahrazení placeholderů ===
  function processElement(element) {
    const type = element.getType();
    if (type === DocumentApp.ElementType.TEXT) {
      replaceTextInElement(element.asText(), data);
    } else if (element.getNumChildren) {
      const numChildren = element.getNumChildren();
      for (let i = 0; i < numChildren; i++) {
        processElement(element.getChild(i));
      }
    }
  }

  function replaceTextInElement(textElement, data) {
    const fullText = textElement.getText();
    const pattern = /{{\s*([\w.]+)\s*}}/g;
    let match, offset = 0;
    while ((match = pattern.exec(fullText)) !== null) {
      const start = match.index;
      const end = start + match[0].length;
      let hodnota;
      try {
        hodnota = match[1].split('.').reduce((acc, k) => acc[k], data);
        hodnota = hodnota.toString();
      } catch (e) {
        hodnota = `[CHYBÍ: ${match[1]}]`;
      }
      textElement.deleteText(start - offset, end - offset - 1);
      textElement.insertText(start - offset, hodnota);
      offset += match[0].length - hodnota.length;
    }
  }

  processElement(body);
  copyDoc.saveAndClose();

  const pdfBlob = copyFile.getAs(MimeType.PDF);
  const pdfFile = folder.createFile(pdfBlob).setName(outputName + "_navrh.pdf");
  Logger.log("✅ Hlavní PDF vytvořeno: " + pdfFile.getName());

  // Smazání kopie dokumentu po převodu
  copyFile.setTrashed(true);

  // === ➕ Automatické vytvoření Přílohy A ===
  doplnitJmennySeznam(data);
  doplnitPopisZajezduArozpisCen(data);
  doplnitFakturu(data);
}

function cestovniDokumenty(dynamicData) {
  const docId = "187_Uo18aHm_dit__6zJ9DmEzHw3BhxSnyIL9DKwNYmQ";
  const folderId = "1hkJwG7ISP8YEgShbWMUVJHbFiDhmz_qA";
  const folder = DriveApp.getFolderById(folderId);

  // Statická data
  const defaultData = {
    informace: { predem_dny: 7 },
    storno: {
      vice_nez_dni: 30, poplatek_vice: 75,
      do_dni: 29, do_dni2: 14, poplatek_stred: 50,
      mene_nez_dni: 13, poplatek_posledni: 10
    },
    gdpr: { doba_uchovani: "3 roky" }
  };

  // Automatické doplnění dnešního data
  if (!dynamicData.smlouva) dynamicData.smlouva = {};
  dynamicData.smlouva.datum = new Date().toLocaleDateString("cs-CZ");

  // Sloučení statických a dynamických dat
  const data = Object.assign({}, defaultData, dynamicData);

  const outputName =  "Cestovní dokumenty " + (data.smlouva.cislo || "Neznámé číslo");
  const originalFile = DriveApp.getFileById(docId);
  const copyFile = originalFile.makeCopy(outputName + "_kopie", folder);
  const copyDoc = DocumentApp.openById(copyFile.getId());
  const body = copyDoc.getBody();

  // === Nahrazení placeholderů včetně osob ===
  replacePlaceholdersInBody(body, data);

  copyDoc.saveAndClose();

  const pdfBlob = copyFile.getAs(MimeType.PDF);
  const pdfFile = folder.createFile(pdfBlob).setName(outputName + ".pdf");
  Logger.log("✅ Hlavní PDF vytvořeno: " + pdfFile.getName());

  // Smazání kopie dokumentu po převodu
  copyFile.setTrashed(true);
  return pdfFile.getId();

}

// === Funkce pro nahrazení placeholderů, včetně {{zajezd.osoby}} ===
function replacePlaceholdersInBody(body, data) {
  Logger.log("=== Spuštění nahrazování placeholderů ===");

  // === Nahrazení jednoduchých placeholderů ===
  function replaceRecursively(obj, prefix = "") {
    for (const key in obj) {
      const value = obj[key];
      if (typeof value === "object" && value !== null) {
        Logger.log(`Objekt nalezen: ${prefix + key}, pokračuji rekurzivně`);
        replaceRecursively(value, prefix + key + ".");
      } else {
        Logger.log(`Nahrazuji placeholder: {{${prefix + key}}} hodnotou: ${value}`);
        body.replaceText(`{{${prefix + key}}}`, value || "");
      }
    }
  }
  replaceRecursively(data);

  // === Nahrazení placeholderu pro osoby ===
  if (data.jmennyseznam && body.getText().includes("{{zajezd.osoby}}")) {
    Logger.log("Placeholder {{zajezd.osoby}} nalezen, začínám vkládat tabulky osob.");
    let textElement = body.findText("{{zajezd.osoby}}");

    while (textElement) {
      const placeholderText = textElement.getElement().asText();
      const fontFamily = placeholderText.getFontFamily(0) || "Arial"; // výchozí font, pokud není
      const fontSize = placeholderText.getFontSize(0) || 11;           // výchozí velikost, pokud není

      const parent = textElement.getElement().getParent();
      const parentIndex = body.getChildIndex(parent);
      Logger.log(`Vkládám osoby do indexu: ${parentIndex}`);

      Object.keys(data.jmennyseznam).forEach((pokojKey) => {
        Logger.log(`Zpracovávám pokoj: ${pokojKey}`);
        const osoby = data.jmennyseznam[pokojKey].map((o, idx) => ({
          poradi: idx + 1,
          osloveni: o.osloveni || "",
          jmeno: o.jmeno || "",
          prijmeni: o.prijmeni || "",
          datum: (s => { let m=s.match(/CZ-(\d{8})/); return m ? `${m[1].substring(0,2)}.${m[1].substring(2,4)}.${m[1].substring(4,8)}` : null; })(o.pas) || "",
          pas: o.pas || ""
        }));

        Logger.log(`Počet osob v pokoji: ${osoby.length}`);

        // Nadpis pokoje
        const cisloPokoj = parseInt(pokojKey.replace(/\D/g, ""), 10);
        const nadpis = body.insertParagraph(parentIndex, `Pokoj č. ${cisloPokoj + 1}:`)
          .setHeading(DocumentApp.ParagraphHeading.HEADING3)
          .setFontFamily(fontFamily)
          .setFontSize(fontSize);
        Logger.log(`Vložen nadpis: "${nadpis.getText()}"`);

        // Tabulka
        const tabulka = body.insertTable(parentIndex + 1);
        const headerRow = tabulka.appendTableRow();
        ["Poř. číslo", "Oslovení", "Jméno", "Příjmení", "Datum nar.", "Číslo pasu"]
          .forEach(h => headerRow.appendTableCell(h)
            .setBold(true)
            .setFontFamily(fontFamily)
            .setFontSize(fontSize));
        Logger.log("Vloženy hlavičky tabulky");

        osoby.forEach(o => {
          const row = tabulka.appendTableRow();
          [o.poradi.toString(), o.osloveni, o.jmeno, o.prijmeni, o.datum, o.pas]
            .forEach(text => row.appendTableCell(text)
              .setFontFamily(fontFamily)
              .setFontSize(fontSize));
          Logger.log(`Vložena osoba: ${o.osloveni} ${o.jmeno} ${o.prijmeni}`);
        });
      });

      // Odstranit placeholder
      textElement.getElement().asText().setText("");
      Logger.log("Odstraněn placeholder {{zajezd.osoby}}");

      // Hledání dalšího výskytu placeholderu
      textElement = body.findText("{{zajezd.osoby}}");
    }
  }

  Logger.log("=== Nahrazování dokončeno ===");
}

// Rekurzivně získá všechny textové elementy v dokumentu
function getAllTextElements(element) {
  const elements = [];
  const numChildren = element.getNumChildren ? element.getNumChildren() : 0;
  for (let i = 0; i < numChildren; i++) {
    const child = element.getChild(i);
    if (child.getType() === DocumentApp.ElementType.TEXT) {
      elements.push(child.asText());
    } else if (child.getNumChildren) {
      elements.push(...getAllTextElements(child));
    }
  }
  return elements;
}

function doplnitJmennySeznam(data) {
  const docId = "1dZiH9QQH954AzlgSbobwzDtZsrtw-ZZK8SoWeH4Px44";
  const folderId = "1Vu9yuAqqtr-GD8HmDG2Oy6gWNtW3vn8r";
  const folder = DriveApp.getFolderById(folderId);
  const outputName = (data.smlouva?.cislo || new Date().toISOString().slice(0,10) + "_Příloha_A");

  // 🟦 1️⃣ Kopie šablony
  const originalFile = DriveApp.getFileById(docId);
  const copyFile = originalFile.makeCopy(outputName, folder);
  DriveApp.getRootFolder().removeFile(copyFile);

  const copyDoc = DocumentApp.openById(copyFile.getId());
  const body = copyDoc.getBody();

  // 🟦 2️⃣ Nahrazení placeholderů
  function processElement(element) {
    const type = element.getType();
    if (type === DocumentApp.ElementType.TEXT) {
      replaceTextInElement(element.asText(), data);
    } else if (element.getNumChildren) {
      for (let i = 0; i < element.getNumChildren(); i++) {
        processElement(element.getChild(i));
      }
    }
  }

  function replaceTextInElement(textElement, data) {
    const fullText = textElement.getText();
    const pattern = /{{\s*([\w.]+)\s*}}/g;
    let match, offset = 0;
    while ((match = pattern.exec(fullText)) !== null) {
      const start = match.index;
      const end = start + match[0].length;
      let hodnota;
      try {
        hodnota = match[1].split('.').reduce((acc, k) => acc[k], data);
        hodnota = hodnota.toString();
      } catch (e) {
        hodnota = `[CHYBÍ: ${match[1]}]`;
      }
      textElement.deleteText(start - offset, end - offset - 1);
      textElement.insertText(start - offset, hodnota);
      offset += match[0].length - hodnota.length;
    }
  }

  processElement(body);

  // 🟦 3️⃣ Doplnění jmenného seznamu
  if (data.jmennyseznam && Array.isArray(data.jmennyseznam)) {
    data.jmennyseznam.forEach((pokojData) => {
      body.appendParagraph(`Pokoj č. ${pokojData.pokoj}:`).setHeading(DocumentApp.ParagraphHeading.HEADING3);

      const tabulka = body.appendTable([
        ["Poř. číslo", "Oslovení", "Jméno", "Příjmení", "Datum nar.", "Číslo pasu"]
      ]);

      const hlavicka = tabulka.getRow(0);
      const sirky = [40, 70, 80, 100, 90, 100];
      for (let i = 0; i < sirky.length; i++) {
        hlavicka.getCell(i).getChild(0).asText().setBold(true);
        hlavicka.getCell(i).setWidth(sirky[i]);
      }

      pokojData.osoby.forEach((osoba) => {
        const row = tabulka.appendTableRow();
        row.appendTableCell(osoba.poradi?.toString() || "");
        row.appendTableCell(osoba.osloveni || "");
        row.appendTableCell(osoba.jmeno || "");
        row.appendTableCell(osoba.prijmeni || "");
        row.appendTableCell(osoba.datum || "");
        row.appendTableCell(osoba.pas || "");
      });

      body.appendParagraph("");
    });
  }

  // 🟦 4️⃣ PDF a úklid
  copyDoc.saveAndClose();
  const pdfBlob = copyFile.getAs(MimeType.PDF);
  const pdfFile = folder.createFile(pdfBlob).setName(outputName + "_A.pdf");
  Logger.log("✅ Příloha A vytvořena: " + pdfFile.getName());
  copyFile.setTrashed(true);
}

function doplnitPopisZajezduArozpisCen(dynamicData) {
  const docId = "1gPa42L8_OK7MIplfaDZ8NrVhbk6rXGNXTu_Zi5GkTmk";
  const folderId = "1Vu9yuAqqtr-GD8HmDG2Oy6gWNtW3vn8r";
  const folder = DriveApp.getFolderById(folderId);

  const defaultData = {};

  if (!dynamicData.smlouva) dynamicData.smlouva = {};
  dynamicData.smlouva.datum = new Date().toLocaleDateString("cs-CZ");

  const data = Object.assign({}, defaultData, dynamicData);

  const outputName = data.smlouva.cislo;
  const originalFile = DriveApp.getFileById(docId);
  const copyFile = originalFile.makeCopy(outputName + "_kopie", folder);
  const copyDoc = DocumentApp.openById(copyFile.getId());
  const body = copyDoc.getBody();

  function processElement(element) {
    const type = element.getType();
    if (type === DocumentApp.ElementType.TEXT) {
      replaceTextInElement(element.asText(), data);
    } else if (element.getNumChildren) {
      const numChildren = element.getNumChildren();
      for (let i = 0; i < numChildren; i++) {
        processElement(element.getChild(i));
      }
    }
  }

  function replaceTextInElement(textElement, data) {
    const fullText = textElement.getText();
    const pattern = /{{\s*([\w.]+)\s*}}/g;
    let match, offset = 0;
    while ((match = pattern.exec(fullText)) !== null) {
      const start = match.index;
      const end = start + match[0].length;
      let hodnota;
      try {
        hodnota = match[1].split('.').reduce((acc, k) => acc[k], data);
        hodnota = hodnota.toString();
      } catch (e) {
        hodnota = `[CHYBÍ: ${match[1]}]`;
      }
      textElement.deleteText(start - offset, end - offset - 1);
      textElement.insertText(start - offset, hodnota);
      offset += match[0].length - hodnota.length;
    }
  }
  
  function vlozitTabulkuCen(body, placeholder, cenaData) {
    const searchResult = body.findText(`{{\\s*${placeholder}\\s*}}`);
    if (!searchResult) return;

    const element = searchResult.getElement();
    const text = element.asText();
    const parent = element.getParent();
    const index = body.getChildIndex(parent);

    // Odstranění placeholderu
    text.deleteText(0, text.getText().length - 1);

    const radky = [];
    radky.push(["Položka", "Cena za osobu (MiKa)", "Počet osob/absolvací", "Celkem (MiKa)"]);

    let celkemSum = 0;

    for (const key in cenaData) {
      const polozka = cenaData[key];
      if (!polozka || typeof polozka !== "object") continue;

      const nazev = polozka.nazev || key;
      const jednotne = polozka.jednotne || 0;
      const pocet = polozka.absolvaci || 1;
      const celkem = polozka.celkem != null ? polozka.celkem : jednotne * pocet;

      celkemSum += Number(celkem);

      radky.push([nazev, jednotne.toString(), pocet.toString(), celkem.toString()]);
    }

    radky.push(["Celkem (MiKa)", "", "", Number(celkemSum).toFixed(2)]);

    // Vložení tabulky
    const table = body.insertTable(index + 1, radky);

    // Nastavení fontu Arial pro všechny buňky
    for (let r = 0; r < table.getNumRows(); r++) {
      const row = table.getRow(r);
      for (let c = 0; c < row.getNumCells(); c++) {
        const cell = row.getCell(c);
        const textElement = cell.editAsText();
        textElement.setFontFamily("Arial");

        // Poslední řádek tučně
        if (r === table.getNumRows() - 1) {
          textElement.setBold(true);
        }
      }
    }
  }




  vlozitTabulkuCen(body, "tabulka", dynamicData.cena);
  processElement(body);

  copyDoc.saveAndClose();


  const pdfBlob = copyFile.getAs(MimeType.PDF);
  const pdfFile = folder.createFile(pdfBlob).setName(outputName + "_B.pdf");
  Logger.log("✅ Příloha B vytvořena: " + pdfFile.getName());

  copyFile.setTrashed(true);
}

function doplnitFakturu(dynamicData) {
  const docId = "1L5mTZHHjQlbd_3secl4UO6oeBT8HB7S_p8oDgPixgSo";
  const folderId = "1Vu9yuAqqtr-GD8HmDG2Oy6gWNtW3vn8r";
  const folder = DriveApp.getFolderById(folderId);

  const defaultData = {};

  if (!dynamicData.smlouva) dynamicData.smlouva = {};
  dynamicData.smlouva.datum = new Date().toLocaleDateString("cs-CZ");

  const data = Object.assign({}, defaultData, dynamicData);

  const outputName = data.smlouva.cislo;
  const originalFile = DriveApp.getFileById(docId);
  const copyFile = originalFile.makeCopy(outputName + "_kopie", folder);
  const copyDoc = DocumentApp.openById(copyFile.getId());
  const body = copyDoc.getBody();

  function processElement(element) {
    const type = element.getType();
    if (type === DocumentApp.ElementType.TEXT) {
      replaceTextInElement(element.asText(), data);
    } else if (element.getNumChildren) {
      const numChildren = element.getNumChildren();
      for (let i = 0; i < numChildren; i++) {
        processElement(element.getChild(i));
      }
    }
  }

  function replaceTextInElement(textElement, data) {
    const fullText = textElement.getText();
    const pattern = /{{\s*([\w.]+)\s*}}/g;
    let match, offset = 0;
    while ((match = pattern.exec(fullText)) !== null) {
      const start = match.index;
      const end = start + match[0].length;
      let hodnota;
      try {
        hodnota = match[1].split('.').reduce((acc, k) => acc[k], data);
        hodnota = hodnota.toString();
      } catch (e) {
        hodnota = `[CHYBÍ: ${match[1]}]`;
      }
      textElement.deleteText(start - offset, end - offset - 1);
      textElement.insertText(start - offset, hodnota);
      offset += match[0].length - hodnota.length;
    }
  }
  
  function vlozitTabulkuCen(body, placeholder, cenaData) {
    const searchResult = body.findText(`{{\\s*${placeholder}\\s*}}`);
    if (!searchResult) return;

    const element = searchResult.getElement();
    const text = element.asText();
    const parent = element.getParent();
    const index = body.getChildIndex(parent);

    // Odstranění placeholderu
    text.deleteText(0, text.getText().length - 1);

    const radky = [];
    radky.push(["Položka", "Cena za osobu (MiKa)", "Počet osob/absolvací", "Celkem (MiKa)"]);

    let celkemSum = 0;

    for (const key in cenaData) {
      const polozka = cenaData[key];
      if (!polozka || typeof polozka !== "object") continue;

      const nazev = polozka.nazev || key;
      const jednotne = polozka.jednotne || 0;
      const pocet = polozka.absolvaci || 1;
      const celkem = polozka.celkem != null ? polozka.celkem : jednotne * pocet;

      celkemSum += Number(celkem);

      radky.push([nazev, jednotne.toString(), pocet.toString(), celkem.toString()]);
    }

    radky.push(["Celkem (MiKa)", "", "", celkemSum.toString()]);

    // Vložení tabulky
    const table = body.insertTable(index + 1, radky);

    // Nastavení fontu Arial pro všechny buňky
    for (let r = 0; r < table.getNumRows(); r++) {
      const row = table.getRow(r);
      for (let c = 0; c < row.getNumCells(); c++) {
        const cell = row.getCell(c);
        const textElement = cell.editAsText();
        textElement.setFontFamily("Arial");

        // Poslední řádek tučně
        if (r === table.getNumRows() - 1) {
          textElement.setBold(true);
        }
      }
    }
  }

  function vlozitPlatebniInformace(body, placeholder, data) {
    const searchResult = body.findText(`{{\\s*${placeholder}\\s*}}`);
    if (!searchResult) return;

    const element = searchResult.getElement();
    const text = element.asText();
    const parent = element.getParent();
    const index = body.getChildIndex(parent);

    // Odstranění placeholderu
    text.deleteText(0, text.getText().length - 1);

    // Načtení dat
    const zalohaProcent = data.zaloha_procent ?? "";
    const zalohaCastka = data.zaloha_castka ?? "";
    const zalohaSplatnost = data.zaloha_splatnost ?? "";
    const doplatekCastka = data.doplatek_castka ?? "";
    const doplatekSplatnost = data.doplatek_splatnost ?? "";

    // Nadpis sekce
    const nadpis = body.insertParagraph(index + 1, "Platební podmínky");
    nadpis.setFontFamily("Arial").setBold(true).setFontSize(12);

    // Definice tabulky
    const radky = [
      ["Typ platby", "Procent", "Částka (MiKa)", "Splatnost"],
      ["Záloha", zalohaProcent + " %", zalohaCastka.toString(), zalohaSplatnost.toString()],
      ["Doplatek", "", doplatekCastka.toString(), doplatekSplatnost.toString()],
    ];

    // Vložení tabulky
    const table = body.insertTable(index + 2, radky);

    // Stylování
    for (let r = 0; r < table.getNumRows(); r++) {
      const row = table.getRow(r);
      for (let c = 0; c < row.getNumCells(); c++) {
        const cell = row.getCell(c);
        const textElement = cell.editAsText();
        textElement.setFontFamily("Arial").setFontSize(11);

        // První řádek (hlavička) tučně
        if (r === 0) {
          textElement.setBold(true);
        }
      }
    }
  }






  vlozitTabulkuCen(body, "tabulka", dynamicData.cena);
  vlozitPlatebniInformace(body, "tabulka_zaplaceni", dynamicData.platby);
  processElement(body);

  copyDoc.saveAndClose();


  const pdfBlob = copyFile.getAs(MimeType.PDF);
  const pdfFile = folder.createFile(pdfBlob).setName(outputName + "_C.pdf");
  Logger.log("✅ Příloha C vytvořena: " + pdfFile.getName());

  copyFile.setTrashed(true);
}







/** Tokeny */







/**
 * Smaže všechny tokeny jimž již vypršela platnost
 */
function removeAllExpiredTokens() {
  const userProperties = PropertiesService.getUserProperties();
  const allKeys = userProperties.getKeys();
  const now = new Date();

  allKeys.forEach(key => {
    const raw = userProperties.getProperty(key);
    if (!raw) return;

    let tokens = JSON.parse(raw);
    if (!Array.isArray(tokens)) {
      tokens = [tokens];
    }

    // Zachováme jen tokeny, které ještě nevypršely
    const validTokens = tokens.filter(tokenObj => {
      return new Date(tokenObj.expires) > now;
    });

    if (validTokens.length > 0) {
      userProperties.setProperty(key, JSON.stringify(validTokens));
    } else {
      // Pokud žádný token nezůstal, smažeme vlastnost úplně
      userProperties.deleteProperty(key);
    }
  });
}



/**
 * Uloží token pro konkrétního uživatele a službu s expirací v minutách
 */
function saveTokenWithExpiry(username, service, token, expiresInMinutes = 60) {
  const userProperties = PropertiesService.getUserProperties();
  const key = username + "_" + service;
  const expiryDate = new Date(Date.now() + expiresInMinutes * 60000).toISOString();
  const tokenObj = { value: token, expires: expiryDate };

  let tokens = [];
  const raw = userProperties.getProperty(key);
  if (raw) {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      tokens = parsed;
    } else {
      tokens = [parsed];
    }
  }

  tokens.push(tokenObj);
  userProperties.setProperty(key, JSON.stringify(tokens));

  return tokenObj.value;
}


/**
 * Vrátí token, pokud je platný, a zároveň prodlouží jeho platnost
 */
function getTokenAndRefresh(username, service, extendMinutes = 60) {
  const userProperties = PropertiesService.getUserProperties();
  const key = username + "_" + service;
  const raw = userProperties.getProperty(key);
  if (!raw) return null;

  let tokens = JSON.parse(raw);
  const now = new Date();

  // najdeme první platný token
  for (let i = 0; i < tokens.length; i++) {
    const tokenObj = tokens[i];
    if (now <= new Date(tokenObj.expires)) {
      // prodloužení expirace
      tokenObj.expires = new Date(now.getTime() + extendMinutes * 60000).toISOString();
      userProperties.setProperty(key, JSON.stringify(tokens));
      return tokenObj.value;
    }
  }

  return null; // žádný token není platný
}

/**
 * Obnoví token, pokud vypršel nebo chcete explicitně nový token
 */
function refreshToken(username, service, expiresInMinutes = 60) {
  const newToken = Utilities.getUuid(); // generování nového tokenu
  saveTokenWithExpiry(username, service, newToken, expiresInMinutes);
  return newToken;
}

/**
 * Vrátí všechny tokeny konkrétního uživatele jako objekt
 */
function getAllTokens(username) {
  const userProperties = PropertiesService.getUserProperties();
  const allKeys = userProperties.getProperties();
  const userTokens = {};

  for (const key in allKeys) {
    if (key.startsWith(username + "_")) {
      const serviceName = key.replace(username + "_", "");
      userTokens[serviceName] = JSON.parse(allKeys[key]); // teď pole tokenů
    }
  }
  return userTokens;
}

/**
 * Smazání tokenu konkrétního uživatele a služby
 */
function deleteToken(username, service, tokenValue = null) {
  const userProperties = PropertiesService.getUserProperties();
  const key = username + "_" + service;
  const raw = userProperties.getProperty(key);
  if (!raw) return;

  if (!tokenValue) {
    // smaže všechny tokeny pro službu
    userProperties.deleteProperty(key);
    return;
  }

  // smaže jen konkrétní token
  let tokens = JSON.parse(raw);
  tokens = tokens.filter(t => t.value !== tokenValue);
  if (tokens.length > 0) {
    userProperties.setProperty(key, JSON.stringify(tokens));
  } else {
    userProperties.deleteProperty(key);
  }
}

/**
 * Najde token a vrátí jeho vlastníka (username) a službu
 */
function refreshTokenByValue(tokenValue, extendMinutes = 60) {
  const userProperties = PropertiesService.getUserProperties();
  const allKeys = userProperties.getProperties();
  const now = new Date();

  for (const key in allKeys) {
    let tokens;
    try {
      tokens = JSON.parse(allKeys[key]);
    } catch (e) {
      continue; // pokud JSON není platný, přeskočíme
    }

    for (let i = 0; i < tokens.length; i++) {
      const tokenObj = tokens[i];
      if (tokenObj.value === tokenValue) {
        // prodloužení expirace
        tokenObj.expires = new Date(now.getTime() + extendMinutes * 60000).toISOString();
        // uložíme zpět do UserProperties
        userProperties.setProperty(key, JSON.stringify(tokens));
        const username = key.split("_")[0];
        const service = key.substring(username.length + 1);
        return {
          username,
          service,
          token: tokenObj.value,
          expires: tokenObj.expires
        };
      }
    }
  }

  return null; // token nenalezen
}

/**
 * Najde token a vrátí jeho vlastníka (username) a službu, neprodlouží
 */
function getTokenByValue(tokenValue) {
  const userProperties = PropertiesService.getUserProperties();
  const allKeys = userProperties.getProperties();

  for (const key in allKeys) {
    let tokens;
    try {
      tokens = JSON.parse(allKeys[key]);
    } catch (e) {
      continue; // pokud JSON není platný, přeskočíme
    }

    for (let i = 0; i < tokens.length; i++) {
      const tokenObj = tokens[i];
      if (tokenObj.value === tokenValue) {
        const username = key.split("_")[0];
        const service = key.substring(username.length + 1);
        return {
          username,
          service,
          token: tokenObj.value,
          expires: tokenObj.expires
        };
      }
    }
  }

  return null; // token nenalezen
}

/** 
 * Načte token podle jeho hodnoty a zároveň prodlouží jeho platnost
 */
function getTokenByValueAndRefresh(tokenValue, extendMinutes = 60) {
  return refreshTokenByValue(tokenValue, extendMinutes);
}

/** 
 * Načte token podle jeho hodnoty a smaže ho
 */
function getTokenByValueAndDelete(tokenValue) {
  const userProperties = PropertiesService.getUserProperties();
  const allKeys = userProperties.getProperties();

  for (const key in allKeys) {
    let tokens;
    try {
      tokens = JSON.parse(allKeys[key]);
    } catch (e) {
      continue;
    }

    for (let i = 0; i < tokens.length; i++) {
      const tokenObj = tokens[i];
      if (tokenObj.value === tokenValue) {
        const username = key.split("_")[0];
        const service = key.substring(username.length + 1);
        // smažeme konkrétní token
        tokens.splice(i, 1);
        if (tokens.length > 0) {
          userProperties.setProperty(key, JSON.stringify(tokens));
        } else {
          userProperties.deleteProperty(key);
        }
        return { username, service, token: tokenObj.value };
      }
    }
  }

  return null;
}

/**
 * Načte všechny tokeny konkrétního uživatele a prodlouží jejich platnost
 */
function getTokensByUsernameAndRefresh(username, extendMinutes = 60) {
  const userProperties = PropertiesService.getUserProperties();
  const allKeys = userProperties.getProperties();
  const now = new Date();
  const refreshedTokens = {};

  for (const key in allKeys) {
    if (key.startsWith(username + "_")) {
      let tokens;
      try {
        tokens = JSON.parse(allKeys[key]);
      } catch (e) {
        continue;
      }

      tokens.forEach(t => {
        if (new Date(t.expires) > now) {
          t.expires = new Date(now.getTime() + extendMinutes * 60000).toISOString();
        }
      });

      userProperties.setProperty(key, JSON.stringify(tokens));
      const service = key.substring(username.length + 1);
      refreshedTokens[service] = tokens;
    }
  }

  return refreshedTokens;
}

/**
 * Načte všechny tokeny konkrétního uživatele a smaže je
 */
function getTokensByUsernameAndDelete(username) {
  const userProperties = PropertiesService.getUserProperties();
  const allKeys = userProperties.getProperties();
  const deletedTokens = {};

  for (const key in allKeys) {
    if (key.startsWith(username + "_")) {
      deletedTokens[key.substring(username.length + 1)] = JSON.parse(allKeys[key]);
      userProperties.deleteProperty(key);
    }
  }

  return deletedTokens;
}

/**
 * Smaže všechny tokeny všech uživatelů
 */
function deleteAllTokens() {
  const userProperties = PropertiesService.getUserProperties();
  const allKeys = Object.keys(userProperties.getProperties());
  allKeys.forEach(key => userProperties.deleteProperty(key));
}

/**
 * Načte úplně všechny tokeny všech uživatelů
 */
function getAllTokensGlobal() {
  const userProperties = PropertiesService.getUserProperties();
  const allKeys = userProperties.getProperties();
  const allTokens = {};

  for (const key in allKeys) {
    allTokens[key] = JSON.parse(allKeys[key]);
  }

  return allTokens;
}