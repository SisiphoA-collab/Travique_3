// components/Expenses.js
import React, { useState } from "react";
import "./css/expenses.css";

const Expenses = () => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("General");
  const [expenses, setExpenses] = useState([]);

  const addExpense = () => {
    if (!description || !amount) return;

    const newExpense = {
      id: Date.now(),
      description,
      amount: parseFloat(amount),
      category,
    };

    setExpenses([...expenses, newExpense]);
    setDescription("");
    setAmount("");
    setCategory("General");
  };

  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="expenses-container">
      <h2>💸 Expense Tracker</h2>

      <div className="expense-form">
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount (R)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="General">General</option>
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Utilities">Utilities</option>
        </select>
        <button onClick={addExpense}>Add</button>
      </div>

      <div className="expense-list">
        {expenses.map((expense) => (
          <div key={expense.id} className="expense-item">
            <span>{expense.description}</span>
            <span>R{expense.amount.toFixed(2)}</span>
            <span className="category">{expense.category}</span>
          </div>
        ))}
      </div>

      <div className="total">Total: R{total.toFixed(2)}</div>
    </div>
  );
};

export default Expenses;
