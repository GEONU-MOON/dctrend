import { formatInTimeZone, format } from "date-fns-tz";

/**
 * ISO 8601 날짜 문자열을 원하는 형식으로 변환합니다.
 * @param {string} dateString - ISO 8601 형식의 날짜 문자열
 * @returns {string} - 변환된 날짜 문자열 (형식: YYYY.MM.DD HH:mm)
 */
export const formatDate = (dateString) => {
  // 'UTC' 타임존을 사용하여 포맷팅
  return formatInTimeZone(dateString, "UTC", "yyyy.MM.dd HH:mm");
};

export const formatDay = (dateString) => {
  // 'UTC' 타임존을 사용하여 포맷팅
  return formatInTimeZone(dateString, "UTC", "yyyy.MM.dd");
};

export const formatDateKr = (dateString) => {
  // ISO 8601 형식의 날짜 문자열을 Date 객체로 변환
  const date = new Date(dateString);

  // 9시간을 추가 (9시간 * 60분 * 60초 * 1000밀리초)
  date.setHours(date.getHours() + 9);

  // 한국 시간대에 맞게 포맷팅
  return format(date, "yyyy.MM.dd HH:mm");
};
