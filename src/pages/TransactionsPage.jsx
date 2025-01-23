import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';

const TransactionsPage = () => {
  const { accountId } = useParams();
  const accountTitle = `Argent Bank Account (x${accountId})`;
  const accountAmount = "$2,082.79"; // Vous pouvez récupérer le montant réel du compte en fonction de l'ID du compte
  const transactions = [
    { id: 1, date: "June 20th, 2020", description: "Golden Sun Bakery", amount: "$5.00", balance: "$2,077.79" },
    { id: 2, date: "June 20th, 2020", description: "Golden Sun Bakery", amount: "$10.00", balance: "$2,067.79" },
    { id: 3, date: "June 20th, 2020", description: "Golden Sun Bakery", amount: "$20.00", balance: "$2,047.79" },
    { id: 4, date: "June 20th, 2020", description: "Golden Sun Bakery", amount: "$30.00", balance: "$2,017.79" },
    { id: 5, date: "June 20th, 2020", description: "Golden Sun Bakery", amount: "$40.00", balance: "$1,977.79" },
    { id: 6, date: "June 20th, 2020", description: "Golden Sun Bakery", amount: "$50.00", balance: "$1,927.79" },
  ];

  return (
    <div>
      <div className="hero-transactions">
        <h2>{accountTitle}</h2>
        <p className="account-amount">{accountAmount}</p>
        <p className="available-balance">Available Balance</p>
      </div>
      <div className="transactions-table">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Date</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <TransactionRow key={transaction.id} transaction={transaction} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const TransactionRow = ({ transaction }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditingCategory, setIsEditingCategory] = useState(false);
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [category, setCategory] = useState(localStorage.getItem(`category-${transaction.id}`) || "Food");
  const [note, setNote] = useState(localStorage.getItem(`note-${transaction.id}`) || "");

  useEffect(() => {
    localStorage.setItem(`category-${transaction.id}`, category);
  }, [category, transaction.id]);

  useEffect(() => {
    localStorage.setItem(`note-${transaction.id}`, note);
  }, [note, transaction.id]);

  return (
    <>
      <tr>
        <td>
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? "▲" : "▼"}
          </button>
        </td>
        <td>{transaction.date}</td>
        <td>{transaction.description}</td>
        <td>{transaction.amount}</td>
        <td>{transaction.balance}</td>
      </tr>
      {isOpen && (
        <tr className="transaction-details">
          <td colSpan="5">
            <div>
              <p>Transaction Type: Electronic</p>
              <p>
                Category: 
                {isEditingCategory ? (
                  <select 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)}
                    onBlur={() => setIsEditingCategory(false)}
                  >
                    <option value="Food">Food</option>
                    <option value="Transport">Transport</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Entertainment">Entertainment</option>
                  </select>
                ) : (
                  <>
                    {category} <i className="fa fa-pencil" onClick={() => setIsEditingCategory(true)}></i>
                  </>
                )}
              </p>
              <p>
                Note: 
                {isEditingNote ? (
                  <input 
                    type="text" 
                    value={note} 
                    onChange={(e) => setNote(e.target.value)} 
                    onBlur={() => setIsEditingNote(false)}
                  />
                ) : (
                  <>
                    {note || "Add a note"} <i className="fa fa-pencil" onClick={() => setIsEditingNote(true)}></i>
                  </>
                )}
              </p>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export default TransactionsPage;