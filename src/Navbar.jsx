import React, { useState } from 'react';

function Navbar() {
  const [count, setCount] = useState(0);

  return (
    <nav>
      <div>{count}</div>
      <button onClick={() => setCount(count + 1)}>
        count
      </button>
    </nav>
  )
}

export default Navbar;