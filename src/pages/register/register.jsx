import React, { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    birthday_date: "",
    gender: "",
    phone: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData((prev) => ({ ...prev, [name]: files?.[0] || null }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append(
      "data",
      JSON.stringify({
        name: formData.name,
        surname: formData.surname,
        birthday_date: formData.birthday_date,
        gender: formData.gender,
        phone: formData.phone,
      })
    );

    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    try {
      const response = await fetch(
        "http://localhost:8000/api/auth/register.php",
        {
          method: "POST",
          body: formDataToSend,
          headers: { Accept: "application/json" },
        }
      );

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || `Ошибка: ${response.status}`);

      alert("Регистрация успешна!");
      setFormData({
        name: "",
        surname: "",
        birthday_date: "",
        gender: "",
        phone: "",
        image: null,
      });
    } catch (error) {
      console.error("Ошибка регистрации:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-lg shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold text-center text-white mb-4">
          Регистрация
        </h2>
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Имя"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 text-white rounded"
            required
          />
          <input
            type="text"
            name="surname"
            placeholder="Фамилия"
            value={formData.surname}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 text-white rounded"
          />
          <input
            type="date"
            name="birthday_date"
            value={formData.birthday_date}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 text-white rounded"
          />
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 text-white rounded"
          >
            <option value="">Выберите пол</option>
            <option value="male">Мужской</option>
            <option value="female">Женский</option>
          </select>
          <input
            type="tel"
            name="phone"
            placeholder="Телефон"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 text-white rounded"
            required
          />
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full text-white"
          />

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
            disabled={loading}
          >
            {loading ? "Регистрация..." : "Зарегистрироваться"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
