import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import iflog from "../index.js";

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

  it("should call console.log with correct message", () => {
    iflog.log("iflog.log: This is a log message.");
    expect(logSpy).toHaveBeenCalledWith("iflog.log: This is a log message.");
  });

  it("should call console.info with correct message", () => {
    iflog.info("iflog.info: This is an info message.");
    expect(infoSpy).toHaveBeenCalledWith(
      "iflog.info: This is an info message."
    );
  });

  it("should call console.warn with correct message", () => {
    iflog.warn("iflog.warn: This is a warning message.");
    expect(warnSpy).toHaveBeenCalledWith(
      "iflog.warn: This is a warning message."
    );
  });

  it("should call console.error with correct message", () => {
    iflog.error("iflog.error: This is an error message.");
    expect(errorSpy).toHaveBeenCalledWith(
      "iflog.error: This is an error message."
    );
  });

  it("should call console.assert with correct arguments", () => {
    const assertSpy = vi.spyOn(console, "assert").mockImplementation(() => {});
    iflog.assert(false, "assert message");
    expect(assertSpy).toHaveBeenCalledWith(false, "assert message");
    assertSpy.mockRestore();
  });

  it("should call console.clear", () => {
    const clearSpy = vi.spyOn(console, "clear").mockImplementation(() => {});
    iflog.clear();
    expect(clearSpy).toHaveBeenCalled();
    clearSpy.mockRestore();
  });

  it("should call console.count with label", () => {
    const countSpy = vi.spyOn(console, "count").mockImplementation(() => {});
    iflog.count("label");
    expect(countSpy).toHaveBeenCalledWith("label");
    countSpy.mockRestore();
  });

  it("should call console.countReset with label", () => {
    const countResetSpy = vi
      .spyOn(console, "countReset")
      .mockImplementation(() => {});
    iflog.countReset("label");
    expect(countResetSpy).toHaveBeenCalledWith("label");
    countResetSpy.mockRestore();
  });

  it("should call console.debug with arguments", () => {
    const debugSpy = vi.spyOn(console, "debug").mockImplementation(() => {});
    iflog.debug("debug message", 123);
    expect(debugSpy).toHaveBeenCalledWith("debug message", 123);
    debugSpy.mockRestore();
  });

  it("should call console.dir with arguments", () => {
    const dirSpy = vi.spyOn(console, "dir").mockImplementation(() => {});
    iflog.dir({ a: 1 });
    expect(dirSpy).toHaveBeenCalledWith({ a: 1 });
    dirSpy.mockRestore();
  });

  it("should call console.dirxml if available", () => {
    const dirxmlSpy = vi.spyOn(console, "dirxml").mockImplementation(() => {});
    iflog.dirxml("dirxml message");
    expect(dirxmlSpy).toHaveBeenCalledWith("dirxml message");
    dirxmlSpy.mockRestore();
  });

  it("should fallback to console.dir if dirxml is not available", () => {
    const dirSpy = vi.spyOn(console, "dir").mockImplementation(() => {});
    const origDirxml = console.dirxml;
    console.dirxml = undefined;
    iflog.dirxml("fallback message");
    expect(dirSpy).toHaveBeenCalledWith("fallback message");
    dirSpy.mockRestore();
    console.dirxml = origDirxml;
  });

  it("should call console.error for exception (alias)", () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    iflog.exception("exception message");
    expect(errorSpy).toHaveBeenCalledWith("exception message");
    errorSpy.mockRestore();
  });

  it("should call console.group with arguments", () => {
    const groupSpy = vi.spyOn(console, "group").mockImplementation(() => {});
    iflog.group("group message");
    expect(groupSpy).toHaveBeenCalledWith("group message");
    groupSpy.mockRestore();
  });

  it("should call console.groupCollapsed with arguments", () => {
    const groupCollapsedSpy = vi
      .spyOn(console, "groupCollapsed")
      .mockImplementation(() => {});
    iflog.groupCollapsed("collapsed message");
    expect(groupCollapsedSpy).toHaveBeenCalledWith("collapsed message");
    groupCollapsedSpy.mockRestore();
  });

  it("should call console.groupEnd", () => {
    const groupEndSpy = vi
      .spyOn(console, "groupEnd")
      .mockImplementation(() => {});
    iflog.groupEnd();
    expect(groupEndSpy).toHaveBeenCalled();
    groupEndSpy.mockRestore();
  });

  it("should call console.profile if available", () => {
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

  it("should not throw if console.profile is not available", () => {
    const origProfile = console.profile;
    delete console.profile;
    expect(() => iflog.profile("profile label")).not.toThrow();
    console.profile = origProfile;
  });

  it("should call console.profileEnd if available", () => {
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

  it("should not throw if console.profileEnd is not available", () => {
    const origProfileEnd = console.profileEnd;
    delete console.profileEnd;
    expect(() => iflog.profileEnd("profile label")).not.toThrow();
    console.profileEnd = origProfileEnd;
  });

  it("should call console.table with arguments", () => {
    const tableSpy = vi.spyOn(console, "table").mockImplementation(() => {});
    iflog.table([{ a: 1 }], ["a"]);
    expect(tableSpy).toHaveBeenCalledWith([{ a: 1 }], ["a"]);
    tableSpy.mockRestore();
  });

  it("should call console.time with label", () => {
    const timeSpy = vi.spyOn(console, "time").mockImplementation(() => {});
    iflog.time("timer");
    expect(timeSpy).toHaveBeenCalledWith("timer");
    timeSpy.mockRestore();
  });

  it("should call console.timeEnd with label", () => {
    const timeEndSpy = vi
      .spyOn(console, "timeEnd")
      .mockImplementation(() => {});
    iflog.timeEnd("timer");
    expect(timeEndSpy).toHaveBeenCalledWith("timer");
    timeEndSpy.mockRestore();
  });

  it("should call console.timeLog if available", () => {
    const timeLogSpy = vi
      .spyOn(console, "timeLog")
      .mockImplementation(() => {});
    iflog.timeLog("timer", "extra");
    expect(timeLogSpy).toHaveBeenCalledWith("timer", "extra");
    timeLogSpy.mockRestore();
  });

  it("should not throw if console.timeLog is not available", () => {
    const origTimeLog = console.timeLog;
    delete console.timeLog;
    expect(() => iflog.timeLog("timer", "extra")).not.toThrow();
    console.timeLog = origTimeLog;
  });

  it("should call console.timeStamp if available", () => {
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

  it("should not throw if console.timeStamp is not available", () => {
    const origTimeStamp = console.timeStamp;
    delete console.timeStamp;
    expect(() => iflog.timeStamp("stamp")).not.toThrow();
    console.timeStamp = origTimeStamp;
  });

  it("should call console.trace with arguments", () => {
    const traceSpy = vi.spyOn(console, "trace").mockImplementation(() => {});
    iflog.trace("trace message");
    expect(traceSpy).toHaveBeenCalledWith("trace message");
    traceSpy.mockRestore();
  });

  it("should call console.log for enable", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    iflog.enable();
    expect(logSpy).toHaveBeenCalledWith("iflog enabled");
    logSpy.mockRestore();
  });

  it("should call console.log for disable", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    iflog.disable();
    expect(logSpy).toHaveBeenCalledWith("iflog disabled");
    logSpy.mockRestore();
  });

  it("should return true for isEnabled", () => {
    expect(iflog.isEnabled()).toBe(true);
  });
});
