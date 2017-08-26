# Fratcher
Entwickelt wurde unter Windows 10 mit Google Chrome als Browser.

In der Entwicklung habe ich gerne Backend und Frontend nebenher entwickelt. Die Entwicklung fällt mir einfacher wenn das Ergebnis direkt sichtbar ist, häufig fallen mir dabei auch direkt Designentscheidungen auf die auf andere Weise besser gelöst werden können.

Anbord ist eine zweite Applikation, PasswortGenerator.java. In dieser habe ich anfangs die gehashten Passwörter für die Datenbank generiert.
Prinipiell könnte diese Datei gelöscht werden.

Der User wird auf alles Seiten, außer Login und Registrieren, zurück auf Home geschickt, wenn er nicht angemeldet ist. Das verhindert irreführendes Verhalten für den User, wenn er zum Beispiel Lesezeichen im Browser speichert. Außerdem werden nicht automatisch Requests an den Server geschickt, ohne das der User angemeldet ist.

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
- Online- und Offline-Status der Friends wird in Real-Time angezeigt und aktualisiert (einfach mit bob anmelden und auf die Seite Friends wechseln, dann mit Sally an- und abmelden).
	Sichtbar im Reiter 'Friends' am User und im Chat am großen Icon (rot für nicht angemeldet, grün für angemeldet)
- Chatnachrichten sind per CSS gestyled und lassen sich eindeutig 'mir' oder meinem Chatpartner zuweisen
- bei Eingang neuer Nachrichten scrollt der Chat automatisch herunter (und bei eigenen Nachrichten)
- Nachrichten werden per HTTP-Post an den Server gegeben, von dort aus per WebSockets an Friends verteilt, die ebenfalls online sind
	So kann der Schritt mit der Authentifizierung über WebSockets gespart werden.
- die Initialisierung der WebSockets liest die URL aus dem Window-Object location. Zur Unterscheidung ob "ws://..." oder "wss://..." benutzt werden muss, wird unterschieden ob die Seite per "http://..." oder "https://..." aufgerufen wurde.  
- Nachrichten der WebSockets werden generell über das Event-System verteilt.
- Es können keine Nachrichten ohne Inhalt verschickt werden.
- Beim öffnen des Chats wird das Input-Feld direkt fokusiert, damit der User gleich anfangen kann zu schreiben
	(https://stackoverflow.com/questions/28889826/react-set-focus-on-input-after-render)


## Notifications
- Über den Endpoint Notifications wird der User über neue Nachrichten benachrichtigt (Anzahl ungelesener Nachrichten).
	Dieser wird einmalig bei Login abgerufen, danach wird der Status der Notifications über Websockets aktualisiert.
	Chatnachrichten werden als gelesen markiert, wenn der Chat zum User im Front geöffnet wird.
	Dies hat auch zur Folge, das die Badges aktualisiert werden.
- Ist der Chat geöffnet zu dem neue Nachrichten eintreffen, werden die Notifications hochgezählt. Sie werden mit abschicken einer eigenen Nachricht als gelesen markiert
- In den Notifications gibt es nur Einträge zu Chatpartnern mit einer Anzahl ungelesener Nachrichten > 0 um den Datenverkehr zu reduzieren.
- Bei Abruf der Gesamtanzahl an neuen Nachrichten wird die Eigenschaft document.title aktualisiert. Dadurch wird die Anzahl auch in der Browser-Tab-Bar angezeigt.
	
## Matcher
- Matcher zeigt Text an, dieser kann ge(dis)liked werden
- Wenn der User die Matcher-Komponente "durchgespielt" hat, also keine weiteren Matches möglich sind da alle User gematcht wurden, sieht der User eine Nachricht das er warten muss bis neue User auf der Platform vorhanden sind.
 
- Im Backend wird für den Fall das die Listen liked und/oder disliked des Users leer sind, der User selbst hinzugefügt. Für die H2 Datenbank hat es auch ohne Funktioniert, Postgresql meldet allerdings einen Syntaxfehler mit leeren Listen. 
https://stackoverflow.com/questions/2488930/passing-empty-list-as-parameter-to-jpa-query-throws-error hat mich auf die Lösung gebracht.
Die Anwendung hätte auch andere Methoden im Repository aufrufen können, welche ohne die leeren Listen arbeiten. Ich denke aber bei dieser kleinen Anwendung ist der Workaround ok.

## Registrierung
- In der Registrierung schickt der User seine Anmeldedaten und sein Profil, wenn der Vorgang erfolgreich vom Server abgeschlossen wurde ist der User direkt eigeloggt. Die Cookies werden wie beim Login gespeichert, allerdings ohne die Möglichkeit angemeldet zu bleiben (für 1 Jahr)
- Meldet der Server einen Fehler, wird dieser unter dem Formular rot angezeigt.
- Damit der User kein falsches Jahr verschickt, gibt es eine Validierung im Frontend. Ein Fehler wird erst angezeigt, wenn der User seine Registrierung abschickt (Fehlermeldung am Ende des Formulars, sowie Input-Feld mit roter Umrandung). Per Live-Update verliert das Input-Feld den Roten Rahmen, wenn der User eine korrekte Jahreszahl eingegeben hat. 

## Login/Logout
- Bei Login wird ein Cookie in den Browser geschrieben
- Bei Login ist die Möglichkeit "angemeldet bleiben" vorhanden. Diese setzt die Cookie Gültigkeit auf ein Jahr
- Bei Logout wird der Cookie gelöscht
- Fehlerhafte Anmeldung wird durch einen roten Text unter dem Login-Bereich angezeigt

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