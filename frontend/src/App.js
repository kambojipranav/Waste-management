import React, { useState, useEffect } from "react";

function App() {
  const [form, setForm] = useState({ zoneName:"", collectionDate:"", vehicleId:"", wasteQuantity:"" });
  const [records, setRecords] = useState([]);

  // ✅ Fetch Records
  useEffect(() => {
    fetch("http://localhost:5000/records")
      .then(res => res.json())
      .then(data => setRecords(data));
  }, []);

  // ✅ Submit Form
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    }).then(() => window.location.reload());
  };

  return (
    <div className="container mt-4">
      <h2>Waste Management System</h2>

      {/* Add Record Form */}
      <form onSubmit={handleSubmit} className="mb-4">
        <input className="form-control mb-2" placeholder="Zone Name"
          onChange={e => setForm({...form, zoneName:e.target.value})}/>
        <input className="form-control mb-2" type="date"
          onChange={e => setForm({...form, collectionDate:e.target.value})}/>
        <input className="form-control mb-2" placeholder="Vehicle ID"
          onChange={e => setForm({...form, vehicleId:e.target.value})}/>
        <input className="form-control mb-2" type="number" placeholder="Waste Quantity (kg)"
          onChange={e => setForm({...form, wasteQuantity:e.target.value})}/>
        <button className="btn btn-primary w-100">Add Waste Record</button>
      </form>

      {/* Display Records */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Zone</th><th>Date</th><th>Vehicle</th><th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r, i) => (
            <tr key={i}>
              <td>{r.zoneName}</td>
              <td>{r.collectionDate}</td>
              <td>{r.vehicleId}</td>
              <td>{r.wasteQuantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
