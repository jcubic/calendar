/* Simple ASCII Calendar similar to Linux cal command
 *
 * Copyright (C) Jakub T. Jankiewicz <https://jcubic.pl/me>
 * Released under MIT license
 */

// base code from Codpen
// https://codepen.io/jcubic/pen/dyoJQQv?editors=1010

var cal = (function() {
    var SEPARATOR = '  ';
    var LANG;
    try {
        LANG = Intl.DateTimeFormat().resolvedOptions().locale;
    } catch(e) {
        if (typeof window !== 'undefined') {
            LANG = window.navigator.language;
        }
    }

    // -------------------------------------------------------------------------
    function get_day_count(year, month) {
        if (month === 1) {
            return is_leap(year) ? 29 : 28;
        } else if ((month <= 6 && month % 2 == 0) ||
                   (month >= 7 && month % 2 === 1)) {
            return 31;
        } else {
            return 30;
        }
    }

    // -------------------------------------------------------------------------
    function first_day(lang) {
        try {
            var locale = new Intl.Locale(lang);
            return (locale.weekInfo || locale.getWeekInfo()).firstDay;
        } catch (e) {
            return 0;
        }
    }

    // -------------------------------------------------------------------------
    function is_leap(year) {
        return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
    }

    // -------------------------------------------------------------------------
    function repeat(str, n) {
        return new Array(n + 1).join(str);
    }

    // -------------------------------------------------------------------------
    function center(text, length) {
        var rep = repeat.bind(null, ' ');
        var n = (length - text.length) / 2;
        if (n % 1 === 0) {
            return rep(n) + text + rep(n);
        } else {
            return rep(Math.floor(n)) + text + rep(Math.ceil(n));
        }
    }

    // -------------------------------------------------------------------------
    function format_week_day(lang, i) {
        var date = new Date(1970, 1, 1 + i);
        return date.toLocaleString(lang, {weekday: 'short'}).substring(0, 2);
    }
    // -------------------------------------------------------------------------
    function week_days(lang, first_day) {
        var result = [];
        var sunday = format_week_day(lang, 0);
        if (first_day === 7 || first_day === 0) {
            result.push(sunday);
        }
        for (var i = 1; i <= 6; ++i) {
            result.push(format_week_day(lang, i));
        }
        if (first_day === 1) {
            result.push(sunday);
        }
        return result.join(SEPARATOR);
    }

    // -------------------------------------------------------------------------
    function days(year, month, first_day) {
        var date = new Date(year + '/' + (month+1) + '/' + 1);
        var start = date.getDay();
        var end = get_day_count(year, month);
        if (first_day === 1) {
            start -= 1;
        }
        var result = [];
        var line = [];
        var i;
        for (i = 0; i < start; ++i) {
            line.push('  ');
        }
        var k = start;
        for (i = 0; i < end; ++i) {
            line.push((i + 1).toString().padStart(2, ' '));
            if (++k > 6) {
                k = 0;
                result.push(line.join(SEPARATOR));
                line = [];
            }
        }
        if (k) {
            result.push(line.join(SEPARATOR));
        }
        return result.join('\n');
    }

    // -------------------------------------------------------------------------
    return function generate(options) {
        var result = [];
        var date;
        var year, month, lang;
        if (!options) {
            date = new Date();
            year = date.getFullYear();
            month = date.getMonth() + 1;
            lang = LANG;
        } else {
            year = options.year;
            month = options.month;
            lang = options.lang || LANG;
            date = new Date(year + '/' + (month+1) + '/' + 1);
        }
        var start_day = first_day(lang);
        var week = week_days(lang, start_day);
        var month_label = date.toLocaleString(lang, { month: 'long' });
        result.push(center(month_label + ' ' + year, week.length));
        result.push(week);
        result.push(days(year, month, start_day));
        return result.join('\n');
    };
})();

module.exports = cal;
