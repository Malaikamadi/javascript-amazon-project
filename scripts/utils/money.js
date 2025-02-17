export function formatCurrency(priceCents) {
   // Convert cents to dollars and ensure 2 decimal places
   return (Math.round(priceCents)/ 100).toFixed(2);
 }
 
 export default formatCurrency;
 