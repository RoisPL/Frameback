Skrypt nakłada obraz z kamery na tarczę w interfejsie Autodarts. Widać na żywo wpadające lotki i ich wyciąganie, a zakończenie lega można obejrzeć ponownie i zapisać jako film.

Można korzystać ze standardowych kamer zestawu Autodarts, jeśli wybrana kamera jest dostępna dla przeglądarki. Dodatkowa kamera internetowa nie jest obowiązkowa, ale polecam osobną, skierowaną na tarczę — pozwala uzyskać lepszą jakość obrazu i korzystniejszy kąt widzenia.

Co potrafi wersja 1.0?

- Podgląd tarczy na żywo z wybranej kamery.
- Dopasowanie obrazu do tarczy i prostowanie perspektywy.
- Automatyczny zoom na pole, którym możesz zamknąć lega jedną lotką.
- Automatyczne powtórki po wygranym legu oraz powtórka ostatnich chwil na żądanie.
- Zmiana tempa odtwarzania, pauza, przeglądanie klatka po klatce i zapętlenie.
- Zapis powtórek w MP4 lub WebM.
- Obsługa gry przy wspólnej tarczy i gry zdalnej.
- Profile ustawień oraz interfejs po polsku i angielsku.

Jak zacząć?

1. Zainstaluj Tampermonkey w przeglądarce.
2. Utwórz nowy skrypt, usuń przykładową treść i wklej cały kod Frameback z pliku TXT lub ".user.js". Zapisz i odśwież Autodarts.
3. Zezwól na dostęp do kamery.
4. Otwórz Ustawienia → Obraz tarczy, wybierz kamerę i uruchom dopasowanie.
5. Zatrzymaj obraz i zaznacz pięć punktów: środek bulla, a następnie środek zewnętrznej krawędzi pól podwójnych D20, D6, D3 i D11, w tej kolejności. Sprawdź podgląd i zastosuj.

Przy aktualizacji podmień kod istniejącego skryptu. Uruchamiaj tylko jedną kopię Frameback.

Mała pastylka z ikoną kamery rozwija panel najważniejszych funkcji: widoczności obrazu, nagrywania, powtórek, zapisu i ustawień. Po pięciu sekundach bezczynności panel ponownie się zwija.

Przełącznik trybu gry pozwala wybrać Automatycznie, Przy tarczy lub Gra zdalna. Jeśli skrypt zapyta, którym graczem jesteś, wybierz siebie.

Ustawienia są podzielone na cztery sekcje:

- Obraz tarczy — kamera, dopasowanie, margines na numery i ręczne korekty.
- Automatyczny zoom — siła przybliżenia, próg punktowy i animacja.
- Powtórki — nagrywanie, długość, tempo, format i miejsce zapisu.
- Preferencje — język, tryb gry, rozpoznawanie gracza, profile i kopia ustawień.

Zmiany zapisują się automatycznie. Przy formacie Automatycznie skrypt używa MP4, a gdy jest niedostępny — WebM. Po uruchomieniu nagrywania lub zmianie formatu trzeba chwilę poczekać, aż zbierze się materiał do powtórki.

Najważniejsze skróty

- J — ustawienia.
- R — odtwórz ostatnie chwile.
- Shift + R — zapisz ostatnie chwile bez odtwarzania.
- K — pokaż/ukryj obraz kamery.
- Shift + N — włącz/wyłącz nagrywanie.
- Podczas powtórki: Spacja — pauza, ← / → — klatka po klatce, S — zapis, Esc — zamknięcie.

Wersja 1.0 korzysta z jednej wybranej kamery. Trzy ujęcia jednocześnie i automatyczny wybór kamery to pomysły na dalszy rozwój, a nie obecne funkcje.

Obraz jest przetwarzany lokalnie, bez nagrywania mikrofonu. Publiczna wersja nie zbiera dzienników diagnostycznych ani nie wysyła raportów. Ustawienia pozostają w przeglądarce, a zapisane filmy trafiają na Twój komputer.

To niezależny, darmowy projekt, niezwiązany oficjalnie z Autodarts. Płynność i dostępność MP4 zależą od komputera, przeglądarki oraz kamery.
