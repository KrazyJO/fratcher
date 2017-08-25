# Fratcher
Entwickelt wurde unter Windows 10 mit Google Chrome als Browser.

In der Entwicklung habe ich gerne Backend und Frontend nebenher entwickelt. Die Entwicklung fällt mir einfacher wenn das Ergebnis direkt sichtbar ist, häufig fallen mir dabei auch direkt Designentscheidungen auf die auf andere Weise besser gelöst werden können.

Anbord ist eine zweite Applikation, PasswortGenerator.java. In dieser habe ich anfangs die gehashten Passwörter für die Datenbank generiert.
Prinipiell könnte diese Datei gelöscht werden.

## Profil
- User kann sein eigenes Profil bearbeiten
- User kann Profil seiner Matches begutachten, aber nicht bearbeiten (Reiter 'Friends')
- Fried-Profile sind im Readonly-Modus verfügbar. Das Backend bekommt auch mit, wenn man versucht ein fremdes Profil zu editieren und blockiert diese Funktion.
- Es gibt ein Feld Hobbies, das nur zur Anzeige dient und nicht im Matcher auftaucht, sozusagen als Zusatzinfo  
- Es gibt die Möglichkeit, die Friend-Profile zu betrachten und in diesem Zustand auf das eigene Profil zu klicken (in der Navbar).
	Die Component bekommt ein Hash-Change-Event über 'componentWillReceiveProps' mit und updated sich dementsprechend.

## Chat
Im Chat steckt die wohl meiste Arbeit, da ich denke das im Laufe der Zeit diese Komponente die am meisten genutzte werden würde.
- Chat funktioniert über WebSockets
- neue Nachrichten werden über ein Bubble in der Navigationsbar angezeigt (am Reiter Friends) mit der entsprechenden Anzahl an ungelesenen 	Nachrichten.
- Online- und Offline-Status der Friends wird in Real-Time angezeigt und aktualisiert
	Sichtbar im Reiter 'Friends' am User und im Chat am großen Icon (rot für nicht angemeldet, grün für angemeldet)
- Chatnachrichten sind per CSS gestyled und lassen sich eindeutig 'mir' oder meinem Chatpartner zuweisen
- bei Eingang neuer Nachrichten scrollt der Chat automatisch herunter (und bei eigenen Nachrichten)
- Nachrichten werden per HTTP-Post an den Server gegeben, von dort aus per WebSockets an Friends verteilt, die ebenfalls online sind
	So kann der Schritt mit der Authentifizierung über WebSockets gespart werden.
- die Initialisierung der WebSockets liest die URL aus dem Window-Object location. Zur Unterscheidung ob "ws://..." oder "wss://..." benutzt werden muss, wird unterschieden ob die Seite per "http://..." oder "https://..." aufgerufen wurde.  
- Nachrichten der WebSockets werden generell über das Event-System verteilt.

## Notifications
- Über den Endpoint Notifications wird der User über neue Nachrichten benachrichtigt (Anzahl ungelesener Nachrichten).
	Dieser wird einmalig bei Login abgerufen, danach wird der Status der Notifications über Websockets aktualisiert.
	Chatnachrichten werden als gelesen markiert, wenn der Chat zum User im Front geöffnet wird.
	Dies hat auch zur Folge, das die Badges aktualisiert werden.
- Ist der Chat geöffnet zu dem neue Nachrichten eintreffen, werden die Notifications hochgezählt. Sie werden mit abschicken einer eigenen Nachricht als gelesen markiert
- In den Notifications gibt es nur Einträge zu Chatpartnern mit einer Anzahl ungelesener Nachrichten > 0 um den Datenverkehr zu reduzieren.
	
## Matcher
- Matcher zeigt Text an, dieser kann ge(dis)liked werden
- Wenn der User die Matcher-Komponente "durchgespielt" hat, also keine weiteren Matches möglich sind da alle User gematcht wurden, sieht der User eine Nachricht das er warten muss bis neue User auf der Platform vorhanden sind.
 
- Im Backend wird für den Fall das die Listen liked und/oder disliked des Users leer sind, der User selbst hinzugefügt. Für die H2 Datenbank hat es auch ohne Funktioniert, Postgresql meldet allerdings einen Syntaxfehler mit leeren Listen. 
https://stackoverflow.com/questions/2488930/passing-empty-list-as-parameter-to-jpa-query-throws-error hat mich auf die Lösung gebracht.
Die Anwendung hätte auch andere Methoden im Repository aufrufen können, welche ohne die leeren Listen arbeiten. Ich denke aber bei dieser kleinen Anwendung ist der Workaround ok.

## Registrierung
- Bei der Registrierung wird zuerst ein neuer User angelegt, die Funktionen Friends(inkl. Chat) und Matcher sind erst verfügbar, nachdem ein Profil angelegt wurde (mit Pflichfeldern)
- Hat der User sich nicht komplett registriert, kann er sich an und abmelden. Wenn der sich anmeldet ist auf der Startseite ein Vermerk, dass das Profil aktualisiert werden muss

## Login/Logout
- Bei Login ist die Möglichkeit "angemeldet bleiben" vorhanden. Diese setzt die Cookie Gültigkeit auf ein Jahr
- Bei Logout wird der Cookie gelöscht

## CSS
Zum Positionieren und Stylen habe ich teilweise selbst CSS geschrieben ohne mich an Bootstrap zu bedienen,
um ein bisschen mit CSS "spielen" zu können.

Es gibt einige Elemente die mit CSS bearbeitet wurden. 
- Der Chat (Hintergrund, Nachrichten, Nachrichten-Metadaten, Abschicken Bereich, Scrollbar, Statusanzeige Friend)
- Box-Shadow des Bildes ('Hier ein kleines Beispiel') auf der Seite 'Home'
- Positionierung einzelne weiterer Elemente (Buttons, Texte)

## zusätzliche Bibliotheken:
- pubsub-js: Event-Bibliothek -> Habe ich genommen da diese auf den ersten Blick den einfachsten Eindruck gemacht hat.
	Leicht in der Bedienung, trifft genau die gewünschte Funktionalität und scheint wenig bis keinen Overhead mit sich zu bringen. 
	Wird zur Verteilung der WebSocket Nachrichten benutzt. Die Components registrieren sich mit componentDidMount am Event-System und 
	entfernen sich von diesem wieder bei componentWillUnmount.
	Auch die Navigationsbar erhält Events um zu erfahren ob der User angemeldet ist oder nicht.
- react-icons: Icons für react