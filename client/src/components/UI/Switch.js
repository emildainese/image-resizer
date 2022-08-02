function Switch({ label, ...props }) {
  return (
    <div className={`form-check form-switch d-flex flex-column p-0 m-0`}>
      <label className="form-check-label mb-2" htmlFor={label}>
        {label}
      </label>
      <input
        className={`form-check-input p-0 m-0`}
        type="checkbox"
        role="switch"
        id={label}
        {...props}
      />
    </div>
  );
}

export default Switch;
