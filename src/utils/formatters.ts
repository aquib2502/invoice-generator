/**
 * Formats a numeric value into Indian currency format.
 * Example: 135000 -> ₹1,35,000.00 or 1,35,000/-
 */
export const formatCurrency = (
  amount: number | string | undefined | null,
  options: { includeSymbol?: boolean; style?: 'standard' | 'dash' } = {}
): string => {
  const { includeSymbol = true, style = 'standard' } = options;
  const num = typeof amount === 'number' ? amount : parseFloat(String(amount || 0));
  
  if (isNaN(num)) return includeSymbol ? '₹0.00' : '0.00';

  // Format using Indian Numbering system (lakhs & crores)
  const formatted = new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);

  if (style === 'dash') {
    // Matches the reference invoice style "33,750 /-"
    const intPart = new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 0,
    }).format(Math.floor(num));
    const decPart = Math.round((num % 1) * 100);
    if (decPart === 0) {
      return `${intPart} /-`;
    }
    return `${formatted}/-`;
  }

  return includeSymbol ? `₹${formatted}` : formatted;
};

/**
 * Formats date into DD.MM.YYYY (reference style) or custom format
 */
export const formatDate = (dateStr: string | Date | undefined | null): string => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return String(dateStr);

  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();

  return `${day}.${month}.${year}`;
};

/**
 * Converts a number to Indian Currency Words (Lakhs / Crores)
 */
export const numberToWords = (num: number): string => {
  if (num === 0) return 'Zero Rupees Only';
  if (isNaN(num)) return '';

  const single = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
  const double = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  const convertTwoDigits = (n: number): string => {
    if (n < 10) return single[n];
    if (n >= 10 && n < 20) return double[n - 10];
    return tens[Math.floor(n / 10)] + (n % 10 !== 0 ? ' ' + single[n % 10] : '');
  };

  const convertThreeDigits = (n: number): string => {
    const hundred = Math.floor(n / 100);
    const rest = n % 100;
    let res = '';
    if (hundred > 0) res += single[hundred] + ' Hundred';
    if (rest > 0) res += (res ? ' ' : '') + convertTwoDigits(rest);
    return res;
  };

  const integerPart = Math.floor(Math.abs(num));
  const decimalPart = Math.round((Math.abs(num) - integerPart) * 100);

  let result = '';

  const crore = Math.floor(integerPart / 10000000);
  let remainder = integerPart % 10000000;

  const lakh = Math.floor(remainder / 100000);
  remainder = remainder % 100000;

  const thousand = Math.floor(remainder / 1000);
  remainder = remainder % 1000;

  if (crore > 0) result += convertTwoDigits(crore) + ' Crore ';
  if (lakh > 0) result += convertTwoDigits(lakh) + ' Lakh ';
  if (thousand > 0) result += convertTwoDigits(thousand) + ' Thousand ';
  if (remainder > 0) result += convertThreeDigits(remainder);

  result = result.trim() + ' Rupees';

  if (decimalPart > 0) {
    result += ' and ' + convertTwoDigits(decimalPart) + ' Paise';
  }

  return result + ' Only';
};
