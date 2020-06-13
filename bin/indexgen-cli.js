#!/usr/bin/env node
var colors = require('colors');
var Indexgen = require('indexgen-lib');

var projectRoot = '.';
var totalFilesIndexed = 0;
var totalIndexFilesGenerated = 0;
var totalIndexFilesDeleted = 0;
var ig = new Indexgen();

ig.on('info', function(info) {
	console.log(info);
});

ig.on('indexed', function(info) {
	totalFilesIndexed++;
	console.log(info);
});

ig.on('generated', function(info) {
	totalIndexFilesGenerated++;
	console.log(info);
});

ig.on('removed', function(info) {
	totalIndexFilesDeleted++;
	console.log(info);
});

var cli = {
	parseArguments: function() {
		var args = process.argv.slice(2);
		var arg = args[0];

		if ((typeof arg !== 'undefined') && (arg !== null) && (arg == '-undo')) {
			ig.indexgen = ig.undo;
			cli.printResults = cli.printUndoResults;
		}
	},

	printIndexgenResults: function() {
		console.log(('Total index.js files generated: ' + totalIndexFilesGenerated).green);
		console.log(('Total modules indexed: ' + totalFilesIndexed).green);
	},

	printUndoResults: function() {
		console.log(('Total index.js files deleted: ' + totalIndexFilesDeleted).red);
	},

	printResults: function() {
		cli.printIndexgenResults();
	}
};

cli.parseArguments();
ig.init();
ig.indexgen(projectRoot);
cli.printResults();

process.exit(0);