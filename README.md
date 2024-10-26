# ASCII Calendar

[Simple ASCII Calendar similar to Linux cal command in JavaScript](https://github.com/jcubic/calendar)

## Installation

```
npm install ascii-calendar
```

## Usage

```javascript
const cal = require('ascii-calendar');
console.log(cal({ year: 2021, month: 4, lang: 'en-US' }));
```

Output:

```
         May 2021
Su  Mo  Tu  We  Th  Fr  Sa
                         1
 2   3   4   5   6   7   8
 9  10  11  12  13  14  15
16  17  18  19  20  21  22
23  24  25  26  27  28  29
30  31
```

* It automatically detect locale and render proper translation, but you can change it.
* First day of the week also depend on locale.

## Options

* `year`: full year
* `month`: indexed from 0
* `lang`: language (default system or browser locale)

## License

Released under [MIT](http://opensource.org/licenses/MIT) license<br/>
Copyright (c) 2018-2024 [Jakub T. Jankiewicz](https://jcubic.pl/me)
