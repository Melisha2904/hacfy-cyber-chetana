const review = [
  {
    question: "Introduction",
    answer: [
      "HacFy Cyber Chetana values your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data.",
    ],
  },
  {
    question: "Information We Collect",
    answer: [
      "Personal Information: When you contact us or subscribe to our updates, we may collect your name, email address, and phone number.",
      "Usage Data: We may collect non-personal data such as browser type, IP address, and website interactions to improve our services.",
    ],
  },
  {
    question: "How We Use Your Information",
    answer: [
      "To provide cyber awareness and educational content.",
      "To improve our website's functionality and user experience.",
      "To communicate with you regarding updates, events, and cybersecurity tips.",
      "To prevent fraud, abuse, or unauthorized access to our website.",
    ],
  },
  {
    question: "Data Security",
    answer: [
      "We implement security measures to protect your information from unauthorized access, disclosure, or alteration.",
      "However, no method of data transmission over the internet is 100% secure, and we cannot guarantee absolute security.",
    ],
  },
  {
    question: "Third-Party Links",
    answer: [
      "We do not sell or share your personal information with third parties without your consent, except when required by law.",
      "We may use third-party analytics tools to monitor website traffic and improve user experience.",
    ],
  },
  {
    question: "Cookies Policy",
    answer: [
      "Our website may use cookies to enhance your browsing experience.",
      "You can disable cookies in your browser settings, but some features of the website may not function properly.",
    ],
  },
  {
    question: "Children's Privacy",
    answer: [
      "Our website is not intended for children under 13 years of age.",
      "We do not knowingly collect personal information from children.",
    ],
  },
  {
    question: "Changes to Privacy Policy",
    answer: [
      "We may update this Privacy Policy periodically. Any changes will be posted on this page.",
    ],
  },
];

export default function PrivacyPolicy() {
  return (
    <div className="flex flex-col items-start min-h-screen p-6 container mx-auto">
      {/* Centered Heading */}
      <div className="w-full text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold mt-12 text-primary-blue">Privacy Policy</h1>
      </div>

      {/* Content aligned to the left */}
      <div className="max-w-7xl mx-auto">
        {review.map((item, index) => (
          <div key={index} className="mb-6">
            <h2 className="text-2xl font-semibold mb-2 text-primary-orange">{item.question}</h2>
            <ul className="list-disc pl-6 text-lg text-gray-700 text-primary-blue">
              {item.answer.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
