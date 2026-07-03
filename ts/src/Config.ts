
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'ProjectName',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    }

  }


  options = {
    base: 'http://{{base_url}}',

    auth: {
      prefix: 'Bearer',
    },

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      overview: {
      },

    }
  }


  entity = {
    "overview": {
      "fields": [],
      "name": "overview",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "active": true,
              "args": {},
              "method": "POST",
              "orig": "/iin",
              "parts": [
                "iin"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 0
            }
          ],
          "key$": "create"
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "active": true,
              "args": {
                "query": [
                  {
                    "active": true,
                    "example": "12345",
                    "kind": "query",
                    "name": "digit",
                    "orig": "digit",
                    "reqd": false,
                    "type": "`$INTEGER`"
                  },
                  {
                    "active": true,
                    "example": "{{secret_key}}",
                    "kind": "query",
                    "name": "key",
                    "orig": "key",
                    "reqd": false,
                    "type": "`$STRING`"
                  }
                ]
              },
              "method": "GET",
              "orig": "/iin",
              "parts": [
                "iin"
              ],
              "select": {
                "exist": [
                  "digit",
                  "key"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 0
            }
          ],
          "key$": "load"
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config
}

