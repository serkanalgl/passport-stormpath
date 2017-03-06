#Stormpath is Joining Okta
We are incredibly excited to announce that [Stormpath is joining forces with Okta](https://stormpath.com/blog/stormpaths-new-path?utm_source=github&utm_medium=readme&utm-campaign=okta-announcement). Please visit [the Migration FAQs](https://stormpath.com/oktaplusstormpath?utm_source=github&utm_medium=readme&utm-campaign=okta-announcement) for a detailed look at what this means for Stormpath users.

We're available to answer all questions at [support@stormpath.com](mailto:support@stormpath.com).

# passport-stormpath

[![NPM Version](https://img.shields.io/npm/v/passport-stormpath.svg?style=flat)](https://npmjs.org/package/passport-stormpath)
[![NPM Downloads](http://img.shields.io/npm/dm/passport-stormpath.svg?style=flat)](https://npmjs.org/package/passport-stormpath)
[![Build Status](https://img.shields.io/travis/stormpath/passport-stormpath.svg?style=flat)](https://travis-ci.org/stormpath/passport-stormpath)

*A passport strategy for Stormpath, the simple user management API.*

[Stormpath](https://stormpath.com/) extends Passport.js, adding a full set of user features:

- Create, register and authenticate users.
- Store custom user data with each account.
- Create and assign permissions (groups, roles, etc.).
- Handle complex authentication and authorization patterns, like multi-tenancy.
- Log users in via social login with Facebook and Google OAuth.
- Cache user information for quick access.
- Secure all your passwords.
- Automate all your password reset and account verification workflows.

**NOTE**: If you're building an Express.js web application, you might want to
use our [express-stormpath](https://docs.stormpath.com/nodejs/express/index.html)
library instead -- it provides a simpler integration experience.


## Documentation

All of this library's documentation can be found here:
https://docs.stormpath.com/nodejs/passport/

If you'd like to hop right in and get started immediately, please take a look at
the [Quickstart Guide](https://docs.stormpath.com/nodejs/passport/quickstart.html).
(*It's ridiculously easy to get started with.*)


## Links

Below are some resources you might find useful!

- [passport-stormpath documentation](https://docs.stormpath.com/nodejs/passport/)
- [15-Minute Tutorial: Build a Webapp With Node.js, Express, Passport and Stormpath](https://stormpath.com/blog/build-app-nodejs-express-passport-stormpath/)
- [stormpath-passport-express Sample App repo](https://github.com/stormpath/stormpath-passport-express-sample)
- [Stormpath Node.js library](https://github.com/stormpath/stormpath-sdk-node)
- [Stormpath website](https://stormpath.com/)


## Installation

To get started, you need to install this package via
[npm](https://www.npmjs.org/package/passport-stormpath):

```console
$ npm install passport-stormpath
```


## Usage

To use this module, you first need to export some environment variables -- these
will be used by the `passport-stormpath` library to connect to the Stormpath API
service:

```console
$ export STORMPATH_API_KEY_ID=xxx
$ export STORMPATH_API_KEY_SECRET=xxx
$ export STORMPATH_APP_HREF=xxx
```

**NOTE**: These variables can be found in your
[Stormpath Admin Console](https://api.stormpath.com/ui/dashboard).

Once you've set the environment variables above, you can then initialize the
`passport-stormpath` strategy like so:

```javascript
var passport = require('passport');
var StormpathStrategy = require('passport-stormpath');
var strategy = new StormpathStrategy();

passport.use(strategy);
passport.serializeUser(strategy.serializeUser);
passport.deserializeUser(strategy.deserializeUser);
```


## Options

There are several options you can define when you are creating the strategy,
each is listed in this section.

#### Api Keys

If you'd like to explicitly define your Stormpath API keys and application href
settings, you can do so when creating the strategy object:

```javascript
var strategy = new StormpathStrategy({
  apiKeyId:     'STORMPATH_API_KEY_ID',
  apiKeySecret: 'STORMPATH_API_KEY_SECRET',
  appHref:      'STORMPATH_APP_HREF',
});
```

#### Account Store

If you wish to authenticate against a particular directory, you can configure
this for all authentication attempts when constructing the strategy.

```javascript
var strategy = new StormpathStrategy({
  accountStore: {
    href: 'http://api.stormpath.com/v1/directorys/your-directory'
  }
});
```

If you need to dynamically supply the account store, you can pass it
on a per-call basis by manually invoking passport.

```javascript
// Authenticate a user.
router.post('/login',
  passport.authenticate('stormpath',
    {
      successRedirect: '/dashboard',
      failureRedirect: '/login',
      failureFlash: 'Invalid email or password.',
      accountStore: {
        href: 'http://api.stormpath.com/v1/directorys/your-directory'
      }
    }
  )
);
```


#### Expansions

Account resources (*e.g. Custom Data, Groups*) can be automatically expanded
during the authentication process.  Declare which resources you would like to
expand by providing a comma separated list as the `expansions` option:

```javascript
var strategy = new StormpathStrategy({
  expansions: 'groups,customData'
});
```


#### Stormpath Client

You can also provide your own Stormpath client instance by constructing it
manually and then passing it and an application reference to the strategy
constructor:

```javascript
var stormpath = require('stormpath');

var spClient, spApp, strategy;

spClient = new stormpath.Client({
  apiKey: new stormpath.ApiKey(
      process.env['STORMPATH_API_KEY_ID'],
      process.env['STORMPATH_API_KEY_SECRET']
  )
});

spClient.getApplication(process.env['STORMPATH_APP_HREF'], function(err, app) {
  if (err) {
    throw err;
  }
  spApp = app;
  strategy = new StormpathStrategy({
    spApp: spApp,
    spClient: spClient
  });
  passport.use(strategy);
});
```


## Build Documentation

All project documentation is written using [Sphinx](http://sphinx-doc.org/).  To
build the documentation, you'll need to have Python installed and working.

To install Sphinx and all other dependencies, run:

```console
$ pip install -r requirements.txt
```

This will install all the Python packages necessary to build the docs.

Once you have Sphinx installed, go into the `docs` directory to build the
documentation:

```console
$ cd docs
$ make html
```

When this process is finished, you'll see that all project documentation has
been built into HTML available at `docs/_build/html`.


## Contributing

You can make your own contributions by forking the `develop` branch, making
your changes, and issuing pull-requests on the `develop` branch.

We regularly maintain this repository, and are quick to review pull requests
and accept changes!

We <333 contributions!


## Copyright

Copyright &copy; 2014 Stormpath, Inc. and contributors.

This project is open-source via the [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0).
