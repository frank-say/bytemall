package com.frank.bytemall.core.util;

import org.apache.commons.codec.digest.DigestUtils;

public class Md5Util {

    public static String md5Hash(String msg) {
        return DigestUtils.md5Hex(msg);
    }
}
