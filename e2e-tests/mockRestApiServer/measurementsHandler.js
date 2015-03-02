(function() {
    'use strict';

    var utils = require("./utils.js");

    exports.list = function(req, res, baseUrl) {

        var userToken = utils.decodeAuthorizationHeader(req);
        console.log("Measurements list requested from: " + userToken);

        if (userToken.indexOf("measurementsNoMeasurements") > -1) {
            console.log("Empty measurements list returned.");
            res.send({"measurementSeries": {}});
            return;
        }
        if (userToken.indexOf("rene") > -1) {
            res.send({
                "links": {
                    "self": baseUrl + 'patient/measurements'
                },
                "measurements": [
                    {
                        "name": "blood_pressure",
                        "links": {
                            "measurement": baseUrl + 'patient/measurements/blood_pressure'
                        }
                    }
                ]
            });
            return;
        }

        console.log("Measurements returned.");
        res.send(measurementsList(baseUrl));
    };

    exports.get = function(req, res) {

        var filterData = function(filterValue, data) {

            var filterDate = new Date();
            switch (filterValue) {
                case 'WEEK':
                    filterDate.setDate(filterDate.getDate() - 7);
                    break;
                case 'MONTH':
                    filterDate.setDate(filterDate.getDate() - 31);
                    break;
                case 'QUARTER':
                    filterDate.setDate(filterDate.getDate() - 92);
                    break;
                case 'YEAR':
                    filterDate.setDate(filterDate.getDate() - 366);
                    break;
                case 'ALL':
                    filterDate = new Date('1970-01-01');
                    break;
                default:
                    filterDate.setDate(filterDate.getDate() - 7);
                    break;
            }

            var measurements = data.measurements;
            measurements = measurements.filter(function(measurement) {
                var measurementDate = new Date(measurement.timestamp);
                return (measurementDate > filterDate);
            });
            return {
                "type": data.type,
                "unit": data.unit,
                "measurements": measurements
            };
        };

        var measurementId = req.params.id;
        var filter = req.query.filter;
        console.log('Measurement id ' + measurementId);
        console.log('Filter ' + filter);
        var responses = {
            'blood_pressure': function() { res.send(filterData(filter, bloodPressureMeasurement)); },
            'temperature': function() {  res.send(filterData(filter, temperatureMeasurement)); },
            'urine': function() { res.send(filterData(filter, proteinInUrineMeasurement)); },
            'urine_glucose': function() { res.send(filterData(filter, glucoseInUrineMeasurement)); },
            'pulse': function() { res.send(filterData(filter, pulseMeasurement)); },
            'weight': function() { res.send(filterData(filter, weightMeasurement)); },
            'hemoglobin': function() { res.send(filterData(filter, hemoglobinMeasurement)); },
            'saturation': function() { res.send(filterData(filter, saturationMeasurement)); },
            'crp': function() { res.send(filterData(filter, crpMeasurement)); },
            'bloodsugar': function() { res.send(filterData(filter, bloodSugarMeasurement)); },
            'lung_function': function() { res.send(filterData(filter, lungFunctionMeasurement)); },
            'continuous_blood_sugar_measurement': function() { res.send(filterData(filter, continuousBloodSugarMeasurement)); }
        };
        if (responses.hasOwnProperty(measurementId)) {
            responses[measurementId]();
        } else {
            res.status(404).end();
        }
    };

    var measurementsList = function(baseUrl) {
        return {
            measurements: [
            {
                "name": "blood_pressure",
                "links": {
                    "measurement": baseUrl + 'patient/measurements/blood_pressure'
                }
            },
            {
                "name": "urine",
                "links": {
                    "measurement": baseUrl + 'patient/measurements/urine'
                }
            },
            {
                "name": "urine_glucose",
                "links": {
                    "measurement": baseUrl + 'patient/measurements/urine_glucose'
                }
            },
            {
                "name": "pulse",
                "links": {
                    "measurement": baseUrl + 'patient/measurements/pulse'
                }
            },
            {
                "name": "weight",
                "links": {
                    "measurement": baseUrl + 'patient/measurements/weight'
                }
            },
            {
                "name": "saturation",
                "links": {
                    "measurement": baseUrl + 'patient/measurements/saturation'
                }
            },
            {
                "name": "crp",
                "links": {
                    "measurement": baseUrl + 'patient/measurements/crp'
                }
            },
            {
                "name": "bloodsugar",
                "links": {
                    "measurement": baseUrl + 'patient/measurements/bloodsugar'
                }
            },
            {
                "name": "lung_function",
                "links": {
                    "measurement": baseUrl + 'patient/measurements/lung_function'
                }
            },
            {
                name: "continuous_blood_sugar_measurement",
                "links": {
                    "measurement": baseUrl + 'patient/measurements/continuous_blood_sugar_measurement'
                }
            }
        ]};
    };

    var bloodPressureMeasurement = {
        "links": {
            "self": "http://localhost:5000/opentele-server/rest/patient/measurements/blood_pressure"
        },
        "type": "blood_pressure",
        "unit": "mmHg",
        "measurements": [
            {
                "timestamp": "2014-11-11T23:05:00.000+02:00",
                "measurement": {
                    systolic: 120,
                    diastolic: 90
                }
            },
            {
                "timestamp": "2014-11-08T15:14:00.000+02:00",
                "measurement": {
                    systolic: 153,
                    diastolic: 100
                }
            },
            {
                "timestamp": "2014-11-06T06:27:00.000+02:00",
                "measurement": {
                    systolic: 174,
                    diastolic: 120
                }
            },
            {
                "timestamp": "2014-10-19T19:41:00.000+02:00",
                "measurement": {
                    systolic: 213,
                    diastolic: 160
                }
            },
            {
                "timestamp": "2014-09-19T11:45:00.000+02:00",
                "measurement": {
                    systolic: 190,
                    diastolic: 130
                }
            },
            {
                "timestamp": "2014-08-19T05:21:00.000+02:00",
                "measurement": {
                    systolic: 160,
                    diastolic: 105
                }
            },
            {
                "timestamp": "2014-07-19T14:34:00.000+02:00",
                "measurement": {
                    systolic: 150,
                    diastolic: 100
                }
            },
            {
                "timestamp": "2014-06-19T21:15:00.000+02:00",
                "measurement": {
                    systolic: 130,
                    diastolic: 93
                }
            },
            {
                "timestamp": "2014-05-19T00:00:00.000+02:00",
                "measurement": {
                    systolic: 120,
                    diastolic: 88
                }
            },
            {
                "timestamp": "2014-04-19T00:00:00.000+02:00",
                "measurement": {
                    systolic: 110,
                    diastolic: 85
                }
            },
            {
                "timestamp": "2014-03-19T00:00:00.000+01:00",
                "measurement": {
                    systolic: 100,
                    diastolic: 80
                }
            },
            {
                "timestamp": "2014-02-19T00:00:00.000+01:00",
                "measurement": {
                    systolic: 95,
                    diastolic: 70
                }
            },
            {
                "timestamp": "2014-01-19T00:00:00.000+01:00",
                "measurement": {
                    systolic: 88,
                    diastolic: 60
                }
            },
            {
                "timestamp": "2013-12-19T00:00:00.000+01:00",
                "measurement": {
                    systolic: 86,
                    diastolic: 55
                }
            },
            {
                "timestamp": "2012-12-19T00:00:00.000+01:00",
                "measurement": {
                    systolic: 70,
                    diastolic: 42
                }
            }
        ]
    };

    var temperatureMeasurement = {
        "links": {
            "self": "http://localhost:5000/opentele-server/rest/patient/measurements/temperature"
        },
        "type": "temperature",
        "unit": "",
        "measurements": [
        ]
    };

    var proteinInUrineMeasurement = {
        "links": {
            "self": "http://localhost:5000/opentele-server/rest/patient/measurements/urine"
        },
        "type": "urine",
        "unit": "g/L",
        "measurements": [
            {
                timestamp: "2014-11-07T14:28:00.000+01:00",
                "measurement": "Neg."
            },
            {
                timestamp: "2014-10-25T09:39:00.000+01:00",
                "measurement": "Neg."
            },
            {
                timestamp: "2014-09-08T11:01:00.000+01:00",
                "measurement": "+/-"
            },
            {
                timestamp: "2014-06-11T12:55:00.000+01:00",
                "measurement": "+/-"
            },
            {
                timestamp: "2014-04-11T12:51:00.000+01:00",
                "measurement": "Neg."
            },
            {
                timestamp: "2013-12-20T08:48:00.000+01:00",
                "measurement": "+/-"
            },
            {
                timestamp: "2013-11-07T10:22:00.000+01:00",
                "measurement": "+2"
            }
        ]
    };

    var glucoseInUrineMeasurement = {
        "links": {
            "self": "http://localhost:5000/opentele-server/rest/patient/measurements/urine_glucose"
        },
        "type": "urine_glucose",
        "unit": "mmol/L",
        "measurements": [
            {
                "timestamp": "2014-11-09T14:28:00.000+01:00",
                "measurement": "+1"
            },
            {
                "timestamp": "2014-10-21T09:39:00.000+01:00",
                "measurement": "+4"
            },
            {
                "timestamp": "2014-09-06T11:01:00.000+01:00",
                "measurement": "+1"
            },
            {
                "timestamp": "2014-07-11T12:55:00.000+01:00",
                "measurement": "+1"
            },
            {
                "timestamp": "2014-04-11T12:51:00.000+01:00",
                "measurement": "+3"
            }
        ]
    };

    var pulseMeasurement = {
        "links": {
            "self": "http://localhost:5000/opentele-server/rest/patient/measurements/pulse"
        },
        "type": "pulse",
        "unit": "BPM",
        "measurements": [
            {
                "timestamp": "2014-11-11T15:34:00.000+02:00",
                "measurement": 53
            },
            {
                "timestamp": "2014-11-08T05:03:00.000+02:00",
                "measurement": 55
            },
            {
                "timestamp": "2014-11-06T12:34:00.000+02:00",
                "measurement": 56
            },
            {
                "timestamp": "2014-10-19T22:11:00.000+02:00",
                "measurement": 62
            },
            {
                "timestamp": "2014-09-19T08:31:00.000+02:00",
                "measurement": 67
            },
            {
                "timestamp": "2014-08-19T10:23:00.000+02:00",
                "measurement": 72
            },
            {
                "timestamp": "2014-07-19T09:47:00.000+02:00",
                "measurement": 77
            },
            {
                "timestamp": "2014-06-19T15:15:00.000+02:00",
                "measurement": 88
            },
            {
                "timestamp": "2014-05-19T23:54:00.000+02:00",
                "measurement": 82
            },
            {
                "timestamp": "2014-04-19T17:38:00.000+02:00",
                "measurement": 75
            },
            {
                "timestamp": "2014-03-19T10:29:00.000+01:00",
                "measurement": 70
            },
            {
                "timestamp": "2014-02-19T03:44:00.000+01:00",
                "measurement": 63
            },
            {
                "timestamp": "2014-01-19T07:25:00.000+01:00",
                "measurement": 56
            },
            {
                "timestamp": "2013-12-19T05:53:00.000+01:00",
                "measurement": 52
            },
            {
                "timestamp": "2012-12-19T21:23:00.000+01:00",
                "measurement": 47
            }
        ]
    };

    var weightMeasurement = {
        "links": {
            "self": "http://localhost:5000/opentele-server/rest/patient/measurements/weight"
        },
        "type": "weight",
        "unit": "Kg",
        "measurements": [
            {
                "timestamp": "2014-11-09T09:14:00.000+01:00",
                "measurement": 56.0
            },
            {
                "timestamp": "2014-10-15T19:17:00.000+01:00",
                "measurement": 100.0
            },
            {
                "timestamp": "2014-09-25T23:11:00.000+01:00",
                "measurement": 42.3
            },
            {
                "timestamp": "2014-08-22T12:24:00.000+01:00",
                "measurement": 70.5
            },
            {
                "timestamp": "2014-07-04T17:35:00.000+01:00",
                "measurement": 64.7
            },
            {
                "timestamp": "2014-06-06T05:54:00.000+01:00",
                "measurement": 35.8
            },
            {
                "timestamp": "2013-10-13T06:35:00.000+01:00",
                "measurement": 110.5
            },
            {
                "timestamp": "2012-09-07T14:46:00.000+01:00",
                "measurement": 95
            }
        ]
    };

    var hemoglobinMeasurement = {
        "links": {
            "self": "http://localhost:5000/opentele-server/rest/patient/measurements/hemoglobin"
        },
        "type": "hemoglobin",
        "unit": "",
        "measurements": [
        ]
    };

    var saturationMeasurement = {
        "links": {
            "self": "http://localhost:5000/opentele-server/rest/patient/measurements/saturation"
        },
        "type": "saturation",
        "unit": "%",
        "measurements": [
            {
                "timestamp": "2014-11-09T09:14:00.000+01:00",
                "measurement": 98
            },
            {
                "timestamp": "2014-10-15T19:17:00.000+01:00",
                "measurement": 95
            },
            {
                "timestamp": "2014-09-25T23:11:00.000+01:00",
                "measurement": 99
            },
            {
                "timestamp": "2014-08-22T12:24:00.000+01:00",
                "measurement": 95
            },
            {
                "timestamp": "2014-07-04T17:35:00.000+01:00",
                "measurement": 93
            },
            {
                "timestamp": "2014-06-06T05:54:00.000+01:00",
                "measurement": 85
            },
            {
                "timestamp": "2013-10-13T06:35:00.000+01:00",
                "measurement": 89
            },
            {
                "timestamp": "2012-09-07T14:46:00.000+01:00",
                "measurement": 87
            }
        ]
    };

    var crpMeasurement = {
        "links": {
            "self": "http://localhost:5000/opentele-server/rest/patient/measurements/crp"
        },
        "type": "crp",
        "unit": "mg/L",
        "measurements": [
            {
                "timestamp": "2014-11-09T09:14:00.000+01:00",
                "measurement": 3
            },
            {
                "timestamp": "2014-10-15T19:17:00.000+01:00",
                "measurement": 54
            },
            {
                "timestamp": "2014-09-25T23:11:00.000+01:00",
                "measurement": 123
            },
            {
                "timestamp": "2014-08-22T12:24:00.000+01:00",
                "measurement": 346
            },
            {
                "timestamp": "2014-07-04T17:35:00.000+01:00",
                "measurement": 760
            },
            {
                "timestamp": "2014-06-06T05:54:00.000+01:00",
                "measurement": 433
            },
            {
                "timestamp": "2013-10-13T06:35:00.000+01:00",
                "measurement": 321
            },
            {
                "timestamp": "2012-09-07T14:46:00.000+01:00",
                "measurement": 7
            }
        ]
    };

    var bloodSugarMeasurement = {
        "links": {
            "self": "http://localhost:5000/opentele-server/rest/patient/measurements/bloodsugar"
        },
        "type": "bloodsugar",
        "unit": "mmol/L",
        "measurements": [
            {
                "timestamp": "2014-11-09T16:43:00.000+01:00",
                "measurement": {
                    "value": 3.4,
                    "isAfterMeal": false,
                    "isBeforeMeal": true,
                    "isControlMeasurement": false,
                    "isOutOfBounds": false,
                    "otherInformation": "",
                    "hasTemperatureWarning": false
                }
            },
            {
                "timestamp": "2014-11-09T09:14:00.000+01:00",
                "measurement": {
                    "value": 5.4,
                    "isAfterMeal": true,
                    "isBeforeMeal": false,
                    "isControlMeasurement": false,
                    "isOutOfBounds": false,
                    "otherInformation": "",
                    "hasTemperatureWarning": false
                }
            },
            {
                "timestamp": "2014-11-09T06:35:00.000+01:00",
                "measurement": {
                    "value": 7.3,
                    "isAfterMeal": false,
                    "isBeforeMeal": true,
                    "isControlMeasurement": false,
                    "isOutOfBounds": false,
                    "otherInformation": "",
                    "hasTemperatureWarning": false
                }
            },
            {
                "timestamp": "2014-11-07T14:15:00.000+01:00",
                "measurement": {
                    "value": 8.7,
                    "isAfterMeal": false,
                    "isBeforeMeal": false,
                    "isControlMeasurement": false,
                    "isOutOfBounds": false,
                    "otherInformation": "",
                    "hasTemperatureWarning": false
                }
            },
            {
                "timestamp": "2014-11-01T05:36:00.000+01:00",
                "measurement": {
                    "value": 3.5,
                    "isAfterMeal": true,
                    "isBeforeMeal": false,
                    "isControlMeasurement": false,
                    "isOutOfBounds": false,
                    "otherInformation": "",
                    "hasTemperatureWarning": false
                }
            },
            {
                "timestamp": "2014-10-27T17:02:00.000+01:00",
                "measurement": {
                    "value": 13.4,
                    "isAfterMeal": false,
                    "isBeforeMeal": true,
                    "isControlMeasurement": false,
                    "isOutOfBounds": false,
                    "otherInformation": "",
                    "hasTemperatureWarning": false
                }
            },
            {
                "timestamp": "2014-10-16T23:52:00.000+01:00",
                "measurement": {
                    "value": 10.2,
                    "isAfterMeal": false,
                    "isBeforeMeal": true,
                    "isControlMeasurement": false,
                    "isOutOfBounds": false,
                    "otherInformation": "",
                    "hasTemperatureWarning": false
                }
            },
            {
                "timestamp": "2014-10-02T16:37:00.000+01:00",
                "measurement": {
                    "value": 2.9,
                    "isAfterMeal": false,
                    "isBeforeMeal": false,
                    "isControlMeasurement": false,
                    "isOutOfBounds": false,
                    "otherInformation": "",
                    "hasTemperatureWarning": false
                }
            },
            {
                "timestamp": "2014-09-05T18:18:00.000+01:00",
                "measurement": {
                    "value": 9.2,
                    "isAfterMeal": true,
                    "isBeforeMeal": false,
                    "isControlMeasurement": false,
                    "isOutOfBounds": false,
                    "otherInformation": "",
                    "hasTemperatureWarning": false
                }
            },
            {
                "timestamp": "2014-08-05T04:37:00.000+01:00",
                "measurement": {
                    "value": 5.6,
                    "isAfterMeal": false,
                    "isBeforeMeal": true,
                    "isControlMeasurement": false,
                    "isOutOfBounds": false,
                    "otherInformation": "",
                    "hasTemperatureWarning": false
                }
            },
            {
                "timestamp": "2014-07-07T07:07:00.000+01:00",
                "measurement": {
                    "value": 3.7,
                    "isAfterMeal": false,
                    "isBeforeMeal": false,
                    "isControlMeasurement": false,
                    "isOutOfBounds": false,
                    "otherInformation": "",
                    "hasTemperatureWarning": false
                }
            },
            {
                "timestamp": "2014-06-01T05:34:00.000+01:00",
                "measurement": {
                    "value": 5.9,
                    "isAfterMeal": false,
                    "isBeforeMeal": false,
                    "isControlMeasurement": false,
                    "isOutOfBounds": false,
                    "otherInformation": "",
                    "hasTemperatureWarning": false
                }
            },
            {
                "timestamp": "2014-05-15T03:37:00.000+01:00",
                "measurement": {
                    "value": 7.7,
                    "isAfterMeal": true,
                    "isBeforeMeal": false,
                    "isControlMeasurement": false,
                    "isOutOfBounds": false,
                    "otherInformation": "",
                    "hasTemperatureWarning": false
                }
            },
            {
                "timestamp": "2014-04-06T20:23:00.000+01:00",
                "measurement": {
                    "value": 6.3,
                    "isAfterMeal": false,
                    "isBeforeMeal": true,
                    "isControlMeasurement": false,
                    "isOutOfBounds": false,
                    "otherInformation": "",
                    "hasTemperatureWarning": false
                }
            }
        ]
    };

    var lungFunctionMeasurement = {
        "links": {
            "self": "http://localhost:5000/opentele-server/rest/patient/measurements/lung_function"
        },
        "type": "lung_function",
        "unit": "L",
        "measurements": [
            {
                "timestamp": "2014-11-09T09:14:00.000+01:00",
                "measurement": 3.3
            },
            {
                "timestamp": "2014-10-15T19:17:00.000+01:00",
                "measurement": 2.7
            },
            {
                "timestamp": "2014-09-25T23:11:00.000+01:00",
                "measurement": 5.6
            },
            {
                "timestamp": "2014-08-22T12:24:00.000+01:00",
                "measurement": 4.5
            },
            {
                "timestamp": "2014-07-04T17:35:00.000+01:00",
                "measurement": 8.2
            },
            {
                "timestamp": "2014-06-06T05:54:00.000+01:00",
                "measurement": 3.7
            },
            {
                "timestamp": "2013-10-13T06:35:00.000+01:00",
                "measurement": 6.1
            },
            {
                "timestamp": "2012-09-07T14:46:00.000+01:00",
                "measurement": 5.0
            }
        ]
    };

    var continuousBloodSugarMeasurement = {
        "links": {
            "self": "http://localhost:5000/opentele-server/rest/patient/measurements/continuous_blood_sugar_measurement"
        },
        "type": "continuous_blood_sugar_measurement",
        "unit": "mmol/L",
        "measurements": [
            {
                "timestamp": "2014-11-09T16:43:00.000+01:00",
                "measurement": {
                    "value": 3.4,
                    "type": "continuous_blood_sugar_measurement"
                }
            },
            {
                "timestamp": "2014-11-09T09:14:00.000+01:00",
                "measurement": {
                    "value": 5.4,
                    "type": "coulometer_reading"
                }
            },
            {
                "timestamp": "2014-11-09T06:35:00.000+01:00",
                "measurement": {
                    "value": 7.3,
                    "type": "continuous_blood_sugar_measurement"
                }
            },
            {
                "timestamp": "2014-11-07T14:15:00.000+01:00",
                "measurement": {
                    "value": 8.7,
                    "type": "meal",
                    "carboGrams": 9,
                    "foodType": "SNACK"
                }
            },
            {
                "timestamp": "2014-11-01T05:36:00.000+01:00",
                "measurement": {
                    "value": 3.5,
                    "type": "continuous_blood_sugar_measurement"
                }
            },
            {
                "timestamp": "2014-10-27T17:02:00.000+01:00",
                "measurement": {
                    "value": 13.4,
                    "type": "continuous_blood_sugar_measurement"
                }
            },
            {
                "timestamp": "2014-10-16T23:52:00.000+01:00",
                "measurement": {
                    "value": 10.2,
                    "type": "state_of_health",
                    "stateOfHealth": "DIZZY"
                }
            },
            {
                "timestamp": "2014-10-02T16:37:00.000+01:00",
                "measurement": {
                    "value": 2.9,
                    "type": "continuous_blood_sugar_measurement"
                }
            },
            {
                "timestamp": "2014-09-05T18:18:00.000+01:00",
                "measurement": {
                    "value": 9.2,
                    "type": "generic",
                    "indicatedEvent": "UNSELECTED_DEFAULT"
                }
            },
            {
                "timestamp": "2014-08-05T04:37:00.000+01:00",
                "measurement": {
                    "value": 5.6,
                    "type": "continuous_blood_sugar_measurement"
                }
            },
            {
                "timestamp": "2014-07-07T07:07:00.000+01:00",
                "measurement": {
                    "value": 3.7,
                    "type": "exercise",
                    "exerciseType": "RUNNING",
                    "durationInMinutes": 15,
                    "exerciseIntensity": "MEDIUM"
                }
            },
            {
                "timestamp": "2014-06-01T05:34:00.000+01:00",
                "measurement": {
                    "value": 5.9,
                    "type": "continuous_blood_sugar_measurement"
                }
            },
            {
                "timestamp": "2014-05-15T03:37:00.000+01:00",
                "measurement": {
                    "value": 7.3,
                    "type": "insulin",
                    "insulinType": "SHORT_ACTING",
                    "units": "5"
                }
            },
            {
                "timestamp": "2014-04-06T20:23:00.000+01:00",
                "measurement": {
                    "value": 6.3,
                    "type": "continuous_blood_sugar_measurement"
                }
            }
        ]
    };

}());
