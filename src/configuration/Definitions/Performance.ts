/// <reference path="../../use-strict" />

/// <reference path="../Utils/Indexable" />

module Format.Config.Definitions {

    let memoizedRegistry: Indexable<Function> = {};

    export function enableMemoization() {
        memoize(Format, "getBracesCount");
    }

    export function disableMemoization() {
        unmemoize(Format, "getBracesCount");
    }

    var memoize = (hostObject: any, name: string) => {
        if (!memoizedRegistry[name]) {
            let func: Function = hostObject[name];
            hostObject[name] = Utils.Function.memoize(func);
            memoizedRegistry[name] = func;
        }
    };

    var unmemoize = (hostObject: any, name: string) => {
        if (memoizedRegistry[name]) {
            let memoized: Function = hostObject[name];
            hostObject[name] = memoizedRegistry[name];
            delete memoizedRegistry[name];
            delete memoized.cache;
        }
    };
}