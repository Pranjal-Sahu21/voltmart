import React, { useState } from "react";
import { toast } from "react-toastify";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    toast.success("Message sent successfully.");

    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-neutral-100 flex items-center justify-center px-4 py-14">
      <div
        className="max-w-5xl w-full 
        bg-white/40 backdrop-blur-xl 
        border border-white/50 
        rounded-3xl shadow-xl 
        p-10"
      >
        {/* Title */}
        <h2 className="text-4xl font-bold text-center text-black mb-10 tracking-tight">
          Contact Us
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-10">
          {/* Info */}
          <div className="space-y-10 text-neutral-900">
            <div>
              <h3 className="text-2xl font-semibold text-black">
                Get in Touch
              </h3>
              <p className="text-neutral-700 leading-relaxed mt-4">
                Have a question, need help, or want to know more about our
                products? Our support team is here for you.
              </p>
            </div>

            <div className="space-y-2 text-neutral-800">
              <p>
                <strong>📍 Address:</strong> 123 Quickmart St, Fast City, NY
                10001
              </p>
              <p>
                <strong>📧 Email:</strong> support@voltmart.com
              </p>
              <p>
                <strong>📞 Phone:</strong> (123) 456-7890
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="flex justify-center">
            <div className="w-full md:w-px md:h-full bg-neutral-300 opacity-60 h-px"></div>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-black mb-1">Your Name</label>
              <input
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 bg-white/50 backdrop-blur-md 
                border border-neutral-300 rounded-md text-black 
                placeholder-neutral-500 focus:ring-1 focus:ring-black outline-none"
              />
            </div>

            <div>
              <label className="block text-black mb-1">Email Address</label>
              <input
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-white/50 backdrop-blur-md 
                border border-neutral-300 rounded-md text-black 
                placeholder-neutral-500 focus:ring-1 focus:ring-black outline-none"
              />
            </div>

            <div>
              <label className="block text-black mb-1">Your Message</label>
              <textarea
                rows="4"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-2 bg-white/50 backdrop-blur-md 
                border border-neutral-300 rounded-md text-black 
                placeholder-neutral-500 focus:ring-1 focus:ring-black outline-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white font-medium py-3 rounded-lg
              hover:bg-neutral-800 transition-all shadow-md hover:shadow-lg cursor-pointer active:scale-95"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
