"use strict";

const express = require('express');
const bodyParser = require('body-parser');

const util = require('util');
const fs = require('fs');
const querystring = require('querystring');

const imageLookupTbl = {
    ron: {
	pic: "../images/ron01.jpg",
	title: "Weasley is clueless!"
    },
    ronda: {
	pic: "../images/ronda01.jpg",
        title: "Ronda has no idea!"
    }
};

var wrongText="Default text";

/**
 * Calls back with html output, based on the template content of wrongtemplate.html
 * and the passed parameters (person and statement)
*/
var htmlOut = function(person, statement, cbFunc) {
    var names = Object.getOwnPropertyNames(imageLookupTbl);
    var tmplArgs = null;
    for (var j=0; j < names.length; j++) {
	if (person.toLowerCase() === names[j]) {
	    tmplArgs = imageLookupTbl[names[j]];
	    break;
	}
    }
    if (!tmplArgs) {
	cbFunc(new Error("No entry matching " + person + " found!"), null);
	return;
    }
    fs.readFile("wrongtemplate.html", {encoding: 'utf-8'}, function(err, templateStr) {
	if (err) {
	    console.log(util.inspect(err));
	    cbFunc(err, null);
	    return;
	}
	var outStr = templateStr.replace(/XXWRONGTITLEHEREXX/g, tmplArgs.title);
	outStr = outStr.replace(/XXWRONGFILENAMEHEREXX/g, tmplArgs.pic);
	outStr = outStr.replace(/XXWRONGSTATEMENTHEREXX/g, wrongText);
	cbFunc(null, outStr);
    });
};

const app = express();



app.use('/images', express.static('images'));
app.use('/styles', express.static('styles'));

// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Emit The Trump Truth Train Telling It Like It Is
*/
app.get('/tellthemdonald/:person', function(req, res, next) {
    console.log (util.inspect(req.params));
    console.log (util.inspect(req.query));
    if (typeof req.query.claim !== undefined) {
	wrongText = req.query.claim
    }
    // Load the template, replace it with the values in req.query, and emit the result.    
    htmlOut(req.params.person, wrongText, function(err, output) {
	res.send(output);
	res.end();
    });
});

/**
 * Emits an html page comprising a form where you can pick wrong people
 * and enter a wrong statement.
*/

app.get('/wrongform', function(req, res, next) {
    fs.readFile("wrongform.html", {encoding: 'utf-8'}, function(err, formStr) {
	if (err) {
	    cbFunc(err, null);
	    return;
	}
	//Replace xxwrongoptionsherexx with the set of people given in the configuration
	var options_menu='';
	var names = Object.getOwnPropertyNames(imageLookupTbl);
	for (var j=0; j<names.length; j++) {
	    options_menu = options_menu +
		'<option value="' + names[j] + '">' +names[j].toUpperCase() +
		'</option>';
	}
	var outStr = formStr.replace(/XXWRONGOPTIONSHEREXX/g, options_menu);
	res.send(outStr);
	res.end();
    });
});

/**
 * The wrongform posts to here, and this redirects to /tellthemdonald with
 * the paramters set.
*/
app.post('/getthetruth', function (req, res, next) {
    var redirect_loc = '/tellthemdonald/' +
	req.body.person + '?' +
	querystring.stringify({claim: req.body.claim});
    res.redirect(redirect_loc);
    res.end();
});

app.listen(3000, function() {
    console.log ("Listening on port 3000");
});
