import { IinLookupEntityBase } from '../IinLookupEntityBase';
import type { IinLookupSDK } from '../IinLookupSDK';
import type { Control } from '../types';
import type { Overview, OverviewLoadMatch, OverviewCreateData } from '../IinLookupTypes';
declare class OverviewEntity extends IinLookupEntityBase<Overview> {
    constructor(client: IinLookupSDK, entopts: any);
    make(this: OverviewEntity): OverviewEntity;
    load(this: any, reqmatch?: OverviewLoadMatch, ctrl?: Control): Promise<OverviewEntity>;
    create(this: any, reqdata?: OverviewCreateData, ctrl?: Control): Promise<OverviewEntity>;
}
export { OverviewEntity };
