(function() {
    'use strict';

    exports.get = {
        "name": "Urinundersøgelse (glukose)",
        "id": 12,
        "startNode": "110",
        "endNode": "112",
        "nodes": [{
            "GlucoseUrineDeviceNode": {
                "nodeName": "110",
                "next": "ANSEV_112_D110",
                "nextFail": "AN_110_CANCEL",
                "text": "Indtast resultatet fra din urinundersøgelse\nGlukose (sukker)",
                "glucoseUrine": {
                    "name": "110.URINE_GLUCOSE",
                    "type": "Integer"
                }
            }
        }, {
            "AssignmentNode": {
                "nodeName": "AN_110_CANCEL",
                "next": "ANSEV_112_F110",
                "variable": {
                    "name": "110.URINE_GLUCOSE#CANCEL",
                    "type": "Boolean"
                },
                "expression": {
                    "type": "Boolean",
                    "value": true
                }
            }
        }, {
            "AssignmentNode": {
                "nodeName": "ANSEV_112_F110",
                "next": "112",
                "variable": {
                    "name": "110.URINE_GLUCOSE#SEVERITY",
                    "type": "String"
                },
                "expression": {
                    "type": "String",
                    "value": "GREEN"
                }
            }
        }, {
            "AssignmentNode": {
                "nodeName": "ANSEV_112_D110",
                "next": "112",
                "variable": {
                    "name": "110.URINE_GLUCOSE#SEVERITY",
                    "type": "String"
                },
                "expression": {
                    "type": "String",
                    "value": "GREEN"
                }
            }
        }, {
            "EndNode": {
                "nodeName": "112"
            }
        }],
        "output": [{
            "name": "110.URINE_GLUCOSE#CANCEL",
            "type": "Boolean"
        }, {
            "name": "111.URINE#CANCEL",
            "type": "Boolean"
        }, {
            "name": "110.URINE_GLUCOSE",
            "type": "Integer"
        }, {
            "name": "110.URINE_GLUCOSE#SEVERITY",
            "type": "String"
        }]
    };
}());
