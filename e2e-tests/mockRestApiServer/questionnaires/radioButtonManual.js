(function() {
    'use strict';

    exports.get = {
        "name": "Radioknap test",
        "id": 25,
        "startNode": "151",
        "endNode": "153",
        "nodes": [
            {
                "IONode": {
                    "nodeName": "152",
                    "elements": [
                        {
                            "TextViewElement": {
                                "text": "Test radioknapper",
                                "header": false
                            }
                        },
                        {
                            "RadioButtonElement": {
                                "choices": [
                                    {
                                        "value": {
                                            "type": "String",
                                            "value": "Lilla"
                                        },
                                        "text": "Purple"
                                    },
                                    {
                                        "value": {
                                            "type": "String",
                                            "value": "Rød"
                                        },
                                        "text": "Red"
                                    },
                                    {
                                        "value": {
                                            "type": "String",
                                            "value": "Blå"
                                        },
                                        "text": "Blue"
                                    }
                                ],
                                "outputVariable": {
                                    "name": "152.FIELD",
                                    "type": "String"
                                }
                            }
                        },
                        {
                            "ButtonElement": {
                                "text": "Næste",
                                "gravity": "center",
                                "next": "153",
                                "skipValidation": false
                            }
                        }
                    ],
                    "next": "153"
                }
            },
            {
                "IONode": {
                    "nodeName": "151",
                    "elements": [
                        {
                            "TextViewElement": {
                                "text": "Radioknap test!"
                            }
                        },
                        {
                            "ButtonElement": {
                                "text": "Næste",
                                "gravity": "center",
                                "next": "152"
                            }
                        }
                    ]
                }
            },
            {
                "EndNode": {
                    "nodeName": "153"
                }
            }
        ],
        "output": [
            {
                "name": "152.FIELD",
                "type": "String"
            }
        ]
    };

}());