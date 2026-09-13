// ==UserScript==
// @name         Frameback — kamera i powtórki do Autodarts
// @name:en      Frameback — Autodarts camera and replays
// @description:en Camera overlay, image alignment, checkout zoom and replays for Autodarts
// @namespace    https://play.autodarts.com/
// @version      1.0
// @description  Kamera na tarczy Autodarts: korekcja perspektywy, filmowy zoom na checkouty, powtorki
// @match        *://play.autodarts.com/*
// @match        *://play.autodarts.io/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  const WERSJA = "1.0";
  // Nazwa w jednym miejscu. Kazdy napis w interfejsie bierze sie stad,
  // wiec zmiana marki to zmiana tej jednej linii - a nie 40 literalow.
  const MARKA = "Frameback";
  const MARKA_LAB = MARKA + " Lab";

  // Klucz slownika to tekst POLSKI. Brak tlumaczenia daje wtedy polski napis,
  // a nie pusty. Tłumaczenia dotyczą interfejsu; dziennik zachowuje język źródłowy.
  const TEKSTY = {
    "en": {
        "Nie udało się wczytać profilu. Wybierz inny profil lub przywróć kopię ustawień.": "Could not load the profile. Choose another profile or restore a settings backup.",
        "⟳ od nowa": "⟳ restart",
        "Zapisz nagranie": "Save video",
        "Zapisz plik": "Save file",
        "S zapisz · Esc przerwij": "S save · Esc stop",
        "brak zapisanej sesji w pamięci": "No previous session saved",
        "błąd pobierania": "Could not download the file",
        "błąd zapisu dziennika": "Could not save the report",
        "Zamknę za {a} s": "Closing in {a} s",
        "Nagranie nie jest jeszcze gotowe. Spróbuj za chwilę.": "Recording is not ready yet. Try again shortly.",
        "Dostępne {a} s powtórki": "Replay footage available: {a} s",
        "Checkout {a} — zapisano": "Checkout {a} — saved",
        "MP4 aktywny — nagrywam materiał do powtórek": "MP4 active — recording replay footage",
        "Nie udało się przygotować powtórki. Spróbuj ponownie.": "Could not prepare the replay. Try again.",
        "Wybrano folder: {nazwa}": "Selected folder: {nazwa}",
        "Wybrano folder: {nazwa}. Po odświeżeniu strony wybierz go ponownie.": "Selected folder: {nazwa}. Select it again after reloading the page.",
        "Nie można zapisać w tym folderze. Wybierz własny folder, np. Autodarts w Dokumentach.": "Cannot save to this folder. Choose your own folder, such as Autodarts in Documents.",
        "Bufor nie nadąża": "Recording cannot keep up. Try lowering the recording quality.",
        "pusty bufor": "No replay footage yet",
        "brak obrazu z kamery": "No camera image",
        "uruchamiam nagrywanie": "Starting recording",
        "Zmiany zapisują się automatycznie.": "Changes are saved automatically.",
        "Cofnij punkt": "Undo point",
        "POWTÓRKA": "REPLAY",
        "Pauza lub wznów": "Pause or resume",
        "Wolniej": "Slower",
        "Szybciej": "Faster",
        "⟲ pętla": "⟲ loop",
        "Pozycja w powtórce": "Replay position",
        "Spacja pauza · ← → klatka po klatce · , . tempo · L pętla · ": "Space pause · ← → frame by frame · , . speed · L loop · ",
        "powtórka w pętli": "Replay loop enabled",
        "pętla wyłączona": "Replay loop disabled",
        "WŁĄCZONE": "ON",
        "WYŁĄCZONE": "OFF",
        "nagrywanie włączone": "Recording enabled",
        "podgląd bez nagrywania": "Preview without recording",
        "Zapisać tę powtórkę?": "Save this replay?",
        "Odrzuć": "Discard",
        "nie ma czego zapisać": "No replay to save yet",
        "błąd zapisu powtórki": "Could not save the replay",
        "zapis anulowany": "Save cancelled",
        "Nie udało się zapisać kopii kalibracji": "Could not back up the image alignment",
        "Brak poprzedniej kalibracji": "No previous image alignment to restore",
        "Przywrócono poprzednią kalibrację": "Previous image alignment restored",
        "Nie udało się przywrócić kalibracji": "Could not restore the image alignment",
        "Wskaż pięć punktów na obrazie": "Mark five points on the image",
        "Błędny margines numerów": "Check the margin around the numbers",
        "Sprawdź kolejność: góra, prawo, dół, lewo": "Check the order: top, right, bottom, left",
        "Tarcza jest zbyt mała — ustaw kamerę bliżej": "The board is too small — move the camera closer",
        "Punkty nie wyznaczają tarczy": "The points do not outline the board",
        "Zbyt mocna perspektywa — zmień położenie kamery": "The angle is too steep — reposition the camera",
        "Zamknij powtórkę przed kalibracją": "Close the replay before aligning the image",
        "Dopasuj obraz kamery": "Align the camera image",
        "Kalibracja kamery": "Camera alignment",
        "Wybierz kamerę, zatrzymaj obraz i wskaż bull oraz cztery punkty na zewnętrznej krawędzi pól podwójnych. Punkty możesz poprawić przeciąganiem.": "Choose a camera, freeze the image, then mark the bull and four points on the outer edge of the double ring. Drag any point to adjust it.",
        "Podgląd po dopasowaniu — sprawdź siatkę i środek tarczy": "Aligned preview — check the grid and the centre of the board",
        "bull — sam środek": "bull — the very centre",
        "prawo: środek zewnętrznej krawędzi D6": "right: centre of the outer edge of D6",
        "dół: środek zewnętrznej krawędzi D3": "bottom: centre of the outer edge of D3",
        "lewo: środek zewnętrznej krawędzi D11": "left: centre of the outer edge of D11",
        "Naciśnij „Zatrzymaj obraz”. Podgląd gry nadal działa.": "Click “Freeze image”. The game preview will stay live.",
        "Sprawdź podgląd. Przeciągnij błędny punkt lub zastosuj dopasowanie.": "Check the preview. Drag a point to correct it, or apply the alignment.",
        "Kalibracja zastosowana — możesz cofnąć zmianę w panelu": "Image aligned — you can undo this in settings",
        "Cofnij poprzednią kalibrację": "Restore previous alignment",
        "Uruchamiam wybraną kamerę…": "Starting the selected camera…",
        "Nie udało się odczytać listy kamer": "Could not load the camera list",
        "Zatrzymaj obraz": "Freeze image",
        "Zastosuj dopasowanie": "Apply alignment",
        "Nazwa profilu (opcjonalnie)": "Profile name (optional)",
        "Nazwa profilu": "Profile name",
        "Kamera nie jest jeszcze gotowa": "The camera is not ready yet",
        "Nagrywanie powtórek wyłączone": "Replay recording is off",
        "Przygotowuję film…": "Preparing video…",
        "Stopklatka — możesz odtworzyć ponownie": "Freeze frame — you can replay it again",
        "Odtwarzam powtórkę": "Playing replay",
        "Czekam na nagrywanie": "Waiting for recording to start",
        "Brak nowych klatek — sprawdź kamerę": "No new footage — check the camera",
        "Brak ustawień": "No settings found",
        "Błędna geometria SVG": "Invalid board alignment",
        "Błędna kalibracja": "Invalid image alignment",
        "Błędny format nagrania": "Invalid recording format",
        "Plik kopii jest zbyt duży": "The backup file is too large",
        "To nie jest pełna kopia zapasowa": "This file is not a full backup",
        "Błędne profile": "Invalid profiles",
        "Zbyt długa nazwa profilu": "The profile name is too long",
        "Wczytano ustawienia i profile": "Settings and profiles restored",
        "Kamera": "Camera",
        "przywrócono ustawienia sprzed dopasowania": "Previous image settings restored",
        "Gdy Autodarts nie wykrywa tarczy": "When Autodarts cannot find the board",
        "Najpierw dopasuj tarczę w kreatorze": "Use the five-point alignment first",
        "Wybór kamery": "Camera selection",
        "Odśwież listę kamer": "Refresh camera list",
        "Dopasowanie do tarczy": "Align with the board",
        "Dopasuj obraz do tarczy": "Align image with the board",
        "Wielkość i położenie — zaawansowane": "Size and position — advanced",
        "Wielkość obrazu": "Image size",
        "Przesunięcie w poziomie": "Horizontal position",
        "Przesunięcie w pionie": "Vertical position",
        "Skala odniesienia — zaawansowane": "Reference scale — advanced",
        "Przelicz skalę": "Update reference scale",
        "przeliczono skalę": "Reference scale updated",
        "Kadr": "Framing",
        "Przybliżenie": "Zoom",
        "Prostowanie perspektywy": "Perspective correction",
        "Pochylenie (kamera z góry)": "Tilt (camera above the board)",
        "Skręt w bok": "Side angle",
        "Obrót obrazu": "Image rotation",
        "Siła perspektywy": "Perspective strength",
        "Proporcje": "Proportions",
        "Szerokość": "Width",
        "Wysokość": "Height",
        "Narzędzia": "Tools",
        "Siatka pomocnicza": "Alignment grid",
        "Wyśrodkuj obraz": "Centre the image",
        "Widoczność podczas gry": "Visibility during play",
        "Chowaj przy rzucie o bulla": "Hide during the throw for the bull",
        "nick wyczyszczony": "Nickname cleared",
        "tożsamość tarczy skasowana": "Saved board forgotten",
        "Profile i kopia ustawień": "Profiles and settings backup",
        "Skróty klawiszowe": "Keyboard shortcuts",
        "Zapis bez odtwarzania": "Save without playback",
        "Nagrywanie": "Recording",
        "Automatycznie / Przy tarczy / Gra zdalna": "Automatic / At the board / Remote play",
        "Panel gry": "Player panel",
        "Zamknij okno": "Close window",
        "Stopień przybliżenia": "Zoom level",
        "Próg punktowy": "Score threshold",
        "Zoom może się włączyć, gdy pozostały wynik nie przekracza tego progu i wystarczy jedna lotka.": "Zoom can activate when your remaining score is at or below this threshold and you can finish with one dart.",
        "Podejrzyj zoom na T20": "Preview zoom on T20",
        "Animacja — zaawansowane": "Animation — advanced",
        "Czas wjazdu": "Zoom-in duration",
        "Czas powrotu": "Zoom-out duration",
        "Wracaj po trzeciej lotce": "Zoom out after the third dart",
        "Powolny najazd": "Gradual zoom",
        "Zasięg najazdu": "Extra zoom level",
        "Czas najazdu": "Gradual zoom duration",
        "Celowanie — zaawansowane": "Zoom target — advanced",
        "Środek w poziomie": "Horizontal centre",
        "Środek w pionie": "Vertical centre",
        "Promień tarczy": "Board radius",
        "Automatyczna powtórka po wygranym legu. Klawisz R odtwarza ostatnie chwile na życzenie.": "Automatically replays a winning leg. Press R to replay the most recent moments at any time.",
        "Podgląd kamery działa również bez nagrywania.": "The camera preview also works with recording off.",
        "Odtwarzanie": "Playback",
        "Długość automatycznej powtórki": "Automatic replay length",
        "Długość powtórki ręcznej": "Manual replay length",
        "Tempo odtwarzania": "Playback speed",
        "Zatrzymaj ostatnią klatkę przez": "Hold the last frame for",
        "Wygląd powtórki": "Replay appearance",
        "Przyciemnienie tła": "Background dimming",
        "Przybliżenie w powtórce": "Zoom during replays",
        "Siła przybliżenia": "Zoom level",
        "Dokładne tempo": "Custom speed",
        "Automatyka i zapis": "Automatic playback and saving",
        "Tylko moje legi": "Only my winning legs",
        "Odtwarzaj w pętli": "Loop playback",
        "Automatyczny zapis od checkoutu": "Auto-save checkouts scoring at least",
        "0 wyłącza automatyczny zapis.": "Set to 0 to turn off automatic saving.",
        "Zapis": "Saving",
        "Wybierz folder zapisu": "Choose save folder",
        "Pytaj za każdym razem": "Ask every time",
        "będę pytać o miejsce zapisu": "You will be asked where to save each file",
        "Nagrywanie — zaawansowane": "Recording — advanced",
        "Zapas po zwycięskim rzucie": "Include footage after the winning dart",
        "Pauza na animację Autodarts": "Wait for the Autodarts animation",
        "Długość bufora": "Recording history length",
        "Przepływność": "Bitrate",
        "Maksymalna szerokość kamery": "Maximum camera width",
        "Zastosuj jakość i połącz kamerę ponownie": "Apply quality and reconnect camera",
        "Pobierz kopię ustawień i profili": "Download settings and profiles backup",
        "Wczytaj pełną kopię": "Restore full backup",
        "Profil zapisuje ustawienia obrazu, zoomu i powtórek. Możesz przygotować osobny profil dla każdej kamery lub miejsca gry.": "A profile saves your image, zoom and replay settings. Create a separate profile for each camera or place where you play.",
        "Nowy profil": "New profile",
        "Nazwa nowego profilu": "New profile name",
        "np. salon": "e.g. living room",
        "Zapisz profil": "Save profile",
        "Zapisane profile": "Saved profiles",
        "Wczytaj": "Load",
        "Nadpisz": "Overwrite",
        "Usuń": "Delete",
        "podaj nazwę profilu": "Enter a profile name",
        "Nazwa profilu: maksymalnie 100 znaków": "Profile names can be up to 100 characters long",
        "Nie udało się zapisać profilu": "Could not save the profile",
        "nie ma takiego profilu": "Profile not found",
        "usunięto profil": "Profile deleted",
        "— brak zapisanych —": "— no saved profiles —",
        "Ta przeglądarka nie pozwala wskazać miejsca — pliki trafią do Pobranych.": "This browser cannot choose a save location. Files will go to Downloads.",
        "Przy każdym zapisie pojawi się okno wyboru miejsca.": "You will be asked where to save each file.",
        "błąd zapisu": "Could not save the file",
        "Zmieniono proporcje kamery — wykonaj kalibrację ponownie": "The camera aspect ratio changed — align the image again",
        "Inna kamera — wykonaj dopasowanie obrazu": "Camera changed — align the image again",
        "Kamera odłączona — wybierz ją ponownie w kreatorze": "Camera disconnected — select it again in image alignment",
        "Kamera nie przekazała świeżego materiału — spróbuj ponownie": "No recent footage from the camera — try again",
        "nagrywanie niedostępne": "Recording unavailable",
        "zapisuję ostatnie chwile...": "Saving recent footage…",
        "powtórki są wyłączone": "Replays are off",
        "powtórka już trwa": "A replay is already playing",
        "przygotowuję...": "Preparing…",
        "czekam na animację...": "Waiting for the animation…",
        "powtórka: od nowa": "Replay restarted",
        "błąd odtwarzania": "Could not play the video",
        "za mało materiału do powtórki — nagrywanie trwa dalej": "Not enough footage for a replay yet — recording continues",
        "ustalam długość filmu…": "Reading video length…",
        "nie udało się ustalić długości filmu — spróbuj ponownie": "Could not read the video length — try again",
        "Zbieram materiał": "Recording footage",
        "Czekam na klatkę kluczową": "Waiting for the recording to be ready",
        "Za mało klatek do powtórki": "Not enough footage for a replay yet",
        "przeglądarka nie pozwala wybrać folderu": "This browser cannot choose a folder",
        " pkt": " pts",
        "Punkt {a}/5: {b}": "Point {a}/5: {b}",
        "Zapisano {plik}": "Saved {plik}",
        "Zapisano profil „{nazwa}”": "Saved profile “{nazwa}”",
        "Wczytano profil „{nazwa}”": "Loaded profile “{nazwa}”",
        "Tempo {a}×": "Speed {a}×",
        "Rozpoznaję Cię jako {nazwa}": "Recognised as {nazwa}",
        "Gracze w meczu: {nazwy}": "Players in this match: {nazwy}",
        "Brak aktywnego meczu": "No active match",
        "Tarcza zapamiętana": "Board saved",
        "Folder zapisu: {nazwa}": "Save folder: {nazwa}",
        "wybrany wcześniej": "previously selected",
        "Przywróć domyślne: {a}": "Reset to default: {a}",
        "Przywróć wartość domyślną: {a}": "Restore default value: {a}",
        "Margines na numery: {a}%": "Margin for numbers: {a}%",
        "Zbieram materiał: {a} / {b} s": "Recording footage: {a} / {b} s",
        "Powtórka gotowa · ostatnie {a} s": "Replay ready · last {a} s",
        "Nie udało się wczytać kopii. Sprawdź, czy wybrano pełną kopię ustawień Frameback.": "Could not restore the backup. Check that this is a full Frameback settings backup.",
        "Nagrywanie przerwane. Połącz kamerę ponownie.": "Recording stopped. Reconnect the camera.",
        "Połączenie z kamerą nie działa. Sprawdź dostęp do kamery i spróbuj ponownie.": "Could not connect to the camera. Check camera access and try again.",
        "góra: środek zewnętrznej krawędzi D20": "top: centre of the outer edge of D20",
        "Zacznij od wskazania pięciu punktów na tarczy. W razie potrzeby popraw dopasowanie ręcznie.": "Start by marking five points on the board. Fine-tune the alignment manually if needed.",
        "Włącz, jeśli obraz nie pojawia się na tarczy Autodarts. Koło zostanie umieszczone na środku ekranu.": "Turn this on if the camera image does not appear on the Autodarts board. The circle will appear in the middle of the screen.",
        "Obraz jest dopasowany za pomocą pięciu punktów. Przełącz na ustawienie ręczne, aby użyć suwaków.": "The image is aligned using five points. Switch to manual alignment to use the sliders.",
        "Przełącz dopasowanie punktowe / ręczne": "Switch five-point / manual alignment",
        "Wybierz kamerę skierowaną na tarczę. Podgląd zmieni się od razu.": "Choose the camera aimed at the board. The preview will update immediately.",
        "Dopasuj obraz z kamery do tarczy widocznej w Autodarts.": "Align the camera image with the board shown in Autodarts.",
        "Zwiększ margines, jeśli obraz zasłania numery. Ta opcja działa po dopasowaniu pięciu punktów.": "Increase the margin if the image covers the numbers. This works after five-point alignment.",
        "100% dopasowuje wielkość obrazu do tarczy w Autodarts.": "100% matches the image size to the board in Autodarts.",
        "Użyj po zmianie rozmiaru okna, jeśli ręczne dopasowanie obrazu wymaga ponownego ustawienia skali.": "Use this after resizing the window if your manual alignment needs a new reference scale.",
        "Ukrywa obraz z kamery podczas rzutu o rozpoczęcie meczu.": "Hides the camera image during the throw to decide who starts.",
        "Automatycznie dopasowuje język do ustawień przeglądarki.": "Automatically follows your browser language.",
        "Automatycznie rozpoznaje grę przy jednej tarczy lub grę zdalną. Ręczny wybór zostaje zapamiętany na kolejne mecze.": "Automatically detects whether players share a board or play remotely. A manual choice is remembered for future matches.",
        "Jeśli aplikacja nie rozpoznaje Cię prawidłowo, wpisz swój nick z Autodarts.": "If you are not recognised correctly, enter your Autodarts nickname.",
        "Gdy coś nie działa, zapisz raport i dołącz go do zgłoszenia. Dane graczy i tarcz są w raporcie maskowane.": "If something goes wrong, save a report and attach it to your support request. Player and board details are masked in the report.",
        "Przybliża pole, którym możesz zamknąć lega jedną lotką.": "Zooms in on the target when you can finish the leg with one dart.",
        "Włącz automatyczny zoom, aby zmienić jego ustawienia.": "Turn on automatic zoom to adjust its settings.",
        "Po trzeciej lotce pokazuje ponownie całą tarczę.": "Shows the whole board again after the third dart.",
        "Maksymalny czas przybliżenia": "Maximum zoom duration",
        "Po tym czasie obraz wróci do całej tarczy. Wybierz 0, aby wyłączyć limit. Zbyt krótki czas może zakończyć przybliżenie przed rzutem.": "Returns to the full board after this time. Set to 0 for no time limit. A short limit may zoom out before you throw.",
        "Delikatnie zwiększa przybliżenie podczas celowania.": "Slowly increases the zoom while you aim.",
        "Jeśli przybliżenie nie trafia w odpowiednie pole, włącz siatkę i popraw położenie środka tarczy.": "If the zoom misses the target, turn on the grid and adjust the board centre.",
        "Włącz nagrywanie, aby korzystać z powtórek.": "Turn on recording to use replays.",
        "Pokazuje automatyczną powtórkę tylko po Twoim zwycięstwie. Najpierw upewnij się, że aplikacja prawidłowo Cię rozpoznaje.": "Automatically replays only your winning legs. First, check that the app recognises you correctly.",
        "Większa przepływność może poprawić jakość, ale zwiększa pliki. Po zastosowaniu zmian kamera połączy się ponownie, a ostatnie chwile nagrania zostaną wyczyszczone. Filmy mają maksymalnie 1280 px szerokości.": "A higher bitrate may improve quality but creates larger files. Applying changes reconnects the camera and clears recent footage. Videos are limited to 1280 pixels wide.",
        "Po zmianie formatu poczekaj, aż nagrają się nowe sekundy do powtórki.": "After changing format, allow time to record fresh footage for replays.",
        "Zalecamy Automatycznie: aplikacja użyje MP4, a jeśli będzie niedostępny — WebM. Wybierz MP4 lub WebM, gdy potrzebujesz konkretnego formatu.": "We recommend Automatic: the app uses MP4 when available, or WebM otherwise. Choose MP4 or WebM if you need a specific format.",
        "Dotyczy filmów WebM, także gdy aplikacja wybierze ten format automatycznie. Jeśli nie wiesz, który wybrać, pozostaw VP8.": "Applies to WebM videos, including when the app chooses WebM automatically. If unsure, leave this set to VP8.",
        "MP4 niedostępny": "MP4 unavailable",
        "Format powtórek": "Replay format",
        "Automatycznie — zalecane": "Automatic — recommended",
        "Ponów próbę MP4": "Retry MP4",
        "Kodek WebM — zaawansowane": "WebM codec — advanced",
        "Kodek WebM": "WebM codec",
        "WebM niedostępny": "WebM unavailable",
        "Nagrywanie wyłączone": "Recording disabled",
        "Uruchamiam MP4…": "Starting MP4…",
        "Aktywny format": "Active format",
        "Brak aktywnego nagrania": "No active recording",
        "MP4 niedostępny — używam WebM": "MP4 unavailable — using WebM",
        "MP4 niedostępny — wybierz Automatycznie lub WebM": "MP4 unavailable — choose Automatic or WebM",
        "Zmiana dostępna po zamknięciu powtórki": "Close the replay to change the format",
        "Zamknij powtórkę przed zmianą formatu": "Close the replay before changing the format",
        "Tryb gry": "Game mode",
        "Stan nagrywania": "Recording state",
        "Pokaż panel": "Show panel",
        "Ukryj panel": "Hide panel",
        "Brak obrazu z kamery": "No camera image",
        "Brak obrazu — dotknij, aby połączyć kamerę": "No image — tap to connect the camera",
        "łączę kamerę…": "connecting the camera…",
        "Tryb gry: {a}": "Game mode: {a}",
        "rozpoznano": "detected",
        "Przy tarczy": "At the board",
        "Gra zdalna": "Remote play",
        "Automatycznie": "Automatic",
        "nie ustalono": "not determined",
        "tryb: rozpoznawanie automatyczne": "mode: automatic detection",
        "tryb: jedna tarcza — obraz zawsze widoczny": "mode: one board — camera always visible",
        "tryb: gra zdalna — obraz tylko w twojej kolejce": "mode: remote play — camera only on your turn",
        "— panel gry": "— player panel",
        "Powtórka": "Replay",
        "Ustawienia": "Settings",
        "Zamknij": "Close",
        "Jeszcze raz": "Again",
        "Obraz z kamery": "Camera image",
        "Nagrywanie powtórek": "Replay recording",
        "Zapisz ostatnią powtórkę": "Save last replay",
        "Zapisz ostatnio odtworzoną powtórkę na dysk": "Save the last played replay to disk",
        "Najpierw odtwórz powtórkę — dopiero wtedy jest co zapisać.": "Play a replay first — only then is there something to save.",
        "Odtwórz ostatnie chwile · R": "Play the last moments · R",
        "Nagrywanie jeszcze nie zebrało materiału.": "Recording has not gathered footage yet.",
        "Włącz nagrywanie powtórek, aby móc odtwarzać.": "Turn on replay recording to play anything back.",
        "Błąd nagrywania": "Recording error",
        "Bez nagrywania": "Not recording",
        "Stopklatka": "Freeze frame",
        "Przygotowuję…": "Preparing…",
        "Czekam": "Waiting",
        "Brak klatek": "No frames",
        "Gotowe": "Ready",
        "Zbieram {a}/{b} s": "Buffering {a}/{b} s",
        "Sekcje ustawień": "Settings sections",
        "Zamknij · Esc": "Close · Esc",
        "Obraz tarczy": "Board image",
        "Automatyczny zoom": "Automatic zoom",
        "Powtórki": "Replays",
        "Preferencje": "Preferences",
        "Dopasowanie obrazu": "Image fitting",
        "Dopasuj automatycznie — wskaż 5 punktów": "Fit automatically — mark 5 points",
        "Cofnij ostatnią kalibrację": "Undo last calibration",
        "Margines na numery": "Margin for numbers",
        "Zwiększ, jeśli numery tarczy Autodarts znikają pod obrazem z kamery.": "Increase it if the Autodarts numbers disappear under the camera image.",
        "Korekta ręczna": "Manual correction",
        "Zastosuj": "Apply",
        "Anuluj": "Cancel",
        "Kto gra": "Who is playing",
        "Twój gracz w Autodarts": "Your Autodarts player",
        "Twój nick w Autodarts": "Your Autodarts nickname",
        "Zapomnij rozpoznaną tarczę": "Forget the recognised board",
        "Zgłoszenie problemu": "Reporting a problem",
        "Zapisz dziennik do zgłoszenia": "Save the log for a report",
        "Język interfejsu": "Interface language",
        "Tryb ręczny": "Manual mode",
        "Tryb ręczny — wróć na tarczę": "Manual mode — return to the board",
        "Koło stoi na środku ekranu, a nie na tarczy Autodarts. Kliknij, aby wrócić.": "The circle sits in the middle of the screen, not on the Autodarts board. Click to go back.",
        "wracam na tarczę Autodarts": "returning to the Autodarts board",
        "Który gracz to Ty?": "Which player are you?",
        "zapamiętane": "saved",
        "Koło na środku ekranu": "Circle in the middle of the screen",
        "Polski": "Polish",
        "Angielski": "English"
    }
};
  function jezyk() {
    const wybor = typeof cal === "object" && cal ? cal.jezyk : "auto";
    if (wybor === "pl" || wybor === "en") return wybor;
    try { return /^pl\b/i.test(navigator.language || "") ? "pl" : "en"; }
    catch (e) { return "pl"; }
  }
  function t(tekst, pola) {
    const j = jezyk();
    let out = j === "pl" ? tekst : ((TEKSTY[j] || {})[tekst] || tekst);
    if (pola) for (const k of Object.keys(pola)) out = out.split("{" + k + "}").join(pola[k]);
    return out;
  }
  const DEV_UI = false; // Build generuje publiczny wariant false i deweloperski true.
  let labOkno=null, labOtwarte=false, powrotFokusu=null, uiNumer=0;
  // Opt-in event fixture; no images, URLs or credentials. Same pseudonym for equal identities.
  let testSession=null;
  function startTestu(){
    if(!DEV_UI)return;
    if(testSession?.active)return;
    testSession={active:true,start:performance.now(),events:[],bytes:0,ids:new Map(),limit:false};
    testSession.path=location.pathname;dodajTest('context',{path:location.pathname,version:WERSJA});
    // Fresh full state arrives on the next game update. Never invent a server snapshot.
  }
  function czystyTest(value,key='',depth=0){
    if(depth>30)return null;
    if(/token|password|authorization|cookie|avatar|url|email|internal|host$|user$|country/i.test(key))return undefined;
    if(typeof value==='string'){
      if(/^(name|player|playerName|boardName|hostName|userName|id|.*Id)$/i.test(key) && !/^(S|D|T|M)\d{1,2}$|^(Bull|25|50)$/.test(value)){
        if(!testSession.ids.has(value))testSession.ids.set(value,'anon'+(testSession.ids.size+1));return testSession.ids.get(value);
      }
      return value.replace(/[0-9a-f]{8}-[0-9a-f-]{27,}/gi,x=>{if(!testSession.ids.has(x))testSession.ids.set(x,'anon'+(testSession.ids.size+1));return testSession.ids.get(x);}).replace(/https?:\/\/\S+/g,'[url]');
    }
    if(Array.isArray(value))return value.map(v=>czystyTest(v,key,depth+1));
    if(value&&typeof value==='object'){const o=Object.create(null);for(const [k,v]of Object.entries(value)){const c=czystyTest(v,k,depth+1);if(c!==undefined)o[k]=c;}return o;}
    return value;
  }
  function dodajTest(type,data){
    if(!DEV_UI)return;
    if(!testSession?.active)return;
    const e={t:Math.round(performance.now()-testSession.start),type,data:czystyTest(data)};
    const n=JSON.stringify(e).length*2;
    if(testSession.events.length>=20000||testSession.bytes+n>16*1048576){testSession.active=false;testSession.limit=true;return;}
    testSession.events.push(e);testSession.bytes+=n;
  }
  function testWS(channel,topic,data){
    if(!DEV_UI)return;
    if(!testSession?.active||!['autodarts.matches','autodarts.boards','autodarts.lobbies'].includes(channel))return;
    if(testSession.path!==location.pathname){testSession.path=location.pathname;dodajTest('context',{path:location.pathname,version:WERSJA});}
    dodajTest('ws',{channel,topic,data});
  }
  function eksportTestu(){
    if(!DEV_UI)return;
    if(!testSession)return toast('Najpierw rozpocznij zapis testu');
    testSession.active=false;
    const data={format:'adcam-test',version:WERSJA,limited:testSession.limit,events:testSession.events};
    const a=el('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(data)],{type:'application/json'}));a.download='adcam-test-'+Date.now()+'.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),30000);
    toast('Zapisano test: '+data.events.length+' zdarzeń');
  }

  // ---------- podsluch WebSocketa (tymczasowy, diagnostyczny) ----------
  // Autodarts przesyla stan meczu przez WebSocket. Dzis czytamy go z wygladu
  // strony, co lamie sie przy innym motywie i innym jezyku. Zanim
  // przejdziemy na dane, musimy poznac ksztalt wiadomosci - stad ten podsluch.
  //
  // Wersja 2. Poprzednia gubila dane w czterech miejscach naraz i widac to
  // bylo w raporcie z 4.16:
  //   - lista kluczy urwana na 14 pozycjach (kanal matches pokazal dokladnie
  //     14, alfabetycznie do "round", wiec ogon od litery "s" przepadl),
  //   - probka urwana na 320 znakach, a tablica chalkboards jest pierwsza
  //     alfabetycznie i zjadala caly budzet,
  //   - jedna probka na kanal, wiec widzielismy jedna wartosc pola "event",
  //   - pole "topic" w ogole nie bylo czytane, a Autodarts multipleksuje
  //     po parze kanal+temat.
  // Teraz zbieramy: pelna liste kluczy, ksztalt zamiast surowej tresci,
  // zbior roznych wartosci krotkich pol tekstowych, pelna pierwsza wiadomosc
  // kazdego strumienia i mini os czasu zdarzen wpleciona w dziennik.
  const wsKanaly = new Map();          // klucz: "kanal | temat"
  let wsWiadomosci = 0, wsNieJSON = 0;
  let wsThrows = null, wsThrowCzas = 0, wsGracz = null, gniazdoGen = 0;
  let wsWynik = null, wsWinner = null, wsLeg = null;

  function skrot(x, n) {
    const t = typeof x === "string" ? x : JSON.stringify(x);
    return t && t.length > n ? t.slice(0, n) + "…" : t;
  }

  // Ksztalt zamiast tresci. Dlugie tablice pokazujemy jako [n x ksztalt
  // pierwszego elementu], dlugie teksty przycinamy per pole, a nie globalnie.
  // Dzieki temu jedna duza tablica nie zaslania reszty obiektu - to wlasnie
  // przez to nie poznalismy zawartosci pol player, players, leg i round.
  function ksztalt(x, gl) {
    gl = gl || 0;
    if (x === null || x === undefined) return String(x);
    if (Array.isArray(x)) {
      if (!x.length) return "[]";
      // Krotka tablica prostych wartosci w calosci - to wlasnie w niej siedzi
      // gameScores, czyli pozostale wyniki obu graczy. Sam ksztalt "[2× 101]"
      // gubilby druga liczbe, a to ona jest tu tresc.
      const proste = x.length <= 8 && x.every(v =>
        typeof v === "number" || typeof v === "boolean" ||
        (typeof v === "string" && v.length <= 12));
      if (proste) return `[${x.map(v => ksztalt(v, gl + 1)).join(",")}]`;
      if (gl >= 3) return `[${x.length}×…]`;
      return `[${x.length}× ${ksztalt(x[0], gl + 1)}]`;
    }
    const t = typeof x;
    if (t === "string") return `"${x.length > 44 ? x.slice(0, 44) + "…" : x}"`;
    if (t !== "object") return String(x);
    if (gl >= 4) return "{…}";
    const k = Object.keys(x);
    if (!k.length) return "{}";
    return `{${k.map(n => `${n}:${ksztalt(x[n], gl + 1)}`).join(", ")}}`;
  }

  // Krotkie pola tekstowe (event, status, state) maja skonczony zbior
  // wartosci. Jedna probka pokazywala tylko jedna z nich, a nazwy zdarzen
  // sa nam potrzebne w komplecie.
  // Interesuja nas pola o skonczonym zbiorze wartosci (event, status, state,
  // variant, outMode, nazwy graczy). Identyfikatory, adresy i znaczniki czasu
  // sa za kazdym razem inne - trafialyby na te liste i tylko ja zasmiecaly.
  function wartoscEnum(v) {
    if (!v.length || v.length > 28) return false;
    if (/[\/:]/.test(v)) return false;                 // adresy, sciezki
    if (/^\d{4}-\d\d-\d\d/.test(v)) return false;      // znaczniki czasu
    if (/^[0-9a-f][0-9a-f-]{7,}$/i.test(v)) return false; // identyfikatory
    return true;
  }

  function zbierzWartosci(w, obj, sciezka, gl) {
    if (!obj || typeof obj !== "object" || Array.isArray(obj) || gl > 2) return;
    for (const k of Object.keys(obj)) {
      const v = obj[k];
      const p = sciezka ? `${sciezka}.${k}` : k;
      if (typeof v === "string" && wartoscEnum(v)) {
        if (!w.wartosci[p]) w.wartosci[p] = new Set();
        if (w.wartosci[p].size < 14) w.wartosci[p].add(v);
      } else if (v && typeof v === "object" && !Array.isArray(v)) {
        zbierzWartosci(w, v, p, gl + 1);
      }
    }
  }

  let wsCzytaneGniazdo=null, wsStanGniazdo=null;
  function analizujWS(dane) {
    wsWiadomosci++;
    if (typeof dane !== "string") { wsNieJSON++; return; }
    let o;
    try { o = JSON.parse(dane); } catch (e) { wsNieJSON++; return; }

    const kanal = o.channel || o.type || o.event || "(bez nazwy)";
    const temat = o.topic || o.subject || o.name || "";
    const tresc = o.data || o.payload || o;
    testWS(kanal,temat,tresc);
    const id = temat ? `${kanal} | ${temat}` : kanal;

    // 4.21: stan gry aktualizujemy ZAWSZE. Gromadzenie probek jest
    // opcjonalne, ale automatyka nie moze zalezec od tego, czy uzytkownik
    // wlaczyl diagnostyke ani od tego, ile roznych strumieni juz widzielismy.
    // W 4.20 obie te bramki wracaly z funkcji przed aktualizacja stanu,
    // wiec wylaczenie diagnostyki albo 41. strumien zamrazaly automatyke.
    try { czytajStanWS(kanal, tresc, temat); } catch (e) {}
    if (!DEV_UI || !cal || !cal.wsDiag) return;                    // dalej tylko probki
    if (!wsKanaly.has(id) && wsKanaly.size >= 40) return;
    const w = wsKanaly.get(id) ||
      { ile: 0, klucze: new Set(), wartosci: {}, ksztalt: "", pierwsza: "" };
    w.ile++;
    if (tresc && typeof tresc === "object" && !Array.isArray(tresc))
      for (const k of Object.keys(tresc)) w.klucze.add(k);
    zbierzWartosci(w, tresc, "", 0);
    const ks = ksztalt(tresc, 0);
    if (ks.length > w.ksztalt.length) w.ksztalt = ks;
    if (!w.pierwsza) w.pierwsza = skrot(tresc, 1400);   // przyciete, nie pelne
    wsKanaly.set(id, w);
  }

  // Wpis do dziennika bez zasmiecania listy bledow w pasku - zdarzen tarczy
  // jest kilkadziesiat na Lega, a pasek trzyma tylko 20 ostatnich pozycji.
  function wsLog(t) {
    if (!DEV_UI || !cal || !cal.wsDiag) return;
    dziennikPelny.push(`${czasSesji()}  WS  ${t}`);
    if (dziennikPelny.length > 4000) dziennikPelny.shift();
  }

  // Notujemy stan z danych obok stanu odczytanego z wygladu w tej samej
  // chwili. To jest ten pomiar, o ktory chodzi: roznica czasu miedzy
  // zdarzeniem z WebSocketa a momentem, w ktorym DOM to pokaze.
  // Na tym etapie tylko obserwujemy - nic jeszcze nie steruje wtyczka.
  // ---------- adapter stanu meczu ----------
  // Jeden obiekt zwiazany z konkretnym meczem i generacja polaczenia.
  // Wszystko, co dotad zgadywalismy z wygladu strony, ma tu odpowiednik.
  const st = {
    matchId: "", gen: 0, ostatniStan: 0, pelny: false, uniewazniony: "",
    player: null, players: [], gameScores: [], gameWinner: -1, typMeczu: "",
    gameFinished: false, leg: null, set: null, boardId: "",
    // 4.38: kanal boards nie mowi, ktora tarcza jest NASZA. W grze online
    // klient slucha obu naraz, wiec "pierwsza wygrywa" to rzut moneta.
    boardIds: [], boardPewny: false, boardNiepewny: false, boardPierwszaOd: 0,
    trasa: null,              // nazwy pol z checkoutGuide
    numThrows: null, takeout: false, tarczaStatus: "", tarczaOd: 0,
    // 4.20: kolejka jest REKORDEM z jawnym stanem pewnosci, nie liczba.
    // W 4.19 zapisywalismy gameScores[st.player] wprost w turn_start, a to
    // zdarzenie potrafi przyjsc PRZED aktualizacja pola player. W dzienniku
    // 4.19 dalo to trzy bledne poczatki kolejek (87 zamiast 81, 32 zamiast
    // 87, 57 zamiast 32) i checkout 17 przy zamknieciu z 32 - za kazdym
    // razem zapisany byl wynik przeciwnika.
    kolejka: { gracz: null, wynikOd: null, pewny: false, oczekuje: false,
               leg: null, set: null, matchId: "", bust: false,
               bustPewny: false, widziano: null, nr: 0 },
    kolejkaSkonczona: false, legZamkniety: false,
  };

  // Jedno miejsce tworzace rekord kolejki. Kazde pole ma tu wartosc
  // poczatkowa, wiec nic nie moze zostac po poprzedniej kolejce.
  function nowaKolejka(nr) {
    return { gracz: null, wynikOd: null, pewny: false, oczekuje: false,
             leg: st.leg, set: st.set, matchId: st.matchId, bust: false,
             bustPewny: false, widziano: null, nr: nr || 0 };
  }

  // Pelne surowe probki wybranych zdarzen - do odtworzenia protokolu
  // w tescie. Zbior enumow i najdluzszy ksztalt na to nie wystarczaja.
  const probkiCelowane = new Map();
  // 4.22: probka ma byc KOMPLETNYM malym obiektem, nie urwanym tekstem.
  // Migawka meczu wazy kilka kilobajtow przez chalkboards, stats i turns,
  // wiec proba "pelnej tresci" urywala sie w danych gospodarza, zanim
  // pokazala kluczowa flage turnBusted. Odrzucamy wielkie galezie
  // i zapisujemy reszte w calosci, z numerem kolejnosci odebrania.
  const CIEZKIE = ["chalkboards", "stats", "turns", "players", "host",
                   "scores", "skippedPlayers"];
  let nrProbki = 0;
  function zapiszProbke(nazwa, tresc) {
    if(!DEV_UI || !cal || !cal.wsDiag)return;
    const lista = probkiCelowane.get(nazwa) || [];
    if (lista.length >= 3) return;
    let male = tresc;
    if (tresc && typeof tresc === "object" && !Array.isArray(tresc)) {
      male = {};
      for (const k of Object.keys(tresc)) {
        if (CIEZKIE.includes(k)) {
          male[k] = Array.isArray(tresc[k])
            ? `<pominięto ${tresc[k].length} poz.>` : "<pominięto>";
        } else male[k] = tresc[k];
      }
    }
    let txt;
    try { txt = JSON.stringify(male); } catch (e) { txt = String(male); }
    lista.push(`#${++nrProbki} ${txt.length > 1800
      ? txt.slice(0, 1800) + "…(nadal za długie)" : txt}`);
    probkiCelowane.set(nazwa, lista);
  }

  // Temat bywa pelnym identyfikatorem meczu, ale nie mamy gwarancji, ze
  // zawsze. Porownanie na sztywno odcieloby caly strumien przy skroconej
  // postaci i wtyczka po cichu wrocilaby do czytania z wygladu. Wspolny
  // przedrostek osmiu znakow wystarczy, zeby odroznic inny mecz.
  function tenSamMecz(a, b) {
    if (!a || !b) return false;
    if (a === b) return true;
    const n = Math.min(a.length, b.length);
    return n >= 8 && a.slice(0, n) === b.slice(0, n);
  }

  function matchIdZUrl() {
    const m = location.pathname.match(/\/matches\/([0-9a-zA-Z-]+)/);
    return m ? m[1] : "";
  }

  // Zaufanie nie opiera sie na samym czasie. Dluga przerwa w rzucaniu jest
  // normalna i nie znaczy, ze dane sa nieaktualne. Tracimy je dopiero przy
  // zmianie meczu, usunieciu meczu albo braku pelnego stanu.
  function daneSwieze() {
    return st.pelny && !st.uniewazniony && st.matchId &&
      st.matchId === matchIdZUrl();
  }

  function resetStanu(powod, nowyId) {
    st.gen++;
    st.matchId = nowyId || "";
    // 4.21: czyscimy takze pamiec pomocnicza uzywana do porownan. Zostawiona
    // po poprzednim meczu potrafi wyciszyc pierwszy prawdziwy komunikat
    // nowego. boardId zostaje swiadomie - tarcza fizycznie sie nie zmienia
    // miedzy meczami przy tym samym stanowisku.
    wsWynik = null; wsWinner = null; wsLeg = null;
    wsThrows = null; wsGracz = null; wsOstatnieZdarzenie = "";
    domRzutyPoprz = -1; domDogonil = true;
    st.pelny = false; st.uniewazniony = "";
    st.player = null; st.players = []; st.gameScores = []; st.typMeczu = "";
    st.gameWinner = -1; st.gameFinished = false;
    st.leg = null; st.set = null; st.trasa = null;
    st.numThrows = null; st.takeout = false;
    st.kolejka = nowaKolejka(0);
    st.kolejkaSkonczona = false; st.legZamkniety = false;
    wsLog(`stan: reset (${powod})${nowyId ? " mecz " + nowyId.slice(0, 8) : ""}`);
  }

  // Czy w tej kolejce zostala jeszcze lotka do rzucenia. To jest warunek,
  // ktorego dotad nie mielismy wcale: zabezpieczenie "wracaj po trzeciej
  // lotce" opieralo sie na liczniku z DOM, ktory w calym dzienniku 4.17
  // pokazywal 1, wiec nie moglo zadzialac ani razu.
  // 4.22: PODEJRZENIE bustu nie konczy kolejki. W 4.21 zmienil sie sam opis,
  // a skutek zostal ten sam: korekta rzutu takze podnosi wynik i blokowala
  // lotke jak prawdziwy bust. Kolejke konczy wylacznie flaga protokolu.
  function lotkaDostepna() {
    if (st.kolejkaSkonczona || st.legZamkniety) return false;
    if (st.kolejka.bustPewny) return false;
    if (st.takeout) return false;
    return st.numThrows === null || st.numThrows < 3;
  }

  // Jedno zrodlo checkoutu dla nazwy pliku, progu autozapisu, kontekstu
  // powtorki i wpisu o zamknieciu Lega. Brak dowodu poczatku kolejki
  // zwraca "nieznany", nigdy zera ani wyniku rywala.
  function checkoutKolejki() {
    const k = st.kolejka;
    return (k.pewny && typeof k.wynikOd === "number")
      ? { wartosc: k.wynikOd, pewny: true }
      : { wartosc: null, pewny: false };
  }

  // Rozstrzygniecie oczekujacej kolejki dopiero wtedy, gdy znamy gracza
  // i jego wynik. Odporne na obie kolejnosci dostarczenia wiadomosci.
  function domknijKolejke(zrodlo) {
    const k = st.kolejka;
    if (!k.oczekuje || st.player === null) return;
    const w = st.gameScores[st.player];
    if (typeof w !== "number") return;
    // Migawka jest wiarygodnym poczatkiem kolejki tylko wtedy, gdy zadna
    // lotka jeszcze nie poleciala. Jesli pierwszy stan po turn_start
    // przychodzi juz PO rzucie, jego wynik jest mniejszy od poczatku
    // kolejki - zapisanie go dawaloby cichy, wiarygodnie wygladajacy blad.
    // Wolimy jawne "nieznany" niz liczbe bez pokrycia.
    if (typeof st.numThrows === "number" && st.numThrows > 0) {
      k.oczekuje = false; k.pewny = false; k.wynikOd = null;
      k.gracz = st.player; k.leg = st.leg;
      wsLog(`kolejka #${k.nr}: gracz ${k.gracz}, początek NIEZNANY — ` +
        `pierwsza migawka przyszła po ${st.numThrows} rzutach`);
      return;
    }
    k.gracz = st.player; k.wynikOd = w; k.pewny = true;
    k.oczekuje = false; k.leg = st.leg; k.set = st.set;
    k.matchId = st.matchId; k.bust = false; k.bustPewny = false;
    k.widziano = w;
    wsLog(`kolejka #${k.nr}: gracz ${k.gracz}, od ${w} (${zrodlo})`);
  }

  // W LOCAL obaj gracze rzucaja do tej samej tarczy, wiec obaj sa nasi.
  // Nazwa z ustawien nie moze tu niczego blokowac - w dzienniku 4.17
  // gracz=GRACZ_A przy GRACZ_C/GRACZ_D dawal "kolejka przeciwnika" caly mecz.
  function graczLokalny() {
    if (!daneSwieze() || st.player === null) return true;
    if (!czyOnline()) return true;
    const p = st.players[st.player];
    if (!p) return true;
    if (st.boardId && p.boardId) return p.boardId === st.boardId;
    const moja = (cal.gracz || "").trim().toUpperCase();
    return !moja || String(p.name || "").toUpperCase() === moja;
  }

  function czytajStanWS(kanal, d, temat) {
    if (!d || typeof d !== "object") return;

    // Bledy protokolu nie sa danymi gry. Na temacie starego meczu potrafi
    // przyjsc {type:"error", error:"match not found"} - gdyby wpadlo do
    // aktualizacji stanu, wygladaloby jak niepelny stan biezacego meczu.
    if (d.type === "error" || d.error) {
      wsLog(`protokół: błąd na ${temat || kanal} — ${d.error || "?"} (pomijam)`);
      return;
    }

    if (kanal === "autodarts.boards") {
      const idTarczy = temat ? temat.split(".")[0] : "";
      if (idTarczy && !st.boardIds.includes(idTarczy)) {
        st.boardIds.push(idTarczy);
        if (st.boardIds.length === 1) st.boardPierwszaOd = Date.now();
        else if (!st.boardPewny) {
          st.boardNiepewny = true;
          wsLog(`widzę ${st.boardIds.length} tarcze — kolejność kanałów nie wskazuje mojej`);
        }
      }
      // Zamek dopiero po chwili ciszy. Jesli w tym czasie pojawi sie druga
      // tarcza, nie zgadujemy - tozsamosc bierze sie wtedy z nicku gracza.
      if (!st.boardId && idTarczy && st.boardIds.length === 1 &&
          Date.now() - st.boardPierwszaOd > 4000) {
        st.boardId = idTarczy; st.boardPewny = true;
        if (!cal.mojaTarcza) { cal.mojaTarcza = idTarczy; save(); }
        wsLog(`tarcza lokalna: ${anonimizuj(idTarczy)} (jedyna w sesji)`);
      }
      const mojaT = idMojejTarczy();
      if (mojaT && idTarczy && idTarczy !== mojaT) return;  // obca tarcza
      const status = d.status || "";
      // "Takeout in progress" i "Takeout started" znacza, ze lotki sa
      // wyjmowane. Zerowanie numThrows przy wyjmowaniu NIE oznacza jeszcze
      // nowej kolejki - te ogłasza dopiero turn_start.
      const bylo = st.takeout;
      st.takeout = /takeout/i.test(status) || /takeout started/i.test(d.event || "");
      if (typeof d.numThrows === "number") st.numThrows = d.numThrows;
      st.tarczaStatus = status; st.tarczaOd = Date.now();
      if (typeof d.numThrows === "number" && d.numThrows !== wsThrows) {
        wsThrows = d.numThrows;
        wsThrowCzas = Date.now();
        domDogonil = false;
        wsLog(`tarcza: ${d.event || status || "?"} numThrows=${d.numThrows}` +
          `  (DOM w tej chwili: ${domRzutyPoprz < 0 ? "-" : domRzutyPoprz})`);
      } else if (d.event && d.event !== wsOstatnieZdarzenie) {
        wsOstatnieZdarzenie = d.event;
        wsLog(`tarcza: ${d.event}  status=${status || "-"}`);
      }
      if (bylo !== st.takeout) wsLog(`tarcza: wyjmowanie=${st.takeout ? "tak" : "nie"}`);
      return;
    }

    if (kanal !== "autodarts.matches") return;
    const biezacy = matchIdZUrl();
    const temMecz = temat ? temat.split(".")[0] : "";

    // Usuniecie meczu unieważnia jego automatyke. Opozniony komunikat
    // o STARYM meczu nie moze skasowac nowego.
    if (d.event === "delete" || (d.body && d.body.event === "delete")) {
      if (temMecz && tenSamMecz(temMecz, st.matchId)) {
        st.uniewazniony = "mecz usunięty";
        wsLog("stan: mecz usunięty — automatyka z danych wyłączona");
      } else {
        wsLog(`stan: usunięcie starego meczu ${temMecz.slice(0, 8)} — pomijam`);
      }
      return;
    }
    if (temMecz && biezacy && !tenSamMecz(temMecz, biezacy)) {
      wsLog(`stan: wiadomość starego meczu ${temMecz.slice(0, 8)} — pomijam`);
      return;
    }
    if (biezacy && st.matchId !== biezacy) resetStanu("nowy mecz w adresie", biezacy);

    // --- zdarzenia gry ---
    if (d.event && d.body !== undefined) {
      const e = d.event, b = d.body || {};
      if (e !== "throw") zapiszProbke(e, d);
      if (e === "turn_start") {
        // 4.21: KOMPLETNY nowy rekord. W 4.20 resetowalismy wybrane pola,
        // ale zostawalo "widziano" po poprzednim graczu. Detektor bustu
        // porownywal potem wynik nowego gracza z wynikiem poprzedniego
        // i w dzienniku 4.20 kazda zmiana gracza dawala falszywy bust
        // ("wynik wrocil z 80 do 91"), a lotkaDostepna() blokowala zoom.
        const nr = st.kolejka.nr + 1;
        st.kolejka = nowaKolejka(nr);
        const k = st.kolejka;
        st.kolejkaSkonczona = false;
        // Zdarzenie niesie wynik i gracza tylko czasem. Gdy niesie -
        // bierzemy stad, bo to nie zalezy od kolejnosci wiadomosci.
        // Gdy nie - oznaczamy oczekiwanie i domykamy przy najblizszym
        // stanie, ktory poda i gracza, i wyniki. Nigdy nie zapisujemy
        // wyniku poprzedniego gracza jako pewnego poczatku nowej kolejki.
        const wynikZeZdarzenia = typeof b.score === "number" ? b.score : null;
        // 4.21: identyfikator ma pierwszenstwo przed nazwa. Dwie osoby moga
        // grac pod ta sama nazwa, a zerowy UUID w playerId oznacza BRAK
        // tozsamosci, nie gracza - w danych wystepuje przy game_on.
        const zerowy = /^[0-]+$/;
        let graczZeZdarzenia = -1;
        if (typeof b.playerId === "string" && !zerowy.test(b.playerId))
          graczZeZdarzenia = st.players.findIndex(x => x && x.id === b.playerId);
        if (graczZeZdarzenia < 0 && typeof b.playerIndex === "number")
          graczZeZdarzenia = b.playerIndex;
        if (graczZeZdarzenia < 0 && typeof b.player === "string") {
          const traf = st.players.filter(x => x && x.name === b.player);
          // Nazwa rozstrzyga tylko wtedy, gdy jest jednoznaczna.
          if (traf.length === 1)
            graczZeZdarzenia = st.players.indexOf(traf[0]);
        }
        if (wynikZeZdarzenia !== null && graczZeZdarzenia >= 0) {
          k.gracz = graczZeZdarzenia; k.wynikOd = wynikZeZdarzenia;
          k.pewny = true; k.oczekuje = false;
          wsLog(`gra: turn_start — kolejka #${k.nr} gracz ${k.gracz} od ${k.wynikOd} (ze zdarzenia)`);
        } else {
          k.oczekuje = true;
          wsLog(`gra: turn_start — kolejka #${k.nr}, czekam na ustalenie gracza`);
        }
      } else if (e === "turn_end") {
        st.kolejkaSkonczona = true;
        wsLog("gra: turn_end");
      } else if (e === "game_shot") {
        st.legZamkniety = true;
        const c = checkoutKolejki();
        wsLog(`gra: game_shot — Leg zamknięty (checkout ` +
          `${c.pewny ? c.wartosc : "nieznany"})`);
      } else if (e === "game_on") {
        // playerId bywa zerowym UUID - to brak tozsamosci, nie gracz.
        st.legZamkniety = false; st.kolejkaSkonczona = false;
        st.trasa = null; st.numThrows = 0;
        if (typeof b.leg === "number") st.leg = b.leg;
        if (typeof b.set === "number") st.set = b.set;
        st.kolejka = nowaKolejka(0);
        // 4.22: jawne OCZEKIWANIE, niezalezne od zmiany indeksu gracza.
        // W 4.21 nowy Leg dostawal rekord z oczekuje=false, wiec przy tym
        // samym aktywnym graczu nic go juz nie uzgadnialo i checkout
        // zostawal nieznany do konca Lega. Nie ufamy przy tym polu
        // game_on.body.player: w danych wskazuje GRACZ_C, a indeks 0
        // w migawkach to GRACZ_D - znaczenie tego pola jest nierozstrzygniete.
        st.kolejka.oczekuje = true;
        wsLog(`gra: game_on — nowy Leg ${st.leg === null ? "?" : st.leg}, ` +
          `czekam na uzgodnienie początku kolejki`);
      }
      return;
    }

    // --- pelny stan meczu ---
    if (!Array.isArray(d.gameScores) || !Array.isArray(d.players)) return;
    if (!st.pelny && st.uniewazniony === "połączenie zerwane") {
      st.uniewazniony = "";
      wsLog(`zaufanie odzyskane po pełnej migawce (gniazdo #${gniazdoGen})`);
    }
    if(wsCzytaneGniazdo)wsStanGniazdo=wsCzytaneGniazdo;
    st.pelny = true; st.ostatniStan = Date.now();
    if (d.id) st.matchId = d.id;
    // Zmiana lega przed uzgadnianiem gracza, rzutow i wyniku - inaczej
    // kontekst uzgodniony w tym samym przebiegu bylby zaraz kasowany.
    if (typeof d.leg === "number" && st.leg !== null && d.leg !== st.leg) {
      st.legZamkniety = false; st.kolejkaSkonczona = false;
      st.kolejka = nowaKolejka(0);
      st.kolejka.leg = d.leg;
      st.kolejka.oczekuje = true;      // jak przy game_on
    }
    // Rodzaj meczu przychodzi w danych: "Local" albo "Match Making".
    if (typeof d.type === "string" && d.type) st.typMeczu = d.type;
    st.players = d.players;
    st.gameScores = d.gameScores.slice();
    if (typeof d.leg === "number") st.leg = d.leg;
    if (typeof d.set === "number") st.set = d.set;
    // 4.21: lokalnej tarczy NIE wyznaczamy z players[0]. W grze zdalnej
    // gracz 0 bywa przeciwnikiem. Bierzemy ja z tematu kanalu boards -
    // to jest tarcza, ktora faktycznie do nas nadaje.

    const trasa = d.state && Array.isArray(d.state.checkoutGuide)
      ? d.state.checkoutGuide.map(x => x && x.name).filter(Boolean) : null;
    const trasaTxt = trasa ? trasa.join("+") : "";
    if (trasaTxt !== (st.trasa ? st.trasa.join("+") : "")) {
      st.trasa = trasa && trasa.length ? trasa : null;
      wsLog(`mecz: trasa=[${trasaTxt || "-"}]  (DOM trasa=${routeLen ? routeLen + " pól" : "-"})`);
    }

    const t = d.gameScores.join(",");
    if (t !== wsWynik) {
      wsWynik = t;
      wsLog(`mecz: gameScores=[${t}]  (DOM zost=${remaining === null ? "-" : remaining})`);
    }
    if (typeof d.player === "number" && d.player !== st.player) {
      const poprz = st.player;
      st.player = d.player; wsGracz = d.player;
      // Zmiana gracza to nowa kolejka takze wtedy, gdy obaj maja ten sam cel.
      if (poprz !== null) {
        st.kolejkaSkonczona = false;
        if (!st.kolejka.pewny || st.kolejka.gracz !== d.player) {
          st.kolejka.oczekuje = true; st.kolejka.bust = false;
        }
      }
      wsLog(`mecz: player=${d.player}  (DOM kolejka=${turnState})`);
    }
    domknijKolejke("ze stanu");
    // 4.21: bust rozstrzyga FLAGA PROTOKOLU, nie sama arytmetyka.
    // turnBusted jest polem glownym migawki, nie d.state.turnBusted -
    // stary kod pytal o zla sciezke, wiec flaga nigdy nie dzialala.
    // Heurystyka "wynik wzrosl" zostaje wylacznie jako sygnal niepewny
    // i tylko w obrebie JEDNEJ kolejki tego samego gracza: korekta rzutu
    // takze podnosi wynik, a to nie jest bust.
    const k = st.kolejka;
    // Pierwsza migawka może przyjść w środku kolejki: znamy jej gracza,
    // ale nie ogłaszamy przez to pewnego wyniku początkowego.
    if (k.gracz === null && Number.isInteger(d.player) && st.players[d.player]) {
      k.gracz = d.player; k.matchId = st.matchId; k.leg = st.leg; k.set = st.set;
    }
    // Flaga podnosi podejrzenie do potwierdzenia takze wtedy, gdy heurystyka
    // zadzialala wczesniej - w 4.21 warunek !k.bust to blokowal.
    if (d.turnBusted === true && !k.bustPewny && k.gracz === d.player &&
        k.matchId === st.matchId && k.leg === st.leg) {
      k.bust = true; k.bustPewny = true;
      wsLog(`mecz: bust potwierdzony flagą turnBusted (kolejka #${k.nr})`);
      zapiszProbke("turnBusted", d);
    }
    // Jawne false znaczy: ta kolejka NIE jest zbustowana. Cofa wczesniejsze
    // podejrzenie i wyklucza podniesienie nowego z tej samej migawki -
    // wzrost wyniku jest wtedy korekta rzutu, nie bustem.
    const flagaMowiNie = d.turnBusted === false;
    if (flagaMowiNie && k.bust && k.gracz === d.player &&
        k.matchId === st.matchId && k.leg === st.leg) {
      const bylPewny = k.bustPewny;
      k.bust = false; k.bustPewny = false;
      // Nie kasujemy niezależnego turn_end bez dowodu ponownego otwarcia.
      const p = st.players[d.player];
      const t = Array.isArray(d.turns) && d.turns.length === 1 ? d.turns[0] : null;
      if (bylPewny && t && p && t.playerId === p.id && t.busted === false &&
          Array.isArray(t.throws) && t.throws.length < 3 &&
          typeof t.finishedAt === "string" && /^0001-01-01T00:00:00/.test(t.finishedAt)) {
        st.kolejkaSkonczona = false;
      }
      wsLog(`mecz: bust cofnięty przez stan — turnBusted=false (kolejka #${k.nr})`);
    }
    if (k.pewny && k.gracz !== null && k.matchId === st.matchId &&
        k.leg === st.leg) {
      const teraz = d.gameScores[k.gracz];
      if (typeof teraz === "number") {
        if (k.widziano === null) k.widziano = teraz;
        else if (!k.bust && !flagaMowiNie && teraz > k.widziano) {
          k.bust = true; k.bustPewny = false;   // podejrzenie, bez skutkow
          wsLog(`mecz: podejrzenie bustu — wynik gracza ${k.gracz} wzrósł ` +
            `z ${k.widziano} do ${teraz} w kolejce #${k.nr} ` +
            `(niepewne: to może być korekta rzutu)`);
          zapiszProbke("bust", d);
        }
        k.widziano = teraz;
      }
    }
    if (typeof d.gameWinner === "number" && d.gameWinner !== wsWinner) {
      wsWinner = d.gameWinner; st.gameWinner = d.gameWinner;
      if (d.gameWinner >= 0) {
        st.legZamkniety = true;
        wsLog(`mecz: gameWinner=${d.gameWinner} — koniec Lega w danych ` +
          `(DOM legWon=${legSeen ? "tak" : "nie"})`);
      }
    }
    if (typeof d.gameFinished === "boolean") st.gameFinished = d.gameFinished;
    // 4.21: zmiana lega jest obsluzona NA POCZATKU aktualizacji (patrz
    // wyzej), zeby nie kasowac na koncu tego samego przebiegu kontekstu
    // kolejki, ktory wlasnie zostal uzgodniony. Tutaj zostaje sam wpis.
    if (typeof d.leg === "number" && d.leg !== wsLeg) {
      wsLeg = d.leg;
      wsLog(`mecz: leg=${d.leg}`);
    }
  }

  (function podsluchWS() {
    const Orig = window.WebSocket;
    if (!Orig || Orig.__adcam) return;
    const Nowy = function (...a) {
      const gniazdo = new Orig(...a);
      try {
        gniazdo.addEventListener("message",
          ev => { wsCzytaneGniazdo=gniazdo; try { analizujWS(ev.data); } catch (e) {} finally { wsCzytaneGniazdo=null; } });
        // 4.22: zerwane polaczenie to jedyny powod utraty zaufania oparty
        // na ZDARZENIU, a nie na czasie. Spokojna przerwa w rzucaniu jest
        // poprawnym stanem i nie moze niczego uniewazniac. Zaufanie wraca
        // przy najblizszej pelnej migawce biezacego meczu.
        gniazdo.addEventListener("close", () => {
          if(gniazdo!==wsStanGniazdo)return;
          wsStanGniazdo=null;
          dodajTest('disconnect',{});
          gniazdoGen++;
          if (st.pelny) {
            st.pelny = false;
            st.uniewazniony = "połączenie zerwane";
            wsLog("połączenie WebSocket zerwane — czekam na pełny stan");
          }
        });
        gniazdo.addEventListener("error",
          () => wsLog("połączenie WebSocket zgłosiło błąd"));
      } catch (e) {}
      return gniazdo;
    };
    Nowy.prototype = Orig.prototype;
    for (const k of ["CONNECTING", "OPEN", "CLOSING", "CLOSED"]) Nowy[k] = Orig[k];
    Nowy.__adcam = true;
    try { window.WebSocket = Nowy; } catch (e) {}
  })();
  const STORE = "adCamOverlay7"; // Keep existing user settings during rename.
  const SVGNS = "http://www.w3.org/2000/svg";

  // Rzeczy techniczne, ktorych sie nie rusza z poziomu okna ustawien.
  const CONFIG = {
    tryby: [
      { w: 1920, h: 1080, fps: 60, exact: true },
      { w: 1280, h: 720, fps: 60, exact: true },
      { w: 1920, h: 1080, fps: 30 },
      { w: 1280, h: 720, fps: 30 },
      { w: 960, h: 540, fps: 30 },
      { w: 640, h: 360, fps: 15 },
    ],

  };

  // Wszystko ponizej jest zapisywane i edytowalne w oknie ustawien.
  const DEF = {
    // kolo
    dx: 0, dy: 0, cover: 1.02,
    marginesNumerow: 24, punktowa: null, cameraDeviceId: "", obrazWl: true, ui426: false,
    // obraz
    vx: 0, vy: 0, vz: 1.0,
    rx: 0, ry: 0, rz: 0, persp: 1400,
    sx: 1.0, sy: 1.0,
    // celowanie zoomu
    bcx: 0, bcy: 0, brad: 1.0,
    // zoom
    zoomWl: true, zoomSila: 2.2, zoomProg: 60,
    zoomWjazdMs: 900, zoomWyjazdMs: 500,
    zoomDryf: true, zoomDryfSila: 1.10, zoomDryfMs: 7000,
    zoomPoTrzeciej: true, zoomMaxSek: 0,
    // powtorki
    powWl: true, powSek: 4, powTempo: 0.35,
    powOgonMs: 1200, powPauzaMs: 2200, powRozmiar: 0.78, powZoom: 1.0,
    powPrzyciemnienie: 0.94,
    powRecznaSek: 12, powBuforSek: 40, powPytajOZapis: true,
    powPetla: false, powAutoZapisProg: 0, powPoKoniecSek: 5,
    powTylkoMoje: true, powBitrate: 8, ukryjBullOff: true,
    maxSzer: 1280,
    powZoomWl: false,
    trybOnline: false, trybGry: "auto", diagOkno: true,
    // Zapis dziennika co kilka minut i gromadzenie probek WebSocketa to
    // narzedzia diagnostyczne. Powodem wylaczenia ich w wydaniu publicznym NIE
    // jest wydajnosc: zmierzone 1345 wiadomosci przez 230 minut sesji, czyli
    // szesc na minute - to nie jest koszt, o ktorym mowi regula 7. Powodem
    // jest to, ze wlasnie te probki niosa dane meczu i nazwy ludzi, a plik
    // rosnie do 1,65 MB. Odczyt stanu meczu dziala niezaleznie (4.21).
    // Maskowanie tozsamosci odwrotnie - zawsze wlaczone.
    dziennikAuto: DEV_UI, dziennikCoMin: 3, wsDiag: DEV_UI, wsAnonim: true,
    powTryb: "auto", powFormat: "", powFolder: false, powMp4Eksperyment: false,
    // pozostale
    // Puste domyslne: nick bierze sie z konta zalogowanego w Autodarts,
    // a nazwa kamery z listy urzadzen. Zadne z tych pol nie moze byc
    // wypelnione danymi jednej osoby w wydaniu publicznym.
    kamera: "", gracz: "", mojaTarcza: "", jezyk: "auto", preferTag: "img",
    chowajUPrzeciwnika: false,
    manual: false, size: 600, refSize: 0, geometriaSvg: null,
    _migr412: false, _migr417: false,
  };

  // Raport z 4.16 pokazal trzy zalamania tempa rysowania do 1/s, kazde
  // tuz po odswiezeniu bufora nagrania, przy 16 Mb/s. Zalecane jest 8,
  // ale zapisana kalibracja trzymala 16 i samo podniesienie DEF by tego
  // nie ruszylo. Obnizamy raz, glosno, z wpisem w dzienniku.
  let migracja417 = "";

  let cal = load();
  function load() {
    try {
      const r = localStorage.getItem(STORE);
      if (r) {
        const raw=JSON.parse(r);
        const c = Object.assign({}, DEF, raw);c.powTryb=trybZapisu(raw);
        c.powPetla = false;   // pętla działa tylko w bieżącej sesji
        if (/^mp4/.test(c.powFormat || "")) c.powFormat = "";
        if (c.powFormat === "webm-vp9" && !c._migr412) {
          c.powFormat = ""; c.powBitrate = Math.min(c.powBitrate, 8);
        }
        c._migr412 = true;
        if (!c._migr417) {
          if (c.powBitrate > 8) {
            migracja417 = `bitrate nagrania obniżony z ${c.powBitrate} ` +
              `na 8 Mb/s (odświeżanie bufora zatykało wątek główny)`;
            c.powBitrate = 8;
          }
          c._migr417 = true;
        }
        if (!c.ui426) { c.diagOkno = false; c.ui426 = true; }
        if(!DEV_UI){c.dziennikAuto=false;c.wsDiag=false;c.diagOkno=false;c.wsAnonim=true;}
        return c;
      }
    } catch (e) {}
    return Object.assign({}, DEF, {ui426:true,diagOkno:false});
  }
  function save() {
    try { localStorage.setItem(STORE, JSON.stringify(cal)); } catch (e) {}
  }

  // ---------- stan ----------
  let wrap, zoomLayer, video, replayVideo, guide, backdrop;
  let hud, okno, zakladki = {}, karty = {};
  let aktywnaKarta = "obraz";
  let oknoOtwarte = false, hudWidoczny = true;
  let showGuide = false, coversCircle = true, visible = true;
  let scaleK = 1, lastK = -1, curSize = 600, locked = null;
  let camState = "start...", camOk = false, proby = [];
  let boardState = "szukam...", turnState = "-";
  let zoomState = "-", replayState = "-";
  let remaining = null, routeLen = 0;
  let rec = null, chunks = [], pendingBlob = null;
  // 4.18: jeden wlasciciel rejestratora. Numer generacji odcina fragmenty
  // spoznione z poprzedniego nagrania i unieważnia migawki w locie.
  let recGen = 0, recStan = "start", bufowanie = false;
  let zamykanieNagrania = null, nagrywanieNajwczesniej = 0;
  let doZwolnienia = [], klatkiGen = 0, bajtyBufora = 0;
  let czekamNaPierwszyFragment = false, startNowego = 0;
  let inReplay = false, replayPhase = "off", legSeen = false, lastReplay = 0;
  let heldTarget = null, testUntil = 0;
  let recStart = 0, dlugoscUjecia = 4, trybPowtorki = "auto";
  let pytanie = null, pytanieDo = 0;
  let pasekPow = null, przerwijBiezaca = null, pauza = false;
  // 4.21: sesja powtorki ma identyfikator od chwili PRZYGOTOWANIA. Wczesniej
  // przerwijBiezaca powstawalo dopiero w startPlayback, wiec Esc w fazie
  // przygotowania nie mial czego przerwac, a spozniony callback ze starej
  // powtorki potrafil zamknac nowa.
  let sesjaPow = 0;
  let przyciskZapisz = null;
  let powDlugosc = 0, powBufSek = 0, suwakCzasu = null, etykCzasu = null, przeciagam = false;
  let checkoutMax = 0, checkoutPowtorki = 0, poprzRemaining = null;
  let czekanieDo = 0, odNowa = null, pauzaOdOkna = false;
  let oknoPowOd = null, sprzatajPow = null;

  // Wspólny widok dla odtwarzania, pauzy użytkownika i stopklatki.
  function widokPowtorki() {
    return inReplay && (replayPhase === "gra" || replayPhase === "stopklatka");
  }

  function synchronizujOknoPowtorki() {
    if (!inReplay) { oknoPowOd = null; pauzaOdOkna = false; return; }
    if (oknoAplikacji) {
      if (oknoPowOd === null) oknoPowOd = Date.now();
      pauzaOdOkna = true;
      if (replayVideo && !replayVideo.paused) replayVideo.pause();
    } else if (oknoPowOd !== null) {
      if (czekanieDo > 1) czekanieDo += Date.now() - oknoPowOd;
      oknoPowOd = null; pauzaOdOkna = false;
      if (replayPhase === "gra" && !pauza && !replayVideo.ended)
        replayVideo.play().catch(() => {});
    }
  }

  let autotestOkna=null, wynikAutotestu='nie uruchomiono';
  function usunOknoTestowe(t){
    if(t?.dialog){t.dialog.remove();t.dialog=null;}
    drzewoZmienione=true;oknoSprawdzone=0;
  }
  function anulujAutotest(){
    if(!autotestOkna)return;
    autotestOkna.cancelled=true;usunOknoTestowe(autotestOkna);
  }
  async function testPowtorkiIOkna(){
    if(autotestOkna)return toast('Test już trwa');
    if(inReplay||kreator||oknoAplikacjiOtwarte())return toast('Zamknij powtórkę i okna przed testem');
    if(!rec||rec.state!=='recording')return toast('Test wymaga nagrywania w meczu i kilku sekund materiału');
    if(cal.powPetla||cal.powPoKoniecSek<5)return toast('Do testu wyłącz pętlę i ustaw stopklatkę na co najmniej 5 s');
    const t={cancelled:false,dialog:null,checks:[]};autotestOkna=t;
    const delay=ms=>new Promise(resolve=>setTimeout(resolve,ms));
    const check=(name,ok)=>{t.checks.push({name,ok:!!ok});zaloguj('AUTOTEST '+(ok?'OK ':'BŁĄD ')+name);if(!ok)throw Error(name);};
    const wait=async(fn,ms)=>{
      const start=Date.now();
      while(!fn()){
        if(t.cancelled)throw Error('anulowano');
        if(Date.now()-start>=ms)throw Error('limit oczekiwania');
        await delay(100);
      }
      if(t.cancelled)throw Error('anulowano');
    };
    const refresh=()=>{oknoAplikacjiOtwarte();place();};
    const open=()=>{
      const d=document.createElement('div');
      // Deliberately passes the same external-dialog detector as Autodarts.
      d.setAttribute('role','dialog');d.setAttribute('aria-modal','true');d.setAttribute('aria-label','Test powtórki — okno kontrolne');
      Object.assign(d.style,{position:'fixed',left:'15vw',top:'25vh',width:'70vw',height:'50vh',zIndex:'12000',background:'#142331',color:'white',padding:'24px',boxSizing:'border-box',borderRadius:'12px'});
      const text=document.createElement('p');text.textContent='Trwa automatyczny test. To okno zniknie samo. Kamera i mecz nadal działają.';d.appendChild(text);
      const cancel=document.createElement('button');cancel.textContent='Anuluj test';cancel.addEventListener('click',()=>anulujAutotest());d.appendChild(cancel);
      t.dialog=d;document.body.appendChild(d);drzewoZmienione=true;oknoSprawdzone=0;refresh();
    };
    try{
      wynikAutotestu='w toku';zaloguj('AUTOTEST start — okno syntetyczne, nie Board control');
      probujPowtorke('reczna','autotest okna');
      await wait(()=>inReplay&&replayPhase==='gra'&&!replayVideo.paused,15000);
      await delay(300);if(t.cancelled)throw Error('anulowano');
      open();
      check('wykrycie okna',elementOknaAplikacji===t.dialog);
      check('ukrycie filmu i tła',wrap.style.display==='none'&&backdrop.style.display==='none'&&backdrop.style.pointerEvents==='none');
      check('pauza filmu',replayVideo.paused);
      const before=replayVideo.currentTime;await delay(2000);if(t.cancelled)throw Error('anulowano');refresh();
      check('czas filmu zatrzymany',Math.abs(replayVideo.currentTime-before)<.12);
      usunOknoTestowe(t);refresh();
      await wait(()=>!replayVideo.paused&&replayVideo.currentTime>before+.05,5000);
      check('wznowienie i widoczność',wrap.style.display==='block'&&backdrop.style.display==='block');
      // Exercise the actual ended path, without changing replay settings.
      replayVideo.currentTime=Math.max(0,powDlugosc-.15);
      await wait(()=>replayPhase==='stopklatka',6000);
      open();const deadline=czekanieDo,opened=oknoPowOd;
      check('stopklatka ma zegar',deadline>1&&opened!==null);
      const endTime=replayVideo.currentTime;await delay(2000);if(t.cancelled)throw Error('anulowano');
      usunOknoTestowe(t);refresh();
      check('przesunięcie zegara stopklatki',czekanieDo>=deadline+1800);
      check('koniec filmu bez restartu',replayPhase==='stopklatka'&&replayVideo.paused&&Math.abs(replayVideo.currentTime-endTime)<.12);
      wynikAutotestu='OK — '+t.checks.length+' kontroli okna syntetycznego';toast(wynikAutotestu);
    }catch(e){wynikAutotestu=(t.cancelled?'ANULOWANO':'NIEZALICZONY')+' — '+e.message;toast(wynikAutotestu);}
    finally{
      usunOknoTestowe(t);autotestOkna=null;refresh();
      zaloguj('AUTOTEST wynik: '+wynikAutotestu);drawHud();
    }
  }

  function wyjdzZeStopklatki() {
    if (replayPhase !== "stopklatka") return;
    replayPhase = "gra"; czekanieDo = 0;
    // Przewijanie opuszcza stopklatkę, ale zachowuje pauzę użytkownika.
  }
  let zrodloPowtorki = "-", czasPowtorki = "-", legPowod = "-";
  let fokus = {}, szczegoly = false, hudBtn = null;
  let fpsLicznik = 0, fpsZmierzone = 0, fpsOkno = 0;
  let uiLicznik = 0, uiFps = 0, uiOkno = 0;
  let msKlatki = 0, skanyLicznik = 0, skanyNaSek = 0, skanyOkno = 0;
  let liczbaElem = 0, elemCzas = 0, niskieOd = 0, niskieZgloszone = false;
  let zoomTx = 0, zoomTy = 0, powodUkrycia = "-";
  let rzutyTeksty = [], fragmCzas = 0, fragmNaSek = 0, fragmPoprz = 0;
  let dlugoscPliku = 0, korektaCzasu = 1;
  let logBledow = [], dziennikPelny = [], startCzas = Date.now();
  let migawkaCzas = 0, licznikZnacznikow = 0;
  let nazwaDziennika = "", ostatniZapisD = 0, stanZapisu = "—";
  let zoomEtap = 0, zoomOd = 0, ostatniCel = "", zoomAktualny = 1;
  // pomiar wyprzedzenia danych nad wygladem oraz kosztu restartu bufora
  let domRzutyPoprz = -1, domDogonil = true, wsOstatnieZdarzenie = "";
  let restartOd = 0, ostatniRestart = 0, odstepyPoRestarcie = null;
  let klatkiInfo = { gen: 0, przyrost: 0, okno: 0, presented: null,
                     media: null, brakMeta: false };
  const recCzynne = new Set();
  let uiProbki = [];
  let rzutyTeraz = 0, heldTargetTxt = "", rzutyBaza = null;
  let kontekstPow = null;
  // 4.20: zrodlo per pole, odswiezane niezaleznie od zoomu. W 4.19 etykieta
  // ustawiala sie wylacznie w checkoutTarget, a ta funkcja nie jest wolana
  // przy zoomWl=false - przez caly dziennik 4.19 wszystkie 105 migawek
  // pokazywalo "wygląd" mimo swiezych danych i poprawnego meczu.
  const zrodla = { gracz: "-", wynik: "-", trasa: "-", rzuty: "-", leg: "-", jaGracz: "-" };
  let powodFallbacku = "";
  let rzutyDOM = 0;
  let msg = "", msgUntil = 0;

  function toast(tekst) { msg = t(tekst); msgUntil = Date.now() + 3000; }

  function czasSesji() {
    const x = Math.floor((Date.now() - startCzas) / 1000);
    return `${String(Math.floor(x / 60)).padStart(2, "0")}:` +
           `${String(x % 60).padStart(2, "0")}`;
  }

  function zaloguj(t) {
    if(!DEV_UI)return;
    dodajTest('action',{text:String(t)});
    dziennikPelny.push(`${czasSesji()}  ${t}`);
    if (dziennikPelny.length > 4000) dziennikPelny.shift();
    logBledow.unshift(`${czasSesji()}  ${t}`);
    logBledow = logBledow.slice(0, 20);
    // Konsola strony nalezy do Autodarts, nie do nas. W wydaniu publicznym
    // milczymy - dziennik i tak trafia do bufora powyzej, a stan awaryjny ma
    // widoczny powod w panelu (regula 6). Przy pracy nad kodem chcemy go
    // widziec na zywo, wiec w wydaniu roboczym zostaje.
    if (DEV_UI) console.log("[adCam]", czasSesji(), t);
  }

  // Zwiezly stan w jednej linii - zapisywany cyklicznie, zeby dziennik
  // byl osia czasu, a nie tylko lista zdarzen.
  // Jedno miejsce, w ktorym ustala sie, skad pochodzi kazde pole. Nie robi
  // zadnych skanow dokumentu - konsumenci maja wlasne buforowanie.
  function odswiezZrodla() {
    if (daneSwieze()) {
      powodFallbacku = "";
      zrodla.gracz = zrodla.wynik = zrodla.trasa = "dane";
      zrodla.rzuty = st.numThrows === null ? "brak danych tarczy" : "dane";
      zrodla.leg = "dane";
      return;
    }
    powodFallbacku = st.uniewazniony ? st.uniewazniony
      : !st.pelny ? "brak pełnego stanu"
      : !st.matchId ? "brak identyfikatora meczu"
      : st.matchId !== matchIdZUrl() ? "mecz z adresu się nie zgadza"
      : "nieznany";
    zrodla.gracz = zrodla.wynik = zrodla.trasa =
      zrodla.rzuty = zrodla.leg = "wygląd";
  }

  function zrodloOgolne() {
    const v = Object.keys(zrodla).map(k => zrodla[k]);
    return v.every(x => x === "dane") ? "dane"
      : v.every(x => x === "wygląd") ? "wygląd" : "mieszane";
  }

  function stanLinia() {
    odswiezZrodla();
    const tr = (video && video.srcObject && video.srcObject.getVideoTracks)
      ? video.srcObject.getVideoTracks()[0] : null;
    return [
      `ui=${uiFps}`, `js=${msKlatki.toFixed(1)}ms`,
      `skany=${skanyNaSek}`, `kam=${fpsZmierzone}`,
      `tor=${tr ? tr.readyState : "-"}`,
      `ekran=${wMeczu() ? "mecz" : "poza"}${bullOff() ? "/bull" : ""}`,
      `tarcza=${boardState}`, `k=${scaleK.toFixed(3)}`,
      `kolejka=${turnState}`, `ja=${zrodla.jaGracz || "-"}`,
      `tryb=${cal.trybGry || "auto"}\u2192${trybSkuteczny()}${wykrytyTryb() ? "" : "?"}`,
      `zrodlo=${zrodloOgolne()}` +
        (powodFallbacku ? `(${powodFallbacku})` : ""),
      // 4.19: stan BIEZACEJ gry czytany na miejscu z danych, niezaleznie od
      // tego, czy trwa powtorka. Wczesniej podczas powtorki linia mieszala
      // nowa trase ze starym wynikiem i starym celem.
      `trasa=${daneSwieze() ? (st.trasa || []).join("+") || "-"
        : (activeRoute() || []).join("+") || "-"}`,
      `zost=${daneSwieze()
        ? (st.player !== null && st.gameScores[st.player] != null
            ? st.gameScores[st.player] : "-")
        : (remaining === null ? "-" : remaining)}`,
      `pol=${daneSwieze() ? (st.trasa ? st.trasa.length : 0) : routeLen}`,
      `leg=${st.leg === null ? "-" : st.leg}`,
      `gracz=${st.player === null ? "-" : st.player}`,
      // 4.20: liczba z danych i lista z DOM to dwa rozne zrodla i mialy
      // ze soba nic wspolnego - w dzienniku 4.19 przy rzuty=0 lista
      // pokazywala [T20 D18], czyli pola trasy checkoutu, nie rzuty.
      `rzutyWS=${st.numThrows === null ? "-" : st.numThrows}`,
      `rzutyDOM=${rzutyDOM}[${rzutyTeksty.join(" ")}]`,
      `lotka=${daneSwieze() ? (lotkaDostepna() ? "jest" : "brak") : "?"}`,
      `bust=${st.kolejka.bust ? "tak" : "nie"}`,
      `co=${(() => { const c = checkoutKolejki();
        return c.pewny ? c.wartosc : "?"; })()}`,
      `zoom=${zoomAktualny.toFixed(2)}/${zoomEtap}`,
      `cel=${ostatniCel || "-"}`, `held=${heldTarget ? heldTarget.txt : "-"}`,
      // Zamrozony kontekst ogladanej powtorki, osobno od stanu biezacego.
      `pow=${kontekstPow
        ? `leg${kontekstPow.leg}/${kontekstPow.cel || "-"}/co` +
          `${kontekstPow.checkout === null ? "?" : kontekstPow.checkout}`
        : "-"}`,
      `rec=${rec ? rec.state : "-"}/${recStan}`, `fragm=${chunks.length}`,
      `buforTor=${buforTryb} klatkiBuf=${buforKlatki} material=${buforSekundy.toFixed(2)}s`,
      `bufor=${recStart ? ((Date.now() - recStart) / 1000).toFixed(0) : "0"}s`,
      `modal=${oknoAplikacji || "-"}`,
      `widok=${typeof document !== "undefined" && document.visibilityState
        ? document.visibilityState : "?"}`,
      `tarcza2=${st.tarczaStatus || "-"}`,
      `faza=${replayPhase}`, `ukryty=${powodUkrycia}`,
    ].join("  ");
  }

  function migawka(tytul) {
    if(!DEV_UI)return;
    zaloguj(`--- ${tytul} ---`);
    zaloguj("    " + stanLinia());
  }

  // ---------- geometria tarczy ----------
  const ORDER = [20,1,18,4,13,6,10,15,2,17,3,19,7,16,8,11,14,9,12,5];
  const RING_R = { T: 0.457, D: 0.719, S: 0.599 };

  function segmentPoint(name) {
    if (!name) return null;
    const s = String(name).trim().toUpperCase();
    if (/^(BULL|DBULL|SBULL|25|50)$/.test(s)) return { u: 0, v: 0 };
    const m = s.match(/^([SDT])(\d{1,2})$/);
    if (!m) return null;
    const i = ORDER.indexOf(parseInt(m[2], 10));
    if (i < 0) return null;
    const a = i * 18 * Math.PI / 180;
    const r = RING_R[m[1]];
    return { u: r * Math.sin(a), v: -r * Math.cos(a) };
  }

  function segValue(s) {
    s = String(s).trim().toUpperCase();
    if (s === "SBULL" || s === "25") return 25;
    if (s === "BULL" || s === "DBULL" || s === "50") return 50;
    const m = s.match(/^([SDT])(\d{1,2})$/);
    if (!m) return 0;
    return (m[1] === "T" ? 3 : m[1] === "D" ? 2 : 1) * parseInt(m[2], 10);
  }

  // ---------- odczyt stanu meczu ----------
  // Przeszukiwanie calego dokumentu jest drogie. Petla rysujaca chodzi
  // 60 razy na sekunde, a stan meczu zmienia sie kilka razy na sekunde,
  // wiec wyniki trzymamy przez chwile w pamieci. Bez tego skrypt zjada
  // rdzen procesora i glodzi obraz z kamery.
  function buforuj(f, ms) {
    let czas = 0, wynik;
    return function () {
      const n = Date.now();
      if (n - czas >= ms) { czas = n; wynik = f(); }
      return wynik;
    };
  }

  function _kartaGracza() {
    skanyLicznik++;
    let best = null, bestArea = 0;
    for (const el of document.querySelectorAll("div")) {
      if (nasze(el)) continue;
      if (wrap && (el === wrap || wrap.contains(el))) continue;
      if (okno && (el === okno || okno.contains(el))) continue;
      const r = el.getBoundingClientRect();
      if (r.width < 150 || r.height < 70) continue;
      if (r.width > window.innerWidth * 0.5) continue;
      const bg = getComputedStyle(el).backgroundImage || "";
      if (!bg.includes("gradient")) continue;
      const a = r.width * r.height;
      if (a > bestArea) { bestArea = a; best = el; }
    }
    return best;
  }

  // Runda o to, kto zaczyna. Autodarts pokazuje wtedy waski pasek graczy
  // z etykietami "To throw" i "Up next", a nie karty z wynikami.
  // Poza meczem nakladka nie ma czego pokazywac - lista turniejow czy
  // strona glowna maja wlasne kwadratowe grafiki, ktore tylko myla
  // wykrywanie tarczy.
  function wMeczu() {
    return /\/matches\//.test(location.pathname);
  }

  function _bullOff() {
    skanyLicznik++;
    const wzor = /^(to throw|up next|bull-?off|rzuca|nast[eę]pny)$/i;
    for (const e of document.querySelectorAll("div, span, p, button")) {
      if (nasze(e)) continue;
      if (wrap && (e === wrap || wrap.contains(e))) continue;
      if (okno && (e === okno || okno.contains(e))) continue;
      const t = (e.textContent || "").trim();
      if (t.length > 14 || !wzor.test(t)) continue;
      if (e.querySelector("*")) continue;
      return true;
    }
    return false;
  }

  // 4.21: przy swiezych danych decyduje tarcza, nie nazwa w karcie.
  // W dzienniku 4.20 LOCAL pokazywal "kolejka przeciwnika" przez caly mecz,
  // bo cal.gracz to "GRACZ_A", a gracze nazywaja sie GRACZ_C i GRACZ_D.
  // Rozrozniamy trzy rzeczy: gracz aktywny, tarcza lokalna i "moj" gracz.
  // Przy jednej kamerze i jednej tarczy KAZDY aktywny gracz jest nasz.
  // Kim jest zalogowany uzytkownik. Nie odczytujemy tokenów ani ciasteczek.
  // Tożsamość wynika z wyboru gracza, nicku lub rozpoznanej tarczy.

  // Rodzaj meczu widac w danych, wiec nie musi byc zapamietanym ustawieniem.
  // Zapisany przelacznik przenosil sie miedzy meczami: po grze online kolejny
  // mecz przy wspolnej tarczy chowalby kamere w kolejce kolegi.
  // Kolejnosc wedlug pewnosci: tarcze graczy, potem typ meczu, potem liczba
  // kanalow tarcz. Wszystkie trzy zgadzaly sie w czterech sesjach pomiarowych.
  function wykrytyTryb() {
    const gr = (st.players || []).filter(g => g && g.boardId);
    if (gr.length >= 2) return gr.every(g => g.boardId === gr[0].boardId) ? "local" : "online";
    const typ = String(st.typMeczu || "").trim().toLowerCase();
    if (typ) return typ === "local" ? "local" : "online";
    if ((st.boardIds || []).length > 1) return "online";
    return "";
  }
  function trybSkuteczny() {
    if (cal.trybGry === "local" || cal.trybGry === "online") return cal.trybGry;
    // Brak rozstrzygniecia znaczy "nie chowaj". Schowanie obrazu w naszej
    // kolejce kosztuje duzo wiecej niz pokazanie go w cudzej.
    return wykrytyTryb() || "local";
  }
  function czyOnline() { return trybSkuteczny() === "online"; }

  // Ktory z graczy to my. Kolejnosc wedlug pewnosci zrodla. Nick jest
  // pewniejszy niz tarcza, bo tarcze poznajemy z kanalu, ktory w grze
  // online opisuje obie strony.
  function mojIndeks() {
    const gr = st.players || [];
    if (!gr.length) return -1;
    const nick = String(cal.gracz || "").trim().toUpperCase();
    if (nick) {
      const i = gr.findIndex(g => g && String(g.name || "").trim().toUpperCase() === nick);
      if (i >= 0) {
        zrodla.jaGracz = "nick";
        if (gr[i].boardId && cal.mojaTarcza !== gr[i].boardId) { cal.mojaTarcza = gr[i].boardId; save(); }
        return i;
      }
    }
    if (cal.mojaTarcza) {
      const i = gr.findIndex(g => g && g.boardId === cal.mojaTarcza);
      if (i >= 0) { zrodla.jaGracz = "zapamiętana tarcza"; return i; }
    }
    if (st.boardId && !st.boardNiepewny) {
      const i = gr.findIndex(g => g && g.boardId === st.boardId);
      if (i >= 0) { zrodla.jaGracz = "tarcza z kanału"; return i; }
    }
    if (gr.length === 1) { zrodla.jaGracz = "jedyny gracz"; return 0; }
    zrodla.jaGracz = "nieustalony";
    return -1;
  }
  function idMojejTarczy() {
    if (cal.mojaTarcza) return cal.mojaTarcza;
    const i = mojIndeks();
    if (i >= 0 && st.players[i] && st.players[i].boardId) return st.players[i].boardId;
    return st.boardNiepewny ? "" : st.boardId;
  }

  function myTurn() {
    if (daneSwieze()) {
      zrodla.gracz = "dane";
      if (st.player === null) return true;
      const ja = mojIndeks();
      // Nie wiemy, ktora strona jest nasza. Pokazujemy obraz: schowanie go
      // w naszej kolejce boli duzo bardziej niz pokazanie w cudzej.
      if (ja >= 0) return st.player === ja;
      return true;
    }
    zrodla.gracz = "wygląd";
    const nick = String(cal.gracz || "").trim();
    if (!nick) return true;
    const karta = kartaGracza();
    if (!karta) return true;
    return karta.textContent.toUpperCase().includes(nick.toUpperCase());
  }

  function _activeRoute() {
    skanyLicznik++;
    const chips = document.querySelectorAll(".text-checkout-suggestion");
    if (!chips.length) return null;
    for (const c of chips) {
      let n = c.parentElement;
      for (let i = 0; i < 10 && n; i++, n = n.parentElement) {
        const r = n.getBoundingClientRect();
        if (r.width > window.innerWidth * 0.5) break;
        if (!(getComputedStyle(n).backgroundImage || "").includes("gradient")) continue;
        const own = n.querySelectorAll(".text-checkout-suggestion");
        if (own.length) return [...own].map(e => e.textContent.trim());
      }
    }
    return null;
  }

  // Rzuty biezacej kolejki z paska u gory ekranu. Chipy sa poskladane
  // z kilku elementow, wiec szukamy najglebszego, ktorego caly tekst
  // wyglada jak wynik rzutu.
  function _rzutyWKolejce() {
    skanyLicznik++;
    const wzor = /^(?:[SDTM]\s?\d{1,2}|BULL|DBULL|MISS|OUT)$/i;
    const grupy = new Map(), teksty = new Map();

    for (const e of document.querySelectorAll("div, span, p")) {
      if (nasze(e)) continue;
      if (wrap && (e === wrap || wrap.contains(e))) continue;
      if (okno && (e === okno || okno.contains(e))) continue;
      // 4.20: wykluczamy takze POTOMKOW podpowiedzi checkoutu. Sprawdzanie
      // samej klasy elementu przepuszczalo chipy trasy - w dzienniku 4.19
      // przy zerze rzutow lista pokazywala [T20 D18], czyli pola checkoutu.
      if (e.closest && e.closest('[class*="checkout"], [class*="suggestion"]')) continue;
      if (e.classList && e.classList.contains("text-checkout-suggestion")) continue;
      const r = e.getBoundingClientRect();
      if (r.top > window.innerHeight * 0.22 || r.width > 220 || r.width < 20) continue;
      const t = (e.textContent || "").trim();
      if (!wzor.test(t)) continue;
      let glebszy = false;
      for (const d of e.querySelectorAll("*"))
        if (wzor.test((d.textContent || "").trim())) { glebszy = true; break; }
      if (glebszy) continue;

      // 4.18: grupujemy po WIERSZU, nie po pojemniku. Kazdy chip ma wlasny
      // pojemnik, wiec kazda grupa miala rozmiar 1 i funkcja zawsze zwracala
      // 1 - w raporcie 4.17 WebSocket meldowal numThrows 1, 2, 3, a DOM przez
      // caly mecz pokazywal 1. Wspolna wspolrzedna pionowa laczy chipy
      // z jednego paska, a nie zlepia luznych dopasowan z calego ekranu.
      const rodzic = Math.round(r.top / 10);
      grupy.set(rodzic, (grupy.get(rodzic) || 0) + 1);
      if (!teksty.has(rodzic)) teksty.set(rodzic, []);
      teksty.get(rodzic).push(t);
    }

    let max = 0, najlepsza = [];   // rzutyDOM ustawiamy nizej
    for (const [k, v] of grupy.entries())
      if (v > max) { max = v; najlepsza = teksty.get(k) || []; }
    rzutyTeksty = najlepsza;
    rzutyDOM = Math.min(3, max);
    return rzutyDOM;
  }

  function checkoutTarget() {
    // 4.19: dane maja pierwszenstwo, wyglad zostaje jako kontrolowany zapas.
    if (daneSwieze()) {
      zrodla.trasa = zrodla.wynik = zrodla.gracz = "dane";
      const tr = st.trasa;
      remaining = (st.player !== null && st.gameScores[st.player] != null)
        ? st.gameScores[st.player] : null;
      routeLen = tr ? tr.length : 0;
      // Checkout to wynik przed pierwsza lotka biezacej kolejki, wprost
      // z turn_start. Symulacja na dzienniku 4.17 pokazala, ze reguly
      // opartej na samym spadku remaining nie da sie uratowac: dawala
      // co58 tam, gdzie poprawna wartoscia jest 32.
      const ck = checkoutKolejki();
      checkoutMax = ck.pewny ? ck.wartosc : 0;
      rzutyTeraz = st.numThrows === null ? 0 : st.numThrows;
      rzutyBaza = null;
      if (!tr || tr.length !== 1) return null;
      if (!graczLokalny()) return null;
      if (!lotkaDostepna()) return null;
      if (remaining !== null && remaining > cal.zoomProg) return null;
      return {
        txt: tr[0], pt: segmentPoint(tr[0]), rest: remaining,
        // Tozsamosc celu obejmuje gracza i numer kolejki, zeby zmiana
        // kolejki uzbroila zoom na nowo takze wtedy, gdy obaj gracze
        // maja dokladnie ten sam cel.
        klucz: `${tr[0]}#${st.player}#${st.kolejka.nr}`,
      };
    }
    zrodla.trasa = zrodla.wynik = "wygląd";
    const route = activeRoute();
    if (!route || !route.length) {
      remaining = null; routeLen = 0; rzutyBaza = null; return null;
    }
    remaining = route.reduce((a, t) => a + segValue(t), 0);
    routeLen = route.length;
    // Przy grze zdalnej rywal rzuca do swojej tarczy - jego trasa nie ma
    // nic wspolnego z tym, co widzi nasza kamera.
    if (czyOnline() && !myTurn()) { rzutyBaza = null; return null; }
    // 4.18: checkoutMax trzymal najwieksza sume trasy w historii i zerowal
    // sie dopiero po powtorce, a liczony byl jeszcze PRZED odrzuceniem trasy
    // przeciwnika. Stad w raporcie 4.17 plik "co121" przy zamknieciu z 32
    // i niezasadny autozapis przy progu 100. W obrebie jednej kolejki wynik
    // tylko maleje, wiec jego wzrost oznacza nowa kolejke albo zmiane gracza.
    if (poprzRemaining === null || remaining > poprzRemaining) checkoutMax = remaining;
    else if (remaining > checkoutMax) checkoutMax = remaining;
    poprzRemaining = remaining;
    if (routeLen !== 1 || remaining > cal.zoomProg) return null;

    // Po trzeciej lotce kolejka jest skonczona. Uwaga: Autodarts trzyma
    // na pasku rzuty POPRZEDNIEJ kolejki, dopoki nie poleci pierwsza lotka
    // nowej. Dlatego resetujemy dopiero wtedy, gdy licznik naprawde urosl
    // od momentu, w ktorym pole zamykajace sie pojawilo.
    rzutyTeraz = rzutyWKolejce();
    if (rzutyBaza === null || rzutyTeraz < rzutyBaza) rzutyBaza = rzutyTeraz;
    if (cal.zoomPoTrzeciej && rzutyTeraz >= 3 && rzutyTeraz > rzutyBaza) return null;

    return { txt: route[0], pt: segmentPoint(route[0]), rest: remaining };
  }

  // 4.18: ta funkcja robila pelny querySelectorAll("div") z getComputedStyle
  // na kazdym elemencie, co 300 ms, poza buforuj() i poza skanyLicznik.
  // Jej koszt nie pojawial sie w raporcie, wiec linia "skany=" zanizala
  // rzeczywiste obciazenie o okolo 3 skany na sekunde.
  function _legWon() {
    if (!wMeczu()) { legPowod = "poza meczem"; return false; }
    // 4.19: gdy dane sa swieze, koniec Lega bierzemy z nich. Zielony
    // gradient przestaje decydowac, wiec inny motyw i inny jezyk przestaja
    // miec znaczenie. Nie skanujemy wtedy dokumentu w ogole.
    if (daneSwieze()) {
      if (!st.legZamkniety) { legPowod = "dane: Leg trwa"; return false; }
      if (czyOnline() && cal.powTylkoMoje && st.gameWinner >= 0) {
        const zw = st.players[st.gameWinner];
        const mojaT = idMojejTarczy();
        if (zw && mojaT && zw.boardId && zw.boardId !== mojaT) {
          legPowod = "dane: Leg przeciwnika"; return false;
        }
      }
      legPowod = "dane: koniec Lega";
      return true;
    }
    skanyLicznik++;
    let byloZielone = false, nazwaObca = "";
    // Przy grze zdalnej interesuja nas tylko wlasne Legi - zwycieska
    // lotka przeciwnika i tak nie zostala nagrana przez nasza kamere.
    const mojaNazwa = (cal.gracz || "").toUpperCase();
    for (const el2 of document.querySelectorAll("div")) {
      if (wrap && (el2 === wrap || wrap.contains(el2))) continue;
      if (okno && (el2 === okno || okno.contains(el2))) continue;
      const r = el2.getBoundingClientRect();
      if (r.width < 150 || r.height < 70) continue;
      if (r.width > window.innerWidth * 0.5) continue;
      const bg = getComputedStyle(el2).backgroundImage || "";
      if (!bg.includes("gradient")) continue;
      const nums = bg.match(/\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}/g);
      if (!nums) continue;
      for (const n of nums) {
        const [cr, cg, cb] = n.split(",").map(x => parseInt(x, 10));
        if (!(cg > 90 && cg > cr * 1.35 && cg > cb * 1.25)) continue;
        byloZielone = true;
        if (cal.powTylkoMoje && mojaNazwa &&
            !el2.textContent.toUpperCase().includes(mojaNazwa)) {
          nazwaObca = (el2.textContent || "").trim().slice(0, 24);
          continue;
        }
        legPowod = "zielona karta — mój Leg";
        return true;
      }
    }
    legPowod = !byloZielone ? "brak zielonej karty"
      : `zielona, ale nie moja (${nazwaObca})`;
    return false;
  }

  const legWon = buforuj(_legWon, 200);

  // Watcher wylacznie diagnostyczny: mierzy, ile mija od zdarzenia z tarczy
  // w danych do chwili, w ktorej to samo widac w DOM. To liczba, ktora
  // rozstrzyga, czy przejscie na dane da zysk takze w tempie reakcji zoomu,
  // a nie tylko w odpornosci na motyw i jezyk.
  //
  // Chodzi TYLKO w oknie po zdarzeniu, nie bez przerwy. Odpytywanie w kolko
  // odswiezaloby bufor rzutyWKolejce i dokladalo cztery skany dokumentu na
  // sekunde przez caly mecz - za taka cene, przy budzecie 10 skanow/s,
  // pomiaru diagnostycznego sie nie kupuje. W spoczynku kosztuje zero.
  //
  // Rozdzielczosc pomiaru to bufor tej funkcji, czyli 250 ms. Do odpowiedzi
  // na pytanie "czy dane wyprzedzaja wyglad o setki milisekund" wystarczy.
  function pomiarWyprzedzenia() {
    if (!DEV_UI || !cal.wsDiag || domDogonil || !wMeczu()) return;
    if (Date.now() - wsThrowCzas > 4000) {   // DOM nie nadazyl - konczymy okno
      domDogonil = true;
      wsLog(`DOM nie pokazał zmiany w ciągu 4 s od zdarzenia z tarczy`);
      return;
    }
    const n = rzutyWKolejce();
    if (n === domRzutyPoprz) return;
    const pierwszy = domRzutyPoprz < 0;
    domRzutyPoprz = n;
    if (pierwszy) return;        // pierwszy odczyt nie jest dogonieniem
    domDogonil = true;
    // 4.18: sukces wymaga ZGODNOSCI z danymi. Wczesniej wystarczyla dowolna
    // zmiana wzgledem poprzedniego odczytu, wiec "DOM dogonil: rzuty=0"
    // potrafilo wypasc przy numThrows=2 i wygladac na potwierdzenie.
    const ms = Date.now() - wsThrowCzas;
    wsLog(n === wsThrows
      ? `DOM dogonił: rzuty=${n} zgodne z danymi, po ${ms} ms`
      : `DOM zmienił się na ${n}, ale dane mówią ${wsThrows} — ` +
        `rozjazd, nie dogonienie (po ${ms} ms)`);
  }

  const kartaGracza = buforuj(_kartaGracza, 250);
  const bullOff = buforuj(_bullOff, 400);
  const rzutyWKolejce = buforuj(_rzutyWKolejce, 250);
  const activeRoute = buforuj(_activeRoute, 200);

  // ---------- wykrywanie tarczy ----------
  function _candidates() {
    skanyLicznik++;
    const out = [];
    for (const el of document.querySelectorAll("svg, canvas, img, div")) {
      if (nasze(el)) continue;
      if (wrap && (el === wrap || wrap.contains(el))) continue;
      const r = el.getBoundingClientRect();
      const css=getComputedStyle(el);if(css.display==='none'||css.visibility==='hidden')continue;
      if (r.width < 220 || r.height < 220) continue;
      if (r.width > window.innerWidth * 0.95) continue;
      const ratio = r.width / r.height;
      if (ratio < 0.82 || ratio > 1.22) continue;
      if (el.tagName === "DIV") {
        const bg = getComputedStyle(el).backgroundImage;
        if (!bg || bg === "none") continue;
      }
      out.push({ el, r, area: r.width * r.height });
    }
    out.sort((a, b) => b.area - a.area);
    if (cal.preferTag) {
      const pref = out.filter(c =>
        c.el.tagName.toLowerCase() === cal.preferTag.toLowerCase());
      if (pref.length) return pref;
    }
    return out;
  }

  const candidates = buforuj(_candidates, 1000);

  function findBoard() {
    const prefOk = !cal.preferTag || !locked ||
      locked.tagName.toLowerCase() === cal.preferTag.toLowerCase();
    if (locked && locked.isConnected && prefOk) {
      const r = locked.getBoundingClientRect();
      const css=getComputedStyle(locked);
      if(r.width>=220&&r.height>=220&&r.width/r.height>.82&&r.width/r.height<1.22&&
        css.display!=='none'&&css.visibility!=='hidden')return {el:locked,r};
    }
    const c = candidates();
    if (!c.length) { locked = null; return null; }
    locked = c[0].el;
    return c[0];
  }

  // IMG and SVG represent different bounds in the supplied Autodarts layout.
  // Normalize SVG directly; never depend on an IMG having appeared this session.
  // Bootstrap 885/781 is measured from this project's repeated user sessions,
  // not a universal Autodarts API constant. Valid paired measurements replace it.
  let geometriaOpis='brak', geometriaSciezka='', pomiaryTarczy={}, kandydatTarczy=null;
  function modelGeometriiSvg(){
    const p=cal.geometriaSvg;
    if(p&&p.v===1&&Number.isFinite(p.kx)&&Number.isFinite(p.ky)&&
      p.kx>=.85&&p.kx<=1.4&&p.ky>=.85&&p.ky<=1.4&&
      Number.isFinite(p.ux)&&Math.abs(p.ux)<=.1&&Number.isFinite(p.uy)&&Math.abs(p.uy)<=.1)return p;
    cal.geometriaSvg={v:1,kx:885/781,ky:885/781,ux:0,uy:0,zrodlo:'pomiar sesji 4.32: IMG885/SVG781'};
    save();return cal.geometriaSvg;
  }
  function prostokatTarczy(b){
    const path=location.pathname,now=Date.now(),r=b.r,tag=b.el.tagName.toLowerCase();
    if(path!==geometriaSciezka){pomiaryTarczy={};kandydatTarczy=null;geometriaSciezka=path;}
    const viewport=window.innerWidth+'x'+window.innerHeight;
    const valid=r.width>=220&&r.height>=220&&Math.abs(r.width/r.height-1)<.12;
    if(valid&&(tag==='img'||tag==='svg')){
      const stamp=tag+'|'+viewport+'|'+[r.left,r.top,r.width,r.height].map(x=>Math.round(x)).join(',');
      if(kandydatTarczy?.stamp!==stamp)kandydatTarczy={stamp,od:now};
      if(now-kandydatTarczy.od>=400){
        pomiaryTarczy[tag]={r:{left:r.left,top:r.top,width:r.width,height:r.height},viewport,at:now};
        const i=pomiaryTarczy.img,v=pomiaryTarczy.svg;
        if(i&&v&&i.viewport===v.viewport&&Math.abs(i.at-v.at)<60000){
          const a=i.r,c=v.r;
          const kx=a.width/c.width,ky=a.height/c.height;
          const ux=(a.left+a.width/2-c.left-c.width/2)/c.width;
          const uy=(a.top+a.height/2-c.top-c.height/2)/c.height;
          if(kx>=.85&&kx<=1.4&&ky>=.85&&ky<=1.4&&Math.abs(ux)<=.05&&Math.abs(uy)<=.05){
            const p=modelGeometriiSvg();
            if(Math.abs(p.kx-kx)>.001||Math.abs(p.ky-ky)>.001||Math.abs(p.ux-ux)>.001||Math.abs(p.uy-uy)>.001){
              cal.geometriaSvg={v:1,kx,ky,ux,uy,zrodlo:'para stabilnych IMG/SVG'};save();
              zaloguj('geometria: zapisano przelicznik SVG z pary IMG/SVG');
            }
          }
        }
      }
    }
    let result=r,mode='IMG bez korekty';
    if(tag==='svg'){
      const p=modelGeometriiSvg(),w=r.width*p.kx,h=r.height*p.ky;
      result={left:r.left+r.width/2+p.ux*r.width-w/2,top:r.top+r.height/2+p.uy*r.height-h/2,width:w,height:h};
      mode='SVG → obszar IMG ['+p.zrodlo+']';
    }else if(tag!=='img')mode='element '+tag;
    const desc=mode+' '+Math.round(result.width)+'x'+Math.round(result.height)+
      ' środek='+Math.round(result.left+result.width/2)+','+Math.round(result.top+result.height/2);
    if(desc!==geometriaOpis){geometriaOpis=desc;zaloguj('geometria tarczy: '+desc+'; element '+tag+' '+Math.round(r.width)+'px');}
    return result;
  }

  // ---------- budowa warstwy obrazu ----------
  function buildOverlay() {
    backdrop = document.createElement("div");
    Object.assign(backdrop.style, {
      position: "fixed", inset: "0", zIndex: "8990",
      background: "#000", opacity: "0", display: "none",
      pointerEvents: "none", transition: "opacity 400ms ease",
    });
    backdrop.addEventListener("click", () => przerwij("klik w tło"));
    document.body.appendChild(backdrop);

    wrap = document.createElement("div");
    Object.assign(wrap.style, {
      position: "fixed", overflow: "hidden", zIndex: "9000",
      pointerEvents: "none", display: "none", borderRadius: "50%",
      boxShadow: "0 0 0 3px rgba(14,16,22,.95)",
      background: "#0d0f14",
    });

    zoomLayer = document.createElement("div");
    Object.assign(zoomLayer.style, {
      position: "absolute", inset: "0", transformOrigin: "center center",
      willChange: "transform",
    });

    const vs = {
      position: "absolute", objectFit: "fill",
      transformOrigin: "center center",
    };
    video = document.createElement("video");
    video.muted = true; video.playsInline = true; video.autoplay = true;
    Object.assign(video.style, vs);

    replayVideo = document.createElement("video");
    replayVideo.muted = true; replayVideo.playsInline = true;
    Object.assign(replayVideo.style, vs);
    replayVideo.style.display = "none";

    zoomLayer.appendChild(video);
    zoomLayer.appendChild(replayVideo);
    wrap.appendChild(zoomLayer);

    guide = document.createElementNS(SVGNS, "svg");
    Object.assign(guide.style, {
      position: "absolute", inset: "0", pointerEvents: "none", display: "none",
    });
    wrap.appendChild(guide);
    document.body.appendChild(wrap);
  }

  // ---------- interfejs ----------
  const C = {
    tlo: "rgba(13,16,23,.96)", tlo2: "rgba(255,255,255,.05)",
    tekst: "#e8ecf4", slaby: "#93a0b5", akcent: "#4dd4ff",
    ok: "#5ad18f", zle: "#ff7a6b", ramka: "rgba(255,255,255,.10)",
    font: "13px/1.5 system-ui, -apple-system, Segoe UI, sans-serif",
  };

  function el(tag, style, text) {
    const e = document.createElement(tag);
    if (style) Object.assign(e.style, style);
    if (text != null) e.textContent = text;
    return e;
  }

  // Zawsze widoczny przelacznik trybu gry. Jednym klikiem ustawia
  // wszystko, co rozni gre przy wlasnej tarczy od gry zdalnej.
  let pigulka, segLok, segOnl, segTryby = [];
  function svgIkona(ksztalty, rozmiar) {
    try {
      const NS = "http://www.w3.org/2000/svg";
      const s = document.createElementNS(NS, "svg");
      s.setAttribute("viewBox", "0 0 24 24");
      s.setAttribute("width", rozmiar); s.setAttribute("height", rozmiar);
      s.setAttribute("fill", "none"); s.setAttribute("stroke", "currentColor");
      s.setAttribute("stroke-width", "1.7");
      s.setAttribute("stroke-linecap", "round"); s.setAttribute("stroke-linejoin", "round");
      for (const k of ksztalty) {
        const el2 = document.createElementNS(NS, k.t);
        for (const a of Object.keys(k)) if (a !== "t") el2.setAttribute(a, k[a]);
        s.appendChild(el2);
      }
      return s;
    } catch (e) { return el("span", null, "●"); }
  }
  // Dom = gra przy jednej tarczy. Kula ziemska = gra zdalna. Zadnej zebatki
  // ani aparatu - obie ikony sa juz zajete przez pasek Autodarts.
  // Kamera telewizyjna: korpus, obiektyw i dwie szpule. Rozni sie ksztaltem
  // od aparatu w pasku Autodarts, wiec nie myli sie z jego wlasnym przyciskiem.
  const IKONA_TV = [
    { t: "rect", x: "2.4", y: "9.2", width: "12", height: "9", rx: "1.6" },
    { t: "path", d: "M14.4 12.6 21.2 9.4v8.6l-6.8-3.2z" },
    { t: "circle", cx: "6.2", cy: "5.9", r: "2.7" },
    { t: "circle", cx: "11.6", cy: "5.9", r: "2.7" },
  ];
  // Tarcza = gra przy jednej tarczy. Kula ziemska = gra zdalna. Ani zebatki,
  // ani aparatu fotograficznego - obie sa juz zajete przez pasek Autodarts.
  const IKONA_TARCZA = [
    { t: "circle", cx: "12", cy: "12", r: "8.8" },
    { t: "circle", cx: "12", cy: "12", r: "4.4" },
    { t: "circle", cx: "12", cy: "12", r: "1.3", fill: "currentColor" },
    { t: "path", d: "M12 3.2v2.1M12 18.7v2.1M3.2 12h2.1M18.7 12h2.1" },
  ];
  const IKONA_KULA = [{ t: "circle", cx: "12", cy: "12", r: "8.6" },
    { t: "path", d: "M3.4 12h17.2" }, { t: "path", d: "M12 3.4c2.4 2.6 2.4 14.6 0 17.2" },
    { t: "path", d: "M12 3.4c-2.4 2.6-2.4 14.6 0 17.2" }];

  function buildTryb() {
    // Zawsze widoczny, delikatny. Nie wchodzi juz do panelu gry - to jedyna
    // rzecz, ktora uzytkownik przelacza w trakcie gry bez otwierania niczego.
    // Od 4.48 przelacznik trybu i ikona wtyczki dziela jedna pastylke.
    // Wczesniej rozdzielenie mialo sens, bo panel byl duzy - teraz oba sa
    // male i dwa osobne plywajace elementy w tym samym rogu tylko halasuja.
    pigulka = el("button", {
      display:"flex", alignItems:"center", justifyContent:"center",
      width:"30px", height:"30px", padding:"0", minHeight:"0", flex:"0 0 auto",
      background:"transparent", border:"none", borderRadius:"999px",
      cursor:"pointer", color:C.slaby, fontSize:"13px", fontWeight:"700",
      lineHeight:"1", transition:"color 160ms",
    });
    pigulka.type = "button";
    pigulka.dataset.adcamUi="mode"; pigulka.dataset.wzUi="mode";
    pigulka.setAttribute("aria-label",t("Tryb gry"));
    // Jedno kliknięcie przechodzi w kółko: Auto → Local → Online.
    pigulka.addEventListener("click",()=>{
      if(panelPrzesuwany){zaloguj("klik w tryb pominięty: przeciąganie");return;}
      pigulka.blur();
      const kolejka=["auto","local","online"];
      ustawTryb(kolejka[(kolejka.indexOf(cal.trybGry||"auto")+1)%3]);
    });
    segTryby=[]; segLok=null; segOnl=null;
    odswiezTryb();
  }

  function ustawTryb(kod) {
    cal.trybGry = (kod === "local" || kod === "online") ? kod : "auto";
    save(); odswiezTryb();
    for (const id of Object.keys(karty))
      if (karty[id]._odswiez) karty[id]._odswiez.forEach(f => f());
    zaloguj(`tryb → ${cal.trybGry.toUpperCase()} (rozpoznany: ${wykrytyTryb() || "-"})`);
    toast(cal.trybGry === "local" ? t("tryb: jedna tarcza — obraz zawsze widoczny")
      : cal.trybGry === "online" ? t("tryb: gra zdalna — obraz tylko w twojej kolejce")
      : t("tryb: rozpoznawanie automatyczne"));
  }

  function odswiezTryb() {
    if (!pigulka) return;
    const wybrany = cal.trybGry || "auto";
    const wykryty = wykrytyTryb();
    if (pigulka.dataset.znak !== wybrany) {
      pigulka.dataset.znak = wybrany;
      pigulka.textContent = "";
      // Auto to litera A: rozpoznanie i tak zmienia sie w trakcie meczu, wiec
      // ikona domu albo kuli sugerowalaby wybor, ktorego uzytkownik nie zrobil.
      if (wybrany === "auto") pigulka.appendChild(el("span", { lineHeight: "1" }, "A"));
      else pigulka.appendChild(svgIkona(wybrany === "online" ? IKONA_KULA : IKONA_TARCZA, 17));
    }
    pigulka.style.color = wybrany === "auto" ? C.slaby : C.akcent;
    const nazwa = wybrany === "auto" ? t("Automatycznie")
      : wybrany === "local" ? t("Przy tarczy") : t("Gra zdalna");
    const opis = t("Tryb gry: {a}", { a: nazwa }) +
      (wybrany === "auto" ? " · " + t("rozpoznano") + ": " +
        (wykryty === "local" ? t("Przy tarczy") : wykryty === "online" ? t("Gra zdalna") : t("nie ustalono")) : "");
    pigulka.title = opis;
    pigulka.setAttribute("aria-label", opis);
  }

  function buildPasekPow() {
    pasekPow = el("div", {
      position: "fixed", left: "50%", bottom: "30px",
      transform: "translateX(-50%)", zIndex: "10002",
      background: C.tlo, color: C.tekst, font: C.font,
      border: `1px solid ${C.ramka}`, borderRadius: "14px",
      padding: "10px 16px", display: "none", pointerEvents: "auto",
      boxShadow: "0 8px 24px rgba(0,0,0,.5)",
      width: "min(680px, 86vw)",
    });

    pasekPow.dataset.adcamUi="replay-controls";pasekPow.dataset.wzUi="replay-controls";
    const gora = el("div", {
      display: "flex", flexWrap:"wrap", alignItems: "center", gap: "8px", marginBottom: "8px",
    });
    gora.appendChild(el("span", {
      background: "rgba(255,90,80,.18)", color: "#ff8a7d",
      border: "1px solid rgba(255,90,80,.4)", borderRadius: "999px",
      padding: "3px 10px", fontSize: "11px", fontWeight: "700",
      letterSpacing: ".8px",
    }, t("POWTÓRKA")));
    etykCzasu = el("span", {
      color: C.akcent, fontWeight: "600", minWidth: "112px",
      font: "13px/1 ui-monospace, monospace",
    });
    gora.appendChild(etykCzasu);

    const btn = (txt, akcja) => {
      const b = el("button", {
        font: C.font, fontSize: "12px", cursor: "pointer", color: C.tekst,
        background: C.tlo2, border: `1px solid ${C.ramka}`,
        borderRadius: "8px", padding: "5px 10px",
      }, txt);
      b.addEventListener("click", (ev) => {
        ev.stopPropagation(); b.blur();
        zaloguj(`🖱 pasek: ${txt}`);
        akcja();
      });
      gora.appendChild(b);
      return b;
    };
    btn(t("⟳ od nowa"), () => { if (odNowa) odNowa(); });
    btn("⏯", () => przelaczPauze()).setAttribute("aria-label",t("Pauza lub wznów"));
    btn("−", () => zmienTempo(-1)).setAttribute("aria-label",t("Wolniej"));
    btn("+", () => zmienTempo(1)).setAttribute("aria-label",t("Szybciej"));
    btn(t("⟲ pętla"), przelaczPetle);
    przyciskZapisz = btn(t("Zapisz nagranie"), () => zapiszTeraz());
    btn(t("Zamknij"), () => przerwij("przycisk"));
    pasekPow.appendChild(gora);

    suwakCzasu = el("input", { width: "100%", accentColor: C.akcent });
    suwakCzasu.setAttribute("aria-label",t("Pozycja w powtórce"));
    suwakCzasu.type = "range";
    suwakCzasu.min = 0; suwakCzasu.max = 1000; suwakCzasu.step = 1; suwakCzasu.value = 0;
    suwakCzasu.addEventListener("pointerdown", () => { przeciagam = true; });
    suwakCzasu.addEventListener("pointerup", () => {
      przeciagam = false; suwakCzasu.blur();
    });
    suwakCzasu.addEventListener("input", () => {
      if (!powDlugosc) return;
      wyjdzZeStopklatki(); czekanieDo = 0;
      replayVideo.currentTime = (suwakCzasu.value / 1000) * powDlugosc;
    });
    suwakCzasu.addEventListener("click", ev => ev.stopPropagation());
    pasekPow.appendChild(suwakCzasu);

    pasekPow.appendChild(el("div", {
      color: C.slaby, fontSize: "11px", marginTop: "7px", textAlign: "center",
    }, t("Spacja pauza · ← → klatka po klatce · , . tempo · L pętla · ") +
       t("S zapisz · Esc przerwij")));

    pasekPow.addEventListener("click", ev => ev.stopPropagation());
    document.body.appendChild(pasekPow);
  }

  function przelaczPauze() {
    if (!widokPowtorki() || oknoAplikacji) return;
    if (replayPhase === "stopklatka") { if (odNowa) odNowa(); return; }
    pauza = !pauza;
    if (pauza) replayVideo.pause();
    else replayVideo.play().catch(() => {});
  }

  function przelaczPetle() {
    cal.powPetla = !cal.powPetla; save();
    zaloguj(`pętla = ${cal.powPetla ? "TAK" : "nie"}`);
    if (cal.powPetla && replayPhase === "stopklatka" && odNowa) odNowa();
    toast(cal.powPetla ? t("powtórka w pętli") : t("pętla wyłączona"));
  }

  function ustawNagrywanie(wlaczone) {
    cal.powWl = !!wlaczone;
    if (!cal.powWl) {
      // Zatrzymanie do pomiaru nie wywołuje zapisu progowego klipu.
      if (inReplay) { checkoutPowtorki = null; przerwij("nagrywanie wyłączone"); }
      stopRecorder("wyłączone"); bajtyBufora = 0;
    } else if (!rec || rec.state !== "recording") startRecorder();
    save(); zaloguj(`TEST: nagrywanie ${cal.powWl ? t("WŁĄCZONE") : t("WYŁĄCZONE")}`);
    toast(cal.powWl ? t("nagrywanie włączone") : t("podgląd bez nagrywania"));
  }

  function zmienTempo(kier) {
    const kroki = [0.1, 0.15, 0.25, 0.35, 0.5, 0.75, 1];
    let i = kroki.findIndex(v => v >= cal.powTempo - 0.001);
    if (i < 0) i = 3;
    i = Math.min(kroki.length - 1, Math.max(0, i + kier));
    cal.powTempo = kroki[i];
    replayVideo.playbackRate = cal.powTempo * korektaCzasu;
    save(); toast(t('Tempo {a}×',{a:cal.powTempo}));
  }

  function drawPasekPow() {
    if (!pasekPow) return;
    const widoczny = widokPowtorki() && !oknoAplikacji;
    pasekPow.style.display = widoczny ? "block" : "none";
    if (!widoczny) return;

    const czas = replayVideo.currentTime || 0;
    const d = powDlugosc || 0;
    if (!przeciagam && d) suwakCzasu.value = Math.round((czas / d) * 1000);
    const doZamk = czekanieDo > 1
      ? '  ·  '+t('Zamknę za {a} s',{a:Math.max(0,Math.ceil((czekanieDo-Date.now())/1000))}) : "";
    if (przyciskZapisz)
      przyciskZapisz.style.opacity = pendingBlob ? "1" : ".45";
    etykCzasu.textContent =
      `${czas.toFixed(1)} / ${d.toFixed(1)} s   ${cal.powTempo}x` +
      (pauza ? "  ⏸" : "") + (cal.powPetla ? "  ⟲" : "") + doZamk;
  }

  function przerwij(powod) {
    if (przerwijBiezaca) przerwijBiezaca(powod || "przerwane ręcznie");
  }

  function buildPytanie() {
    pytanie = el("div", {
      // Nie na srodku dolu - tam sa przyciski Next i Finish Autodarts.
      position: "fixed", left: "16px", bottom: "16px",
      zIndex: "10002",
      background: C.tlo, color: C.tekst, font: C.font,
      border: `1px solid ${C.ramka}`, borderRadius: "12px",
      padding: "12px 14px", display: "none", pointerEvents: "none",
      boxShadow: "0 14px 44px rgba(0,0,0,.6)",
      alignItems: "center", gap: "12px",
    });
    const etykieta = el("span", null, t("Zapisać tę powtórkę?"));
    etykieta.id = "adcam-pyt";
    const b1 = el("button", {
      font: C.font, fontSize: "12px", cursor: "pointer", color: "#04202b",
      background: C.akcent, border: "none", borderRadius: "8px",
      padding: "8px 14px", fontWeight: "600",
    }, t("Zapisz plik"));
    const b2 = el("button", {
      font: C.font, fontSize: "12px", cursor: "pointer", color: C.tekst,
      background: C.tlo2, border: `1px solid ${C.ramka}`,
      borderRadius: "8px", padding: "8px 14px",
    }, t("Odrzuć"));
    const p = el("span", { color: C.slaby, fontSize: "11px" }, "S / Esc");

    b1.style.pointerEvents = "auto";
    b2.style.pointerEvents = "auto";
    b1.addEventListener("click", () => { b1.blur(); zapiszPowtorke(); });
    b2.addEventListener("click", () => { b2.blur(); schowajPytanie(); });
    pytanie.appendChild(etykieta); pytanie.appendChild(b1);
    pytanie.appendChild(b2); pytanie.appendChild(p);
    document.body.appendChild(pytanie);
  }


  function schowajPytanie() {
    pytanie.style.display = "none";
    pytanieDo = 0;
    pendingBlob = null;
  }

  // Zapis nie przerywa ogladania - plik leci w tle.
  function zapiszTeraz() {
    if (!pendingBlob) return toast(t("nie ma czego zapisać"));
    zapiszPlik(pendingBlob, checkoutPowtorki);
  }

  async function zapiszPlik(blob, checkout) {
    const d = new Date();
    const dwa = n => String(n).padStart(2, "0");
    const f = wybranyFormat();
    const ext = (blob.type || "").includes("mp4") ? "mp4" : (f ? f.ext : "webm");
    // Nieznany checkout jest oznaczany wprost, nie zerem i nie zgadywana
    // liczba - nazwa pliku ma nie klamac o tym, czego nie wiemy.
    const co = trybyPlikow.get(blob)==="reczna" || checkout===0 ? "-reczna" : typeof checkout === "number" && checkout > 0
      ? `-co${checkout}` : (checkout === null ? "-co-nieznany" : "");
    const nazwa = `powtorka-${d.getFullYear()}-${dwa(d.getMonth()+1)}-` +
      `${dwa(d.getDate())}_${dwa(d.getHours())}-${dwa(d.getMinutes())}-` +
      `${dwa(d.getSeconds())}${co}.${ext}`;

    // 1) wskazany wczesniej folder, 2) okno wyboru miejsca, 3) pobieranie
    try {
      const folder = await folderGotowy();
      if (folder) {
        const plik = await folder.getFileHandle(nazwa, { create: true });
        const w = await plik.createWritable();
        await w.write(blob); await w.close();
        toast(t('Zapisano {plik}',{plik:folder.name+'/'+nazwa}));
        zaloguj("zapisano " + folder.name + "/" + nazwa);
        return;
      }
    } catch (e) { zaloguj("zapis do folderu nieudany: " + e.name); }

    try {
      if (window.showSaveFilePicker && !cal.powFolder) {
        const h = await window.showSaveFilePicker({
          suggestedName: nazwa,
          // Klucz accept musi byc czystym typem MIME. "video/webm;codecs=vp8"
          // jest niedozwolony w tym miejscu i przegladarka rzuca TypeError -
          // to bylo zrodlo wpisu "okno zapisu nieudane" w raporcie 4.17.
          types: [{
            description: "Nagranie",
            accept: { [(blob.type || "video/webm").split(";")[0]]: ["." + ext] },
          }],
        });
        const w = await h.createWritable();
        await w.write(blob); await w.close();
        toast(t('Zapisano {plik}',{plik:h.name}));
        zaloguj("zapisano " + h.name);
        return;
      }
    } catch (e) {
      if (e.name === "AbortError") return toast(t("zapis anulowany"));
      zaloguj("okno zapisu nieudane: " + e.name);
    }

    try {
      const a = el("a");
      a.href = URL.createObjectURL(blob);
      a.download = nazwa;
      document.body.appendChild(a); a.click();
      setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 2000);
      toast(t('Zapisano {plik}',{plik:nazwa}));
      zaloguj("zapisano " + nazwa);
    } catch (e) { toast(t("błąd zapisu powtórki")); }
  }

  function zapiszPowtorke() {
    if (!pendingBlob) return schowajPytanie();
    zapiszPlik(pendingBlob, checkoutPowtorki);
    schowajPytanie();
  }

  // OKNO DIAGNOSTYCZNE — tymczasowe, do czytania z nagrań ekranu.
  // Duża czcionka i wysoki kontrast, żeby dało się je odczytać
  // z klatki wideo. Klawisz X włącza i wyłącza.
  let diagBox, diagL, diagP, diagLog, diagSiatka;
  let diagSzczegoly = false, diagRysOd = 0;
  function buildDiagOkno() {
    diagBox = el("div", {
      position: "fixed", right: "10px", bottom: "10px", zIndex: "10005",
      background: "rgba(6,9,14,.93)", border: "1px solid rgba(255,255,255,.16)",
      borderRadius: "10px", padding: "10px 12px", pointerEvents: "none",
      display: "none", width: "min(350px, 94vw)", maxWidth: "94vw",
      maxHeight: "65vh", overflow: "auto", boxSizing: "border-box",
      boxShadow: "0 10px 40px rgba(0,0,0,.7)",
    });

    const tyt = el("div", {
      display: "flex", justifyContent: "space-between", gap: "18px",
      font: "700 13px/1.3 ui-monospace, monospace", color: "#ffd400",
      letterSpacing: "1px", marginBottom: "7px",
      borderBottom: "1px solid rgba(255,255,255,.16)", paddingBottom: "6px",
    });
    tyt.appendChild(el("span", null, "Stan aplikacji"));
    diagCzas = el("span", { color: "#4dd4ff" });
    tyt.appendChild(diagCzas);
    diagBox.appendChild(tyt);

    const siatka = diagSiatka = el("div", {
      display: "grid", gridTemplateColumns: "1fr", gap: "0 12px", minWidth: "0",
    });
    const styl = {
      font: "13px/1.45 ui-monospace, monospace", color: "#e8ecf4",
      whiteSpace: "pre-wrap", overflowWrap: "anywhere", minWidth: "0", margin: "0",
    };
    diagL = el("div", styl); diagP = el("div", styl);
    siatka.appendChild(diagL); siatka.appendChild(diagP);
    diagBox.appendChild(siatka);

    diagLog = el("div", {
      font: "12px/1.45 ui-monospace, monospace", color: "#9fb0c8",
      whiteSpace: "pre-wrap", overflowWrap: "anywhere", marginTop: "8px", paddingTop: "6px",
      borderTop: "1px solid rgba(255,255,255,.16)",
    });
    diagBox.appendChild(diagLog);
    document.body.appendChild(diagBox);
  }

  let diagCzas;
  function drawDiagOkno() {
    if (!diagBox) return;
    diagBox.style.display = DEV_UI && labOtwarte && !oknoAplikacji ? "block" : "none";
    if (!DEV_UI || !labOtwarte || oknoAplikacji) return;
    if (Date.now() - diagRysOd < (diagSzczegoly ? 3000 : 1000)) return;
    diagRysOd = Date.now();
    diagBox.style.width = "100%";
    diagBox.style.pointerEvents = "auto";
    diagSiatka.style.gridTemplateColumns = "1fr";
    diagP.style.display = diagLog.style.display = diagSzczegoly ? "block" : "none";
    if (!diagSzczegoly) {
      diagCzas.textContent = `v${WERSJA} ${czasSesji()}`;
      diagL.textContent = `UI ${uiFps}/s · kamera ${fpsZmierzone}/s\n` +
        `Nagrywanie: ${cal.powWl ? recStan : "wyłączone"}\n` +
        `Bufor: ${(bajtyBufora / 1048576).toFixed(1)} MB · powtórka: ${replayPhase}\n` +
        `Shift+N: nagrywanie · Y: znacznik`;
      return;
    }

    diagCzas.textContent = `v${WERSJA}   ${czasSesji()}`;

    const trasa = activeRoute();
    const karta = kartaGracza();
    const buforWiek = rec && rec.state === "recording"
      ? (buforWorker?buforSekundy:(Date.now() - recStart) / 1000).toFixed(0) : "-";

    if (Date.now() - elemCzas > 2000) {
      elemCzas = Date.now();
      liczbaElem = document.getElementsByTagName("*").length;
    }
    const tr0 = (video.srcObject && video.srcObject.getVideoTracks
      ? video.srcObject.getVideoTracks()[0] : null);
    const bajty = bajtyBufora;
    const wiekBuf = rec && rec.state === "recording"
      ? (Date.now() - recStart) / 1000 : 0;

    const L = [
      ["KAMERA", camState],
      ["  klatki", `rysowane ${fpsZmierzone || "?"}/s   ` +
        `tor=${tr0 ? tr0.readyState : "brak"}${tr0 && tr0.muted ? " WYCISZONY" : ""}   ` +
        `odrzucone=${proby.length}`],
      ["WYDAJNOSC", `ui=${uiFps}/s${uiFps && uiFps < 20 ? " NISKIE!" : ""}  ` +
        `js=${msKlatki.toFixed(1)}ms  skany=${skanyNaSek}/s  elem=${elemCzas?liczbaElem:"niezmierzone"}`],
      ["  limity", `maxSzer=${cal.maxSzer}px  ${cal.powBitrate} Mb/s  ` +
        `${cal.powWl ? "nagrywa" : "bez nagrywania"}`],
      ["EKRAN", `${wMeczu() ? "mecz" : "POZA MECZEM"}   ` +
        `${bullOff() ? "BULL-OFF" : ""}`],
      ["TARCZA", `${boardState}${coversCircle ? "" : "   NIE ZAKRYWA"}`],
      ["  ukryty", powodUkrycia],
      ["  skala", `k=${scaleK.toFixed(3)}  ref=${Math.round(cal.refSize)}  ` +
        `kolo=${Math.round(curSize)}`],
      ["  kadr", `vz=${cal.vz.toFixed(2)} vx=${Math.round(cal.vx)} ` +
        `vy=${Math.round(cal.vy)}`],
      ["  persp", `rx=${cal.rx} ry=${cal.ry} rz=${cal.rz} ` +
        `sx=${cal.sx.toFixed(2)} sy=${cal.sy.toFixed(2)}`],
      ["TRYB", `${(cal.trybGry || "auto").toUpperCase()}→${trybSkuteczny().toUpperCase()}   ` +
        `gracz="${cal.gracz || "(puste)"}"`],
      ["KOLEJKA", `${turnState}`],
      ["  karta", karta
        ? `"${(karta.textContent || "").trim().replace(/\s+/g, " ").slice(0, 26)}"`
        : "NIE WYKRYTO"],
    ];

    const P = [
      ["TRASA", trasa ? trasa.join("+") : "brak"],
      ["  wynik", `zostalo=${remaining === null ? "-" : remaining}  ` +
        `pol=${routeLen}  prog=${cal.zoomProg}`],
      ["  rzuty", `${rzutyTeraz} [${rzutyTeksty.join(" ")}]  ` +
        `baza=${rzutyBaza === null ? "-" : rzutyBaza}`],
      ["ZOOM", zoomState],
      ["  stan", `etap=${zoomEtap} Z=${zoomAktualny.toFixed(2)} ` +
        `tx=${Math.round(zoomTx)} ty=${Math.round(zoomTy)} cel="${ostatniCel}"`],
      ["  held", heldTarget ? heldTarget.txt : "-"],
      ["POWTORKA", `${replayState}`],
      ["  zrodlo", `${zrodloPowtorki}   o ${czasPowtorki}`],
      ["  legwin", legPowod],
      ["  dziennik", `${dziennikPelny.length} wpisów  ` +
        `znaczniki=${licznikZnacznikow}   Y=znacznik`],
      ["  autozapis", stanZapisu],
      ["  websocket", `${wsWiadomosci} wiad.  ${wsKanaly.size} strumieni  ` +
        `${cal.wsDiag ? "" : "(zapis wyłączony)"}`],
      ["  z danych", `player=${wsGracz === null ? "-" : wsGracz}  ` +
        `wynik=[${wsWynik || "-"}]  ` +
        `winner=${wsWinner === null ? "-" : wsWinner}  ` +
        `throws=${wsThrows === null ? "-" : wsThrows}`],
      ["  faza", `${replayPhase}  tryb=${trybPowtorki}  ` +
        `petla=${cal.powPetla ? "TAK" : "nie"}`],
      ["  film", `${(replayVideo.currentTime || 0).toFixed(1)}/` +
        `${powDlugosc.toFixed(1)}s  tempo=${cal.powTempo}x  ` +
        `ujecie=${dlugoscUjecia}s`],
      ["  bufor", `wiek=${buforWiek}s/${cal.powBuforSek}s  ` +
        `fragm=${chunks.length} (${wiekBuf > 1 ?
          (chunks.length / wiekBuf).toFixed(1) : "?"}/s)  ` +
        `${(bajty / 1048576).toFixed(1)}MB`],
      ["  tor", `${buforTryb}${mp4Fallback?"; MP4 odmowa: "+mp4Fallback:""}`],
      ["  klatki", torRaport],
      ["  plik", `${(rec?.mimeType || mime() || "?").replace("video/", "")}  ` +
        `dlug=${dlugoscPliku.toFixed(1)}s zegar=${powBufSek.toFixed(1)}s  ` +
        `korekta=${korektaCzasu.toFixed(2)}`],
      ["  opcje", `zoomWpow=${cal.powZoomWl ? "TAK" : "nie"}  ` +
        `tylkoMoje=${cal.powTylkoMoje ? "tak" : "nie"}  ` +
        `poKoncu=${cal.powPoKoniecSek}s`],
    ];

    const zloz = (t) => t.map(([a, b]) =>
      a.padEnd(9) + " " + b).join("\n");
    diagL.textContent = zloz(L);
    diagP.textContent = zloz(P);
    diagLog.textContent = logBledow.length
      ? logBledow.slice(0, 12).join("\n") : "(brak zdarzeń)";
  }

  let kreator=null, zamknijKreator=null, hCache=null, hCacheKey='';
  const KALIBRACJA_BACKUP='adCamCalibrationUndo';
  const KLUCZE_KAL=['vx','vy','vz','rx','ry','rz','persp','sx','sy','bcx','bcy','brad','dx','dy','cover','manual','size','refSize','punktowa','marginesNumerow'];
  function kopiaKalibracji(){const b={};for(const k of KLUCZE_KAL)b[k]=cal[k];
    try{localStorage.setItem(KALIBRACJA_BACKUP,JSON.stringify(b));return true;}
    catch(e){toast('Nie udało się zapisać kopii kalibracji');return false;}}
  function cofnijKalibracje(){try{const b=JSON.parse(localStorage.getItem(KALIBRACJA_BACKUP)||'null');
    if(!b)return toast('Brak poprzedniej kalibracji');
    const obecna={};for(const k of KLUCZE_KAL){obecna[k]=cal[k];if(Object.hasOwn(b,k))cal[k]=b[k];}
    localStorage.setItem(KALIBRACJA_BACKUP,JSON.stringify(obecna));hCacheKey='';lastK=-1;applyTransform();save();
    toast('Przywrócono poprzednią kalibrację');
  }catch(e){toast('Nie udało się przywrócić kalibracji');}}
  function homografia(p, diameter=.94){
    if(!Array.isArray(p)||p.length!==5||p.some(q=>!q||!Number.isFinite(q.x)||!Number.isFinite(q.y)||q.x<0||q.x>1||q.y<0||q.y>1))throw Error('Wskaż pięć punktów na obrazie');
    if(!Number.isFinite(diameter)||diameter<.5||diameter>.94)throw Error('Błędny margines numerów');
    const r=diameter/2,src=p.slice(1),dst=[{x:.5,y:.5-r},{x:.5+r,y:.5},{x:.5,y:.5+r},{x:.5-r,y:.5}],A=[];
    let sign=0;
    for(let i=0;i<4;i++){const a=src[i],b=src[(i+1)%4],c=src[(i+2)%4];const cross=(b.x-a.x)*(c.y-b.y)-(b.y-a.y)*(c.x-b.x);
      if(cross<.001)throw Error('Sprawdź kolejność: góra, prawo, dół, lewo');sign+=cross;}
    if(sign<.03)throw Error('Tarcza jest zbyt mała — ustaw kamerę bliżej');
    for(let i=0;i<4;i++){const {x,y}=src[i],u=dst[i].x,v=dst[i].y;
      A.push([x,y,1,0,0,0,-u*x,-u*y,u],[0,0,0,x,y,1,-v*x,-v*y,v]);}
    for(let k=0;k<8;k++){let pivot=k;for(let j=k+1;j<8;j++)if(Math.abs(A[j][k])>Math.abs(A[pivot][k]))pivot=j;
      [A[k],A[pivot]]=[A[pivot],A[k]];const d=A[k][k];if(Math.abs(d)<1e-9)throw Error('Punkty nie wyznaczają tarczy');
      for(let j=k;j<=8;j++)A[k][j]/=d;
      for(let i=0;i<8;i++)if(i!==k){const f=A[i][k];for(let j=k;j<=8;j++)A[i][j]-=f*A[k][j];}}
    const h=A.map(r=>r[8]);h.push(1);
    for(const q of [{x:0,y:0},{x:1,y:0},{x:0,y:1},{x:1,y:1}])if(h[6]*q.x+h[7]*q.y+1<.02)throw Error('Zbyt mocna perspektywa — zmień położenie kamery');
    const bull=rzutPunktu(h,p[0]);if(Math.hypot(bull.x-.5,bull.y-.5)>.04)throw Error('Bull nie pasuje do obwodu — popraw wskazane punkty');
    return h;
  }
  function rzutPunktu(h,p){const d=h[6]*p.x+h[7]*p.y+1;return{x:(h[0]*p.x+h[1]*p.y+h[2])/d,y:(h[3]*p.x+h[4]*p.y+h[5])/d};}
  function macierzCSS(h,size){return 'matrix3d('+[h[0],h[3],0,h[6]/size,h[1],h[4],0,h[7]/size,0,0,1,0,h[2]*size,h[5]*size,0,1].join(',')+')';}
  function srednicaPol(){return .94*(1-Math.max(0,Math.min(40,Number(cal.marginesNumerow)||0))/100);}
  function promienPol(){return aktywnaHomografia()?srednicaPol():cal.brad;}
  function aktywnaHomografia(){
    const p=cal.punktowa;if(!p||!p.enabled)return null;
    const key=JSON.stringify([p,cal.marginesNumerow]);
    if(key!==hCacheKey){hCacheKey=key;try{hCache=homografia(p.points,srednicaPol());}catch(e){hCache=null;zaloguj('kalibracja punktowa: '+e.message);}}
    if(video?.videoWidth&&Math.abs(video.videoWidth/video.videoHeight-p.ratio)>.02)return null;
    return hCache;
  }
  function otworzKreator(){
    if(kreator)return;
    if(inReplay)return toast(t('Zamknij powtórkę przed kalibracją'));
    const focusBefore=document.activeElement;
    const root=el('div',{position:'fixed',inset:'0',zIndex:'11000',background:'rgba(4,8,15,.98)',color:C.tekst,font:C.font,overflow:'auto',padding:'20px',boxSizing:'border-box'});
    root.dataset.adcamUi='wizard';root.setAttribute('role','dialog');root.setAttribute('aria-modal','true');root.setAttribute('aria-label',t('Kalibracja kamery'));
    kreator=root;let points=[],frozen=null,imageUrl=null,drag=-1,closed=false;
    const close=()=>{closed=true;if(imageUrl)URL.revokeObjectURL(imageUrl);root.remove();kreator=null;zamknijKreator=null;focusBefore?.focus?.();};
    zamknijKreator=close;
    root.addEventListener('keydown',e=>{e.stopPropagation();if(e.key==='Escape')close();
      if(e.key==='Tab'){const nodes=[...root.querySelectorAll('button,input,select,[tabindex="0"]')].filter(n=>!n.disabled);const i=nodes.indexOf(document.activeElement);
        if(e.shiftKey&&i<=0){e.preventDefault();nodes.at(-1)?.focus();}else if(!e.shiftKey&&i===nodes.length-1){e.preventDefault();nodes[0]?.focus();}}});
    root.appendChild(el('h2',{margin:'0 0 8px'},t('Dopasuj obraz kamery')));
    root.appendChild(el('p',null,t('Wybierz kamerę, zatrzymaj obraz i wskaż bull oraz cztery punkty na zewnętrznej krawędzi pól podwójnych. Punkty możesz poprawić przeciąganiem.')));
    const toolbar=el('div',{display:'flex',gap:'8px',flexWrap:'wrap',marginBottom:'12px'});root.appendChild(toolbar);
    const select=el('select',{maxWidth:'360px',padding:'8px'});select.setAttribute('aria-label',t('Kamera'));toolbar.appendChild(select);
    const btn=(parent,label,fn)=>{const b=el('button',{padding:'8px 12px',borderRadius:'8px',cursor:'pointer',border:'1px solid #526174',background:'#182335',color:'#fff'},t(label));b.type='button';b.addEventListener('click',fn);parent.appendChild(b);return b;};
    const message=el('p',{color:'#64d9ff',minHeight:'24px'});root.appendChild(message);
    const area=el('div',{display:'flex',gap:'24px',flexWrap:'wrap',alignItems:'flex-start'});root.appendChild(area);
    const canvas=el('canvas',{width:'min(850px, 90vw)',height:'auto',touchAction:'none',cursor:'crosshair',border:'1px solid #63758b'});canvas.width=960;canvas.height=540;area.appendChild(canvas);
    const side=el('div',{width:'320px',maxWidth:'90vw'});area.appendChild(side);
    side.appendChild(el('p',null,t('Podgląd po dopasowaniu — sprawdź siatkę i środek tarczy')));
    const preview=el('div',{width:'300px',height:'300px',position:'relative',overflow:'hidden',borderRadius:'50%',background:'#000'});side.appendChild(preview);
    const img=el('img',{position:'absolute',width:'300px',height:'300px',left:'0',top:'0',transformOrigin:'0 0'});preview.appendChild(img);
    const grid=el('canvas',{position:'absolute',inset:'0',width:'300px',height:'300px',pointerEvents:'none'});grid.width=grid.height=300;preview.appendChild(grid);
    const g=grid.getContext('2d');g.strokeStyle='rgba(60,235,255,.65)';g.lineWidth=1;
    for(const r of [141,133,88,82,5,13].map(r=>r*srednicaPol()/.94)){g.beginPath();g.arc(150,150,r,0,Math.PI*2);g.stroke();}
    for(let i=0;i<20;i++){const a=(i*18+9)*Math.PI/180;g.beginPath();g.moveTo(150,150);g.lineTo(150+150*srednicaPol()*Math.sin(a),150-150*srednicaPol()*Math.cos(a));g.stroke();}
    const name=el('input',{padding:'8px',margin:'12px 0',width:'270px'});name.placeholder=t('Nazwa profilu (opcjonalnie)');name.setAttribute('aria-label',t('Nazwa profilu'));side.appendChild(name);
    const labels=[t('bull — sam środek'),t('góra: środek zewnętrznej krawędzi D20'),t('prawo: środek zewnętrznej krawędzi D6'),t('dół: środek zewnętrznej krawędzi D3'),t('lewo: środek zewnętrznej krawędzi D11')];
    const render=()=>{
      const c=canvas.getContext('2d');c.clearRect(0,0,canvas.width,canvas.height);if(frozen)c.drawImage(frozen,0,0);
      points.forEach((p,i)=>{const x=p.x*canvas.width,y=p.y*canvas.height;c.beginPath();c.arc(x,y,9,0,7);c.fillStyle='#00dcff';c.fill();c.fillStyle='#000';c.font='bold 12px sans-serif';c.fillText(String(i+1),x-4,y+4);});
      apply.disabled=true;
      if(!frozen){message.textContent=t('Naciśnij „Zatrzymaj obraz”. Podgląd gry nadal działa.');return;}
      if(points.length<5){message.textContent=t('Punkt {a}/5: {b}',{a:points.length+1,b:labels[points.length]});return;}
      try{const h=homografia(points,srednicaPol());img.style.transform=macierzCSS(h,300);message.textContent=t('Sprawdź podgląd. Przeciągnij błędny punkt lub zastosuj dopasowanie.');apply.disabled=false;}
      catch(e){message.textContent=t(e.message);img.style.transform='none';}
    };
    const freeze=()=>{if(!video||video.readyState<2||!video.videoWidth){message.textContent=t('Kamera nie jest jeszcze gotowa');return;}
      const f=document.createElement('canvas');f.width=video.videoWidth;f.height=video.videoHeight;f.getContext('2d').drawImage(video,0,0);
      frozen=f;canvas.width=f.width;canvas.height=f.height;points=[];
      f.toBlob(blob=>{if(closed||frozen!==f||!blob)return;if(imageUrl)URL.revokeObjectURL(imageUrl);imageUrl=URL.createObjectURL(blob);img.src=imageUrl;});render();};
    btn(toolbar,t('Zatrzymaj obraz'),freeze);btn(toolbar,'Cofnij punkt',()=>{points.pop();render();});btn(toolbar,t('Anuluj'),close);
    const apply=btn(side,t('Zastosuj dopasowanie'),()=>{try{homografia(points);if(!kopiaKalibracji())return;
      cal.punktowa={enabled:true,points:points.map(p=>({...p})),ratio:frozen.width/frozen.height,deviceId:video.srcObject?.getVideoTracks?.()[0]?.getSettings?.().deviceId||''};
      cal.bcx=cal.bcy=0;cal.brad=.94;hCacheKey='';lastK=-1;save();applyTransform();
      if(name.value.trim())zapiszProfil(name.value.trim());close();toast(t('Kalibracja zastosowana — możesz cofnąć zmianę w panelu'));
    }catch(e){message.textContent=t(e.message);}});
    btn(side,t('Cofnij poprzednią kalibrację'),cofnijKalibracje);
    const pt=e=>{const r=canvas.getBoundingClientRect();return{x:Math.max(0,Math.min(1,(e.clientX-r.left)/r.width)),y:Math.max(0,Math.min(1,(e.clientY-r.top)/r.height))};};
    canvas.addEventListener('pointerdown',e=>{if(!frozen)return;const p=pt(e),r=canvas.getBoundingClientRect();drag=points.findIndex(q=>Math.hypot((q.x-p.x)*r.width,(q.y-p.y)*r.height)<22);
      if(drag<0&&points.length<5){points.push(p);drag=points.length-1;}if(drag>=0){canvas.setPointerCapture(e.pointerId);points[drag]=p;render();}});
    canvas.addEventListener('pointermove',e=>{if(drag>=0){points[drag]=pt(e);render();}});
    canvas.addEventListener('pointerup',()=>{drag=-1;});canvas.addEventListener('pointercancel',()=>{drag=-1;});
    select.addEventListener('change',async()=>{cal.cameraDeviceId=select.value;cal.kamera=select.selectedOptions[0]?.textContent||'';save();frozen=null;points=[];apply.disabled=true;message.textContent=t('Uruchamiam wybraną kamerę…');select.disabled=true;await startCamera();if(!closed){select.disabled=false;render();}});
    document.body.appendChild(root);render();select.focus();
    listCams().then(devs=>{if(closed)return;select.replaceChildren();const id=video?.srcObject?.getVideoTracks?.()[0]?.getSettings?.().deviceId;
      for(const d of devs){const o=el('option',null,d.label||t('Kamera'));o.value=d.deviceId;o.selected=d.deviceId===id;select.appendChild(o);}}).catch(()=>{if(!closed)message.textContent=t('Nie udało się odczytać listy kamer');});
  }
  let panelStatus, panelKamera, panelNagrywanie, panelPowtorka, panelBody, panelMargin, panelMarginLabel, panelTestButton, panelRozwiniety=true;
  let odswiezFormatNagrania=null;
  function buildWyborFormatu(parent){
    naglowek(parent,t('Format powtórek'));
    const select=el('select',{width:'100%',padding:'9px',background:C.tlo2,color:C.tekst,border:'1px solid '+C.ramka,borderRadius:'8px'});
    select.setAttribute('aria-label',t('Format powtórek'));
    for(const [value,label] of [['auto',t('Automatycznie — zalecane')],['mp4','MP4 / H.264'],['webm','WebM']]){const o=el('option',null,label);o.value=value;select.appendChild(o);}
    parent.appendChild(select);
    podpowiedz(parent,t("Zalecamy Automatycznie: aplikacja użyje MP4, a jeśli będzie niedostępny — WebM. Wybierz MP4 lub WebM, gdy potrzebujesz konkretnego formatu."));
    podpowiedz(parent,t("Po zmianie formatu poczekaj, aż nagrają się nowe sekundy do powtórki."));
    const state=el('div',{fontSize:'12px',margin:'8px 0',overflowWrap:'anywhere'});state.setAttribute('role','status');state.setAttribute('aria-live','polite');parent.appendChild(state);
    const retry=przycisk(parent,t('Ponów próbę MP4'),()=>{zmienFormatZapisu(trybZapisu(),cal.powFormat,true);refresh(true);});
    const adv=sekcjaRozwijana(parent,t('Kodek WebM — zaawansowane'));
    const codec=el('select',{width:'100%',padding:'8px',background:C.tlo2,color:C.tekst});codec.setAttribute('aria-label',t('Kodek WebM'));
    const formats=dostepneFormaty();
    if(!formats.length){const o=el('option',null,t('WebM niedostępny'));o.value='';codec.appendChild(o);}
    for(const f of formats){const o=el('option',null,f.id);o.value=f.id;codec.appendChild(o);}
    adv.appendChild(codec);podpowiedz(adv,t("Dotyczy filmów WebM, także gdy aplikacja wybierze ten format automatycznie. Jeśli nie wiesz, który wybrać, pozostaw VP8."));
    let lastState=null;
    function refresh(force=false){
      const mode=trybZapisu(),busy=inReplay||bufowanie||!!zamykanieNagrania||buforOczekujace.size>0;
      const key=JSON.stringify([mode,busy,cal.powWl,cal.powFormat,rec?.state,rec?.mimeType,mp4Fallback]);
      if(!force&&key===lastState)return;lastState=key;
      select.value=mode;select.disabled=busy||!cal.powWl;
      codec.value=(formats.find(f=>f.id===cal.powFormat)||formats[0]||{}).id||'';codec.disabled=busy||!cal.powWl||!formats.length||mode==='mp4';
      retry.style.display=mp4Fallback&&mode!=='webm'?'':'none';retry.disabled=busy||!cal.powWl;
      let text=!cal.powWl?t('Nagrywanie wyłączone'):rec?.state==='starting'?t('Uruchamiam MP4…'):rec?.state==='recording'?t('Aktywny format')+': '+(rec.mp4?'MP4 / H.264':'WebM'):t('Brak aktywnego nagrania');
      if(mp4Fallback&&mode!=='webm')text+=' · '+t(mode==='auto'?(rec?.state==='recording'&&!rec.mp4?'MP4 niedostępny — używam WebM':'MP4 niedostępny'):'MP4 niedostępny — wybierz Automatycznie lub WebM');
      if(busy)text+=' · '+t('Zmiana dostępna po zamknięciu powtórki');
      if(state.textContent!==text)state.textContent=text;
    }
    select.addEventListener('change',()=>{zmienFormatZapisu(select.value);refresh(true);});
    codec.addEventListener('change',()=>{zmienFormatZapisu(trybZapisu(),codec.value);refresh(true);});
    for(const node of [select,codec])node.addEventListener('keydown',e=>e.stopPropagation());
    parent._odswiez=parent._odswiez||[];parent._odswiez.push(refresh);
    odswiezFormatNagrania=refresh;refresh();
  }
  let panelKrotki, panelZapisz, panelStan=null, panelZwin, panelReczny, panelKtoGra;
  let panelPasek, panelKropka, panelTytul, panelBladKamery, panelIkona;
  let panelPrzesuwany = false;
  let zakladkiPasek=null, oknoStopka=null, kameryEtykiety={}, migawkaDopasowania=null;
  function ustawWidocznoscKamery(on){visible=!!on;cal.obrazWl=visible;save();drawHud();}
  function statusMaterialu(){
    if(bladBufora)return t('Nagrywanie przerwane. Połącz kamerę ponownie.');
    if(!cal.powWl)return t('Nagrywanie powtórek wyłączone');
    if(inReplay)return t(replayPhase==='pauza'?'Przygotowuję film…':replayPhase==='stopklatka'?'Stopklatka — możesz odtworzyć ponownie':'Odtwarzam powtórkę');
    if(zamykanieNagrania)return t('Przygotowuję film…');
    if(!rec||rec.state!=='recording')return t('Czekam na nagrywanie');
    const sec=buforWorker?buforSekundy:Math.max(0,(Date.now()-recStart)/1000);
    const stale=buforWorker&&Date.now()-buforOstatnieDane>5000;
    if(stale)return t('Brak nowych klatek — sprawdź kamerę');
    const tor=rec.mp4?'MP4 · ':((typeof mp4Fallback!=='undefined'&&mp4Fallback&&trybZapisu()==='auto')?'WebM · ':'');
    return tor+(sec<cal.powRecznaSek?t('Zbieram materiał: {a} / {b} s',{a:sec.toFixed(0),b:cal.powRecznaSek}):t('Powtórka gotowa · ostatnie {a} s',{a:cal.powRecznaSek}));
  }
  function otworzUstawienia(id='obraz'){
    powrotFokusu=document.activeElement;labOtwarte=false;if(labOkno)labOkno.style.display='none';
    oknoOtwarte=true;okno.style.display='block';pokazKarte(id);drawHud();okno.querySelector('button')?.focus();
  }
  function zamknijPanele(){
    if(migawkaDopasowania)konczDopasowanie(false);
    oknoOtwarte=false;labOtwarte=false;if(okno)okno.style.display='none';if(labOkno)labOkno.style.display='none';
    save();drawHud();if(powrotFokusu?.isConnected)powrotFokusu.focus();
  }
  function otworzLab(){
    if(!DEV_UI)return;
    if(migawkaDopasowania)konczDopasowanie(false);
    if(!labOkno)buildLab();
    powrotFokusu=document.activeElement;oknoOtwarte=false;okno.style.display='none';labOtwarte=true;
    labOkno.style.display='block';drawHud();labOkno.querySelector('button')?.focus();
  }
  // Dolny pasek Autodarts, zeby pasek Frameback z nim licowal. Szukamy
  // elementem pod punktem na dole srodka ekranu i idziemy w gore drzewa -
  // jeden elementFromPoint i kilka odczytow prostokata zamiast skanu calego
  // DOM. Przy tempie, o ktore walczymy, koszt skanowania ma znaczenie.
  let pasekAD = null, pasekADczas = 0;
  function pasekAutodarts() {
    if (Date.now() - pasekADczas < 2000) return pasekAD;
    pasekADczas = Date.now();
    pasekAD = null;
    try {
      const vw = window.innerWidth, vh = window.innerHeight;
      let e = document.elementFromPoint(Math.round(vw / 2), vh - 45);
      for (let i = 0; e && i < 8; i++, e = e.parentElement) {
        if (nasze(e)) continue;
        const r = e.getBoundingClientRect();
        if (r.height >= 36 && r.height <= 96 && r.width >= vw * 0.3 && vh - r.bottom < 140) {
          let promien = 0;
          try { promien = parseFloat(getComputedStyle(e).borderRadius) || 0; } catch (x) {}
          pasekAD = { wys: r.height, dol: vh - r.bottom, promien };
          break;
        }
      }
    } catch (e) {}
    return pasekAD;
  }

  const PANEL_KEY = "adCamPanel";
  // W spoczynku panel to sama pastylka: tryb gry i ikona kamery. Reszta
  // pokazuje sie dopiero po klknieciu ikony. Pole "v" odroznia stan zapisany
  // przed ta decyzja - taki zwijamy raz, zeby nowy uklad byl widoczny bez
  // czyszczenia pamieci przegladarki przez uzytkownika.
  const PANEL_UKLAD = 2;
  function stanPanelu() {
    try {
      const o = JSON.parse(localStorage.getItem(PANEL_KEY) || "null");
      if (o && typeof o === "object")
        return { x: Number.isFinite(o.x) ? o.x : null, y: Number.isFinite(o.y) ? o.y : null,
                 zwiniety: o.v >= PANEL_UKLAD ? !!o.zwiniety : true, v: PANEL_UKLAD };
    } catch (e) {}
    return { x: null, y: null, zwiniety: true, v: PANEL_UKLAD };
  }
  function zapiszStanPanelu() {
    try { localStorage.setItem(PANEL_KEY, JSON.stringify(panelStan)); } catch (e) {}
  }
  // Pozycja panelu nie idzie do cal ani do profili: to preferencja okna,
  // a nie element kalibracji. Wrzucenie jej do profilu psuloby kopie.
  function ustawPozycjePanelu() {
    if (!hud || !panelStan) return;
    const bar = pasekAutodarts();
    const reczne = Number.isFinite(panelStan.x) && Number.isFinite(panelStan.y);
    const dol = reczne ? 6 : Math.max(6, Math.min(window.innerHeight - 44,
      bar ? Math.round(bar.dol + (bar.wys - 36) / 2) : 18));
    hud.style.maxHeight = Math.max(38, window.innerHeight - dol - 6) + "px";
    // Pomiar tylko po zmianie rozmiaru/treści, nie w każdej klatce gry.
    const key = [window.innerWidth,window.innerHeight,hud.style.width,hud.style.display,panelRozwiniety,
      panelBladKamery?.style.display,panelReczny?.style.display,panelKtoGra?.textContent].join('|');
    if(hud._layoutKey!==key||hud._layoutDirty){
      hud._layoutKey=key;hud._layoutDirty=false;
      hud._rozmiar={w:hud.offsetWidth||256,h:hud.offsetHeight||38};
    }
    const {w,h}=hud._rozmiar;
    if (reczne) {
      // Zachowujemy kotwicę pastylki. Rozwinięcie i zmiana okna tylko korygują
      // pozycję wyświetlania; zwinięta pastylka wraca na zapisane miejsce.
      const x=Math.max(6,Math.min(window.innerWidth-w-6,panelStan.x));
      const y=Math.max(6,Math.min(window.innerHeight-h-6,panelStan.y));
      Object.assign(hud.style,{left:x+'px',top:y+'px',right:'auto',bottom:'auto'});
    } else Object.assign(hud.style,{left:'auto',top:'auto',right:'18px',bottom:dol+'px'});
  }

  function kolorStatusu() {
    if (!camOk) return "#ff6b6b";
    if (cal.manual) return "#ffb454";
    if (bladBufora) return "#ff6b6b";
    if (!cal.powWl) return C.slaby;
    if (inReplay) return C.akcent;
    if (!rec || rec.state !== "recording" || zamykanieNagrania) return "#ffb454";
    if (buforWorker && Date.now() - buforOstatnieDane > 5000) return "#ff6b6b";
    const sek = buforWorker ? buforSekundy : Math.max(0, (Date.now() - recStart) / 1000);
    return sek < cal.powRecznaSek ? "#ffb454" : "#4ade80";
  }
  function krotkiStatus() {
    // Tryb reczny znaczy, ze kolo nie stoi na tarczy Autodarts. To wazniejsze
    // niz stan bufora - w sesji 4.39 wlaczyl sie przypadkiem i wygladal
    // jak zmniejszenie obrazu oraz tarcza wiszaca po meczu.
    if (!camOk) return t("Brak obrazu z kamery");
    if (cal.manual) return t("Tryb ręczny");
    if (bladBufora) return t("Błąd nagrywania");
    if (!cal.powWl) return t("Bez nagrywania");
    if (inReplay) return t(replayPhase === "stopklatka" ? "Stopklatka" : "Powtórka");
    if (zamykanieNagrania) return t("Przygotowuję…");
    if (!rec || rec.state !== "recording") return t("Czekam");
    if (buforWorker && Date.now() - buforOstatnieDane > 5000) return t("Brak klatek");
    const sec = buforWorker ? buforSekundy : Math.max(0, (Date.now() - recStart) / 1000);
    return sec < cal.powRecznaSek
      ? t("Zbieram {a}/{b} s", { a: sec.toFixed(0), b: cal.powRecznaSek })
      : t("Gotowe");
  }
  function kontrolkaPanelu(rodzic, etykieta, czytaj, przelacz) {
    const w = el("div", { display:"flex", alignItems:"center", justifyContent:"space-between",
      gap:"10px", padding:"6px 0", cursor:"pointer" });
    w.appendChild(el("span", { fontSize:"12px" }, etykieta));
    const gal = el("div", { width:"36px", height:"20px", borderRadius:"10px", background:C.tlo2,
      position:"relative", flex:"0 0 auto", transition:"background 160ms" });
    const kropka = el("div", { position:"absolute", top:"3px", left:"3px", width:"14px", height:"14px",
      borderRadius:"50%", background:"#fff", transition:"transform 160ms" });
    gal.appendChild(kropka); w.appendChild(gal);
    w.setAttribute("role","switch"); w.setAttribute("aria-label",etykieta); w.tabIndex = 0;
    w.addEventListener("click", przelacz);
    w.addEventListener("keydown", e => {
      if (e.key === " " || e.key === "Enter") { e.preventDefault(); e.stopPropagation(); przelacz(); }
    });
    const odswiez = () => {
      const on = !!czytaj();
      w.setAttribute("aria-checked", String(on));
      gal.style.background = on ? C.akcent : C.tlo2;
      kropka.style.transform = on ? "translateX(16px)" : "none";
    };
    rodzic.appendChild(w); odswiez();
    return { odswiez };
  }

  let stylDodany=false;
  function buildHud(){
    const css=stylDodany?null:el('style');if(css)css.textContent=`
      [data-wz-ui]{color-scheme:dark;font:14px/1.5 system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif;color:#eef3fb;box-sizing:border-box}
      [data-wz-ui] *,[data-wz-ui] *::before,[data-wz-ui] *::after{box-sizing:border-box;font-family:inherit;text-transform:none;letter-spacing:normal}
      [data-wz-ui] button,[data-wz-ui] input,[data-wz-ui] select{font-family:inherit;max-width:100%}
      [data-wz-ui] select option{background:#182533;color:#eef3fb}
      [data-wz-ui] select,[data-wz-ui] input{min-width:0}
      [data-wz-ui] [role=switch]{min-height:36px}
      [data-wz-ui] [role=switch][aria-disabled=true]{cursor:not-allowed}
      [data-wz-ui] [hidden]{display:none!important}
      [data-wz-ui] button{min-height:34px;cursor:pointer}
      [data-wz-ui] button:hover:not(:disabled){filter:brightness(1.2)}
      [data-wz-ui] button:disabled{opacity:.4;cursor:not-allowed;filter:none}
      [data-wz-ui] :focus-visible{outline:2px solid #55d9c1;outline-offset:3px}
      [data-wz-ui] summary{cursor:pointer;padding:12px 0;color:#bdcddd;font-weight:600;font-size:13px}
      [data-wz-ui] details{border-top:1px solid #304355;margin-top:14px}
      [data-wz-ui] h2{margin:0;font-size:17px;font-weight:600;line-height:1.3;color:#eef3fb}
      [data-wz-ui] fieldset{border:none;padding:0;margin:0;min-width:0}
      [data-wz-ui] input[type=range]{min-height:26px}
    `;if(css){document.head.appendChild(css);stylDodany=true;}
    panelStan=stanPanelu();
    hud=el('section',{position:'fixed',zIndex:'10000',width:'256px',maxWidth:'calc(100vw - 28px)',
      background:'rgba(16,25,35,.97)',color:C.tekst,font:C.font,border:'1px solid #304355',
      borderRadius:'14px',boxShadow:'0 10px 40px #0007',pointerEvents:'auto',overflowY:'auto',overflowX:'hidden',overscrollBehavior:'contain'});
    hud.dataset.adcamUi='panel';hud.dataset.wzUi='player';
    hud.setAttribute('aria-label',MARKA+' '+t('— panel gry'));
    ustawPozycjePanelu();

    // Zwiniety pasek to jeden rzad licujacy z dolnym paskiem Autodarts.
    // Stan mowi kropka, nie zdanie - w trakcie gry i tak nikt go nie czyta,
    // a zabieral polowe szerokosci. Nazwa i pelny status sa po rozwinieciu.
    // W spoczynku panel to sama ikona. Napisy "Powtórka" i "Ustawienia"
    // zabieraly miejsce na to, co i tak siedzi pod R oraz J.
    panelPasek=el('div',{display:'flex',alignItems:'center',gap:'2px',padding:'3px',
      cursor:'grab',userSelect:'none',touchAction:'none',position:'sticky',top:'0',zIndex:'1',background:'inherit'});
    hud.appendChild(panelPasek);
    const top=panelPasek;
    if(!pigulka)buildTryb();
    panelPasek.appendChild(pigulka);
    panelPasek.appendChild(el('span',{width:'1px',height:'17px',flex:'0 0 auto',
      background:'rgba(255,255,255,.14)'}));
    panelIkona=el('button',{position:'relative',display:'flex',alignItems:'center',
      justifyContent:'center',width:'30px',height:'30px',padding:'0',minHeight:'0',
      flex:'0 0 auto',background:'transparent',border:'none',borderRadius:'999px',
      cursor:'pointer',color:C.slaby,transition:'color 200ms'});
    panelIkona.type='button';panelIkona.setAttribute('aria-controls','wz-panel-body');
    panelIkona.appendChild(svgIkona(IKONA_TV,19));
    panelKropka=el('span',{position:'absolute',top:'0',right:'0',width:'8px',height:'8px',
      borderRadius:'50%',background:C.slaby,border:'1px solid rgba(16,25,35,.9)',
      transition:'background 200ms'});
    panelKropka.setAttribute('role','status');
    panelKropka.setAttribute('aria-label',t('Stan nagrywania'));
    panelIkona.appendChild(panelKropka);
    panelPasek.appendChild(panelIkona);
    panelKrotki=el('span',{display:'none'});
    panelZwin=el('span',{display:'none'});
    // Tryb reczny i pytanie o gracza to stany wymagajace reakcji. Siedzialy
    // w zwijanej czesci panelu, czyli byly niewidoczne dokladnie wtedy, gdy
    // panel jest zwiniety - a tak gra sie na co dzien. Teraz sa nad nia.
    panelReczny=el('button',{width:'calc(100% - 24px)',margin:'0 12px 10px',padding:'8px',
      fontSize:'12px',borderRadius:'9px',border:'1px solid #7a5a20',background:'#3a2c12',
      color:'#ffd79a',display:'none',textAlign:'left',lineHeight:'1.35'});
    panelReczny.type='button';
    panelReczny.addEventListener('click',()=>{
      cal.manual=false;save();hCacheKey='';lastK=-1;applyTransform();
      zaloguj('tryb ręczny wyłączony z panelu');
      toast(t('wracam na tarczę Autodarts'));});
    hud.appendChild(panelReczny);

    // Czarne kolo bez wyjasnienia to najgorsza mozliwa odpowiedz. Gdy kamera
    // nie dziala, nakladka znika, a tutaj pojawia sie powod i jedno klikniecie.
    panelBladKamery=el('button',{width:'calc(100% - 24px)',margin:'0 12px 10px',padding:'8px',
      fontSize:'12px',borderRadius:'9px',border:'1px solid #7a2020',background:'#3a1414',
      color:'#ffb3b3',display:'none',textAlign:'left',lineHeight:'1.35'});
    panelBladKamery.type='button';
    panelBladKamery.addEventListener('click',()=>{
      camState='ponawiam…';toast(t('łączę kamerę…'));startCamera();});
    hud.appendChild(panelBladKamery);

    panelKtoGra=el('div',{display:'none',margin:'0 12px 10px',padding:'8px',
      borderRadius:'9px',background:'#22303f'});
    hud.appendChild(panelKtoGra);

    panelBody=el('div',{padding:'0 12px 12px',borderTop:'1px solid rgba(255,255,255,.06)'});
    panelBody.id='wz-panel-body';hud.appendChild(panelBody);
    panelTytul=el('div',{color:C.slaby,fontSize:'12px',margin:'8px 0 6px'},MARKA+' '+WERSJA);
    panelBody.appendChild(panelTytul);
    const akcje=el('div',{display:'flex',gap:'6px',margin:'0 0 8px'});panelBody.appendChild(akcje);
    const akcja=(label,akcja2,primary)=>{
      const b=el('button',{flex:'1',padding:'0 10px',height:'34px',minHeight:'0',fontSize:'12px',
        borderRadius:'9px',border:'1px solid #304355',color:primary?'#082c26':C.tekst,
        background:primary?'#55d9c1':'#1b2937',whiteSpace:'nowrap'},label);
      b.type='button';b.addEventListener('click',akcja2);akcje.appendChild(b);return b;};
    panelPowtorka=akcja(t('Powtórka'),()=>{
      if(inReplay){if(odNowa&&replayPhase==='stopklatka')odNowa();else przerwij('panel');}
      else probujPowtorke('reczna','panel');},true);
    akcja(t('Ustawienia'),()=>otworzUstawienia());
    panelStatus=el('p',{color:C.akcent,margin:'0 0 8px',fontSize:'12px',lineHeight:'1.45'});
    panelStatus.setAttribute('role','status');panelBody.appendChild(panelStatus);
    panelKamera=kontrolkaPanelu(panelBody,t('Obraz z kamery'),()=>visible,()=>ustawWidocznoscKamery(!visible));
    panelNagrywanie=kontrolkaPanelu(panelBody,t('Nagrywanie powtórek'),()=>cal.powWl,()=>ustawNagrywanie(!cal.powWl));
    panelZapisz=el('button',{width:'100%',marginTop:'8px',padding:'8px',fontSize:'12px',
      borderRadius:'9px',border:'1px solid #304355',background:'#1b2937',color:C.tekst},
      t('Zapisz ostatnią powtórkę'));
    panelZapisz.type='button';
    panelZapisz.addEventListener('click',()=>{
      if(ostatniaPowtorka)zapiszPlik(ostatniaPowtorka.blob,ostatniaPowtorka.checkout);});
    panelBody.appendChild(panelZapisz);

    // Jeden timer na instancję panelu. Nie resetujemy go z pętli drawHud.
    const PANEL_BEZCZYNNOSC_MS=5000;
    let timerZwin=null,pointerWPanelu=false;
    const anulujZwin=()=>{if(timerZwin!==null)clearTimeout(timerZwin);timerZwin=null;};
    const aktywnoscPanelu=()=>{
      anulujZwin();
      if(!panelRozwiniety||pointerWPanelu||oknoOtwarte||labOtwarte)return;
      timerZwin=setTimeout(()=>{
        timerZwin=null;
        if(pointerWPanelu||oknoOtwarte||labOtwarte||hud.style.display==='none')return;
        panelRozwiniety=false;panelStan.zwiniety=true;
        // Fokus nie może zostać w ukrytym przycisku. Nie zabieramy go stronie.
        if(panelBody.contains?.(document.activeElement))panelIkona.focus();
        zapiszStanPanelu();zastosujZwin();
        zaloguj('panel zwinięty automatycznie: 5 s bezczynności');
      },PANEL_BEZCZYNNOSC_MS);
    };
    const puszczono=()=>{if(pointerWPanelu){pointerWPanelu=false;aktywnoscPanelu();}};
    for(const ev of ['click','keydown','input','change','focusin','wheel','scroll'])
      hud.addEventListener(ev,aktywnoscPanelu,{passive:true,capture:true});
    hud.addEventListener('pointerdown',()=>{pointerWPanelu=true;anulujZwin();},{passive:true});
    hud.addEventListener('pointerup',puszczono,{passive:true});
    hud.addEventListener('pointercancel',puszczono,{passive:true});
    // Także puszczenie przycisku poza panelem kończy przytrzymanie.
    window.addEventListener?.('pointerup',puszczono,{passive:true});
    window.addEventListener?.('pointercancel',puszczono,{passive:true});
    hud._aktywnosc=aktywnoscPanelu;
    hud._sprzataj=()=>{anulujZwin();window.removeEventListener?.('pointerup',puszczono);window.removeEventListener?.('pointercancel',puszczono);};
    panelRozwiniety=!panelStan.zwiniety;
    const zastosujZwin=()=>{
      panelBody.hidden=!panelRozwiniety;
      panelIkona.setAttribute('aria-expanded',String(panelRozwiniety));
      panelIkona.setAttribute('aria-label',t(panelRozwiniety?'Ukryj panel':'Pokaż panel'));
      ustawSzerokosc();ustawPozycjePanelu();aktywnoscPanelu();};
    const ustawSzerokosc=()=>{
      const ostrzezenie=(panelBladKamery&&panelBladKamery.style.display!=='none')||
        (panelReczny&&panelReczny.style.display!=='none')||
        (panelKtoGra&&panelKtoGra.style.display!=='none');
      const szeroki=panelRozwiniety||ostrzezenie;
      hud.style.width=szeroki?'256px':'auto';
      const bar=pasekAutodarts();
      hud.style.borderRadius=szeroki
        ?((bar&&bar.promien?Math.min(22,Math.round(bar.promien)):14)+'px')
        :'999px';
      hud.style.background=szeroki?'rgba(16,25,35,.97)':'rgba(13,16,23,.78)';
      panelPasek.style.padding=szeroki?'5px 7px':'3px';};
    panelIkona.addEventListener('keydown',e=>{
      if(e.key===' '||e.key==='Enter'){e.preventDefault();e.stopPropagation();
        panelRozwiniety=!panelRozwiniety;panelStan.zwiniety=!panelRozwiniety;
        zapiszStanPanelu();zastosujZwin();}});
    hud._szerokosc=()=>ustawSzerokosc();
    panelIkona.addEventListener('click',()=>{
      // Zasada z 4.47, czwarty raz w tym projekcie: stan, w ktorym klikniecie
      // nic nie robi, ma miec nazwe w dzienniku. Usterka z 4.49 byla
      // niewidoczna wlasnie dlatego, ze klik ginal bez jednej linii sladu.
      if(panelPrzesuwany){zaloguj('klik w ikonę panelu pominięty: przeciąganie');return;}
      panelRozwiniety=!panelRozwiniety;panelStan.zwiniety=!panelRozwiniety;
      zapiszStanPanelu();zastosujZwin();
      zaloguj('panel '+(panelRozwiniety?'rozwinięty':'zwinięty'));});
    zastosujZwin();

    // Pastylka jest jednoczesnie uchwytem do przeciagania i jedynym miejscem,
    // gdzie stoja jej dwa przyciski. Przechwycony wskaznik zabiera klikniecie:
    // Chromium doreacza click ELEMENTOWI PRZECHWYTUJACEMU, nie przyciskowi pod
    // kursorem - wiec dopoki setPointerCapture stalo w pointerdown, ani tryb
    // gry, ani ikona panelu nie dostawaly swojego zdarzenia. Ani razu, takze
    // przy nieruchomej myszy; releasePointerCapture w pointerup tego nie cofa.
    // Przechwyt jest jednak potrzebny do samego przeciagania - bez niego panel
    // gubi wskaznik, gdy ten wyjdzie poza pastylke. Dlatego zakladamy go
    // dopiero po przekroczeniu progu, czyli wtedy, gdy to juz nie jest klik.
    const PROG_CHWYTU=4;
    let chwyt=null;
    top.addEventListener('pointerdown',e=>{
      if(e.button!=null&&e.button!==0)return;
      panelPrzesuwany=false;
      const r=hud.getBoundingClientRect?hud.getBoundingClientRect():{left:0,top:0};
      chwyt={dx:e.clientX-r.left,dy:e.clientY-r.top,x0:e.clientX,y0:e.clientY,
        id:e.pointerId,zlapany:false};
      top.style.cursor='grabbing';
      });
    top.addEventListener('pointermove',e=>{
      if(!chwyt)return;
      if(e.buttons===0){chwyt=null;top.style.cursor='grab';return;}
      if(!chwyt.zlapany){
        // Drgniecie reki w trakcie klikniecia to nie przeciaganie. Bez progu
        // wystarczyl jeden piksel, zeby panelPrzesuwany polknal klik.
        if(Math.abs(e.clientX-chwyt.x0)<PROG_CHWYTU&&Math.abs(e.clientY-chwyt.y0)<PROG_CHWYTU)return;
        chwyt.zlapany=true;panelPrzesuwany=true;
        try{top.setPointerCapture(chwyt.id);}catch(_){}
      }
      const w=hud.offsetWidth||256,h=hud.offsetHeight||140;
      panelStan.x=Math.max(6,Math.min(window.innerWidth-w-6,e.clientX-chwyt.dx));
      panelStan.y=Math.max(6,Math.min(window.innerHeight-h-6,e.clientY-chwyt.dy));
      ustawPozycjePanelu();});
    const koniecChwytu=()=>{
      if(!chwyt)return;
      if(chwyt.zlapany){try{top.releasePointerCapture(chwyt.id);}catch(_){}}
      chwyt=null;top.style.cursor='grab';
      // Przy dolnej krawedzi przyciagamy do linii paska Autodarts, zeby oba
      // licowaly bez celowania w piksel.
      const bar=pasekAutodarts();
      if(bar&&Number.isFinite(panelStan.y)){
        const cel=window.innerHeight-bar.dol-(hud.offsetHeight||36);
        if(Math.abs(panelStan.y-cel)<30){panelStan.y=cel;ustawPozycjePanelu();}
      }
      zapiszStanPanelu();};
    top.addEventListener('pointerup',koniecChwytu);
    top.addEventListener('pointercancel',koniecChwytu);
    // Po przeciagnieciu klik trafia w uchwyt, bo wskaznik jest przechwycony.
    // Tu konczy sie zycie znacznika: inaczej przezylby swoje przeciaganie
    // i polknal nastepne, prawdziwe klikniecie. Klik w przycisk dociera tu
    // bablowaniem juz po jego wlasnej obsludze, wiec niczego nie psuje.
    top.addEventListener('click',()=>{panelPrzesuwany=false;});
    top.addEventListener('dblclick',()=>{panelStan.x=null;panelStan.y=null;ustawPozycjePanelu();zapiszStanPanelu();});

    document.body.appendChild(hud);
    if(typeof ResizeObserver!=='undefined'){
      hud._resizeObserver=new ResizeObserver(()=>{if(hud){hud._layoutDirty=true;ustawPozycjePanelu();}});
      hud._resizeObserver.observe(hud);
    }
    hud._layoutDirty=true;drawHud();
  }
  function drawHud(){
    odswiezFormatNagrania?.();
    if(!hud||!panelStatus)return;
    if(okno)okno.style.display=oknoOtwarte&&!oknoAplikacji&&!kreator?'block':'none';
    if(labOkno)labOkno.style.display=labOtwarte&&!oknoAplikacji&&!kreator?'block':'none';
    const panelBylWidoczny=hud.style.display==='block';
    hud.style.display=hudWidoczny&&!oknoAplikacji&&!kreator&&!oknoOtwarte&&!labOtwarte?'block':'none';
    if(!panelBylWidoczny&&hud.style.display==='block')hud._aktywnosc?.();
    if(pigulka)pigulka.style.display=!oknoAplikacji&&!kreator?'flex':'none';
    if(panelMargin){panelMargin.value=cal.marginesNumerow;panelMarginLabel.textContent=t('Margines na numery: {a}%',{a:cal.marginesNumerow});panelMargin.disabled=!cal.punktowa?.enabled;}
    if(panelTestButton){panelTestButton.textContent=testSession?.active?'Zapis testu trwa · '+testSession.events.length+' zdarzeń':testSession?.limit?'Limit testu — eksportuj plik':'Rozpocznij zapis testu';panelTestButton.disabled=!!testSession?.active;}
    const text=statusMaterialu();if(panelStatus.textContent!==text)panelStatus.textContent=text;
    const krotki=krotkiStatus();
    if(panelKropka){
      const kolor=kolorStatusu();
      if(panelKropka.style.background!==kolor)panelKropka.style.background=kolor;
      if(panelIkona)panelIkona.style.color=camOk?C.tekst:'#ff8a8a';
      if(hud._szerokosc)hud._szerokosc();
      const opis=MARKA+' \u2014 '+krotki;
      if(panelKropka.title!==opis)panelKropka.title=opis;
    }
    ustawPozycjePanelu();
    // Pigulka byla odswiezana tylko przy kliknieciu i przy budowie, wiec
    // podpowiedz "co rozpoznano" zastygala na stanie sprzed meczu. W sesji
    // 4.41 wszystkie przelaczenia padly przed startem meczu i przez cala gre
    // Auto nie pokazywalo niczego.
    odswiezTryb();
    if(panelKamera)panelKamera.odswiez();
    if(panelNagrywanie)panelNagrywanie.odswiez();
    const etyk=t(inReplay?(replayPhase==='stopklatka'?'Jeszcze raz':'Zamknij'):'Powtórka');
    if(panelPowtorka.textContent!==etyk)panelPowtorka.textContent=etyk;
    // Wylaczony przycisk nie wysyla klikniecia, wiec nie zostawia sladu i
    // wyglada jak awaria. Zamiast tego przygaszamy go, a probujPowtorke
    // odmawia z powodem - na ekranie i w dzienniku.
    const gotowa=inReplay||(cal.powWl&&rec&&rec.state==='recording'&&!zamykanieNagrania);
    panelPowtorka.disabled=false;
    panelPowtorka.style.opacity=gotowa?'1':'.55';
    // Nieaktywny przycisk musi powiedziec, czego brakuje. Sam wyszarzony
    // przycisk wyglada jak awaria, a nie jak "jeszcze nie ma czego odtworzyc".
    panelPowtorka.title=t(!gotowa
      ?(cal.powWl?'Nagrywanie jeszcze nie zebrało materiału.':'Włącz nagrywanie powtórek, aby móc odtwarzać.')
      :'Odtwórz ostatnie chwile · R');
    if(panelBladKamery){
      panelBladKamery.style.display=camOk?'none':'block';
      const opis=t('Brak obrazu — dotknij, aby połączyć kamerę');
      if(panelBladKamery.textContent!==opis)panelBladKamery.textContent=opis;
      panelBladKamery.title=t('Połączenie z kamerą nie działa. Sprawdź dostęp do kamery i spróbuj ponownie.');
    }
    if(panelReczny){
      panelReczny.style.display=!camOk?'none':cal.manual?'block':'none';
      const opis=t('Tryb ręczny — wróć na tarczę');
      if(panelReczny.textContent!==opis)panelReczny.textContent=opis;
      panelReczny.title=t('Koło stoi na środku ekranu, a nie na tarczy Autodarts. Kliknij, aby wrócić.');
    }
    // Gdy nie da sie ustalic, ktora strona jest nasza, pytamy raz i zapamietujemy.
    // Automat zawiodl w 4.39: token sesji Autodarts nie byl dostepny.
    if(panelKtoGra){
      const gracze=(st.players||[]).filter(g=>g&&g.name);
      const trzeba=zrodla.jaGracz==='nieustalony'&&gracze.length>1;
      const podpis=trzeba?gracze.map(g=>g.name).join('|'):'';
      if(panelKtoGra.dataset.podpis!==podpis){
        panelKtoGra.dataset.podpis=podpis;
        panelKtoGra.textContent='';
        if(trzeba){
          panelKtoGra.appendChild(el('div',{fontSize:'12px',color:C.slaby,marginBottom:'6px'},
            t('Który gracz to Ty?')));
          for(const g of gracze){
            const b=el('button',{width:'100%',marginTop:'4px',padding:'7px',fontSize:'12px',
              borderRadius:'8px',border:'1px solid '+C.ramka,background:C.tlo2,color:C.tekst},g.name);
            b.type='button';
            b.addEventListener('click',()=>{
              cal.gracz=g.name;if(g.boardId)cal.mojaTarcza=g.boardId;save();
              zaloguj('gracz wybrany w panelu: '+g.name);toast(t('zapamiętane'));});
            panelKtoGra.appendChild(b);
          }
        }
      }
      panelKtoGra.style.display=trzeba?'block':'none';
    }
    if(panelZapisz){
      const jest=!!ostatniaPowtorka;panelZapisz.disabled=!jest;
      panelZapisz.title=t(jest?'Zapisz ostatnio odtworzoną powtórkę na dysk'
        :'Najpierw odtwórz powtórkę — dopiero wtedy jest co zapisać.');}
  }
  function poprawneUstawienia(o){
    if(!o||typeof o!=='object'||Array.isArray(o))throw Error('Brak ustawień');
    const c={...DEF};
    for(const k of Object.keys(DEF)){if(!Object.hasOwn(o,k))continue;
      if(k==='geometriaSvg'){
        const p=o[k];if(p!==null&&(!p||p.v!==1||!Number.isFinite(p.kx)||!Number.isFinite(p.ky)||p.kx<.85||p.kx>1.4||p.ky<.85||p.ky>1.4||!Number.isFinite(p.ux)||!Number.isFinite(p.uy)||Math.abs(p.ux)>.1||Math.abs(p.uy)>.1))throw Error('Błędna geometria SVG');
        c[k]=p;continue;
      }
      if(k==='punktowa'){if(o[k]!==null){homografia(o[k].points);if(!Number.isFinite(o[k].ratio)||o[k].ratio<=0||typeof o[k].enabled!=='boolean')throw Error('Błędna kalibracja');}c[k]=o[k];continue;}
      if(typeof o[k]!==typeof DEF[k]||(typeof o[k]==='number'&&!Number.isFinite(o[k])))throw Error('Błędne ustawienie: '+k);
      c[k]=o[k];
    }
    for(const [k,min,max] of [['powOgonMs',300,3000],['marginesNumerow',0,40],['powBuforSek',15,90],['powRecznaSek',1,90],['powSek',.5,90],['powBitrate',2,40],['powTempo',.1,2],['persp',100,10000],['sx',.1,10],['sy',.1,10],['vz',.2,4]])
      if(c[k]<min||c[k]>max)throw Error('Wartość poza zakresem: '+k);
    if(Object.hasOwn(o,'powTryb')&&!['auto','mp4','webm'].includes(o.powTryb))throw Error('Błędny format nagrania');
    c.powTryb=trybZapisu(o);if(!DEV_UI){c.dziennikAuto=false;c.wsDiag=false;c.diagOkno=false;c.wsAnonim=true;}return c;
  }
  function exportBackup(){
    const data=JSON.stringify({format:'adcam-backup',version:WERSJA,settings:cal,profiles:profile()},null,2);
    const a=el('a');a.href=URL.createObjectURL(new Blob([data],{type:'application/json'}));a.download='autodarts-kopia-'+WERSJA+'.json';
    document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove();},1000);
  }
  function importBackup(){
    const input=el('input',{display:'none'});input.type='file';input.accept='.json,application/json';document.body.appendChild(input);
    input.addEventListener('cancel',()=>input.remove(),{once:true});
    input.addEventListener('change',async()=>{try{const f=input.files[0];if(!f)return;
      if(f.size>2*1048576)throw Error('Plik kopii jest zbyt duży');
      const o=JSON.parse(await f.text());if(o.format!=='adcam-backup')throw Error('To nie jest pełna kopia zapasowa');
      const settings=poprawneUstawienia(o.settings),profiles=Object.create(null);
      if(!o.profiles||typeof o.profiles!=='object'||Array.isArray(o.profiles))throw Error('Błędne profile');
      for(const [name,p] of Object.entries(o.profiles)){if(name.length>100)throw Error('Zbyt długa nazwa profilu');profiles[name]=poprawneUstawienia(p);}
      const oldSettings=localStorage.getItem(STORE),oldProfiles=localStorage.getItem(PROFILE);
      localStorage.setItem('adCamBeforeImport',JSON.stringify({settings:cal,profiles:profile()}));
      try{localStorage.setItem(STORE,JSON.stringify(settings));localStorage.setItem(PROFILE,JSON.stringify(profiles));}
      catch(e){if(oldSettings===null)localStorage.removeItem(STORE);else localStorage.setItem(STORE,oldSettings);if(oldProfiles===null)localStorage.removeItem(PROFILE);else localStorage.setItem(PROFILE,oldProfiles);throw e;}
      kopiaKalibracji();cal=settings;visible=cal.obrazWl;hCacheKey='';lastK=-1;applyTransform();odswiezProfile();await startCamera();przebudujUI();toast('Wczytano ustawienia i profile');
    }catch(e){zaloguj('Nie wczytano kopii: '+e.message);toast(t('Nie udało się wczytać kopii. Sprawdź, czy wybrano pełną kopię ustawień Frameback.'));}finally{input.remove();}},{once:true});input.click();
  }

  function zarejestruj(rodzic, pole) {
    rodzic._pola = rodzic._pola || [];
    rodzic._pola.push(pole);
    rodzic._odswiez = rodzic._odswiez || [];
    rodzic._odswiez.push(pole.odswiez);
  }

  function suwak(rodzic, etykieta, klucz, min, max, krok, jednostka, mnoznik) {
    etykieta=t(etykieta);jednostka=t(jednostka);
    const m = mnoznik || 1;
    const kd = krok * m;
    const d = kd < 1 ? (kd < 0.01 ? 3 : 2) : 0;
    const pokaz = v => (v * m).toFixed(d) + (jednostka || "");
    const wiersz = el("div", {
      display:"grid", gridTemplateColumns:"1fr auto auto", alignItems:"center",
      gap:"4px 8px", margin:"2px -8px", padding:"6px 8px",
      borderRadius:"8px", transition:"background 120ms",
    });
    const lab = el("label", { color:C.slaby, fontSize:"12px" }, etykieta);
    // Liczba jest polem, nie napisem: wartosc da sie wpisac, a nie tylko
    // dojechac suwakiem. Przy kroku 0.005 to roznica minuty i sekundy.
    const pole = el("input", {
      width:"76px", textAlign:"right", fontSize:"12px", color:C.akcent,
      background:C.tlo2, border:`1px solid ${C.ramka}`, borderRadius:"6px",
      padding:"3px 6px", fontVariantNumeric:"tabular-nums",
    });
    pole.type="text"; pole.inputMode="decimal";
    pole.setAttribute("aria-label", etykieta);
    pole.addEventListener("keydown", e => e.stopPropagation());
    const zeruj = el("button", {
      background:"transparent", border:"none", color:C.slaby,
      fontSize:"13px", padding:"2px 4px", minHeight:"0", lineHeight:"1",
    }, "\u21ba");
    zeruj.type="button";
    zeruj.title = t("Przywróć wartość domyślną: {a}",{a:pokaz(DEF[klucz])});
    zeruj.setAttribute("aria-label", t("Przywróć domyślne: {a}",{a:etykieta}));
    const inp = el("input", { width:"100%", gridColumn:"1 / -1", accentColor:C.akcent });
    inp.id = "wz-range-" + (++uiNumer); lab.htmlFor = inp.id;
    inp.addEventListener("keydown", e => e.stopPropagation());
    inp.type="range"; inp.min=min; inp.max=max; inp.step=krok;

    const odswiez = () => {
      inp.value = cal[klucz];
      if (document.activeElement !== pole) pole.value = pokaz(cal[klucz]);
      zeruj.style.visibility = Math.abs(cal[klucz] - DEF[klucz]) < krok / 2 ? "hidden" : "visible";
      wiersz.style.background = zeruj.style.visibility === "visible" ? "rgba(77,212,255,.05)" : "transparent";
    };
    const zapisz = () => { odswiez(); applyTransform(); save(); };
    const ustaw = v => {
      if (!Number.isFinite(v)) return odswiez();
      cal[klucz] = Math.min(max, Math.max(min, Math.round(v / krok) * krok));
      zapisz();
    };
    inp.addEventListener("input", () => { cal[klucz] = parseFloat(inp.value); zapisz(); });
    inp.addEventListener("change", () => zaloguj(`\u2699 ${klucz} = ${cal[klucz]}`));
    const zPola = () => {
      const t = String(pole.value).replace(",", ".").replace(/[^0-9.\-]/g, "");
      const v = parseFloat(t);
      if (Number.isFinite(v)) { ustaw(v / m); zaloguj(`\u2699 ${klucz} = ${cal[klucz]}`); }
      else odswiez();
    };
    pole.addEventListener("change", zPola);
    pole.addEventListener("blur", zPola);
    zeruj.addEventListener("click", () => { ustaw(DEF[klucz]); zaloguj(`\u2699 ${klucz} = ${cal[klucz]} (domyślne)`); });

    wiersz.appendChild(lab); wiersz.appendChild(pole); wiersz.appendChild(zeruj); wiersz.appendChild(inp);
    rodzic.appendChild(wiersz);
    odswiez();
    zarejestruj(rodzic, { wiersz, odswiez, etykieta,
      zmien: (kier, mnoz) => ustaw(cal[klucz] + kier * krok * mnoz) });
    return odswiez;
  }

  // poZmianie: ustawienia, ktore musza zadzialac od razu, a nie dopiero
  // przy nastepnej okazji - jak wlaczenie i wylaczenie nagrywania.
  function przelacznik(rodzic, etykieta, klucz, opis, poZmianie) {
    etykieta=t(etykieta);opis=t(opis);
    const wiersz = el("div", {
      display:"flex", alignItems:"center", justifyContent:"space-between",
      gap:"12px", margin:"4px -8px", padding:"7px 8px",
      cursor:"pointer", borderRadius:"8px", transition:"background 120ms",
    });
    const lewo = el("div");
    lewo.appendChild(el("div", { fontSize:"13px" }, etykieta));
    if (opis) lewo.appendChild(el("div", { color:C.slaby, fontSize:"12px" }, opis));

    const gal = el("div", {
      width:"40px", height:"22px", borderRadius:"11px",
      background:C.tlo2, position:"relative", flex:"0 0 auto",
      transition:"background 160ms",
    });
    const kropka = el("div", {
      position:"absolute", top:"3px", left:"3px", width:"16px",
      height:"16px", borderRadius:"50%", background:"#fff",
      transition:"transform 160ms",
    });
    gal.appendChild(kropka);

    wiersz.setAttribute("role","switch");
    wiersz.setAttribute("aria-label",etykieta);
    wiersz.tabIndex = 0;
    // Ustawienia funkcji wylaczonej nie znikaja - gasna i mowia dlaczego.
    // Znikajace kontrolki zmuszaja do pamietania, gdzie cos przedtem bylo.
    const zalezni = [];
    const odswiez = () => {
      const on = !!cal[klucz];
      wiersz.setAttribute("aria-checked", String(on));
      const disabled=!!wiersz.closest?.('fieldset[disabled]');
      wiersz.tabIndex=disabled?-1:0;wiersz.setAttribute('aria-disabled',String(disabled));
      gal.style.background = on ? C.akcent : C.tlo2;
      kropka.style.transform = on ? "translateX(18px)" : "none";
      for (const z of zalezni) {
        z.el.disabled = !on;
        for(const ctrl of z.el.querySelectorAll?.('[role="switch"]')||[]){
          const disabled=!!ctrl.closest('fieldset[disabled]');
          ctrl.tabIndex=disabled?-1:0;ctrl.setAttribute('aria-disabled',String(disabled));
        }
        z.el.style.opacity = on ? "1" : ".4";
        if (z.nota) z.nota.style.display = on ? "none" : "block";
      }
    };
    const przelacz = () => {
      if(wiersz.closest?.("fieldset[disabled]"))return;
      cal[klucz] = !cal[klucz]; odswiez(); save();
      zaloguj(`\u2699 ${klucz} = ${cal[klucz] ? "tak" : "nie"}`);
      if (poZmianie) { try { poZmianie(); } catch (e) {} }
    };
    wiersz.addEventListener("click", przelacz);
    wiersz.addEventListener("keydown", e => {
      if (e.key === " " || e.key === "Enter") { e.preventDefault(); e.stopPropagation(); przelacz(); }
    });

    wiersz.appendChild(lewo); wiersz.appendChild(gal);
    rodzic.appendChild(wiersz);
    odswiez();
    zarejestruj(rodzic, { wiersz, odswiez, etykieta, zmien: przelacz });
    return { odswiez, podepnij(node, nota) { zalezni.push({ el:node, nota }); odswiez(); return this; } };
  }

  function przycisk(rodzic, tekst, akcja, ton) {
    tekst=t(tekst);
    const b = el("button", {
      font: C.font, fontSize: "12px", color: C.tekst, cursor: "pointer",
      background: ton === "akcent" ? "rgba(77,212,255,.16)" : C.tlo2,
      border: `1px solid ${ton === "akcent" ? "rgba(77,212,255,.45)" : C.ramka}`,
      borderRadius: "8px", padding: "7px 11px", margin: "0 6px 6px 0",
    }, tekst);
    b.type="button";b.addEventListener("click", () => { b.blur(); akcja(); });
    rodzic.appendChild(b);
    return b;
  }

  function segment(rodzic, etykieta, klucz, opcje, jednostka) {
    etykieta=t(etykieta);jednostka=t(jednostka);
    const wiersz = el("div", {
      display:"flex", alignItems:"center", justifyContent:"space-between",
      gap:"10px", flexWrap:"wrap", margin:"6px -8px", padding:"6px 8px",
    });
    wiersz.appendChild(el("span", { color:C.slaby, fontSize:"12px" }, etykieta));
    const grupa = el("div", { display:"flex", gap:"4px" });
    grupa.setAttribute("role","group"); grupa.setAttribute("aria-label",etykieta);
    const guziki = opcje.map(v => {
      const b = el("button", {
        fontSize:"12px", minHeight:"0", padding:"5px 10px", borderRadius:"7px",
        border:`1px solid ${C.ramka}`, background:C.tlo2, color:C.tekst,
      }, String(v) + (jednostka || ""));
      b.type="button"; b.dataset.v = String(v);
      b.addEventListener("click", () => {
        cal[klucz] = v; save(); zaloguj(`\u2699 ${klucz} = ${v}`);
        for (const f of rodzic._odswiez || []) f();
      });
      grupa.appendChild(b); return b;
    });
    wiersz.appendChild(grupa); rodzic.appendChild(wiersz);
    const odswiez = () => {
      for (const b of guziki) {
        const on = Math.abs(Number(b.dataset.v) - cal[klucz]) < 1e-6;
        b.style.background = on ? C.akcent : C.tlo2;
        b.style.color = on ? "#04202b" : C.tekst;
        b.setAttribute("aria-pressed", String(on));
      }
    };
    rodzic._odswiez = rodzic._odswiez || []; rodzic._odswiez.push(odswiez);
    odswiez();
    return odswiez;
  }

  function naglowek(rodzic, tekst) {
    tekst=t(tekst);
    rodzic.appendChild(el("div", {
      color: C.slaby, fontSize: "11px", letterSpacing: ".8px",
      textTransform: "uppercase", margin: "16px 0 4px",
      borderTop: `1px solid ${C.ramka}`, paddingTop: "12px",
    }, tekst));
  }

  function podpowiedz(rodzic, tekst) {
    tekst=t(tekst);
    rodzic.appendChild(el("div", {
      color: C.slaby, fontSize: "11px", lineHeight: "1.5",
      margin: "6px 0 2px",
    }, tekst));
  }

  // Zmiana jezyka przestawia napisy zbudowane raz przy starcie, wiec okna
  // trzeba postawic od nowa. Stan otwarcia i aktywna sekcja zostaja.
  function przebudujUI() {
    const byloOkno = oknoOtwarte, byloLab = labOtwarte, karta = aktywnaKarta;
    for (const n of [hud, okno, pigulka, labOkno, pasekPow, pytanie]) { try { if (n && n.remove) { n._sprzataj?.(); n._resizeObserver?.disconnect(); n.remove(); } } catch (e) {} }
    hud = null; okno = null; pigulka = null; labOkno = null; pasekPow=null;pytanie=null;
    for (const klucz of Object.keys(karty)) delete karty[klucz];
    for (const klucz of Object.keys(zakladki)) delete zakladki[klucz];
    buildTryb(); buildHud(); buildOkno(); buildPasekPow();buildPytanie();drawPasekPow();
    if (byloOkno) { otworzUstawienia(); if (karty[karta]) pokazKarte(karta); }
    if (byloLab) otworzLab();
    drawHud();
  }

  function buildOkno() {
    okno=el('section',{position:'fixed',right:'18px',top:'18px',width:'600px',maxWidth:'calc(100vw - 36px)',maxHeight:'calc(100vh - 36px)',overflowY:'auto',zIndex:'10001',background:'#101923',color:C.tekst,font:C.font,border:'1px solid #304355',borderRadius:'16px',boxShadow:'0 18px 70px #0009',display:'none',pointerEvents:'auto'});
    okno.dataset.adcamUi='settings';okno.dataset.wzUi='settings';
    okno.setAttribute('role','dialog');okno.setAttribute('aria-label',MARKA+' — '+t('Ustawienia'));
    const head=el('div',{position:'sticky',top:'0',zIndex:'2',background:'#101923',display:'flex',flexWrap:'wrap',gap:'8px',alignItems:'center',justifyContent:'space-between',padding:'16px 20px 10px'});
    head.appendChild(el('h2',null,t('Ustawienia')));
    // Lab wchodzi do naglowka, a nie do stopki kazdej zakladki: to wejscie
    // do osobnego narzedzia, a nie kolejna opcja tej sekcji.
    const narz=el('div',{display:'flex',gap:'6px',alignItems:'center',flexWrap:'wrap'});
    if(DEV_UI)przycisk(narz,MARKA_LAB+' \u00b7 F8',otworzLab);
    przycisk(narz,t('Zamknij \u00b7 Esc'),zamknijPanele);
    head.appendChild(narz);okno.appendChild(head);
    const tabs=el('nav',{display:'flex',gap:'5px',padding:'0 18px 14px',flexWrap:'wrap'});
    tabs.setAttribute('aria-label',t('Sekcje ustawie\u0144'));okno.appendChild(tabs);zakladkiPasek=tabs;
    for(const [id,label] of Object.entries({obraz:'Obraz tarczy',zoom:'Automatyczny zoom',powtorka:'Powt\u00f3rki',preferencje:'Preferencje'})){
      const b=el('button',{background:'transparent',color:C.slaby,border:'1px solid #304355',borderRadius:'8px',padding:'8px 12px',fontSize:'13px'},t(label));
      b.type='button';b.addEventListener('click',()=>pokazKarte(id));tabs.appendChild(b);zakladki[id]=b;
      const k=el('div',{padding:'4px 22px 22px',display:'none'});okno.appendChild(k);karty[id]=k;
    }
    // Widok dopasowania nie ma zakladki - wchodzi sie w niego z sekcji obrazu
    // i wychodzi przyciskiem Zastosuj albo Anuluj.
    const kd=el('div',{padding:'4px 20px 20px',display:'none'});okno.appendChild(kd);karty.dopasuj=kd;
    budujKarteObraz(karty.obraz);budujKarteZoom(karty.zoom);
    budujKartePowtorka(karty.powtorka);budujKartePreferencje(karty.preferencje);
    budujWidokDopasowania(karty.dopasuj);
    const foot=el('div',{borderTop:'1px solid #304355',padding:'12px 22px',display:'flex',flexWrap:'wrap',gap:'8px',justifyContent:'space-between',alignItems:'center'});
    foot.appendChild(el('div',{color:C.slaby,fontSize:'12px'},t('Zmiany zapisują się automatycznie.')));
    foot.appendChild(el('span',{color:C.slaby,fontSize:'12px'},MARKA+' '+WERSJA));
    okno.appendChild(foot);oknoStopka=foot;
    document.body.appendChild(okno);pokazKarte('obraz');
  }
  // Developer-only UI. Public settings never mount diagnostics controls.
  function buildLab(){
    if(!DEV_UI||labOkno)return;
    labOkno=el('section',{position:'fixed',right:'18px',top:'18px',width:'700px',maxWidth:'calc(100vw - 36px)',maxHeight:'calc(100vh - 36px)',overflowY:'auto',zIndex:'10002',background:'#151720',color:C.tekst,font:C.font,border:'1px solid #665377',borderRadius:'16px',padding:'20px',display:'none',pointerEvents:'auto'});
    labOkno.dataset.adcamUi='lab';labOkno.dataset.wzUi='lab';labOkno.setAttribute('role','dialog');labOkno.setAttribute('aria-label',MARKA_LAB+' — narzędzia programistyczne');
    const top=el('div',{position:'sticky',top:'0',zIndex:'2',background:'#151720',display:'flex',flexWrap:'wrap',gap:'8px',justifyContent:'space-between',alignItems:'center'});top.appendChild(el('h2',null,MARKA_LAB));przycisk(top,'Zamknij · Esc',zamknijPanele);labOkno.appendChild(top);
    podpowiedz(labOkno,'Narzędzia wersji rozwojowej · '+WERSJA);
    naglowek(labOkno,'Zapis sesji');
    panelTestButton=el('button',{padding:'9px 12px',background:C.tlo2,color:C.tekst,border:'1px solid '+C.ramka,borderRadius:'8px'},'Rozpocznij zapis testu');panelTestButton.addEventListener('click',()=>{startTestu();drawHud();});labOkno.appendChild(panelTestButton);
    przycisk(labOkno,'Eksportuj test JSON',eksportTestu);przycisk(labOkno,'Eksportuj diagnostykę TXT',zapiszDziennik);przycisk(labOkno,'Poprzednia sesja',zapiszPoprzedniaSesje);
    naglowek(labOkno,'Testy funkcjonalne');
    przycisk(labOkno,'Test powtórki i okna',()=>{zamknijPanele();testPowtorkiIOkna();},'akcent');
    przycisk(labOkno,'Symuluj powtórkę zakończenia lega',()=>{zamknijPanele();probujPowtorke('auto',MARKA_LAB);});
    przycisk(labOkno,'Sprawdź tryby kamery — obraz mrugnie',()=>{zbadajTrybyKamery();});
    przycisk(labOkno,'Postaw znacznik w dzienniku',()=>migawka('>>> ZNACZNIK RĘCZNY <<<'));
    naglowek(labOkno,'Podgląd na żywo');
    if(diagBox){Object.assign(diagBox.style,{position:'static',width:'100%',maxWidth:'100%',maxHeight:'none',pointerEvents:'auto'});labOkno.appendChild(diagBox);}
    przycisk(labOkno,'Zmień zakres podglądu',()=>{diagSzczegoly=!diagSzczegoly;diagRysOd=0;drawDiagOkno();});
    const extra=el('details');extra.appendChild(el('summary',null,'Ustawienia diagnostyki'));labOkno.appendChild(extra);
    przelacznik(extra,'Automatyczny zapis dziennika','dziennikAuto');suwak(extra,'Odstęp zapisu','dziennikCoMin',1,15,1,' min');
    przelacznik(extra,'Zapisuj zdarzenia WebSocket','wsDiag');przelacznik(extra,'Maskuj identyfikatory w raporcie','wsAnonim');
    podpowiedz(extra,'Stan meczu jest odczytywany z danych WebSocket. Wyłączenie logowania nie wyłącza odczytu stanu.');
    document.body.appendChild(labOkno);
  }
  function sekcjaRozwijana(k,label){const d=el('details');d.appendChild(el('summary',null,t(label)));const content=el('div');d.appendChild(content);k.appendChild(d);k._odswiez=k._odswiez||[];k._odswiez.push(()=>{for(const fn of content._odswiez||[])fn();});return content;}
  function pokazKarte(id) {
    aktywnaKarta = id;
    if(okno)okno.scrollTop=0;
    const dopasowanie = id === 'dopasuj';
    for (const k of Object.keys(karty)) {
      karty[k].style.display = k === id ? "block" : "none";
      const z = zakladki[k];
      if (!z) continue;
      z.style.background = k === id ? C.tlo2 : "transparent";
      z.setAttribute('aria-pressed', String(k === id));
      z.style.color = k === id ? C.tekst : C.slaby;
    }
    // Waskie okno w trybie dopasowania: caly sens polega na tym, zeby
    // widziec tarcze, ktora sie wlasnie ustawia.
    if (okno) okno.style.width = dopasowanie ? '330px' : '600px';
    if (zakladkiPasek) zakladkiPasek.style.display = dopasowanie ? 'none' : 'flex';
    if (oknoStopka) oknoStopka.style.display = dopasowanie ? 'none' : 'flex';
    const k = karty[id];
    if (k && k._odswiez) k._odswiez.forEach(f => f());
    if (fokus[id] == null) fokus[id] = 0;
  }

  function odswiezListeKamer(sel){
    if(!sel)return Promise.resolve();
    return (async()=>{
      const devs=await listCams();
      kameryEtykiety={};sel.textContent='';
      for(const d of devs){
        kameryEtykiety[d.deviceId]=d.label;
        const o=el('option',null,d.label||t('Kamera'));o.value=d.deviceId;sel.appendChild(o);
      }
      const n=(cal.kamera||'').toLowerCase();
      const biez=(cal.cameraDeviceId&&devs.find(d=>d.deviceId===cal.cameraDeviceId))
        ||(n?devs.find(d=>(d.label||'').toLowerCase().includes(n)):null);
      if(biez)sel.value=biez.deviceId;
    })().catch(()=>{
      sel.textContent='';
      const o=el('option',null,t('Nie uda\u0142o si\u0119 odczyta\u0107 listy kamer'));o.value='';sel.appendChild(o);
    });
  }

  function otworzDopasowanie(){
    // Migawka przed edycja: Anuluj ma naprawde cofac, a nie tylko zamykac.
    migawkaDopasowania={};
    try{for(const kl of KLUCZE_KAL)migawkaDopasowania[kl]=structuredClone(cal[kl]);}
    catch(e){migawkaDopasowania=null;}
    pokazKarte('dopasuj');
  }
  function konczDopasowanie(zachowaj){
    if(!zachowaj&&migawkaDopasowania){
      for(const kl of KLUCZE_KAL)cal[kl]=migawkaDopasowania[kl];
      hCacheKey='';lastK=-1;applyTransform();save();
      toast(t('przywr\u00f3cono ustawienia sprzed dopasowania'));
    } else if(zachowaj) save();
    migawkaDopasowania=null;pokazKarte('obraz');
  }
  function budujWidokDopasowania(k){
    k.appendChild(el('h2',{margin:'4px 0 8px'},t('Dopasowanie obrazu')));
    podpowiedz(k,t("Zacznij od wskazania pięciu punktów na tarczy. W razie potrzeby popraw dopasowanie ręcznie."));
    przycisk(k,t('Dopasuj automatycznie \u2014 wska\u017c 5 punkt\u00f3w'),()=>{zamknijPanele();otworzKreator();},'akcent');
    przycisk(k,t('Cofnij ostatni\u0105 kalibracj\u0119'),cofnijKalibracje);
    suwak(k,t('Margines na numery'),'marginesNumerow',0,40,1,' %');
    podpowiedz(k,t('Zwi\u0119ksz, je\u015bli numery tarczy Autodarts znikaj\u0105 pod obrazem z kamery.'));
    const awaryjne=sekcjaRozwijana(k,t('Gdy Autodarts nie wykrywa tarczy'));
    przelacznik(awaryjne,t('Koło na środku ekranu'),'manual',
      t("Włącz, jeśli obraz nie pojawia się na tarczy Autodarts. Koło zostanie umieszczone na środku ekranu."),
      ()=>{hCacheKey='';lastK=-1;applyTransform();});
    const reczna=sekcjaRozwijana(k,t('Korekta r\u0119czna'));
    const nota=el('div',{color:C.slaby,fontSize:'12px',margin:'4px 0 8px'},
      t("Obraz jest dopasowany za pomocą pięciu punktów. Przełącz na ustawienie ręczne, aby użyć suwaków."));
    reczna.appendChild(nota);
    przycisk(reczna,t("Przełącz dopasowanie punktowe / ręczne"),()=>{
      if(!cal.punktowa)return toast(t('Najpierw dopasuj tarcz\u0119 w kreatorze'));
      kopiaKalibracji();cal.punktowa.enabled=!cal.punktowa.enabled;
      hCacheKey='';lastK=-1;applyTransform();save();odswiezReczna();});
    const f=el('fieldset');reczna.appendChild(f);budujKarteObrazReczna(f);
    const odswiezReczna=()=>{
      f.disabled=!!cal.punktowa?.enabled;
      f.style.opacity=f.disabled?'.4':'1';
      nota.style.display=f.disabled?'block':'none';
      for(const g of f._odswiez||[])g();
    };
    const stopka=el('div',{display:'flex',gap:'8px',marginTop:'18px',borderTop:'1px solid #304355',paddingTop:'12px'});
    const guzik=(txt,tlo,kolor,akcja)=>{
      const b=el('button',{flex:'1',padding:'9px',borderRadius:'9px',border:'1px solid #304355',
        background:tlo,color:kolor,fontSize:'13px'},txt);
      b.type='button';b.addEventListener('click',akcja);stopka.appendChild(b);return b;};
    guzik(t('Zastosuj'),'#55d9c1','#082c26',()=>konczDopasowanie(true));
    guzik(t('Anuluj'),'#1b2937',C.tekst,()=>konczDopasowanie(false));
    k.appendChild(stopka);
    k._odswiez=k._odswiez||[];k._odswiez.push(odswiezReczna);odswiezReczna();
  }

  function budujKarteObraz(k){
    naglowek(k,t('Kamera'));
    const wybor=el('select',{width:'100%',fontSize:'13px',color:C.tekst,background:C.tlo2,
      border:'1px solid '+C.ramka,borderRadius:'8px',padding:'8px 10px',margin:'8px 0'});
    wybor.setAttribute('aria-label',t('Wyb\u00f3r kamery'));
    wybor.addEventListener('keydown',ev=>ev.stopPropagation());
    wybor.addEventListener('change',()=>{
      cal.cameraDeviceId=wybor.value;
      const et=kameryEtykiety[wybor.value];if(et)cal.kamera=et;
      save();startCamera();});
    k.appendChild(wybor);
    podpowiedz(k,t("Wybierz kamerę skierowaną na tarczę. Podgląd zmieni się od razu."));
    przycisk(k,t('Od\u015bwie\u017c list\u0119 kamer'),()=>odswiezListeKamer(wybor));
    naglowek(k,t('Dopasowanie do tarczy'));
    przycisk(k,t('Dopasuj obraz do tarczy'),()=>otworzDopasowanie(),'akcent');
    podpowiedz(k,t("Dopasuj obraz z kamery do tarczy widocznej w Autodarts."));
    const margines=el('fieldset');k.appendChild(margines);
    suwak(margines,'Margines na numery','marginesNumerow',0,40,1,' %');
    podpowiedz(k,t("Zwiększ margines, jeśli obraz zasłania numery. Ta opcja działa po dopasowaniu pięciu punktów."));
    k._odswiez=k._odswiez||[];k._odswiez.push(()=>{margines.disabled=!cal.punktowa?.enabled;margines.style.opacity=margines.disabled?'.5':'1';for(const f of margines._odswiez||[])f();});
    const polozenie=sekcjaRozwijana(k,t('Wielkość i położenie — zaawansowane'));
    podpowiedz(polozenie,t("100% dopasowuje wielkość obrazu do tarczy w Autodarts."));
    suwak(polozenie,t('Wielko\u015b\u0107 obrazu'),'cover',.5,1.6,.01,' %',100);
    suwak(polozenie,t('Przesuni\u0119cie w poziomie'),'dx',-400,400,1,' px');
    suwak(polozenie,t('Przesuni\u0119cie w pionie'),'dy',-400,400,1,' px');
    const zaaw=sekcjaRozwijana(k,t('Skala odniesienia \u2014 zaawansowane'));
    podpowiedz(zaaw,t("Użyj po zmianie rozmiaru okna, jeśli ręczne dopasowanie obrazu wymaga ponownego ustawienia skali."));
    przycisk(zaaw,t('Przelicz skal\u0119'),()=>{
      const q=scaleK;
      for(const pole of ['vx','vy','dx','dy','bcx','bcy','persp'])cal[pole]=Math.round(cal[pole]*q*100)/100;
      cal.refSize=curSize;scaleK=1;lastK=-1;save();toast(t('przeliczono skal\u0119'));pokazKarte('obraz');});
    k._odswiez=k._odswiez||[];
    k._odswiez.push(()=>{odswiezListeKamer(wybor);});
  }
  function budujKarteObrazReczna(k) {
    naglowek(k, t("Kadr"));
    suwak(k, t("Przybliżenie"), "vz", 0.2, 4, 0.01);
    suwak(k, t("Przesunięcie w poziomie"), "vx", -2000, 2000, 1, " px");
    suwak(k, t("Przesunięcie w pionie"), "vy", -2000, 2000, 1, " px");
    naglowek(k, t("Prostowanie perspektywy"));
    suwak(k, t("Pochylenie (kamera z góry)"), "rx", -30, 30, 0.5, "°");
    suwak(k, t("Skręt w bok"), "ry", -30, 30, 0.5, "°");
    suwak(k, t("Obrót obrazu"), "rz", -180, 180, 0.5, "°");
    suwak(k, t("Siła perspektywy"), "persp", 300, 6000, 25, " px");
    naglowek(k, t("Proporcje"));
    suwak(k, t("Szerokość"), "sx", 0.3, 3, 0.005);
    suwak(k, t("Wysokość"), "sy", 0.3, 3, 0.005);
    naglowek(k, t("Narzędzia"));
    przycisk(k, t("Siatka pomocnicza"), () => { showGuide = !showGuide; });
    przycisk(k, t("Wyśrodkuj obraz"), () => {
      cal.vx = 0; cal.vy = 0; cal.vz = 1; applyTransform(); save(); pokazKarte("dopasuj");
    });
  }

  function budujKartePreferencje(k) {
    naglowek(k,t('Widoczno\u015b\u0107 podczas gry'));
    przelacznik(k,t('Chowaj przy rzucie o bulla'),'ukryjBullOff',
      t("Ukrywa obraz z kamery podczas rzutu o rozpoczęcie meczu."));
    naglowek(k,t('Język interfejsu'));
    const jezyki=el('div',{display:'flex',gap:'6px',margin:'8px 0'});
    jezyki.setAttribute('role','group');jezyki.setAttribute('aria-label',t('Język interfejsu'));
    const guzikiJez=[['auto','Automatycznie'],['pl','Polski'],['en','Angielski']].map(([kod,etyk])=>{
      const b=el('button',{flex:'1',fontSize:'12px',minHeight:'0',padding:'7px 8px',borderRadius:'8px',
        border:'1px solid '+C.ramka,background:C.tlo2,color:C.tekst},t(etyk));
      b.type='button';b.dataset.kod=kod;
      b.addEventListener('click',()=>{
        if(cal.jezyk===kod)return;
        cal.jezyk=kod;save();zaloguj('jezyk = '+kod);przebudujUI();});
      jezyki.appendChild(b);return b;});
    k.appendChild(jezyki);
    podpowiedz(k,t("Automatycznie dopasowuje język do ustawień przeglądarki."));
    naglowek(k,t('Tryb gry'));
    podpowiedz(k,t("Automatycznie rozpoznaje grę przy jednej tarczy lub grę zdalną. Ręczny wybór zostaje zapamiętany na kolejne mecze."));
    const grupaTrybu=el('div',{display:'flex',flexWrap:'wrap',gap:'4px'});grupaTrybu.setAttribute('role','group');grupaTrybu.setAttribute('aria-label',t('Tryb gry'));k.appendChild(grupaTrybu);
    const tryby=[['auto',t('Automatycznie')],['local',t('Przy tarczy')],['online',t('Gra zdalna')]];
    const btnTryby=tryby.map(([kod,label])=>{const b=przycisk(grupaTrybu,label,()=>ustawTryb(kod));b.dataset.kod=kod;return b;});
    k._odswiez=k._odswiez||[];k._odswiez.push(()=>{for(const b of btnTryby){const on=(cal.trybGry||'auto')===b.dataset.kod;b.setAttribute('aria-pressed',String(on));b.style.background=on?C.akcent:C.tlo2;b.style.color=on?'#04202b':C.tekst;}});
    naglowek(k,t('Kto gra'));
    podpowiedz(k,t("Jeśli aplikacja nie rozpoznaje Cię prawidłowo, wpisz swój nick z Autodarts."));
    const nick=el('input',{width:'100%',fontSize:'13px',color:C.tekst,background:C.tlo2,
      border:'1px solid '+C.ramka,borderRadius:'8px',padding:'8px 10px',margin:'8px 0'});
    nick.type='text';nick.setAttribute('aria-label',t('Twój gracz w Autodarts'));
    nick.placeholder=t('Twój nick w Autodarts');
    nick.addEventListener('keydown',ev=>ev.stopPropagation());
    const zapiszNick=()=>{
      const v=String(nick.value||'').trim();
      if(v.toUpperCase()===String(cal.gracz||'').toUpperCase())return;
      cal.gracz=v;cal.mojaTarcza='';save();
      zaloguj('gracz = '+(v||'(pusty)')+', tożsamość tarczy skasowana');
      toast(v?t('Rozpoznaję Cię jako {nazwa}',{nazwa:v}):t('nick wyczyszczony'));};
    nick.addEventListener('change',zapiszNick);nick.addEventListener('blur',zapiszNick);
    k.appendChild(nick);
    const stanId=el('div',{color:C.slaby,fontSize:'12px',margin:'2px 0 8px'});
    k.appendChild(stanId);
    przycisk(k,t('Zapomnij rozpoznaną tarczę'),()=>{
      cal.mojaTarcza='';st.boardId='';st.boardPewny=false;st.boardNiepewny=false;
      st.boardIds=[];st.boardPierwszaOd=0;save();toast(t('tożsamość tarczy skasowana'));});
    k._odswiez=k._odswiez||[];
    k._odswiez.push(()=>{
      for(const b of guzikiJez){
        const on=(cal.jezyk||'auto')===b.dataset.kod;
        b.style.background=on?C.akcent:C.tlo2;b.style.color=on?'#04202b':C.tekst;
        b.setAttribute('aria-pressed',String(on));}
      if(document.activeElement!==nick)nick.value=cal.gracz||'';
      const gr=(st.players||[]).map(g=>g&&g.name).filter(Boolean);
      stanId.textContent=(gr.length?t('Gracze w meczu: {nazwy}',{nazwy:gr.join(', ')}):t('Brak aktywnego meczu'))
        +(cal.mojaTarcza?' · '+t('Tarcza zapamiętana'):'');});
    naglowek(k,t('Profile i kopia ustawie\u0144'));
    budujKarteProfile(k);
    naglowek(k,t('Skr\u00f3ty klawiszowe'));
    const lista=el('div',{color:C.slaby,fontSize:'12px',lineHeight:'1.9'});
    const skroty=[['J','Ustawienia'],['R','Powt\u00f3rka'],['Shift+R',t('Zapis bez odtwarzania')],
      ['K','Obraz z kamery'],['Shift+N',t('Nagrywanie')],['M',t('Automatycznie / Przy tarczy / Gra zdalna')],
      ['I',t('Panel gry')],['Esc',t('Zamknij okno')]];
    if(DEV_UI)skroty.push(['F8',MARKA_LAB]);
    for(const [klaw,opis] of skroty)lista.appendChild(el('div',null,klaw+' — '+t(opis)));
    k.appendChild(lista);
    if(DEV_UI){
      naglowek(k,t('Zgłoszenie problemu'));
      podpowiedz(k,t("Gdy coś nie działa, zapisz raport i dołącz go do zgłoszenia. Dane graczy i tarcz są w raporcie maskowane."));
      przycisk(k,t('Zapisz dziennik do zgłoszenia'),()=>{zapiszDziennik();});
    }
  }

  function budujKarteZoom(k) {
    podpowiedz(k,t("Przybliża pole, którym możesz zamknąć lega jedną lotką."));
    const sw=przelacznik(k,'Automatyczny zoom','zoomWl');
    const nota=el('div',{color:C.slaby,fontSize:'12px',margin:'4px 0 8px'},
      t("Włącz automatyczny zoom, aby zmienić jego ustawienia."));
    k.appendChild(nota);
    const g=el('fieldset');k.appendChild(g);sw.podepnij(g,nota);
    suwak(g,t('Stopień przybliżenia'),'zoomSila',1.2,5,.05,'x');
    suwak(g,t('Próg punktowy'),'zoomProg',20,170,1,t(' pkt'));
    podpowiedz(g,t('Zoom może się włączyć, gdy pozostały wynik nie przekracza tego progu i wystarczy jedna lotka.'));
    przycisk(g,t('Podejrzyj zoom na T20'),()=>{testUntil=Date.now()+3000;},'akcent');
    przycisk(g,t('Siatka pomocnicza'),()=>{showGuide=!showGuide;});
    const a=sekcjaRozwijana(g,t('Animacja — zaawansowane'));
    suwak(a,t('Czas wjazdu'),'zoomWjazdMs',150,3000,50,' ms');
    suwak(a,t('Czas powrotu'),'zoomWyjazdMs',150,2000,50,' ms');
    przelacznik(a,t('Wracaj po trzeciej lotce'),'zoomPoTrzeciej',
      t("Po trzeciej lotce pokazuje ponownie całą tarczę."));
    suwak(a,t("Maksymalny czas przybliżenia"),'zoomMaxSek',0,60,1,' s');
    podpowiedz(a,t("Po tym czasie obraz wróci do całej tarczy. Wybierz 0, aby wyłączyć limit. Zbyt krótki czas może zakończyć przybliżenie przed rzutem."));
    const dryf=przelacznik(a,t('Powolny najazd'),'zoomDryf',
      t("Delikatnie zwiększa przybliżenie podczas celowania."));
    const ustawieniaDryfu=el('fieldset');a.appendChild(ustawieniaDryfu);dryf.podepnij(ustawieniaDryfu);
    a._odswiez=a._odswiez||[];a._odswiez.push(()=>{for(const f of ustawieniaDryfu._odswiez||[])f();});
    suwak(ustawieniaDryfu,t('Zasięg najazdu'),'zoomDryfSila',1.0,1.4,.01,'x');
    suwak(ustawieniaDryfu,t('Czas najazdu'),'zoomDryfMs',1000,20000,500,' ms');
    const c2=sekcjaRozwijana(g,t('Celowanie — zaawansowane'));
    podpowiedz(c2,t("Jeśli przybliżenie nie trafia w odpowiednie pole, włącz siatkę i popraw położenie środka tarczy."));
    suwak(c2,t('Środek w poziomie'),'bcx',-200,200,1,' px');
    suwak(c2,t('Środek w pionie'),'bcy',-200,200,1,' px');
    suwak(c2,t('Promień tarczy'),'brad',.6,1.5,.01);
    k._odswiez=k._odswiez||[];k._odswiez.push(()=>{for(const f of g._odswiez||[])f();});
  }

  function budujKartePowtorka(k){
    podpowiedz(k,t('Automatyczna powtórka po wygranym legu. Klawisz R odtwarza ostatnie chwile na życzenie.'));
    const sw=przelacznik(k,'Nagrywanie powtórek','powWl',
      t('Podgląd kamery działa również bez nagrywania.'),()=>ustawNagrywanie(cal.powWl));
    const nota=el('div',{color:C.slaby,fontSize:'12px',margin:'4px 0 8px'},
      t("Włącz nagrywanie, aby korzystać z powtórek."));
    k.appendChild(nota);
    const g=el('fieldset');k.appendChild(g);sw.podepnij(g,nota);
    buildWyborFormatu(g);
    naglowek(g,t('Odtwarzanie'));
    suwak(g,t('Długość automatycznej powtórki'),'powSek',1,12,.5,' s');
    suwak(g,t('Długość powtórki ręcznej'),'powRecznaSek',3,30,1,' s');
    segment(g,t('Tempo odtwarzania'),'powTempo',[0.5,0.75,1],'×');
    suwak(g,t('Zatrzymaj ostatnią klatkę przez'),'powPoKoniecSek',0,60,1,' s');
    const w=sekcjaRozwijana(g,t('Wygląd powtórki'));
    suwak(w,t('Wielkość obrazu'),'powRozmiar',.3,1,.02,' %',100);
    suwak(w,t('Przyciemnienie tła'),'powPrzyciemnienie',0,1,.02,' %',100);
    const zoomPow=przelacznik(w,t('Przybliżenie w powtórce'),'powZoomWl');
    const zoomPowUstaw=el('fieldset');w.appendChild(zoomPowUstaw);zoomPow.podepnij(zoomPowUstaw);
    w._odswiez=w._odswiez||[];w._odswiez.push(()=>{for(const f of zoomPowUstaw._odswiez||[])f();});
    suwak(zoomPowUstaw,t('Siła przybliżenia'),'powZoom',1,2,.05,'×');
    suwak(w,t('Dokładne tempo'),'powTempo',.1,1,.05,'×');
    const auto=sekcjaRozwijana(g,t('Automatyka i zapis'));
    przelacznik(auto,t('Tylko moje legi'),'powTylkoMoje',t("Pokazuje automatyczną powtórkę tylko po Twoim zwycięstwie. Najpierw upewnij się, że aplikacja prawidłowo Cię rozpoznaje."));
    przelacznik(auto,t('Odtwarzaj w pętli'),'powPetla');
    suwak(auto,t('Automatyczny zapis od checkoutu'),'powAutoZapisProg',0,170,5,t(' pkt'));
    podpowiedz(auto,t('0 wyłącza automatyczny zapis.'));
    naglowek(auto,t('Zapis'));
    etykFolder=el('div',{color:C.slaby,fontSize:'12px',margin:'8px 0'});
    auto.appendChild(etykFolder);
    przycisk(auto,t('Wybierz folder zapisu'),()=>wybierzFolder(),'akcent');
    przycisk(auto,t('Pytaj za każdym razem'),()=>{
      cal.powFolder=false;uchwytFolderu=null;save();
      toast(t('będę pytać o miejsce zapisu'));odswiezFolder();});
    setTimeout(odswiezFolder,0);
    const z=sekcjaRozwijana(g,t('Nagrywanie — zaawansowane'));
    suwak(z,t('Zapas po zwycięskim rzucie'),'powOgonMs',300,3000,100,' ms');
    suwak(z,t('Pauza na animację Autodarts'),'powPauzaMs',0,6000,100,' ms');
    suwak(z,t('Długość bufora'),'powBuforSek',15,90,5,' s');
    suwak(z,t('Przepływność'),'powBitrate',2,40,1,' Mb/s');
    suwak(z,t('Maksymalna szerokość kamery'),'maxSzer',640,1920,320,' px');
    podpowiedz(z,t("Większa przepływność może poprawić jakość, ale zwiększa pliki. Po zastosowaniu zmian kamera połączy się ponownie, a ostatnie chwile nagrania zostaną wyczyszczone. Filmy mają maksymalnie 1280 px szerokości."));
    przycisk(z,t('Zastosuj jakość i połącz kamerę ponownie'),()=>startCamera());
    k._odswiez=k._odswiez||[];k._odswiez.push(()=>{for(const f of g._odswiez||[])f();});
  }

  function budujKarteProfile(k) {
    przycisk(k, t("Pobierz kopię ustawień i profili"), exportBackup);
    przycisk(k, t("Wczytaj pełną kopię"), importBackup);
    podpowiedz(k, t("Profil zapisuje ustawienia obrazu, zoomu i powtórek. Możesz przygotować osobny profil dla każdej kamery lub miejsca gry."));

    naglowek(k, t("Nowy profil"));
    const rzad = el("div", { display: "flex", gap: "6px", margin: "8px 0" });
    poleNazwy = el("input", {
      flex: "1", font: C.font, fontSize: "12px", color: C.tekst,
      background: C.tlo2, border: `1px solid ${C.ramka}`,
      borderRadius: "8px", padding: "8px 10px",
    });
    poleNazwy.type = "text";poleNazwy.setAttribute('aria-label',t('Nazwa nowego profilu'));
    poleNazwy.placeholder = t("np. salon");
    poleNazwy.addEventListener("keydown", ev => {
      ev.stopPropagation();
      if (ev.key === "Enter") zapiszProfil(poleNazwy.value.trim());
    });
    rzad.appendChild(poleNazwy);
    k.appendChild(rzad);
    przycisk(k, t("Zapisz profil"), () => zapiszProfil(poleNazwy.value.trim()), "akcent");

    naglowek(k, t("Zapisane profile"));
    listaProfili = el("select", {
      width: "100%", font: C.font, fontSize: "12px", color: C.tekst,
      background: C.tlo2, border: `1px solid ${C.ramka}`,
      borderRadius: "8px", padding: "8px 10px", margin: "8px 0",
    });
    listaProfili.size = 5;listaProfili.setAttribute('aria-label',t('Zapisane profile'));
    listaProfili.addEventListener("keydown", ev => ev.stopPropagation());
    k.appendChild(listaProfili);
    przycisk(k, t("Wczytaj"), () => wczytajProfil(listaProfili.value), "akcent");
    przycisk(k, t("Nadpisz"), () => zapiszProfil(listaProfili.value));
    przycisk(k, t("Usuń"), () => usunProfil(listaProfili.value));

    setTimeout(odswiezProfile, 0);
  }


  // ---------- eksport dziennika ----------
  // Etykieta WYDAJNOSC istniala tylko w oknie na ekranie, wiec raport
  // z 4.16 jej nie mial, a wzorzec 10 skanow/s dalo sie sprawdzic wylacznie
  // w jsdom. Teraz przebieg calej sesji jest w pliku, policzony na miejscu.
  function podsumowanieUi() {
    if (!uiProbki.length) return "przebieg: brak próbek";
    const s = uiProbki.slice().sort((a, b) => a - b);
    const nisko = uiProbki.filter(x => x < 15).length;
    return `przebieg (${uiProbki.length} próbek co 2 s): ` +
      `min=${s[0]}  mediana=${s[Math.floor(s.length / 2)]}  ` +
      `max=${s[s.length - 1]}  poniżej 15/s: ${nisko} ` +
      `(${Math.round(nisko * 100 / uiProbki.length)}%)`;
  }

  // Raport trafia do osob trzecich przy zglaszaniu problemow. Dziennik
  // z 4.19 wypuscil adres tarczy w sieci lokalnej, adres awatara
  // z identyfikatorem konta i pelne UUID meczu. Ta funkcja miala istniec
  // od 4.18, ale nie trafila do pliku razem z przelacznikiem, ktory ja
  // wlaczal - przelacznik byl, dzialania nie bylo.
  // Etykiety sa powtarzalne, wiec powiazania w danych pozostaja czytelne.
  const maskowane = new Map();
  function etykietaId(v) {
    if (!maskowane.has(v)) maskowane.set(v, `<id${maskowane.size + 1}>`);
    return maskowane.get(v);
  }
  // 4.22: adresy prywatne maskujemy, numerow wersji nie. Regula z 4.21
  // lapala kazde cztery liczby z kropkami i zamieniala "Chrome/152.0.0.0"
  // na "Chrome/<ip>", niszczac dane potrzebne do diagnozy. Adresy publiczne
  // i tak znikaja razem z calym URL-em w pierwszej podmianie, a wyciekiem
  // jest adres w sieci domowej.
  const PRYWATNY_IP =
    /\b(?:10\.\d{1,3}\.\d{1,3}\.\d{1,3}|192\.168\.\d{1,3}\.\d{1,3}|172\.(?:1[6-9]|2\d|3[01])\.\d{1,3}\.\d{1,3})\b/g;
  // 4.51: nick, nazwa tarczy, kraj i srednia to dane o czlowieku, nie o kodzie.
  // Przy jednym uzytkowniku zostawienie ich bylo do obrony ("nick i tak widac
  // w Autodarts") i tak stalo w 4.21. Przy wydaniu publicznym nie jest: raport
  // wysyla obcy czlowiek, a razem ze swoim wysyla nick przeciwnika, ktory
  // o niczym nie wie. Dowod w raportach: "player":"GRACZ_B",
  // "boardName":"Przykładowa tarcza", "country":"pl", "average":25.00 oraz
  // "gracz":"GRACZ_A" w zrzucie ustawien.
  //
  // Nie kasujemy - podmieniamy na TRWALE etykiety, wiec zostaje to, po co ten
  // nick byl w dzienniku: widac, kto rzucal w ktorej kolejce. Wlasny nick to
  // <ja>, zeby od razu bylo wiadomo, ktora strona to zglaszajacy.
  // Raport zawiera JSON, kształty {player:"…"} i wiersze body.player = ….
  // Wszystkie trzy formaty muszą przejść maskowanie, także przy wielu
  // kolejnych wywołaniach (sekcje raportu są wcześniej maskowane osobno).
  const KLUCZE_OSOBY = /(?<![\w])("?(?:player|gracz|host|nickName|userName|playerName|hostName|name|boardName)"?\s*[:=]\s*)"((?:\\.|[^"\\])*)"/gi;
  const ENUM_OSOBY = /^([ \t]*(?:[\w[\]]+\.)*)(player|gracz|host|nickName|userName|playerName|hostName|name|boardName)([ \t]*=[ \t]*)([^\r\n]*)$/gmi;
  const POLE_TARCZY = /^(?:[SDTM]?\d{1,2}|25|50|bull|outer|inner|miss|single|double|triple)$/i;
  const etykietyOsob = new Map();
  let iluGraczy = 0, ileTarcz = 0;
  function etykietaOsoby(v, tarcza) {
    const klucz = v.toLowerCase();
    if (!etykietyOsob.has(klucz)) {
      const moj = (cal.gracz || "").toLowerCase();
      etykietyOsob.set(klucz, tarcza ? `<tarcza${++ileTarcz}>`
        : (moj && klucz === moj ? "<ja>" : `<gracz${++iluGraczy}>`));
    }
    return etykietyOsob.get(klucz);
  }
  const ESC = s => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  function anonimizuj(t) {
    // W publicznym buildzie import starej konfiguracji nie wyłącza ochrony.
    if (typeof t !== "string" || (!cal.wsAnonim && DEV_UI)) return t;
    const ukryj=(klucz,wartosc)=>{
      if(!wartosc||wartosc.startsWith('<'))return wartosc;
      if(/^name$/i.test(klucz)&&POLE_TARCZY.test(wartosc))return wartosc;
      return etykietaOsoby(wartosc,/^boardName$/i.test(klucz));
    };
    let txt = t
      .replace(/https?:\/\/[^\s"',)\]]+/g, "<adres>")
      .replace(PRYWATNY_IP, "<ip lokalne>")
      .replace(/\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/gi,
        m => /^[0-]+$/.test(m) ? m : etykietaId(m.toLowerCase()))
      .replace(/\b[0-9a-f]{32,}\b/gi, m => etykietaId(m.toLowerCase()))
      .replace(/(?<![\w])("?(?:country|kraj)"?\s*:\s*)"(?:\\.|[^"\\])*"/gi, '$1"<kraj>"')
      .replace(/(?<![\w])("?(?:average|avg)"?\s*:\s*)-?\d+(?:\.\d+)?(?:e[+-]?\d+)?/gi, '$1"<średnia>"')
      .replace(/^([ \t]*(?:[\w[\]]+\.)*(?:country|kraj)[ \t]*=[ \t]*)[^\r\n]*/gmi,'$1<kraj>');
    txt = txt.replace(KLUCZE_OSOBY,(calosc,prefix,encoded)=>{
      let wartosc;try{wartosc=JSON.parse('"'+encoded+'"');}catch(e){wartosc=encoded;}
      const klucz=prefix.replace(/["\s:=]/g,'');
      const wynik=ukryj(klucz,wartosc);
      return wynik===wartosc?calosc:prefix+JSON.stringify(wynik);
    });
    txt = txt.replace(ENUM_OSOBY,(calosc,sciezka,klucz,sep,wartosci)=>
      sciezka+klucz+sep+wartosci.split(' | ').map(v=>ukryj(klucz,v.trim())).join(' | '));
    if(cal.gracz)etykietaOsoby(cal.gracz,false);
    // Pamiętamy nazwy z wcześniejszych części raportu, nie tylko bieżącego
    // wywołania. Granice Unicode chronią fragmenty słów, także polskich.
    const nazwy=[...etykietyOsob.keys()].filter(Boolean).sort((a,b)=>b.length-a.length);
    if(nazwy.length){
      // Gotowe etykiety i już obsłużone stringi JSON są nietykalne. Dzięki
      // temu nick "throw" nie niszczy event:"throw", a nick "name" klucza.
      const re=new RegExp('"(?:\\\\.|[^"\\\\])*"|<[^<>\\n]*>|(?<![\\p{L}\\p{N}_-])(?:'+nazwy.map(ESC).join('|')+')(?![\\p{L}\\p{N}_-]|\\s*[:=])','giu');
      txt=txt.replace(re,m=>m.startsWith('"')||m.startsWith('<')?m:etykietaOsoby(m,false));
    }
    return txt;
  }

  function opiszStrumienieWS() {
    if (!wsKanaly.size) return "(brak)";
    return [...wsKanaly.entries()]
      .sort((a, b) => b[1].ile - a[1].ile)
      .map(([id, v]) => {
        const wart = Object.keys(v.wartosci).sort()
          .map(sc => `    ${sc} = ${[...v.wartosci[sc]].join(" | ")}`)
          .join("\n");
        return anonimizuj(`\n[${id}]  ${v.ile} wiadomości` +
          `\n  klucze (${v.klucze.size}): ${[...v.klucze].join(",")}` +
          `\n  kształt: ${v.ksztalt}` +
          (wart ? `\n  wartości pól tekstowych:\n${wart}` : "") +
          `\n  pierwsza wiadomość (przycięta do 1400 znaków): ${v.pierwsza}`);
      }).join("\n");
  }

  async function zbudujRaport() {
    if(!DEV_UI)return;
    let kamery = "(nie odczytano)";
    try {
      const d = await navigator.mediaDevices.enumerateDevices();
      kamery = d.filter(x => x.kind === "videoinput")
        .map(x => "  - " + (x.label || "(bez nazwy)")).join("\n");
    } catch (e) {}

    const tr = (video && video.srcObject && video.srcObject.getVideoTracks)
      ? video.srcObject.getVideoTracks()[0] : null;
    let ust = "(brak)";
    try { ust = JSON.stringify(tr ? tr.getSettings() : {}, null, 2); } catch (e) {}

    const txt = [
      "=== AUTODARTS — KAMERA NA TARCZY — DZIENNIK DIAGNOSTYCZNY ===",
      `wersja skryptu : ${WERSJA}`,
      `wyeksportowano : ${new Date().toLocaleString()}`,
      `czas sesji     : ${czasSesji()}`,
      `adres          : ${location.pathname}`,
      `przeglądarka   : ${navigator.userAgent}`,
      `okno           : ${window.innerWidth}x${window.innerHeight}  ` +
        `dpr=${window.devicePixelRatio}`,
      "",
      "--- KAMERY W SYSTEMIE ---", kamery,
      "",
      "--- WYBRANY TRYB KAMERY ---", ust,
      `odrzucone tryby: ${proby.length ? proby.join(" | ") : "brak"}`,
      `format nagrania: ${rec?.mimeType || "nieaktywny"}; wybrany WebM: ${mime() || "-"}`,
      "",
      "--- USTAWIENIA ---", JSON.stringify(cal, null, 2),
      "",
      "--- STAN W CHWILI EKSPORTU ---", stanLinia(),
      "",
      "--- WYDAJNOSC ---",
      `Wybrany tryb nagrywania: ${trybZapisu()}; aktywny MIME: ${rec?.mimeType||"brak"}; powód powrotu do WebM: ${mp4Fallback||"brak"}`,
      `autotest powtórki: ${wynikAutotestu}`,
      `geometria tarczy: ${geometriaOpis}`,
      `ostatni pomiar toru: ${torRaport}`,
      `tor nagrania: ${rec?.mp4?"MP4/H.264 Worker":torCanvas?torCanvas.width+"x"+torCanvas.height+" canvas":"nieaktywny"}; narysowanych klatek: ${torKlatki}`,
      `tryb skalowania: ${video?.srcObject?.getVideoTracks?.()[0]?.getSettings?.().resizeMode||"brak danych"}; żądanie: preferuj natywny obraz bez skalowania`,
      `obraz wideo: ${video?.videoWidth||0}x${video?.videoHeight||0}; zakodowany obraz: ${nagranieWymiary}; średnie fps bufora: ${buforSekundy>0?((buforKlatki-1)/buforSekundy).toFixed(1):"?"}`,
      `teraz: ui=${uiFps}/s  js=${msKlatki.toFixed(1)}ms  ` +
        `skany=${skanyNaSek}/s  elem=${elemCzas?liczbaElem:"niezmierzone"}  kam=${fpsZmierzone}/s`,
      podsumowanieUi(),
      `limity: maxSzer=${cal.maxSzer}px  ${cal.powBitrate} Mb/s  ` +
        `bufor=${cal.powBuforSek}s  ` +
        `${cal.powWl ? "nagrywa" : "bez nagrywania"}`,
      // Generacja rosnie takze przy wymianie w obrebie cyklu, wiec sama
      // nie mowi, ile rejestratorow zyje. Liczymy je osobno.
      `rejestrator: ${recStan}  generacja=${recGen}  ` +
        `instancji: nagrywa=${[...recCzynne].filter(r => r.state === "recording").length}` +
        `/wstrzymane=${[...recCzynne].filter(r => r.state === "paused").length}` +
        `/nieaktywne=${[...recCzynne].filter(r => r.state === "inactive").length}  ` +
        `bajtów bufora=${(bajtyBufora / 1048576).toFixed(1)} MB  ` +
        `fragmentów=${chunks.length}  wiek=${recStart?((Date.now() - recStart) / 1000).toFixed(0)+"s":"-"}  ` +
        `do zwolnienia=${doZwolnienia.length}`,
      `licznik klatek: generacja=${klatkiInfo.gen}  ` +
        `przyrost=${klatkiInfo.przyrost} w ${klatkiInfo.okno}ms  ` +
        `presentedFrames=${klatkiInfo.presented === null ? "brak" : klatkiInfo.presented}  ` +
        `mediaTime=${klatkiInfo.media === null ? "brak" : klatkiInfo.media}  ` +
        `${klatkiInfo.brakMeta ? "(przeglądarka bez metadanych)" : ""}`,
      `widoczność dokumentu: ${typeof document !== "undefined" &&
        document.visibilityState ? document.visibilityState : "?"}  ` +
        `tarcza=${boardState}  status=${st.tarczaStatus || "-"}`,
      "",
      "--- STAN MECZU Z DANYCH ---",
      `źródło odczytu: ${zrodloOgolne()}  ` +
        `(gracz=${zrodla.gracz}, wynik=${zrodla.wynik}, trasa=${zrodla.trasa}, ` +
        `rzuty=${zrodla.rzuty}, leg=${zrodla.leg})` +
        `${powodFallbacku ? "  powód fallbacku: " + powodFallbacku : ""}  ` +
        `(dane świeże: ${daneSwieze() ? "tak" : "nie"}` +
        `${st.uniewazniony ? ", " + st.uniewazniony : ""})`,
      `mecz=${anonimizuj(st.matchId || "-")}  ` +
        `z adresu=${anonimizuj(matchIdZUrl() || "-")}  ` +
        `leg=${st.leg === null ? "-" : st.leg}  set=${st.set === null ? "-" : st.set}`,
      `gracz=${st.player === null ? "-" : st.player}  ` +
        `wyniki=[${st.gameScores.join(",") || "-"}]  ` +
        `kolejka #${st.kolejka.nr} gracz=${st.kolejka.gracz === null ? "-" : st.kolejka.gracz}  ` +
        `od=${st.kolejka.wynikOd === null ? "-" : st.kolejka.wynikOd}  ` +
        `pewny=${st.kolejka.pewny ? "tak" : "NIE"}  ` +
        `${st.kolejka.oczekuje ? "czeka na gracza  " : ""}` +
        `bust=${st.kolejka.bust
          ? (st.kolejka.bustPewny ? "tak (flaga protokołu)" : "podejrzenie (heurystyka)")
          : "nie"}`,
      `trasa=[${(st.trasa || []).join("+") || "-"}]  ` +
        `rzuty=${st.numThrows === null ? "-" : st.numThrows}  ` +
        `wyjmowanie=${st.takeout ? "tak" : "nie"}  ` +
        `lotka dostępna=${lotkaDostepna() ? "tak" : "nie"}`,
      `koniec Lega=${st.legZamkniety ? "tak" : "nie"}  ` +
        `zwycięzca=${st.gameWinner}  ` +
        `kontekst powtórki=${kontekstPow
          ? `leg${kontekstPow.leg}/${kontekstPow.cel || "-"}/co` +
            `${kontekstPow.checkout === null ? "nieznany" : kontekstPow.checkout}`
          : "brak"}`,
      "",
      "--- WEBSOCKET AUTODARTS (strumień = kanał | temat) ---",
      `wiadomości ogółem: ${wsWiadomosci}  ` +
        `(nierozpoznane: ${wsNieJSON})  strumieni: ${wsKanaly.size}`,
      `odczyt stanu z danych: player=${wsGracz === null ? "-" : wsGracz}  ` +
        `gameScores=[${wsWynik || "-"}]  ` +
        `gameWinner=${wsWinner === null ? "-" : wsWinner}  ` +
        `leg=${wsLeg === null ? "-" : wsLeg}  ` +
        `numThrows=${wsThrows === null ? "-" : wsThrows}`,
      opiszStrumienieWS(),
      "",
      "--- CELOWANE PROBKI PROTOKOLU ---",
      // Zbior enumow i najdluzszy ksztalt nie wystarcza do odtworzenia
      // protokolu w tescie. Tu ida pelne surowe payloady wybranych zdarzen,
      // po trzy sztuki - to jest material na atrapy.
      probkiCelowane.size
        ? [...probkiCelowane.entries()].map(([k, v]) =>
            `\n[${k}]  ${v.length} szt.` +
            v.map(x => `\n  ${anonimizuj(x)}`).join("")).join("")
        : "(brak — w tej sesji nie wystąpiły turn_start, game_shot, game_on ani bust)",
      "",
      `--- DZIENNIK (${dziennikPelny.length} wpisów, najstarsze u góry) ---`,
      dziennikPelny.join("\n"),
      "",
    ].join("\n");
    // 4.21: maskowanie obejmuje CALY plik, nie tylko sekcje WebSocketa.
    // Nazwy graczy również podlegają maskowaniu (JSON, kształt i enum).
    return anonimizuj(txt);
  }

  function nazwaPlikuDziennika() {
    if (nazwaDziennika) return nazwaDziennika;
    const d = new Date(startCzas);
    const dwa = n => String(n).padStart(2, "0");
    nazwaDziennika = `adcam-dziennik_${d.getFullYear()}-${dwa(d.getMonth()+1)}-` +
      `${dwa(d.getDate())}_${dwa(d.getHours())}-${dwa(d.getMinutes())}.txt`;
    return nazwaDziennika;
  }

  // Zapis cykliczny ma sens tylko do wskazanego folderu - jeden plik na
  // sesje, nadpisywany. Zwykle pobieranie tworzyloby dziesiatki plikow
  // w katalogu Pobrane, wiec bez folderu automat jest wylaczony.
  // Dziennik trzymamy w pamieci przegladarki - bez uprawnien i bez
  // wskazywania folderu. Chrome blokuje wybor wielu katalogow jako
  // "systemowych", wiec zapis do folderu jest tylko dodatkiem.
  async function dziennikDoBazy(txt) {
    if(!DEV_UI)return;
    try {
      await obrocSesje();
      const o = await bazaUchwytu("readwrite");
      o.st.put(txt, KL_BIEZ);
      o.st.put(Date.now(), "dziennikCzas");
      return await domknij(o);
    } catch (e) { return false; }
  }

  async function dziennikZBazy(klucz) {
    if(!DEV_UI)return;
    try {
      const o = await bazaUchwytu("readonly");
      const r = o.st.get(klucz || KL_BIEZ);
      const v = await new Promise(ok => {
        r.onsuccess = () => ok(r.result || null);
        r.onerror = () => ok(null);
      });
      await domknij(o);
      return v;
    } catch (e) { return null; }
  }

  async function zapiszPoprzedniaSesje() {
    if(!DEV_UI)return;
    const txt = await dziennikZBazy(KL_POPRZ) || await dziennikZBazy(KL_BIEZ);
    if (!txt) return toast("brak zapisanej sesji w pamięci");
    pobierzTekst(anonimizuj(txt), "adcam-dziennik-poprzednia-sesja.txt");
  }

  function pobierzTekst(txt, nazwa) {
    try {
      const a = el("a");
      a.href = URL.createObjectURL(new Blob([txt], { type: "text/plain" }));
      a.download = nazwa;
      document.body.appendChild(a); a.click();
      setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 2000);
      toast(t('Zapisano {plik}',{plik:nazwa}));
    } catch (e) { toast("błąd pobierania"); }
  }

  async function autoZapisDziennika() {
    if(!DEV_UI)return;
    if (!cal.dziennikAuto) { stanZapisu = "wyłączony"; return; }
    if (Date.now() - ostatniZapisD < cal.dziennikCoMin * 60000) return;

    const txt = await zbudujRaport();
    const wBazie = await dziennikDoBazy(txt);

    let wFolderze = false;
    try {
      const folder = await folderGotowy();
      if (folder) {
        const plik = await folder.getFileHandle(nazwaPlikuDziennika(),
          { create: true });
        const w = await plik.createWritable();
        await w.write(txt); await w.close();
        wFolderze = folder.name + "/" + nazwaPlikuDziennika();
      }
    } catch (e) { /* folder jest opcjonalny */ }

    ostatniZapisD = Date.now();
    stanZapisu = wFolderze
      ? `${wFolderze} · ${czasSesji()}`
      : (wBazie
        ? `w pamięci przeglądarki · ${czasSesji()} · Shift+Y pobiera plik`
        : `BŁĄD zapisu · użyj Shift+Y`);
  }

  async function zapiszDziennik() {
    if(!DEV_UI)return;
    const txt = await zbudujRaport();
    const d = new Date();
    const dwa = n => String(n).padStart(2, "0");
    const nazwa = nazwaPlikuDziennika();
    try {
      const folder = await folderGotowy();
      if (folder) {
        const plik = await folder.getFileHandle(nazwa, { create: true });
        const w = await plik.createWritable();
        await w.write(txt); await w.close();
        ostatniZapisD = Date.now();
        return toast(t('Zapisano {plik}',{plik:folder.name+'/'+nazwa}));
      }
      const a = el("a");
      a.href = URL.createObjectURL(new Blob([txt], { type: "text/plain" }));
      a.download = nazwa;
      document.body.appendChild(a); a.click();
      setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 2000);
      toast(t('Zapisano {plik}',{plik:nazwa}));
    } catch (e) { toast("błąd zapisu dziennika"); }
  }

  // ---------- profile ustawien ----------
  const PROFILE = "adCamProfile";
  function profile() {
    try { const p=JSON.parse(localStorage.getItem(PROFILE) || "{}");return p&&typeof p==="object"&&!Array.isArray(p)?p:{}; }
    catch (e) { return {}; }
  }
  function zapiszProfil(nazwa) {
    if (!nazwa) return toast("podaj nazwę profilu");
    const p = profile();
    if(nazwa.length>100)return toast("Nazwa profilu: maksymalnie 100 znaków");
    Object.defineProperty(p,nazwa,{value:JSON.parse(JSON.stringify(cal)),enumerable:true,configurable:true,writable:true});
    try { localStorage.setItem(PROFILE, JSON.stringify(p)); } catch (e) { return toast("Nie udało się zapisać profilu"); }
    toast(t('Zapisano profil „{nazwa}”',{nazwa}));
    odswiezProfile();
  }
  function wczytajProfil(nazwa) {
    const p = profile();
    if (!p[nazwa]) return toast("nie ma takiego profilu");
    if (!kopiaKalibracji()) return;
    const poprzedniJezyk=cal.jezyk;
    try { cal = poprawneUstawienia(p[nazwa]); } catch(e) { return toast(t('Nie udało się wczytać profilu. Wybierz inny profil lub przywróć kopię ustawień.')); }
    visible=cal.obrazWl;hCacheKey="";startCamera();
    lastK = -1; applyTransform(); save();
    for (const id of Object.keys(karty))
      if (karty[id]._odswiez) karty[id]._odswiez.forEach(f => f());
    if(cal.jezyk!==poprzedniJezyk)przebudujUI();
    toast(t('Wczytano profil „{nazwa}”',{nazwa}));
  }
  function usunProfil(nazwa) {
    const p = profile();
    delete p[nazwa];
    try { localStorage.setItem(PROFILE, JSON.stringify(p)); } catch (e) {}
    toast("usunięto profil");
    odswiezProfile();
  }

  let listaProfili, poleNazwy, etykFolder, etykDziennik;

  function odswiezFolder() {
    if (!etykFolder) return;
    if (!window.showDirectoryPicker && !window.showSaveFilePicker) {
      etykFolder.textContent =
        t("Ta przeglądarka nie pozwala wskazać miejsca — pliki trafią do Pobranych.");
      return;
    }
    if (etykDziennik) etykDziennik.textContent = stanZapisu.startsWith("brak")
      ? "Automat nieaktywny: wskaż folder poniżej."
      : `Automat: ${stanZapisu}`;
    etykFolder.textContent = cal.powFolder
      ? t('Folder zapisu: {nazwa}',{nazwa:uchwytFolderu?uchwytFolderu.name:t('wybrany wcześniej')})
      : t("Przy każdym zapisie pojawi się okno wyboru miejsca.");
  }
  function odswiezProfile() {
    if (!listaProfili) return;
    const p = profile();
    listaProfili.innerHTML = "";
    const nazwy = Object.keys(p);
    if (!nazwy.length) {
      listaProfili.appendChild(el("option", null, t("— brak zapisanych —")));
      return;
    }
    for (const n of nazwy) listaProfili.appendChild(el("option", null, n));
  }

  // ---------- obraz ----------
  function applyTransform() {
    if (!video) return;
    if (aktywnaHomografia()) { layoutVideo(curSize || 600); return; }
    video.style.transformOrigin = replayVideo.style.transformOrigin = "center center";
    const rad = Math.PI / 180;
    const comp = 1 / Math.max(0.35,
      Math.cos(cal.rx * rad) * Math.cos(cal.ry * rad));
    const mn = Math.min(cal.sx, cal.sy) || 1;
    const tr =
      `perspective(${(cal.persp * scaleK).toFixed(0)}px) ` +
      `rotateX(${cal.rx}deg) rotateY(${cal.ry}deg) rotate(${cal.rz}deg) ` +
      `scale(${comp.toFixed(4)}) ` +
      `scaleX(${(cal.sx / mn).toFixed(4)}) scaleY(${(cal.sy / mn).toFixed(4)})`;
    video.style.transform = tr;
    replayVideo.style.transform = tr;
  }

  function layoutVideo(size) {
    const macierz = aktywnaHomografia();
    if (macierz) {
      const css={width:size+'px',height:size+'px',left:'0px',top:'0px',transformOrigin:'0 0',transform:macierzCSS(macierz,size)};
      Object.assign(video.style,css);Object.assign(replayVideo.style,css);coversCircle=true;return;
    }
    const ar = (video.videoWidth || 1920) / (video.videoHeight || 1080);
    if (cal.vz < 0.2) cal.vz = 0.2;
    const h = size * cal.vz, w = h * ar;
    const ox = cal.vx * scaleK, oy = cal.vy * scaleK;

    coversCircle = (h >= size - 1) && (w >= size - 1) &&
      Math.abs(ox) <= (w - size) / 2 + 1 && Math.abs(oy) <= (h - size) / 2 + 1;

    const box = {
      width: `${w}px`, height: `${h}px`,
      left: `${size / 2 - w / 2 + ox}px`,
      top: `${size / 2 - h / 2 + oy}px`,
    };
    Object.assign(video.style, box);
    Object.assign(replayVideo.style, box);
  }

  function drawGuide(size) {
    guide.style.display = showGuide ? "block" : "none";
    if (!showGuide) return;
    const cx = size / 2 + cal.bcx * scaleK;
    const cy = size / 2 + cal.bcy * scaleK;
    const R = (size / 2) * promienPol();
    let d = "";
    for (const rr of [1.0, RING_R.D, RING_R.T, 0.07]) {
      const r = R * rr;
      d += `M ${cx - r} ${cy} a ${r} ${r} 0 1 0 ${2*r} 0 a ${r} ${r} 0 1 0 ${-2*r} 0 `;
    }
    for (let i = 0; i < 20; i++) {
      const a = (i * 18 + 9) * Math.PI / 180;
      d += `M ${cx + 0.08*R*Math.sin(a)} ${cy - 0.08*R*Math.cos(a)} ` +
           `L ${cx + R*Math.sin(a)} ${cy - R*Math.cos(a)} `;
    }
    guide.setAttribute("width", size);
    guide.setAttribute("height", size);
    guide.innerHTML =
      `<path d="${d}" fill="none" stroke="#00e5ff" stroke-width="1.5" opacity=".85"/>` +
      `<line x1="${cx}" y1="${cy - R*1.05}" x2="${cx}" y2="${cy - R*.88}" ` +
      `stroke="#ffd400" stroke-width="4"/>`;
  }

  // 4.22: obraz z kamery lezy nad strona z z-index 9000, wiec zaslania
  // okna samego Autodarts - np. BOARD CONTROL ze Stop, Reset i Calibrate.
  // Zrzutow ekranu nie mam, wiec NIE zgaduje klas. Rozpoznaje okno
  // strukturalnie: element o roli okna modalnego albo znacznik <dialog>,
  // widoczny i zajmujacy istotna czesc ekranu, spoza naszych warstw.
  // Wynik jest buforowany i odswiezany obserwatorem zmian, nie skanem
  // w kazdej klatce - budzet skanow zostaje nietkniety.
  // Bufor odswiezany ZMIANAMI w drzewie, nie zegarem klatek. Bez tego
  // sprawdzenie co klatke podnosilo budzet skanow z 15 na 20 na sekunde.
  // Obserwator tylko unieważnia bufor; sam skan i tak jest ograniczony.
  let elementOknaAplikacji=null, znalezionyElementOkna=null;
  let oknoAplikacji = "", oknoSprawdzone = 0, drzewoZmienione = true;
  // Wszystkie nasze warstwy. Okno diagnostyczne i pasek stanu przerysowuja
  // sie 5 razy na sekunde - bez nich na tej liscie bufor bylby zawsze
  // niewazny i sprawdzenie chodziloby czesciej niz przed optymalizacja.
  function nasze(n) {
    if (n && n.closest && n.closest("[data-adcam-ui]")) return true;
    for (const w of [wrap, okno, pasekPow, backdrop, hud, diagBox, pigulka])
      if (w && (n === w || w === n.parentNode || w.contains(n))) return true;
    return false;
  }
  try {
    new MutationObserver(lista => {
      // Nasz wlasny interfejs przerysowuje sie 5 razy na sekunde. Gdyby
      // liczyl sie jako zmiana, bufor bylby zawsze niewazny i sprawdzenie
      // chodziloby czesciej niz przed optymalizacja.
      for (const m of lista)
        if (!nasze(m.target)) { drzewoZmienione = true; return; }
    }).observe(document.documentElement,
      { childList: true, subtree: true, attributes: true,
        attributeFilter: ["open", "aria-modal", "role", "style", "class"] });
  } catch (e) {}

  function _szukajOknaAplikacji() {
    znalezionyElementOkna=null;
    skanyLicznik++;
    const kand = document.querySelectorAll(
      "dialog[open], [role='dialog'], [role='alertdialog'], [aria-modal='true']");
    for (const e of kand) {
      if (nasze(e)) continue;
      if (wrap && (e === wrap || wrap.contains(e) || e.contains(wrap))) continue;
      if (okno && (e === okno || okno.contains(e) || e.contains(okno))) continue;
      const s = getComputedStyle(e);
      if (s.display === "none" || s.visibility === "hidden" ||
          parseFloat(s.opacity || "1") < 0.05) continue;
      const r = e.getBoundingClientRect();
      // Okno musi realnie cos zaslaniac - drobne podpowiedzi pomijamy.
      if (r.width < 240 || r.height < 160) continue;
      if (r.bottom <= 0 || r.right <= 0 || r.top >= window.innerHeight ||
          r.left >= window.innerWidth) continue;
      if (r.width * r.height < window.innerWidth * window.innerHeight * 0.06)
        continue;
      const nazwa = (e.getAttribute("aria-label") ||
        e.querySelector("h1,h2,h3,[role=heading]")?.textContent ||
        (e.textContent || "").trim().slice(0, 40) || "okno").replace(/\s+/g, " ");
      znalezionyElementOkna=e;return nazwa;
    }
    return "";
  }

  function oknoAplikacjiOtwarte() {
    const t = Date.now();
    // Bez zmian w drzewie sprawdzamy rzadko, po zmianie prawie natychmiast.
    const odstep = drzewoZmienione ? 150 : 1500;
    if (t - oknoSprawdzone < odstep) return oknoAplikacji;
    oknoSprawdzone = t; drzewoZmienione = false;
    const poprz = elementOknaAplikacji;
    oknoAplikacji = _szukajOknaAplikacji();
    elementOknaAplikacji=znalezionyElementOkna;
    if (poprz !== elementOknaAplikacji) {
      // Powod ukrycia musi przestac klamac od razu. place() potrafi wrocic
      // wczesniej galezia powtorki i nie dotknac tego pola, wiec zostawaloby
      // "okno Autodarts" jeszcze dlugo po jego zamknieciu.
      if (!oknoAplikacji && powodUkrycia.startsWith("okno Autodarts"))
        powodUkrycia = "-";
      zaloguj(oknoAplikacji
        ? `okno Autodarts otwarte: ${oknoAplikacji} — chowam obraz`
        : "okno Autodarts zamknięte — przeliczam widoczność");
    }
    return oknoAplikacji;
  }

  function place() {
    if (!wrap) return;
    if (kreator) { wrap.style.display="none"; return; }

    // Sprawdzenie poprzedza WSZYSTKIE galezie, takze powtorke - inaczej
    // odtwarzanie omijaloby blokade i dalej zaslanialo okno.
    const modal = oknoAplikacjiOtwarte();
    synchronizujOknoPowtorki();
    if (modal) {
      turnState = "okno Autodarts";
      powodUkrycia = `okno Autodarts: ${modal}`;
      wrap.style.display = "none";
      guide.style.display = "none";
      // Powtorka nie moze przechwytywac klikniec nad oknem aplikacji.
      backdrop.style.pointerEvents = "none";
      backdrop.style.display = "none";
      backdrop.style.opacity = "0";
      if (pasekPow) pasekPow.style.display = "none";
      return;
    }
    if (widokPowtorki()) {
      backdrop.style.display = "block";
      backdrop.style.opacity = String(cal.powPrzyciemnienie);
      backdrop.style.pointerEvents = "auto";
    }

    if (replayPhase === "pauza") { wrap.style.display = "none"; return; }

    if (widokPowtorki()) {
      const size = Math.min(window.innerWidth, window.innerHeight) * cal.powRozmiar;
      if (cal.refSize) scaleK = size / cal.refSize;
      curSize = size;
      if (Math.abs(scaleK - lastK) > 0.002) { lastK = scaleK; applyTransform(); }
      Object.assign(wrap.style, {
        display: "block", width: `${size}px`, height: `${size}px`,
        left: `${window.innerWidth/2 - size/2}px`,
        top: `${window.innerHeight/2 - size/2}px`,
      });
      layoutVideo(size);
      guide.style.display = "none";
      return;
    }

    if (!wMeczu()) {
      turnState = "poza meczem";
      powodUkrycia = "poza meczem";
      wrap.style.display = "none";
      return;
    }

    if (cal.ukryjBullOff && bullOff()) {
      turnState = "rzut o bulla — obraz schowany";
      powodUkrycia = "rzut o bulla";
      wrap.style.display = "none";
      return;
    }

    const mine = myTurn();
    turnState = mine ? "twoja kolejka" : "kolejka przeciwnika";
    if (!visible || !camOk || (czyOnline() && !mine)) {
      powodUkrycia = !visible ? "ukryty klawiszem K" : !camOk ? "brak kamery" : "kolejka przeciwnika";
      wrap.style.display = "none"; return;
    }

    let cx, cy, size;
    if (cal.manual) {
      size = cal.size;
      if (!cal.refSize) cal.refSize = size;
      scaleK = size / cal.refSize;
      cx = window.innerWidth / 2 + cal.dx * scaleK;
      cy = window.innerHeight / 2 + cal.dy * scaleK;
      boardState = "tryb ręczny";
    } else {
      const b = findBoard();
      if (!b) {
        boardState = "nie znaleziono tarczy";
      powodUkrycia = "nie znaleziono tarczy";
        wrap.style.display = "none"; return;
      }
      const br=prostokatTarczy(b);
      boardState = `${b.el.tagName.toLowerCase()} ${Math.round(b.r.width)}px → ${Math.round(br.width)}px`;
      size = Math.min(br.width, br.height) * cal.cover;
      if (!cal.refSize) cal.refSize = size;
      scaleK = size / cal.refSize;
      cx = br.left + br.width / 2 + cal.dx * scaleK;
      cy = br.top + br.height / 2 + cal.dy * scaleK;
    }

    powodUkrycia = "-";
    if (Math.abs(scaleK - lastK) > 0.002) { lastK = scaleK; applyTransform(); }
    curSize = size;
    Object.assign(wrap.style, {
      display: "block", width: `${size}px`, height: `${size}px`,
      left: `${cx - size/2}px`, top: `${cy - size/2}px`,
    });
    layoutVideo(size);
    drawGuide(size);
  }

  // ---------- zoom ----------
  function ustawZoom(Z, pt, ms, krzywa) {
    const R = (curSize / 2) * promienPol();
    let tx = -(pt.u * R + cal.bcx * scaleK) * Z;
    let ty = -(pt.v * R + cal.bcy * scaleK) * Z;

    // Krawedz obrazu nie moze wjechac w kolo.
    const ar = (video.videoWidth || 1920) / (video.videoHeight || 1080);
    const hh = curSize * cal.vz, ww = hh * ar;
    const ox = cal.vx * scaleK, oy = cal.vy * scaleK;
    const txMin = curSize/2 - (ox + ww/2) * Z, txMax = -curSize/2 + (ww/2 - ox) * Z;
    const tyMin = curSize/2 - (oy + hh/2) * Z, tyMax = -curSize/2 + (hh/2 - oy) * Z;
    if (!aktywnaHomografia() && txMin <= txMax) tx = Math.min(txMax, Math.max(txMin, tx));
    if (!aktywnaHomografia() && tyMin <= tyMax) ty = Math.min(tyMax, Math.max(tyMin, ty));

    zoomAktualny = Z; zoomTx = tx; zoomTy = ty;
    zoomLayer.style.transition = `transform ${ms}ms ${krzywa}`;
    zoomLayer.style.transform =
      `translate(${tx.toFixed(1)}px, ${ty.toFixed(1)}px) scale(${Z})`;
  }

  // Reset opiera sie na tym, jakie przyblizenie jest naprawde zastosowane.
  // Wczesniej pilnowal tego licznik etapow, ktory potrafil zostac
  // wyzerowany bez cofniecia obrazu - i zoom zostawal przyklejony.
  // 4.21: powrot musi byc NEUTRALNY. ustawZoom(1, {u:0,v:0}) nadal odejmuje
  // bcx i bcy pomnozone przez scaleK, wiec przy niezerowej kalibracji srodka
  // "powrot" zostawial obraz przesuniety - w tescie zewnetrznym -40/-20.
  // Warstwa zoomu ma wtedy wrocic do czystej tozsamosci; kalibracja srodka
  // nalezy do transformacji bazowej, nie do warstwy zoomu.
  function zerujZoom(ms, krzywa, powod) {
    zoomEtap = 0; ostatniCel = "";
    if (Math.abs(zoomAktualny - 1) < 0.001 &&
        Math.abs(zoomTx) < 0.5 && Math.abs(zoomTy) < 0.5) return;
    zaloguj(`zoom ← powrót${powod ? " (" + powod + ")" : ""}`);
    zoomAktualny = 1; zoomTx = 0; zoomTy = 0;
    zoomLayer.style.transition = `transform ${ms}ms ${krzywa}`;
    zoomLayer.style.transform = "translate(0px, 0px) scale(1)";
  }

  function applyZoom() {
    if (kreator) { zerujZoom(0,"linear"); return; }
    const now = Date.now();
    let target = null;
    const blokada = oknoOtwarte && aktywnaKarta !== "zoom";

    // 4.18: przelacznik "zoom w powtorce" byl w ustawieniach, interfejsie
    // i diagnostyce, ale nie w tej decyzji - powtorka powiekszala zawsze.
    // Wylaczony oznacza pelny widok tarczy i zadnego odczytu trasy z DOM,
    // bo obraz z powtorki nie ma nic wspolnego z biezacym checkoutem.
    if (inReplay && !cal.powZoomWl) {
      zoomState = "powtórka bez przybliżenia";
      zerujZoom(200, "ease");
      return;
    }
    if (inReplay && heldTarget) target = heldTarget;
    else if (inReplay) {
      zoomState = "powtórka — brak zapisanego celu";
      zerujZoom(200, "ease");
      return;
    }
    else if (now < testUntil) {
      target = { txt: "T20 (test)", pt: segmentPoint("T20"), test: true };
    }
    else if (blokada) {
      zoomState = "wstrzymany (ustawienia)";
      zerujZoom(200, "ease");
      return;
    }
    else if (cal.zoomWl) target = checkoutTarget();

    if (!target || !target.pt) {
      zoomState = !cal.zoomWl ? "wyłączony"
        : remaining === null ? "czuwa"
        : `czuwa — zostało ${remaining} (${routeLen} lotki)`;
      zerujZoom(cal.zoomWyjazdMs, "cubic-bezier(.4,0,.2,1)",
        !cal.zoomWl ? "wyłączony" : routeLen !== 1 ? `trasa ${routeLen} pól`
          : rzutyTeraz >= 3 ? "trzecia lotka" : "brak celu");
      heldTargetTxt = "";
      return;
    }

    const powZ = inReplay ? cal.powZoom : 1;
    const MAX_Z = 4;   // dalej obraz to juz tylko rozmyte piksele
    zoomState = `${target.txt}${target.rest != null ? " — zostało " + target.rest : ""}`;
    if (!inReplay && !target.test) heldTarget = target;

    const kluczCelu = target.klucz || target.txt;
    if (ostatniCel === "__wygaslo__" && kluczCelu === heldTargetTxt) return;
    if (kluczCelu !== ostatniCel) {
      ostatniCel = kluczCelu; heldTargetTxt = kluczCelu;
      zoomEtap = 1; zoomOd = now;
      zaloguj(`zoom → ${target.txt} (zostało ${target.rest}, rzuty ${rzutyTeraz})`);
      ustawZoom(Math.min(MAX_Z, cal.zoomSila * powZ), target.pt, cal.zoomWjazdMs,
        "cubic-bezier(.16,.72,.16,1)");
      return;
    }

    // Po wjezdzie obraz dalej bardzo wolno sie przybliza - tak jak
    // kamera w transmisji, ktora nieznacznie dojezdza do celu.
    // Zmarnowana szansa: pole sie nie zmienia, bo lotka nie trafila.
    // Po ustalonym czasie wracamy do widoku ogolnego.
    if (!inReplay && cal.zoomMaxSek > 0 && now - zoomOd > cal.zoomMaxSek * 1000) {
      zoomState = `${target.txt} — limit trzymania`;
      zerujZoom(cal.zoomWyjazdMs, "cubic-bezier(.4,0,.2,1)", "limit trzymania");
      ostatniCel = "__wygaslo__";
      return;
    }

    if (zoomEtap === 1 && cal.zoomDryf && now - zoomOd > cal.zoomWjazdMs) {
      zoomEtap = 2;
      ustawZoom(Math.min(MAX_Z, cal.zoomSila * cal.zoomDryfSila * powZ), target.pt,
        cal.zoomDryfMs, "linear");
    }
  }

  // ---------- kamera ----------
  async function listCams() {
    let devs = (await navigator.mediaDevices.enumerateDevices())
      .filter(d => d.kind === "videoinput");
    if (!devs.length || !devs[0].label) {
      const p = await navigator.mediaDevices.getUserMedia({
        video: { width: { max: 320 }, height: { max: 240 } } });
      p.getTracks().forEach(t => t.stop());
      devs = (await navigator.mediaDevices.enumerateDevices())
        .filter(d => d.kind === "videoinput");
    }
    return devs;
  }

  let cameraAttempt=0;
  // sonda uruchamiana raz, przy pierwszym polaczeniu kamery
  let sondaZrobiona = false;
  async function startCamera() {
    const attempt=++cameraAttempt;
    if(inReplay){checkoutPowtorki=null;przerwij("zmiana kamery");}
    stopRecorder("zmiana kamery");camOk=false;
    if (video.srcObject) {
      try { video.srcObject.getTracks().forEach(t => t.stop()); } catch (e) {}
      video.srcObject = null;
    }
    let devs;
    try { devs = await listCams(); }
    catch (e) { camState = "brak zgody: " + e.name; camOk = false; return; }

    if(attempt!==cameraAttempt)return;
    let pick = devs[0];
    if (cal.kamera) {
      const n = cal.kamera.toLowerCase();
      pick = devs.find(d => d.label.toLowerCase().includes(n)) || devs[0];
    }
    if(cal.cameraDeviceId)pick=devs.find(d=>d.deviceId===cal.cameraDeviceId)||pick;
    if (!pick) { camState = "brak kamer"; camOk = false; return; }

    proby = [];
    let lastErr = null;
    // Nizsza rozdzielczosc to mniej pracy przy dekodowaniu, transformacji
    // i kodowaniu nagrania. Kolo ma i tak okolo 800 px, wiec roznicy
    // w ostrosci praktycznie nie widac.
    for (const t of CONFIG.tryby.filter(x => x.w <= cal.maxSzer)) {
      const v = { deviceId: { exact: pick.deviceId }, resizeMode: { ideal: "none" } };
      if (t.exact) {
        v.width = { exact: t.w }; v.height = { exact: t.h };
        v.frameRate = { exact: t.fps };
      } else {
        v.width = { ideal: t.w, max: t.w };
        v.height = { ideal: t.h, max: t.h };
        v.frameRate = { ideal: t.fps, max: t.fps };
      }
      if (DEV_UI && !sondaZrobiona) { sondaZrobiona = true; try { zbadajZapis(); } catch (e) {} }
      try {
        const st = await navigator.mediaDevices.getUserMedia({ video: v, audio: false });
        if(attempt!==cameraAttempt){st.getTracks().forEach(t=>t.stop());return;}
        video.srcObject = st;
        await video.play();
        if(attempt!==cameraAttempt)return;
        if(cal.punktowa&&Math.abs(video.videoWidth/video.videoHeight-cal.punktowa.ratio)>.02){cal.punktowa.enabled=false;toast("Zmieniono proporcje kamery — wykonaj kalibrację ponownie");}
        mierzKlatki();
        const g = st.getVideoTracks()[0].getSettings();
        if(cal.punktowa?.enabled && cal.punktowa.deviceId && cal.punktowa.deviceId!==g.deviceId){
          cal.punktowa.enabled=false;save();toast('Inna kamera — wykonaj dopasowanie obrazu');
        }
        camState = `${pick.label} — ${g.width}x${g.height} @${Math.round(g.frameRate || t.fps)}`;
        zaloguj(`kamera gotowa: ${g.width}x${g.height}@${Math.round(g.frameRate || t.fps)}`);
        if(DEV_UI)try {
          const mozliwosci = st.getVideoTracks()[0].getCapabilities?.();
          if (mozliwosci) {
            const zakres = o => o && Number.isFinite(o.max) ? `${o.min ?? "?"}–${o.max}` : "?";
            zaloguj(`kamera potrafi: szerokość ${zakres(mozliwosci.width)}  ` +
              `wysokość ${zakres(mozliwosci.height)}  klatki ${zakres(mozliwosci.frameRate)}`);
          }
        } catch (e) {}
        st.getVideoTracks()[0].addEventListener('ended',()=>{
          if(attempt!==cameraAttempt)return;camOk=false;camState='kamera odłączona';stopRecorder('kamera odłączona');toast('Kamera odłączona — wybierz ją ponownie w kreatorze');
        },{once:true});
        camOk = true; lastK = -1;
        applyTransform(); startRecorder();
        return;
      } catch (e) {
        if(attempt!==cameraAttempt)return;
        if(video.srcObject){video.srcObject.getTracks().forEach(t=>t.stop());video.srcObject=null;}
        lastErr = e;
        proby.push(`${t.w}x${t.h}@${t.fps}: ${e.name}`);
        zaloguj(`kamera ${t.w}x${t.h}@${t.fps} odrzucona: ${e.name}`);
      }
    }
    camOk = false;
    camState = `nie udało się (${lastErr ? lastErr.name : "?"})`;
  }

  // Rzeczywista liczba klatek z kamery. Ustawienia potrafia deklarowac
  // co innego, niz kamera naprawde dostarcza.
  //
  // 4.17: stary licznik zliczal WLASNE wywolania zwrotne, a nie klatki.
  // Przy zajetym watku glownym przegladarka sklada kilka wystawionych
  // klatek w jedno wywolanie i wynik szedl w dol bez zadnej winy kamery -
  // w raporcie z 4.16 bylo kam=1 przy ui=60, co nie ma prawa byc prawda.
  // presentedFrames to licznik narastajacy samej przegladarki, wiec
  // roznica miedzy wywolaniami daje liczbe klatek naprawde wystawionych.
  function mierzKlatki() {
    if (!video.requestVideoFrameCallback) return;
    // 4.20: dopisujemy metadane. W dzienniku 4.19 bylo ui=58 przy kam=1
    // i mediana kam=14 przy torze 30 kl/s - bez przyrostow presentedFrames
    // i czasu okna nie da sie rozstrzygnac, czy to kamera, kompozytor,
    // czy nadal licznik.
    klatkiInfo = { gen: klatkiGen + 1, przyrost: 0, okno: 0,
                   presented: null, media: null, brakMeta: false };
    // 4.18: kazde ponowne polaczenie kamery uruchamialo druga, rownolegla
    // petle na tym samym elemencie wideo. Obie zliczaly do wspolnego
    // fpsLicznik, wiec wynik rosl bez zwiazku z kamera. Numer generacji
    // wygasza poprzednia petle przy pierwszym wywolaniu.
    const gen = ++klatkiGen;
    let poprzWystawione = null;
    const krok = (teraz, meta) => {
      if (gen !== klatkiGen) return;
      const licznik = meta && typeof meta.presentedFrames === "number"
        ? meta.presentedFrames : null;
      if (licznik === null) {
        fpsLicznik++;                       // starsza przegladarka bez metadanych
      } else {
        if (poprzWystawione === null) poprzWystawione = licznik - 1;
        fpsLicznik += Math.max(1, licznik - poprzWystawione);
        poprzWystawione = licznik;
      }
      const t = performance.now();
      if (!fpsOkno) fpsOkno = t;
      if (meta) {
        klatkiInfo.presented = typeof meta.presentedFrames === "number"
          ? meta.presentedFrames : null;
        klatkiInfo.media = typeof meta.mediaTime === "number"
          ? Math.round(meta.mediaTime * 1000) / 1000 : null;
      } else klatkiInfo.brakMeta = true;
      if (t - fpsOkno >= 1000) {
        fpsZmierzone = Math.round(fpsLicznik * 1000 / (t - fpsOkno));
        klatkiInfo.przyrost = fpsLicznik;
        klatkiInfo.okno = Math.round(t - fpsOkno);
        fpsLicznik = 0; fpsOkno = t;
      }
      if (video.srcObject) video.requestVideoFrameCallback(krok);
    };
    video.requestVideoFrameCallback(krok);
  }

  // Eksperymentalny MP4. Czysty muxer używany także przez test z prawdziwym AVC.
  // WebCodecs avc.format='avc': próbki length-prefixed, description to avcC.
  // Bez B-frames: kolejność DTS=PTS sprawdzana przy każdym pakiecie.
  function zlozMp4(samples, description, width, height, fps) {
    if(!samples.length||!samples[0].key||!description?.byteLength)throw Error('MP4: brak klatki kluczowej lub avcC');
    const cat=(...a)=>{const b=new Uint8Array(a.reduce((n,x)=>n+x.length,0));let p=0;for(const x of a){b.set(x,p);p+=x.length;}return b;};
    const u32=(...ns)=>{const b=new Uint8Array(ns.length*4),v=new DataView(b.buffer);ns.forEach((n,i)=>{if(!Number.isInteger(n)||n<0||n>0xffffffff)throw Error('MP4: przekroczony zakres');v.setUint32(i*4,n);});return b;};
    const u16=(...ns)=>{const b=new Uint8Array(ns.length*2),v=new DataView(b.buffer);ns.forEach((n,i)=>v.setUint16(i*2,n));return b;};
    const str=s=>Uint8Array.from(s,c=>c.charCodeAt(0));
    const box=(name,...parts)=>{const body=cat(...parts);return cat(u32(body.length+8),str(name),body);};
    const full=(name,flags,...parts)=>box(name,u32(flags),...parts);
    const zero=n=>new Uint8Array(n), matrix=u32(65536,0,0,0,65536,0,0,0,0x40000000);
    const times=[],sizes=[],keys=[];let duration=0;
    for(let i=0;i<samples.length;i++){
      const s=samples[i];
      const d=i+1<samples.length?samples[i+1].ts-s.ts:Math.round(s.duration||1000000/fps);
      if(!Number.isSafeInteger(d)||d<=0)throw Error('MP4: nieuporządkowane znaczniki czasu');
      const last=times[times.length-1];if(last&&last[1]===d)last[0]++;else times.push([1,d]);
      duration+=d;sizes.push(s.data.length);if(s.key)keys.push(i+1);
    }
    const ftyp=box('ftyp',str('isom'),u32(512),str('isomiso2avc1mp41'));
    const avc1=box('avc1',zero(6),u16(1),zero(16),u16(width,height),u32(0x480000,0x480000,0),u16(1),zero(32),u16(24,65535),box('avcC',new Uint8Array(description)));
    const makeMoov=offset=>box('moov',
      full('mvhd',0,u32(0,0,1000000,duration,65536),u16(256,0),zero(8),matrix,zero(24),u32(2)),
      box('trak',full('tkhd',7,u32(0,0,1,0,duration),zero(8),u16(0,0,0,0),matrix,u32(width*65536,height*65536)),
        box('mdia',full('mdhd',0,u32(0,0,1000000,duration),u16(0x55c4,0)),
          full('hdlr',0,u32(0),str('vide'),zero(12),str('Video\0')),
          box('minf',full('vmhd',1,u16(0,0,0,0)),box('dinf',full('dref',0,u32(1),full('url ',1))),
            box('stbl',full('stsd',0,u32(1),avc1),full('stts',0,u32(times.length),...times.map(x=>u32(...x))),
              full('stsc',0,u32(1,1,samples.length,1)),full('stsz',0,u32(0,sizes.length),u32(...sizes)),
              full('stco',0,u32(1,offset)),full('stss',0,u32(keys.length),u32(...keys)))))));
    const moov=makeMoov(ftyp.length+makeMoov(0).length+8);
    const payloadSize=sizes.reduce((a,b)=>a+b,0);
    // Blob parts avoid a second full-size copy of the ring on the worker heap.
    return {blob:new Blob([ftyp,moov,u32(payloadSize+8),str('mdat'),...samples.map(s=>s.data)],{type:'video/mp4'}),duration:duration/1000000,frames:samples.length};
  }

  function trybZapisu(c=cal){
    if(['auto','mp4','webm'].includes(c.powTryb))return c.powTryb;
    // Zachowaj dotychczasowy wybór i fallback ze starszych profili.
    return typeof c.powMp4Eksperyment==='boolean'?(c.powMp4Eksperyment?'auto':'webm'):'auto';
  }
  function zmienFormatZapisu(mode,webm=cal.powFormat,retry=false){
    if(!['auto','mp4','webm'].includes(mode))return false;
    if(inReplay||bufowanie||zamykanieNagrania||buforOczekujace.size){toast(t('Zamknij powtórkę przed zmianą formatu'));return false;}
    if(!retry&&mode===trybZapisu()&&webm===cal.powFormat)return true;
    cal.powTryb=mode;cal.powFormat=webm;mp4Fallback='';bladBufora='';save();
    stopRecorder('zmiana formatu');startRecorder();
    zaloguj('format wybrany: '+mode+'; WebM: '+webm);
    return true;
  }

  function mp4WorkerMain(mux) {
    let encoder=null,reader=null,ring=[],description=null,cfg=null,limit=40,bytes=0,total=0;
    let running=false,flushing=false,lastIn=-Infinity,lastOut=-Infinity,lastKey=-Infinity,rateTime=null,rateCredit=1.25;
    let droppedRate=0,droppedQueue=0,droppedFlush=0;
    let received=0,dropped=0,lastStats=0,lastTotal=0,lastReceived=0,lastDropped=0,seen=0,first=true;
    const emit=m=>self.postMessage(m);
    const fail=e=>{if(!running)return;running=false;try{reader?.cancel().catch(()=>{});}catch(_){}try{encoder?.close();}catch(_){}ring=[];bytes=0;emit({type:'error',error:String(e.message||e)});};
    function trim(){
      if(!ring.length)return;
      const cutoff=ring[ring.length-1].ts-limit*1000000;let index=0;
      for(let i=1;i<ring.length&&ring[i].ts<=cutoff;i++)if(ring[i].key)index=i;
      // Wymuszony limit pamięci też tnie wyłącznie na początku GOP.
      while(bytes>96*1048576&&index<ring.length-1){let next=index+1;while(next<ring.length&&!ring[next].key)next++;if(next===ring.length)break;index=next;break;}
      if(index){const removed=ring.splice(0,index);for(const s of removed)bytes-=s.data.length;}
      if(bytes>128*1048576)throw Error('MP4: limit pamięci bufora');
    }
    function stats(force=false){
      const now=performance.now(),dt=(now-lastStats)/1000;if(!force&&dt<1)return; // dt jest w sekundach, nie milisekundach
      emit({type:'stats',bytes,seconds:ring.length?(ring[ring.length-1].ts-ring[0].ts)/1000000:0,frames:ring.length,totalFrames:total,
        videoWidth:cfg.width,videoHeight:cfg.height,received,dropped,droppedRate,droppedQueue,droppedFlush,queue:encoder.encodeQueueSize,
        fps:dt>0?(total-lastTotal)/dt:0,inputFps:dt>0?(received-lastReceived)/dt:0,dropDelta:dropped-lastDropped});
      lastStats=now;lastTotal=total;lastReceived=received;lastDropped=dropped;
    }
    function output(chunk,meta){
      if(!running)return;
      try{
        if(chunk.timestamp<=lastOut)throw Error('MP4: kolejność klatek wymaga B-frames — powrót do WebM');
        lastOut=chunk.timestamp;
        if(meta?.decoderConfig?.description){
          const d=meta.decoderConfig.description;
          const next=ArrayBuffer.isView(d)?new Uint8Array(d.buffer,d.byteOffset,d.byteLength).slice():new Uint8Array(d).slice();
          if(description&&(description.length!==next.length||description.some((v,i)=>v!==next[i]))){
            if(chunk.type!=='key')throw Error('MP4: zmiana konfiguracji poza klatką kluczową');
            ring=[];bytes=0;emit({type:'note',text:'Zmiana avcC — bufor MP4 zbierany od nowa'});
          }
          description=next;
        }
        if(!description)throw Error('MP4: koder nie przekazał avcC');
        if(!ring.length&&chunk.type!=='key')throw Error('MP4: brak pierwszej klatki kluczowej');
        const data=new Uint8Array(chunk.byteLength);chunk.copyTo(data);
        ring.push({ts:chunk.timestamp,duration:chunk.duration,key:chunk.type==='key',data});bytes+=data.length;total++;
        trim();seen=performance.now();if(first){first=false;emit({type:'ready',config:cfg});}stats();
      }catch(e){fail(e);}
    }
    async function begin(m){
      if(running)throw Error('MP4: podwójny start');running=true;
      if(typeof VideoEncoder!=='function')throw Error('MP4: brak VideoEncoder w Workerze');
      limit=Math.max(5,Math.min(120,Number(m.seconds)||40));const base={codec:'avc1.4D401F',width:m.width,height:m.height,framerate:m.fps,bitrate:m.bitrate,latencyMode:'realtime',avc:{format:'avc'}};
      for(const pref of ['prefer-hardware','no-preference']){
        try{const r=await VideoEncoder.isConfigSupported({...base,hardwareAcceleration:pref});if(r.supported){cfg={...base,hardwareAcceleration:pref};break;}}catch(_){}
      }
      if(!cfg)throw Error('MP4: H.264 niedostępny dla wybranej rozdzielczości');
      encoder=new VideoEncoder({output,error:fail});encoder.configure(cfg);
      reader=m.stream.getReader();lastStats=performance.now();seen=lastStats;
      // Watchdog działa niezależnie od read(): brak klatek/wyjścia nie udaje nagrywania.
      setInterval(()=>{if(running&&performance.now()-seen>6000)fail(Error('MP4: brak nowych zakodowanych klatek przez 6 s'));},1000);
      while(running){
        const {value:frame,done}=await reader.read();if(done){if(running)throw Error('MP4: strumień klatek zakończony');break;}
        try{
          if(!running)continue;received++;
          const ts=frame.timestamp;
          if(!Number.isSafeInteger(ts)||ts<=lastIn)throw Error('MP4: nieciągły zegar kamery');
          lastIn=ts;
          // Budżet klatek rośnie według rzeczywistego czasu kamery. Stała
          // faza terminów w 4.55 gubiła klatki, gdy dryf spotykał większy jitter.
          // Zapas <=2 toleruje nierówny rytm, lecz nie magazynuje "długu"
          // na przyszły burst. Po przerwie >2 okresów wracamy do startu.
          const period=1000000/cfg.framerate;
          if(rateTime!==null){
            const elapsed=ts-rateTime;
            rateCredit=elapsed>2*period?1.25:Math.min(2,rateCredit+elapsed/period);
          }
          rateTime=ts;
          if(flushing){rateCredit=Math.min(rateCredit,1.25);dropped++;droppedFlush++;continue;}
          if(encoder.encodeQueueSize>=4){rateCredit=Math.min(rateCredit,1.25);dropped++;droppedQueue++;continue;}
          if(rateCredit<1-1e-5){dropped++;droppedRate++;continue;}
          const key=ts-lastKey>=1000000;
          encoder.encode(frame,{keyFrame:key});rateCredit=Math.max(0,rateCredit-1);
          if(key)lastKey=ts;
        }finally{frame.close();}
      }
    }
    let snapshots=Promise.resolve();
    self.onmessage=e=>{const m=e.data;
      if(m.type==='init')begin(m).catch(fail);
      if(m.type==='config'){limit=Math.max(5,Math.min(120,Number(m.seconds)||40));try{trim();}catch(e){fail(e);}}
      if(m.type==='snapshot')snapshots=snapshots.then(async()=>{
        if(!running||!encoder)throw Error('MP4: nieaktywny koder');
        flushing=true;
        try{
          await encoder.flush();if(!running)return;
          if(!ring.length)throw Error('MP4: bufor pusty');
          const cutoff=ring[ring.length-1].ts-Math.max(0.5,m.seconds)*1000000;let start=0;
          for(let i=1;i<ring.length&&ring[i].ts<=cutoff;i++)if(ring[i].key)start=i;
          const result=mux(ring.slice(start),description,cfg.width,cfg.height,cfg.framerate);
          emit({type:'snapshot',id:m.id,...result});stats(true);
        }finally{flushing=false;}
      }).catch(e=>{emit({type:'snapshot',id:m.id,error:e.message});fail(e);});
    };
  }

  // Adapter do istniejącego cyklu rejestratora i bufora. Kamera podglądu żyje osobno.
  let mp4Fallback='', mp4Sesja=null;
  function uruchomMp4(gen){
    const r={state:'starting',mimeType:'video/mp4',mp4:true,stop(){this.state='inactive';}};
    rec=r;recCzynne.add(r);recStart=Date.now();recStan=replayState='uruchamiam MP4';
    let clone=null,stream=null,w=null,url=null,timer=null,closed=false,lastLog=0;
    const current=()=>!closed&&recGen===gen&&rec===r;
    const fail=message=>{
      if(!current())return;
      mp4Fallback=String(message);const auto=trybZapisu()==='auto';
      zaloguj((auto?'MP4 fallback → WebM: ':'MP4 zatrzymany: ')+mp4Fallback);
      stopRecorder(auto?'powrót do WebM':'MP4 niedostępny');
      toast(t(auto?'MP4 niedostępny — używam WebM':'MP4 niedostępny — wybierz Automatycznie lub WebM'));
      startRecorder();
    };
    mp4Sesja={fail,close(){closed=true;clearTimeout(timer);try{clone?.stop();}catch(_){}if(stream&&!stream.locked)stream.cancel().catch(()=>{});}};
    try{
      if(!window.Worker||!window.MediaStreamTrackProcessor)throw Error('brak Workera lub procesora klatek');
      const source=video.srcObject.getVideoTracks()[0],g=source.getSettings();
      const sw=video.videoWidth||g.width,sh=video.videoHeight||g.height;
      if(!sw||!sh)throw Error('nieznany rozmiar obrazu kamery');
      const scale=Math.min(1,1280/sw,(cal.maxSzer||1280)/sw);
      const width=Math.max(2,Math.floor(sw*scale/2)*2),height=Math.max(2,Math.floor(sh*scale/2)*2);
      const fps=Math.min(30,g.frameRate||30);
      if(height>720)throw Error('eksperyment MP4 obsługuje obraz do 1280×720');
      clone=source.clone();stream=new window.MediaStreamTrackProcessor({track:clone,maxBufferSize:6}).readable;
      url=URL.createObjectURL(new Blob(['('+mp4WorkerMain.toString()+')('+zlozMp4.toString()+')'],{type:'text/javascript'}));
      w=new Worker(url);buforWorker=w;buforWorkerUrl=url;buforTryb='MP4/H.264 · Worker';buforOstatnieDane=Date.now();
      torRaport='MP4: oczekiwanie na klatki';nagranieWymiary=width+'x'+height;chunks=[];bajtyBufora=0;
      w.onerror=()=>fail('nie udało się uruchomić Workera MP4');
      w.onmessage=e=>{if(!current())return;const m=e.data;
        if(m.type==='error')return fail(m.error);
        if(m.type==='note')zaloguj('MP4: '+m.text);
        if(m.type==='ready'){
          clearTimeout(timer);r.state='recording';recStan=replayState='nagrywa MP4';
          zaloguj('MP4 aktywny: '+width+'x'+height+'@'+fps+' '+m.config.codec+' '+m.config.hardwareAcceleration+'; procesor na stronie → strumień do Workera; preferencja sprzętu nie potwierdza użycia GPU');
          toast(t('MP4 aktywny — nagrywam materiał do powtórek'));
        }
        if(m.type==='stats'){
          torZakodowane=m.totalFrames;bajtyBufora=m.bytes;buforSekundy=m.seconds;buforKlatki=m.frames;buforOstatnieDane=Date.now();
          torRaport=`MP4: wejście=${m.inputFps.toFixed(1)}/s; koder=${m.fps.toFixed(1)}/s; pominięte=${m.dropDelta} (łącznie ${m.dropped}: limitFPS=${m.droppedRate}, przeciążenie=${m.droppedQueue}, migawka=${m.droppedFlush}); kolejka=${m.queue}; bufor=${m.seconds.toFixed(1)}s`;
          if(Date.now()-lastLog>=5000){lastLog=Date.now();zaloguj(torRaport);}
        }
        if(m.type==='snapshot'){
          const p=buforOczekujace.get(m.id);if(!p)return;buforOczekujace.delete(m.id);clearTimeout(p.timer);
          if(m.blob){danePliku.set(m.blob,{duration:m.duration,frames:m.frames});zaloguj(`MP4: film ${m.duration.toFixed(3)}s, ${m.frames} klatek, ${m.blob.size} B`);}
          else{zaloguj('MP4: '+m.error);toast(t('Nie udało się przygotować powtórki. Spróbuj ponownie.'));}p.done(m.blob||null);
        }
      };
      timer=setTimeout(()=>fail('brak pierwszej klatki MP4 przez 10 s'),10000);
      buforLimit=cal.powBuforSek;
      w.postMessage({type:'init',stream,width,height,fps,bitrate:cal.powBitrate*1000000,seconds:buforLimit},[stream]);
    }catch(e){if(url&&buforWorkerUrl!==url)URL.revokeObjectURL(url);fail(e.message||e.name);}
  }
  function pobierzMp4(done){
    if(!rec?.mp4||rec.state!=='recording'||!buforWorker)return done(null);
    const id=++buforZadanie;
    const timer=setTimeout(()=>{
      const p=buforOczekujace.get(id);if(!p)return;buforOczekujace.delete(id);p.done(null);
      mp4Sesja?.fail('przekroczony czas przygotowania powtórki MP4');
    },5000);
    buforOczekujace.set(id,{timer,done});
    try{buforWorker.postMessage({type:'snapshot',id,seconds:inReplay?dlugoscUjecia:cal.powRecznaSek});}
    catch(e){mp4Sesja?.fail(e.message);}
  }
  // ---------- nagrywanie i powtorki ----------
  // WebM to tor domyślny; eksperymentalny MP4 ma oddzielny adapter.
  const FORMATY = [
    { id: "webm-vp8",  mime: "video/webm;codecs=vp8", ext: "webm",
      opis: "WebM VP8 — zalecany, najmniej obciąża procesor" },
    { id: "webm-vp9",  mime: "video/webm;codecs=vp9", ext: "webm",
      opis: "WebM VP9 — mniejszy plik, mocno obciąża procesor" },
    { id: "webm",      mime: "video/webm", ext: "webm",
      opis: "WebM — domyślny" },
  ];

  // Sondy, nie funkcje. Odpowiadaja na dwa pytania, na ktore nie da sie
  // odpowiedziec z Node: czy ta przegladarka potrafi nagrywac MP4/H.264
  // i jakie tryby oferuje kamera. Nic nie zmieniaja w zachowaniu.
  const SONDY_ZAPISU = [
    "video/webm;codecs=vp8", "video/webm;codecs=vp9", "video/webm;codecs=av01",
    "video/mp4", "video/mp4;codecs=avc1.42E01E", "video/mp4;codecs=avc1",
    "video/mp4;codecs=avc3.42E01E", "video/mp4;codecs=vp9", "video/mp4;codecs=av01",
    "video/x-matroska;codecs=avc1",
  ];
  function zbadajZapis() {
    if(!DEV_UI)return;
    const mr = window.MediaRecorder;
    if (!mr || !mr.isTypeSupported) return zaloguj("zapis: brak MediaRecorder");
    const tak = SONDY_ZAPISU.filter(m => { try { return mr.isTypeSupported(m); } catch (e) { return false; } });
    zaloguj("zapis obsługiwany: " + (tak.join("  ") || "brak"));
    const koder = typeof window.VideoEncoder === "function";
    zaloguj("WebCodecs VideoEncoder: " + (koder ? "jest" : "brak"));
    if (koder && window.VideoEncoder.isConfigSupported) {
      for (const kodek of ["avc1.42E01E", "avc1.4D401F", "vp8", "vp09.00.10.08"])
        window.VideoEncoder.isConfigSupported({ codec: kodek, width: 1280, height: 720, framerate: 30 })
          .then(r => zaloguj(`koder ${kodek}: ${r.supported ? "tak" : "nie"}` +
            (r.config && r.config.hardwareAcceleration ? " (" + r.config.hardwareAcceleration + ")" : "")))
          .catch(() => zaloguj(`koder ${kodek}: nie`));
    }
  }

  // getCapabilities() podaje to, co Chrome wyliczylo z listy formatow, i potrafi
  // zanizyc wynik, gdy sterownik wystawia wyzsze tempo tylko w jednym kodowaniu.
  // Jedyna pewna proba to poprosic o konkretny tryb i zobaczyc, czy przejdzie.
  // Uruchamiane recznie z Lab, bo kamera jest na chwile zwalniana i obraz mrugnie.
  const PROBY_TRYBOW = [
    { w: 1920, h: 1080, fps: 60 }, { w: 1280, h: 720, fps: 60 },
    { w: 1920, h: 1080, fps: 30 }, { w: 1280, h: 720, fps: 30 },
    { w: 2560, h: 1440, fps: 30 }, { w: 3840, h: 2160, fps: 30 },
  ];
  let probaTrybowTrwa = false;
  async function zbadajTrybyKamery() {
    if(!DEV_UI)return;
    if (probaTrybowTrwa) return;
    probaTrybowTrwa = true;
    const idUrzadzenia = cal.cameraDeviceId || "";
    zaloguj("--- sprawdzam tryby kamery ---");
    try {
      // Zwalniamy biezacy strumien: wiele kamer UVC nie otwiera sie dwa razy
      // w roznych formatach naraz i proba skonczylaby sie falszywym "nie".
      if (video && video.srcObject) {
        video.srcObject.getTracks().forEach(t => t.stop());
        video.srcObject = null;
      }
      for (const p of PROBY_TRYBOW) {
        const v = { width: { exact: p.w }, height: { exact: p.h }, frameRate: { exact: p.fps } };
        if (idUrzadzenia) v.deviceId = { exact: idUrzadzenia };
        let st = null;
        try {
          st = await navigator.mediaDevices.getUserMedia({ video: v, audio: false });
          const g = st.getVideoTracks()[0].getSettings();
          zaloguj(`tryb ${p.w}x${p.h}@${p.fps}: TAK — otrzymano ` +
            `${g.width}x${g.height}@${Math.round(g.frameRate || 0)}`);
        } catch (e) {
          zaloguj(`tryb ${p.w}x${p.h}@${p.fps}: nie (${(e && e.name) || "błąd"})`);
        } finally {
          if (st) st.getTracks().forEach(t => t.stop());
        }
      }
    } finally {
      zaloguj("--- koniec sprawdzania trybów ---");
      probaTrybowTrwa = false;
      try { await startCamera(); } catch (e) {}
      toast("wyniki trybów w dzienniku");
    }
  }

  function dostepneFormaty() {
    if (!window.MediaRecorder) return [];
    return FORMATY.filter(f => window.MediaRecorder.isTypeSupported(f.mime));
  }

  function wybranyFormat() {
    const d = dostepneFormaty();
    if (!d.length) return null;
    return d.find(f => f.id === cal.powFormat) || d[0];
  }

  function mime() {
    const f = wybranyFormat();
    return f ? f.mime : "";
  }

  // ---- folder docelowy (File System Access API) ----
  let uchwytFolderu = null;

  // 4.18: oddajemy takze transakcje i polaczenie. Wczesniej dziennikDoBazy
  // zwracalo sukces zaraz po put(), nie czekajac na domkniecie transakcji
  // ani nie obslugujac jej pozniejszego bledu, a polaczenia nie byly zamykane.
  function bazaUchwytu(tryb) {
    return new Promise((ok, zle) => {
      const r = indexedDB.open("adCamFS", 1);
      r.onupgradeneeded = () => r.result.createObjectStore("fs");
      r.onsuccess = () => {
        const db = r.result;
        const tr = db.transaction("fs", tryb);
        ok({ st: tr.objectStore("fs"), tr, db });
      };
      r.onerror = () => zle(r.error);
    });
  }

  // Dwa osobne klucze. Wczesniej istnial jeden i pierwszy autozapis nowej
  // sesji - planowany juz po 4 sekundach, nie po trzech minutach -
  // nadpisywal poprzedni raport prawie pustym. Przycisk "Pobierz poprzednia
  // sesje" czytal ten sam klucz, wiec gubilo sie dokladnie to nagranie
  // przebiegu, ktore trzeba bylo zdiagnozowac.
  const KL_BIEZ = "dziennik", KL_POPRZ = "dziennikPoprzedni";
  let sesjaObrocona = false;

  function domknij(o) {
    return new Promise(ok => {
      const koniec = w => { try { o.db.close(); } catch (e) {} ok(w); };
      o.tr.oncomplete = () => koniec(true);
      o.tr.onerror = () => koniec(false);
      o.tr.onabort = () => koniec(false);
    });
  }

  // Rotacja zachodzi raz na sesje, przed pierwszym zapisem nowej.
  async function obrocSesje() {
    if (sesjaObrocona) return;
    sesjaObrocona = true;
    try {
      const o = await bazaUchwytu("readwrite");
      const r = o.st.get(KL_BIEZ);
      await new Promise(ok => { r.onsuccess = ok; r.onerror = ok; });
      if (r.result) o.st.put(r.result, KL_POPRZ);
      await domknij(o);
    } catch (e) { /* brak bazy nie moze zablokowac dziennika */ }
  }

  // 4.21: naprawa regresji z 4.18. Zmienilem wtedy ksztalt zwracany przez
  // bazaUchwytu na {st, tr, db}, ale poprawilem tylko funkcje dziennika.
  // Te dwie wolaly .put i .get na calym obiekcie, wyjatek byl polykany:
  // zapis nie nastepowal, a odczyt zwracal null. Wybrany folder dzialal
  // do pierwszego przeladowania strony i cicho znikal. Zmienna lokalna
  // nazywala sie do tego "st", przeslaniajac globalny stan meczu.
  async function zapamietajFolder(h) {
    try {
      const o = await bazaUchwytu("readwrite");
      o.st.put(h, "folder");
      const dobrze = await domknij(o);
      if (!dobrze) zaloguj("nie udało się zapamiętać folderu (transakcja)");
      return dobrze;
    } catch (e) {
      zaloguj("nie udało się zapamiętać folderu: " + (e && e.name));
      return false;
    }
  }

  async function odczytajFolder() {
    try {
      const o = await bazaUchwytu("readonly");
      const r = o.st.get("folder");
      const v = await new Promise(ok => {
        r.onsuccess = () => ok(r.result || null);
        r.onerror = () => ok(null);
      });
      await domknij(o);
      return v;
    } catch (e) { return null; }
  }

  async function wybierzFolder() {
    if (!window.showDirectoryPicker)
      return toast("przeglądarka nie pozwala wybrać folderu");
    try {
      const h = await window.showDirectoryPicker({ mode: "readwrite" });
      uchwytFolderu = h;
      cal.powFolder = true; save();
      const zapamietany = await zapamietajFolder(h);
      // 4.22: komunikaty rozlaczne. W 4.21 bezwarunkowy toast o sukcesie
      // natychmiast nadpisywal informacje o nieudanym zapamietaniu.
      toast(t(zapamietany?'Wybrano folder: {nazwa}':'Wybrano folder: {nazwa}. Po odświeżeniu strony wybierz go ponownie.',{nazwa:uchwytFolderu.name}));
      odswiezFolder();
    } catch (e) {
      if (e.name === "AbortError") return;
      toast(t('Nie można zapisać w tym folderze. Wybierz własny folder, np. Autodarts w Dokumentach.'));
      zaloguj("wybór folderu odrzucony: " + e.name);
    }
  }

  async function folderGotowy() {
    if (!cal.powFolder) return null;
    if (!uchwytFolderu) uchwytFolderu = await odczytajFolder();
    if (!uchwytFolderu) return null;
    try {
      const opt = { mode: "readwrite" };
      let p = await uchwytFolderu.queryPermission(opt);
      if (p !== "granted") p = await uchwytFolderu.requestPermission(opt);
      return p === "granted" ? uchwytFolderu : null;
    } catch (e) { return null; }
  }

  // WebM VP8/VP9, pojedyncza ścieżka obrazu. Praca poza wątkiem strony.
  // Format elementów: https://www.matroska.org/technical/elements.html
  function buforWebMWorker() {
    let pending=new Uint8Array(0), header=null, tracks=null, frames=[];
    let videoWidth=0,videoHeight=0,totalFrames=0;
    let scale=1000000, cluster=0, bytes=0, windowSec=40, fps=30, serial=Promise.resolve();
    const MAX=96*1048576;
    function vint(a,p,id=false) {
      if(p>=a.length) return null;
      let n=1,mask=128; while(n<=8 && !(a[p]&mask)){mask>>=1;n++;}
      if(n>8) throw Error('Błędny nagłówek WebM');
      if(p+n>a.length) return null;
      let v=id?a[p]:(a[p]&(mask-1)), unknown=!id && v===mask-1;
      for(let i=1;i<n;i++){v=v*256+a[p+i];unknown=unknown && a[p+i]===255;}
      return {v,n,unknown};
    }
    function elem(a,p){const id=vint(a,p,true);if(!id)return null;const sz=vint(a,p+id.n);if(!sz)return null;
      return {id:id.v,p:p+id.n+sz.n,end:sz.unknown?Infinity:p+id.n+sz.n+sz.v};}
    function uint(a,p,end){let n=0;for(;p<end;p++)n=n*256+a[p];return n;}
    function children(a,p,end,f){while(p<end){const e=elem(a,p);if(!e||e.end>end)throw Error('Niepełne metadane WebM');f(e);p=e.end;}}
    function trim(){
      if(!frames.length)return;
      const cutoff=frames[frames.length-1].t-windowSec*1000;
      let keep=0;for(let i=0;i<frames.length;i++)if(frames[i].key&&frames[i].t<=cutoff)keep=i;
      if(keep){for(const f of frames.splice(0,keep))bytes-=f.data.length;}
      while(bytes>MAX && frames.length){const next=frames.findIndex((f,i)=>i>0&&f.key);
        if(next<0)throw Error('Brak klatki kluczowej; limit pamięci bufora');
        for(const f of frames.splice(0,next))bytes-=f.data.length;
      }
    }
    function parse(a){let p=0;
      while(p<a.length){const e=elem(a,p);if(!e)break;
        if(e.id===0x18538067){p=e.p;continue;}
        if(e.id===0x1f43b675){cluster=0;p=e.p;continue;}
        if(e.end>a.length)break;
        if(e.id===0x1a45dfa3)header=a.slice(p,e.end);
        else if(e.id===0x1549a966)children(a,e.p,e.end,x=>{if(x.id===0x2ad7b1)scale=uint(a,x.p,x.end);});
        else if(e.id===0x1654ae6b){let count=0;
          children(a,e.p,e.end,x=>{if(x.id!==0xae)return;count++;let type=0,codec='',track=0;
            children(a,x.p,x.end,y=>{if(y.id===0x83)type=uint(a,y.p,y.end);if(y.id===0xd7)track=uint(a,y.p,y.end);
              if(y.id===0xe0)children(a,y.p,y.end,z=>{if(z.id===0xb0)videoWidth=uint(a,z.p,z.end);if(z.id===0xba)videoHeight=uint(a,z.p,z.end);});
              if(y.id===0x86)codec=String.fromCharCode(...a.slice(y.p,y.end));});
            if(type!==1||track!==1||!['V_VP8','V_VP9'].includes(codec))throw Error('Bufor wymaga jednej ścieżki VP8/VP9');});
          if(count!==1)throw Error('Nieobsługiwane ścieżki');tracks=a.slice(p,e.end);
        } else if(e.id===0xe7)cluster=uint(a,e.p,e.end);
        else if(e.id===0xa0)throw Error('Nieobsługiwany BlockGroup — wybierz WebM VP8');
        else if(e.id===0xa3){
          const tr=vint(a,e.p);if(!tr||tr.v!==1||e.end-e.p<tr.n+3)throw Error('Błędna klatka');
          const q=e.p+tr.n;let rel=a[q]*256+a[q+1];if(rel>=32768)rel-=65536;
          const flags=a[q+2];if(flags&6)throw Error('Nieobsługiwane łączenie klatek');
          const t=(cluster+rel)*scale/1000000;
          if(!Number.isFinite(t)||t<0 || (frames.length&&t<frames[frames.length-1].t))throw Error('Niespójny czas klatek');
          const data=a.slice(e.p,e.end);data[tr.n]=data[tr.n+1]=0;
          totalFrames++;frames.push({data,t,key:!!(flags&128)});bytes+=data.length;trim();
        }
        p=e.end;
      }
      return a.slice(p);
    }
    function raw(n){const a=[];do{a.unshift(n%256);n=Math.floor(n/256);}while(n);return new Uint8Array(a);}
    function size(n){for(let k=1;k<=7;k++)if(n<2**(7*k)-1){const a=new Uint8Array(k);let v=n;for(let i=k-1;i>=0;i--){a[i]=v%256;v=Math.floor(v/256);}a[0]|=1<<(8-k);return a;}throw Error('Za duży plik');}
    function tag(id,body){return new Blob([raw(id),size(body.size??body.length),body]);}
    function num(id,n){return tag(id,raw(n));}
    function snapshot(seconds){
      if(!header||!tracks||!frames.length)throw Error('Zbieram materiał');
      const last=frames[frames.length-1].t,cut=last-seconds*1000;
      let first=frames.findIndex(f=>f.key);if(first<0)throw Error('Czekam na klatkę kluczową');
      for(let i=first;i<frames.length;i++)if(frames[i].key&&frames[i].t<=cut)first=i;
      const selected=frames.slice(first),base=selected[0].t;
      const duration=(last-base+1000/fps)/1000;
      if(selected.length<3||duration<0.5)throw Error('Za mało klatek do powtórki');
      const d=new Uint8Array(8);new DataView(d.buffer).setFloat64(0,duration*1000);
      const info=tag(0x1549a966,new Blob([num(0x2ad7b1,1000000),tag(0x4489,d)]));
      let pos=info.size+tracks.length;const chunks=[],cues=[];
      for(const f of selected){const t=Math.round(f.t-base);
        const cl=tag(0x1f43b675,new Blob([num(0xe7,t),tag(0xa3,f.data)]));
        if(f.key)cues.push(tag(0xbb,new Blob([num(0xb3,t),tag(0xb7,new Blob([num(0xf7,1),num(0xf1,pos)]))])));
        chunks.push(cl);pos+=cl.size;
      }
      const blob=new Blob([header,raw(0x18538067),new Uint8Array([1,255,255,255,255,255,255,255]),info,tracks,...chunks,tag(0x1c53bb6b,new Blob(cues))],{type:'video/webm'});
      return {blob,duration,frames:selected.length};
    }
    self.onmessage=e=>{serial=serial.then(async()=>{
      const m=e.data;
      if(m.type==='config'){windowSec=Math.max(15,Math.min(90,m.seconds||40));trim();return;}
      if(m.type==='init'){windowSec=Math.max(15,Math.min(90,m.seconds||40));fps=Math.max(1,Math.min(120,m.fps||30));return;}
      if(m.type==='data'){
        const a=new Uint8Array(await m.blob.arrayBuffer());if(pending.length+a.length>MAX)throw Error('Limit danych WebM');
        const all=new Uint8Array(pending.length+a.length);all.set(pending);all.set(a,pending.length);pending=parse(all);
        self.postMessage({type:'stats',videoWidth,videoHeight,totalFrames,consumed:m.blob.size,bytes,seconds:frames.length?(frames[frames.length-1].t-frames[0].t)/1000:0,frames:frames.length});
      }
      if(m.type==='snapshot'){
        try{self.postMessage({type:'snapshot',id:m.id,...snapshot(m.seconds)});}
        catch(e){self.postMessage({type:'snapshot',id:m.id,error:e.message});}
      }
    }).catch(e=>{self.postMessage({type:'error',error:e.message});});};
  }
  let buforWorker=null, buforWorkerUrl=null, buforSekundy=0, buforKlatki=0;
  let buforWKolejce=0, buforLimit=40;
  let buforZadanie=0, buforOczekujace=new Map(), danePliku=new WeakMap(), trybyPlikow=new WeakMap();
  let nagranieWymiary='brak danych';
  let bladBufora='', buforTryb='pełny plik', buforOstatnieDane=0;
  function wyczyscBuforWorker() {
    if(mp4Sesja){mp4Sesja.close();mp4Sesja=null;}
    if(buforWorker)buforWorker.terminate();buforWorker=null;
    if(buforWorkerUrl)URL.revokeObjectURL(buforWorkerUrl);buforWorkerUrl=null;
    for(const p of buforOczekujace.values()){clearTimeout(p.timer);p.done(null);}
    buforOczekujace.clear();nagranieWymiary='brak danych';buforSekundy=buforKlatki=buforWKolejce=0;
  }
  function uruchomBuforWorker(gen, typ) {
    if(!window.Worker || !/webm/i.test(typ) || /av1/i.test(typ))return false;
    try {
      buforWorkerUrl=URL.createObjectURL(new Blob(['('+buforWebMWorker.toString()+')()'],{type:'text/javascript'}));
      const w=new Worker(buforWorkerUrl);buforWorker=w;
      buforTryb='ciągły WebM';bladBufora='';buforOstatnieDane=Date.now();
      const fail=message=>{if(gen!==recGen)return;bladBufora=message;
        zaloguj('bufor: '+message);toast(t('Nagrywanie przerwane. Połącz kamerę ponownie.'));
        nagrywanieNajwczesniej=Date.now()+10000;stopRecorder('błąd bufora — ponowienie za 10 s');};
      w.onerror=()=>fail('nie udało się uruchomić bufora');
      w.onmessage=e=>{if(gen!==recGen)return;const m=e.data;
        if(m.type==='stats'){torZakodowane=m.totalFrames||0;if(m.videoWidth&&m.videoHeight){const dim=m.videoWidth+'x'+m.videoHeight;if(dim!==nagranieWymiary){nagranieWymiary=dim;zaloguj('WebM: zakodowany obraz '+dim+'; kamera '+video.videoWidth+'x'+video.videoHeight);}}buforWKolejce=Math.max(0,buforWKolejce-(m.consumed||0));bajtyBufora=m.bytes;buforSekundy=m.seconds;buforKlatki=m.frames;buforOstatnieDane=Date.now();}
        if(m.type==='error')fail(m.error);
        if(m.type==='snapshot'){const p=buforOczekujace.get(m.id);if(!p)return;
          buforOczekujace.delete(m.id);clearTimeout(p.timer);
          if(m.blob){danePliku.set(m.blob,{duration:m.duration,frames:m.frames});
            zaloguj(`bufor ciągły: film ${m.duration.toFixed(3)}s, ${m.frames} klatek`);}
          else {zaloguj('powtórka: '+m.error);toast(t('Nie udało się przygotować powtórki. Spróbuj ponownie.'));}
          p.done(m.blob||null);
        }
      };
      const g=video.srcObject.getVideoTracks()[0].getSettings();
      buforLimit=cal.powBuforSek;w.postMessage({type:'init',seconds:buforLimit,fps:g.frameRate||30});return true;
    } catch(e){wyczyscBuforWorker();buforTryb='pełny plik';zaloguj('bufor ciągły niedostępny: '+e.name);return false;}
  }
  function pobierzCiaglyBufor(done) {
    const w=buforWorker, r=rec, gen=recGen;
    if(!w||!r||r.state!=='recording')return done(null);
    const id=++buforZadanie;
    let sent=false,flushTimer,finished=false;
    const send=()=>{if(sent)return;sent=true;clearTimeout(flushTimer);r.removeEventListener('dataavailable',send);
      if(gen!==recGen||w!==buforWorker)return;
      w.postMessage({type:'snapshot',id,seconds:inReplay?dlugoscUjecia:cal.powRecznaSek});};
    const finish=blob=>{if(finished)return;finished=true;clearTimeout(flushTimer);r.removeEventListener('dataavailable',send);done(blob);};
    const timer=setTimeout(()=>{buforOczekujace.delete(id);zaloguj('bufor: limit przygotowania 5 s');finish(null);},5000);
    buforOczekujace.set(id,{timer,done:finish});
    r.addEventListener('dataavailable',send,{once:true});
    const noFlush=()=>{buforOczekujace.delete(id);clearTimeout(timer);zaloguj('bufor: brak potwierdzenia świeżych danych');toast('Kamera nie przekazała świeżego materiału — spróbuj ponownie');finish(null);};
    flushTimer=setTimeout(noFlush,2500);
    try{r.requestData();}catch(e){noFlush();}
  }
  // Cały zakończony zapis, łącznie z ostatnim dataavailable przed stop.
  // Nie sklejamy plików z różnych instancji MediaRecorder.
  // https://www.w3.org/TR/mediastream-recording/#data-handling
  function zamknijNagranie(gotowe, powod) {
    if (zamykanieNagrania || !rec || rec.state !== "recording") {
      if (gotowe) gotowe(null);
      return;
    }
    const r = rec, gen = recGen, moje = chunks, od = performance.now();
    let zakonczone = false, timer;
    bufowanie = true;
    recStan = "zamykam nagranie";
    const sprzataj = () => {
      clearTimeout(timer);
      r.removeEventListener("stop", poStop);
      r.removeEventListener("error", poBledzie);
    };
    const oddaj = (ok, przyczyna) => {
      if (zakonczone) return;
      zakonczone = true; sprzataj();
      const aktualne = rec === r && recGen === gen;
      const blob = ok && aktualne && moje.length
        ? new Blob(moje.slice(), {type: r.mimeType || moje[0].type || "video/webm"}) : null;
      zamykanieNagrania = null; bufowanie = false;
      if (aktualne) {
        r.ondataavailable = null; r.onstop = null; r.onerror = null;
        recCzynne.delete(r); rec = null; recGen++;zwolnijTor();
        chunks = []; bajtyBufora = 0; recStart = 0;
        zwolnijStopniowo(moje);
        recStan = "przerwa przed nagrywaniem";
        // Nie uruchamiamy nowego kodera w obsłudze zamykania starego.
        nagrywanieNajwczesniej = Date.now() + 250;
        const nastepnaGen = recGen;
        setTimeout(() => {
          if (recGen === nastepnaGen && !rec && cal.powWl) startRecorder();
        }, 250);
      }
      zaloguj(`nagranie ${powod}: ${przyczyna}, zamknięcie ${Math.round(performance.now()-od)} ms, ` +
        `${blob ? (blob.size/1048576).toFixed(2) : "0"} MB`);
      if (gotowe) gotowe(blob);
    };
    const poStop = () => oddaj(true, "gotowe");
    const poBledzie = () => oddaj(false, "błąd kodera");
    zamykanieNagrania = () => oddaj(false, "anulowane");
    r.addEventListener("stop", poStop);
    r.addEventListener("error", poBledzie);
    timer = setTimeout(() => oddaj(false, "limit 6 s"), 6000);
    try { r.stop(); } catch (e) { oddaj(false, e.name); }
  }

  let anulujMigawke=null;
  function pobierzBufor(gotowe) {
    if(rec?.mp4)return pobierzMp4(gotowe);
    if (buforWorker) return pobierzCiaglyBufor(gotowe);
    const powod=anulujMigawke?'inna migawka w toku':!rec?'brak rejestratora':rec.state!=='recording'?'rejestrator nie nagrywa':!/webm/i.test(rec.mimeType)?'format inny niż WebM':'';
    if(powod){zaloguj('migawka: odmowa — '+powod);return gotowe(null);}
    const r=rec,gen=recGen;let ended=false,timer;
    bufowanie=true;
    const finish=blob=>{
      if(ended)return;ended=true;clearTimeout(timer);
      r.removeEventListener('dataavailable',fresh);r.removeEventListener('error',fail);
      anulujMigawke=null;bufowanie=false;gotowe(blob);
    };
    const fail=()=>finish(null);
    const fresh=()=>{
      // Main ondataavailable handler has appended this recorder's new chunk.
      queueMicrotask(()=>{
        if(gen!==recGen||rec!==r)return finish(null);
        finish(chunks.length?new Blob(chunks.slice(),{type:r.mimeType}):null);
      });
    };
    anulujMigawke=fail;
    r.addEventListener('dataavailable',fresh,{once:true});r.addEventListener('error',fail);
    timer=setTimeout(fail,3000);
    try{r.requestData();}catch(e){fail();}
  }

  // Eksperyment do hipotezy z raportu 4.17. Zator po odswiezeniu bufora
  // zaczynal sie 150-300 ms PO restarcie, a same wywolania stop i start
  // trwaly 3-23 ms. Najlepiej pasowalo zwolnienie kilkudziesieciu megabajtow
  // blobow jednym ruchem. Oddajemy je porcjami. Jesli zator zniknie -
  // hipoteza potwierdzona; jesli zostanie - wykluczona i szukamy dalej.
  function zwolnijStopniowo(tab) {
    if (tab && tab.length) doZwolnienia.push(tab);
  }
  function opozniaczZwalniania() {
    const t = doZwolnienia[0];
    if (!t) return;
    t.splice(0, 5);
    if (!t.length) doZwolnienia.shift();
  }

  // 4.18: zatrzymanie jest jawna operacja. Wczesniej zmiana formatu wolala
  // sam startRecorder, nie zatrzymujac poprzedniego rejestratora - oba
  // pisaly do tej samej tablicy chunks, wiec do nowego kontenera trafialy
  // fragmenty zakodowane starym kodekiem.

  // Bounded canvas stream ensures MediaRecorder receives actual 720p pixels,
  // independently of native camera track scaling performed by Chrome.
  let torNagrania=null, torCanvas=null, torGen=0, torTimer=null, torCallback=null;
  let torReader=null, torKlon=null;
  // Kolejka klatek czytnika. Domyslna glebokosc MediaStreamTrackProcessor to 1:
  // jesli watek glowny nie wroci po klatke przed nadejsciem nastepnej, ta
  // nastepna przepada u zrodla. Sesja 4.37 pokazala dokladnie to - czytnik
  // dostawal polowe tego, co dawala kamera, w scislym zwiazku z tempem
  // renderowania strony. Kilka miejsc w kolejce pozwala nadrobic zaciecie.
  const BUFOR_KLATEK = 6;
  let torKlatki=0, ostatniaPowtorka=null, pozaMeczemOd=0;
  let torZakodowane=0, torPomiar=null, torRaport='brak próbek';
  function jakoscObrazu(){
    try{ return typeof video!=='undefined'&&video&&video.getVideoPlaybackQuality?video.getVideoPlaybackQuality():null; }
    catch(e){ return null; }
  }
  function ustawieniaTracku(){
    try{ const t=typeof video!=='undefined'&&video&&video.srcObject&&video.srcObject.getVideoTracks?video.srcObject.getVideoTracks()[0]:null;
      return t&&t.getSettings?t.getSettings():null; }
    catch(e){ return null; }
  }
  function raportujTor(){
    const p=torPomiar;if(!p)return;
    const now=performance.now(),dt=(now-p.od)/1000;if(dt<5)return;
    // 4.36: do 4.35 raport mowil tylko ILE klatek dostalismy - a to jest
    // skutek, nie przyczyna. Trzy pola rozdzielaja trzech podejrzanych:
    //   dekoder      przyrost totalVideoFrames elementu wideo. 30/s przy
    //                callback 6/s => klatki sa, ale nie sa wystawiane do
    //                kompozycji (strona). 6/s => tyle przyszlo z kamery.
    //   ukrytyObraz  ile procent okna pomiaru zywy obraz mial display:none.
    //                Dokladnie to robi ten skrypt przy powtorce i oknie
    //                Autodarts, wiec musi byc widoczne obok spadku.
    //   ekspozycja   czas naswietlania tracku. Tryb continuous wydluza go
    //                w slabym swietle i to obniza fps juz u zrodla.
    const q=jakoscObrazu(), ust=ustawieniaTracku();
    const dek=q&&Number.isFinite(p.total)?((q.totalVideoFrames-p.total)/dt).toFixed(1):'?';
    const odrz=q&&Number.isFinite(p.dropped)?((q.droppedVideoFrames-p.dropped)/dt).toFixed(1):'?';
    torRaport=`okno=${dt.toFixed(1)}s callback=${(p.cb/dt).toFixed(1)}/s `+
      `canvas=${(p.draw/dt).toFixed(1)}/s request=${(p.req/dt).toFixed(1)}/s `+
      `WebM=${buforWorker?((torZakodowane-p.encoded)/dt).toFixed(1):'?'} /s `+
      `dekoder=${dek}/s odrzucone=${odrz}/s ukrytyObraz=${p.probki?Math.round(100*p.ukryte/p.probki):0}% `+
      `lukiZrodla=${p.zrodloLuki} maxPrzerwa=${p.maxPrzerwa.toFixed(0)}ms seria=${p.draw?Math.round(100*p.seria/p.draw):0}% `+
      `kamera=${ust&&Number.isFinite(ust.frameRate)?Math.round(ust.frameRate)+'fps':'?'} `+
      `ekspozycja=${ust&&Number.isFinite(ust.exposureTime)?ust.exposureTime:'?'} `+
      `pominięteLimit=${p.skip} brakObrazu=${p.empty} resetZegara=${p.resets} lukiPresented=${p.gaps} `+
      `kopiowanieŚr=${(p.ms/Math.max(1,p.draw)).toFixed(2)}ms max=${p.max.toFixed(2)}ms `+
      `tryb=${p.mode} replay=${inReplay?'tak':'nie'} widok=${document.visibilityState}`;
    zaloguj('tor FPS: '+torRaport);
    Object.assign(p,{od:now,cb:0,draw:0,req:0,skip:0,empty:0,resets:0,gaps:0,ms:0,max:0,encoded:torZakodowane,
      total:q?q.totalVideoFrames:null,dropped:q?q.droppedVideoFrames:null,probki:0,ukryte:0,
      zrodloLuki:0,maxPrzerwa:0,seria:0,ostTs:null,ostNow:null});
  }
  function zwolnijTor(){
    raportujTor();torPomiar=null;
    torGen++;if(torTimer!==null)clearTimeout(torTimer);torTimer=null;
    if(torCallback!==null&&video?.cancelVideoFrameCallback)video.cancelVideoFrameCallback(torCallback);torCallback=null;
    if(torReader){try{torReader.cancel();}catch(e){}torReader=null;}
    if(torKlon){try{torKlon.stop();}catch(e){}torKlon=null;}
    if(torNagrania)torNagrania.getTracks().forEach(t=>t.stop());torNagrania=null;torCanvas=null;
  }
  function strumienNagrania(){
    if(!video.videoWidth||!video.videoHeight)throw Error('Kamera nie ma jeszcze obrazu');
    const c=document.createElement('canvas');
    c.width=Math.min(1280,cal.maxSzer,video.videoWidth);c.width-=c.width%2;
    c.height=Math.max(2,Math.round(c.width*video.videoHeight/video.videoWidth/2)*2);
    if(!c.captureStream)throw Error('Brak obsługi nagrywania canvas');
    const ctx=c.getContext('2d',{alpha:false});if(!ctx)throw Error('Brak kontekstu obrazu');
    // One clock: request capture immediately after copying a camera frame.
    // requestFrame requests capture; it does NOT confirm an encoded frame.
    let stream=c.captureStream(0);torNagrania=stream;
    let track=stream.getVideoTracks()[0];
    const manual=typeof track?.requestFrame==='function';
    if(!manual){stream.getTracks().forEach(t=>t.stop());stream=c.captureStream(30);torNagrania=stream;track=stream.getVideoTracks()[0];}
    torCanvas=c;torKlatki=0;torZakodowane=0;torRaport='czekam na próbkę 5 s';
    const q0=jakoscObrazu();
    torPomiar={od:performance.now(),cb:0,draw:0,req:0,skip:0,empty:0,resets:0,gaps:0,ms:0,max:0,encoded:0,
      total:q0?q0.totalVideoFrames:null,dropped:q0?q0.droppedVideoFrames:null,probki:0,ukryte:0,
      zrodloLuki:0,maxPrzerwa:0,seria:0,ostTs:null,ostNow:null,
      krokTs:1000/((ustawieniaTracku()||{}).frameRate||30),
      mode:(manual?'requestFrame':'captureStream30')+(video.requestVideoFrameCallback?'/rVFC':'/timer')};
    const gen=++torGen;let next=-Infinity, clockKind=null, previousClock=null;
    let lastPresented=null;
    const draw=(now,meta,klatka)=>{
      if(gen!==torGen)return;
      const p=torPomiar;p.cb++;
      if(Number.isFinite(meta?.presentedFrames)){
        if(lastPresented!==null&&meta.presentedFrames>lastPresented)p.gaps+=Math.max(0,meta.presentedFrames-lastPresented-1);
        lastPresented=meta.presentedFrames;
      }
      // Media clock avoids compositor callback jitter. Carry the deadline,
      // rather than resetting it after every frame (which can halve 30 fps).
      const kind=Number.isFinite(meta?.mediaTime)?'media':'wall';
      const clock=kind==='media'?meta.mediaTime*1000:now;
      if(kind!==clockKind || (previousClock!==null && clock<previousClock)){
        if(clockKind!==null)p.resets++;
        next=-Infinity;clockKind=kind;
      }
      previousClock=clock;
      // Trzy pomiary rozdzielaja "kamera nie dala" od "nie zdazylismy odebrac":
      //   lukiZrodla  klatki zgubione miedzy kamera a czytnikiem, liczone z
      //               odstepow znacznikow czasu samych klatek - jedyne miejsce,
      //               w ktorym widac strate w kolejce zrodla;
      //   maxPrzerwa  najdluzsza przerwa miedzy odbiorami, czyli zaciecie watku;
      //   seria       ile odbiorow przyszlo seriami ponizej 10 ms - jesli
      //               kolejka zaczyna oddawac klatki paczkami, znaczniki czasu
      //               w WebM moga sie zageszczac i powtorka bedzie szarpac.
      if(klatka&&Number.isFinite(klatka.timestamp)){
        if(p.ostTs!==null&&p.krokTs>0){
          const dtMs=(klatka.timestamp-p.ostTs)/1000;
          if(dtMs>0)p.zrodloLuki+=Math.max(0,Math.round(dtMs/p.krokTs)-1);
        }
        p.ostTs=klatka.timestamp;
      }
      if(p.ostNow!==null){
        const przerwa=now-p.ostNow;
        if(przerwa>p.maxPrzerwa)p.maxPrzerwa=przerwa;
        if(przerwa<10)p.seria++;
      }
      p.ostNow=now;
      if(!klatka&&video.readyState<2)p.empty++;
      else if(clock+2<next)p.skip++;
      else {
        const t=performance.now();
        try {
          ctx.drawImage(klatka||video,0,0,c.width,c.height);
          if(manual){track.requestFrame();p.req++;}
        } catch(e){
          zaloguj('tor canvas: błąd '+e.name);nagrywanieNajwczesniej=Date.now()+5000;
          stopRecorder('błąd kopiowania obrazu');return;
        }
        const cost=performance.now()-t;p.ms+=cost;p.max=Math.max(p.max,cost);p.draw++;torKlatki++;
        next=!Number.isFinite(next)||clock-next>100?clock+1000/30:next+1000/30;
      }
    };
    const callback=(now,meta)=>{
      if(gen!==torGen)return;
      torCallback=video.requestVideoFrameCallback(callback);
      draw(now,meta);
    };
    const timer=()=>{
      if(gen!==torGen)return;
      draw(performance.now());
      if(gen===torGen)torTimer=setTimeout(timer,1000/30);
    };
    // 4.36: zegar klatek nie moze zalezec od SKLADANIA elementu wideo.
    // requestVideoFrameCallback budzi sie wylacznie wtedy, gdy przegladarka
    // wystawia klatke do kompozycji. Skrypt sam ustawia display:none na
    // zywym obrazie na czas powtorki i na calym wrap przy oknie Autodarts,
    // w pauzie, poza meczem i w kreatorze. Ukryty element nie jest skladany,
    // wiec ciagly bufor gasl dokladnie w tych chwilach, dla ktorych istnieje.
    // MediaStreamTrackProcessor czyta klatki z samego zrodla. Track klonujemy,
    // zeby podglad, kalibracja i geometria pozostaly nietkniete.
    const zrodloTracku=video.srcObject&&video.srcObject.getVideoTracks?video.srcObject.getVideoTracks()[0]:null;
    const wroc=()=>{ if(gen!==torGen)return;
      if(video.requestVideoFrameCallback)torCallback=video.requestVideoFrameCallback(callback); else timer(); };
    const czytajZeZrodla=()=>{
      let klon=null;
      try{ klon=zrodloTracku.clone(); }catch(e){ return false; }
      let proc=null;
      try{ proc=new window.MediaStreamTrackProcessor({track:klon,maxBufferSize:BUFOR_KLATEK}); }
      catch(e){ try{klon.stop();}catch(_){} return false; }
      torKlon=klon;
      const reader=proc.readable.getReader();torReader=reader;
      (async()=>{
        try{
          for(;;){
            const r=await reader.read();
            if(r.done)break;
            const klatka=r.value;
            if(gen!==torGen){try{klatka.close();}catch(e){}break;}
            try{ draw(performance.now(),{mediaTime:klatka.timestamp/1e6},klatka); }
            finally{ try{klatka.close();}catch(e){} }
          }
        }catch(e){
          if(gen!==torGen)return;
          zaloguj('tor klatek: '+(e&&e.name?e.name:'błąd')+' — wracam do rVFC');
          torReader=null;wroc();
        }
      })();
      return true;
    };
    let zeZrodla=false;
    if(zrodloTracku&&typeof window.MediaStreamTrackProcessor==='function')zeZrodla=czytajZeZrodla();
    if(zeZrodla)torPomiar.mode=(manual?'requestFrame':'captureStream30')+'/track';
    else wroc();
    zaloguj('tor nagrania canvas: '+c.width+'x'+c.height+'; cel 30 kl./s; '+torPomiar.mode);
    return stream;
  }

  function stopRecorder(powod) {
    if(anulujMigawke)anulujMigawke();
    zwolnijTor();
    recGen++;
    wyczyscBuforWorker();
    if (zamykanieNagrania) zamykanieNagrania();
    const stary = rec;
    rec = null;
    if (stary) {
      try {
        stary.ondataavailable = null; stary.onstop = null; stary.onerror = null;
        if (stary.state !== "inactive") stary.stop();
      } catch (e) {}
      recCzynne.delete(stary);
    }
    if (!bufowanie) { zwolnijStopniowo(chunks); chunks = []; }
    bajtyBufora = 0; recStart = 0;
    recStan = powod || "zatrzymane";
    replayState = recStan;
  }

  function startRecorder() {
    bladBufora="";
    if(!wMeczu()){recStan="czekam na mecz";return;}
    if (zamykanieNagrania || Date.now() < nagrywanieNajwczesniej) return;
    if (!cal.powWl) { recStan = "wyłączone"; replayState = "wyłączone"; return; }
    if (!video.srcObject) { recStan = replayState = "czekam na kamerę"; return; }
    const mode=trybZapisu();
    if(mode==='mp4'&&mp4Fallback){bladBufora=mp4Fallback;recStan=replayState='MP4 niedostępny';return;}
    if (rec) stopRecorder("wymiana");
    const gen = ++recGen;
    if(mode!=='webm'&&!mp4Fallback)return uruchomMp4(gen);
    if (!window.MediaRecorder) { recStan = replayState = "brak MediaRecorder"; return; }
    try {
      const opt = { videoBitsPerSecond: cal.powBitrate * 1000000 };
      const m = mime(); if (m) opt.mimeType = m;
      chunks = []; bajtyBufora = 0;
      const r = new window.MediaRecorder(strumienNagrania(), opt);
      buforTryb="pełny plik";uruchomBuforWorker(gen, r.mimeType || m || "");
      r.ondataavailable = e => {
        if (gen !== recGen) return;        // fragment z poprzedniego nagrania
        if (!e.data || !e.data.size) return;
        if (buforWorker) {
          buforWKolejce+=e.data.size;
          if(buforWKolejce>32*1048576){nagrywanieNajwczesniej=Date.now()+10000;bladBufora='Bufor nie nadąża';stopRecorder(bladBufora);toast(bladBufora);return;}
          buforWorker.postMessage({type:'data',blob:e.data});
          // Wyłącznie licznik fragmentów w diagnostyce, bez trzymania starych blobów na stronie.
          chunks.push({size:0}); if(chunks.length>90)chunks.shift();
        } else { chunks.push(e.data); bajtyBufora += e.data.size; }
        if (czekamNaPierwszyFragment && odstepyPoRestarcie &&
            odstepyPoRestarcie.pierwszyFragment === null) {
          czekamNaPierwszyFragment = false;
          const t = performance.now();
          odstepyPoRestarcie.pierwszyFragment = Math.round(t - restartOd);
          odstepyPoRestarcie.odStartu = Math.round(t - startNowego);
        }
      };
      // Istnienie obiektu nie znaczy, ze nagranie dziala. Tor kamery moze
      // sie skonczyc, koder moze paść - bez tego wtyczka milczalaby
      // i pokazywala "nagrywa" przy martwym rejestratorze.
      r.onerror = ev => {
        if (gen !== recGen) return;
        zaloguj("rejestrator: błąd " +
          ((ev && ev.error && ev.error.name) || "nieznany"));
        // 4.21: zerowanie rec musi isc w parze ze sprzataniem zestawu
        // instancji i odpinaniem uchwytow, inaczej licznik czynnych
        // rejestratorow klamie po kazdym bledzie.
        try { r.ondataavailable = null; r.onstop = null; r.onerror = null;
              if (r.state !== "inactive") r.stop(); } catch (e) {}
        recCzynne.delete(r);recGen++;wyczyscBuforWorker();zwolnijTor();
        rec = null; recStan = replayState = "błąd nagrywania";
      };
      rec = r; recCzynne.add(r);
      startNowego = performance.now();
      if (odstepyPoRestarcie) czekamNaPierwszyFragment = true;
      fragmCzas = Date.now(); fragmPoprz = 0;
      r.start(1000);
      recStart = Date.now();
      recStan = replayState = "nagrywa";
    } catch (e) {
      zwolnijTor();
      recStan = replayState = "nagrywanie niedostępne";
      zaloguj("MediaRecorder: " + e.name + ": " + e.message);
      if (rec) recCzynne.delete(rec);
      rec = null;
    }
  }

  function cycleRecorder() {
    raportujTor();
    if(!wMeczu()){
      if(!pozaMeczemOd)pozaMeczemOd=Date.now();
      if(rec&&!inReplay&&Date.now()-pozaMeczemOd>=3000)stopRecorder('poza meczem — nagrywanie zatrzymane');
      return;
    }
    pozaMeczemOd=0;
    if (zamykanieNagrania) return;
    // 4.18: wylaczenie powtorek naprawde zatrzymuje nagrywanie, a wlaczenie
    // je odzyskuje. Wczesniej przelacznik zmienial samo ustawienie, a po
    // rotacji przy powWl=false rejestrator zostawal nieaktywnym obiektem,
    // ktorego nic juz nie wskrzeszalo.
    if (!cal.powWl) { if (rec) stopRecorder("wyłączone"); return; }
    if (!rec && camOk) { startRecorder(); return; }
    if (!rec) return;
    if (rec.mp4&&rec.state === "starting") return;
    if (rec.state !== "recording") { startRecorder(); return; }
    if (buforWorker) {
      if(buforLimit!==cal.powBuforSek){buforLimit=cal.powBuforSek;buforWorker.postMessage({type:'config',seconds:buforLimit});}
      return; // Worker usuwa stare klatki bez restartu kodera.
    }
    // Rotacja w trakcie powtorki jest bezpieczna: powtorka gra z wlasnej
    // migawki. Blokujemy ja tylko na czas skladania tej migawki. Wczesniej
    // rotacja stala przez cala powtorke, wiec petla albo dluga pauza
    // znosila ograniczenie dlugosci bufora bez zadnego limitu.
    if (bufowanie) return;
    const wiek = Date.now() - recStart;
    if (wiek < cal.powBuforSek * 1000) return;
    // Nie restartujemy bufora tuz przed lotka na zamkniecie, zeby
    // zwycieska lotka nie wypadla poza nagranie. Ale nie w nieskonczonosc -
    // przy dwukrotnosci ustawionej dlugosci odswiezamy mimo wszystko.
    // 4.22: warunek z NORMALIZOWANEGO stanu gry. routeLen i remaining
    // ustawia checkoutTarget, a ten chodzi tylko przez sciezke zoomu -
    // przy zoomWl=false byly nieaktualne i rotacja o 01:23 wypadla przy
    // D4, wyniku 8 i dwoch rzutach, mimo obietnicy odroczenia.
    const trasaTeraz = daneSwieze()
      ? (st.trasa ? st.trasa.length : 0) : routeLen;
    const zostTeraz = daneSwieze()
      ? (st.player !== null && st.gameScores[st.player] != null
          ? st.gameScores[st.player] : null)
      : remaining;
    if (trasaTeraz === 1 && zostTeraz !== null &&
        wiek < cal.powBuforSek * 2000) return;
    // 4.17: mierzymy koszt tej operacji. Raport z 4.16 pokazal trzy spadki
    // tempa rysowania do 1/s, kazdy w ciagu 1-3 s od tego miejsca, przy
    // js=1.1 ms - czyli blokada jest poza naszym kodem. Rozdzielamy
    // zamkniecie kontenera od budowy nowego kodera, zeby wiedziec, ktore
    // z dwojga kosztuje, zanim zaczniemy cokolwiek przebudowywac.
    zaloguj(`odświeżam bufor po ${(wiek / 1000).toFixed(0)}s ` +
      `(${chunks.length} fragm., ${cal.powBitrate} Mb/s)`);
    restartOd = performance.now();
    ostatniRestart = Date.now();
    // 4.22: pomiar "pierwszy fragment" nalezy do NOWEGO rejestratora.
    // Wczesniej struktura powstawala przed rec.stop(), wiec koncowy
    // dataavailable STAREGO rejestratora wypelnial ja natychmiast -
    // stad w dzienniku 40 ms i 4 ms, pokrywajace sie z czasem zamykania.
    czekamNaPierwszyFragment = false;
    odstepyPoRestarcie = { n: 0, suma: 0, max: 0, dlugie: 0, ponad100: 0,
                           przyklady: [], pierwszyFragment: null };
    zamknijNagranie(null, "rotacja");
  }

  // Zapis ostatnich chwil bez przerywania gry - dla sytuacji,
  // gdy nie chcesz nawet na moment tracic tarczy z oczu.
  function zapiszBezOdtwarzania() {
    if (!rec || rec.state !== "recording" || inReplay)
      return toast("nagrywanie niedostępne");
    toast("zapisuję ostatnie chwile...");
    pobierzBufor(blob => {
      if (blob && blob.size) zapiszPlik(blob, 0);
      else toast("pusty bufor");
    });
  }

  function probujPowtorke(tryb, zrodlo) {
    const z = zrodlo || "?";
    if (!cal.powWl) { zaloguj(`odmowa (${z}): powtórki wyłączone`);
      return toast("powtórki są wyłączone"); }
    if (!camOk) { zaloguj(`odmowa (${z}): brak kamery`);
      return toast("brak obrazu z kamery"); }
    if (!rec) { zaloguj(`odmowa (${z}): brak nagrywania`);
      startRecorder(); return toast("uruchamiam nagrywanie"); }
    if (rec.state !== "recording") { zaloguj(`odmowa (${z}): rec=${rec.state}`);
      return toast(t('Nagranie nie jest jeszcze gotowe. Spróbuj za chwilę.')); }
    if (inReplay) { zaloguj(`odmowa (${z}): powtórka już trwa`);
      return toast("powtórka już trwa"); }
    playReplay(tryb, z);
  }

  // tryb "auto" - po zamknieciu Lega, z pauza na animacje Autodarts
  // tryb "reczna" - na zadanie, dluzsze ujecie, bez czekania
  function playReplay(tryb, zrodlo) {
    if (!rec || rec.state !== "recording" || inReplay || kreator) return;
    trybPowtorki = tryb === "reczna" ? "reczna" : "auto";
    zrodloPowtorki = zrodlo || (trybPowtorki === "auto" ? "AUTOMAT" : "?");
    czasPowtorki = czasSesji();
    if (trybPowtorki === "reczna") heldTarget = null;
    // 4.19: powtorka dostaje wlasna, zamrozona migawke kontekstu. Stan
    // biezacej gry plynie dalej - kolejny Leg moze sie zaczac w trakcie
    // ogladania poprzedniego i nie wolno tych dwoch mieszac.
    const mojaSesja = ++sesjaPow;
    pauza = false; czekanieDo = 0; oknoPowOd = null; pauzaOdOkna = false;
    przerwijBiezaca = (powod) => {
      if (mojaSesja !== sesjaPow) return;      // to juz nie ta powtorka
      zaloguj("koniec powtórki: " + (powod || "przerwane"));
      endReplay();
    };
    // 4.20: checkout bierzemy z jednego zrodla i niezaleznie od tego, czy
    // zoom jest wlaczony. W 4.19 kontekst powtorki mial co0 przy zoomWl=false,
    // bo checkoutMax ustawial sie wylacznie w sciezce zoomu.
    const ck = checkoutKolejki();
    kontekstPow = {
      matchId: st.matchId, leg: st.leg, set: st.set, player: st.player,
      cel: heldTarget ? heldTarget.txt : null,
      checkout: trybPowtorki === "auto" && ck.pewny ? ck.wartosc : null,
      pewny: ck.pewny,
    };
    checkoutPowtorki = kontekstPow.checkout;
    dlugoscUjecia = trybPowtorki === "reczna" ? cal.powRecznaSek : cal.powSek;
    const opoznienie = trybPowtorki === "reczna" ? 0 : cal.powPauzaMs;

    schowajPytanie();
    inReplay = true;
    replayPhase = "pauza";
    replayState = trybPowtorki === "reczna"
      ? "przygotowuję..." : "czekam na animację...";
    // Czas trwania bufora znamy z zegara. To pewniejsze niz czytanie
    // duration z pliku - nagrania z MediaRecorder czesto go nie maja.
    powBufSek = buforWorker ? buforSekundy : Math.max(0.5, (Date.now() - recStart) / 1000);
    // 4.20: rotacja wyrzuca cala historie, wiec tuz po niej nie ma pelnych
    // zamowionych sekund. W dzienniku 4.19 R o 00:45 dostalo 3,9 s zamiast
    // 12 s, bo rotacja byla o 00:42. Mowimy o tym wprost zamiast po cichu
    // oddawac krotszy material.
    if (powBufSek + 0.3 < dlugoscUjecia) {
      zaloguj(`UWAGA: dostępne ${powBufSek.toFixed(1)}s z żądanych ` +
        `${dlugoscUjecia}s — bufor odświeżono ${powBufSek.toFixed(0)}s temu`);
      toast(t('Dostępne {a} s powtórki',{a:powBufSek.toFixed(1)}));
    }
    migawka(`▶ POWTÓRKA [${zrodloPowtorki}]`);
    zaloguj(`   ${trybPowtorki}: ` +
      `bufor ${powBufSek.toFixed(1)}s, ujęcie ${dlugoscUjecia}s, ` +
      `cel ${heldTarget ? heldTarget.txt : "brak"}`);

    // 4.25: odtwarzamy zakończony plik; nowy bufor zaczyna się od zera.
    // R w stopklatce nadal powtarza ten sam, zachowany materiał.
    // 4.22: spozniony wynik pobrania bufora nie moze wskrzesic zamknietej
    // powtorki ani podmienic materialu nowej. W 4.21 sesje sprawdzalo
    // dopiero startPlayback, a callback bufora i timer nie.
    const startPrzygotowania = Date.now();
    const ogon = trybPowtorki === 'auto' ? cal.powOgonMs : 0;
    // Keep the original pre-throw window as well as the new post-throw tail.
    dlugoscUjecia += ogon / 1000;
    const pobierz = () => {
      if(mojaSesja!==sesjaPow||!inReplay)return;
      pobierzBufor(blob => {
        if(mojaSesja!==sesjaPow||!inReplay)return;
        pendingBlob=blob;
        if(blob){trybyPlikow.set(blob,trybPowtorki);ostatniaPowtorka={blob,checkout:checkoutPowtorki};}
        zaloguj('końcówka powtórki: pobrano po '+(Date.now()-startPrzygotowania)+' ms od wyzwolenia');
        setTimeout(()=>{if(mojaSesja===sesjaPow)startPlayback();},Math.max(0,opoznienie-(Date.now()-startPrzygotowania)));
      });
    };
    if(ogon)setTimeout(pobierz,ogon);else pobierz();
  }

  function endReplay() {
    anulujAutotest();
    if (sprzatajPow) { const f = sprzatajPow; sprzatajPow = null; f(); }
    replayPhase = "off"; inReplay = false;
    oknoPowOd = null; pauzaOdOkna = false;
    if (pasekPow) pasekPow.style.display = "none";
    replayVideo.pause();
    heldTarget = null;
    zerujZoom(cal.zoomWyjazdMs, "ease");
    backdrop.style.opacity = "0";
    backdrop.style.pointerEvents = "none";
    // Uniewaznienie sesji na wyjsciu: kazdy pozniejszy callback odpadnie.
    sesjaPow++;
    przerwijBiezaca = null; pauza = false; czekanieDo = 0; odNowa = null;
    setTimeout(() => { if (replayPhase === "off") backdrop.style.display = "none"; }, 420);
    replayVideo.style.display = "none";
    video.style.display = "";
    replayVideo.removeAttribute("src");
    if (!rec || rec.state !== "recording") startRecorder();   // odzyskanie po błędzie
    else replayState = "nagrywa";
    // Zapis wylacznie na zadanie - w trakcie ogladania klawiszem S
    // albo przyciskiem na pasku. Nic nie ladzie samo na dysku.
    // 4.20: prog dziala wylacznie na PEWNYM checkoucie. Wczesniej wartosc
    // brala sie z maksimum historii albo z wyniku rywala i uruchamiala zapis
    // bez pokrycia - stad plik "co121" przy zamknieciu z 32.
    if (trybPowtorki === "auto" && cal.powAutoZapisProg > 0 && pendingBlob) {
      if (checkoutPowtorki === null) {
        zaloguj("autozapis pominięty: checkout nieznany — próg nie strzela " +
          "na domyśle");
      } else if (checkoutPowtorki >= cal.powAutoZapisProg) {
        zapiszPlik(pendingBlob, checkoutPowtorki);
        toast(t('Checkout {a} — zapisano',{a:checkoutPowtorki}));
      }
    }
    pendingBlob = null;
    kontekstPow = null;
    // Przy danych z WebSocketa checkout wynika z granicy kolejki i wyliczy
    // sie sam. Zerujemy tylko zapasowa sciezke z wygladu, zeby zakonczenie
    // starej powtorki nie skasowalo danych nowej kolejki.
    if (!daneSwieze()) { checkoutMax = 0; poprzRemaining = null; }
  }

  function startPlayback() {
    if (!inReplay) return;
    if (!pendingBlob || !pendingBlob.size) {
      replayState = "pusty bufor"; endReplay(); return;
    }
    const mojaSesja = sesjaPow;
    const zyje = () => inReplay && mojaSesja === sesjaPow;
    let url;
    try { url = URL.createObjectURL(pendingBlob); }
    catch (e) { zaloguj("powtórka: " + e.message); endReplay(); return; }
    zaloguj(`powtórka ${trybPowtorki}: ${(pendingBlob.size / 1048576).toFixed(1)} MB`);
    const timery = new Set(), interwaly = new Set(), sluchacze = [];
    let ruszylo = false, od = 0, ostatniCzas = -1, bezRuchuOd = Date.now();
    const pozniej = (f, ms) => {
      const id = setTimeout(() => { timery.delete(id); if (zyje()) f(); }, ms);
      timery.add(id);
    };
    const sluchaj = (n, f) => {
      const g = () => { if (zyje()) f(); };
      replayVideo.addEventListener(n, g); sluchacze.push([n, g]);
    };
    sprzatajPow = () => {
      for (const id of timery) clearTimeout(id);
      for (const id of interwaly) clearInterval(id);
      for (const [n, f] of sluchacze) replayVideo.removeEventListener(n, f);
      timery.clear(); interwaly.clear(); sluchacze.length = 0;
      URL.revokeObjectURL(url);
    };
    const koniec = powod => {
      if (!zyje()) return;
      zaloguj(`koniec powtórki: ${powod} [faza=${replayPhase} ` +
        `t=${replayVideo.currentTime.toFixed(2)}s ended=${replayVideo.ended ? "tak" : "nie"}]`);
      endReplay();
    };
    przerwijBiezaca = koniec;
    const odtwarzaj = () => {
      if (!zyje()) return;
      synchronizujOknoPowtorki();
      if (oknoAplikacji || pauzaOdOkna || pauza) return;
      bezRuchuOd = Date.now(); ostatniCzas = replayVideo.currentTime;
      replayVideo.play().catch(e => { if (zyje()) koniec("play: " + e.name); });
    };
    odNowa = () => {
      if (!zyje() || !ruszylo) return;
      replayPhase = "gra"; czekanieDo = 0; pauza = false;
      try { replayVideo.currentTime = od; } catch (e) {}
      zaloguj("powtórka: od nowa");
      odtwarzaj();
    };
    const osiagnietoKoniec = skad => {
      if (!zyje() || !ruszylo || replayPhase === "stopklatka") return;
      if (oknoAplikacji || pauzaOdOkna) return;
      if (cal.powPetla) { odNowa(); return; }
      replayVideo.pause(); pauza = true; replayPhase = "stopklatka";
      czekanieDo = cal.powPoKoniecSek > 0 ? Date.now() + cal.powPoKoniecSek * 1000 : 1;
      zaloguj(`powtórka: koniec materiału (${skad}), stopklatka ${cal.powPoKoniecSek}s`);
      if (czekanieDo === 1) koniec("do końca");
    };
    for (const n of ["waiting", "stalled", "seeking", "seeked"])
      sluchaj(n, () => zaloguj(`powtórka: ${n} przy ${replayVideo.currentTime.toFixed(2)}s`));
    sluchaj("ended", () => osiagnietoKoniec("ended"));
    sluchaj("error", () => {
      const mp4=/mp4/i.test(pendingBlob?.type||'');
      if(mp4){if(ostatniaPowtorka?.blob===pendingBlob)ostatniaPowtorka=null;pendingBlob=null;}
      koniec("błąd odtwarzania");
      if(mp4)mp4Sesja?.fail('przeglądarka nie odtworzyła pliku MP4');
    });

    const start = d => {
      if (!zyje() || ruszylo) return;
      const oczekiwane = Math.min(powBufSek, dlugoscUjecia);
      if (d < 0.5 || (oczekiwane >= 2 && d < oczekiwane * 0.5)) {
        zaloguj(`odrzucony film: ${d.toFixed(3)}s, oczekiwano około ${oczekiwane.toFixed(1)}s`);
        pendingBlob = null; // Nie zapisuj automatycznie wadliwej powtórki.
        toast("za mało materiału do powtórki — nagrywanie trwa dalej");
        koniec("niepełny materiał");
        return;
      }
      if (d + 0.3 < dlugoscUjecia) {
        zaloguj(`krótsza powtórka: ${d.toFixed(2)}s zamiast ${dlugoscUjecia}s`);
        toast(t('Dostępne {a} s powtórki',{a:d.toFixed(1)}));
      }
      ruszylo = true;
      const dl = d;
      powDlugosc = dlugoscPliku = dl;
      // Ujęcie i tempo wyrażone w sekundach filmu. Czas ścienny bufora
      // służy diagnostyce, nie zastępuje metadanych ani nie skaluje tempa.
      korektaCzasu = 1;
      od = Math.max(0, dl - dlugoscUjecia);
      zaloguj(`oś filmu: ${dl.toFixed(3)}s, zegar bufora ${powBufSek.toFixed(3)}s, ` +
        `ujęcie ${od.toFixed(3)}–${dl.toFixed(3)}s`);
      try { replayVideo.currentTime = od; } catch (e) {}
      // Jednorazowa korekta początkowego seek, nigdy po rozpoczęciu odtwarzania.
      let seekPoprawiony = false;
      const dociagnij = () => {
        if (seekPoprawiony || !zyje()) return;
        seekPoprawiony = true;
        if (replayVideo.paused && replayPhase === "gra" &&
            Math.abs(replayVideo.currentTime - od) > 1) {
          try { replayVideo.currentTime = od; } catch (e) {}
        }
      };
      sluchaj("loadeddata", dociagnij); pozniej(dociagnij, 250);
      replayPhase = "gra"; pauza = false;
      replayVideo.style.display = ""; video.style.display = "none";
      replayVideo.playbackRate = cal.powTempo * korektaCzasu;
      replayState = `powtórka x${cal.powTempo}`;
      zaloguj(`powtórka: bufor ${dl.toFixed(1)}s, gram od ${od.toFixed(1)}s`);
      oknoAplikacjiOtwarte(); synchronizujOknoPowtorki();
      place(); odtwarzaj();
    };
    const domierz = () => {
      const meta = danePliku.get(pendingBlob);
      const d = meta ? meta.duration : replayVideo.duration;
      if (!Number.isFinite(d) || d <= 0) return;
      if (!ruszylo) { start(d); return; }
      if (Math.abs(d - powDlugosc) > 0.05) {
        zaloguj(`oś filmu: długość zaktualizowana ${powDlugosc.toFixed(3)} → ${d.toFixed(3)}s`);
        powDlugosc = dlugoscPliku = d;
        od = Math.max(0, d - dlugoscUjecia);
        // Aktualizujemy pasek i następne „od nowa”, nie przerywamy użytkownikowi filmu.
      }
    };
    sluchaj("loadedmetadata", () => {
      domierz();
      if (!ruszylo && zyje()) {
        try { replayVideo.currentTime = 1e6; } catch (e) {}
        replayState = "ustalam długość filmu…";
      }
    });
    sluchaj("durationchange", domierz);
    sluchaj("timeupdate", domierz);
    // Kontroler żyje przez całą sesję, także po końcu i po „od nowa”.
    const kontrola = setInterval(() => {
      if (!zyje()) return;
      oknoAplikacjiOtwarte(); synchronizujOknoPowtorki();
      if (!ruszylo || oknoAplikacji || pauzaOdOkna || pauza || replayPhase !== "gra") {
        bezRuchuOd = Date.now(); return;
      }
      domierz();
      const dl = powDlugosc;
      if (replayVideo.ended || (!replayVideo.seeking && replayVideo.currentTime >= dl - 0.05)) {
        osiagnietoKoniec("kontrola postępu"); return;
      }
      if (Math.abs(replayVideo.currentTime - ostatniCzas) > 0.01) {
        ostatniCzas = replayVideo.currentTime; bezRuchuOd = Date.now();
      } else if (!replayVideo.paused && Date.now() - bezRuchuOd > 6000) {
        koniec("obraz stoi od 6 s");
      }
    }, 250);
    interwaly.add(kontrola);
    replayVideo.src = url; replayVideo.load();
    pozniej(() => {
      if (!ruszylo) {
        toast("nie udało się ustalić długości filmu — spróbuj ponownie");
        pendingBlob = null;
        koniec("brak skończonej długości filmu po 8 s");
      }
    }, 8000);
  }

  function watchLeg() {
    if (!cal.powWl) return;
    // Poza meczem zielony gradient ma choćby przełącznik w lobby,
    // a to nie jest wygrany Leg.
    if (!wMeczu()) { legSeen = false; return; }
    const won = legWon();
    // Runda o to, kto zaczyna, konczy sie zdarzeniem game_shot z checkoutem 0.
    // Dla danych wyglada jak zamkniety Leg. W sesji online 2026-09-10 o 02:02
    // wyzwolila powtorke przy ekran=mecz/bull - nie ma czego powtarzac.
    if (won && bullOff()) {
      if (!legSeen) zaloguj("powtórka pominięta: rzut o bulla, nie Leg");
      legSeen = won; return;
    }
    if (won && !legSeen && Date.now() - lastReplay <= 15000)
      zaloguj(`wygrany Leg pominięty: karencja ` +
        `${((15000 - (Date.now() - lastReplay)) / 1000).toFixed(0)}s`);
    if (won && !legSeen && Date.now() - lastReplay > 15000) {
      lastReplay = Date.now();
      migawka("WYGRANY LEG wykryty");
      playReplay("auto", "AUTOMAT: wygrany Leg");
    }
    legSeen = won;
  }

  // ---------- diagnostyka w oknie ----------
  // ---------- klawiatura ----------
  // Samo preventDefault nie wystarcza - Autodarts nasluchuje wlasnych
  // skrotow, wiec zdarzenie trzeba tez zatrzymac w fazie przechwytywania.
  // Kazdy pochlaniany klawisz trafia do dziennika - dzieki temu widac
  // z nagrania, czy powtorka byla wywolana recznie czy sama.
  const KLAWISZE_CICHE = ["arrowup", "arrowdown", "arrowleft", "arrowright",
    "w", "a", "s", "d", "q", "e", "+", "=", "-", "_", ",", ".", ";", "'", "[", "]"];
  let ostatniKlawisz = "", ostatniKlawiszCzas = 0;

  function logKlawisz(k, e) {
    if (oknoOtwarte && KLAWISZE_CICHE.includes(k)) return;
    const teraz = Date.now();
    if (k === ostatniKlawisz && teraz - ostatniKlawiszCzas < 400) return;
    ostatniKlawisz = k; ostatniKlawiszCzas = teraz;
    const nazwa = k === " " ? "SPACJA" : k.toUpperCase();
    zaloguj(`⌨ ${e && e.shiftKey ? "Shift+" : ""}${nazwa}`);
  }

  function zjedz(e) {
    logKlawisz((e.key || "").toLowerCase(), e);
    e.preventDefault();
    e.stopPropagation();
    if (e.stopImmediatePropagation) e.stopImmediatePropagation();
  }

  let ostatniBlokSkrotu = 0;
  function onKey(e) {
    if (kreator) { if(e.key === "Escape") { zjedz(e); zamknijKreator(); } return; }
    // Blokujemy klawisze tylko przy realnym pisaniu. Wczesniej fokus na
    // suwaku przewijania albo na przycisku wylaczal cale sterowanie.
    const t = e.target, tag = (t.tagName || "").toLowerCase();
    const pisze = tag === "textarea" || tag === "select" ||
      (t && t.isContentEditable) || (e.isComposing) ||
      (tag === "input" && ["text","number","search","email","password"]
        .includes((t.type || "text").toLowerCase()));
    if(e.key==='Escape'&&(labOtwarte||oknoOtwarte)){zjedz(e);zamknijPanele();return;}
    if (pisze) return;
    // 4.18: nie przechwytujemy skrotow z Ctrl, Alt i Cmd. Wczesniej Ctrl+R
    // wpadalo do obslugi R: bylo pochlaniane i uruchamialo powtorke zamiast
    // odswiezyc strone. Wlasne skroty uzywaja wylacznie Shift.
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    const k = e.key.toLowerCase();
    // Esc i klawisze sterujące należą do aktywnego okna Autodarts.
    if (oknoAplikacjiOtwarte() && k !== "y") {
      // Bez tego sladu skrot ginie bez echa i wyglada jak zepsuta funkcja.
      if (Date.now() - ostatniBlokSkrotu > 1500) {
        ostatniBlokSkrotu = Date.now();
        zaloguj(`klawisz ${k} pominięty: otwarte okno Autodarts (${oknoAplikacji || "?"})`);
      }
      return;
    }

    if(k==='escape'&&(labOtwarte||oknoOtwarte)){zjedz(e);zamknijPanele();return;}
    if(k==='f8'||k==='x'){if(DEV_UI){zjedz(e);if(labOtwarte)zamknijPanele();else otworzLab();}return;}
    if(k==='j'){zjedz(e);if(oknoOtwarte)zamknijPanele();else otworzUstawienia();return;}
    if(labOtwarte||oknoOtwarte)return;
    if (k === "i") { zjedz(e); hudWidoczny = !hudWidoczny; return; }
    if (k === "n" && e.shiftKey) { zjedz(e); ustawNagrywanie(!cal.powWl); return; }

    if (k === "y" && DEV_UI) {
      zjedz(e);
      if (e.shiftKey) { zapiszDziennik(); return; }
      licznikZnacznikow++;
      migawka(`>>> ZNACZNIK ${licznikZnacznikow} — TU COŚ JEST NIE TAK <<<`);
      toast(`znacznik ${licznikZnacznikow} zapisany`);
      return;
    }
    if (k === "z") { zjedz(e); cal.zoomWl = !cal.zoomWl; save(); return; }
    if (k === "t" && DEV_UI) { zjedz(e); testUntil = Date.now() + 3000; return; }
    if (k === "g") { zjedz(e); showGuide = !showGuide; return; }
    if (inReplay) {
      if (k === "escape" || k === "p") { zjedz(e); przerwij(); return; }
      if (k === "r") {
        zjedz(e);
        if (czekanieDo > 1 && odNowa) odNowa(); else przerwij();
        return;
      }
      if (!widokPowtorki()) return;

      if (k === " " || k === "spacebar") {
        zjedz(e);
        if (czekanieDo > 1 && odNowa) odNowa(); else przelaczPauze();
        return;
      }
      if (k === "l") { zjedz(e); przelaczPetle(); return; }
      if (k === "s") { zjedz(e); zapiszTeraz(); return; }

      if (k === "arrowleft" || k === "arrowright") {
        zjedz(e);
        wyjdzZeStopklatki();
        if (!pauza) przelaczPauze();
        const klatka = 1 / (fpsZmierzone || 30);
        const ile = (e.shiftKey ? 10 : 1) * klatka;
        replayVideo.currentTime = Math.max(0,
          replayVideo.currentTime + (k === "arrowright" ? ile : -ile));
        return;
      }
      if (k === "," || k === ".") {
        zjedz(e);
        const kroki = [0.1, 0.15, 0.25, 0.35, 0.5, 0.75, 1];
        let i = kroki.findIndex(v => v >= cal.powTempo - 0.001);
        if (i < 0) i = 3;
        i = Math.min(kroki.length - 1, Math.max(0, i + (k === "." ? 1 : -1)));
        cal.powTempo = kroki[i];
        replayVideo.playbackRate = cal.powTempo * korektaCzasu;
        save(); toast(t('Tempo {a}×',{a:cal.powTempo}));
        return;
      }
      return;
    }
    if (k === "p" && DEV_UI) { zjedz(e); probujPowtorke("auto", "klawisz P"); return; }
    if (k === "r") {
      zjedz(e);
      if (e.shiftKey) zapiszBezOdtwarzania(); else probujPowtorke("reczna", "klawisz R");
      return;
    }
    if (pytanieDo) {
      if (k === "s") { zjedz(e); zapiszPowtorke(); return; }
      if (k === "escape") { zjedz(e); schowajPytanie(); return; }
    }
    if (k === "c") { zjedz(e); camOk = false; camState = "ponawiam..."; startCamera(); return; }
    if (k === "m" && !oknoOtwarte) { zjedz(e);
      const kolejka = ["auto", "local", "online"];
      ustawTryb(kolejka[(kolejka.indexOf(cal.trybGry || "auto") + 1) % 3]); return; }
    if (k === "f") { zjedz(e); cal.vx = 0; cal.vy = 0; cal.vz = 1; save(); return; }
    if (k === "k" && !oknoOtwarte) { zjedz(e); ustawWidocznoscKamery(!visible); return; }
  }

  // ---------- start ----------
  // Awaria jednego fragmentu interfejsu nie moze zablokowac reszty
  // - w szczegolnosci obslugi klawiszy.
  function bezpiecznie(nazwa, f) {
    try { f(); } catch (e) {
      if(DEV_UI)console.error(`[adCam] blad przy ${nazwa}:`, e);
      zaloguj(`błąd: ${nazwa} — ${e.message}`);
    }
  }

  function start() {
  visible = cal.obrazWl;
  buildOverlay();
  if(DEV_UI)buildDiagOkno();
  buildTryb();
  buildPasekPow();
  buildPytanie();
  buildHud();
  bezpiecznie("okno ustawień", buildOkno);
  applyTransform();
  window.addEventListener("keydown", onKey, true);

  let bladPetli = 0, ostatnieRys = 0, poprzKlatkaMs = performance.now();
  (function loop() {
    try {
      const t0 = performance.now();
      place(); drawPasekPow();
      msKlatki = msKlatki * 0.9 + (performance.now() - t0) * 0.1;
      uiLicznik++;
      const tn = performance.now();
      // Surowe odstepy miedzy klatkami zaraz po restarcie bufora. Usredniony
      // wynik na sekunde gubi ksztalt przerwy, a wlasnie ksztalt mowi, czy
      // to jedna dluga blokada, czy seria krotkich.
      // 4.19: okno CZASOWE, nie 12 klatek. Przy 60 kl/s dwanascie klatek
      // to 200 ms i pomiar konczyl sie, zanim zacięcie w ogóle zdazylo
      // sie zaczac - a zaczynalo sie 150-300 ms po restarcie.
      // 4.21: statystyki zbieramy przez PELNE 8 s. W 4.20 limit 400 wpisow
      // konczyl zbieranie w szybkim oknie po okolo 5 s i pozniejszy zastoj
      // mogl w ogole nie trafic do pomiaru. Limitujemy tylko liste przykladow.
      if (odstepyPoRestarcie) {
        const dt = Math.round(tn - poprzKlatkaMs);
        const o = odstepyPoRestarcie;
        o.n++; o.suma += dt;
        if (dt > o.max) o.max = dt;
        if (dt > 250) o.dlugie++;
        if (dt > 100) o.ponad100++;
        if (o.przyklady.length < 14) o.przyklady.push(dt);
        if (tn - restartOd > 8000) {
          zaloguj(`bufor: 8 s po restarcie — klatek ${o.n}, ` +
            `najdłuższa przerwa ${o.max} ms, przerw ponad 250 ms: ${o.dlugie}, ` +
            `ponad 100 ms: ${o.ponad100}, średnia ${(o.suma / o.n).toFixed(0)} ms`);
          zaloguj(`bufor: pierwsze odstępy [${o.przyklady.join(", ")}] ms, ` +
            `pierwszy fragment: ${o.pierwszyFragment === null ? "—"
              : o.pierwszyFragment + " ms od rotacji / " +
                (o.odStartu === undefined ? "?" : o.odStartu) + " ms od start()"}, ` +
            `bajtów w buforze ${(bajtyBufora / 1048576).toFixed(1)} MB`);
          odstepyPoRestarcie = null;
        }
      }
      poprzKlatkaMs = tn;
      if (!uiOkno) uiOkno = tn;
      if (tn - uiOkno >= 1000) {
        uiFps = Math.round(uiLicznik * 1000 / (tn - uiOkno));
        skanyNaSek = Math.round(skanyLicznik * 1000 / (tn - uiOkno));
        uiLicznik = 0; skanyLicznik = 0; uiOkno = tn;
        if (uiFps && uiFps < 15) {
          if (!niskieOd) niskieOd = Date.now();
          else if (!niskieZgloszone && Date.now() - niskieOd > 8000) {
            niskieZgloszone = true;
            // 4.17: nie zgadujemy przyczyny. Stara tresc kazala obnizac
            // rozdzielczosc kamery i wyslala nas w zla strone - w raporcie
            // z 4.16 wszystkie trzy spadki zaczely sie tuz po odswiezeniu
            // bufora, a nie przez kamere.
            const odRestartu = ostatniRestart ? niskieOd - ostatniRestart : -1;
            // 4.18: samo nastepstwo czasowe nie dowodzi sprawstwa, a poprzednia
            // tresc brzmiala jak wyrok. Podajemy fakt i zostawiamy wniosek.
            zaloguj(`UWAGA: strona rysuje ${uiFps}/s. ` +
              (odRestartu >= 0 && odRestartu < 6000
                ? `Spadek zaczął się ${(odRestartu / 1000).toFixed(1)} s po ` +
                  `odświeżeniu bufora — zbieżność w czasie, do sprawdzenia.`
                : `Bez zbieżności z odświeżaniem bufora.`));
          }
        } else { niskieOd = 0; niskieZgloszone = false; }
      }
      // 4.36: petla rAF chodzi niezaleznie od kamery, wiec jest jedynym
      // miejscem, w ktorym mozna uczciwie zmierzyc, jak dlugo zywy obraz
      // byl ukryty. Bez tego spadek fps i display:none to dwie osobne
      // obserwacje, ktorych nikt nie zestawi.
      if(torPomiar){torPomiar.probki++;
        if(!video||video.style.display==='none'||(wrap&&wrap.style.display==='none'))torPomiar.ukryte++;}
      // Panele odswiezamy 5 razy na sekunde - czesciej nie ma sensu,
      // a przebudowa ich zawartosci kosztuje.
      const t = Date.now();
      if (t - ostatnieRys > 500) {
        ostatnieRys = t;
        drawHud(); odswiezTryb(); drawDiagOkno();
      }
    if (pytanieDo && Date.now() > pytanieDo) schowajPytanie();
      if (!oknoAplikacji && !pauzaOdOkna && czekanieDo > 1 && Date.now() > czekanieDo) przerwij("czas minął");
    } catch (e) {
      if (++bladPetli < 4) { if(DEV_UI)console.error("[adCam]", e); zaloguj("pętla: " + e.message); }
    }
    requestAnimationFrame(loop);
  })();

  setInterval(applyZoom, 200);
  setInterval(watchLeg, 300);
  if(DEV_UI)setInterval(() => {
    dziennikPelny.push(`${czasSesji()}  ·  ${stanLinia()}`);
    if (dziennikPelny.length > 4000) dziennikPelny.shift();
    uiProbki.push(uiFps);
    if (uiProbki.length > 3000) uiProbki.shift();
  }, 2000);
  if(DEV_UI)setInterval(pomiarWyprzedzenia, 150);
  setInterval(cycleRecorder, 1000);
  setInterval(opozniaczZwalniania, 100);
  if(DEV_UI)setInterval(autoZapisDziennika, 5000);
  if(DEV_UI)setTimeout(autoZapisDziennika, 4000);
  startCamera();
  if (migracja417) zaloguj(`4.17: ${migracja417}`);
  if(DEV_UI)console.log(`[adCam] wersja ${WERSJA} uruchomiona`);
  }

  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", start);
  else start();
})();