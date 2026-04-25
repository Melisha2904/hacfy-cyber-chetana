const review = [
  {
    question: "Introduction",
    answer: [
      "Welcome to HacFy Cyber Chetana. By accessing our website and using our services, you agree to comply with and be bound by these Terms & Conditions.",
      "If you do not agree with any part of these terms, please do not use our website.",
    ],
  },
  {
    question: "Use of Website",
    answer: [
      "You must use the website for lawful purposes only.",
      "Unauthorized use of this website may give rise to a claim for damages or be a criminal offense.",
      "Any attempt to compromise the security of the website or disrupt our services is strictly prohibited.",
    ],
  },
  {
    question: " Intellectual Property",
    answer: [
      "All content, including text, graphics, logos, and resources, is the property of HacFy Cyber Chetana and is protected by copyright laws.",
      "You may not copy, distribute, or reproduce any content without our permission.",
    ],
  },
  {
    question: "Cyber Awareness and Educational Content",
    answer: [
      "The information provided on this website is for educational and awareness purposes only.",
      "HacFy Cyber Chetana is not responsible for the misuse of any cybersecurity techniques or tools discussed on the platform.",
    ],
  },
  {
    question: " Third-Party Links",
    answer: [
      "Our website may contain links to third-party websites for reference.",
      "We do not endorse or take responsibility for the content or policies of these external sites.",
    ],
  },
  {
    question: " Limitation of Liability",
    answer: [
      "We strive to provide accurate and up-to-date information, but we do not guarantee its completeness or accuracy.",
      "HacFy Cyber Chetana is not liable for any direct or indirect damages arising from the use of our website or services.",
    ],
  },
  {
    question: "Changes to Terms",
    answer: [
      "We may update these Terms & Conditions from time to time.",
      "Continued use of the website after any changes means you accept the updated terms.",
    ],
  },
 
];

export default function UserTerms() {
  return (
    <div className="flex flex-col items-start min-h-screen p-6 container">
      {/* Centered Heading */}
      <div className="w-full text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold mt-30" style={{ color: "var(--primary-blue)" }}>User Terms & Conditions</h1>
      </div>

      {/* Content aligned to the left */}
      <div className="max-w-8xl">
        {review.map((item, index) => (
          <div key={index} className="mb-6">
            <h2 className="text-2xl font-semibold mb-2" style={{ color: "var(--primary-orange)" }}>{item.question}</h2>
            {/* Check if answer is an array */}
            {Array.isArray(item.answer) ? (
              <ul className="list-disc pl-6 text-lg text-gray-700" style={{ color: "var(--primary-blue)" }}>
                {item.answer.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            ) : (
              <p className="text-lg text-gray-700">{item.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
