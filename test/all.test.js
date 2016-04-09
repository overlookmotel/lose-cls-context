// --------------------
// lose-cls-context module
// Tests
// --------------------

// modules
var chai = require('chai'),
	expect = chai.expect,
	lose = require('../lib/');

var cls = require('continuation-local-storage');

// init
chai.config.includeStack = true;

// init CLS
var namespace = cls.createNamespace('test');

// tests

/* jshint expr: true */
/* global describe, it */

describe('lose-cls-context', function() {
	it('calls fn asynchronously', function(done) {
		var order = [];

		lose(function() {
			order.push('cb');

			expect(order).to.deep.equal(['after', 'cb']);

			done();
		});

		order.push('after');
	});

	it('loses CLS context', function(done) {
		namespace.run(function() {
			namespace.set('value', 123);

			lose(function() {
				var value = namespace.get('value');
				expect(value).to.not.equal(123);
				done();
			});
		});
	});
});
