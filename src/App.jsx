import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/home.jsx'
import Transactions from './pages/transactions.jsx'
import Categories from './pages/categories.jsx'
import Calendar from './pages/calendar.jsx'
import Settings from './pages/settings.jsx'
import NewCategory from './pages/newCategory.jsx'
import NewTransaction from './pages/newTransaction.jsx'
import Repeating from './pages/repeating.jsx'

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/newCategory" element={<NewCategory />} />
          <Route path="/newtransaction" element={<NewTransaction />} />
          <Route path="/repeating" element={ <Repeating />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App
