/**
 *
 *
 * @export
 * @class DateUtils
 * 
 * This class provides a set of utility methods for working with dates. 
 * It contains two static methods: 
 * - `stringToDate(dateString: string)` converts a string in the format 'yyyy-mm-dd' to a Date object.
 * - `dateToString(date: Date)` converts a Date object to a string in the format 'dd.mm.yyyy'.
 * 
 * The DateUtils class can be used to handle date-related operations in the application, 
 * such as parsing date strings from the server, formatting dates for display, 
 * and calculating differences between dates.
 */
export class DateUtils {
  // Преобразование строки в формате 'гггг-мм-дд' в объект Date
  static stringToDate(dateString: string) {
    const [year, month, day] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day);
  }

  // Форматирование объекта Date в строку в формате 'дд.мм.гггг'
  static dateToString(date: Date) {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  }

  // Получение разницы в днях между двумя датами
  static getDaysDiff(date1: number, date2: number) {
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  // Проверка, является ли год високосным
  static isLeapYear(year: number) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }

  // Форматирование строки даты в новый формат
  static formatDate(dateString: string, format: string | any) {
    const date = DateUtils.stringToDate(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    let formattedDate = format;
    formattedDate = formattedDate.replace("dd", day);
    formattedDate = formattedDate.replace("mm", month);
    formattedDate = formattedDate.replace("yyyy", year);

    return formattedDate;
  }

  // Преобразование ISO-строки в объект Date
  static isoStringToDate(isoString: string) {
    return new Date(isoString);
  }

  // Преобразование временной метки (timestamp) в объект Date
  static timestampToDate(timestamp: number) {
    return new Date(timestamp);
  }

  // Возвращает день, месяц, год и время
  static getDateTime(date: Date) {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
  }
}
