(function() {
    'use strict';

    exports.get = {
        "name": "C-reaktivt Protein (CRP)",
        "id": 23,
        "startNode": "146",
        "endNode": "147",
        "nodes": [
            {
                "CRPNode": {
                    "nodeName": "146",
                    "text": "Indtast værdi eller vælg <5",
                    "next": "ANSEV_147_D146",
                    "nextFail": "AN_146_CANCEL",
                    "CRP": {
                        "name": "146.CRP",
                        "type": "Integer"
                    }
                }
            },
            {
                "AssignmentNode": {
                    "nodeName": "AN_146_CANCEL",
                    "next": "ANSEV_147_F146",
                    "variable": {
                        "name": "146.CRP#CANCEL",
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
                    "nodeName": "ANSEV_147_F146",
                    "next": "147",
                    "variable": {
                        "name": "146.CRP#SEVERITY",
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
                    "nodeName": "ANSEV_147_D146",
                    "next": "147",
                    "variable": {
                        "name": "146.CRP#SEVERITY",
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
                    "nodeName": "147"
                }
            }
        ],
        "output": [
            {
                "name": "146.CRP",
                "type": "Integer"
            },
            {
                "name": "146.CRP#SEVERITY",
                "type": "String"
            },
            {
                "name": "146.CRP#CANCEL",
                "type": "Boolean"
            }
        ]
    };

}());