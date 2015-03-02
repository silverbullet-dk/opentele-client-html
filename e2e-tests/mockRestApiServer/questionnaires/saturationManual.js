(function() {
    'use strict';

    exports.get = {
    "name": "Saturation (manuel)",
    "id": 37,
    "startNode": "198",
    "endNode": "200",
    "nodes": [
        {
            "EndNode": {
                "nodeName": "200"
            }
        },
        {
            "IONode": {
                "nodeName": "198",
                "elements": [
                    {
                        "TextViewElement": {
                            "text": "Så skal der måles Saturation!"
                        }
                    },
                    {
                        "ButtonElement": {
                            "text": "Næste",
                            "gravity": "center",
                            "next": "199"
                        }
                    }
                ]
            }
        },
        {
            "IONode": {
                "nodeName": "199",
                "elements": [
                    {
                        "TextViewElement": {
                            "text": "Saturation"
                        }
                    },
                    {
                        "TextViewElement": {
                            "text": "Iltmætning"
                        }
                    },
                    {
                        "EditTextElement": {
                            "outputVariable": {
                                "name": "199.SAT#SATURATION",
                                "type": "Integer"
                            }
                        }
                    },
                    {
                        "TextViewElement": {
                            "text": "Puls"
                        }
                    },
                    {
                        "EditTextElement": {
                            "outputVariable": {
                                "name": "199.SAT#PULSE",
                                "type": "Float"
                            }
                        }
                    },
                    {
                        "TextViewElement": {
                            "text": "Hvordan har du det?"
                        }
                    },
                    {
                        "EditTextElement": {
                            "outputVariable": {
                                "name": "199.SAT#HEALTH",
                                "type": "String"
                            }
                        }
                    },
                    {
                        "TwoButtonElement": {
                            "leftText": "Undlad",
                            "leftNext": "AN_199_CANCEL",
                            "leftSkipValidation": true,
                            "rightText": "Næste",
                            "rightNext": "ANSEV_200_D199",
                            "rightSkipValidation": false
                        }
                    }
                ],
                "next": "200"
            }
        },
        {
            "AssignmentNode": {
                "nodeName": "AN_199_CANCEL",
                "next": "ANSEV_200_F199",
                "variable": {
                    "name": "199.SAT##CANCEL",
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
                "nodeName": "ANSEV_200_F199",
                "next": "200",
                "variable": {
                    "name": "199.SAT##SEVERITY",
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
                "nodeName": "ANSEV_200_D199",
                "next": "200",
                "variable": {
                    "name": "199.SAT##SEVERITY",
                    "type": "String"
                },
                "expression": {
                    "type": "String",
                    "value": "GREEN"
                }
            }
        }
    ],
    "output": [
        {
            "name": "199.SAT##CANCEL",
            "type": "Boolean"
        },
        {
            "name": "199.SAT##SEVERITY",
            "type": "String"
        },
        {
            "name": "199.SAT#SATURATION",
            "type": "Integer"
        },
        {
            "name": "199.SAT#PULSE",
            "type": "Float"
        },
        {
            "name": "199.SAT#HEALTH",
            "type": "String"
        }
    ]};
}());
