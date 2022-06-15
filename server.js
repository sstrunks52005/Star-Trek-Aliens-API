const express = require('express')
const app = express()
const cors = require('cors')                //allow other domains to make req vs your api
const { response } = require('express')
const PORT = 8000
const MongoClient = require('mongodb').MongoClient
const connectionString = 'mongodb+srv://bowiewan:Abcd1234@cluster0.a6z7jwf.mongodb.net/?retryWrites=true&w=majority'

app.use(cors())
app.use(express.json()) //middleware facilitates communication 

// const aliens = {
//     'humans': {
//         'speciesName' : 'Humans',
//         'homeworld': 'Earth',
//         'location': 'Alpha Quadrant',
//         'features':'Rounded ears, hair on head and face (sometimes)',
//         'interestingFact': 'Founded the United Federation of Planets after first contact with the Vulcans' ,
//         'notableExamples' : "James T. Kirk, Zephram Cochran, Abraham Lincoln",
//         'image': 'https://static.wikia.nocookie.net/aliens/images/6/68/The_City_on_the_Edge_of_Forever.jpg'
//     },
//     'vulcans': {
//         'speciesName' : 'Vulcans',
//         'homeworld': 'Vulcan',
//         'features':'Pointed ears, upward-curving eyebrows',
//         'interestingFact': 'Practice an extreme form of emotional regulation that focuses on logic above all else, pioneered by a Vulcan named Surak' ,
//         'notableExamples' : "Spock, T'Pol, Sarek",
//         'image': 'https://static.wikia.nocookie.net/aliens/images/7/75/Vulcans-FirstContact.jpg'
//     },
//     'klingons': {
//         'speciesName' : 'Klingons',
//         'homeworld': "Qo'noS",
//         'features':'Large stature, pronounced ridges on the forehead, stylized facial hair',
//         'interestingFact': 'Highly skilled in weapons and battle. Their facial ridges were lost as the result of a virus in 2154, but were subsequently restored by 2269.' ,
//         'notableExamples' : "Worf, Kor, Kang",
//         'image': 'https://static.wikia.nocookie.net/aliens/images/7/74/Kruge.jpg'
//     },
//     'romulans': {
//         'speciesName' : 'Romulans',
//         'homeworld': "Romulus",
//         'features':'Pointed ears, upward-curving eyebrows,green tinge to the skin, diagonal smooth forehead ridges (sometimes)',
//         'interestingFact': 'Share a common ancestory with Vulcans, though none of the emotional discipline. Romulus has a sister planet, Remus, on which the Remans are seen as lesser beings.' ,
//         'notableExamples' : "Pardek, Tal'aura, Narissa",
//         'image': 'https://static.wikia.nocookie.net/aliens/images/1/1d/Zzzd7.jpg'
//     },
//     'borg': {
//         'speciesName' : '(The) Borg',
//         'homeworld': 'unknown (Delta Quadrant)',
//         'features':'pale skin, numerous interior and exterior biological modifications',
//         'interestingFact': 'No single genetic lingeage, species propagates by assimilating individuals via nanotechnology, led by a hive mind guided by a single "queen" individual. DO NOT APPROACH unless under specific diplomatic orders from Starfleet Command.' ,
//         'notableExamples' : "Borg Queen, Seven of Nine, Locutus",
//         'image': 'https://static.wikia.nocookie.net/aliens/images/7/76/Borg.jpg'
//     },
//     'gorn': {
//         'speciesName' : 'Gorn',
//         'homeworld': 'unknown (Alpha Quadrant)',
//         'features':'scaly green skin, large, iridescent eyes, powerful build, sharp teeth',
//         'interestingFact': 'Extremely militaristic and driven to conquer, but also possess advanced scientific knowledge allowing for superior bio-weapons.' ,
//         'notableExamples' : "Gorn Captain",
//         'image': 'https://static.wikia.nocookie.net/aliens/images/9/9b/Gorn.jpg'
//     },
//     'trill': {
//         'speciesName' : 'Trill',
//         'homeworld': 'Trill',
//         'features':'Outward appearance similar to humans, aside from distinct dark pigment marks running symmetrically down both sides of the face and body',
//         'interestingFact': 'Some Trill are willin hosts to a long-lived invertibrate symbiote that merges with the host to create a distinct personality.' ,
//         'notableExamples' : "Jadzia Dax, Ezri Dax, Curzon Dax",
//         'image': 'https://static.wikia.nocookie.net/aliens/images/4/42/EzriDax.jpg'
//     }
// }


//add both app.get to mongo

MongoClient.connect(connectionString, {useUnifiedTopology:true, useNewUrlParser: true})
    .then(client => {
        console.log('Connected to Database')
        const db = client.db('startrek-aliens-guide')  //named it different in mongodb
        const infoCollection = db.collection('startrek-aliens')  //diff in mongodb
    

    app.get('/', (req, res) => {
        res.sendFile(__dirname + '/index.html')
    })

    //want json data not just html data.   changing from looking in array aliensName to database
    app.get('/api/:alienName', (req, res) => {
        const aliensName = req.params.alienName.toLowerCase()  //put in var because of long code
            infoCollection.find({name: aliensName}).toArray()     //go in collection and find aliensName
            .then(results => {
                console.log(results)
                res.json(results[0])
            })
            .catch(error => console.error(error))
        })
        // if(aliens[aliensName]){                                //specific key in specific object. in alien obj is aliensName in there? boolean
        //     res.json(aliens[aliensName])                             //if true, return aliensName
        // }else{
        //     res.json(aliens['humans'])
        // }
    })
    .catch(error => console.error(error))

    app.listen(process.env.PORT || PORT, () => {
        console.log('Server is running.')
    })
