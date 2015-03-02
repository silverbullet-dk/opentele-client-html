(function () {
    'use strict';

    describe('opentele.restApiServices.acknowledgements service', function() {
        var httpBackend, restConfig, httpProvider;
        var acknowledgements;

        beforeEach(module('opentele.restApiServices.acknowledgements'));

        beforeEach(function() {
            restConfig = jasmine.createSpy();
            restConfig.baseUrl = "http://localhost/";
            restConfig.loginUrl = "patient/login";

            module(function($provide) {
                $provide.value('restConfig', restConfig);
            });
        });

        afterEach(function() {
            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();
        });

        beforeEach(inject(function($http) {
            httpProvider = $http;
        }));

        beforeEach(inject(function(_acknowledgements_, $httpBackend) {
            acknowledgements = _acknowledgements_;
            httpBackend = $httpBackend;
        }));

        describe('list all acknowledgements for user', function() {

            it('should not invoke callback when status is 401', function() {
                var successCallbackInvoked = false;
                var user = {
                    links: {
                        acknowledgements: "http://localhost/rest/questionnaire/acknowledgements"
                    }
                };
                httpBackend.whenGET(user.links.acknowledgements).respond(401);

                acknowledgements.listFor(user,
                    function() {
                        successCallbackInvoked = true;
                    });

                httpBackend.flush();
                expect(successCallbackInvoked).toBe(false);
            });

            it('should throw exception when user has no link to acknowledgements', function() {
                expect(function() {
                    acknowledgements.listFor({});
                }).toThrow();
                expect(function() {
                    acknowledgements.listFor({links: {}});
                }).toThrow();
            });

            it('should invoke success callback when response is valid', function() {
                var successCallbackInvoked = false;
                var user = {
                    links: {
                        acknowledgements: "http://localhost/rest/questionnaire/acknowledgements"
                    }
                };
                httpBackend.whenGET(user.links.acknowledgements).respond({"acknowledgements": []});

                acknowledgements.listFor(user,
                    function() {
                        successCallbackInvoked = true;
                    });

                httpBackend.flush();
                expect(successCallbackInvoked).toEqual(true);
            });

            it('should transform response to client object', function() {
                var user = {links: {acknowledgements: "http://localhost/rest/questionnaire/acknowledgements"}};
                httpBackend.whenGET(user.links.acknowledgements).respond({
                    "acknowledgements": [
                        {
                            "id": 205,
                            "message": "Dine data fra spørgeskemaet Hæmoglobin indhold i blod " +
                                "indsendt d. 13-10-2014 kl. 10:29 er set og godkendt d. " +
                                "15-11-2014 kl. 16:39."
                        },
                        {
                            "id": 204,
                            "message": "Dine data fra spørgeskemaet Lunger indhold i blod " +
                                "indsendt d. 27-03-2012 kl. 09:54 er set og godkendt d. " +
                                "06-07-2013 kl. 15:21."
                        },
                        {
                            "id": 201,
                            "message": "Dine data fra spørgeskemaet Blodsukker indsendt d. " +
                                "05-01-2010 kl. 15:10 er set og godkendt d. 09-02-2014 kl." +
                                " 21:15."
                        }
                    ]
                });

                var data = {};
                acknowledgements.listFor(user, function(response) {
                    data = response;
                });
                httpBackend.flush();

                expect(data.acknowledgements[0].id).toEqual(205);
                expect(data.acknowledgements[0].message).toMatch(/spørgeskemaet Hæmoglobin/);
                expect(data.acknowledgements[0].message).toMatch(/13-10-2014/);
                expect(data.acknowledgements[0].message).toMatch(/10:29/);
                expect(data.acknowledgements[0].message).toMatch(/15-11-2014/);
                expect(data.acknowledgements[0].message).toMatch(/16:39/);

                expect(data.acknowledgements[1].id).toEqual(204);
                expect(data.acknowledgements[1].message).toMatch(/spørgeskemaet Lunger/);
                expect(data.acknowledgements[1].message).toMatch(/27-03-2012/);
                expect(data.acknowledgements[1].message).toMatch(/09:54/);
                expect(data.acknowledgements[1].message).toMatch(/06-07-2013/);
                expect(data.acknowledgements[1].message).toMatch(/15:21/);

                expect(data.acknowledgements[2].id).toEqual(201);
                expect(data.acknowledgements[2].message).toMatch(/spørgeskemaet Blodsukker/);
                expect(data.acknowledgements[2].message).toMatch(/05-01-2010/);
                expect(data.acknowledgements[2].message).toMatch(/15:10/);
                expect(data.acknowledgements[2].message).toMatch(/09-02-2014/);
                expect(data.acknowledgements[2].message).toMatch(/21:15/);

            });

        });

    });
}());
