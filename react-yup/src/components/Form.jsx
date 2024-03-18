import { useState } from "react";
import * as Yup from "yup";

function Form() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    age: "",
    gender: "male",
    interests: [],
    birthDate: "",
  });
  const [errors, setErrors] = useState({});

  const validateSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid Email").required("Email is required"),
    phoneNumber: Yup.string()
      .matches(/^\d{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be 8 digits")
      .max(16, "Password must be maximum of 16 digits")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one symbol"
      )
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password")], "Passwords must match"),
    age: Yup.number()
      .required("Age is required")
      .typeError("Please provide a valid age ")
      .min(18, "Age must be above 18")
      .max(100, "Age must not exceed 100"),
    gender: Yup.string().required("Gender is required"),
    interests: Yup.array()
      .min(1, "Select at least one interest")
      .required("At least one Interest is required"),
    birthDate: Yup.date().required("Date of birth is required"),
  });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await validateSchema.validate(formData, { abortEarly: false });
      console.log("Form Submitted", formData);
    } catch (e) {
      const newErrors = {};
      e.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });

      //   console.log(newErrors);
      setErrors(newErrors);
      console.log(errors);
    }
  }
  function handleChange(e) {
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }
  function handleCheckBoxChange(e) {
    let { name, checked } = e.target;
    let updateInterests = [...formData.interests];
    if (checked) {
      updateInterests.push(name);
    } else {
      updateInterests = updateInterests.filter((interest) => interest !== name);
    }
    setFormData({ ...formData, interests: updateInterests });
  }

  return (
    <div>
      <h1 className="text-center text-xl">Sign Up Form</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-200 w-3/2 py-1 m-5 rounded-md"
      >
        {/* firstName */}
        <div className="flex justify-between w-3/5 mx-auto my-2">
          <label htmlFor="firstName">FirstName:</label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            placeholder="Enter your first name"
            value={formData.firstName}
            onChange={handleChange}
            className="border border-black rounded-md outline-none px-1 text-center"
          />
        </div>
        {errors.firstName && (
          <h1 className="text-center text-red-500 text-2xl">
            {errors.firstName}
          </h1>
        )}
        {/* lastName */}
        <div className="flex justify-between w-3/5 mx-auto my-2">
          <label htmlFor="lastName">LastName:</label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Enter your last name"
            value={formData.lastName}
            onChange={handleChange}
            className="border border-black rounded-md outline-none px-1 text-center"
          />
        </div>
        {errors.lastName && (
          <h1 className="text-center text-red-500 text-2xl">
            {errors.lastName}
          </h1>
        )}
        {/* email */}
        <div className="flex justify-between w-3/5 mx-auto my-2">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="border border-black rounded-md outline-none px-1 text-center"
          />
        </div>
        {errors.email && (
          <h1 className="text-center text-red-500 text-2xl">{errors.email}</h1>
        )}
        {/* phoneNumber */}
        <div className="flex justify-between w-3/5 mx-auto my-2">
          <label htmlFor="phoneNumber">Phone #:</label>
          <input
            type="text"
            name="phoneNumber"
            id="phoneNumber"
            placeholder="Enter your phone #"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="border border-black rounded-md outline-none px-1 text-center"
          />
        </div>
        {errors.phoneNumber && (
          <h1 className="text-center text-red-500 text-2xl">
            {errors.phoneNumber}
          </h1>
        )}
        {/* password */}
        <div className="flex justify-between w-3/5 mx-auto my-2">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your Password"
            value={formData.password}
            onChange={handleChange}
            className="border border-black rounded-md outline-none px-1 text-center"
          />
        </div>
        {errors.password && (
          <h1 className="text-center text-red-500 text-2xl">
            {errors.password}
          </h1>
        )}
        {/* confirmPassword */}
        <div className="flex justify-between w-3/5 mx-auto my-2">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Re-Enter your Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="border border-black rounded-md outline-none px-1 text-center"
          />
        </div>
        {errors.confirmPassword && (
          <h1 className="text-center text-red-500 text-2xl">
            {errors.confirmPassword}
          </h1>
        )}
        {/* age */}
        <div className="flex justify-between w-3/5 mx-auto my-2">
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            name="age"
            id="age"
            placeholder="Enter your Age"
            value={formData.age}
            onChange={handleChange}
            className="border border-black rounded-md outline-none px-1 text-center"
          />
        </div>
        {errors.age && (
          <h1 className="text-center text-red-500 text-2xl">{errors.age}</h1>
        )}
        {/* gender */}
        <div className="flex justify-between w-3/5 mx-auto my-2">
          <label htmlFor="gender">Select your Gender:</label>
          <select
            name="gender"
            id="gender"
            className="border-2 border-black rounded text-center"
            value={formData.gender}
            onChange={handleChange}
          >
            <option className="border" value="male">
              Male
            </option>
            <option className="border" value="female">
              Female
            </option>
            <option className="border" value="other">
              Other
            </option>
          </select>
        </div>
        {errors.gender && (
          <h1 className="text-center text-red-500 text-2xl">{errors.gender}</h1>
        )}
        {/* interests */}
        <div className="flex justify-between w-3/5 mx-auto my-2">
          <label>Interests:</label>
          <div className="flex">
            <label htmlFor="coding" className="px-2">
              Coding
              <input
                type="checkbox"
                name="coding"
                id="coding"
                checked={formData.interests.includes("coding")}
                onChange={handleCheckBoxChange}
              />
            </label>
          </div>
          <div className="flex">
            <label htmlFor="sports" className="px-2">
              Sports
              <input
                type="checkbox"
                name="sports"
                id="sports"
                checked={formData.interests.includes("sports")}
                onChange={handleCheckBoxChange}
              />
            </label>
          </div>
          <div className="flex">
            <label htmlFor="reading" className="px-2">
              Reading
              <input
                type="checkbox"
                name="reading"
                id="reading"
                checked={formData.interests.includes("reading")}
                onChange={handleCheckBoxChange}
              />
            </label>
          </div>
        </div>
        {errors.interests && (
          <h1 className="text-center text-red-500 text-2xl">
            {errors.interests}
          </h1>
        )}
        {/* birthDate */}
        <div className="flex justify-between w-3/5 mx-auto my-2">
          <label htmlFor="birthDate">Birth Date:</label>
          <input
            type="date"
            name="birthDate"
            id="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            className="border border-black rounded-md outline-none px-1 text-center"
          />
        </div>
        {errors.birthDate && (
          <h1 className="text-center text-red-500 text-2xl">
            Date of Birth is required
          </h1>
        )}
        <button className="block m-auto bg-blue-500 text-white rounded-sm py-1 px-2">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Form;
