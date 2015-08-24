/// <reference path="../../use-strict" />

/// <reference path="../Format" />

/// <reference path="ArgumentError" />

namespace Format.Errors {
    /**
     * An error that is thrown when an `undefined` or `null` argument is passed to a method that does not accept it as a valid argument.
     *
     * See: https://msdn.microsoft.com/en-us/library/system.argumentnullexception.aspx
     */
    export class ArgumentNullError extends ArgumentError {
        /**
         * Creates an error that is thrown when an undefined (or null) argument is passed to a method that does not accept it as a valid argument.
         * @param argumentName The name of the argument that caused the error.
         */
        constructor(argumentName: string) {
            super.incrementStackCount();
            super(String.format("Argument '{0}' cannot be undefined or null", argumentName));
        }
    }
}
