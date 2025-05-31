const IS_DEV =
  typeof process !== "undefined" &&
  process.env &&
  process.env.NODE_ENV !== "production";

const iflog = {
  assert: (condition, ...args) => {
    if (IS_DEV) console.assert(condition, ...args);
  },
  clear: () => {
    if (IS_DEV) console.clear();
  },
  count: (label) => {
    if (IS_DEV) console.count(label);
  },
  countReset: (label) => {
    if (IS_DEV) console.countReset(label);
  },
  debug: (...args) => {
    if (IS_DEV) console.debug(...args);
  },
  dir: (...args) => {
    if (IS_DEV) console.dir(...args);
  },
  dirxml: (...args) => {
    if (IS_DEV) {
      if (console.dirxml) {
        console.dirxml(...args);
      } else {
        // fallback to dir if dirxml is not available
        console.dir(...args);
      }
    }
  },
  error: (...args) => {
    if (IS_DEV) console.error(...args);
  },
  exception: (...args) => {
    if (IS_DEV) console.error(...args);
  },
  group: (...args) => {
    if (IS_DEV) console.group(...args);
  },
  groupCollapsed: (...args) => {
    if (IS_DEV) console.groupCollapsed(...args);
  },
  groupEnd: () => {
    if (IS_DEV) console.groupEnd();
  },
  info: (...args) => {
    if (IS_DEV) console.info(...args);
  },
  log: (...args) => {
    if (IS_DEV) console.log(...args);
  },
  profile: (label) => {
    if (IS_DEV && console.profile) {
      console.profile(label);
    }
  },
  profileEnd: (label) => {
    if (IS_DEV && console.profileEnd) {
      console.profileEnd(label);
    }
  },
  table: (tabularData, properties) => {
    if (IS_DEV) console.table(tabularData, properties);
  },
  time: (label) => {
    if (IS_DEV) console.time(label);
  },
  timeEnd: (label) => {
    if (IS_DEV) console.timeEnd(label);
  },
  timeLog: (label, ...args) => {
    if (IS_DEV && console.timeLog) {
      console.timeLog(label, ...args);
    }
  },
  timeStamp: (label) => {
    if (IS_DEV && console.timeStamp) {
      console.timeStamp(label);
    }
  },
  trace: (...args) => {
    if (IS_DEV) console.trace(...args);
  },
  warn: (...args) => {
    if (IS_DEV) console.warn(...args);
  },
  enable: () => {
    if (IS_DEV) console.log("iflog enabled");
  },
  disable: () => {
    if (IS_DEV) console.log("iflog disabled");
  },
  isEnabled: () => {
    return IS_DEV;
  },
};

export default iflog;
