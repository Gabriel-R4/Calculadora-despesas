import React, { useState, useEffect } from "react";
import "./App.css";

const ExpenseCalculator = () => {
  const [expenses, setExpenses] = useState([]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("");
  const [payPer, setPayPer] = useState("");
  const [expenseHistory, setExpenseHistory] = useState([]);
  const [incomeHistory, setIncomeHistory] = useState([]);

  useEffect(() => {
    const storedExpenses = localStorage.getItem("expenses");
    if (storedExpenses) {
      setExpenses(JSON.parse(storedExpenses));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
    const expensesHistory = expenses.filter((expense) => expense.type === "Expense");
    const incomeHistory = expenses.filter((expense) => expense.type === "Income");
    setExpenseHistory(expensesHistory);
    setIncomeHistory(incomeHistory);
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

  const deleteExpense = (index, expenseType) => {
    const updatedExpenses = [...expenses];
    updatedExpenses.splice(index, 1);
    setExpenses(updatedExpenses);
  };

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

      <h3>Despesas:</h3>
      <ul>
        {expenseHistory.map((expense, index) => (
          <li key={index}>
            Name: {expense.name}, Amount: {expense.amount}, Pay Per: {expense.payPer}
            <button onClick={() => deleteExpense(index, "Expense")}>Excluir</button>
          </li>
        ))}
      </ul>

      <h3>Receitas:</h3>
      <ul>
        {incomeHistory.map((income, index) => (
          <li key={index}>
            Name: {income.name}, Amount: {income.amount}, Pay Per: {income.payPer}
            <button onClick={() => deleteExpense(index, "Income")}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseCalculator;
