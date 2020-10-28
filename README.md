# wrongulator

A silly webapp to see who is wrong about what

## Prerequisites

* node 4.x or higher
* npm 2.x or higher

## Clone or download it

## Configure it

Edit the `config` section of `wrong.js`; replace all the field values here with ones you want to set up.

* For each entry in `imageLookupTbl`, the following applies:
  * The name of the entry (e.g. 'ron' and 'ronda') is the name of the person as they will appear in the drop-down menu
    * Under that name, `pic` refers to the path of the picture, relative to the wrongulator root path.  In this example, the images directory will be the one in the source tree.  You can place it (the pictures) anywhere you like, as long as pic references it correctly.
    * For best results, each image should have a 4x3 aspect ratio, and have some room at the top where black text with white shadow will show nicely.
    * The 'title' field will be the title of the HTML page generated.
* Now make the config true by placing the picture files you are going to use where your config says they are.
* The port is the port number at which the wrongulator service will listen.
* The default caption is what will be shown if you do not provide a query.
* Once the wrongulator is running, I recommend checking that each of the images in your drop-down list displays correctly; it is easy to slightly mistype filenames.

### Example config -- should work out of the box, using the images in the `images` directory

```
const config = {

    imageLookupTbl : {
	ron: {
	    pic: "../images/ron01.jpg",
	    title: "Weasley is clueless!"
	},
	ronda: {
	    pic: "../images/ronda01.jpg",
            title: "Ronda has no idea!"
	},
	trump: {
	    pic: "../images/trump01.png",
	    title: "The Donald is wise."
	}
    },
    port: 3000,
    defaultCaption : "You are wrong."
}
```

## Run it

A sample bash script to run it is provided in bin/wrongulator.sh

## Use it

Browse to http://my.website.com:\<portnumber>/wrongform, where portnumber is the port number you are serving it on -- default is 3000.

## Daemonize it

Instructions coming soon.