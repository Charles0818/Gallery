export const formatFileSize = (fileSize: number): string => {
  let sizeString: string = '';
  const sizeKB = 1024;
  if (fileSize < sizeKB) {
    sizeString = `${fileSize} Byte`;
  } else if (fileSize / sizeKB >= 1 && fileSize / sizeKB <= 999) {
    sizeString = `${Math.ceil(fileSize / sizeKB)} KB`;
  } else if (fileSize / sizeKB ** 2 >= 1 && fileSize / sizeKB ** 2 <= 999) {
    sizeString = `${(fileSize / sizeKB ** 2).toFixed(1)} MB`;
  } else if (fileSize / sizeKB ** 3 >= 1 && fileSize / sizeKB ** 3 <= 999) {
    sizeString = `${(fileSize / sizeKB ** 3).toFixed(1)} GB`;
  }
  return sizeString;
};

export const quantifier = (qty: number, name: string) => {
  switch (qty) {
    case 0:
      return `No ${name}`;
    case 1:
      return `${qty} ${name}`;
    default:
      return `${qty} ${name}s`;
  }
};

export const durationFormat = (num: number): string => {
  const slice = (part: number): string => `000${part}`.slice(-2);
  const hours = Math.floor(num / 3600);
  const minutes = Math.floor(num / 60) % 60;
  const seconds = Math.floor(num - minutes * 60);
  if (hours < 1) return `${slice(minutes)}:${slice(seconds)}`;
  return `${slice(hours)}:${slice(minutes)}:${slice(seconds)}`;
};

export const getMonthName = (month: number): string => {
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'April',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  return monthNames[month];
};

export const getWeekDay = (week: number): string => {
  const weekDays = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];
  return weekDays[week];
};
