<?php
declare(strict_types=1);

// IinLookup SDK base feature

class IinLookupBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(IinLookupContext $ctx, array $options): void {}
    public function PostConstruct(IinLookupContext $ctx): void {}
    public function PostConstructEntity(IinLookupContext $ctx): void {}
    public function SetData(IinLookupContext $ctx): void {}
    public function GetData(IinLookupContext $ctx): void {}
    public function GetMatch(IinLookupContext $ctx): void {}
    public function SetMatch(IinLookupContext $ctx): void {}
    public function PrePoint(IinLookupContext $ctx): void {}
    public function PreSpec(IinLookupContext $ctx): void {}
    public function PreRequest(IinLookupContext $ctx): void {}
    public function PreResponse(IinLookupContext $ctx): void {}
    public function PreResult(IinLookupContext $ctx): void {}
    public function PreDone(IinLookupContext $ctx): void {}
    public function PreUnexpected(IinLookupContext $ctx): void {}
}
