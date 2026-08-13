# IinLookup SDK configuration

module IinLookupConfig
  def self.make_config
    {
      "main" => {
        "name" => "IinLookup",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
        },
      },
      "options" => {
        "base" => "http://{{base_url}}",
        "server" => {
          "base_url" => "",
        },
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "overview" => {},
        },
      },
      "entity" => {
        "overview" => {
          "fields" => [],
          "name" => "overview",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "active" => true,
                  "args" => {},
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/iin",
                  "parts" => [
                    "iin",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 0,
                },
              ],
              "key$" => "create",
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "active" => true,
                  "args" => {
                    "query" => [
                      {
                        "active" => true,
                        "example" => "12345",
                        "kind" => "query",
                        "name" => "digit",
                        "orig" => "digit",
                        "reqd" => false,
                        "type" => "`$INTEGER`",
                      },
                      {
                        "active" => true,
                        "example" => "{{secret_key}}",
                        "kind" => "query",
                        "name" => "key",
                        "orig" => "key",
                        "reqd" => false,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/iin",
                  "parts" => [
                    "iin",
                  ],
                  "select" => {
                    "exist" => [
                      "digit",
                      "key",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 0,
                },
              ],
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    IinLookupFeatures.make_feature(name)
  end
end
