

"use client";
import { useState } from "react";
import { toast } from "sonner";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  const [loading, setLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setDownloadUrl(null);

    const trimmedData = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim(),
      phoneNumber: formData.phoneNumber.trim(),
    };

   try {
  const response = await fetch("/api/email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(trimmedData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("API Error:", errorData);

    toast.error("" + errorData.error, {
      style: {
        background: "white",
        color: "var(--primary-blue)",
       border: "1px solid #e0e0e0", 
        boxShadow: "0 2px 6px rgba(150,150,150,0.3)" // subtle gray shadow

      },
    });
    } else {
      const data = await response.json();
      
      // Trigger automatic download using Blob (more reliable than Data URI)
      if (data.pdf) {
        const byteCharacters = atob(data.pdf);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'application/pdf' });
        
        const url = URL.createObjectURL(blob);
        setDownloadUrl(url);
        
        const link = document.createElement("a");
        link.href = url;
        link.download = `Cyber_Safety_Pledge_${trimmedData.firstName}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

      if (data.warning) {
        toast.warning(data.message, {
          style: {
            background: "white",
            color: "#856404",
            border: "1px solid #ffeeba",
            boxShadow: "0 2px 6px rgba(150,150,150,0.3)"
          },
        });
      } else {
        toast.success("Pledge successful! Your certificate is downloading.", {
          style: {
            background: "white",
            color: "var(--primary-blue)",
            border: "1px solid #e0e0e0", 
            boxShadow: "0 2px 6px rgba(150,150,150,0.3)"
          },
        });
      }

      setFormData({ firstName: "", lastName: "", email: "", phoneNumber: "" });
    }
    setLoading(false);
} catch (error) {
  console.error("Error:", error);
  toast.error("Something went wrong!", {
    style: {
      background: "white",
      color: "var(--primary-blue)",
    border: "1px solid #e0e0e0", 
      boxShadow: "0 2px 6px rgba(150,150,150,0.3)" // subtle gray shadow

    },
  });
}
  }

  return (
    <section
      id="pledge"
      className="w-full flex justify-center items-center px-4 py-20 min-h-screen"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 shadow-2xl rounded-2xl overflow-hidden w-full max-w-none mx-auto">
        <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left px-6 py-8 md:px-8 md:py-12">
          <h1
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight"
            style={{ color: "var(--primary-blue)" }}
          >
            Take the Cyber Safety Pledge
          </h1>
          <p
            className="text-base sm:text-lg md:text-xl mt-3"
            style={{ color: "var(--primary-blue)" }}
          >
            I, <span className="font-bold underline decoration-orange-500">{formData.firstName || "____________"} {formData.lastName}</span>, pledge to become a Cyber Awareness Ambassador with HacFy Cyber Chetana and commit to promoting digital safety and awareness in my community.
          </p>
        </div>

        <div className="flex justify-center items-center p-6 md:p-8">
          <div className="p-4 md:p-6 rounded-2xl shadow-lg w-full max-w-[95%] sm:max-w-[80%] md:max-w-[70%] bg-white">
            <h2
              className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-center"
              style={{ color: "var(--primary-blue)" }}
            >
              Join Now
            </h2>
            <div className="flex flex-col space-y-3 md:space-y-4">
              <input
                className="p-3 md:p-4 text-black rounded-lg border focus:outline-none"
                placeholder="First Name"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
              />
              <input
                className="p-3 md:p-4 text-black rounded-lg border focus:outline-none"
                placeholder="Last Name"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
              />
              <input
                className="p-3 md:p-4 text-black rounded-lg border focus:outline-none"
                placeholder="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
              <input
                className="p-3 md:p-4 text-black rounded-lg border focus:outline-none"
                placeholder="Phone Number"
                name="phoneNumber"
                type="text"
                value={formData.phoneNumber}
                onChange={handleChange}
              />

              <button
                className="text-white p-3 md:p-4 rounded-lg font-semibold transition flex justify-center items-center"
                style={{ backgroundColor: "var(--primary-orange)" }}
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? (
                  <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></span>
                ) : (
                  "Submit"
                )}
              </button>

              {downloadUrl && (
                <a
                  href={downloadUrl}
                  download={`Cyber_Safety_Pledge_${formData.firstName || 'Ambassador'}.pdf`}
                  className="w-full text-center py-3 bg-cyan-100 text-cyan-700 rounded-lg font-bold border-2 border-cyan-500 hover:bg-cyan-200 transition-all mt-2"
                >
                  📥 Click here to Download manually
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
