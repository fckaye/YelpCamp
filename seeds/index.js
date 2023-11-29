const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on('error', console.error.bind(console, "Connection error:"));
db.once('open', () => {
    console.log('Database connected');
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry: { type: 'Point', coordinates: [ 139.77477675, 35.6987575 ] },
            images: [
                {
                  url: 'https://res.cloudinary.com/dr7g264sg/image/upload/v1701149267/YelpCamp/y7aaiy63gpbhskfdv5i6.png',
                  filename: 'YelpCamp/y7aaiy63gpbhskfdv5i6',
                },
                {
                  url: 'https://res.cloudinary.com/dr7g264sg/image/upload/v1701149267/YelpCamp/wtzfli9bxdta1ecabpri.png',
                  filename: 'YelpCamp/wtzfli9bxdta1ecabpri',
                }
              ],
            description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint illum dolores rerum suscipit voluptatem? Laudantium earum, aperiam quis aut dolorum perferendis, aliquam reprehenderit, incidunt voluptate accusamus et dolore temporibus nihil.',
            price: price,
            author: '65606062d0bd495f1d45074c',
        });
        await camp.save();
    }
}

seedDB().then(() => {
    db.close();
})