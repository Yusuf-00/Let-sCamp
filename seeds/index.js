const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/lets-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 81; i++) {
        const random81 = Math.floor(Math.random() * 81);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '61e0661d3095715f04e8e11a',
            location: `${cities[random81].name}, ${cities[random81].region}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
                 type: 'Point', 
                 coordinates: [
                    cities[random81].longitude,
                    cities[random81].latitude,
                ]
                 },
            images: [
                {
                  url: 'https://res.cloudinary.com/djaxmytrp/image/upload/v1643555527/LetsCamp/lp1ufahpjavo2tmuidyy.jpg',
                  filename: 'LetsCamp/lp1ufahpjavo2tmuidyy'
                },
                {
                  url: 'https://res.cloudinary.com/djaxmytrp/image/upload/v1643555568/LetsCamp/mjgaq7igrlijumucap54.jpg',
                  filename: 'LetsCamp/mjgaq7igrlijumucap54'
                }
              ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})