(function() {
    'use strict';

    exports.get = {
        "name": "Rejse-sætte-sig test",
        "id": 28,
        "startNode": "175",
        "endNode": "179",
        "nodes": [
            {
                "IONode": {
                    "nodeName": "175",
                    "elements": [
                        {
                            "TextViewElement": {
                                "text": "Når du trykker 'Næste', vil der gå " +
                                    "3 sekunder før testen automatisk " +
                                    "starter.\nDu kan se, at der bliver talt" +
                                    " ned indtil start på test."
                            }
                        },
                        {
                            "ButtonElement": {
                                "text": "Næste",
                                "gravity": "center",
                                "next": "176"
                            }
                        }
                    ]
                }
            },
            {
                "DelayNode": {
                    "nodeName": "176",
                    "elements": [],
                    "countTime": 3,
                    "countUp": false,
                    "displayTextString": "Nedtælling på 3 sek inden teststart",
                    "next": "177"
                }
            },
            {
                "DelayNode": {
                    "nodeName": "177",
                    "elements": [],
                    "countTime": 3,
                    "countUp": true,
                    "displayTextString": "START og fortsæt i 3 sekunder.",
                    "next": "178"
                }
            },
            {
                "IONode": {
                    "nodeName": "178",
                    "elements": [
                        {
                            "TextViewElement": {
                                "text": "Indtast antallet af gentagelser, du klarede:"
                            }
                        },
                        {
                            "EditTextElement": {
                                "outputVariable": {
                                    "name": "178.FIELD",
                                    "type": "Integer"
                                }
                            }
                        },
                        {
                            "ButtonElement": {
                                "text": "Næste",
                                "gravity": "center",
                                "next": "179"
                            }
                        }
                    ],
                    "next": "179"
                }
            },
            {
                "EndNode": {
                    "nodeName": "179"
                }
            }
        ],
        "output": [
            {
                "name": "178.FIELD",
                "type": "Integer"
            }
        ]
    };
}());