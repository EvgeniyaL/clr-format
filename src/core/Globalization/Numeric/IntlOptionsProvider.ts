/// <reference path="../../../use-strict" />

/// <reference path="Specifiers/IntlStandardOptionsProvider" />
/// <reference path="Specifiers/IntlCustomOptionsProvider" />

/// <reference path="IntlFormatOptions" />
/// <reference path="OptionsProvider" />

/// <reference path="../../Utils/Clone" />

/// <reference path="../../Errors/ArgumentNullError" />

namespace Format.Globalization.Numeric {
    /**
     * An [[OptionsProvider]] implementation that handles both [Standard Numeric Format Specifiers](https://msdn.microsoft.com/library/dwhawy9k.aspx) and
     * [Custom Numeric Format String](https://msdn.microsoft.com/library/0c899ak8.aspx). The type of the returned options object is an
     * extended version of [Intl.NumberFormat's options](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat#Parameters) parameter.
     */
    export class IntlOptionsProvider implements OptionsProvider<Intl.NumberFormatOptions> {

        private options_: Intl.NumberFormatOptions;

        /**
         * Creates an instance with base formatting options which will be extended and/or overridden by resolved options.
         * @param numberOptions A base options object containing properties defined for the Intl.NumberFormat's options parameter.
         */
        constructor(numberOptions: Intl.NumberFormatOptions) {

            if (numberOptions == null) {
                throw new Errors.ArgumentNullError("numberOptions");
            }

            this.options_ = Utils.clone(numberOptions);
        }

        /**
         * Returns an object that provides numeric formatting options resolved from numeric format specifiers.
         * @param format A format string containing formatting specifications.
         * @param value The numeric object from which to infer additional options.
         */
        public resolveOptions(format: string, value: number): Intl.NumberFormatOptions {

            if (format) {
                let standardSpecifierOptionsProvider = new Specifiers.IntlStandardOptionsProvider(this.options_),
                    standardSpecifierOptions = standardSpecifierOptionsProvider.resolveOptions(format, value);

                if (!standardSpecifierOptions) {
                    let customSpecifierOptionsProvider = new Specifiers.IntlCustomOptionsProvider(this.options_);
                    customSpecifierOptionsProvider.resolveOptions(format, value);
                }
            }

            return this.options_;
        }

        /** Returns the formatting style to use. Values should match the property names defined in [[Specifiers.StandardSpecifiersMap]]. */
        public getStyle(): string {
            return this.options_.style;
        }

        /** Returns whether to use grouping separators or not. */
        public useGrouping(): boolean {
            return this.options_.useGrouping;
        }

        /** Returns the minimum number of integer digits to use. */
        public getMinimumIntegerDigits(): number {
            return this.options_.minimumIntegerDigits;
        }

        /** Returns the minimum number of fraction digits to use. */
        public getMinimumFractionDigits(): number {
            return this.options_.minimumFractionDigits;
        }

        /** Returns the maximum number of fraction digits to use. */
        public getMaximumFractionDigits(): number {
            return this.options_.maximumFractionDigits;
        }

        /** Returns the minimum number of significant digits to use. */
        public getMinimumSignificantDigits(): number {
            return this.options_.minimumSignificantDigits;
        }

        /** Returns the maximum number of significant digits to use. */
        public getMaximumSignificantDigits(): number {
            return this.options_.maximumSignificantDigits;
        }

        /** Returns whether to ommit all digits or not. */
        public hasNoDigits(): boolean {
            return this.options_.noDigits;
        }

        /** Returns whether to ommit a single zero digit before the decimal point or not. */
        public hasNoLeadingZeroIntegerDigit(): boolean {
            return this.options_.noLeadingZeroIntegerDigit;
        }

        /** Returns whether an uppercase representation is required or not. */
        public isUpperCase(): boolean {
            return this.options_.upperCase;
        }

        /** Returns whether an exponent sign is required only for negative exponents or not. */
        public isNegativellySignedExponent(): boolean {
            return this.options_.negativellySignedExponent;
        }

        /** Returns the minimum number of exponent digits to use. */
        public getMinimumExponentDigits(): number {
            return this.options_.minimumExponentDigits;
        }

        /** Returns the divisor that will be applied to the value before formatting. */
        public getValueDivisor(): number {
            return this.options_.valueDivisor;
        }

        /** Returns the string that will be added before the numeric format value. */
        public getPrefixDecorator(): string {
            return this.options_.prefixDecorator;
        }

        /** Returns the mapping of index-to-text values which are inside the numeric part of the format. */
        public getInternalDecorators(): Indexable<string> {
            return this.options_.internalDecorators;
        }

        /** Returns the string that will be added after the numeric format value. */
        public getSuffixDecorator(): string {
            return this.options_.suffixDecorator;
        }
    }
}
