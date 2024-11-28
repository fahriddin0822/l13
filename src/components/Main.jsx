import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { PatternFormat } from "react-number-format";
import { MdOutlineDelete } from "react-icons/md";
import { LuPencilLine } from "react-icons/lu";

const Main = () => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    username: "",
    password: "",
    country: "",
    gender: "",
    birthdate: "",
    tel: "",
  });

  const [data, setData] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("data")) || [];
    } catch (e) {
      console.error("Error parsing localStorage data:", e);
      return [];
    }
  });

  const [edit, setEdit] = useState(null);

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { username, password } = formData;

    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return false;
    }

    if (!formData.tel.match(/^\+998 \(\d{2}\) \d{3} \d{2} \d{2}$/)) {
      alert("Phone number must follow the format: +998 (##) ### ## ##.");
      return false;
    }

    if (data.some((item) => item.username === username && (!edit || item.id !== edit.id))) {
      alert("Username must be unique.");
      return false;
    }

    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    if (edit) {
      const updatedUser = { ...edit, ...formData };
      setData((prev) =>
        prev.map((item) => (item.id === edit.id ? updatedUser : item))
      );
      setEdit(null);
    } else {
      const newUser = {
        id: uuidv4(),
        ...formData,
      };
      setData((prev) => [...prev, newUser]);
    }

    setFormData({
      fname: "",
      lname: "",
      username: "",
      password: "",
      country: "",
      gender: "",
      birthdate: "",
      tel: "",
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure?")) {
      setData((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEdit(item);
  };

  return (
    <div className="flex gap-5">
      <form
        onSubmit={handleSubmit}
        className="w-80 p-5 bg-slate-200 h-screen"
      >
        <input
          required
          className="w-full h-10 px-3 mb-3"
          type="text"
          name="fname"
          placeholder="First Name"
          value={formData.fname}
          onChange={handleChange}
        />
        <input
          required
          className="w-full h-10 px-3 mb-3"
          type="text"
          name="lname"
          placeholder="Last Name"
          value={formData.lname}
          onChange={handleChange}
        />
        <input
          required
          className="w-full h-10 px-3 mb-3"
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          required
          className="w-full h-10 px-3 mb-3"
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <select
          required
          className="w-full h-10 px-3 mb-3"
          name="country"
          value={formData.country}
          onChange={handleChange}
        >
          <option value="">Select Country</option>
          <option value="Uzbekistan">Uzbekistan</option>
          <option value="USA">USA</option>
          <option value="UK">UK</option>
        </select>
        <select
          required
          className="w-full h-10 px-3 mb-3"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input
          required
          className="w-full h-10 px-3 mb-3"
          type="date"
          name="birthdate"
          value={formData.birthdate}
          onChange={handleChange}
        />
        <PatternFormat
          required
          className="w-full h-10 px-3 mb-3"
          format="+998 (##) ### ## ##"
          mask="_"
          value={formData.tel}
          onValueChange={(values) =>
            setFormData((prev) => ({ ...prev, tel: values.formattedValue }))
          }
        />
        <button className="w-full h-10 px-3 mb-3 bg-blue-400">
          {edit ? "Update" : "Create"}
        </button>
      </form>

      <div className="flex-1 flex gap-3 flex-wrap items-start content-start py-5">
        {data.map((item) => (
          <div
            key={item.id}
            className="w-72 p-3 shadow text-center flex flex-col gap-2"
          >
            <div className="w-20 h-20 bg-slate-300 rounded-full mx-auto"></div>
            <h3>
              {item.fname} {item.lname}
            </h3>
            <p>{item.username}</p>
            <p>{item.tel}</p>
            <p>{item.gender}</p>
            <p>{item.country}</p>
            <p>{item.birthdate}</p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => handleEdit(item)}
                className="bg-green-300 p-1 rounded-lg px-2 py-1 shadow-sm"
              >
                <LuPencilLine />
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="bg-red-300 p-1 rounded-lg px-2 py-1 shadow-sm"
              >
                <MdOutlineDelete />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Main;
