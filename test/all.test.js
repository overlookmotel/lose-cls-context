// --------------------
// lose-cls-context module
// Tests
// --------------------

// modules
var chai = require('chai'),
	expect = chai.expect,
	lose = require('../lib/');

// init
chai.config.includeStack = true;

// tests

/* jshint expr: true */
/* global describe, it */

describe('Tests', function() {
	it.skip('all', function() {
		expect(lose).to.be.ok;
	});
});
