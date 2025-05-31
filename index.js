const isDev = () => {
  if (
    typeof process !== "undefined" &&
    process.env &&
    typeof process.env.NODE_ENV === "string"
  ) {
    return (
      process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test"
    );
  }
  if (
    typeof import.meta !== "undefined" &&
    import.meta.env &&
    typeof import.meta.env.DEV !== "undefined"
  ) {
    return import.meta.env.DEV === true;
  }
  return false;
};

const iflog = {
  assert: (condition, ...args) => {
    if (isDev()) console.assert(condition, ...args);
  },
  clear: () => {
    if (isDev()) console.clear();
  },
  count: (label) => {
    if (isDev()) console.count(label);
  },
  countReset: (label) => {
    if (isDev()) console.countReset(label);
  },
  debug: (...args) => {
    if (isDev()) console.debug(...args);
  },
  dir: (...args) => {
    if (isDev()) console.dir(...args);
  },
  dirxml: (...args) => {
    if (isDev()) {
      if (console.dirxml) {
        console.dirxml(...args);
      } else {
        // fallback to dir if dirxml is not available
        console.dir(...args);
      }
    }
  },
  error: (...args) => {
    if (isDev()) console.error(...args);
  },
  exception: (...args) => {
    if (isDev()) console.error(...args);
  },
  group: (...args) => {
    if (isDev()) console.group(...args);
  },
  groupCollapsed: (...args) => {
    if (isDev()) console.groupCollapsed(...args);
  },
  groupEnd: () => {
    if (isDev()) console.groupEnd();
  },
  info: (...args) => {
    if (isDev()) console.info(...args);
  },
  log: (...args) => {
    if (isDev()) console.log(...args);
  },
  profile: (label) => {
    if (isDev() && console.profile) {
      console.profile(label);
    }
  },
  profileEnd: (label) => {
    if (isDev() && console.profileEnd) {
      console.profileEnd(label);
    }
  },
  table: (tabularData, properties) => {
    if (isDev()) console.table(tabularData, properties);
  },
  time: (label) => {
    if (isDev()) console.time(label);
  },
  timeEnd: (label) => {
    if (isDev()) console.timeEnd(label);
  },
  timeLog: (label, ...args) => {
    if (isDev() && console.timeLog) {
      console.timeLog(label, ...args);
    }
  },
  timeStamp: (label) => {
    if (isDev() && console.timeStamp) {
      console.timeStamp(label);
    }
  },
  trace: (...args) => {
    if (isDev()) console.trace(...args);
  },
  warn: (...args) => {
    if (isDev()) console.warn(...args);
  },
  enable: () => {
    if (isDev()) console.log("iflog enabled");
  },
  disable: () => {
    if (isDev()) console.log("iflog disabled");
  },
  isEnabled: () => {
    return isDev();
  },
};

export default iflog;
