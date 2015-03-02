# OpenTele HTML5 Client

HTML5-based patient app for the OpenTele platform.

## How to build and install

The project has two kinds of dependencies: tools and angular framework code.
The tools help us manage and test the application.

* We get the tools we depend upon via `npm`, the [node package manager][npm].
* We get the angular code via `bower`, a [client-side code package manager][bower].

The project is initially configured by running `npm install` (which has been
configured to also run `bower install`). The `npm` and `bower` modules are
installed in the following directories:

* `node_modules` - contains the npm packages for the tools we need
* `app/bower_components` - contains the angular framework files

Lastly, a number of `grunt` tasks exists for the project for further
development:

- `grunt dev` installs dependencies, runs jshint, runs unit tests, concatenates
  all files to the file `dist/app.js`, launches a HTTP server and watches the
  repository for future changes (for which it will repeat the listed steps).
- `grunt test` installs dependencies, runs jshint and unit tests.
- `grunt minified` does the same as `grunt dev` but also minifies the
  concatenated `dist/app.js`.
- `grunt package` does the same as `grunt minified` while also compressing the
  final application files into a zip file. Does not watch the repository for
  changes.

After running `grunt dev` or `grunt minified` the app can be found at
`http://localhost:8000/app/index.html`.

## When adding a new page

**NOTE:** Some of the information below may be slightly outdated, so remember
to check against existing example pages. 

When you want to add a new page called `foo`, you start by creating a new
subfolder in the `app/areas` folder called `foo`, in which you create two new
files, `foo.html` and `foo.js`.

### HTML template

The `foo.html` file contains the HTML template for your `foo` page and should
have the following structure in order to take advantage of the existing
responsive layout:

    <section id="foo-container"
             class="light-gray-row">
        <div class="container">
            <div class="sub-container"
                 ng-controller="FooCtrl">

                <!-- place page content here -->

            </div>
        </div>
    </section>

In the above, we start with a `<section>` tag containing an appropriate id,
`foo-container`, and a class specifying the background color of the section,
`light-gray-row`. Inside, we add an anonymous `<div>` tag which fills
the entire width of the screen and inside it we then add a final `<div>` which
adds some padding, centers its content, and points to the controller of the 
page, `ng-controller="FooCtrl"`. From there on, you can add your own content 
inside this `<div>`. You can take a look at `login.html` and `menu.html` for 
relatively simple example pages.

### Controller module

The `foo.js` file then contains the controller for the `foo` page, `FooCtrl`,
and it has the following structure:

    (function() {
        'use strict';

        var foo = angular.module('opentele.foo', [
            // add dependencies here, one per line
            opentele.someServices
        ]);

        foo.config(['$routeProvider', function ($routeProvider) {
            $routeProvider.when('/foo', {
                title: 'Foo',
                templateUrl: 'areas/foo/foo.html'
            });
        }]);

        foo.controller('FooCtrl', function($scope, $location, someService) {
            /* initialize controller */
        });

    }());

Here, all the code is initially wrapped in a 'use strict' function - what the
function does it not relevant for this section, so just remember to add it -
followed by the declaration of the `foo` module along with its dependencies.
Having declared the `foo` module, the next step is to configure it by at least
adding the `/foo` route to the `$routeProvider` in order to make the page
accessible. Lastly, the page controller, `FooCtrl`, is initialized, where any
dependencies, `$scope, $location, someService`, are injected. Once again, taking
a look at `login.js` and `menu.js` for concrete examples is advised.

### I18N support

In order to support I18N for texts, you simply add the page title 'Foo' as a
key for each language in `app/translations/translations.js`:

    translations.constant('enUsTranslations', {
       "Foo" : "Foo page title"
       // ...
    }

    translations.constant('daDkTranslations', {
       "Foo" : "Foo side titel"
       // ...
    }

### Styling with LESS/CSS

TODO.

## Testing a new page

After you have put your content and logic inside`foo.html` and `foo.js` files,
you need to also add unit tests and end-to-end tests to your new page. In most
cases, you should not need to change the two configurations files,
`karma.conf.js` and `e2e-tests/protractor.conf.js`, but be aware that they exist.

### Unit tests

In order to unit test your page, you create a new file
`unit-tests/controllers/foo_test.js`,  having the following structure:

    (function () {
        'use strict';

        describe('foo', function () {

            // declare references to your controller and any services you may
            // need during your tests.
            var controller, scope, location, someService;

            // import your module and any custom services you may need.
            beforeEach(module('opentele.foo'));
            beforeEach(module('opentele.someServices'));

            // before each test, instantiate controller and services.
            beforeEach(inject(function ($rootScope, $location, $controller, _someService_) {
                scope = $rootScope.$new();
                location = $location;
                controller = $controller;
                someService = _someService_;
            }));

            // initialize controller function.
            var runController = function() {
                controller('FooCtrl', {
                    '$scope': scope,
                    '$location': location,
                    'someService': someService
                });
            };

            // actual unit tests

            it('should be defined', function() {
                expect(controller).toBeDefined();
            });

            it('should do what I expect when run controller', function() {
                runController();
    
                expect(scope.something).toEqual(somethingExpected);
            });

            // more unit tests...

        });
    }());

Once again, we wrap everything in a 'use strict' function and then define a test
suite that describes `foo`. In this suite, we import the modules we depend on,
and instantiate the controllers and services relevant to the test, using the
`beforeEach` function for all this setup logic. When all setup steps have been
specified, we add unit tests with the `it` function that takes a descriptive
string and perform a series of steps followed by one or more assertions with
the `expect` function.

### End-to-end tests

Lastly, you should also add end-to-end tests for automating client-side browser
interaction with your new page. This is done by creating two files,
`e2e-tests/fooPage.js` and `e2e-tests/fooScenarios.js`.

Here, the file `fooPage.js` describes the content of your new page and has the
following structure:

    (function() {
        'use strict';

        var FooPage = function () {
            // define relevant UI elements
            this.fooElement = element(by.id('foo-element-id'));
            // ...

            // create functions for filling out forms and navigating to other
            // pages using the UI

            this.setFormProperty = function (value) {
                this.formProperty.sendKeys(value);
            };

            this.toOtherPage = function () {
                        element.all(by.id('foo-button')).click();
            };

        };

        module.exports = new FooPage();

    }());

Here, the page is defined as an object, whose field variables are UI elements,
and whose methods are used for filling out forms and navigating to other pages
using buttons and links.

Having defined the `fooPage.js`, you can now describe test scenarios in
`fooScenarios.js`, using the following structure:

    (function() {
        'use strict';

        describe('foo', function() {

            // require needed pages
            var loginPage = require("./loginPage.js");
            var fooPage = require("./fooPage.js");

            // before each test navigate to the foo page.
            beforeEach(function() {
                // navigate to fooPage via Login.get()
                loginPage.get();
                loginPage.doLogin('nancyann', 'abcd1234');
                // call more methods until you reach fooPage
            });

            // actual end-to-end tests

            it('should navigate to other page when pressing foo-button', function() {
                fooPage.toOtherPage();
                expect(browser.getLocationAbsUrl()).toMatch('/otherPage');
            });

            // more end-to-end tests...

        });

    }());

As in the case of the unit tests, the end-to-end tests have the same structure
of a test suite defined with `describe` and `beforeEach` calls for setting up
the test scenarios followed by `it` which executes the different scenarios.
However, now we import pages instead of modules and use the browser and the
page elements instead of `$scope` and services to detect the expected behavior.