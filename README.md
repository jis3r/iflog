# iflog

A conditional console utility that only logs in development mode. It wraps all standard console methods and only outputs when `process.env.NODE_ENV !== 'production'`.

## Installation

```bash
npm install iflog
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

## How it works

All methods are no-ops in production (`process.env.NODE_ENV === 'production'`). In development, they proxy to the corresponding `console` methods.

## API

All methods below only output in development mode:

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
- `iflog.isEnabled()` (returns `true` if in development mode, else `false`)

## License

MIT
