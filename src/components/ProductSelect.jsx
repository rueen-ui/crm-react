import { PRODUCTS } from '../constants.js';

const ProductSelect = ({ value, onChange, className = 'form-control' }) => (
  <select name="product" className={className} value={value} onChange={onChange}>
    {PRODUCTS.map((p) => (
      <option key={p.value} value={p.value}>
        {p.label}
      </option>
    ))}
  </select>
);

export default ProductSelect;
