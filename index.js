const iflog = {
  assert: (condition, ...args) => {
    console.assert(condition, ...args);
  },
  clear: () => {
    console.clear();
  },
  count: (label) => {
    console.count(label);
  },
  countReset: (label) => {
    console.countReset(label);
  },
  debug: (...args) => {
    console.debug(...args);
  },
  dir: (...args) => {
    console.dir(...args);
  },
  dirxml: (...args) => {
    if (console.dirxml) {
      console.dirxml(...args);
    } else {
      // fallback to dir if dirxml is not available
      console.dir(...args);
    }
  },
  error: (...args) => {
    console.error(...args);
  },
  exception: (...args) => {
    // Deprecated, alias for error
    console.error(...args);
  },
  group: (...args) => {
    console.group(...args);
  },
  groupCollapsed: (...args) => {
    console.groupCollapsed(...args);
  },
  groupEnd: () => {
    console.groupEnd();
  },
  info: (...args) => {
    console.info(...args);
  },
  log: (...args) => {
    console.log(...args);
  },
  profile: (label) => {
    if (console.profile) {
      console.profile(label);
    }
  },
  profileEnd: (label) => {
    if (console.profileEnd) {
      console.profileEnd(label);
    }
  },
  table: (tabularData, properties) => {
    console.table(tabularData, properties);
  },
  time: (label) => {
    console.time(label);
  },
  timeEnd: (label) => {
    console.timeEnd(label);
  },
  timeLog: (label, ...args) => {
    if (console.timeLog) {
      console.timeLog(label, ...args);
    }
  },
  timeStamp: (label) => {
    if (console.timeStamp) {
      console.timeStamp(label);
    }
  },
  trace: (...args) => {
    console.trace(...args);
  },
  warn: (...args) => {
    console.warn(...args);
  },
  enable: () => {
    console.log("iflog enabled");
  },
  disable: () => {
    console.log("iflog disabled");
  },
  isEnabled: () => {
    return true;
  },
};

export default iflog;
