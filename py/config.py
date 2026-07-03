# IinLookup SDK configuration


def make_config():
    return {
        "main": {
            "name": "IinLookup",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "http://{{base_url}}",
            "auth": {
                "prefix": "Bearer",
            },
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "overview": {},
            },
        },
        "entity": {
      "overview": {
        "fields": [],
        "name": "overview",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "active": True,
                "args": {},
                "method": "POST",
                "orig": "/iin",
                "parts": [
                  "iin",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "create",
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "example": "12345",
                      "kind": "query",
                      "name": "digit",
                      "orig": "digit",
                      "reqd": False,
                      "type": "`$INTEGER`",
                    },
                    {
                      "active": True,
                      "example": "{{secret_key}}",
                      "kind": "query",
                      "name": "key",
                      "orig": "key",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/iin",
                "parts": [
                  "iin",
                ],
                "select": {
                  "exist": [
                    "digit",
                    "key",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
