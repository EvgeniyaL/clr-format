/// <reference path="../../use-strict" />

/// <reference path="SystemError" />

namespace Format.Errors {
    /**
     * An error that is thrown when one of the arguments provided to a function is not valid.
     *
     * See: https://msdn.microsoft.com/library/system.argumentexception.aspx
     */
    export class ArgumentError extends SystemError {
        /**
         * Creates an error that is thrown when one of the arguments provided to a function is not valid.
         * @param message A human-readable description of the error.
         * @param innerError An error to rethrow while also preserving its stack trace.
         */
        constructor(message?: string, innerError?: SystemError) {
            super(message, innerError);
            this.name = "ArgumentError";
        }
    }
}
