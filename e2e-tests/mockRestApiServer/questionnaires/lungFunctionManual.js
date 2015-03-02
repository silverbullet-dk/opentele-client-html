(function() {
    'use strict';

    exports.get = {
        "name": "Lungefunktion",
        "id": 29,
        "startNode": "172",
        "endNode": "173",
        "nodes": [{
            "EndNode": {
                "nodeName": "173"
            }
        }, {
            "LungMonitorDeviceNode": {
                "nodeName": "172",
                "next": "ANSEV_173_D172",
                "nextFail": "AN_172_CANCEL",
                "text": "Måling af lungefunktion",
                "fev1": {
                    "name": "172.LF#FEV1",
                    "type": "Float"
                },
                "fev6": {
                    "name": "172.LF#FEV6",
                    "type": "Float"
                },
                "fev1Fev6Ratio": {
                    "name": "172.LF#FEV1_FEV6_RATIO",
                    "type": "Float"
                },
                "fef2575": {
                    "name": "172.LF#FEF2575",
                    "type": "Float"
                },
                "goodTest": {
                    "name": "172.LF#FEV_GOOD_TEST",
                    "type": "Boolean"
                },
                "softwareVersion": {
                    "name": "172.LF#FEV_SOFTWARE_VERSION",
                    "type": "Integer"
                },
                "deviceId": {
                    "name": "172.LF#DEVICE_ID",
                    "type": "String"
                }
            }
        }, {
            "AssignmentNode": {
                "nodeName": "AN_172_CANCEL",
                "next": "ANSEV_173_F172",
                "variable": {
                    "name": "172.LF##CANCEL",
                    "type": "Boolean"
                },
                "expression": {
                    "type": "Boolean",
                    "value": true
                }
            }
        }, {
            "AssignmentNode": {
                "nodeName": "ANSEV_173_F172",
                "next": "173",
                "variable": {
                    "name": "172.LF##SEVERITY",
                    "type": "String"
                },
                "expression": {
                    "type": "String",
                    "value": "GREEN"
                }
            }
        }, {
            "AssignmentNode": {
                "nodeName": "ANSEV_173_D172",
                "next": "173",
                "variable": {
                    "name": "172.LF##SEVERITY",
                    "type": "String"
                },
                "expression": {
                    "type": "String",
                    "value": "GREEN"
                }
            }
        }],
        "output": [{
            "name": "172.LF##CANCEL",
            "type": "Boolean"
        }, {
            "name": "172.LF#FEF2575",
            "type": "Float"
        }, {
            "name": "172.LF#FEV1",
            "type": "Float"
        }, {
            "name": "172.LF#DEVICE_ID",
            "type": "String"
        }, {
            "name": "172.LF#FEV6",
            "type": "Float"
        }, {
            "name": "172.LF#FEV1_FEV6_RATIO",
            "type": "Float"
        }, {
            "name": "172.LF##SEVERITY",
            "type": "String"
        }, {
            "name": "172.LF#FEV_SOFTWARE_VERSION",
            "type": "Integer"
        }, {
            "name": "172.LF#FEV_GOOD_TEST",
            "type": "Boolean"
        }]
    };
}());
