import cricket from "./images/game/cricket.jfif";
import gulliDanda from "./images/game/gullidanda.jfif";
import kanche from "./images/game/kanche.jfif";
import football from "./images/game/football.jfif";
import gudiya from "./images/game/gudiya.jfif";
import cards from "./images/game/cards.jfif";

import snake from "./images/fear/snake.png";
import lizard from "./images/fear/lizard.jfif";
import cockroach from "./images/fear/cockroach.jfif";
import relatives from "./images/fear/relatives.jfif";
import book from "./images/fear/book.jfif";
import height from "./images/fear/height.jfif";

import comedy from "./images/movieGenre/comedy.jpg";
import action from "./images/movieGenre/action.jpg";
import adventure from "./images/movieGenre/adventure.jpg";
import animation from "./images/movieGenre/animation.jpg";
import crime from "./images/movieGenre/crime.jpg";
import drama from "./images/movieGenre/drama.jpg";
import act_com from "./images/movieGenre/act-com.jpg";
import thriller from "./images/movieGenre/thriller.jpg";
import superhero from "./images/movieGenre/superHero.jpg";
import scifi from "./images/movieGenre/scifi.jpg";
import romance from "./images/movieGenre/romance.jpg";
import horror from "./images/movieGenre/horror.jpg";
import mystery from "./images/movieGenre/mystery.jpg";
import fantasy from "./images/movieGenre/fantasy.jpg";
import com_rom from "./images/movieGenre/com-rom.jpg";

import bheem from "./images/CartoonSeries/bheem.jfif";
import doraemon from "./images/CartoonSeries/doraemon.png";
import motuPatlu from "./images/CartoonSeries/motuPatlu.jfif";
import ninja from "./images/CartoonSeries/ninja.jfif";
import oggy from "./images/CartoonSeries/oggy.jfif";
import shin from "./images/CartoonSeries/shin.jfif";

import actor from "./images/profession/actor.jfif";
import doctor from "./images/profession/doctor.jfif";
import sportPerson from "./images/profession/sportPerson.jfif";
import astronaut from "./images/profession/astronaut.jfif";
import engineer from "./images/profession/engineer.jfif";
import scientist from "./images/profession/scientist.jfif";
import teacher from "./images/profession/teacher.png";

import petlover from "./images/withoutOption/petlover.jfif";
import relationship from "./images/withoutOption/relationship.jfif";
import shyness from "./images/withoutOption/shyness.jfif";
import stagophobia from "./images/withoutOption/stagophobia.jfif";
import talkative from "./images/withoutOption/talkative.jfif";

let questions = [
  [
    {
      statement: [" Your, favourite game", " आपका पसंदीदा खेल "],
      options: [
        {
          name: ["Cricket", " क्रिकेट "],
          img: cricket,
        },
        {
          name: ["Gilli Danda", " गुल्ली डंडा "],
          img: gulliDanda,
        },
        {
          name: ["Marbles", " गोली "],
          img: kanche,
        },
        {
          name: ["Football", " फ़ुटबॉल "],
          img: football,
        },
        {
          name: ["Doll", " गुड़िया "],
          img: gudiya,
        },
        {
          name: ["Cards", " पत्ते "],
          img: cards,
        },
      ],
    },
    {
      statement: [" Your Biggest Fear ", "आपका सबसे बड़ा डर"],
      options: [
        {
          name: ["Snake", " साँप "],
          img: snake,
        },
        {
          name: ["Height", " ऊंचाई "],
          img: height,
        },
        {
          name: ["Lizard", " छिपकली  "],
          img: lizard,
        },
        {
          name: ["Cockroach", "तिलचट्टा "],
          img: cockroach,
        },
        {
          name: ["Books", " किताब "],
          img: book,
        },
        {
          name: ["Relatives ", "रिश्तेदार "],
          img: relatives,
        },
      ],
    },

    {
      statement: [" Your, Favourite Movie Genre ", " पसंदीदा फिल्म शैली "],
      options: [
        {
          name: ["Action", " एक्सन "],
          img: action,
        },
        {
          name: ["Comedy", "कॉमेडी "],
          img: comedy,
        },
        {
          name: ["Adventure", " एडवेन्चर  "],
          img: adventure,
        },
        {
          name: ["Animation", "एनीमेशन "],
          img: animation,
        },
        {
          name: ["Crime", " क्राईम "],
          img: crime,
        },
        {
          name: ["Drama ", "नाटक "],
          img: drama,
        },
        {
          name: ["Action-Comedy", "एक्शन कॉमेडी"],
          img: act_com,
        },
        {
          name: ["Thriller", "थ्रिलर"],
          img: thriller,
        },
        {
          name: ["SuperHero ", "सुपर हीरो "],
          img: superhero,
        },

        {
          name: ["Sci-Fi ", "विज्ञान कल्पना "],
          img: scifi,
        },

        {
          name: ["Romance ", "रोमांस  "],
          img: romance,
        },

        {
          name: ["Horror ", "डरावनी "],
          img: horror,
        },

        {
          name: ["Fantasy ", " कल्पना"],
          img: fantasy,
        },
        {
          name: ["Mystery ", "रहस्य "],
          img: mystery,
        },

        {
          name: ["Comedy-Romance ", "कॉमेडी रोमांस "],
          img: com_rom,
        },
      ],
    },

    {
      statement: [
        " Your, Favourite Cartoon Series ",
        " आपकी, पसंदीदा कार्टून श्रृंखला",
      ],
      options: [
        {
          name: ["Chhota Bheem", " छोटा भीम "],
          img: bheem,
        },
        {
          name: ["Doraemon", " डोरेमोन "],
          img: doraemon,
        },
        {
          name: ["Motu Patlu", " मोटू पतलू  "],
          img: motuPatlu,
        },
        {
          name: ["Ninja Hattori", "निंजा हटोरि "],
          img: ninja,
        },
        {
          name: ["Oggy And Cockroaches", " ओगी ऐंड कॉकरोच "],
          img: oggy,
        },
        {
          name: ["Shin Chan ", "शीन चैन"],
          img: shin,
        },
      ],
    },

    {
      statement: [" Your dream to be  ", " बचपन में आपका सपना"],
      options: [
        {
          name: ["Actor", " अभिनेता "],
          img: actor,
        },
        {
          name: ["Doctor", " चिकित्सक "],
          img: doctor,
        },

        {
          name: ["Sports Person", "खिलाड़ी "],
          img: sportPerson,
        },
        {
          name: ["Astronaut", "अंतरिक्ष यात्री "],
          img: astronaut,
        },
        {
          name: ["Engineer", "अभियंता "],
          img: engineer,
        },
        {
          name: ["Scientist", " वैज्ञानिक "],
          img: scientist,
        },
        {
          name: ["Teacher ", "शिक्षक "],
          img: teacher,
        },
      ],
    },
  ],
  [
    {
      statement: ["Are you Pet lover", "क्या आपको पालतू जानवर रखने का शौक था"],
      img: petlover,

      options: [
        {
          name: ["Yes", "हाँ"],
        },
        {
          name: ["No", "ना"],
        },
      ],
    },
    {
      statement: [
        " had trouble talking to the opposite gender",
        " विपरीत लिंग से बात करने में परेशानी होती थी",
      ],
      options: [
        {
          name: ["Yes", "हाँ"],
        },
        {
          name: ["No", "ना"],
        },
      ],
      img: shyness,
    },
    {
      statement: [
        "Had a relationship in early age ",
        " Had a relationship in early age ",
      ],

      options: [
        {
          name: ["Yes", "हाँ"],
        },
        {
          name: ["No", "ना"],
        },
      ],
      img: relationship,
    },
    {
      statement: ["were talkative", "बातूनी थे "],

      options: [
        {
          name: ["Yes", "हाँ"],
        },
        {
          name: ["No", "ना"],
        },
      ],
      img: talkative,
    },
    {
      statement: ["had stage fear", " मंच का डर था "],

      options: [
        {
          name: ["Yes", "हाँ"],
        },
        {
          name: ["No", "ना"],
        },
      ],
      img: stagophobia,
    },
  ],
];

export default questions;
