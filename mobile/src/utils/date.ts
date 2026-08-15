export const formatArticleDate = (dateString?: string, options?: Intl.DateTimeFormatOptions): string => {
  if (!dateString) return '';

  const safeDateStr = dateString.replace(' ', 'T').replace(' +0000', 'Z');
  const dateObj = new Date(safeDateStr);
  
  if (isNaN(dateObj.getTime())) return 'Just now';

  const defaultOptions: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
  };

  return dateObj.toLocaleDateString('en-US', options || defaultOptions);
};
