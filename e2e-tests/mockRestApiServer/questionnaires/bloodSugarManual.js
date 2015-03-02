(function() {
    'use strict';

    exports.get = {
    "name": "Blodsukker (manuel)",
    "id": 27,
    "startNode": "157",
    "endNode": "159",
    "nodes": [
        {
            "IONode": {
                "nodeName": "157",
                "elements": [
                    {
                        "TextViewElement": {
                            "text": "Så skal der måles blodsukker!"
                        }
                    },
                    {
                        "ButtonElement": {
                            "text": "Næste",
                            "gravity": "center",
                            "next": "158"
                        }
                    }
                ]
            }
        },
        {
            "BloodSugarManualDeviceNode": {
                "nodeName": "158",
                "next": "ANSEV_159_D158",
                "nextFail": "AN_158_CANCEL",
                "text": "Blodsukker",
                "bloodSugarMeasurements": {
                    "name": "158.BS#BLOODSUGARMEASUREMENTS",
                    "type": "Integer"
                },
                "deviceId": {
                    "name": "158.BS#DEVICE_ID",
                    "type": "String"
                }
            }
        },
        {
            "AssignmentNode": {
                "nodeName": "AN_158_CANCEL",
                "next": "ANSEV_159_F158",
                "variable": {
                    "name": "158.BS##CANCEL",
                    "type": "Boolean"
                },
                "expression": {
                    "type": "Boolean",
                    "value": true
                }
            }
        },
        {
            "AssignmentNode": {
                "nodeName": "ANSEV_159_F158",
                "next": "159",
                "variable": {
                    "name": "158.BS##SEVERITY",
                    "type": "String"
                },
                "expression": {
                    "type": "String",
                    "value": "GREEN"
                }
            }
        },
        {
            "AssignmentNode": {
                "nodeName": "ANSEV_159_D158",
                "next": "159",
                "variable": {
                    "name": "158.BS##SEVERITY",
                    "type": "String"
                },
                "expression": {
                    "type": "String",
                    "value": "GREEN"
                }
            }
        },
        {
            "EndNode": {
                "nodeName": "159"
            }
        }
    ],
    "output": [
        {
            "name": "158.BS##CANCEL",
            "type": "Boolean"
        },
        {
            "name": "158.BS#DEVICE_ID",
            "type": "String"
        },
        {
            "name": "158.BS##SEVERITY",
            "type": "String"
        },
        {
            "name": "158.BS#BLOODSUGARMEASUREMENTS",
            "type": "Integer"
        }
    ]};
}());
