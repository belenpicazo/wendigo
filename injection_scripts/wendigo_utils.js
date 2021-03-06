/* global WendigoQuery, WendigoPathFinder */
"use strict";

if (!window.WendigoUtils) {
    const _origDate = Date;

    window.WendigoUtils = {
        isVisible(element) {
            if (!element) return false;
            if (element === document) return true; // Top element, always visible
            const style = window.getComputedStyle(element);
            if (style.display === 'none') return false;
            if (style.visibility === 'hidden') return false;
            return this.isVisible(element.parentNode);
        },
        queryElement(selector) {
            return WendigoQuery.query(selector);
        },
        queryAll(selector) {
            return WendigoQuery.queryAll(selector);
        },
        xPathQuery(xPath) {
            return WendigoQuery.queryXPathAll(xPath);
        },
        getStyles(element) {
            const rawStyles = getComputedStyle(element);
            const result = {};
            for (let i = 0; i < rawStyles.length; i++) {
                const name = rawStyles[i];
                result[name] = rawStyles.getPropertyValue(name);
            }
            return result;
        },
        mockDate(timestamp, freeze) {
            let baseTimestamp = 0;
            if (!freeze) {
                baseTimestamp = new _origDate().getTime();
            }
            function getCurrentTimestamp() {
                if (!freeze) {
                    const currentTimestamp = new _origDate().getTime();
                    const timeDiff = currentTimestamp - baseTimestamp;
                    return timestamp + timeDiff;
                } else return timestamp;
            }

            class DateMock extends _origDate {
                constructor(...params) {
                    if (params.length > 0) {
                        super(...params);
                    } else super(getCurrentTimestamp());
                }

                static now() {
                    return getCurrentTimestamp();
                }
            }

            window.Date = DateMock;
        },
        clearDateMock() {
            window.Date = _origDate;
        },
        findCssPath(...args) {
            return WendigoPathFinder.cssPath(...args);
        },
        findXPath(...args) {
            return WendigoPathFinder.xPath(...args);
        }
    };
}
