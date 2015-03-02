(function() {
    'use strict';

    exports.get = {
        "name": "Hæmoglobin indhold i blod",
        "id": 22,
        "startNode": "144",
        "endNode": "145",
        "nodes": [{
            "EndNode": {
                "nodeName": "145"
            }
        }, {
            "HaemoglobinDeviceNode": {
                "nodeName": "144",
                "next": "ANSEV_145_D144",
                "nextFail": "AN_144_CANCEL",
                "text": "Mål hæmoglobinindholdet i dit blod og indtast resultatet nedenfor",
                "haemoglobinValue": {
                    "name": "144.HEMOGLOBIN",
                    "type": "Float"
                }
            }
        }, {
            "AssignmentNode": {
                "nodeName": "AN_144_CANCEL",
                "next": "ANSEV_145_F144",
                "variable": {
                    "name": "144.HEMOGLOBIN#CANCEL",
                    "type": "Boolean"
                },
                "expression": {
                    "type": "Boolean",
                    "value": true
                }
            }
        }, {
            "AssignmentNode": {
                "nodeName": "ANSEV_145_F144",
                "next": "145",
                "variable": {
                    "name": "144.HEMOGLOBIN#SEVERITY",
                    "type": "String"
                },
                "expression": {
                    "type": "String",
                    "value": "GREEN"
                }
            }
        }, {
            "AssignmentNode": {
                "nodeName": "ANSEV_145_D144",
                "next": "145",
                "variable": {
                    "name": "144.HEMOGLOBIN#SEVERITY",
                    "type": "String"
                },
                "expression": {
                    "type": "String",
                    "value": "GREEN"
                }
            }
        }],
        "output": [{
            "name": "144.HEMOGLOBIN#CANCEL",
            "type": "Boolean"
        }, {
            "name": "144.HEMOGLOBIN#SEVERITY",
            "type": "String"
        }, {
            "name": "144.HEMOGLOBIN",
            "type": "Float"
        }]
    };
}());
