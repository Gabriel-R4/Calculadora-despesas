import React, { useState } from 'react';

const ExpenseCalculator = () => {
 const [expenses, setExpenses] = useState([]);
 const [name, setName] = useState('');
 const [amount, setAmount] = useState('');
 const [type, setType] = useState('');
 const [payPer, setPayPer] = useState('');

 const addExpense = (e) => {
    e.preventDefault();
    setExpenses([...expenses, { name, amount, type, payPer }]);
    setName('');
    setAmount('');
    setType('');
    setPayPer('');
 };

 const totalExpenses = expenses.reduce((total, expense) => {
    if (expense.type === 'Expense') {
      return total + parseFloat(expense.amount);
    }
    return total;
 }, 0);

 const totalIncome = expenses.reduce((total, expense) => {
    if (expense.type === 'Income') {
      return total + parseFloat(expense.amount);
    }
    return total;
 }, 0);

 return (
    <div>
      <h2>Expense Calculator</h2>
      <form onSubmit={addExpense}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Amount:
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </label>
        <label>
          Type:
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">Select...</option>
            <option value="Expense">Expense</option>
            <option value="Income">Income</option>
          </select>
        </label>
        <label>
          Pay Per:
          <select value={payPer} onChange={(e) => setPayPer(e.target.value)}>
            <option value="">Select...</option>
            <option value="Pix">Pix</option>
            <option value="Cartão1">Cartão de credito</option>
            <option value="Cartão2">Cartão de debito</option>
            <option value="Boleto">Boleto</option>
          </select>
        </label>
        <button type="submit">Add Expense</button>
      </form>
      <h3>Total Expenses: {totalExpenses}</h3>
      <h3>Total Income: {totalIncome}</h3>
      <h3>Total Profit: {totalIncome - totalExpenses}</h3>
    </div>
 );
};

export default ExpenseCalculator;