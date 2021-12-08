const formatDate = (date: Date): string => {
  const month = +date.getMonth() + 1;
  return date.getFullYear() + "-" + month + "-" + date.getDate();
};

export { formatDate };
