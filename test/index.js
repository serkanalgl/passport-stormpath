var assert = require('chai').assert;
var expect = require('chai').expect;

var sinon = require('sinon');
var proxyquire = require('proxyquire');

var StormpathStrategy = proxyquire('../lib/strategy',{'stormpath':require('./mocks/sp')});

var MockSpApp = require('./mocks/sp-app');
var MockSpClient = require('./mocks/sp-client');

describe('test framework', function(){
  it('should assert true', function(){
    assert.equal(true,true);
  });
});

describe('lib entry', function(){
    var entry = require('../lib');
    it('should export an function', function(){
        assert.equal(typeof entry,"function");
    });
    it('should export a constructor', function(){
        assert.equal(typeof entry.Strategy,"function");
    });
    it('export and constructor are same thing', function(){
        assert.equal(entry,entry.Strategy);
    });
});

describe('strategy entry', function(){
    it('should export an function', function(){
        assert.equal(typeof StormpathStrategy,"function");
    });
});

describe('Strategy instance', function(){

    it('should have an authenticate method',function(){
        var instance = new StormpathStrategy({
            spApp:new MockSpApp(),
            spClient: new MockSpClient()
        });
        assert.equal(typeof instance.authenticate, "function");
    });
    it('should define a serializeUser rmethod',function(){
        var instance = new StormpathStrategy({
            spApp:new MockSpApp(),
            spClient: new MockSpClient()
        });
        assert.equal(typeof instance.serializeUser, "function");
    });
    it('should define a deserializeUser rmethod',function(){
        var instance = new StormpathStrategy({
            spApp:new MockSpApp(),
            spClient: new MockSpClient()
        });
        assert.equal(typeof instance.deserializeUser, "function");
    });
    it('should call fail if an empty request body provided',function(){
        var instance = new StormpathStrategy({
            spApp:new MockSpApp(),
            spClient: new MockSpClient()
        });
        var fail = sinon.spy();
        instance.fail = fail;
        expect(instance.authenticate.bind(instance,require('./mocks/req').empty)).to.not.throw();
        assert(fail.called,'fail was not called');
    });
    it('should call fail if a malformed request body provided',function(){
        var instance = new StormpathStrategy({
            spApp:new MockSpApp(),
            spClient: new MockSpClient()
        });
        var fail = sinon.spy();
        instance.fail = fail;
        expect(instance.authenticate.bind(instance,require('./mocks/req').malformed)).to.not.throw();
        assert(fail.called,'fail was not called');
    });
    it('should call fail if body params are not strings',function(){
        var instance = new StormpathStrategy({
            spApp:new MockSpApp(),
            spClient: new MockSpClient()
        });
        var fail = sinon.spy();
        instance.fail = fail;
        expect(instance.authenticate.bind(instance,require('./mocks/req').notStrings)).to.not.throw();
        assert(fail.called,'fail was not called');
    });
    it('should support custom fields',function(){
        var instance = new StormpathStrategy({
            spApp:new MockSpApp(),
            spClient: new MockSpClient(),
            usernameField:"un",
            passwordField:"pw"
        });
        var success = sinon.spy();
        instance.success = success;
        expect(instance.authenticate.bind(instance,require('./mocks/req').custom)).to.not.throw();
        assert(success.called,'success was not called');
    });
    it('should call success if valid login is provieded',function(){
        var instance = new StormpathStrategy({
            spApp:new MockSpApp(),
            spClient: new MockSpClient()
        });
        var success = sinon.spy();
        instance.success = success;
        expect(instance.authenticate.bind(instance,require('./mocks/req').good)).to.not.throw();
        assert(success.called,'success was not called');
    });
    it('should call fail and not success if invalid login is provieded',function(){
        var instance = new StormpathStrategy({
            spApp:new MockSpApp(),
            spClient: new MockSpClient()
        });
        var fail = sinon.spy();
        var success = sinon.spy();
        instance.fail = fail;
        instance.success = success;
        expect(instance.authenticate.bind(instance,require('./mocks/req').bad)).to.not.throw();
        assert(fail.called,'fail was called');
        assert(!success.called,'success was called but shouldnt have been');
    });
    it('should be instantiabnle without defining a client or app',function(){
        expect(function(){return new StormpathStrategy({});}).to.not.throw();
    });
    it('should be instantiabnle with a defined app, but no client',function(){
        expect(function(){return new StormpathStrategy({spApp:new MockSpApp()});}).to.not.throw();
    });

    it('should return the correct data from serializeUser',function(){
        var instance = new StormpathStrategy({
            spApp:new MockSpApp(),
            spClient: new MockSpClient()
        });
        var cb = sinon.spy();
        instance.serializeUser({href:"a"},cb);
        assert(cb.calledWith(null,"a"));
    });

    it('should return the correct data from deserializeUser',function(){
        var instance = new StormpathStrategy({
            spApp:new MockSpApp(),
            spClient: new MockSpClient()
        });
        var cb = sinon.spy();
        instance.deserializeUser("a",cb);
        assert(cb.calledWith(null,{href:"a"}));
    });

    it('should have a name property',function(){
        var instance = new StormpathStrategy({
            spApp:new MockSpApp(),
            spClient: new MockSpClient()
        });
        assert.equal(instance.name, "stormpath");
    });
});
