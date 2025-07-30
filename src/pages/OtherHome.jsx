import React, { useState } from "react";

function InputWithLabel({
  inputId,
  name,
  type,
  label,
  noValidate,
  value,
  onChange,
}) {
  return (
    <>
      <label htmlFor={inputId}>{label}</label>
      <input
        type={type}
        name={name}
        id={inputId}
        formNoValidate={noValidate}
        value={value}
        onChange={onChange}
      />
    </>
  );
}

function OtherHome() {
  const [form, setForm] = useState({ email: "", pwd: "" });

  const handlerChange = (event) => {
    setForm((form) => {
      return {
        ...form,
        [event.target.name]: event.target.value,
      };
    });
  };

  return (
    <>
      <h1>Other Home</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
        similique eos error, illo consectetur, sapiente laboriosam explicabo
        doloribus nulla molestiae tempora nostrum nemo iure, commodi omnis
        dolores? Explicabo, provident accusantium.
      </p>

      <form>
        <InputWithLabel
          inputId="email"
          label="Email"
          name="email"
          type="email"
          noValidate
          value={form.email}
          onChange={handlerChange}
        />

        <InputWithLabel
          inputId="pwd"
          label="Password"
          name="pwd"
          type="password"
          noValidate
          value={form.pwd}
          onChange={handlerChange}
        />

        <button
          type="button"
          onClick={() => {
            console.log(form);
          }}
        >
          Submit
        </button>
      </form>
    </>
  );
}

export default OtherHome;
