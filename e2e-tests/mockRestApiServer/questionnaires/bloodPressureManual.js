(function() {
    'use strict';

    exports.get = {
        "name": "Blodtryk (manuel)",
        "id": 83,
        "startNode": "491",
        "endNode": "496",
        "nodes": [{
            "EndNode": {
                "nodeName": "496"
            }
        }, {
            "IONode": {
                "nodeName": "495",
                "elements": [{
                    "TextViewElement": {
                        "text": "Ring til jordemoder"
                    }
                }, {
                    "ButtonElement": {
                        "text": "Næste",
                        "gravity": "center",
                        "next": "496"
                    }
                }]
            }
        }, {
            "DecisionNode": {
                "nodeName": "492",
                "next": "AN_493_T492",
                "nextFalse": "AN_496_F492",
                "expression": {
                    "lt": {
                        "left": {
                            "type": "Integer",
                            "value": 90
                        },
                        "right": {
                            "type": "name",
                            "value": "491.BP#DIASTOLIC"
                        }
                    }
                }
            }
        }, {
            "AssignmentNode": {
                "nodeName": "AN_493_T492",
                "next": "ANSEV_493_T492",
                "variable": {
                    "name": "492.DECISION",
                    "type": "Boolean"
                },
                "expression": {
                    "type": "Boolean",
                    "value": true
                }
            }
        }, {
            "AssignmentNode": {
                "nodeName": "AN_496_F492",
                "next": "ANSEV_496_F492",
                "variable": {
                    "name": "492.DECISION",
                    "type": "Boolean"
                },
                "expression": {
                    "type": "Boolean",
                    "value": false
                }
            }
        }, {
            "AssignmentNode": {
                "nodeName": "ANSEV_493_T492",
                "next": "493",
                "variable": {
                    "name": "492.DECISION#SEVERITY",
                    "type": "String"
                },
                "expression": {
                    "type": "String",
                    "value": "YELLOW"
                }
            }
        }, {
            "AssignmentNode": {
                "nodeName": "ANSEV_496_F492",
                "next": "496",
                "variable": {
                    "name": "492.DECISION#SEVERITY",
                    "type": "String"
                },
                "expression": {
                    "type": "String",
                    "value": "GREEN"
                }
            }
        }, {
            "DecisionNode": {
                "nodeName": "493",
                "next": "AN_495_T493",
                "nextFalse": "AN_494_F493",
                "expression": {
                    "lt": {
                        "left": {
                            "type": "Integer",
                            "value": 110
                        },
                        "right": {
                            "type": "name",
                            "value": "491.BP#DIASTOLIC"
                        }
                    }
                }
            }
        }, {
            "AssignmentNode": {
                "nodeName": "AN_495_T493",
                "next": "ANSEV_495_T493",
                "variable": {
                    "name": "493.DECISION",
                    "type": "Boolean"
                },
                "expression": {
                    "type": "Boolean",
                    "value": true
                }
            }
        }, {
            "AssignmentNode": {
                "nodeName": "AN_494_F493",
                "next": "ANSEV_494_F493",
                "variable": {
                    "name": "493.DECISION",
                    "type": "Boolean"
                },
                "expression": {
                    "type": "Boolean",
                    "value": false
                }
            }
        }, {
            "AssignmentNode": {
                "nodeName": "ANSEV_495_T493",
                "next": "495",
                "variable": {
                    "name": "493.DECISION#SEVERITY",
                    "type": "String"
                },
                "expression": {
                    "type": "String",
                    "value": "RED"
                }
            }
        }, {
            "AssignmentNode": {
                "nodeName": "ANSEV_494_F493",
                "next": "494",
                "variable": {
                    "name": "493.DECISION#SEVERITY",
                    "type": "String"
                },
                "expression": {
                    "type": "String",
                    "value": "GREEN"
                }
            }
        }, {
            "IONode": {
                "nodeName": "494",
                "elements": [{
                    "TextViewElement": {
                        "text": "Er blodtrykket højere end vanligt?"
                    }
                }, {
                    "TwoButtonElement": {
                        "leftText": "Nej",
                        "leftNext": "AN_496_L494",
                        "rightText": "Ja",
                        "rightNext": "AN_495_R494"
                    }
                }]
            }
        }, {
            "AssignmentNode": {
                "nodeName": "AN_495_R494",
                "next": "ANSEV_495_R494",
                "variable": {
                    "name": "494.FIELD",
                    "type": "Boolean"
                },
                "expression": {
                    "type": "Boolean",
                    "value": true
                }
            }
        }, {
            "AssignmentNode": {
                "nodeName": "AN_496_L494",
                "next": "ANSEV_496_L494",
                "variable": {
                    "name": "494.FIELD",
                    "type": "Boolean"
                },
                "expression": {
                    "type": "Boolean",
                    "value": false
                }
            }
        }, {
            "AssignmentNode": {
                "nodeName": "ANSEV_495_R494",
                "next": "495",
                "variable": {
                    "name": "494.FIELD#SEVERITY",
                    "type": "String"
                },
                "expression": {
                    "type": "String",
                    "value": "RED"
                }
            }
        }, {
            "AssignmentNode": {
                "nodeName": "ANSEV_496_L494",
                "next": "496",
                "variable": {
                    "name": "494.FIELD#SEVERITY",
                    "type": "String"
                },
                "expression": {
                    "type": "String",
                    "value": "YELLOW"
                }
            }
        }, {
            "IONode": {
                "nodeName": "491",
                "elements": [{
                    "TextViewElement": {
                        "text": "Indtast blodtryk og puls"
                    }
                }, {
                    "TextViewElement": {
                        "text": "Systolisk blodtryk"
                    }
                }, {
                    "EditTextElement": {
                        "outputVariable": {
                            "name": "491.BP#SYSTOLIC",
                            "type": "Integer"
                        }
                    }
                }, {
                    "TextViewElement": {
                        "text": "Diastolisk blodtryk"
                    }
                }, {
                    "EditTextElement": {
                        "outputVariable": {
                            "name": "491.BP#DIASTOLIC",
                            "type": "Integer"
                        }
                    }
                }, {
                    "TextViewElement": {
                        "text": "Puls"
                    }
                }, {
                    "EditTextElement": {
                        "outputVariable": {
                            "name": "491.BP#PULSE",
                            "type": "Integer"
                        }
                    }
                }, {
                    "TwoButtonElement": {
                        "leftText": "Undlad",
                        "leftNext": "AN_491_CANCEL",
                        "leftSkipValidation": true,
                        "rightText": "Næste",
                        "rightNext": "ANSEV_492_D491",
                        "rightSkipValidation": false
                    }
                }],
                "next": "ANSEV_492_D491"
            }
        }, {
            "AssignmentNode": {
                "nodeName": "AN_491_CANCEL",
                "next": "ANSEV_496_F491",
                "variable": {
                    "name": "491.BP##CANCEL",
                    "type": "Boolean"
                },
                "expression": {
                    "type": "Boolean",
                    "value": true
                }
            }
        }, {
            "AssignmentNode": {
                "nodeName": "ANSEV_496_F491",
                "next": "496",
                "variable": {
                    "name": "491.BP##SEVERITY",
                    "type": "String"
                },
                "expression": {
                    "type": "String",
                    "value": "YELLOW"
                }
            }
        }, {
            "AssignmentNode": {
                "nodeName": "ANSEV_492_D491",
                "next": "492",
                "variable": {
                    "name": "491.BP##SEVERITY",
                    "type": "String"
                },
                "expression": {
                    "type": "String",
                    "value": "GREEN"
                }
            }
        }],
        "output": [{
            "name": "491.BP#DIASTOLIC",
            "type": "Integer"
        }, {
            "name": "494.FIELD",
            "type": "Boolean"
        }, {
            "name": "492.DECISION",
            "type": "Boolean"
        }, {
            "name": "491.BP##SEVERITY",
            "type": "String"
        }, {
            "name": "491.BP##CANCEL",
            "type": "Boolean"
        }, {
            "name": "493.DECISION#SEVERITY",
            "type": "String"
        }, {
            "name": "491.BP#SYSTOLIC",
            "type": "Integer"
        }, {
            "name": "491.BP#PULSE",
            "type": "Integer"
        }, {
            "name": "493.DECISION",
            "type": "Boolean"
        }, {
            "name": "492.DECISION#SEVERITY",
            "type": "String"
        }, {
            "name": "494.FIELD#SEVERITY",
            "type": "String"
        }]
    };
}());
