import { useState } from "react";

function App() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <h1>Welcome to My App</h1>
      <button onClick={() => setModalOpen(true)}>Open Modal</button>
      {modalOpen && (
        <div className="modal">
          <h2>Sign Up</h2>
          <input placeholder="Your Email" />
          <button>Submit</button>
        </div>
      )}
    </div>
  );
}

export default App;