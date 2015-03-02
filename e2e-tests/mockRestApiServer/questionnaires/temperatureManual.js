(function() {
    'use strict';

    exports.get = {
        "name": "Temperatur test",
        "id": 21,
        "startNode": "142",
        "endNode": "143",
        "nodes": [{
            "EndNode": {
                "nodeName": "143"
            }
        }, {
            "TemperatureDeviceNode": {
                "nodeName": "142",
                "next": "ANSEV_143_D142",
                "nextFail": "AN_142_CANCEL",
                "text": "Mål din temperatur og indtast resultatet i feltet nedenfor",
                "temperature": {
                    "name": "142.TEMPERATURE",
                    "type": "Float"
                }
            }
        }, {
            "AssignmentNode": {
                "nodeName": "AN_142_CANCEL",
                "next": "ANSEV_143_F142",
                "variable": {
                    "name": "142.TEMPERATURE#CANCEL",
                    "type": "Boolean"
                },
                "expression": {
                    "type": "Boolean",
                    "value": true
                }
            }
        }, {
            "AssignmentNode": {
                "nodeName": "ANSEV_143_F142",
                "next": "143",
                "variable": {
                    "name": "142.TEMPERATURE#SEVERITY",
                    "type": "String"
                },
                "expression": {
                    "type": "String",
                    "value": "GREEN"
                }
            }
        }, {
            "AssignmentNode": {
                "nodeName": "ANSEV_143_D142",
                "next": "143",
                "variable": {
                    "name": "142.TEMPERATURE#SEVERITY",
                    "type": "String"
                },
                "expression": {
                    "type": "String",
                    "value": "GREEN"
                }
            }
        }],
        "output": [{
            "name": "142.TEMPERATURE#SEVERITY",
            "type": "String"
        }, {
            "name": "142.TEMPERATURE#CANCEL",
            "type": "Boolean"
        }, {
            "name": "142.TEMPERATURE",
            "type": "Float"
        }]
    };
}());
