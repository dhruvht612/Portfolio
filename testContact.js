import fetch from "node-fetch";

const test = async () => {
  const res = await fetch("http://localhost:3000/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Test User",
      email: "test@example.com",
      message: "Hello, this is a test message!",
    }),
  });

  const data = await res.json();
  console.log("Response:", data);
};

test();
