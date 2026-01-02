export const generateOrderId = () => {
  const datePart = new Date()
    .toISOString()
    .replace(/[-:.TZ]/g, "")
    .slice(0, 14); 
  const randomPart = Math.floor(100000 + Math.random() * 900000);

  return `${datePart}-${randomPart}`;
};
