/// <reference path="../../use-strict" />

/// <reference path="DateTime/InvariantFormatter" />
/// <reference path="DateTime/IntlOptionsProvider" />

/// <reference path="FormatProvider" />
/// <reference path="CustomFormatter" />

/// <reference path="../Utils/Types" />

/// <reference path="../Errors/NotImplementedError" />
/// <reference path="../Errors/InvalidOperationError" />

namespace Format.Globalization {
    /**
     * Provides culture-specific information about the format of date and time values.
     *
     * Full information about the culture and the application of overrides will be made available through this class at a later point.
     *
     * See: https://msdn.microsoft.com/library/system.globalization.datetimeformatinfo.aspx
     */
    export class DateTimeFormatInfo implements FormatProvider {

        /** Gets a read-only instance that is culture-independent (invariant). */
        public static InvariantInfo: DateTimeFormatInfo;

        /** Gets or sets a constructor function to be used for creating culture-variant formatting instances. */
        public static FormatterConstructor: { new (locales: string|string[], formatInfo: DateTimeFormatInfo): CustomFormatter };

        /** Gets or sets a one-dimensional array of type String containing the culture-specific abbreviated names of the days of the week. */
        public AbbreviatedDayNames: string[];

        /** Gets or sets a one-dimensional string array that contains the culture-specific full names of the days of the week. */
        public DayNames: string[];

        protected locales: string|string[];

        private isWritable: boolean;
        private formatter: CustomFormatter;

        /** Initializes a new writable instance of the class that is culture-independent (invariant). */
        constructor();
        /**
         * Initializes a new instance of the class based on the culture specified by *locales*.
         * @param locales The locales argument must be either a string holding a [BCP 47 language tag](http://tools.ietf.org/html/rfc5646), or an array of such language tags.
         */
        constructor(locales: string|string[]);
        constructor(...args: Object[]) {
            this.isWritable = args[0] === undefined;
            this.locales = <string|string[]> args[0] || "";

            this.resolveFormatInfo(this.locales);
        }

        /**
         * Returns an object that provides formatting services for the `Date` type.
         * @param type A string indicating the type of the custom formatter to return, see [[Utils.Types]].
         */
        public getFormatter(type: string): CustomFormatter {

            if (type !== Utils.Types.Date) {
                throw new Errors.InvalidOperationError("The DateTimeFormatInfo object supports formatting numeric values only");
            }

            return this.formatter;
        }

        private resolveFormatInfo(locales: string|string[]): void {
            if (!locales) {
                this.setInvariantFormatInfo();
                this.formatter = new DateTime.InvariantFormatter(DateTime.IntlOptionsProvider);
            }
            else if (typeof DateTimeFormatInfo.FormatterConstructor === "function") {
                this.formatter = new DateTimeFormatInfo.FormatterConstructor(this.locales, this);
            }
            else {
                throw new Errors.InvalidOperationError("No culture-variant formatter was found (load a sub-module implementation or set the FormatterConstructor property)");
            }
        }

        private setInvariantFormatInfo(): void {

            this.AbbreviatedDayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            this.DayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        }
    }

    DateTimeFormatInfo.InvariantInfo = new DateTimeFormatInfo("");
}
