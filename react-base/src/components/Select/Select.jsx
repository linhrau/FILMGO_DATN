import PropTypes from "prop-types";
function Select(props) {
  return (
    <select
      value={props.value}
      onChange={props.onChange}
      className={props.className}
    >
      <option value="">{props.label}</option>
      {props.options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      ))}
    </select>
  );
}
Select.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.any,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
};
export default Select;
