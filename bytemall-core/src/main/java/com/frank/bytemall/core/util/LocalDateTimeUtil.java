package com.frank.bytemall.core.util;


import java.time.*;
import java.time.format.DateTimeFormatter;
import java.util.Date;


public class LocalDateTimeUtil {

    /**
     * Note:
     * 1. ZoneOffset 继承自 ZoneId, 因此 ZoneId 参数可以传 ZoneOffset
     */

    private static final ZoneId ZONE_ID_SYSTEM = ZoneId.systemDefault();

    /*============= LocalDateTime ==========*/

    /**
     * 获取当前时间
     */
    public static LocalDateTime now() {
        return LocalDateTime.now();
    }

    public static LocalDateTime dateTimeToUTCDateTime(LocalDateTime dateTime) {
        return dateTimeToUTCDateTime(dateTime, ZONE_ID_SYSTEM);
    }

    /**
     * @param dateTime dateTime
     * @param zoneId zoneId
     *    需要指定时区, 因为 LocalDateTime 不带有任何系统时区信息
     *    如果传 null, 默认为 系统所在时区
     */
    public static LocalDateTime dateTimeToUTCDateTime(LocalDateTime dateTime, ZoneId zoneId) {
        if (null == zoneId) {
            zoneId = ZONE_ID_SYSTEM;
        }
        ZonedDateTime zDateTime = dateTime.atZone(zoneId);
        return zDateTime.withZoneSameInstant(ZoneId.of("UTC")).toLocalDateTime();
    }

    /*=========== instant/LocalDateTime =========*/

    public static LocalDateTime instantToDateTime(Instant instant) {
        return instantToDateTime(instant, ZONE_ID_SYSTEM);
    }

    public static LocalDateTime instantToDateTime(Instant instant, ZoneId zoneId) {
        if (null == zoneId) {
            zoneId = ZONE_ID_SYSTEM;
        }
        return LocalDateTime.ofInstant(instant, zoneId);
    }

    public static Instant dateTimeToInstant(LocalDateTime dateTime) {
        return dateTimeToInstant(dateTime, ZONE_ID_SYSTEM);
    }

    public static Instant dateTimeToInstant(LocalDateTime dateTime, ZoneId zoneId) {
        if (null == zoneId) {
            zoneId = ZONE_ID_SYSTEM;
        }
        ZonedDateTime zDateTime = dateTime.atZone(zoneId);
        return zDateTime.toInstant();
    }

    /*============ epochMilli/LocalDateTime ==========*/

    public static LocalDateTime epochMilliToDateTime(long epochMilli) {
        return epochMilliToDateTime(epochMilli, ZONE_ID_SYSTEM);
    }

    public static LocalDateTime epochMilliToDateTime(long epochMilli, ZoneId zoneId) {
        if (null == zoneId) {
            zoneId = ZONE_ID_SYSTEM;
        }
        return instantToDateTime(Instant.ofEpochMilli(epochMilli), zoneId);
    }

    public static long dateTimeToEpochMilli(LocalDateTime dateTime) {
        return dateTimeToEpochMilli(dateTime, ZONE_ID_SYSTEM);
    }

    public static long dateTimeToEpochMilli(LocalDateTime dateTime, ZoneId zoneId) {
        if (null == zoneId) {
            zoneId = ZONE_ID_SYSTEM;
        }
        Instant instant = dateTimeToInstant(dateTime, zoneId);
        return instant.toEpochMilli();
    }

    /*=========== epochSecond/LocalDateTime ===========*/

    public static LocalDateTime epochSecondToDateTime(long epochSecond) {
        return epochSecondToDateTime(epochSecond, ZONE_ID_SYSTEM);
    }

    /**
     * @param epochSecond epochSecond
     * @param zoneId      null: 默认使用 系统所在时区
     */
    public static LocalDateTime epochSecondToDateTime(long epochSecond, ZoneId zoneId) {
        if (null == zoneId) {
            zoneId = ZONE_ID_SYSTEM;
        }
        return instantToDateTime(Instant.ofEpochSecond(epochSecond), zoneId);
    }

    public static long dateTimeToEpochSecond(LocalDateTime dateTime) {
        return dateTimeToEpochSecond(dateTime, ZONE_ID_SYSTEM);
    }

    public static long dateTimeToEpochSecond(LocalDateTime dateTime, ZoneId zoneId) {
        if (null == zoneId) {
            zoneId = ZONE_ID_SYSTEM;
        }
        return dateTime.atZone(zoneId).toEpochSecond();
    }

    /**
     * midnight
     */
    public static LocalDateTime getMidnightDateTimeOfDate(LocalDate date) {
        // 获取午夜 0点时间
        return date.atStartOfDay();
    }

    /*=============== String/LocalDateTime ============*/

    /**
     * eg:
     *  pattern: "yyyy-MM-dd HH:mm"
     */
    public static LocalDateTime stringToDateTime(String dateTimeStr, String pattern) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(pattern);
        return stringToDateTime(dateTimeStr, formatter);
    }

    public static LocalDateTime stringToDateTime(String dateTimeStr, DateTimeFormatter formatter) {
        return LocalDateTime.parse(dateTimeStr, formatter);
    }

    public static String dateTimeToString(LocalDateTime dateTime, String pattern) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(pattern);
        return dateTimeToString(dateTime, formatter);
    }

    public static String dateTimeToString(LocalDateTime dateTime, DateTimeFormatter formatter) {
        return dateTime.format(formatter);
    }

    /*============== LocalDate ============*/

    public static LocalDate getDateOfDateTime(LocalDateTime dateTime) {
        return dateTime.toLocalDate();
    }

    public static String dateToString(LocalDate date, String pattern) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(pattern);
        return dateToString(date, formatter);
    }

    public static String dateToString(LocalDate date, DateTimeFormatter formatter) {
        return date.format(formatter);
    }

    public static LocalDate stringToDate(String dateStr, String pattern) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(pattern);
        return stringToDate(dateStr, formatter);
    }

    public static LocalDate stringToDate(String dateStr, DateTimeFormatter formatter) {
        return LocalDate.parse(dateStr, formatter);
    }

    /*============= Specified LocalDate ============*/

    public static LocalDate getYesterdayDate() {
        return getDateOffsetFromToday(-1);
    }

    public static LocalDate getTodayDate() {
        return getDateOffsetFromToday(0);
    }

    public static LocalDate getTomorrowDate() {
        return getDateOffsetFromToday(1);
    }

    /**
     * @param days eg:
     *             0  :  get today date
     *             1  :  get tomorrow date
     *             -1 :  get yesterday date
     */
    public static LocalDate getDateOffsetFromToday(int days) {

        LocalDate today = LocalDate.now();
        if (0 == days) {
            return today;
        }
        return today.plusDays(days);
    }

    public static long dateToEpochMilli(LocalDate date) {
        return dateToEpochMilli(date, ZONE_ID_SYSTEM);
    }

    public static long dateToEpochMilli(LocalDate date, ZoneId zoneId) {
        // 获取当天的午夜时间戳
        if (null == zoneId) {
            zoneId = ZONE_ID_SYSTEM;
        }
        Instant instant = dateTimeToInstant(getMidnightDateTimeOfDate(date), zoneId);
        return instant.toEpochMilli();
    }

    public static long dateToEpochSecond(LocalDate date) {
        return dateToEpochSecond(date, ZONE_ID_SYSTEM);
    }

    public static long dateToEpochSecond(LocalDate date, ZoneId zoneId) {
        // 获取当天的午夜时间戳
        if (null == zoneId) {
            zoneId = ZONE_ID_SYSTEM;
        }
        return getMidnightDateTimeOfDate(date).atZone(zoneId).toEpochSecond();
    }

    /*============= Calculate ==========*/

    /**
     * eg:
     *   LocalDateTime nowDateTime = LocalDateTimeUtil.now();
     *   LocalDateTime nextDateTime = LocalDateTimeUtil.epochSecondToDateTime(System.currentTimeMillis()/1000+3601, null);
     *   // nowDateTime < nextDateTime
     *
     *   long deltaDays = LocalDateTimeUtil.between(nowDateTime, nextDateTime).toDays();
     *   // deltaDays = 0
     *
     *   long deltaHours = LocalDateTimeUtil.between(nowDateTime, nextDateTime).toHours();
     *   // deltaHours = 1
     *
     *   long deltaMinutes = LocalDateTimeUtil.between(nowDateTime, nextDateTime).toMinutes();
     *   // deltaMinutes = 60
     *
     */
    public static Duration between(LocalDateTime var1, LocalDateTime var2) {
        return Duration.between(var1, var2);
    }

    public static Duration between(LocalDate var1, LocalDate var2) {
        return Duration.between(var1.atStartOfDay(), var2.atStartOfDay());
    }

    /**
     * ----------------- LocalDateTime and Date Conversion
     * <p>
     * https://docs.oracle.com/javase/tutorial/datetime/iso/legacy.html
     * <p>
     * jdk1.8 开始: java.util.Date, java.util.Calendar, and java.util.TimeZone 包括(java.util.GregorianCalendar) 不再维护.
     * 替代者为 java.time eg: LocalDate, LocalDateTime
     */
    public static LocalDateTime legacyDateToDateTime(Date date) {
        return legacyDateToDateTime(date, ZONE_ID_SYSTEM);
    }

    public static LocalDateTime legacyDateToDateTime(Date date, ZoneId zoneId) {
        if (null == zoneId) {
            zoneId = ZONE_ID_SYSTEM;
        }
        return LocalDateTime.ofInstant(date.toInstant(), zoneId);
    }

    public static Date dateTimeToLegacyDate(LocalDateTime dateTime) {
        return dateTimeToLegacyDate(dateTime, ZONE_ID_SYSTEM);
    }

    public static Date dateTimeToLegacyDate(LocalDateTime dateTime, ZoneId zoneId) {
        if (null == zoneId) {
            zoneId = ZONE_ID_SYSTEM;
        }
        return Date.from(dateTime.atZone(zoneId).toInstant());
    }

    public static LocalDate getDateOfLegacyDate(Date date) {
        return getDateOfLegacyDate(date, ZONE_ID_SYSTEM);
    }

    public static LocalDate getDateOfLegacyDate(Date date, ZoneId zoneId) {
        return getDateOfDateTime(legacyDateToDateTime(date, zoneId));
    }

    /**
     * 获取当地指定日期当天的 0点0分0秒 的毫秒数.
     *
     * @param dayTime 指定日期的毫秒数
     * @return 该指定日期当天0点0分0秒的毫秒数
     */
    public static long getTodayZeroOClockTimeMillis(long dayTime) {
        LocalDateTime localDateTime = LocalDateTime.ofInstant(Instant.ofEpochMilli(dayTime), ZoneId.systemDefault());
        LocalDateTime endOfDay = localDateTime.with(LocalTime.MIN);
        return getMillisByLocalDateTime(endOfDay);
    }

    /**
     * 获取当地指定日期当天的 23点59分59秒 的毫秒数.
     *
     * @param dayTime 指定日期的毫秒数
     * @return 该指定日期当天23点59分59秒的毫秒数
     */
    public static long getTodayMaxOClockTimeMillis(long dayTime) {
        LocalDateTime localDateTime = LocalDateTime.ofInstant(Instant.ofEpochMilli(dayTime), ZoneId.systemDefault());
        LocalDateTime endOfDay = localDateTime.with(LocalTime.MAX);
        return getMillisByLocalDateTime(endOfDay);
    }

    /**
     * 获取指定时间的毫秒数.
     *
     * @param dateTime dateTime
     */
    public static long getMillisByLocalDateTime(LocalDateTime dateTime) {
        return Date.from(dateTime.atZone(ZoneId.systemDefault()).toInstant()).getTime();
    }

    /**
     * 返回指定毫秒时间的整点毫秒.
     * 如:   1557978923217(2019/5/16 11:55:23)
     * 返回: 1557975600023(2019/5/16 11:00:00)
     *
     * @param dayTime dayTime
     */
    public static long getHourZeroClockByMillis(long dayTime) {
        LocalDateTime localDateTime = LocalDateTime.ofInstant(Instant.ofEpochMilli(dayTime), ZoneId.systemDefault());
        return getHourZeroClockByDateTime(localDateTime);
    }

    /**
     * 返回指定时间的整点毫秒, 与 {@link this#getHourZeroClockByMillis(long)} 作用一致.
     * 如:   1557978923217(2019/5/16 11:55:23)
     * 返回: 1557975600023(2019/5/16 11:00:00)
     *
     * @param dayTime dayTime
     */
    public static long getHourZeroClockByDateTime(LocalDateTime dayTime) {
        LocalDateTime tmp1 = dayTime.withMinute(0);
        LocalDateTime tmp2 = tmp1.withSecond(0);
        return getMillisByLocalDateTime(tmp2.withNano(0));
    }

    /**
     * 判断两个时间戳是否在一个自然小时内.
     * <p>
     * 如: begin -> 1557978923217(2019/5/16 11:55:23), end -> 1557979825000(2019/5/16 12:10:25) 会返回false
     *
     * @param begin begin
     * @param end   end
     */
    public static boolean isInAnHour(long begin, long end) {
        long beginZero = getHourZeroClockByMillis(begin);
        long endZero = getHourZeroClockByMillis(end);
        return endZero - beginZero == 0;
    }

    public static void main(String[] args) {
        System.out.println(LocalDateTimeUtil.dateTimeToLegacyDate(LocalDateTimeUtil.epochSecondToDateTime(1520256159L)));
    }

}
