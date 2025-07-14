import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// Helper to reset spies
function resetSpies(spies) {
  spies.forEach((spy) => spy.mockRestore());
}

describe("iflog", () => {
  let logSpy, infoSpy, warnSpy, errorSpy;

  beforeEach(() => {
    logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    infoSpy = vi.spyOn(console, "info").mockImplementation(() => {});
    warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    resetSpies([logSpy, infoSpy, warnSpy, errorSpy]);
  });

  it("should call console.log with correct message", async () => {
    const { default: iflog } = await import("../index.js");
    iflog.log("iflog.log: This is a log message.");
    expect(logSpy).toHaveBeenCalledWith("iflog.log: This is a log message.");
  });

  it("should call console.info with correct message", async () => {
    const { default: iflog } = await import("../index.js");
    iflog.info("iflog.info: This is an info message.");
    expect(infoSpy).toHaveBeenCalledWith(
      "iflog.info: This is an info message."
    );
  });

  it("should call console.warn with correct message", async () => {
    const { default: iflog } = await import("../index.js");
    iflog.warn("iflog.warn: This is a warning message.");
    expect(warnSpy).toHaveBeenCalledWith(
      "iflog.warn: This is a warning message."
    );
  });

  it("should call console.error with correct message", async () => {
    const { default: iflog } = await import("../index.js");
    iflog.error("iflog.error: This is an error message.");
    expect(errorSpy).toHaveBeenCalledWith(
      "iflog.error: This is an error message."
    );
  });

  it("should call console.assert with correct arguments", async () => {
    const { default: iflog } = await import("../index.js");
    const assertSpy = vi.spyOn(console, "assert").mockImplementation(() => {});
    iflog.assert(false, "assert message");
    expect(assertSpy).toHaveBeenCalledWith(false, "assert message");
    assertSpy.mockRestore();
  });

  it("should call console.clear", async () => {
    const { default: iflog } = await import("../index.js");
    const clearSpy = vi.spyOn(console, "clear").mockImplementation(() => {});
    iflog.clear();
    expect(clearSpy).toHaveBeenCalled();
    clearSpy.mockRestore();
  });

  it("should call console.count with label", async () => {
    const { default: iflog } = await import("../index.js");
    const countSpy = vi.spyOn(console, "count").mockImplementation(() => {});
    iflog.count("label");
    expect(countSpy).toHaveBeenCalledWith("label");
    countSpy.mockRestore();
  });

  it("should call console.countReset with label", async () => {
    const { default: iflog } = await import("../index.js");
    const countResetSpy = vi
      .spyOn(console, "countReset")
      .mockImplementation(() => {});
    iflog.countReset("label");
    expect(countResetSpy).toHaveBeenCalledWith("label");
    countResetSpy.mockRestore();
  });

  it("should call console.debug with arguments", async () => {
    const { default: iflog } = await import("../index.js");
    const debugSpy = vi.spyOn(console, "debug").mockImplementation(() => {});
    iflog.debug("debug message", 123);
    expect(debugSpy).toHaveBeenCalledWith("debug message", 123);
    debugSpy.mockRestore();
  });

  it("should call console.dir with arguments", async () => {
    const { default: iflog } = await import("../index.js");
    const dirSpy = vi.spyOn(console, "dir").mockImplementation(() => {});
    iflog.dir({ a: 1 });
    expect(dirSpy).toHaveBeenCalledWith({ a: 1 });
    dirSpy.mockRestore();
  });

  it("should call console.dirxml if available", async () => {
    const { default: iflog } = await import("../index.js");
    const dirxmlSpy = vi.spyOn(console, "dirxml").mockImplementation(() => {});
    iflog.dirxml("dirxml message");
    expect(dirxmlSpy).toHaveBeenCalledWith("dirxml message");
    dirxmlSpy.mockRestore();
  });

  it("should fallback to console.dir if dirxml is not available", async () => {
    const { default: iflog } = await import("../index.js");
    const dirSpy = vi.spyOn(console, "dir").mockImplementation(() => {});
    const origDirxml = console.dirxml;
    console.dirxml = undefined;
    iflog.dirxml("fallback message");
    expect(dirSpy).toHaveBeenCalledWith("fallback message");
    dirSpy.mockRestore();
    console.dirxml = origDirxml;
  });

  it("should call console.error for exception (alias)", async () => {
    const { default: iflog } = await import("../index.js");
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    iflog.exception("exception message");
    expect(errorSpy).toHaveBeenCalledWith("exception message");
    errorSpy.mockRestore();
  });

  it("should call console.group with arguments", async () => {
    const { default: iflog } = await import("../index.js");
    const groupSpy = vi.spyOn(console, "group").mockImplementation(() => {});
    iflog.group("group message");
    expect(groupSpy).toHaveBeenCalledWith("group message");
    groupSpy.mockRestore();
  });

  it("should call console.groupCollapsed with arguments", async () => {
    const { default: iflog } = await import("../index.js");
    const groupCollapsedSpy = vi
      .spyOn(console, "groupCollapsed")
      .mockImplementation(() => {});
    iflog.groupCollapsed("collapsed message");
    expect(groupCollapsedSpy).toHaveBeenCalledWith("collapsed message");
    groupCollapsedSpy.mockRestore();
  });

  it("should call console.groupEnd", async () => {
    const { default: iflog } = await import("../index.js");
    const groupEndSpy = vi
      .spyOn(console, "groupEnd")
      .mockImplementation(() => {});
    iflog.groupEnd();
    expect(groupEndSpy).toHaveBeenCalled();
    groupEndSpy.mockRestore();
  });

  it("should call console.profile if available", async () => {
    const { default: iflog } = await import("../index.js");
    const origProfile = console.profile;
    if (!console.profile) console.profile = () => {};
    const profileSpy = vi
      .spyOn(console, "profile")
      .mockImplementation(() => {});
    iflog.profile("profile label");
    expect(profileSpy).toHaveBeenCalledWith("profile label");
    profileSpy.mockRestore();
    if (origProfile) {
      console.profile = origProfile;
    } else {
      delete console.profile;
    }
  });

  it("should not throw if console.profile is not available", async () => {
    const { default: iflog } = await import("../index.js");
    const origProfile = console.profile;
    delete console.profile;
    expect(() => iflog.profile("profile label")).not.toThrow();
    console.profile = origProfile;
  });

  it("should call console.profileEnd if available", async () => {
    const { default: iflog } = await import("../index.js");
    const origProfileEnd = console.profileEnd;
    if (!console.profileEnd) console.profileEnd = () => {};
    const profileEndSpy = vi
      .spyOn(console, "profileEnd")
      .mockImplementation(() => {});
    iflog.profileEnd("profile label");
    expect(profileEndSpy).toHaveBeenCalledWith("profile label");
    profileEndSpy.mockRestore();
    if (origProfileEnd) {
      console.profileEnd = origProfileEnd;
    } else {
      delete console.profileEnd;
    }
  });

  it("should not throw if console.profileEnd is not available", async () => {
    const { default: iflog } = await import("../index.js");
    const origProfileEnd = console.profileEnd;
    delete console.profileEnd;
    expect(() => iflog.profileEnd("profile label")).not.toThrow();
    console.profileEnd = origProfileEnd;
  });

  it("should call console.table with arguments", async () => {
    const { default: iflog } = await import("../index.js");
    const tableSpy = vi.spyOn(console, "table").mockImplementation(() => {});
    iflog.table([{ a: 1 }], ["a"]);
    expect(tableSpy).toHaveBeenCalledWith([{ a: 1 }], ["a"]);
    tableSpy.mockRestore();
  });

  it("should call console.time with label", async () => {
    const { default: iflog } = await import("../index.js");
    const timeSpy = vi.spyOn(console, "time").mockImplementation(() => {});
    iflog.time("timer");
    expect(timeSpy).toHaveBeenCalledWith("timer");
    timeSpy.mockRestore();
  });

  it("should call console.timeEnd with label", async () => {
    const { default: iflog } = await import("../index.js");
    const timeEndSpy = vi
      .spyOn(console, "timeEnd")
      .mockImplementation(() => {});
    iflog.timeEnd("timer");
    expect(timeEndSpy).toHaveBeenCalledWith("timer");
    timeEndSpy.mockRestore();
  });

  it("should call console.timeLog if available", async () => {
    const { default: iflog } = await import("../index.js");
    const timeLogSpy = vi
      .spyOn(console, "timeLog")
      .mockImplementation(() => {});
    iflog.timeLog("timer", "extra");
    expect(timeLogSpy).toHaveBeenCalledWith("timer", "extra");
    timeLogSpy.mockRestore();
  });

  it("should not throw if console.timeLog is not available", async () => {
    const { default: iflog } = await import("../index.js");
    const origTimeLog = console.timeLog;
    delete console.timeLog;
    expect(() => iflog.timeLog("timer", "extra")).not.toThrow();
    console.timeLog = origTimeLog;
  });

  it("should call console.timeStamp if available", async () => {
    const { default: iflog } = await import("../index.js");
    const origTimeStamp = console.timeStamp;
    if (!console.timeStamp) console.timeStamp = () => {};
    const timeStampSpy = vi
      .spyOn(console, "timeStamp")
      .mockImplementation(() => {});
    iflog.timeStamp("stamp");
    expect(timeStampSpy).toHaveBeenCalledWith("stamp");
    timeStampSpy.mockRestore();
    if (origTimeStamp) {
      console.timeStamp = origTimeStamp;
    } else {
      delete console.timeStamp;
    }
  });

  it("should not throw if console.timeStamp is not available", async () => {
    const { default: iflog } = await import("../index.js");
    const origTimeStamp = console.timeStamp;
    delete console.timeStamp;
    expect(() => iflog.timeStamp("stamp")).not.toThrow();
    console.timeStamp = origTimeStamp;
  });

  it("should call console.trace with arguments", async () => {
    const { default: iflog } = await import("../index.js");
    const traceSpy = vi.spyOn(console, "trace").mockImplementation(() => {});
    iflog.trace("trace message");
    expect(traceSpy).toHaveBeenCalledWith("trace message");
    traceSpy.mockRestore();
  });

  it("should call console.log for enable", async () => {
    const { default: iflog } = await import("../index.js");
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    iflog.enable();
    expect(logSpy).toHaveBeenCalledWith("iflog enabled");
    logSpy.mockRestore();
  });

  it("should call console.log for disable", async () => {
    const { default: iflog } = await import("../index.js");
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    iflog.disable();
    expect(logSpy).toHaveBeenCalledWith("iflog disabled");
    logSpy.mockRestore();
  });

  it("should return true for isEnabled", async () => {
    const { default: iflog } = await import("../index.js");
    expect(iflog.isEnabled()).toBe(true);
  });
});

describe("iflog in production mode", () => {
  let originalEnv;
  let logSpy, infoSpy, warnSpy, errorSpy;

  beforeEach(() => {
    originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = "production";
    logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    infoSpy = vi.spyOn(console, "info").mockImplementation(() => {});
    warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    process.env.NODE_ENV = originalEnv;
    [logSpy, infoSpy, warnSpy, errorSpy].forEach(
      (spy) => spy && spy.mockRestore()
    );
  });

  it("should not call any console methods in production", async () => {
    const { default: iflog } = await import("../index.js?prod1" + Date.now());
    iflog.log("should not log");
    iflog.info("should not info");
    iflog.warn("should not warn");
    iflog.error("should not error");
    expect(logSpy).not.toHaveBeenCalled();
    expect(infoSpy).not.toHaveBeenCalled();
    expect(warnSpy).not.toHaveBeenCalled();
    expect(errorSpy).not.toHaveBeenCalled();
  });

  it("should return false for isEnabled in production", async () => {
    const { default: iflog } = await import("../index.js?prod2" + Date.now());
    expect(iflog.isEnabled()).toBe(false);
  });
});

describe("iflog URL parameter override", () => {
  let originalEnv;
  let originalWindow;
  let logSpy;

  beforeEach(() => {
    originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = "production";
    logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    // Mock window and location
    originalWindow = global.window;
    global.window = {
      location: {
        search: "?iflog=true"
      }
    };
  });

  afterEach(() => {
    process.env.NODE_ENV = originalEnv;
    logSpy.mockRestore();
    global.window = originalWindow;
  });

  it("should enable logging in production if ?iflog=true is present", async () => {
    const { default: iflog } = await import("../index.js?url1" + Date.now());
    iflog.log("should log");
    expect(logSpy).toHaveBeenCalledWith("should log");
    expect(iflog.isEnabled()).toBe(true);
  });

  it("should not enable logging in production if ?iflog=false is present", async () => {
    global.window.location.search = "?iflog=false";
    const { default: iflog } = await import("../index.js?url2" + Date.now());
    iflog.log("should not log");
    expect(logSpy).not.toHaveBeenCalled();
    expect(iflog.isEnabled()).toBe(false);
  });

  it("should not enable logging in production if ?iflog param is missing", async () => {
    global.window.location.search = "";
    const { default: iflog } = await import("../index.js?url3" + Date.now());
    iflog.log("should not log");
    expect(logSpy).not.toHaveBeenCalled();
    expect(iflog.isEnabled()).toBe(false);
  });
});
