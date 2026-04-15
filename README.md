# Smile Art — ortodoncie České Budějovice

Web pro ortodontickou kliniku Smile Art s.r.o. v Českých Budějovicích. Invisalign Diamond Provider, 15 let zkušeností, 14členný tým.

**Live web:** https://smile-art.cz (po nasazení)
**Klient:** Smile Art s.r.o., IČ 28140915
**Vede:** MUDr. Ladislav Bernát, Ph.D.

## Tech stack
- HTML5 / CSS3 / vanilla JS (žádné frameworky, žádné buildy)
- Responsive mobile-first (breakpointy 1100 / 900 / 560 / 380 px)
- Self-hosted vlastní design system přes CSS custom properties
- Google Fonts: Plus Jakarta Sans
- Deploy: Netlify (auto-deploy z main branch)

## Struktura
```
smile-art-web/
├─ index.html              # Úvod / Hero
├─ neviditelna-rovnatka.html
├─ rovnatka-ceny.html      # Ceník Damon + Invisalign
├─ lecba.html              # Průběh léčby
├─ o-nas.html              # Klinika + tým
├─ kariera.html            # Nabídka práce
├─ kontakt.html            # Objednání + mapa + formulář
├─ css/style.css           # Design system + všechny styly
├─ js/main.js              # Nav, reveal, countery, cookies, FAQ
├─ fotky/                  # Obrázky (logo, hero, detaily)
├─ sitemap.xml
├─ robots.txt
├─ netlify.toml            # Netlify config + security headers
├─ _redirects
└─ README.md
```

## Design system
- **Barvy**: bílá + tyrkysová/teal (`#0ea5a5`) + zlaté akcenty (`#c89b3c`)
- **Font**: Plus Jakarta Sans (400–800)
- **Radius**: sm 8 / md 14 / lg 24 / xl 32 px
- **Spacing**: 8/16/24/32/48/64/96/128 px přes CSS vars

## Responsivní breakpointy
- `≤ 1100px` — tablet landscape, zmenšení gapů
- `≤ 900px`  — tablet, mobile menu + single column hero
- `≤ 560px`  — mobile, full-width CTA, zmenšené typo
- `≤ 380px`  — malé telefony

## Features
- ✅ Fixed glassmorphism navbar s scroll state
- ✅ Mobile menu s backdrop a ESC close
- ✅ Hero s 3D tilt image + CTA
- ✅ Animované countery (15 let, 13 751+ pacientů)
- ✅ Scroll reveal animations (IntersectionObserver)
- ✅ Service cards s gradient hover
- ✅ Feature split sections
- ✅ Process steps
- ✅ Pricing cards (highlighted "nejoblíbenější")
- ✅ FAQ accordion (single-open)
- ✅ Team grid s lead card pro Dr. Bernáta
- ✅ Contact formulář (Netlify Forms + honeypot)
- ✅ OpenStreetMap embed
- ✅ GDPR cookie banner
- ✅ SEO: meta, OG, JSON-LD (Dentist schema), sitemap, robots
- ✅ Security headers (HSTS, X-Frame, CSP-like)
- ✅ Prefers-reduced-motion support

## SEO
- Schema.org: `Dentist` s plnou adresou, opening hours, geo
- Open Graph + Twitter Card na všech stránkách
- Kanonické URL
- Sitemap.xml se všemi 7 stránkami
- Meta description + keywords pro každou stránku

## Deploy
```bash
cd ~/Desktop/webzitra-klienti/smile-art-web
git add -A
git commit -m "Initial Smile Art web"
# vytvořit repo na github.com/webzitra/smile-art-web
git remote add origin git@github.com:webzitra/smile-art-web.git
git push -u origin main
```
Pak v Netlify připojit repo → auto-deploy při každém pushi.

## TODO před spuštěním
- [ ] Nahradit placeholder avatar iniciály reálnými fotkami týmu (z ordinace)
- [ ] Požádat klienta o kvalitní fotky ordinace + týmu (min 1200px, WebP)
- [ ] Doplnit přesné GPS souřadnice v JSON-LD a mapě
- [ ] Propojit Netlify Form na email kliniky
- [ ] Nastavit doménu smile-art.cz v Netlify (DNS + SSL)
- [ ] Google Analytics / Plausible (pokud klient bude chtít)
- [ ] Doplnit og-image.jpg 1200×630 pro sociální sítě

## Kontakt
- Telefon: +420 725 542 272
- Email: ortodoncie@smile-art.cz
- IG: [@ortodoncie_smileart](https://www.instagram.com/ortodoncie_smileart/)
- Adresa: Senovážné náměstí 1736, 4. patro, 370 01 České Budějovice

---
Vytvořil [WebZítra](https://webzitra.cz) • 2026
