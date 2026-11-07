/* ============================================================
   Top 100 DJs de Música Electrónica — Lógica de la aplicación
   Datos locales + estadísticas + búsqueda por nombre + filtros.
   ============================================================ */

// Lista de los 100 DJs. El orden del array es el del ranking.
const djs = [
  { position: 1, name: "Carl Cox", genre: "Techno", country: "Reino Unido", debutYear: 1991 },
  { position: 2, name: "Tiësto", genre: "Trance", country: "Países Bajos", debutYear: 1994 },
  { position: 3, name: "Armin van Buuren", genre: "Trance", country: "Países Bajos", debutYear: 1995 },
  { position: 4, name: "David Guetta", genre: "EDM", country: "Francia", debutYear: 1990 },
  { position: 5, name: "Calvin Harris", genre: "EDM", country: "Reino Unido", debutYear: 2006 },
  { position: 6, name: "deadmau5", genre: "Progressive House", country: "Canadá", debutYear: 2005 },
  { position: 7, name: "Richie Hawtin", genre: "Techno", country: "Canadá", debutYear: 1990 },
  { position: 8, name: "Sven Väth", genre: "Techno", country: "Alemania", debutYear: 1985 },
  { position: 9, name: "Paul van Dyk", genre: "Trance", country: "Alemania", debutYear: 1992 },
  { position: 10, name: "Fatboy Slim", genre: "Big Beat", country: "Reino Unido", debutYear: 1989 },
  { position: 11, name: "The Chemical Brothers", genre: "Big Beat", country: "Reino Unido", debutYear: 1992 },
  { position: 12, name: "Daft Punk", genre: "French House", country: "Francia", debutYear: 1993 },
  { position: 13, name: "Justice", genre: "Electro", country: "Francia", debutYear: 2003 },
  { position: 14, name: "Aphex Twin", genre: "IDM", country: "Reino Unido", debutYear: 1991 },
  { position: 15, name: "Laurent Garnier", genre: "Techno", country: "Francia", debutYear: 1987 },
  { position: 16, name: "Jeff Mills", genre: "Techno", country: "Estados Unidos", debutYear: 1989 },
  { position: 17, name: "Derrick May", genre: "Techno", country: "Estados Unidos", debutYear: 1987 },
  { position: 18, name: "Juan Atkins", genre: "Techno", country: "Estados Unidos", debutYear: 1980 },
  { position: 19, name: "Kevin Saunderson", genre: "Techno", country: "Estados Unidos", debutYear: 1987 },
  { position: 20, name: "Frankie Knuckles", genre: "House", country: "Estados Unidos", debutYear: 1977 },
  { position: 21, name: "Larry Levan", genre: "House", country: "Estados Unidos", debutYear: 1974 },
  { position: 22, name: "Ron Hardy", genre: "House", country: "Estados Unidos", debutYear: 1977 },
  { position: 23, name: "Marshall Jefferson", genre: "House", country: "Estados Unidos", debutYear: 1985 },
  { position: 24, name: "Larry Heard", genre: "Deep House", country: "Estados Unidos", debutYear: 1985 },
  { position: 25, name: "Kerri Chandler", genre: "Deep House", country: "Estados Unidos", debutYear: 1990 },
  { position: 26, name: "Masters at Work", genre: "House", country: "Estados Unidos", debutYear: 1990 },
  { position: 27, name: "Louie Vega", genre: "House", country: "Estados Unidos", debutYear: 1986 },
  { position: 28, name: "Danny Tenaglia", genre: "House", country: "Estados Unidos", debutYear: 1985 },
  { position: 29, name: "Roger Sanchez", genre: "House", country: "Estados Unidos", debutYear: 1990 },
  { position: 30, name: "Erick Morillo", genre: "House", country: "Estados Unidos", debutYear: 1989 },
  { position: 31, name: "Steve Lawler", genre: "Tech House", country: "Reino Unido", debutYear: 1995 },
  { position: 32, name: "Loco Dice", genre: "Tech House", country: "Alemania", debutYear: 2002 },
  { position: 33, name: "Marco Carola", genre: "Tech House", country: "Italia", debutYear: 1993 },
  { position: 34, name: "Jamie Jones", genre: "Tech House", country: "Reino Unido", debutYear: 2003 },
  { position: 35, name: "Michael Bibi", genre: "Tech House", country: "Reino Unido", debutYear: 2013 },
  { position: 36, name: "Pawsa", genre: "Tech House", country: "Reino Unido", debutYear: null },
  { position: 37, name: "Fisher", genre: "Tech House", country: "Australia", debutYear: 2016 },
  { position: 38, name: "Chris Lake", genre: "Tech House", country: "Reino Unido", debutYear: 2002 },
  { position: 39, name: "Green Velvet", genre: "Techno", country: "Estados Unidos", debutYear: 1992 },
  { position: 40, name: "Dubfire", genre: "Techno", country: "Estados Unidos", debutYear: 1993 },
  { position: 41, name: "Adam Beyer", genre: "Techno", country: "Suecia", debutYear: 1993 },
  { position: 42, name: "Charlotte de Witte", genre: "Techno", country: "Bélgica", debutYear: 2010 },
  { position: 43, name: "Amelie Lens", genre: "Techno", country: "Bélgica", debutYear: 2014 },
  { position: 44, name: "Nina Kraviz", genre: "Techno", country: "Rusia", debutYear: 2009 },
  { position: 45, name: "Tale of Us", genre: "Melodic Techno", country: "Italia", debutYear: 2010 },
  { position: 46, name: "Adriatique", genre: "Melodic Techno", country: "Suiza", debutYear: 2011 },
  { position: 47, name: "Artbat", genre: "Melodic Techno", country: "Ucrania", debutYear: 2015 },
  { position: 48, name: "Stephan Bodzin", genre: "Melodic Techno", country: "Alemania", debutYear: 1996 },
  { position: 49, name: "Solomun", genre: "Deep House", country: "Bosnia y Herzegovina", debutYear: 2007 },
  { position: 50, name: "Dixon", genre: "Deep House", country: "Alemania", debutYear: 1994 },
  { position: 51, name: "Âme", genre: "Deep House", country: "Alemania", debutYear: 2001 },
  { position: 52, name: "Ben Klock", genre: "Techno", country: "Alemania", debutYear: 2001 },
  { position: 53, name: "Marcel Dettmann", genre: "Techno", country: "Alemania", debutYear: 2002 },
  { position: 54, name: "Boris Brejcha", genre: "Minimal Techno", country: "Alemania", debutYear: 2007 },
  { position: 55, name: "Paul Kalkbrenner", genre: "Techno", country: "Alemania", debutYear: 1999 },
  { position: 56, name: "Oliver Heldens", genre: "Future House", country: "Países Bajos", debutYear: 2013 },
  { position: 57, name: "Don Diablo", genre: "Future House", country: "Países Bajos", debutYear: 2003 },
  { position: 58, name: "Tchami", genre: "Future House", country: "Francia", debutYear: 2013 },
  { position: 59, name: "Martin Garrix", genre: "Big Room", country: "Países Bajos", debutYear: 2012 },
  { position: 60, name: "Hardwell", genre: "Big Room", country: "Países Bajos", debutYear: 2006 },
  { position: 61, name: "Afrojack", genre: "Big Room", country: "Países Bajos", debutYear: 2006 },
  { position: 62, name: "Dimitri Vegas & Like Mike", genre: "Big Room", country: "Bélgica", debutYear: 2007 },
  { position: 63, name: "Steve Aoki", genre: "EDM", country: "Estados Unidos", debutYear: 1996 },
  { position: 64, name: "Skrillex", genre: "Dubstep", country: "Estados Unidos", debutYear: 2004 },
  { position: 65, name: "Diplo", genre: "Trap", country: "Estados Unidos", debutYear: 2002 },
  { position: 66, name: "Major Lazer", genre: "Dancehall", country: "Estados Unidos", debutYear: 2009 },
  { position: 67, name: "Zedd", genre: "EDM", country: "Alemania", debutYear: 2009 },
  { position: 68, name: "Kygo", genre: "Tropical House", country: "Noruega", debutYear: 2013 },
  { position: 69, name: "Alan Walker", genre: "EDM", country: "Noruega", debutYear: 2012 },
  { position: 70, name: "Marshmello", genre: "Future Bass", country: "Estados Unidos", debutYear: 2015 },
  { position: 71, name: "Alesso", genre: "Progressive House", country: "Suecia", debutYear: 2010 },
  { position: 72, name: "Swedish House Mafia", genre: "Progressive House", country: "Suecia", debutYear: 2008 },
  { position: 73, name: "Axwell", genre: "Progressive House", country: "Suecia", debutYear: 1995 },
  { position: 74, name: "Sebastian Ingrosso", genre: "Progressive House", country: "Suecia", debutYear: 1999 },
  { position: 75, name: "Steve Angello", genre: "Progressive House", country: "Suecia", debutYear: 2001 },
  { position: 76, name: "Eric Prydz", genre: "Progressive House", country: "Suecia", debutYear: 2001 },
  { position: 77, name: "Avicii", genre: "Progressive House", country: "Suecia", debutYear: 2008 },
  { position: 78, name: "Kaskade", genre: "House", country: "Estados Unidos", debutYear: 2001 },
  { position: 79, name: "Above & Beyond", genre: "Trance", country: "Reino Unido", debutYear: 2000 },
  { position: 80, name: "Ferry Corsten", genre: "Trance", country: "Países Bajos", debutYear: 1991 },
  { position: 81, name: "Aly & Fila", genre: "Trance", country: "Egipto", debutYear: 2001 },
  { position: 82, name: "Markus Schulz", genre: "Trance", country: "Alemania", debutYear: 1993 },
  { position: 83, name: "Gareth Emery", genre: "Trance", country: "Reino Unido", debutYear: 2003 },
  { position: 84, name: "Giuseppe Ottaviani", genre: "Trance", country: "Italia", debutYear: 2003 },
  { position: 85, name: "Infected Mushroom", genre: "Psytrance", country: "Israel", debutYear: 1996 },
  { position: 86, name: "Astrix", genre: "Psytrance", country: "Israel", debutYear: 1998 },
  { position: 87, name: "Vini Vici", genre: "Psytrance", country: "Israel", debutYear: 2013 },
  { position: 88, name: "Ace Ventura", genre: "Psytrance", country: "Israel", debutYear: 2003 },
  { position: 89, name: "Andy C", genre: "Drum & Bass", country: "Reino Unido", debutYear: 1992 },
  { position: 90, name: "Goldie", genre: "Drum & Bass", country: "Reino Unido", debutYear: 1992 },
  { position: 91, name: "Noisia", genre: "Drum & Bass", country: "Países Bajos", debutYear: 2003 },
  { position: 92, name: "Pendulum", genre: "Drum & Bass", country: "Australia", debutYear: 2002 },
  { position: 93, name: "Netsky", genre: "Drum & Bass", country: "Bélgica", debutYear: 2009 },
  { position: 94, name: "Sub Focus", genre: "Drum & Bass", country: "Reino Unido", debutYear: 2003 },
  { position: 95, name: "Chase & Status", genre: "Drum & Bass", country: "Reino Unido", debutYear: 2003 },
  { position: 96, name: "Roni Size", genre: "Drum & Bass", country: "Reino Unido", debutYear: 1993 },
  { position: 97, name: "Bassnectar", genre: "Dubstep", country: "Estados Unidos", debutYear: 2002 },
  { position: 98, name: "Excision", genre: "Dubstep", country: "Canadá", debutYear: 2007 },
  { position: 99, name: "Zomboy", genre: "Dubstep", country: "Reino Unido", debutYear: 2011 },
  { position: 100, name: "Angerfist", genre: "Hardcore", country: "Países Bajos", debutYear: 2001 },
];

// Reseña editorial de cada DJ, alineada por nombre (los nombres son únicos y
// no cambian; las posiciones sí podrían hacerlo, los nombres no).
// No son datos verificados del ranking: es texto de contexto que se muestra
// en la ficha bajo el rótulo "Reseña editorial". Si falta una entrada, la
// ficha simplemente no muestra el bloque.
const djBios = {
  "Carl Cox":
    "De familia barbadense y criado en Brighton, se convirtió en uno de los grandes embajadores del acid house y el techno. Sus sesiones con tres platos y su larga residencia en Ibiza lo consolidaron como referencia mundial de la cabina.",
  "Tiësto":
    "El DJ de Breda llevó el trance a los estadios y fue el primero en pinchar en una ceremonia inaugural olímpica, en Atenas 2004. Su serie In Search of Sunrise definió el lado melódico del género.",
  "Armin van Buuren":
    "Productor de Leiden y creador del programa A State of Trance, ha encabezado varias veces la lista de DJ Magazine. Su estilo combina trance melódico con sesiones de larga duración.",
  "David Guetta":
    "DJ y productor parisino que pasó del house francés de los noventa al EDM global. Sus fiestas en Ibiza y sus colaboraciones pop le dieron un Grammy y un lugar central en la música de estadio.",
  "Calvin Harris":
    "Escocés de Dumfries, saltó a la fama con I Created Disco y después viró hacia el dance-pop. Es uno de los productores con más sencillos número uno en el Reino Unido.",
  deadmau5:
    "El productor canadiense Joel Zimmerman adoptó la cabeza de ratón como seña visual y convirtió el progressive house en un espectáculo de producción propia. Fundó el sello mau5trap.",
  "Richie Hawtin":
    "Canadiense afincado en Berlín, es una de las caras del minimal techno. Con Plus 8 y el alias Plastikman exploró el sonido reducido, y en Ibiza creó el concepto ENTER.",
  "Sven Väth":
    "Figura del techno alemán desde los ochenta, abrió el club Omen en Frankfurt y fundó Cocoon. Su manera de encadenar sesiones maratónicas definió la escena europea.",
  "Paul van Dyk":
    "Criado en la Alemania del Este, se convirtió en una de las voces del trance. For an Angel y su sello Vandit lo mantuvieron en primera línea durante décadas.",
  "Fatboy Slim":
    "El británico Norman Cook pasó por varios grupos antes de impulsar el big beat con Praise You y Right Here Right Now. Sus fiestas en Brighton fueron el laboratorio del género.",
  "The Chemical Brothers":
    "El dúo de Manchester formado por Tom Rowlands y Ed Simons llevó el big beat a las listas con Block Rockin' Beats. Su directo audiovisual es una referencia del género.",
  "Daft Punk":
    "Thomas Bangalter y Guy-Manuel de Homem-Christo unieron house, disco y pop bajo cascos de robot. Homework y Discovery marcaron a varias generaciones; anunciaron su separación en 2021.",
  Justice:
    "El dúo parisino de Gaspard Augé y Xavier de Rosnay irrumpió con el álbum Cross y su estética de neón. Su electro recoge la herencia del french house con un pulso más duro.",
  "Aphex Twin":
    "Richard D. James, desde Cornualles, es el nombre más inclasificable de la electrónica británica. Sus trabajos ambient e IDM ampliaron los límites del género.",
  "Laurent Garnier":
    "Francés afincado un tiempo en Manchester, donde fue residente del Haçienda. Su sello F Communications y su eclecticismo lo convirtieron en puente entre techno y house.",
  "Jeff Mills":
    "Detroit y el colectivo Underground Resistance lo formaron. The Bells es uno de sus temas más reconocibles, y su sello Axis publica techno de vanguardia desde los noventa.",
  "Derrick May":
    "Uno de los tres pioneros de Detroit, junto a Atkins y Saunderson. Strings of Life se convirtió en himno del techno y su sello Transmat definió el sonido de la ciudad.",
  "Juan Atkins":
    "Considerado el padre del techno, acuñó el término con su proyecto Model 500. Cybotron y Clear anticiparon la fusión de funk y máquinas que definiría Detroit.",
  "Kevin Saunderson":
    "El tercer nombre de los Belleville Three. Con Inner City firmó Big Fun y Good Life, llevando el techno de Detroit a las pistas comerciales.",
  "Frankie Knuckles":
    "Conocido como el padrino del house, fue residente del Warehouse de Chicago, el club que dio nombre al género. Después destacó como remezclador y productor.",
  "Larry Levan":
    "Residente del Paradise Garage de Nueva York, construyó un estilo de sesión larga y emocional que dio forma al garage house. Su influencia sigue presente en la selección de muchos DJs.",
  "Ron Hardy":
    "Figura del Muzic Box de Chicago, conocido por sus ediciones y por la intensidad de sus sesiones. Su manera de manipular cintas influyó en el house de los ochenta.",
  "Marshall Jefferson":
    "Firmó Move Your Body, uno de los himnos fundacionales del house de Chicago. También trabajó con Ten City y fue clave en el paso del género hacia el piano y la voz.",
  "Larry Heard":
    "Bajo el alias Mr. Fingers publicó Can You Feel It, piedra angular del deep house. Su uso de acordes cálidos y ritmos suaves definió el lado más introspectivo del género.",
  "Kerri Chandler":
    "El DJ de Nueva Jersey es un referente del deep house por la calidez de sus sesiones y su trabajo de estudio. Su sello Madhouse publica desde los noventa.",
  "Masters at Work":
    "El tándem neoyorquino de Louie Vega y Kenny Dope fusionó house con latin, soul y jazz. Nuyorican Soul es uno de sus proyectos más celebrados.",
  "Louie Vega":
    "Nacido en el Bronx, forma Masters at Work y dirige su propio proyecto Elements of Life. Su mezcla de house, salsa y soul es una firma reconocible.",
  "Danny Tenaglia":
    "Neoyorquino de origen italiano, es célebre por sus sesiones maratónicas y su mezcla de house tribal y progressive. Su estilo de cabina ha sido imitado durante décadas.",
  "Roger Sanchez":
    "El DJ neoyorquino se dio a conocer en Strictly Rhythm y alcanzó público masivo con Another Chance. Su programa Release Yourself lo mantiene en activo.",
  "Erick Morillo":
    "De origen colombiano y criado en Nueva York, fundó Subliminal Records y ayudó a popularizar el house latino. Con Reel 2 Real firmó el éxito I Like to Move It.",
  "Steve Lawler":
    "El británico de Birmingham se hizo un nombre en Ibiza con sus fiestas Harlem Nights y un sonido tribal de tech house. Dirige el sello VIVA.",
  "Loco Dice":
    "El DJ y productor de Düsseldorf, de raíces tunecinas, se formó en el hip hop antes de pasar al tech house. Su sello Desolat publica desde 2007.",
  "Marco Carola":
    "El napolitano es conocido por sus sesiones a tres platos y su energía rítmica. Fundó Music On, una de las fiestas más longevas de Ibiza.",
  "Jamie Jones":
    "El galés dirige Hot Creations y la fiesta Paradise en Ibiza. Su tech house cálido y su olfato para el groove lo han convertido en referente de la escena.",
  "Michael Bibi":
    "El londinense es cofundador de Solid Grooves y uno de los nombres del tech house actual. Su estilo se apoya en ritmos secos y voces sampleadas.",
  Pawsa:
    "El británico forma parte de Solid Grooves junto a Michael Bibi. Su tech house, directo y bailable, lo ha llevado a las principales pistas europeas.",
  Fisher:
    "El australiano con base en Los Ángeles se hizo mundialmente conocido con Losing It. Su house de gran formato y su puesta en escena festiva definen su propuesta.",
  "Chris Lake":
    "El británico es un productor de larga trayectoria, autor de títulos como Turn Off the Lights. Dirige el sello Black Book.",
  "Green Velvet":
    "El nombre de techno de Curtis Jones, también conocido como Cajmere. Desde Chicago combina humor y ácido, con Brighter Days como uno de sus clásicos.",
  Dubfire:
    "Ali Shirazinia formó parte de Deep Dish antes de orientarse al techno en solitario. Su sello SCI+TEC explora un sonido oscuro y de gran presión.",
  "Adam Beyer":
    "El sueco dirige Drumcode, uno de los sellos de techno más influyentes. Su sonido directo y sus sesiones lo mantienen en la primera línea del género.",
  "Charlotte de Witte":
    "La DJ y productora de Gante, antes conocida como Raving George, se ha convertido en una de las figuras del techno europeo. Dirige el sello KNTXT.",
  "Amelie Lens":
    "La belga de Amberes lidera su propio sello Lenske y la fiesta EXHALE. Su techno, rápido y contundente, la ha situado en los escenarios principales.",
  "Nina Kraviz":
    "La DJ siberiana se dio a conocer en Moscú y después en Berlín. Su sello трип y su estilo hipnótico la convirtieron en una de las voces del techno actual.",
  "Tale of Us":
    "El dúo milanés de Carmine Conte y Matteo Milleri dirige Afterlife, un sello y una fiesta que definieron el melodic techno de la pasada década.",
  Adriatique:
    "El dúo suizo de Adrian Shala y Adrian Schweizer se formó en Zúrich y se consolidó en el sello Diynamic. Cultiva un melodic techno melancólico y de larga respiración.",
  Artbat:
    "El dúo de Kiev formado por Artur y Batish ha ganado peso con su melodic techno de gran escala. Sus sesiones y remezclas circulan en Afterlife y otros sellos.",
  "Stephan Bodzin":
    "El alemán es conocido por sus directos con sintetizadores analógicos. Powers of Ten es una de sus obras más citadas dentro del melodic techno.",
  Solomun:
    "El DJ de Hamburgo, de raíces bosnias, dirige Diynamic y la fiesta Solomun +1 en Ibiza. Su house melancólico y sus sesiones abiertas marcaron una época.",
  Dixon:
    "El berlinés es cofundador de Innervisions y un referente del house profundo. Sus sesiones largas y detallistas son célebres en la escena europea.",
  "Âme":
    "El dúo berlinés de Kristian Rädle y Frank Wiedemann forma parte de Innervisions. Su tema Rej y su enfoque orgánico definieron el deep house de los dos mil.",
  "Ben Klock":
    "Residente del Berghain, es una de las caras del techno de Berlín. Su sello Klockworks publica un sonido austero y de gran precisión.",
  "Marcel Dettmann":
    "El berlinés forma parte de la historia del Berghain y del sello Ostgut Ton. Su techno, seco y contundente, es una referencia del sonido de la ciudad.",
  "Boris Brejcha":
    "El alemán se autodenomina high-tech minimal y actúa con una máscara veneciana. Fundó el sello Fckng Serious, desde el que publica su propia música.",
  "Paul Kalkbrenner":
    "El berlinés alcanzó fama masiva con la banda sonora de Berlin Calling y el tema Sky and Sand. Su techno melódico se presenta en formato de directo.",
  "Oliver Heldens":
    "El holandés de Róterdam fue uno de los nombres que popularizaron el future house. Dirige el sello Heldeep y mantiene una agenda internacional constante.",
  "Don Diablo":
    "El holandés lleva el future house a un terreno luminoso y melódico. Es fundador del sello Hexagon y de una propuesta audiovisual muy reconocible.",
  Tchami:
    "El parisino Martin Bresso es una de las referencias del future house. Su sello Confession reúne a buena parte de la escena que impulsó el estilo.",
  "Martin Garrix":
    "El holandés saltó a la fama con Animals y fundó STMPD RCRDS. Es uno de los productores jóvenes con más presencia en los escenarios de festival.",
  Hardwell:
    "El DJ de Breda fue número uno de DJ Magazine y fundó Revealed Recordings. Su big room definió el sonido de festival de comienzos de la pasada década.",
  Afrojack:
    "El holandés Nick van de Wall se dio a conocer con Take Over Control y su sello Wall Recordings. Es una figura habitual de los grandes festivales.",
  "Dimitri Vegas & Like Mike":
    "El dúo belga de los hermanos Thivaios está vinculado a Tomorrowland, festival del que son embajadores. Su big room está pensado para estadios.",
  "Steve Aoki":
    "El DJ de Miami, fundador de Dim Mak, es conocido tanto por su música como por su puesta en escena. Ha colaborado con artistas de rock, hip hop y pop.",
  Skrillex:
    "Sonny Moore pasó por la banda From First to Last antes de convertirse en una de las caras del dubstep. Fundó OWSLA y acumuló varios premios Grammy.",
  Diplo:
    "El productor de Misisipi dirige Mad Decent y es una pieza clave en la difusión del dancehall y el trap electrónico. Forma parte de Major Lazer y Jack Ü.",
  "Major Lazer":
    "El proyecto de Diplo, con distintos colaboradores, llevó el dancehall a las listas globales con Lean On. Su sonido mezcla ritmos caribeños y electrónica.",
  Zedd:
    "El alemán de Kaiserslautern se trasladó a Estados Unidos y ganó un Grammy con Clarity. Su EDM melódica y sus colaboraciones pop lo hicieron global.",
  Kygo:
    "El noruego de Bergen popularizó el tropical house con sus remezclas y con Firestone. Su sonido suave y melódico tuvo una influencia enorme en la segunda mitad de la década.",
  "Alan Walker":
    "El noruego, nacido en Northampton y criado en Bergen, se hizo viral con Fade y Faded. Su imagen con mascarilla forma parte de su identidad artística.",
  Marshmello:
    "El productor mantiene su identidad oculta tras un casco de malvavisco. Su EDM de aire festivo y sus colaboraciones pop lo han convertido en un fenómeno masivo.",
  Alesso:
    "El sueco se formó bajo el ala de Swedish House Mafia y se dio a conocer con Heroes. Su progressive house melódico encaja en los grandes escenarios.",
  "Swedish House Mafia":
    "El trío de Axwell, Ingrosso y Angello definió el progressive house de estadio con One y Don't You Worry Child. Se separó en 2013 y volvió en 2018.",
  Axwell:
    "El sueco es fundador de Axtone y uno de los tres miembros de Swedish House Mafia. Su house luminoso y sus remezclas lo mantienen como referencia.",
  "Sebastian Ingrosso":
    "Miembro de Swedish House Mafia y fundador de Refune, es un nombre central del house sueco. Su trabajo combina producción y dirección de sellos.",
  "Steve Angello":
    "Uno de los tres de Swedish House Mafia y fundador de Size Records. Su estilo une progressive house y un punto de oscuridad que lo distingue.",
  "Eric Prydz":
    "El sueco es célebre por Call On Me y por sus alias Pryda y Cirez D. Sus espectáculos EPIC llevaron la producción visual y el techno a otra escala.",
  Avicii:
    "Tim Bergling, desde Estocolmo, llevó el house melódico a las listas con Levels. Su muerte en 2018 conmocionó a la industria y abrió un debate sobre la salud en la profesión.",
  Kaskade:
    "El estadounidense Ryan Raddon es una de las figuras del house en Estados Unidos. Ha sido nominado al Grammy y mantiene residencias de larga duración.",
  "Above & Beyond":
    "El trío londinense dirige Anjunabeats y el programa Group Therapy. Su trance emocional y sus eventos ABGT reúnen a una comunidad muy fiel.",
  "Ferry Corsten":
    "El holandés fue pionero del trance con System F y temas como Out of the Blue. También impulsó el proyecto Gouryella.",
  "Aly & Fila":
    "El dúo egipcio de El Cairo dirige Future Sound of Egypt y es una referencia del trance uplifting. Su programa de radio se escucha en todo el mundo.",
  "Markus Schulz":
    "Nacido en Alemania y afincado en Miami, dirige Coldharbour y el programa Global DJ Broadcast. Su trance oscuro y progresivo tiene sello propio.",
  "Gareth Emery":
    "El británico fundó Garuda y se dio a conocer con Concrete Angel. Su trance melódico combina energía de festival y letras pop.",
  "Giuseppe Ottaviani":
    "Nacido en Viterbo, viene del grupo Nu NRG y hoy es una referencia del trance en directo. Combina teclados y producción propia sobre el escenario.",
  "Infected Mushroom":
    "El dúo israelí es la cara más internacional del psytrance. Converting Vegetarians mostró su capacidad para salir del esquema del género.",
  Astrix:
    "Avi Shmailov, israelí, es uno de los nombres centrales del psytrance. Su sonido de línea ácida y ritmo rápido lo ha llevado a festivales de todo el mundo.",
  "Vini Vici":
    "El dúo israelí se hizo global con Great Spirit, que acercó el psytrance a públicos más amplios. Su sonido tiene un pulso directo y tribal.",
  "Ace Ventura":
    "El proyecto de Yoni Oshrat es una referencia del psytrance israelí. Publica habitualmente en el sello Iboga y en su propio sello.",
  "Andy C":
    "El londinense es fundador de Ram Records y uno de los grandes nombres del drum & bass. Sus sesiones con tres platos son célebres por su precisión.",
  Goldie:
    "El británico fundó Metalheadz y publicó Timeless, un álbum que llevó el jungle al terreno del arte. Su figura es central en la escena de Bristol y Londres.",
  Noisia:
    "El trío holandés de Thijs, Nik y Martijn fue una referencia técnica del drum & bass. Anunció su separación en 2022 tras más de veinte años de actividad.",
  Pendulum:
    "La banda australiana de Perth llevó el drum & bass al formato de grupo en directo. Hold Your Colour es uno de sus trabajos más reconocidos.",
  Netsky:
    "El belga Boris Daenen se dio a conocer en Hospital Records con un drum & bass líquido y melódico. Su estilo ha acercado el género al público de festival.",
  "Sub Focus":
    "Nick Douwma, londinense, es uno de los productores más reconocibles del drum & bass. Temas como Timewarp lo situaron en la primera línea.",
  "Chase & Status":
    "El dúo londinense mezcla drum & bass con influencias de dubstep y hip hop. More Than Alot los consolidó como una de las propuestas más populares del género.",
  "Roni Size":
    "El británico de Bristol ganó el Mercury Prize con New Forms junto a Reprazent. Su trabajo llevó el drum & bass a la crítica generalista.",
  Bassnectar:
    "El estadounidense Lorin Ashton se hizo un nombre en la escena de la música bass con un sonido de graves profundos. Su carrera se ha visto marcada por la polémica.",
  Excision:
    "El canadiense es una figura del dubstep de festival y creador de Lost Lands. Sus espectáculos destacan por la potencia del sistema de sonido.",
  Zomboy:
    "El británico es un nombre habitual del dubstep de corte agresivo. Su sonido, cargado de graves y sintetizadores duros, circula en sellos como Never Say Die.",
  Angerfist:
    "El holandés Danny Masseling es una de las caras del hardcore y el gabber. Su música, de tempo alto y enorme dureza, domina los carteles de Masters of Hardcore.",
};

// Ubicación documentada de cada DJ, indexada por nombre (nunca por posición).
// Procedencia en "source": cadena QID/PROP/QID de Wikidata, "enwiki:Artículo/campo"
// o "simplewiki:Artículo/campo" cuando el dato viene de Wikipedia, o "ranking:País"
// cuando solo se pudo verificar el país que ya declara el ranking.
// "precision": city (ciudad documentada); country y unknown quedan previstos para
// registros sin ciudad verificable, pero hoy los 100 registros tienen ciudad.
// "basis": birth | formation | activity | citizenship | origin | ranking | none.
const djGeo = {
  "Carl Cox": { city: "Oldham", country: "Reino Unido", lat: 53.545, lon: -2.118, precision: "city", basis: "birth", source: "Q319719/P19/Q202628" },
  "Tiësto": { city: "Breda", country: "Países Bajos", lat: 51.589, lon: 4.776, precision: "city", basis: "birth", source: "Q183508/P19/Q40844" },
  "Armin van Buuren": { city: "Leiden", country: "Países Bajos", lat: 52.16, lon: 4.49, precision: "city", basis: "birth", source: "Q62617/P19/Q43631" },
  "David Guetta": { city: "París", country: "Francia", lat: 48.857, lon: 2.352, precision: "city", basis: "birth", source: "Q8298/P19/Q90" },
  "Calvin Harris": { city: "Dumfries", country: "Reino Unido", lat: 55.067, lon: -3.617, precision: "city", basis: "birth", source: "Q81637/P19/Q652035" },
  "deadmau5": { city: "Niagara Falls", country: "Canadá", lat: 43.117, lon: -79.067, precision: "city", basis: "birth", source: "Q49009/P19/Q274120" },
  "Richie Hawtin": { city: "Banbury", country: "Reino Unido", lat: 52.061, lon: -1.339, precision: "city", basis: "birth", source: "Q378876/P19/Q806160" },
  "Sven Väth": { city: "Obertshausen", country: "Alemania", lat: 50.072, lon: 8.848, precision: "city", basis: "birth", source: "Q61011/P19/Q569628" },
  "Paul van Dyk": { city: "Eisenhüttenstadt", country: "Alemania", lat: 52.147, lon: 14.63, precision: "city", basis: "birth", source: "Q77034/P19/Q16106" },
  "Fatboy Slim": { city: "Bromley", country: "Reino Unido", lat: 51.404, lon: 0.02, precision: "city", basis: "birth", source: "Q272619/P19/Q208201" },
  "The Chemical Brothers": { city: "Mánchester", country: "Reino Unido", lat: 53.479, lon: -2.245, precision: "city", basis: "formation", source: "Q208507/P740/Q18125" },
  "Daft Punk": { city: "París", country: "Francia", lat: 48.857, lon: 2.352, precision: "city", basis: "formation", source: "Q185828/P740/Q90" },
  "Justice": { city: "París", country: "Francia", lat: 48.857, lon: 2.352, precision: "city", basis: "formation", source: "Q329178/P740/Q90" },
  "Aphex Twin": { city: "Limerick", country: "Irlanda", lat: 52.665, lon: -8.624, precision: "city", basis: "birth", source: "Q223161/P19/Q133315" },
  "Laurent Garnier": { city: "Boulogne-Billancourt", country: "Francia", lat: 48.835, lon: 2.241, precision: "city", basis: "birth", source: "Q919069/P19/Q172455" },
  "Jeff Mills": { city: "Detroit", country: "Estados Unidos", lat: 42.332, lon: -83.047, precision: "city", basis: "birth", source: "Q506851/P19/Q12439" },
  "Derrick May": { city: "Detroit", country: "Estados Unidos", lat: 42.332, lon: -83.047, precision: "city", basis: "birth", source: "Q923104/P19/Q12439" },
  "Juan Atkins": { city: "Detroit", country: "Estados Unidos", lat: 42.332, lon: -83.047, precision: "city", basis: "birth", source: "Q366714/P19/Q12439" },
  "Kevin Saunderson": { city: "Brooklyn", country: "Estados Unidos", lat: 40.651, lon: -73.95, precision: "city", basis: "birth", source: "Q923090/P19/Q18419" },
  "Frankie Knuckles": { city: "El Bronx", country: "Estados Unidos", lat: 40.847, lon: -73.873, precision: "city", basis: "birth", source: "Q205322/P19/Q18426" },
  "Larry Levan": { city: "Nueva York", country: "Estados Unidos", lat: 40.713, lon: -74.006, precision: "city", basis: "birth", source: "Q1341804/P19/Q60" },
  "Ron Hardy": { city: "Chicago", country: "Estados Unidos", lat: 41.882, lon: -87.628, precision: "city", basis: "activity", source: "enwiki:Ron_Hardy/activity/Q1297" },
  "Marshall Jefferson": { city: "Chicago", country: "Estados Unidos", lat: 41.882, lon: -87.628, precision: "city", basis: "birth", source: "Q1351604/P19/Q1297" },
  "Larry Heard": { city: "Chicago", country: "Estados Unidos", lat: 41.882, lon: -87.628, precision: "city", basis: "birth", source: "Q1375814/P19/Q1297" },
  "Kerri Chandler": { city: "East Orange", country: "Estados Unidos", lat: 40.766, lon: -74.212, precision: "city", basis: "birth", source: "Q549373/P19/Q988515" },
  "Masters at Work": { city: "Nueva York", country: "Estados Unidos", lat: 40.713, lon: -74.006, precision: "city", basis: "formation", source: "enwiki:Masters_at_Work/origin/Q60" },
  "Louie Vega": { city: "Nueva York", country: "Estados Unidos", lat: 40.713, lon: -74.006, precision: "city", basis: "birth", source: "Q3256698/P19/Q60" },
  "Danny Tenaglia": { city: "Nueva York", country: "Estados Unidos", lat: 40.713, lon: -74.006, precision: "city", basis: "birth", source: "Q1164771/P19/Q60" },
  "Roger Sanchez": { city: "Nueva York", country: "Estados Unidos", lat: 40.713, lon: -74.006, precision: "city", basis: "birth", source: "Q714423/P19/Q60" },
  "Erick Morillo": { city: "Nueva York", country: "Estados Unidos", lat: 40.713, lon: -74.006, precision: "city", basis: "birth", source: "Q739896/P19/Q60" },
  "Steve Lawler": { city: "Birmingham", country: "Reino Unido", lat: 52.48, lon: -1.903, precision: "city", basis: "birth", source: "Q4267441/P19/Q2256" },
  "Loco Dice": { city: "Túnez", country: "Túnez", lat: 36.801, lon: 10.18, precision: "city", basis: "birth", source: "Q1867690/P19/Q3572" },
  "Marco Carola": { city: "Nápoles", country: "Italia", lat: 40.836, lon: 14.249, precision: "city", basis: "birth", source: "Q1498245/P19/Q2634" },
  "Jamie Jones": { city: "Bontnewydd", country: "Reino Unido", lat: 53.117, lon: -4.268, precision: "city", basis: "activity", source: "enwiki:Jamie_Jones_(DJ)/origin/Q3396864" },
  "Michael Bibi": { city: "Londres", country: "Reino Unido", lat: 51.507, lon: -0.128, precision: "city", basis: "origin", source: "enwiki:Michael_Bibi/grew_up_in/Q84" },
  "Pawsa": { city: "Londres", country: "Reino Unido", lat: 51.507, lon: -0.128, precision: "city", basis: "origin", source: "enwiki:PAWSA/from/Q84" },
  "Fisher": { city: "Gold Coast", country: "Australia", lat: -28.017, lon: 153.4, precision: "city", basis: "birth", source: "Q59539013/P19/Q140075" },
  "Chris Lake": { city: "Aberdeen", country: "Reino Unido", lat: 57.15, lon: -2.1, precision: "city", basis: "birth", source: "Q958543/P19/Q36405" },
  "Green Velvet": { city: "Chicago", country: "Estados Unidos", lat: 41.882, lon: -87.628, precision: "city", basis: "birth", source: "Q1544666/P19/Q1297" },
  "Dubfire": { city: "Shiraz", country: "Irán", lat: 29.61, lon: 52.531, precision: "city", basis: "birth", source: "Q741060/P19/Q6397066" },
  "Adam Beyer": { city: "Estocolmo", country: "Suecia", lat: 59.329, lon: 18.069, precision: "city", basis: "birth", source: "Q261641/P19/Q1754" },
  "Charlotte de Witte": { city: "Gante", country: "Bélgica", lat: 51.054, lon: 3.725, precision: "city", basis: "birth", source: "Q22668666/P19/Q1296" },
  "Amelie Lens": { city: "Vilvoorde", country: "Bélgica", lat: 50.928, lon: 4.424, precision: "city", basis: "birth", source: "Q27902902/P19/Q318418" },
  "Nina Kraviz": { city: "Irkutsk", country: "Rusia", lat: 52.289, lon: 104.28, precision: "city", basis: "birth", source: "Q14829032/P19/Q6576" },
  "Tale of Us": { city: "Milán", country: "Italia", lat: 45.467, lon: 9.19, precision: "city", basis: "formation", source: "enwiki:Tale_of_Us/formed_in/Q490" },
  "Adriatique": { city: "Zúrich", country: "Suiza", lat: 47.374, lon: 8.541, precision: "city", basis: "formation", source: "enwiki:Adriatique/origin/Q72" },
  "Artbat": { city: "Kiev", country: "Ucrania", lat: 50.45, lon: 30.524, precision: "city", basis: "formation", source: "Q114036382/P740/Q1899" },
  "Stephan Bodzin": { city: "Bremen", country: "Alemania", lat: 53.076, lon: 8.807, precision: "city", basis: "birth", source: "Q75361/P19/Q24879" },
  "Solomun": { city: "Travnik", country: "Bosnia y Herzegovina", lat: 44.225, lon: 17.667, precision: "city", basis: "birth", source: "Q1941178/P19/Q159818" },
  "Dixon": { city: "Anklam", country: "Alemania", lat: 53.85, lon: 13.683, precision: "city", basis: "birth", source: "Q3032635/P19/Q488513" },
  "Âme": { city: "Karlsruhe", country: "Alemania", lat: 49.007, lon: 8.404, precision: "city", basis: "origin", source: "enwiki:Âme/hometown/Q1040" },
  "Ben Klock": { city: "Schöneberg", country: "Alemania", lat: 52.483, lon: 13.35, precision: "city", basis: "birth", source: "Q816535/P19/Q313189" },
  "Marcel Dettmann": { city: "Pößneck", country: "Alemania", lat: 50.7, lon: 11.6, precision: "city", basis: "birth", source: "Q16574452/P19/Q505185" },
  "Boris Brejcha": { city: "Ludwigshafen", country: "Alemania", lat: 49.481, lon: 8.435, precision: "city", basis: "birth", source: "Q27666713/P19/Q2910" },
  "Paul Kalkbrenner": { city: "Leipzig", country: "Alemania", lat: 51.341, lon: 12.375, precision: "city", basis: "birth", source: "Q48613/P19/Q2079" },
  "Oliver Heldens": { city: "Róterdam", country: "Países Bajos", lat: 51.92, lon: 4.48, precision: "city", basis: "birth", source: "Q16667903/P19/Q34370" },
  "Don Diablo": { city: "Coevorden", country: "Países Bajos", lat: 52.667, lon: 6.75, precision: "city", basis: "birth", source: "Q2464558/P19/Q60453" },
  "Tchami": { city: "París", country: "Francia", lat: 48.857, lon: 2.352, precision: "city", basis: "birth", source: "Q17151338/P19/Q90" },
  "Martin Garrix": { city: "Amstelveen", country: "Países Bajos", lat: 52.302, lon: 4.858, precision: "city", basis: "birth", source: "Q14544318/P19/Q9898" },
  "Hardwell": { city: "Breda", country: "Países Bajos", lat: 51.589, lon: 4.776, precision: "city", basis: "birth", source: "Q923731/P19/Q40844" },
  "Afrojack": { city: "Spijkenisse", country: "Países Bajos", lat: 51.833, lon: 4.317, precision: "city", basis: "birth", source: "Q349041/P19/Q488545" },
  "Dimitri Vegas & Like Mike": { city: "Willebroek", country: "Bélgica", lat: 51.06, lon: 4.358, precision: "city", basis: "formation", source: "Q5807252/P740/Q695278" },
  "Steve Aoki": { city: "Miami", country: "Estados Unidos", lat: 25.774, lon: -80.194, precision: "city", basis: "birth", source: "Q459955/P19/Q8652" },
  "Skrillex": { city: "Los Ángeles", country: "Estados Unidos", lat: 34.052, lon: -118.244, precision: "city", basis: "birth", source: "Q19004/P19/Q65" },
  "Diplo": { city: "Tupelo", country: "Estados Unidos", lat: 34.258, lon: -88.703, precision: "city", basis: "birth", source: "Q533781/P19/Q667727" },
  "Major Lazer": { city: "Los Ángeles", country: "Estados Unidos", lat: 34.052, lon: -118.244, precision: "city", basis: "formation", source: "Q2604214/P740/Q65" },
  "Zedd": { city: "Sarátov", country: "Rusia", lat: 51.53, lon: 46.035, precision: "city", basis: "birth", source: "Q21088/P19/Q5332" },
  "Kygo": { city: "Singapur", country: "Singapur", lat: 1.3, lon: 103.8, precision: "city", basis: "birth", source: "Q16845512/P19/Q334" },
  "Alan Walker": { city: "Northampton", country: "Reino Unido", lat: 52.233, lon: -0.9, precision: "city", basis: "birth", source: "Q21808729/P19/Q192240" },
  "Marshmello": { city: "Filadelfia", country: "Estados Unidos", lat: 39.953, lon: -75.164, precision: "city", basis: "birth", source: "Q26334949/P19/Q1345" },
  "Alesso": { city: "Estocolmo", country: "Suecia", lat: 59.329, lon: 18.069, precision: "city", basis: "birth", source: "Q965455/P19/Q1754" },
  "Swedish House Mafia": { city: "Estocolmo", country: "Suecia", lat: 59.329, lon: 18.069, precision: "city", basis: "formation", source: "Q20709/P740/Q1754" },
  "Axwell": { city: "Lund", country: "Suecia", lat: 55.708, lon: 13.199, precision: "city", basis: "birth", source: "Q20713/P19/Q2167" },
  "Sebastian Ingrosso": { city: "Estocolmo", country: "Suecia", lat: 59.329, lon: 18.069, precision: "city", basis: "birth", source: "Q20717/P19/Q1754" },
  "Steve Angello": { city: "Atenas", country: "Grecia", lat: 37.984, lon: 23.728, precision: "city", basis: "birth", source: "Q20715/P19/Q1524" },
  "Eric Prydz": { city: "Täby", country: "Suecia", lat: 59.433, lon: 18.083, precision: "city", basis: "birth", source: "Q155141/P19/Q54337" },
  "Avicii": { city: "Estocolmo", country: "Suecia", lat: 59.329, lon: 18.069, precision: "city", basis: "birth", source: "Q505476/P19/Q1754" },
  "Kaskade": { city: "Evanston", country: "Estados Unidos", lat: 42.047, lon: -87.685, precision: "city", basis: "birth", source: "Q595529/P19/Q462799" },
  "Above & Beyond": { city: "Londres", country: "Reino Unido", lat: 51.507, lon: -0.128, precision: "city", basis: "formation", source: "Q323187/P740/Q84" },
  "Ferry Corsten": { city: "Róterdam", country: "Países Bajos", lat: 51.92, lon: 4.48, precision: "city", basis: "birth", source: "Q311157/P19/Q34370" },
  "Aly & Fila": { city: "El Cairo", country: "Egipto", lat: 30.044, lon: 31.236, precision: "city", basis: "formation", source: "Q449985/P740/Q85" },
  "Markus Schulz": { city: "Eschwege", country: "Alemania", lat: 51.188, lon: 10.053, precision: "city", basis: "birth", source: "Q57784/P19/Q1468" },
  "Gareth Emery": { city: "Southampton", country: "Reino Unido", lat: 50.907, lon: -1.404, precision: "city", basis: "birth", source: "Q555552/P19/Q79848" },
  "Giuseppe Ottaviani": { city: "Viterbo", country: "Italia", lat: 42.419, lon: 12.104, precision: "city", basis: "birth", source: "Q954477/P19/Q13395" },
  "Infected Mushroom": { city: "Haifa", country: "Israel", lat: 32.819, lon: 34.999, precision: "city", basis: "formation", source: "Q548994/P740/Q41621" },
  "Astrix": { city: "Tel Aviv", country: "Israel", lat: 32.08, lon: 34.78, precision: "city", basis: "activity", source: "enwiki:Astrix/origin/Q33935" },
  "Vini Vici": { city: "Afula", country: "Israel", lat: 32.608, lon: 35.29, precision: "city", basis: "origin", source: "enwiki:Vini_Vici/origin/Q152462" },
  "Ace Ventura": { city: "Zúrich", country: "Suiza", lat: 47.374, lon: 8.541, precision: "city", basis: "activity", source: "simplewiki:Ace_Ventura_(musician)/lives_in/Q72" },
  "Andy C": { city: "Walsall", country: "Reino Unido", lat: 52.58, lon: -1.98, precision: "city", basis: "birth", source: "Q387288/P19/Q504530" },
  "Goldie": { city: "Walsall", country: "Reino Unido", lat: 52.58, lon: -1.98, precision: "city", basis: "birth", source: "Q507845/P19/Q504530" },
  "Noisia": { city: "Groninga", country: "Países Bajos", lat: 53.219, lon: 6.567, precision: "city", basis: "formation", source: "Q47227/P740/Q749" },
  "Pendulum": { city: "Perth", country: "Australia", lat: -31.956, lon: 115.86, precision: "city", basis: "formation", source: "Q20672/P740/Q3183" },
  "Netsky": { city: "Edegem", country: "Bélgica", lat: 51.155, lon: 4.446, precision: "city", basis: "birth", source: "Q44399/P19/Q724238" },
  "Sub Focus": { city: "Guildford", country: "Reino Unido", lat: 51.235, lon: -0.575, precision: "city", basis: "birth", source: "Q1848854/P19/Q213465" },
  "Chase & Status": { city: "Londres", country: "Reino Unido", lat: 51.507, lon: -0.128, precision: "city", basis: "formation", source: "Q1067983/P740/Q84" },
  "Roni Size": { city: "Bristol", country: "Reino Unido", lat: 51.454, lon: -2.598, precision: "city", basis: "birth", source: "Q964002/P19/Q23154" },
  "Bassnectar": { city: "Santa Cruz", country: "Estados Unidos", lat: 36.972, lon: -122.026, precision: "city", basis: "birth", source: "enwiki:Bassnectar/birth_place/Q159232" },
  "Excision": { city: "Kelowna", country: "Canadá", lat: 49.88, lon: -119.444, precision: "city", basis: "birth", source: "Q390963/P19/Q232226" },
  "Zomboy": { city: "Penzance", country: "Reino Unido", lat: 50.121, lon: -5.537, precision: "city", basis: "birth", source: "Q14546605/P19/Q208209" },
  "Angerfist": { city: "Denekamp", country: "Países Bajos", lat: 52.379, lon: 7.009, precision: "city", basis: "birth", source: "Q318760/P19/Q3022448" },
};

// Referencias a los elementos del HTML
const searchInput = document.getElementById("search");
const genreSelect = document.getElementById("genre");
const countrySelect = document.getElementById("country");
const resetWrapper = document.getElementById("resetWrapper");
const resetButton = document.getElementById("resetFilters");
const grid = document.getElementById("djGrid");
const resultsInfo = document.getElementById("resultsInfo");
const emptyState = document.getElementById("emptyState");

const statTotal = document.getElementById("statTotal");
const statGenres = document.getElementById("statGenres");
const statTopGenre = document.getElementById("statTopGenre");
const statTopGenreHint = document.getElementById("statTopGenreHint");
const statCountries = document.getElementById("statCountries");
const genreBars = document.getElementById("genreBars");
const decadeBars = document.getElementById("decadeBars");
const decadeNotice = document.getElementById("decadeNotice");
const genrePanelHint = document.getElementById("genrePanelHint");
const decadePanelHint = document.getElementById("decadePanelHint");

const detailDialog = document.getElementById("djDetail");
const detailRank = document.getElementById("detailRank");
const detailBack = document.getElementById("detailBack");
const detailPhoto = document.getElementById("detailPhoto");
const detailName = document.getElementById("detailName");
const detailFacts = document.getElementById("detailFacts");
const detailBio = document.getElementById("detailBio");
const detailBioText = document.getElementById("detailBioText");
const detailContext = document.getElementById("detailContext");
let lastTriggerPosition = null;
// Elemento que abrió la ficha cuando no es una tarjeta (un marcador del mapa).
let lastTriggerElement = null;

// Evita que caracteres especiales rompan el HTML generado.
// (Por ejemplo, el "&" de "Chase & Status".)
// Las comillas también se escapan: la función se usa dentro de atributos
// (alt, aria-label), donde un nombre con " cerraría el valor.
function escapeHTML(text) {
  return String(text ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Quita mayúsculas y acentos para que "tiesto" encuentre "Tiësto".
function normalize(text) {
  return String(text ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

// Convierte una búsqueda en palabras sin acentos ni puntuación.
// Así "Chase Status" encuentra "Chase & Status" y "Aly Fila" encuentra "Aly & Fila".
function searchTokens(text) {
  return normalize(text)
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

// Cuenta cuántos elementos hay por cada valor de un campo.
// Devuelve pares [valor, cantidad] ordenados de mayor a menor.
function countBy(items, field) {
  const counts = new Map();

  items.forEach((item) => {
    const value = item[field];
    if (value === null || value === undefined || value === "") return;
    counts.set(value, (counts.get(value) || 0) + 1);
  });

  return [...counts.entries()].sort(
    (a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "es")
  );
}

// Porcentaje con un decimal y coma decimal española.
function formatPercent(count, total) {
  return `${((count / total) * 100).toFixed(1).replace(".", ",")} %`;
}

// "1 DJ" / "2 DJs": un solo artista no lleva plural.
function djUnit(count) {
  return count === 1 ? "DJ" : "DJs";
}

// Rellena un desplegable con los valores recibidos, sin duplicados.
function fillSelect(select, values) {
  values.forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    select.appendChild(option);
  });
}

// Opciones de género y país a partir de los datos.
function fillFilterOptions() {
  fillSelect(
    genreSelect,
    [...new Set(djs.map((dj) => dj.genre))].sort((a, b) =>
      a.localeCompare(b, "es")
    )
  );

  fillSelect(
    countrySelect,
    [...new Set(djs.map((dj) => dj.country))].sort((a, b) =>
      a.localeCompare(b, "es")
    )
  );
}

// Banderas en SVG (dibujadas a mano, sin archivos ni conexión).
// Se usan a 18 × 12 px junto al nombre del país en la tarjeta y a
// 22 × 15 px en la ficha individual.
const countryFlags = {
  "Estados Unidos":
    '<svg viewBox="0 0 60 40"><rect width="60" height="40" fill="#fff"/><g fill="#b22234"><rect width="60" height="3.1"/><rect y="6.2" width="60" height="3.1"/><rect y="12.3" width="60" height="3.1"/><rect y="18.5" width="60" height="3.1"/><rect y="24.6" width="60" height="3.1"/><rect y="30.8" width="60" height="3.1"/><rect y="36.9" width="60" height="3.1"/></g><rect width="26" height="21.6" fill="#3c3b6e"/><g fill="#fff"><circle cx="4" cy="4" r="1.1"/><circle cx="11" cy="4" r="1.1"/><circle cx="18" cy="4" r="1.1"/><circle cx="7.5" cy="9" r="1.1"/><circle cx="14.5" cy="9" r="1.1"/><circle cx="21.5" cy="9" r="1.1"/><circle cx="4" cy="14" r="1.1"/><circle cx="11" cy="14" r="1.1"/><circle cx="18" cy="14" r="1.1"/><circle cx="7.5" cy="18.5" r="1.1"/><circle cx="14.5" cy="18.5" r="1.1"/></g></svg>',
  "Reino Unido":
    '<svg viewBox="0 0 60 40"><rect width="60" height="40" fill="#012169"/><path d="M0 0 60 40M60 0 0 40" stroke="#fff" stroke-width="8"/><path d="M0 0 60 40M60 0 0 40" stroke="#c8102e" stroke-width="4"/><path d="M30 0v40M0 20h60" stroke="#fff" stroke-width="13"/><path d="M30 0v40M0 20h60" stroke="#c8102e" stroke-width="7.5"/></svg>',
  Alemania:
    '<svg viewBox="0 0 60 40"><rect width="60" height="13.3" fill="#000"/><rect y="13.3" width="60" height="13.3" fill="#dd0000"/><rect y="26.6" width="60" height="13.4" fill="#ffce00"/></svg>',
  "Países Bajos":
    '<svg viewBox="0 0 60 40"><rect width="60" height="13.3" fill="#ae1c28"/><rect y="13.3" width="60" height="13.3" fill="#fff"/><rect y="26.6" width="60" height="13.4" fill="#21468b"/></svg>',
  Suecia:
    '<svg viewBox="0 0 60 40"><rect width="60" height="40" fill="#006aa7"/><rect x="18" width="7" height="40" fill="#fecc00"/><rect y="16.5" width="60" height="7" fill="#fecc00"/></svg>',
  Francia:
    '<svg viewBox="0 0 60 40"><rect width="20" height="40" fill="#0055a4"/><rect x="20" width="20" height="40" fill="#fff"/><rect x="40" width="20" height="40" fill="#ef4135"/></svg>',
  Bélgica:
    '<svg viewBox="0 0 60 40"><rect width="20" height="40" fill="#000"/><rect x="20" width="20" height="40" fill="#fdda24"/><rect x="40" width="20" height="40" fill="#ef3340"/></svg>',
  Israel:
    '<svg viewBox="0 0 60 40"><rect width="60" height="40" fill="#fff"/><rect width="60" height="4.5" fill="#0038b8"/><rect y="35.5" width="60" height="4.5" fill="#0038b8"/><path d="M30 12.5 37 25H23Z M30 27.5 23 15h14Z" fill="none" stroke="#0038b8" stroke-width="2"/></svg>',
  Canadá:
    '<svg viewBox="0 0 60 40"><rect width="60" height="40" fill="#fff"/><rect width="15" height="40" fill="#d80621"/><rect x="45" width="15" height="40" fill="#d80621"/><path d="M30 8.5l1.9 4.6 3-1.1-.7 3.3 3.7-.7-2.1 3.1 4.1 1.9-3.2 2.2 1.6 2-3.9.3.7 4.3-3.4-1.9-.5 4.3h-1.4l-.5-4.3-3.4 1.9.7-4.3-3.9-.3 1.6-2-3.2-2.2 4.1-1.9-2.1-3.1 3.7.7-.7-3.3 3 1.1z" fill="#d80621"/></svg>',
  Italia:
    '<svg viewBox="0 0 60 40"><rect width="20" height="40" fill="#009246"/><rect x="20" width="20" height="40" fill="#fff"/><rect x="40" width="20" height="40" fill="#ce2b37"/></svg>',
  Australia:
    '<svg viewBox="0 0 60 40"><rect width="60" height="40" fill="#00247d"/><svg x="0" y="0" width="30" height="20" viewBox="0 0 30 20"><rect width="30" height="20" fill="#00247d"/><path d="M0 0 30 20M30 0 0 20" stroke="#fff" stroke-width="4"/><path d="M0 0 30 20M30 0 0 20" stroke="#cf142b" stroke-width="2"/><path d="M15 0v20M0 10h30" stroke="#fff" stroke-width="6"/><path d="M15 0v20M0 10h30" stroke="#cf142b" stroke-width="3"/></svg><g fill="#fff"><circle cx="42" cy="7" r="1.7"/><circle cx="50" cy="15" r="1.7"/><circle cx="39" cy="23" r="1.7"/><circle cx="51" cy="27" r="1.7"/><circle cx="45" cy="33" r="1.7"/><circle cx="47" cy="20" r="1"/><circle cx="43" cy="13" r=".9"/></g></svg>',
  Noruega:
    '<svg viewBox="0 0 60 40"><rect width="60" height="40" fill="#ba0c2f"/><rect x="15" width="9" height="40" fill="#fff"/><rect y="15.5" width="60" height="9" fill="#fff"/><rect x="18" width="3" height="40" fill="#00205b"/><rect y="18.5" width="60" height="3" fill="#00205b"/></svg>',
  Rusia:
    '<svg viewBox="0 0 60 40"><rect width="60" height="13.3" fill="#fff"/><rect y="13.3" width="60" height="13.3" fill="#0039a6"/><rect y="26.6" width="60" height="13.4" fill="#d52b1e"/></svg>',
  Suiza:
    '<svg viewBox="0 0 60 40"><rect width="60" height="40" fill="#d52b1e"/><rect x="26" y="9" width="8" height="22" fill="#fff"/><rect x="19" y="16" width="22" height="8" fill="#fff"/></svg>',
  Ucrania:
    '<svg viewBox="0 0 60 40"><rect width="60" height="20" fill="#0057b7"/><rect y="20" width="60" height="20" fill="#ffd700"/></svg>',
  "Bosnia y Herzegovina":
    '<svg viewBox="0 0 60 40"><rect width="60" height="40" fill="#002f6c"/><path d="M15 0h45v40z" fill="#fecb00"/><g fill="#fff"><circle cx="18" cy="3" r="1.6"/><circle cx="24" cy="8" r="1.6"/><circle cx="30" cy="13" r="1.6"/><circle cx="36" cy="18" r="1.6"/><circle cx="42" cy="23" r="1.6"/><circle cx="48" cy="28" r="1.6"/><circle cx="54" cy="33" r="1.6"/></g></svg>',
  Egipto:
    '<svg viewBox="0 0 60 40"><rect width="60" height="13.3" fill="#ce1126"/><rect y="13.3" width="60" height="13.3" fill="#fff"/><rect y="26.6" width="60" height="13.4" fill="#000"/><path d="M30 16l4.5 7h-9z" fill="#c09300"/></svg>',
};

// Devuelve la bandera de un país o cadena vacía si no existe.
function getFlag(country) {
  return countryFlags[country] || "";
}

// Crea el HTML de una tarjeta a partir de un DJ.
// Las fotos se llaman 001.jpg, 002.jpg... y están en la carpeta "images".
function createCard(dj) {
  const photoNumber = String(dj.position).padStart(3, "0");
  const country = dj.country || "Sin país";
  const flag = getFlag(dj.country);

  return `
    <article class="card">
      <div class="card__head">
        <span class="card__rank"><span aria-hidden="true">${photoNumber}</span><span class="sr-only">Puesto ${dj.position} de ${djs.length}</span></span>
        <span class="card__genre">${escapeHTML(dj.genre)}</span>
      </div>
      <button
        class="card__media"
        type="button"
        data-position="${dj.position}"
        aria-label="Ver ficha de ${escapeHTML(dj.name)}"
      >
        <img
          class="card__photo"
          src="images/${photoNumber}.jpg"
          alt=""
          loading="lazy"
          width="600"
          height="600"
        />
      </button>
      <div class="card__body">
        <h3 class="card__name">${escapeHTML(dj.name)}</h3>
        <p class="card__country">
          ${flag ? `<span class="flag" aria-hidden="true">${flag}</span>` : ""}
          <span>${escapeHTML(country)}</span>
        </p>
      </div>
    </article>
  `;
}

// Filas de la ficha individual. Solo los datos que el ranking tiene
// documentados: el año de inicio se omite cuando no está verificado.
function createDetail(dj) {
  const flag = getFlag(dj.country);
  const rows = [];

  rows.push(`
      <div class="detail__row">
        <dt class="detail__label">País</dt>
        <dd class="detail__value">
          ${flag ? `<span class="flag" aria-hidden="true">${flag}</span>` : ""}
          <span>${escapeHTML(dj.country)}</span>
        </dd>
      </div>
  `);

  rows.push(`
      <div class="detail__row">
        <dt class="detail__label">Género</dt>
        <dd class="detail__value"><span>${escapeHTML(dj.genre)}</span></dd>
      </div>
  `);

  if (Number.isInteger(dj.debutYear)) {
    rows.push(`
      <div class="detail__row">
        <dt class="detail__label">Inicio</dt>
        <dd class="detail__value"><span>${dj.debutYear}</span></dd>
      </div>
    `);
  }

  return rows.join("");
}

// Una barra horizontal con nombre, cantidad y porcentaje.
function createBar(label, count, total) {
  const percent = (count / total) * 100;

  return `
    <li class="bar">
      <div class="bar__head">
        <span class="bar__label">${escapeHTML(label)}</span>
        <span class="bar__value">${count} ${djUnit(count)} · ${formatPercent(count, total)}</span>
      </div>
      <div class="bar__track">
        <span class="bar__fill" style="width: ${percent.toFixed(2)}%"></span>
      </div>
    </li>
  `;
}

// Abre la ficha de un DJ. No vuelve a pintar el listado ni toca los filtros:
// solo rellena el diálogo y lo muestra modal.
// `triggerEl` es opcional: lo usa el mapa para recuperar el foco en el marcador
// al cerrar; las tarjetas siguen llamando solo con la posición.
function openDetail(position, triggerEl) {
  const dj = djs.find((d) => d.position === position);
  if (!dj) return;

  lastTriggerPosition = position;
  lastTriggerElement = triggerEl || null;

  detailName.textContent = dj.name;
  detailPhoto.src = "images/" + String(dj.position).padStart(3, "0") + ".jpg";
  detailPhoto.alt = "Foto de " + dj.name;
  // El número visible lleva ceros de relleno; el lector de pantalla recibe
  // el puesto en palabras ("Puesto 42 de 100") en lugar de "cero cuarenta y dos".
  const detailNum = String(dj.position).padStart(3, "0");
  detailRank.innerHTML =
    `<span aria-hidden="true">${detailNum}/${djs.length}</span>` +
    `<span class="sr-only">Puesto ${dj.position} de ${djs.length}</span>`;
  detailFacts.innerHTML = createDetail(dj);

  // La reseña es texto editorial, no un dato del ranking: se inserta con
  // textContent y se oculta si el DJ no tiene entrada en djBios.
  const bio = djBios[dj.name] || "";
  detailBioText.textContent = bio;
  detailBio.hidden = bio === "";

  // Recuentos sobre el ranking completo, no sobre los resultados filtrados.
  const mismoGenero = djs.filter((d) => d.genre === dj.genre).length;
  const mismoPais = djs.filter((d) => d.country === dj.country).length;
  detailContext.textContent =
    `${mismoGenero} ${mismoGenero === 1 ? "DJ comparte" : "DJs comparten"} este género · ` +
    `${mismoPais} ${mismoPais === 1 ? "es" : "son"} de ${dj.country}`;

  // El hueco de la barra de desplazamiento se mide antes de bloquear el fondo.
  const gap = window.innerWidth - document.documentElement.clientWidth;
  document.documentElement.style.setProperty("--scrollbar-gap", gap + "px");
  document.documentElement.classList.add("detail-open");

  if (!detailDialog.open) detailDialog.showModal();

  detailBack.focus({ preventScroll: true });
}

// Cierra la ficha. El estado del fondo se restaura en el evento "close".
function closeDetail() {
  if (detailDialog.open) detailDialog.close();
}

// Tarjetas resumen del dashboard.
function renderStats() {
  const genreCounts = countBy(djs, "genre");
  const countryCounts = countBy(djs, "country");
  const topGenre = genreCounts[0];

  statTotal.textContent = djs.length;
  statGenres.textContent = genreCounts.length;
  statCountries.textContent = countryCounts.length;

  if (topGenre) {
    statTopGenre.textContent = topGenre[0];
    statTopGenreHint.textContent = `${topGenre[1]} ${djUnit(topGenre[1])} · ${formatPercent(
      topGenre[1],
      djs.length
    )}`;
  }
}

// Barras por género musical.
function renderGenreDistribution() {
  const genreCounts = countBy(djs, "genre");

  genreBars.innerHTML = genreCounts
    .map(([genre, count]) => createBar(genre, count, djs.length))
    .join("");

  genrePanelHint.textContent = genreCounts.length
    ? `${genreCounts.length} géneros · ${genreCounts[0][0]} lidera`
    : "Sin datos";
}

// Barras por década de inicio de carrera.
// Solo se usan los DJs con año documentado; el resto se indica aparte.
function renderDecadeDistribution() {
  const withYear = djs.filter((dj) => Number.isInteger(dj.debutYear));
  const byDecade = new Map();

  withYear.forEach((dj) => {
    const decade = Math.floor(dj.debutYear / 10) * 10;
    byDecade.set(decade, (byDecade.get(decade) || 0) + 1);
  });

  const entries = [...byDecade.entries()].sort((a, b) => a[0] - b[0]);

  decadeNotice.hidden = false;

  if (entries.length === 0) {
    decadeBars.innerHTML = "";
    decadePanelHint.textContent = "Sin datos";
    decadeNotice.textContent =
      "Esta estadística todavía no está disponible: no hay años de inicio de carrera documentados.";
    return;
  }

  decadeBars.innerHTML = entries
    .map(([decade, count]) =>
      createBar(`Años ${decade}`, count, djs.length)
    )
    .join("");

  decadePanelHint.textContent = `${entries.length} décadas · ${withYear.length} de ${djs.length} con año`;

  decadeNotice.textContent = `Año de inicio documentado en ${
    withYear.length
  } de ${djs.length} DJs. El porcentaje se calcula sobre el total del ranking.`;
}

// Aplica los filtros activos, pinta las tarjetas y actualiza los mensajes.
function render() {
  const tokens = searchTokens(searchInput.value);
  const selectedGenre = genreSelect.value;
  const selectedCountry = countrySelect.value;
  // Se considera que hay filtro solo si el buscador produjo alguna palabra:
  // así escribir solo signos ("&", "...") no muestra un botón que no limpia nada.
  const hasFilters =
    tokens.length > 0 || selectedGenre !== "" || selectedCountry !== "";

  const filtered = djs.filter((dj) => {
    const searchableName = normalize(dj.name);
    const matchesName = tokens.every((token) => searchableName.includes(token));
    const matchesGenre = selectedGenre === "" || dj.genre === selectedGenre;
    const matchesCountry =
      selectedCountry === "" || dj.country === selectedCountry;
    return matchesName && matchesGenre && matchesCountry;
  });

  grid.innerHTML = filtered.map(createCard).join("");

  // Sin aria-label sobre #djGrid: un div sin rol no expone nombre accesible
  // en la mayoría de lectores. La sección ya se anuncia por su <h2> y el
  // recuento llega por #resultsInfo (aria-live), así que aquí sobraba.

  resultsInfo.textContent = `Mostrando ${filtered.length} de ${djs.length} DJs`;
  emptyState.hidden = filtered.length !== 0;
  resetWrapper.hidden = !hasFilters;
}

// Devuelve los tres filtros a su estado inicial.
function resetFilters() {
  searchInput.value = "";
  genreSelect.value = "";
  countrySelect.value = "";
  render();
  searchInput.focus();
}

// Eventos: buscamos mientras se escribe y al cambiar los filtros.
searchInput.addEventListener("input", render);
genreSelect.addEventListener("change", render);
countrySelect.addEventListener("change", render);
resetButton.addEventListener("click", resetFilters);

// Ficha individual: apertura desde la tarjeta y cierre con las tres salidas.
grid.addEventListener("click", (event) => {
  const trigger = event.target.closest(".card__media");
  if (!trigger) return;
  openDetail(Number(trigger.dataset.position));
});

detailBack.addEventListener("click", closeDetail);

detailDialog.addEventListener("click", (event) => {
  if (event.target === detailDialog) closeDetail();
});

detailDialog.addEventListener("close", () => {
  document.documentElement.classList.remove("detail-open");
  document.documentElement.style.removeProperty("--scrollbar-gap");

  // Primero el disparador explícito (marcador del mapa) si sigue en la página;
  // si no, la foto de la tarjeta, como hasta ahora.
  const explicit = lastTriggerElement;
  lastTriggerElement = null;

  if (explicit && document.contains(explicit)) {
    explicit.focus({ preventScroll: true });
    return;
  }

  const trigger = grid.querySelector(
    '.card__media[data-position="' + lastTriggerPosition + '"]'
  );
  if (trigger) trigger.focus({ preventScroll: true });
  else grid.focus();
});

// Arranque de la aplicación
fillFilterOptions();
renderStats();
renderGenreDistribution();
renderDecadeDistribution();
render();

/* ============================================================
   Mapa global de la música electrónica
   Sistema independiente del listado: no llama a render() y no toca
   #djGrid, #resultsInfo ni los filtros superiores. Solo lee `djs`
   (puesto y país del ranking) y `djGeo` (ubicación documentada).
   ============================================================ */

// Proyección Miller sobre el lienzo de 1000 × 500 unidades del viewBox.
// Es la misma con la que se proyectó el path de Natural Earth.
const MAP_W = 1000;
const MAP_H = 500;
const MAP_RAD = Math.PI / 180;
const millerY = (lat) =>
  1.25 * Math.log(Math.tan(Math.PI / 4 + 0.4 * lat * MAP_RAD));
const MAP_YMAX = millerY(90);
const mapX = (lon) => ((lon + 180) / 360) * MAP_W;
const mapY = (lat) => ((MAP_YMAX - millerY(lat)) / (2 * MAP_YMAX)) * MAP_H;

const MAP_CELL = 26; // lado de la celda de agrupación, en unidades del viewBox
const MAP_K_MIN = 1;
const MAP_K_MAX = 6;

const mapSearchInput = document.getElementById("mapSearch");
const mapCountrySelect = document.getElementById("mapCountry");
const mapSvg = document.getElementById("mapSvg");
const mapGraticule = document.getElementById("mapGraticule");
const mapWorld = document.getElementById("mapWorld");
const mapMarkers = document.getElementById("mapMarkers");
const mapZoomInButton = document.getElementById("mapZoomIn");
const mapZoomOutButton = document.getElementById("mapZoomOut");
const mapPanel = document.getElementById("mapPanel");
const mapSummary = document.getElementById("mapSummary");
const mapLive = document.getElementById("mapLive");
const mapCountryList = document.getElementById("mapCountries");

// Estado del mapa. Es independiente del estado de los filtros del listado.
let mapK = 1;
let mapTX = 0;
let mapTY = 0;
let mapSelected = null;
let mapQuery = "";
let mapCountry = "all";
let mapFocusIdx = 0;

// Contenido actual del panel lateral. Sirve para invalidarlo cuando el zoom,
// los filtros o la agrupación dejan de corresponder con lo que muestra.
let mapPanelKind = "default"; // "default" | "dj" | "cluster"
let mapPanelClusterKey = "";

// Datos de los elementos que están ahora mismo en #mapMarkers, en el mismo
// orden que el DOM: permite resolver clics y teclado sin atributos extra.
let mapItemData = [];

const mapRound = (value) => Math.round(value * 100) / 100;

// DJs que pasan los filtros del mapa (nombre y país del marcador).
function mapFilteredDjs() {
  const tokens = searchTokens(mapQuery);

  return djs.filter((dj) => {
    const geo = djGeo[dj.name];
    if (!geo) return false;

    const searchable = normalize(dj.name);
    const matchesName = tokens.every((token) => searchable.includes(token));
    const matchesCountry = mapCountry === "all" || geo.country === mapCountry;

    return matchesName && matchesCountry;
  });
}

// Lugar con el que se nombra un grupo: solo se nombra si ese lugar es común a
// TODO el grupo. Una celda puede mezclar ciudades distintas y nombrar solo la
// más repetida afirmaría un hecho falso; en ese caso no hay lugar (null).
function mapClusterPlace(points) {
  const cities = new Set(points.map((point) => point.geo.city));
  return cities.size === 1 ? [...cities][0] : null;
}

// Firma estable de un grupo: sus puestos ordenados. Permite saber si el panel
// abierto sigue correspondiendo a un grupo real tras cambiar zoom o filtros.
function mapClusterKey(points) {
  return points
    .map((point) => point.dj.position)
    .sort((a, b) => a - b)
    .join(",");
}

// Escala del SVG en píxeles CSS por unidad del viewBox. Las formas se
// dimensionan con ella para que el objetivo táctil nunca baje de 24 px y el
// número de los grupos se lea siempre a 10 px reales.
function mapMetrics() {
  const width = mapSvg.getBoundingClientRect().width;
  const scale = width > 0 ? width / MAP_W : 1;

  return {
    hit: Math.max(12, 12 / scale),
    dot: Math.max(4.5, 4 / scale),
    halo: Math.max(9, 8 / scale),
    cluster: Math.max(10, 8 / scale),
    text: 10 / scale,
  };
}

function mapMarkerHTML(point, tabIndex, metrics) {
  const dj = point.dj;
  const geo = point.geo;
  const place = geo.city ? `${geo.city}, ${geo.country}` : geo.country;
  const label = `${dj.name}, puesto ${dj.position}, ${place}`;
  const selected = mapSelected === dj.position;
  const shape = `<circle class="map__dot" cx="0" cy="0" r="${mapRound(
    metrics.dot
  )}"></circle>`;
  const halo = selected
    ? `<circle class="map__halo" cx="0" cy="0" r="${mapRound(metrics.halo)}"></circle>`
    : "";

  return (
    `<g class="map__marker${selected ? " is-selected" : ""}"` +
    ` data-position="${dj.position}" role="button" tabindex="${tabIndex}"` +
    ` aria-label="${escapeHTML(label)}"` +
    ` transform="translate(${mapRound(point.x)} ${mapRound(point.y)})">` +
    `<circle class="map__hit" cx="0" cy="0" r="${mapRound(metrics.hit)}"></circle>` +
    halo +
    shape +
    "</g>"
  );
}

function mapClusterHTML(item, tabIndex, metrics) {
  const count = item.points.length;
  const place = mapClusterPlace(item.points);
  const label = place
    ? `${count} DJs en ${place}`
    : `${count} DJs agrupados en esta zona`;

  return (
    `<g class="map__cluster" data-cluster="1" role="button" tabindex="${tabIndex}"` +
    ` aria-label="${escapeHTML(label)}"` +
    ` transform="translate(${mapRound(item.x)} ${mapRound(item.y)})">` +
    `<circle class="map__hit" cx="0" cy="0" r="${mapRound(metrics.hit)}"></circle>` +
    `<circle class="map__cluster-dot" cx="0" cy="0" r="${mapRound(metrics.cluster)}"></circle>` +
    `<text class="map__cluster-count" x="0" y="0" style="font-size: ${mapRound(metrics.text)}px">${count}</text>` +
    "</g>"
  );
}

// Elementos enfocables del mapa, en el orden del DOM (grupos primero y
// después los marcadores sueltos).
function mapItemElements() {
  return Array.prototype.slice.call(
    mapMarkers.querySelectorAll(".map__marker, .map__cluster")
  );
}

// Roving tabindex: un solo elemento con tabindex="0". El SVG entero es, así,
// una única parada de tabulación y las flechas recorren el resto.
function applyMapFocus() {
  const items = mapItemElements();

  if (items.length === 0) {
    mapFocusIdx = 0;
    return;
  }

  if (mapFocusIdx < 0) mapFocusIdx = items.length - 1;
  if (mapFocusIdx >= items.length) mapFocusIdx = 0;

  items.forEach((element, index) => {
    element.setAttribute("tabindex", index === mapFocusIdx ? "0" : "-1");
  });
}

function focusMapItem(element) {
  const items = mapItemElements();
  const index = items.indexOf(element);
  if (index === -1) return;

  mapFocusIdx = index;
  items.forEach((item, position) => {
    item.setAttribute("tabindex", position === index ? "0" : "-1");
  });
  element.focus({ preventScroll: true });
}

function moveMapFocus(delta) {
  const items = mapItemElements();
  if (items.length === 0) return;

  mapFocusIdx = (mapFocusIdx + delta + items.length) % items.length;
  applyMapFocus();
  items[mapFocusIdx].focus({ preventScroll: true });
}

// Retícula: meridianos y paralelos cada 30°, recalculados con el zoom.
function renderMapGraticule() {
  let lines = "";

  for (let lon = -180; lon <= 180; lon += 30) {
    const x = mapX(lon) * mapK + mapTX;
    if (x < 0 || x > MAP_W) continue;
    lines += `<line x1="${mapRound(x)}" y1="0" x2="${mapRound(x)}" y2="${MAP_H}"></line>`;
  }

  for (let lat = -60; lat <= 60; lat += 30) {
    const y = mapY(lat) * mapK + mapTY;
    if (y < 0 || y > MAP_H) continue;
    lines += `<line x1="0" y1="${mapRound(y)}" x2="${MAP_W}" y2="${mapRound(y)}"></line>`;
  }

  mapGraticule.innerHTML = lines;
}

function renderMapPanelDefault() {
  mapPanelKind = "default";
  mapPanelClusterKey = "";
  mapPanel.innerHTML =
    '<p class="map__panel-hint">Selecciona un marcador para ver la ficha del DJ.</p>';
}

function renderMapPanelDj(dj) {
  const geo = djGeo[dj.name];
  if (!geo) {
    renderMapPanelDefault();
    return;
  }

  mapPanelKind = "dj";
  mapPanelClusterKey = "";

  const place = geo.city ? `${geo.city}, ${geo.country}` : geo.country;
  const differentCountry =
    geo.country && dj.country && geo.country !== dj.country
      ? `<p class="map__panel-note">Ranking: ${escapeHTML(dj.country)}</p>`
      : "";

  mapPanel.innerHTML =
    `<p class="map__panel-kicker">Puesto ${dj.position} de ${djs.length}</p>` +
    `<p class="map__panel-name">${escapeHTML(dj.name)}</p>` +
    '<dl class="map__panel-facts">' +
    '<div class="map__panel-row"><dt class="map__panel-label">Ubicación</dt>' +
    `<dd class="map__panel-value">${escapeHTML(place)}</dd></div>` +
    '<div class="map__panel-row"><dt class="map__panel-label">Género</dt>' +
    `<dd class="map__panel-value">${escapeHTML(dj.genre)}</dd></div>` +
    (Number.isInteger(dj.debutYear)
      ? '<div class="map__panel-row"><dt class="map__panel-label">Debut</dt>' +
        `<dd class="map__panel-value">${dj.debutYear}</dd></div>`
      : "") +
    "</dl>" +
    differentCountry +
    `<button class="map__panel-open" type="button" data-position="${dj.position}">Abrir ficha</button>`;
}

function renderMapPanelCluster(item) {
  const count = item.points.length;
  const place = mapClusterPlace(item.points);

  mapPanelKind = "cluster";
  mapPanelClusterKey = mapClusterKey(item.points);

  const buttons = item.points
    .slice()
    .sort((a, b) => a.dj.position - b.dj.position)
    .map((point) => {
      const city = point.geo.city
        ? ` · <span class="map__panel-city">${escapeHTML(point.geo.city)}</span>`
        : "";
      return (
        '<li><button class="map__panel-dj" type="button"' +
        ` data-position="${point.dj.position}">${escapeHTML(point.dj.name)}${city}</button></li>`
      );
    })
    .join("");

  const placeLabel = place
    ? `${count} DJs en ${escapeHTML(place)}`
    : `${count} DJs agrupados en esta zona`;

  mapPanel.innerHTML =
    `<p class="map__panel-kicker">${placeLabel}</p>` +
    '<p class="map__panel-hint">Elige un DJ del grupo para ver su ficha.</p>' +
    `<ul class="map__panel-list">${buttons}</ul>`;

  mapLive.textContent = place
    ? `${count} DJs en ${place}`
    : `${count} DJs agrupados en esta zona`;
}

function updateMapSummary(filtered) {
  const hasFilters = searchTokens(mapQuery).length > 0 || mapCountry !== "all";
  const prefix = hasFilters
    ? `Mostrando ${filtered.length} de ${djs.length} · `
    : "";

  const summary =
    `${prefix}${filtered.length} ${djUnit(filtered.length)} ` +
    "con ciudad documentada";

  // Se evita reescribir el mismo texto en cada repintado del arrastre para no
  // disparar anuncios repetidos en el lector de pantalla.
  if (mapSummary.textContent !== summary) mapSummary.textContent = summary;
}

function renderMap() {
  const filtered = mapFilteredDjs();
  const points = [];

  filtered.forEach((dj) => {
    const geo = djGeo[dj.name];
    if (!geo) return;
    if (typeof geo.lat !== "number" || typeof geo.lon !== "number") return;

    points.push({
      dj: dj,
      geo: geo,
      // Las posiciones se recalculan en unidades del viewBox: los marcadores
      // no se escalan, así que siempre miden lo mismo.
      x: mapX(geo.lon) * mapK + mapTX,
      y: mapY(geo.lat) * mapK + mapTY,
    });
  });

  // Agrupación por celdas de MAP_CELL unidades: los DJs que caen en la misma
  // celda forman un solo grupo.
  const cells = new Map();

  points.forEach((point) => {
    const key = `${Math.floor(point.x / MAP_CELL)}:${Math.floor(
      point.y / MAP_CELL
    )}`;
    if (!cells.has(key)) cells.set(key, []);
    cells.get(key).push(point);
  });

  const clusters = [];
  const singles = [];

  cells.forEach((group) => {
    if (group.length === 1) {
      singles.push({ kind: "dj", points: group });
      return;
    }

    clusters.push({
      kind: "cluster",
      points: group,
      x: group.reduce((sum, point) => sum + point.x, 0) / group.length,
      y: group.reduce((sum, point) => sum + point.y, 0) / group.length,
    });
  });

  // Los grupos se dibujan primero para que un marcador suelto nunca quede
  // tapado por un grupo mayor.
  clusters.sort((a, b) => b.points.length - a.points.length);
  mapItemData = clusters.concat(singles);

  // Si el DJ seleccionado ha quedado fuera de los filtros, se retira.
  if (
    mapSelected !== null &&
    !filtered.some((dj) => dj.position === mapSelected)
  ) {
    mapSelected = null;
    if (mapPanelKind === "dj") renderMapPanelDefault();
  }

  // El panel de un grupo deja de ser válido si el zoom o los filtros lo
  // deshacen: nunca debe listar DJs que ya no forman ese grupo.
  if (mapPanelKind === "cluster") {
    const currentCluster = clusters.find(
      (item) => mapClusterKey(item.points) === mapPanelClusterKey
    );
    if (!currentCluster) renderMapPanelDefault();
  }

  const metrics = mapMetrics();

  // Si el foco estaba dentro del mapa, se conserva: primero el mismo marcador
  // (por puesto) y, si era un grupo, la misma posición de la lista.
  const focused = document.activeElement;
  const hadFocus = mapMarkers.contains(focused);
  const focusedPosition =
    hadFocus && focused.classList.contains("map__marker")
      ? focused.getAttribute("data-position")
      : null;
  const focusedClusterIndex =
    hadFocus && focused.classList.contains("map__cluster")
      ? mapItemElements().indexOf(focused)
      : -1;

  mapMarkers.innerHTML = mapItemData
    .map((item, index) => {
      const tabIndex = index === mapFocusIdx ? 0 : -1;
      return item.kind === "cluster"
        ? mapClusterHTML(item, tabIndex, metrics)
        : mapMarkerHTML(item.points[0], tabIndex, metrics);
    })
    .join("");

  applyMapFocus();

  if (hadFocus) {
    const marker = focusedPosition
      ? mapMarkers.querySelector(
          `.map__marker[data-position="${focusedPosition}"]`
        )
      : null;
    const items = mapItemElements();

    if (marker) {
      focusMapItem(marker);
    } else if (focusedClusterIndex !== -1 && items.length > 0) {
      focusMapItem(items[Math.min(focusedClusterIndex, items.length - 1)]);
    } else {
      mapSvg.focus({ preventScroll: true });
    }
  }

  mapWorld.setAttribute(
    "transform",
    `translate(${mapRound(mapTX)} ${mapRound(mapTY)}) scale(${mapRound(mapK)})`
  );
  mapSvg.classList.toggle("is-zoomed", mapK > MAP_K_MIN);
  renderMapGraticule();
  updateMapSummary(filtered);
}

function clampMap() {
  mapK = Math.min(MAP_K_MAX, Math.max(MAP_K_MIN, mapK));

  if (mapK === MAP_K_MIN) {
    mapTX = 0;
    mapTY = 0;
    return;
  }

  const minX = MAP_W * (1 - mapK);
  const minY = MAP_H * (1 - mapK);

  mapTX = Math.min(0, Math.max(minX, mapTX));
  mapTY = Math.min(0, Math.max(minY, mapTY));
}

// Zoom hacia un punto del viewBox: ese punto se queda quieto bajo el cursor.
function zoomMapAtPoint(viewX, viewY, factor) {
  const previousK = mapK;
  mapK = Math.min(MAP_K_MAX, Math.max(MAP_K_MIN, mapK * factor));

  const ratio = mapK / previousK;
  mapTX = viewX - (viewX - mapTX) * ratio;
  mapTY = viewY - (viewY - mapTY) * ratio;

  clampMap();
  renderMap();
}

function zoomMapAtCenter(factor) {
  zoomMapAtPoint(MAP_W / 2, MAP_H / 2, factor);
}

// Selecciona un DJ visible: anillo, panel y, si se pide, foco. La búsqueda
// llama con `focus: false` para no robar el foco mientras se escribe.
// Devuelve el marcador ya repintado, o null si el DJ está dentro de un grupo.
function selectMapDj(position, { focus = true } = {}) {
  const dj = djs.find((d) => d.position === position);
  if (!dj) return null;

  // Solo se puede seleccionar lo que el mapa está mostrando: ni DJs filtrados
  // fuera ni registros sin coordenadas.
  const visible = mapFilteredDjs().some((item) => {
    if (item.position !== position) return false;
    const geo = djGeo[item.name];
    return (
      geo &&
      typeof geo.lat === "number" &&
      typeof geo.lon === "number"
    );
  });
  if (!visible) return null;

  mapSelected = position;
  renderMap();
  renderMapPanelDj(dj);

  const marker = mapMarkers.querySelector(
    `.map__marker[data-position="${position}"]`
  );

  if (focus) {
    if (marker) {
      focusMapItem(marker);
    } else {
      // El DJ está dentro de un grupo: el foco va al panel recién pintado en
      // lugar de caer en <body> y perder la posición.
      const openButton = mapPanel.querySelector(".map__panel-open");
      (openButton || mapPanel).focus();
    }
  }

  const geo = djGeo[dj.name];
  const place = geo && geo.city ? `${geo.city}, ${geo.country}` : geo ? geo.country : "";
  const message =
    `Seleccionado ${dj.name}, puesto ${dj.position}` +
    (place ? `, ${place}` : "");
  if (mapLive.textContent !== message) mapLive.textContent = message;

  return marker;
}

// Abre la lista de un grupo: retira cualquier selección anterior, mantiene el
// foco en el grupo y refresca el panel.
function activateMapCluster(element, item) {
  mapSelected = null;
  focusMapItem(element);
  renderMap();
  renderMapPanelCluster(item);
}

// Centra el mapa en un DJ con una escala cómoda para leer el entorno.
function centerMapOnDj(dj) {
  const geo = djGeo[dj.name];
  if (!geo || typeof geo.lat !== "number" || typeof geo.lon !== "number") return;

  mapK = 4;
  mapTX = MAP_W / 2 - mapX(geo.lon) * mapK;
  mapTY = MAP_H / 2 - mapY(geo.lat) * mapK;
  clampMap();
}

// Pobla el desplegable de países con el recuento en la etiqueta.
function fillMapCountryOptions() {
  const countryCounts = countBy(Object.values(djGeo), "country");

  const all = document.createElement("option");
  all.value = "all";
  all.textContent = "Todos los países";
  mapCountrySelect.appendChild(all);

  countryCounts.forEach(([country, count]) => {
    const option = document.createElement("option");
    option.value = country;
    option.textContent = `${country} (${count})`;
    mapCountrySelect.appendChild(option);
  });

  mapCountrySelect.value = "all";
}

// El panel plegable de países se rellena una sola vez, no en cada repintado.
function renderMapLists() {
  mapCountryList.innerHTML = countBy(Object.values(djGeo), "country")
    .map(
      ([country, count]) =>
        `<li><span>${escapeHTML(country)}</span>` +
        `<span class="map__list-count">${count}</span></li>`
    )
    .join("");
}

// --- Eventos del mapa ---

mapSearchInput.addEventListener("input", () => {
  mapQuery = mapSearchInput.value;
  renderMap();

  // Una sola coincidencia: se centra y se selecciona.
  if (searchTokens(mapQuery).length === 0) return;

  const visible = mapFilteredDjs();

  if (visible.length === 1) {
    centerMapOnDj(visible[0]);
    // Sin foco: el usuario sigue escribiendo en el buscador.
    selectMapDj(visible[0].position, { focus: false });
  }
});

mapCountrySelect.addEventListener("change", () => {
  mapCountry = mapCountrySelect.value;
  renderMap();
});

mapZoomInButton.addEventListener("click", () => zoomMapAtCenter(1.6));
mapZoomOutButton.addEventListener("click", () => zoomMapAtCenter(1 / 1.6));

// Clic en marcador (selección) y en grupo (lista de sus DJs en el panel).
mapMarkers.addEventListener("click", (event) => {
  const element = event.target.closest(".map__marker, .map__cluster");
  if (!element) return;

  const index = mapItemElements().indexOf(element);
  if (index === -1) return;
  const item = mapItemData[index];
  if (!item) return;

  if (item.kind === "cluster") {
    activateMapCluster(element, item);
    return;
  }

  selectMapDj(item.points[0].dj.position);
});

// «Abrir ficha» y botones del grupo: al cerrar, el foco vuelve al marcador
// seleccionado (o al botón, si el marcador ya no está pintado).
mapPanel.addEventListener("click", (event) => {
  const openButton = event.target.closest(".map__panel-open");
  if (openButton) {
    const position = Number(openButton.dataset.position);
    const marker = mapMarkers.querySelector(
      `.map__marker[data-position="${position}"]`
    );
    openDetail(position, marker || openButton);
    return;
  }

  const djButton = event.target.closest(".map__panel-dj");
  if (djButton) selectMapDj(Number(djButton.dataset.position));
});

// Rueda: zoom hacia el cursor. En los límites (y con Ctrl para el zoom del
// navegador) no se intercepta: la página vuelve a desplazarse con normalidad.
mapSvg.addEventListener(
  "wheel",
  (event) => {
    if (event.ctrlKey) return;

    const factor = Math.exp(-event.deltaY * 0.0015);
    const nextK = Math.min(MAP_K_MAX, Math.max(MAP_K_MIN, mapK * factor));
    if (nextK === mapK) return;

    event.preventDefault();

    const rect = mapSvg.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const viewX = ((event.clientX - rect.left) / rect.width) * MAP_W;
    const viewY = ((event.clientY - rect.top) / rect.height) * MAP_H;

    zoomMapAtPoint(viewX, viewY, factor);
  },
  { passive: false }
);

// Los repintados de arrastre y de cambio de ancho se agrupan en un frame.
let mapRenderFrame = 0;

function scheduleMapRender() {
  if (mapRenderFrame) return;
  mapRenderFrame = requestAnimationFrame(() => {
    mapRenderFrame = 0;
    renderMap();
  });
}

// Arrastre con puntero. En k = 1 la traslación es 0: no se captura el gesto,
// así que la página conserva su desplazamiento normal.
let mapDrag = null;

mapSvg.addEventListener("pointerdown", (event) => {
  if (mapK === MAP_K_MIN) return;
  if (event.pointerType === "mouse" && event.button !== 0) return;
  if (event.target.closest(".map__marker, .map__cluster")) return;

  const rect = mapSvg.getBoundingClientRect();
  if (!rect.width || !rect.height) return;

  mapDrag = {
    pointerId: event.pointerId,
    x: event.clientX,
    y: event.clientY,
    tx: mapTX,
    ty: mapTY,
    width: rect.width,
    height: rect.height,
  };

  mapSvg.classList.add("is-dragging");
  mapSvg.setPointerCapture(event.pointerId);
});

mapSvg.addEventListener("pointermove", (event) => {
  if (!mapDrag || event.pointerId !== mapDrag.pointerId) return;

  const dx = ((event.clientX - mapDrag.x) / mapDrag.width) * MAP_W;
  const dy = ((event.clientY - mapDrag.y) / mapDrag.height) * MAP_H;

  mapTX = mapDrag.tx + dx;
  mapTY = mapDrag.ty + dy;
  clampMap();
  scheduleMapRender();
});

function endMapDrag(event) {
  if (!mapDrag) return;
  if (event && event.pointerId !== mapDrag.pointerId) return;

  if (mapSvg.hasPointerCapture(mapDrag.pointerId)) {
    mapSvg.releasePointerCapture(mapDrag.pointerId);
  }

  mapDrag = null;
  mapSvg.classList.remove("is-dragging");
}

mapSvg.addEventListener("pointerup", endMapDrag);
mapSvg.addEventListener("pointercancel", endMapDrag);

// Al cambiar el ancho del SVG se recalculan el área de captura y el tamaño
// real del texto de los grupos.
window.addEventListener("resize", scheduleMapRender);

// Teclado: flechas para recorrer marcadores, Enter/Espacio para abrir la ficha
// y + / − para el zoom.
mapSvg.addEventListener("keydown", (event) => {
  const item = event.target.closest(".map__marker, .map__cluster");

  if (event.key === "ArrowRight" || event.key === "ArrowDown") {
    event.preventDefault();
    // Si el foco está en el SVG (llegada por tabulación), la primera flecha
    // entra en la lista por el extremo correspondiente.
    if (!item) mapFocusIdx = -1;
    moveMapFocus(1);
    return;
  }

  if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
    event.preventDefault();
    if (!item) mapFocusIdx = 0;
    moveMapFocus(-1);
    return;
  }

  if (event.key === "+" || event.key === "=") {
    event.preventDefault();
    zoomMapAtCenter(1.6);
    return;
  }

  if (event.key === "-" || event.key === "_") {
    event.preventDefault();
    zoomMapAtCenter(1 / 1.6);
    return;
  }

  if ((event.key === "Enter" || event.key === " ") && item) {
    event.preventDefault();

    const index = mapItemElements().indexOf(item);
    const data = index === -1 ? null : mapItemData[index];
    if (!data) return;

    if (data.kind === "cluster") {
      activateMapCluster(item, data);
      return;
    }

    const position = data.points[0].dj.position;
    const marker = selectMapDj(position);
    openDetail(position, marker);
  }
});

// Arranque del mapa
fillMapCountryOptions();
renderMapLists();
renderMapPanelDefault();
renderMap();

// --- Retícula de fondo en parallax ---
// La trama repite cada 72 px, así que basta con desplazarla dentro de ese
// ciclo: la deriva parece continua sin capas gigantes ni repintados. El
// transform lo escribe este módulo, no una animación CSS, de modo que la
// preferencia de movimiento reducido se consulta aquí de forma explícita.
const backdropLayer = document.querySelector(".backdrop");
const backdropReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
);
const BACKDROP_STEP = 72;
const BACKDROP_RATE = 0.18;

let backdropFrame = 0;

function paintBackdrop() {
  backdropFrame = 0;
  if (!backdropLayer) return;

  const offset = (window.scrollY * BACKDROP_RATE) % BACKDROP_STEP;
  backdropLayer.style.transform = `translate3d(0, ${(-offset).toFixed(
    2
  )}px, 0)`;
}

function scheduleBackdropPaint() {
  if (backdropFrame) return;
  backdropFrame = requestAnimationFrame(paintBackdrop);
}

function syncBackdropMotion() {
  if (!backdropLayer) return;

  if (backdropReducedMotion.matches) {
    window.removeEventListener("scroll", scheduleBackdropPaint);
    if (backdropFrame) {
      cancelAnimationFrame(backdropFrame);
      backdropFrame = 0;
    }
    backdropLayer.style.transform = "";
    return;
  }

  window.addEventListener("scroll", scheduleBackdropPaint, { passive: true });
  paintBackdrop();
}

syncBackdropMotion();

if (typeof backdropReducedMotion.addEventListener === "function") {
  backdropReducedMotion.addEventListener("change", syncBackdropMotion);
} else if (typeof backdropReducedMotion.addListener === "function") {
  // Safari antiguo: MediaQueryList solo tiene addListener.
  backdropReducedMotion.addListener(syncBackdropMotion);
}
