Este script contiene tres servicios disponibles para controlar los subtítulos


El primero "/terminalGet" regresa todas las cámaras que están como hijas de una terminal de POS

Parámetros: "idTerminal"


El segundo "/terminalPost" inserta un texto como subtítulos en todas las cámaras que le pertenezcan a una terminal de POS

Parámetros: "idTerminal", "inputText"


El tercero "/terminalEnd" limpia los subtítulos en pantalla de todas las cámaras hijas de una terminal de POS

Parámetros: "idTerminal"



Los 3 servicios responden un JSON con esta forma:

{
"cameras":[
    "1",
    "2"
]
}



Ejemplos de peticiones al servicio:

http://issmexico.net:93/terminalGet?idTerminal=1

http://issmexico.net:93/terminalEnd=idTerminal=1

http://issmexico.net:93/terminalPost?idTerminal=1&inputText=Nueva transacción