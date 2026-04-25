// Singleton store for real-time question tracking
export const questionTracker: Map<string, number> = new Map();

// Seed initial data so it's not empty on first load
if (questionTracker.size === 0) {
  questionTracker.set("What is Phishing?", 15);
  questionTracker.set("UPI Security", 12);
  questionTracker.set("Social Media Safety", 10);
  questionTracker.set("About Cyber Chetana", 8);
  questionTracker.set("Scams & Fraud", 5);
}

export function trackQuestion(userMessage: string) {
  const lower = userMessage.toLowerCase();
  let topic = "Other Questions";

  if (lower.includes("phishing")) topic = "What is Phishing?";
  else if (lower.includes("upi") || lower.includes("payment")) topic = "UPI Security";
  else if (lower.includes("social media") || lower.includes("instagram") || lower.includes("facebook")) topic = "Social Media Safety";
  else if (lower.includes("scam") || lower.includes("fraud")) topic = "Scams & Fraud";
  else if (lower.includes("identity") || lower.includes("aadhar") || lower.includes("aadhaar")) topic = "Identity Theft";
  else if (lower.includes("password")) topic = "Password Safety";
  else if (lower.includes("malware") || lower.includes("ransomware") || lower.includes("virus")) topic = "Malware & Ransomware";
  else if (lower.includes("cyber chetana") || lower.includes("hacfy")) topic = "About Cyber Chetana";
  else if (lower.includes("cyberbullying") || lower.includes("harassment")) topic = "Cyberbullying";
  else if (lower.includes("terms") || lower.includes("privacy") || lower.includes("policy")) topic = "Terms & Privacy";
  else if (lower.includes("contact") || lower.includes("helpline")) topic = "Contact & Helpline";
  else topic = userMessage.length > 40 ? userMessage.substring(0, 40) + "..." : userMessage;

  questionTracker.set(topic, (questionTracker.get(topic) || 0) + 1);
}
