package com.sfubermovies.webclient.test.acceptance.env

import com.jezhumble.javasysmon.JavaSysMon
import com.sun.jna.Library
import com.sun.jna.Native
import com.sun.jna.Platform

import java.lang.reflect.Field

class ProcessManager {
    static void killProcessTree(Process p) {
        def pid = getPid(p)
        new JavaSysMon().killProcessTree(pid, false)
    }

    // Code below from http://stackoverflow.com/questions/4912282/java-tool-method-to-force-kill-a-child-process
    static interface Kernel32 extends Library {
        public static Kernel32 INSTANCE = (Kernel32)Native.loadLibrary("kernel32", Kernel32.class)
        public int GetProcessId(Long hProcess)
    }

    private static int getPid(Process p) {
        if (Platform.isWindows()) {
            Field f = p.getClass().getDeclaredField('handle')
            f.setAccessible(true)
            int pid = Kernel32.INSTANCE.GetProcessId((Long)f.get(p))
            return pid
        } else if (Platform.isLinux() || Platform.isMac()) {
            Field f = p.getClass().getDeclaredField("pid")
            f.setAccessible(true)
            int pid = (Integer)f.get(p)
            return pid
        }
        throw new RuntimeException('Unsupported platform detected')
    }
}
