(function() {
    'use strict';

    exports.get = {
        "name": "Proteinindhold i urin",
        "id": 17,
        "startNode": "131",
        "endNode": "132",
        "nodes": [{
            "EndNode": {
                "nodeName": "132"
            }
        }, {
            "UrineDeviceNode": {
                "nodeName": "131",
                "next": "ANSEV_132_D131",
                "nextFail": "AN_131_CANCEL",
                "text": "Mål proteinindholdet i din urin og indtast resultatet nedenfor",
                "urine": {
                    "name": "131.URINE",
                    "type": "Integer"
                }
            }
        }, {
            "AssignmentNode": {
                "nodeName": "AN_131_CANCEL",
                "next": "ANSEV_132_F131",
                "variable": {
                    "name": "131.URINE#CANCEL",
                    "type": "Boolean"
                },
                "expression": {
                    "type": "Boolean",
                    "value": true
                }
            }
        }, {
            "AssignmentNode": {
                "nodeName": "ANSEV_132_F131",
                "next": "132",
                "variable": {
                    "name": "131.URINE#SEVERITY",
                    "type": "String"
                },
                "expression": {
                    "type": "String",
                    "value": "GREEN"
                }
            }
        }, {
            "AssignmentNode": {
                "nodeName": "ANSEV_132_D131",
                "next": "132",
                "variable": {
                    "name": "131.URINE#SEVERITY",
                    "type": "String"
                },
                "expression": {
                    "type": "String",
                    "value": "GREEN"
                }
            }
        }],
        "output": [{
            "name": "131.URINE",
            "type": "Integer"
        }, {
            "name": "131.URINE#CANCEL",
            "type": "Boolean"
        }, {
            "name": "131.URINE#SEVERITY",
            "type": "String"
        }]
    };
}());
