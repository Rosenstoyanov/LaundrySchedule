var Laundry = require(__base + 'server/db').models.Laundry;

// http://www.toptenreviews.com/home/laundry/best-top-load-washing-machines/
var prepopulateLaundries = function prepopulateLaundries() {
    var laundries = [
        new Laundry({ title: 'LG', description: 'As a leader in innovation, LG continues to create smart home appliances, like the LG Mega Capacity WT7700HVA top-load washing machine. This high-efficiency top-loader includes numerous features and cycles to help you clean your clothes the way you want to. In fact, you get more cycles and options with this machine than any other top-load unit we reviewed.' }),
        new Laundry({ title: 'Maytag', description: 'As high-efficiency top-loading washing machines go, the Maytag MVWB955FC has all of the wash cycles and options most people will need. This is an enormous 6.2-cubic-foot drum to fit big loads of dirty laundry, which reduces the number of times you need to load and unload.' }),
        new Laundry({ title: 'Samsung', description: 'Although the Samsung WA9000 top-load washing machine does not offer the most cost-effective laundry solution, it comes close. The generous 5.6-cubic-foot drum means you can do a lot more laundry at once than you could with a traditional washer. ' }),
        new Laundry({ title: 'Whirlpool', description: 'The best top-load washers give you a multitude of options, barely increase your energy or water bill, and give you plenty of room for your biggest, heaviest items that need washing. Whirlpool’s Cabrio high-efficiency WTW8700EC top-load washer fits the bill as being one of the best out there. ' }),
        new Laundry({ title: 'Kenmore Elite', description: 'The Kenmore Elite 31633 is a large-capacity top-load washer that works well for big families. It includes 10 wash cycles, five soil levels and several wash-and-rinse temperatures. This washer uses less water than most agitator-type machines, so it costs less, on average, to operate each year. ' }),
        new Laundry({ title: 'Kenmore', description: 'As a traditional top-load washing machine, the Kenmore 28132 comes out ahead of most of its competitors. It includes nine wash cycles, four soil levels and five wash-and-rinse temperature settings. It has several wash options, including StainBoost that gives extended wash time to clothes with tough stains while being gentle on fabrics. ' }),
        new Laundry({ title: 'GE', description: 'The GE GTW330ASKWW top-loading washing machine is a traditional washer with an agitator style of washing. It is one of the best traditional top-load washing machines because of its many wash cycles, low water factor and affordable operating costs. With its tub capacity of 3.8 cubic feet, this top-load washer is large enough to handle good-sized laundry loads.' }),
        new Laundry({ title: 'Amana', description: 'The Amana NTW4516FW is a traditional washing machine that still sports the center post agitator that swishes your clothes around to clean them. This is an affordable, compact top-load washing machine with 3.5 cubic feet of space. It has basic features and functions, as well as the dual-action agitator that provides extra rotating action to clean your clothes thoroughly.' })
        // new Laundry({ title: title, description: description }),
        // new Laundry({ title: title, description: description }),
        // new Laundry({ title: title, description: description }),
        // new Laundry({ title: title, description: description })                        
    ]

    var error = false;
    laundries.map((laundry) => {
        laundry.save((err) => {
            if(err) error = true;
        })
        if(error) return false;
    });

    return true;
}

module.exports.prepopulateLaundries = prepopulateLaundries;