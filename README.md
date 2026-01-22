# 🛡️ Hack & Learn: Web Edition

> **Od Requestu do Raportu.** Interaktywny kurs dla osób zainteresowanych bezpieczeństwem aplikacji webowych.

![Project Goal](https://img.shields.io/badge/Goal-Education-success)
![Technology](https://img.shields.io/badge/Stack-HTML%20%2F%20CSS%20%2F%20JS-blue)
![Focus](https://img.shields.io/badge/Focus-Purple%20Team-purple)
[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC_BY--NC--SA_4.0-green.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)


---

## 🎯 O Projekcie

**Hack & Learn: Web Edition** to nie jest kolejny zbiór linków do narzędzi. To interaktywny przewodnik, który wypełnia lukę między suchą teorią, a praktycznymi laboratoriami typu PortSwigger czy HackTheBox.

Projekt został stworzony, aby nauczyć **procesu myślowego** profesjonalnego audytora bezpieczeństwa. Zamiast pokazać tylko "jak wpisać exploit", ten kurs uczy:
*   Gdzie szukać błędów i dlaczego?
*   Jak ocenić ryzyko biznesowe (CVSS)?
*   Jak napisać profesjonalny raport?
*   Jak zabezpieczyć aplikację (Blue Team)?

Aplikacja jest w pełni **statyczna** (Client-Side), działa w przeglądarce i posiada system zapisu postępów (LocalStorage).

## 🚀 Demo

👉 **[Uruchom Kurs Online](https://TWOJ-LOGIN.github.io/NAZWA-REPOZYTORIUM/)**  
*(Link będzie aktywny po włączeniu GitHub Pages w ustawieniach repozytorium)*

---

## 📚 Program Szkolenia 

Kurs składa się z **28 lekcji** podzielonych na **6 modułów**, zakończonych egzaminami praktycznymi ("Boss Battles").

### 🟦 Moduł 1: Fundamenty & Top 10
Solidne podstawy protokołu HTTP i najczęstsze podatności.
*   Metody i Statusy HTTP
*   Cookies, Sesje i Nagłówki Bezpieczeństwa
*   SQL Injection, XSS, SSRF, JWT, IDOR

### 🟩 Moduł 2: System & Files
Ataki celujące w serwer i system operacyjny.
*   OS Command Injection (RCE)
*   Path Traversal & LFI (Log Poisoning)
*   File Upload Vulnerabilities (Webshell)

### 🟪 Moduł 3: Modern Web
Specyfika nowoczesnych aplikacji (React/Vue/API).
*   API Security (Mass Assignment, BOLA)
*   SPA Pitfalls (XSS w React, Token Storage)
*   XML & XXE Injection

### 🟪 Moduł 4: Logic & Strategy
Błędy, których nie wykrywają automatyczne skanery.
*   Business Logic Flaws (Omijanie płatności)
*   Race Conditions (TOCTOU)
*   HTTP Request Smuggling

### 🟦 Moduł 5: The Professional Audit
To, co odróżnia skrypciarza od inżyniera.
*   **Symulacje Decyzyjne (Micro-Labs):** Analiza kodu i requestów.
*   **Metodologia:** Scope, Legalność, Rekonesans (OSINT).
*   **Raportowanie:** Pisanie findingów, ocena CVSS, język biznesowy.

### 🟦 Moduł 6: Blue Team & Hardening
Jak naprawić to, co zepsuliśmy.
*   Secure Architecture (CSP, HSTS Preload)
*   Input Validation & Sanitization (Allowlist vs Blocklist)
*   WAF & Monitoring
*   Supply Chain Security (npm audit, SBOM)

---

## 🛠️ Technologie

Projekt został zbudowany w duchu "Zero Dependencies". Czysty kod, wysoka wydajność, brak frameworków.

*   **HTML5** – Semantyczna struktura.
*   **CSS3** – Autorski styl "Cyberpunk Terminal" (CSS Variables, Flexbox/Grid, Animations).
*   **Vanilla JavaScript** – Logika quizów, routing, obsługa LocalStorage i DOM Manipulation.

## 💿 Instalacja lokalna

Jeśli chcesz uruchomić projekt na własnym komputerze:

1.  Sklonuj repozytorium:
    ```bash
    git clone https://github.com/TWOJ-LOGIN/NAZWA-REPOZYTORIUM.git
    ```
2.  Wejdź do katalogu:
    ```bash
    cd NAZWA-REPOZYTORIUM
    ```
3.  Otwórz plik `index.html` w dowolnej przeglądarce. Nie jest wymagany żaden serwer backendowy (PHP/Node/Python).

---

## 💡 Dlaczego to stworzyłam?

Utrwalając sobie wiedzę z zakresu bezpieczeństwa aplikacji webowych zauważyłam, że wiele materiałów skupia się wyłącznie na narzędziach (Kali Linux, Metasploit). Brakowało mi źródła, które uczyłoby **strategii audytu** i **myślenia analitycznego** przed uruchomieniem skanera. Poprosiłam Gemini o zadawanie mi pytań i wyjaśnianie niektórych zagadnień. Było to na tyle fajne, że postanowiłam na tej bazie zrobić niniejszy kurs.

---

## ⚠️ Disclaimer

*Informacje zawarte w tym projekcie służą wyłącznie celom edukacyjnym. Autorka nie ponosi odpowiedzialności za niewłaściwe wykorzystanie przedstawionych technik. Testuj tylko systemy, do których masz pisemne upoważnienie.*

---

## 🔒 Decyzje Architektoniczne i Model Zagrożeń

Projekt został zaprojektowany jako **statyczna aplikacja (Client-Side Only)** hostowana na GitHub Pages. Ze względu na ten model architektoniczny, podjęto świadome decyzje dotyczące bezpieczeństwa (Risk Acceptance):

1.  **Logika po stronie klienta:** Weryfikacja odpowiedzi quizu odbywa się w przeglądarce (`quiz.js`). Użytkownik techniczny może "oszukać" system edytując zmienne lub LocalStorage.
    *   *Uzasadnienie:* Aplikacja służy do samo-nauki, nie przetwarza danych wrażliwych ani nie prowadzi rankingów. Wdrożenie backendu do weryfikacji było zbędne z punktu widzenia celu biznesowego.
2.  **Polityka CSP (Content Security Policy):** Zastosowano dyrektywę `'unsafe-inline'` dla skryptów i stylów.
    *   *Uzasadnienie:* Ze względu na edukacyjny charakter projektu i brak zewnętrznych zależności (npm), ryzyko XSS jest zminimalizowane. Pozwoliło to na uproszczenie struktury plików bez konieczności wdrażania mechanizmu Nonce.

**Aplikacja nie przetwarza, nie składuje ani nie przesyła żadnych danych użytkowników.**

---

## ⚖️ Licencja i Prawa Autorskie

Ten projekt jest udostępniony na licencji **Creative Commons Uznanie autorstwa-Użycie niekomercyjne-Na tych samych warunkach 4.0 Międzynarodowe (CC BY-NC-SA 4.0)**.

✅ **Wolno:**
*   Korzystać z kursu za darmo.
*   Udostępniać go dalej (z podaniem autorki).
*   Modyfikować go na własny użytek lub w celu rozwoju projektu (Open Source).

❌ **Zabrania się:**
*   Sprzedawania kursu lub jego fragmentów.
*   Używania materiałów w płatnych szkoleniach, bootcampach, czy na platformach edukacyjnych bez pisemnej zgody autora.
*   Usuwania informacji o autorze ze stopki.

Pełny tekst licencji znajduje się w pliku [LICENSE](LICENSE).

**Autorka:** AnnaWiktoria  
