<?php
declare(strict_types=1);

// IinLookup SDK configuration

class IinLookupConfig
{
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "IinLookup",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
        ],
            ],
            "options" => [
                "base" => "http://{{base_url}}",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "overview" => [],
                ],
            ],
            "entity" => [
        'overview' => [
          'fields' => [],
          'name' => 'overview',
          'op' => [
            'create' => [
              'name' => 'create',
              'points' => [
                [
                  'method' => 'POST',
                  'orig' => '/iin',
                  'parts' => [
                    'iin',
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'args' => [],
                  'select' => [],
                  'index$' => 0,
                ],
              ],
              'input' => 'data',
              'key$' => 'create',
            ],
            'load' => [
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => '12345',
                        'kind' => 'query',
                        'name' => 'digit',
                        'orig' => 'digit',
                        'reqd' => false,
                        'type' => '`$INTEGER`',
                        'active' => true,
                      ],
                      [
                        'example' => '{{secret_key}}',
                        'kind' => 'query',
                        'name' => 'key',
                        'orig' => 'key',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/iin',
                  'parts' => [
                    'iin',
                  ],
                  'select' => [
                    'exist' => [
                      'digit',
                      'key',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'index$' => 0,
                ],
              ],
              'input' => 'data',
              'key$' => 'load',
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return IinLookupFeatures::make_feature($name);
    }
}
