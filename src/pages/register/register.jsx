import React, { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    birthday_date: "",
    gender: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);

  const fields = [
    { name: "name", type: "text", label: "Имя", placeholder: "Имя", required: true },
    { name: "surname", type: "text", label: "Фамилия", placeholder: "Фамилия" },
    { name: "birthday_date", type: "date", label: "Дата рождения" },
    { name: "phone", type: "tel", label: "Телефон", placeholder: "Телефон", required: true },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append("data", JSON.stringify(formData));

    try {
      const response = await fetch("http://localhost:8000/api/auth/register.php", {
        method: "POST",
        body: formDataToSend,
        headers: { Accept: "application/json" },
        credentials: "include",
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || `Ошибка: ${response.status}`);

      alert("Регистрация успешна!");
      setFormData({ name: "", surname: "", birthday_date: "", gender: "", phone: "" });
    } catch (error) {
      console.error("Ошибка регистрации:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center text-white mb-4">Регистрация</h2>
        <div className="space-y-4">
          {fields.map((field) => (
            <input
              key={field.name}
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              value={formData[field.name]}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 text-white rounded"
              required={field.required || false}
            />
          ))}
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 text-white rounded">
            <option value="">Выберите пол</option>
            <option value="male">Мужской</option>
            <option value="female">Женский</option>
          </select>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
            disabled={loading}>
            {loading ? "Регистрация..." : "Зарегистрироваться"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
