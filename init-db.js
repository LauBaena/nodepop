//Loading libraries
const readline = require('readline');
//Loading modules
const Advertisement = require('./models/Advertisement');

async function main(){
    //Asking for confirmation to remove all content from the database
    const confirmed = await askConfirmRemoval('Are you sure you want to delete all content from the database? [n] ("yes" to confirm) ')
    if(!confirmed){
        process.exit();
    }
    //Connecting to the database
    const connection = require('./lib/connectMongoose');
    //Initializing the advertisements
    await initAdvertisements();
    //Disconnecting from the database
    connection.close();
}

main().catch(err => console.log('There was an error', err));

async function initAdvertisements(){
    const result = await Advertisement.deleteMany();
    console.log(`${result.deletedCount} advertisements removed.`);

    const inserted = await Advertisement.insertMany([
        {
            name: "Classic bicycle",
            forSale: true,
            price: 230.50,
            image: "bicycle.jpg",
            tags: [ "lifestyle", "motor"]
        },
        {
            name: "iPhone 14",
            forSale: false,
            price: 850.00,
            image: "iphone14.jpg",
            tags: [ "lifestyle", "mobile"]
        },
        {
            name: "Gaming chair",
            forSale: true,
            price: 110.00,
            image: "gaming-chair.jpg",
            tags: [ "lifestyle", "work"]
        }
    ]);
    console.log(`${inserted.length} new advertisements created.`);
}

function askConfirmRemoval(text){
    return new Promise((resolve, reject) => {
        const interface = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        interface.question(text, answer => {  
            interface.close();
            if(answer.toLowerCase() === 'yes'){
                resolve(true);
                return;
            }
            resolve(false);
        });
    });
};