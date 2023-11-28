import React, { useState, useEffect } from "react";
import "./App.css";

const ExpenseCalculator = () => {
  const [expenses, setExpenses] = useState([]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("");
  const [payPer, setPayPer] = useState("");
  const [addedExpenses, setAddedExpenses] = useState([]);

  useEffect(() => {
    const storedExpenses = localStorage.getItem("expenses");
    if (storedExpenses) {
      setExpenses(JSON.parse(storedExpenses));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
    setAddedExpenses(expenses);
  }, [expenses]);

  const addExpense = (e) => {
    e.preventDefault();
    const newExpense = { name, amount, type, payPer };
    setExpenses([...expenses, newExpense]);
    setName("");
    setAmount("");
    setType("");
    setPayPer("");
  };

  const totalExpenses = expenses.reduce((total, expense) => {
    if (expense.type === "Expense") {
      return total + parseFloat(expense.amount);
    }
    return total;
  }, 0);

  const totalIncome = expenses.reduce((total, expense) => {
    if (expense.type === "Income") {
      return total + parseFloat(expense.amount);
    }
    return total;
  }, 0);

  return (
    <div className="container">
      <h2>Expense Calculator</h2>
      <form onSubmit={addExpense}>
        <label>
          Nome:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Valor:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
        <label>
          Tipo:
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">Select...</option>
            <option value="Expense">Despesas</option>
            <option value="Income">Receita</option>
          </select>
        </label>
        <label>
          Pagamento:
          <select value={payPer} onChange={(e) => setPayPer(e.target.value)}>
            <option value="">Select...</option>
            <option value="Pix">Pix</option>
            <option value="CartãoCredito">Cartão de credito</option>
            <option value="CartãoDebito">Cartão de debito</option>
            <option value="Boleto">Boleto</option>
          </select>
        </label>
        <button type="submit">Adicionar</button>
      </form>
      <h3>Total Despesas: {totalExpenses}</h3>
      <h3>Total Receita: {totalIncome}</h3>
      <h3>Total Lucro: {totalIncome - totalExpenses}</h3>

      <h3>List of Added Expenses:</h3>
      <ul>
        {addedExpenses.map((expense, index) => (
          <li key={index}>
            Name: {expense.name}, Amount: {expense.amount}, Type: {expense.type}, Pay Per: {expense.payPer}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseCalculator;

