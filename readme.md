# Fratcher

## Backend

## Frontend

### Profil
- User kann sein eigenes Profil bearbeiten
- User kann Profil seiner Matches begutachten, aber nicht bearbeiten (Reiter 'Friends')
- Es gibt ein Feld Hobbies, das nur zur Anzeige dient und nicht im Matcher auftaucht, sozusagen als Zusatzinfo  
### Chat
Im Chat steckt die wohl meiste Arbeit, da ich denke das im Laufe der Zeit diese Komponente die am meisten genutzte werden würde.
- Chat funktioniert über WebSockets
- neue Nachrichten werden über ein Bubble in der Navigationsbar angezeigt (am Reiter Friends) mit der entsprechenden Anzahl an ungelesenen 	Nachrichten.
- Online- und Offline-Status der Friends wird in Real-Time angezeigt und aktualisiert
	Sichtbar im Reiter 'Friends' am User und im Chat am großen Bubble (rot für nicht angemeldet, grün für angemeldet)
- Chatnachrichten sind per CSS gestyled und lassen sich eindeutig mir oder meinem Chatpartner zuweisen
- bei Eingang neuer Nachrichten scrollt der Chat automatisch herunter
- Über den Endpoint Notifications wird der User über neue Nachrichten benachrichtigt (Anzahl ungelesener Nachrichten).
	Dieser wird einmalig bei Login abgerufen, danach wird der Status der Notifications über Websockets aktualisiert.
	Chatnachrichten werden als gelesen markiert, wenn der Chat zum User im Front geöffnet wird.
	Dies hat auch zur Folge, das die Badges aktualisiert werden.
### Matcher
- Matcher zeigt Text an, dieser kann ge(dis)liked werden
### Registrierung
- Bei der Registrierung wird zuerst ein neuer User angelegt, die Funktionen Friends(inkl. Chat) und Matcher sind erst verfügbar, nachdem ein Profil angelegt wurde (mit Pflichfeldern)
- Hat der User sich nicht komplett registriert, kann er sich an und abmelden. Wenn der sich anmeldet ist auf der Startseite ein Vermerk, dass das Profil aktualisiert werden muss
### Login/Logout
- Bei Login ist die Möglichkeit "angemeldet bleiben" vorhanden. Diese setzt die Cookie Gültigkeit auf ein Jahr
- Bei Logout wird der Cookie gelöscht
### CSS
Es gibt einige Elemente die mit CSS bearbeitet wurden. 
- Der Chat
- Positionierung einzelne weiterer Elemente (Buttons, Texte)