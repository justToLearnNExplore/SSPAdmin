import jn_rr1 from './jn_rr1.PNG'
import jn_rr2 from './jn_rr2.PNG'

import ty1 from './TY1.PNG'
import ty2 from './TY2.PNG'
import ty3 from './TY3.PNG'
import ty4 from './TY4.PNG'


import hk1 from './HK1.PNG'
import hk2 from './HK2.PNG'
import hk3 from './HK3.PNG'
import hk4 from './HK4.PNG'

import IT1 from './IT1.PNG'
import IT2 from './IT2.PNG'
import IT3 from './IT3.PNG'
import IT4 from './IT4.PNG'


let pop_games = [
    {
        id: 3,
        name: "Jodi-Nodi Rishi-RishiPatni",
        category: "memory",
        image: jn_rr1,
        images: [
            jn_rr2
       ],
        price: "Rs.50/-",
        players: "1+",
        age: "5",
        lo: "\n1) Learn 16 rishis and rishipatnis.\n2) Enhance memory.\n3)Improve reading skills.\n4)Cultivate curiosity to explore their stories further.",
        youtubeLink: "https://youtu.be/aCP4MUAMoE4?si=iwIQdtHo_KqMN02d",
    },
    {
        id: 17,
        name: "Teertha Yatre",
        category: "board",
        image: ty4,
        images: [
            ty3,
            ty2,
            ty1
       ],       
        price: "Rs.180/-",
        players: "3-4",
        age: "7",
        lo: "\n1) Learn about the intention and importance of teerthayatra (pilgrimage), along with the do's and don'ts in sacred places.\n2) Learn mythological or historical stories associated with a particular sacred place.\n3) Obtain an overview of the Ramayana, Mahabharata, and Bhagavata.\n4) Learn about money management and how to convert wealth into punya (spiritual merit).\n5) Learn about decision-making, logical reasoning, mental and monetary mathematics.",
        youtubeLink: "https://youtu.be/dVdzwsAFZnA?si=SrU4kiRAbaKStyVP", 
    },
    {
        id: 16,
        name: "Hrudaya Kamala",
        category: "hks",
        image: hk1,
        images: [
            hk2,
            hk3,
            hk4
       ],       
        price: "Rs.190/-",
        players: "3-4",
        age: "7",
        lo: "\n1)Understand how God influences deities in controlling manovritti of individuals through Hrudayakamala-Dala-Sanchara.\n2) Gain insights into spiritual concepts such as Moksha(liberation), Svarga(heaven), Naraka(hell), and Andhantamas(eternal hell).\n3) Understand the consequences of Papa(bad deeds) and Punya(good deeds).\n4) Understand the effect of poorva janma karma and indeed acknowledge actions of people around us.\n And so on.",
        youtubeLink: "https://youtu.be/GwnrF2uCEkc?si=CJNdfWvEo4zB_oIm", 
    },
    {
        id: 19,
        name: "Ingitajna & Naanu Yaaru",
        category: "bgt",
        image: IT4,
        images: [
            IT1,
            IT3,
            IT2
       ],       
        price: "Rs.100/-",
        players: "1",
        age: "5",
        lo: "\n1)Learn about the 22 different avataras and aveshas of Shri Hari as per Bhagavata 1/3 and 2/7.\n2) Acquire brief information about each avatara.\n3) Gain knowledge about the concepts of avesha and avatara of Shri Hari.\n4) Cultivate curiosity to explore more about the avataras and aveshas of Shri Hari.\n5) Learn magic tricks.\n6) Solve riddles.",
        youtubeLink: "https://youtu.be/H-bPLb4AA7o?si=R9i__R1i9DBxJ7QS",      
    },

];

export default pop_games;