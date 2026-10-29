
/**
 * Reusable input field with label and error handling
 * @param {Object} props
 * @param {string} props.label - Display label for input
 * @param {string} props.value - Current input value
 * @param {function} props.onChange - Change handler
 * @param {string} props.error - Error message (if any)
 * @param {string} props.type - Input type (default: 'text')
 * @param {string} props.placeholder - Placeholder text
 * @param {string} props.name - Input name attribute
 */
function InputField({ 
  label, 
  value, 
  onChange, 
  error, 
  type = 'text',
  placeholder = '',
  name,
  min,
  max,
  step
}) {
  return (
    <div className="input-field">
      {/* Label with htmlFor for accessibility */}
      <label htmlFor={name} className="input-label">
        {label}
      </label>
      
      {/* Controlled input - value & onChange from parent */}
      <input
        id={name}
        name={name}
        type={type}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`input ${error ? 'input-error' : ''}`}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${name}-error` : undefined}
      />
      
      {/* Conditional Error Display - Only render if error exists */}
      {error && (
        <span 
          id={`${name}-error`}
          className="error-text" 
          role="alert"
        >
          {error}
        </span>
      )}
    </div>
  );
}

export default InputField;
