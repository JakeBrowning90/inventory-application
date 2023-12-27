#! /usr/bin/env node

console.log(
    'This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
  );
  
  // Get arguments passed on command line
  const userArgs = process.argv.slice(2);
  
  const Artist = require("./models/artist");
  const Piece = require("./models/piece");

  const artists = [];
  const pieces = [];
 
  const mongoose = require("mongoose");
  mongoose.set("strictQuery", false);
  
  const mongoDB = userArgs[0];
  
  main().catch((err) => console.log(err));
  
  async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    await createArtists();
    await createPieces();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
  }
  
  async function artistCreate(index, first_name, family_name, d_birth, d_death, bio) {
    const artistdetail = { first_name: first_name, family_name: family_name };
    if (d_birth != false) artistdetail.date_of_birth = d_birth;
    if (d_death != false) artistdetail.date_of_death = d_death;
  
    const artist = new Artist(artistdetail);
  
    await artist.save();
    artists[index] = artist;
    console.log(`Added artist: ${first_name} ${family_name}`);
  }
  
  async function pieceCreate(index, title, medium, artist, year, description, height, width, length) {
    const piecedetail = {
      title: title,
      medium: medium,
      artist: artist,
      year: year,
      description: description,
      height: height,
      width: width,
      length: length,
    };
   
    const piece = new Piece(piecedetail);
    await piece.save();
    pieces[index] = piece;
    console.log(`Added piece: ${title}`);
  }
    
  async function createArtists() {
    console.log("Adding artists");
    await Promise.all([
      // artistCreate(0, "firstname", "lastname", "year_of_birth", "year_of_death", "bio"),
      artistCreate(0, 
        "Vincent", 
        "van Gogh", 
        "1853", 
        "1890", 
        "Van Gogh is today one of the most popular of the Post-Impressionist painters, although he was not widely appreciated during his lifetime. He is now famed for the great vitality of his works which are characterised by expressive and emotive use of brilliant colour and energetic application of impastoed paint. The traumas of his life, documented in his letters, have tended to dominate and distort modern perceptions of his art."
      ),
      artistCreate(1,
        "Michelangelo",
        false,
        "1475",
        "1564",
        "Painter, on panel and in fresco, sculptor and architect, writer of sonnets, Michelangelo Buonarroti was the first artist recognised by contemporaries as a genius. Hero of the High Renaissance. He was the only artist of whom it was claimed in his lifetime that he surpassed Antiquity.",
      ),
      artistCreate(2, 
        "Anselm",
        "Kiefer", 
        "1945", 
        false, 
        "Born during the closing months of World War II, Kiefer reflects upon Germany's post-war identity and history, grappling with the national mythology of the Third Reich. Fusing art and literature, painting and sculpture, Kiefer engages the complex events of history and the ancestral epics of life, death, and the cosmos. His boundless repertoire of imagery is paralleled only by the breadth of media palpable in his work."
      ),
      artistCreate(3, 
        "Leiko", 
        "Ikemura", 
        "1951", 
        false, 
        "Painter, draughtswoman, sculptor, and photographer Leiko Ikemura depicts confrontations between an obscure female subject and mystical landscapes. After spending the first half of her 30-year career studying the expressive possibilities of oil and watercolors in semi-abstract portraits and landscapes, she turned to sculpture in 1984. Mixing eastern and western sculptural traditions, Ikemura worked with bronze, terracotta, and clay to form varied biomorphic forms and fragments of female figures."
      ),
      artistCreate(4, 
        "Robert", 
        "Duncanson", 
        "1821", 
        "1872", 
        "Duncanson was, at the height of his career, considered 'the best landscape painter in the West.' Based in Cincinnati, Ohio—then the largest and most prosperous city in the western United States—he was the principal artist among a vibrant group of mid-century Ohio River Valley landscape painters. During his self-imposed exile from the Civil War in Canada, England, Scotland, and Italy, his work resonated with international audiences."
      ),
      artistCreate(5, 
        "Unrecorded Quechua artist", 
        false, 
        false, 
        false, 
        "The Quichua were among the earliest peoples to be conquered by the Inca Empire. Ironically, the Inca Empire comprised mainly people who spoke the same Quechua language. It wasn't until Spanish colonization, though, that their population level fell drastically. One of the most important dates in history is associated with this decline."
      ),
      artistCreate(6, 
        "Len", 
        "Lye", 
        "1901", 
        "1980", 
        "Len Lye is a controversial figure in New Zealand art, an internationally renowned and influential artist who is seen by some as an outsider whose art has little relevance to the local tradition."
      ),
    ]);
  }
  
  async function createPieces() {
    console.log("Adding Pieces");
    await Promise.all([
      // pieceCreate(0,
      //   "title",
      //   "medium",
      //   "artists[]",
      //   "year",
      //   "description",
      //   "height",
      //   "width",
      //   "length",
      // ),
      pieceCreate(0,
        "A Wheatfield, with Cypresses",
        "oil on canvas",
        artists[0],
        "1889",
        "Van Gogh painted several versions of A Wheatfield, with Cypresses during the summer of 1889, while he was a patient in the psychiatric hospital of Saint-Paul de Mausole, in the village of St-Rémy in the south of France. A first version, which he described as a study, was painted on site in late June 1889.",
        72.1,
        90.9,
        false,
      ),
      pieceCreate(1,
        "Van Gogh's Chair",
        "oil on canvas",
        artists[0],
        "1888",
        "This painting of a simple chair set on a bare floor of terracotta tiles is one of Van Gogh's most iconic images. It was painted in late 1888, soon after fellow artist Paul Gauguin had joined him in Arles in the south of France. The picture was a pair to another painting, Gauguin's Chair (Van Gogh Museum, Amsterdam). They were to be hung together, with one chair turned to the right, the other to the left.",
        91.8,
        73,
        false,
      ),
      pieceCreate(2,
        "The Entombment",
        "oil on panel",
        artists[1],
        "c. 1500-1501",
        "This is one of perhaps only three surviving panel paintings by the great Florentine artist Michelangelo. It shows Christ's body being carried to his tomb. It was probably made for a funerary chapel in the church of S. Agostino, Rome - commissioned in 1500 and left unfinished when Michelangelo returned to Florence the following year.",
        161.7,
        149.9,
        false,
      ),
      pieceCreate(3,
        "Lilith",
        "oil, emulsion, shellac, charcoal, ash, clay, hair, lead, poppy on canvas",
        artists[2],
        "1987-1990",
        "Lilith is a large oil painting across two rectangular canvases that depicts a vast cityscape seen from high above, rendered in muted brown and grey tones. The viewer appears to look down over the city onto a rectangular plaza, which is represented at the bottom of the canvas. ",
        380,
        560,
        false,
      ),
      pieceCreate(4,
        "Cat",
        "cast glass",
        artists[3],
        "2020",
        "Edition of 5",
        20,
        26,
        14,
      ),
      pieceCreate(5,
        "Still Life with Fruit and Nuts",
        "oil on board",
        artists[4],
        "1848",
        "Several pieces of fruit, a bunch of green grapes, a stem of raisins, and several types of nuts in their shells are piled on a putty-brown tabletop or ledge with rounded corners against a dark background in this horizontal still life painting. ",
        43.5,
        53.66,
        6.67,
      ),
      pieceCreate(6,
        "Kero",
        "wood with pigment resin inlay",
        artists[5],
        "c. 1800 CE",
        "Drinking vessel from Peru",
        21.59,
        22.23,
        15.88,
      ),
      pieceCreate(7,
        "A Colour Box",
        "animated film",
        artists[6],
        "1935",
        "Runtime: 4 min. Lye's first “direct” (camera-less) animation combined popular Cuban dance music with hand-painted abstract designs.",
        false,
        false,
        false,
      ),
    ]);
  }
  