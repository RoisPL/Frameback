Frameback 1.1

Frameback places a live camera view over the dartboard in Autodarts. You can
watch darts hit the board and see them being removed, then replay and save the
end of a leg as a video.

The cameras supplied with an Autodarts setup work as long as the browser can
access them. An additional webcam is optional, but a camera aimed directly at
the board usually gives a clearer image and a better angle.

Features

Live board view from the camera you select.

Five-point perspective alignment, keeping the camera image on the board.

Automatic zoom on the field that finishes a leg with one dart.

Optional zoom after two T20s, before the third dart.

Three close-up snapshots per turn, one after each dart. Size and zoom are adjustable.

Snapshot placement at the bottom, at the side, or in the opponent's chalkboard column below the score.

Automatic replay after a won leg and manual replay of the latest moments.

Playback speed control, pause, frame stepping and looping.

Replay export to MP4 or WebM.

Optional floating button for hiding the camera view on touchscreens.

Support for shared-board and online games.

Settings profiles and Polish or English interface.

Getting started

Install Tampermonkey in your browser.

Create a new userscript, remove the example code and paste in the complete
Frameback code from the .user.js file. Save it, then reload Autodarts.

Allow the browser to use your camera.

Open Settings → Board image, choose a camera and start alignment.

Freeze the image and mark five points in this order: the centre of the bull,
then the centre of the outer edge of the double fields D20, D6, D3 and D11.
Check the preview and apply the alignment.

The five-point alignment is essential. Without it, snapshots and automatic zoom
use a manually defined board circle and may miss the dart. Recalibrate whenever
you change cameras; Frameback disables the previous camera profile and reports
the change in the panel.

When updating, replace the code in the existing userscript. Keep only one copy
of Frameback enabled.

During a game

Click the small camera pill to open the quick panel. It contains the controls
you are most likely to need during a game: camera visibility, recording,
replays, saving and settings. The panel folds away after five seconds without
input.

Use the game-mode switch to choose Automatic, Shared board or Online
game. If Frameback asks which player you are, select your own player.

Settings

Board image — camera, alignment, number margin, snapshots and manual corrections.

Automatic zoom — zoom strength, score threshold and animation.

Replays — recording, clip length, playback speed, format and save location.

Preferences — language, game mode, player recognition, touchscreen helpers,
profiles and settings backup.

Settings are saved automatically. With the format set to Automatic, Frameback
uses MP4 when the browser supports it and falls back to WebM otherwise. After
starting recording or changing the format, wait briefly for enough footage to
accumulate before creating a replay.

Shortcuts

Key

Action

J

Open settings

R

Replay the latest moments

Shift + R

Save the latest moments without playing them

K

Show or hide the camera view

Shift + N

Turn recording on or off

M

Switch game mode: Automatic / Shared board / Online

I

Show or hide the game panel

Z

Turn automatic zoom on or off

G

Show the helper grid

During a replay, use Space to pause, ← and → to step through frames,
, and . to change speed, L to loop, S to save and Esc to close.

Privacy

Camera images are processed locally and the microphone is never recorded. The
public build does not collect diagnostic logs or send reports. Settings remain
in your browser, and saved videos go to your computer.

Limitations

Frameback uses one camera at a time. Simultaneous views from three cameras and
automatic camera switching are possible future additions.

Frameback is an independent, free project with no official connection to
Autodarts. Playback smoothness and MP4 availability depend on your computer,
browser and camera.

Frameback (polski)

Frameback nakłada podgląd z kamery na tarczę w interfejsie Autodarts. Na żywo
widać trafienia i wyciąganie lotek, a końcówkę lega można później odtworzyć i
zapisać jako film.

Możesz użyć kamer z zestawu Autodarts, jeśli przeglądarka ma do nich dostęp.
Dodatkowa kamera internetowa nie jest wymagana, ale osobna kamera skierowana na
tarczę zwykle zapewnia lepszą jakość obrazu i wygodniejszy kąt.

Funkcje

Podgląd tarczy na żywo z wybranej kamery.

Pięciopunktowe dopasowanie perspektywy, dzięki któremu obraz dokładnie pokrywa tarczę.

Automatyczny zoom na pole, którym kończysz lega jedną lotką.

Opcjonalny zoom po dwóch T20, przed trzecią lotką.

Trzy zbliżenia w każdej kolejce — po jednym dla każdej lotki. Rozmiar i powiększenie można ustawić.

Zbliżenia na dole ekranu, z boku albo w kolumnie chalkboardu przeciwnika, pod jego wynikiem.

Automatyczna powtórka po wygranym legu oraz ręczna powtórka ostatnich chwil.

Regulacja tempa odtwarzania, pauza, przechodzenie klatka po klatce i zapętlenie.

Zapis powtórek w formacie MP4 lub WebM.

Opcjonalny pływający przycisk do chowania podglądu kamery na ekranach dotykowych.

Obsługa gry przy wspólnej tarczy oraz gry online.

Profile ustawień i interfejs po polsku lub angielsku.

Pierwsze uruchomienie

Zainstaluj Tampermonkey w przeglądarce.

Utwórz nowy skrypt, usuń przykładową treść i wklej cały kod Frameback z pliku
.user.js. Zapisz skrypt i odśwież Autodarts.

Zezwól przeglądarce na dostęp do kamery.

Otwórz Ustawienia → Obraz tarczy, wybierz kamerę i rozpocznij dopasowanie.

Zatrzymaj obraz i zaznacz pięć punktów w tej kolejności: środek bulla, a
następnie środek zewnętrznej krawędzi pól podwójnych D20, D6, D3 i D11.
Sprawdź podgląd i zastosuj dopasowanie.

Dopasowanie pięciopunktowe ma kluczowe znaczenie. Bez niego zbliżenia i
automatyczny zoom korzystają z ręcznie ustawionego koła tarczy i mogą nie trafić
w miejsce wbicia lotki. Po zmianie kamery wykonaj dopasowanie ponownie. Frameback
wyłączy poprzedni profil i pokaże informację o tym w panelu.

Przy aktualizacji podmień kod w istniejącym skrypcie. Włączona powinna być tylko
jedna kopia Frameback.

W trakcie gry

Kliknij małą pastylkę z ikoną kamery, aby otworzyć panel podręczny. Znajdziesz w
nim najczęściej używane funkcje: widoczność obrazu, nagrywanie, powtórki, zapis i
ustawienia. Po pięciu sekundach bezczynności panel sam się zwinie.

Przełącznik trybu gry oferuje tryby Automatycznie, Wspólna tarcza i
Gra online. Jeśli Frameback zapyta, którym graczem jesteś, wybierz siebie.

Ustawienia

Obraz tarczy — kamera, dopasowanie, margines numerów, zbliżenia i korekty ręczne.

Automatyczny zoom — siła powiększenia, próg punktowy i animacja.

Powtórki — nagrywanie, długość klipu, tempo odtwarzania, format i miejsce zapisu.

Preferencje — język, tryb gry, rozpoznawanie gracza, ułatwienia dla ekranów
dotykowych, profile i kopia ustawień.

Ustawienia zapisują się automatycznie. Przy formacie Automatycznie Frameback
wybiera MP4, jeśli przeglądarka go obsługuje, a w przeciwnym razie używa WebM.
Po włączeniu nagrywania lub zmianie formatu odczekaj chwilę, aż zbierze się
wystarczająco dużo materiału do powtórki.

Skróty klawiszowe

Klawisz

Działanie

J

Otwórz ustawienia

R

Odtwórz ostatnie chwile

Shift + R

Zapisz ostatnie chwile bez odtwarzania

K

Pokaż lub ukryj podgląd kamery

Shift + N

Włącz lub wyłącz nagrywanie

M

Zmień tryb gry: Automatycznie / Wspólna tarcza / Gra online

I

Pokaż lub ukryj panel gry

Z

Włącz lub wyłącz automatyczny zoom

G

Pokaż siatkę pomocniczą

Podczas powtórki Spacja włącza pauzę, ← i → przechodzą klatka po klatce,
, i . zmieniają tempo, L włącza pętlę, S zapisuje, a Esc zamyka
odtwarzanie.

Prywatność

Obraz z kamery jest przetwarzany lokalnie, a mikrofon nigdy nie jest nagrywany.
Publiczna wersja nie zbiera dzienników diagnostycznych ani nie wysyła raportów.
Ustawienia pozostają w przeglądarce, a zapisane filmy trafiają na komputer.

Ograniczenia

Frameback korzysta z jednej kamery naraz. Jednoczesny podgląd z trzech kamer i
automatyczne przełączanie kamer to pomysły na dalszy rozwój.

Frameback to niezależny, darmowy projekt, który nie jest oficjalnie powiązany z
Autodarts. Płynność odtwarzania i dostępność formatu MP4 zależą od komputera,
przeglądarki oraz kamery.
