


# iflog
  <a aria-label="License" href="https://opensource.org/licenses/MIT"><img alt="" src="https://img.shields.io/npm/l/turbo.svg?style=for-the-badge&labelColor=000000&color="></a>
<a aria-label="NPM version" href="https://npmjs.com/package/iflog"><img src="https://img.shields.io/npm/v/iflog.svg?style=for-the-badge&labelColor=000000"/></a>
<a href="https://www.npmjs.com/package/iflog"><img src="https://img.shields.io/npm/d18m/iflog?style=for-the-badge&labelColor=000000"></a>

A conditional console utility that only logs in development mode. It wraps all standard console methods and only outputs when `process.env.NODE_ENV !== 'production'`. **Now with URL parameter override for production debugging!**

## Installation

```bash
npm i iflog
```

## Usage

```js
import iflog from 'iflog';

iflog.log('This will only log in development!');
iflog.error('This error will only show in development!');
iflog.table([{ a: 1 }, { a: 2 }]);

if (iflog.isEnabled()) {
  // do something only in development
}
```

## Production Debugging

Need to debug logs in production? Simply add `?iflog=true` to your URL:

```
https://yoursite.com/page?iflog=true
```

This will enable all iflog output even in production mode, allowing you to see logs on live sites when needed.

## How it works

All methods are no-ops in production (`process.env.NODE_ENV === 'production'`), except when the URL parameter `?iflog=true` is present. In development, they proxy to the corresponding `console` methods.

## API

All methods below only output in development mode (or when `?iflog=true` is in the URL):

- `iflog.assert(condition, ...args)`
- `iflog.clear()`
- `iflog.count(label)`
- `iflog.countReset(label)`
- `iflog.debug(...args)`
- `iflog.dir(...args)`
- `iflog.dirxml(...args)`
- `iflog.error(...args)`
- `iflog.exception(...args)` (alias for error)
- `iflog.group(...args)`
- `iflog.groupCollapsed(...args)`
- `iflog.groupEnd()`
- `iflog.info(...args)`
- `iflog.log(...args)`
- `iflog.profile(label)`
- `iflog.profileEnd(label)`
- `iflog.table(tabularData, properties)`
- `iflog.time(label)`
- `iflog.timeEnd(label)`
- `iflog.timeLog(label, ...args)`
- `iflog.timeStamp(label)`
- `iflog.trace(...args)`
- `iflog.warn(...args)`
- `iflog.enable()` (logs 'iflog enabled' in development)
- `iflog.disable()` (logs 'iflog disabled' in development)
- `iflog.isEnabled()` (returns `true` if in development mode or URL override is active, else `false`)

## License

MIT
