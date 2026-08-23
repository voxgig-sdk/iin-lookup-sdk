# IinLookup SDK configuration

module IinLookupConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "IinLookup",
        "slug" => "iin-lookup",
        "version" => "0.0.1",
        "target" => "rb",
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
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => "12345",
                        "kind" => "query",
                        "name" => "digit",
                        "orig" => "digit",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "example" => "{{secret_key}}",
                        "kind" => "query",
                        "name" => "key",
                        "orig" => "key",
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
                },
              ],
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
