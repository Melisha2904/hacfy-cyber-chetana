import { trackQuestion } from '@/lib/chat-store';
import { NextResponse } from 'next/server';

// Allow streaming responses up to 60 seconds
export const maxDuration = 60;

// ─── Inbuilt Knowledge Base ───
const KNOWLEDGE_BASE: Array<{ keywords: string[]; answer: string }> = [
  {
    keywords: ["phishing", "what is phishing"],
    answer: "🎣 **Phishing** is a cyber attack where criminals disguise themselves as trusted entities (banks, companies) to steal your personal info. They send fake emails or links to trick you into giving away passwords or OTPs.\n\n**How to stay safe:**\n• Never click suspicious links in emails or SMS.\n• Always verify the sender's email address carefully.\n• Go directly to the official website instead of clicking links.\n• Enable 2-Factor Authentication (2FA) on all accounts.",
  },
  {
    keywords: ["upi", "secure upi", "upi fraud", "payment fraud", "gpay", "google pay", "phonepe"],
    answer: "💳 **UPI Safety Tips:**\n\n• **Never share your UPI PIN** with anyone, not even bank officials.\n• Receiving money does NOT require you to enter your PIN.\n• Always verify the recipient's name before sending.\n• Use UPI app locks (fingerprint/PIN).\n• Immediately report fraudulent transactions at cybercrime.gov.in or call 1930.",
  },
  {
    keywords: ["social media", "social media safety", "facebook", "instagram", "online safety", "whatsapp"],
    answer: "📱 **Social Media Safety Tips:**\n\n• Set your profile to **Private**.\n• Don't accept requests from unknown people.\n• Enable **Two-Factor Authentication (2FA)** on all platforms.\n• Never share your location, phone number, or address publicly.\n• Be careful of fake profiles — verify before trusting.",
  },
  {
    keywords: ["cyber chetana", "what is cyber chetana", "hacfy", "about us", "about hacfy", "who are you"],
    answer: "🛡️ **HacFy Cyber Chetana** is an initiative to spread cybersecurity awareness across India.\n\n**Our Focus Areas:**\n• Cybercrime Awareness for communities\n• Women's Digital Safety\n• Youth Empowerment in cybersecurity\n• Building a Secure Digital Society\n\n**Our Mission:** Empower every citizen with the knowledge and tools to stay safe in the digital world.\n\n🔗 Visit our About page: /about",
  },
  {
    keywords: ["terms", "terms and conditions", "terms of service", "rules"],
    answer: "📋 **HacFy Cyber Chetana - Terms & Conditions:**\n\n• You must use the website for **lawful purposes only**.\n• All content (text, logos, graphics) is the **property of HacFy Cyber Chetana**.\n• Educational content is for **awareness purposes only**. We are not responsible for misuse.\n• We may update terms from time to time — continued use means you accept the updates.\n• Third-party links are for reference only; we don't endorse their content.\n\n🔗 Read full Terms: /terms",
  },
  {
    keywords: ["privacy", "privacy policy", "data", "personal information"],
    answer: "🔒 **Privacy Policy:**\n\nHacFy Cyber Chetana takes your privacy seriously.\n• We only collect information **necessary to provide our services** (e.g., name and email when you take the Cyber Safety Pledge).\n• We do **not** sell or share your data with third parties.\n• Certificate data is used only to generate and deliver your pledge certificate.\n\n🔗 Read full Policy: /terms",
  },
  {
    keywords: ["contact", "reach", "email", "helpline", "support", "call"],
    answer: "📞 **Contact HacFy Cyber Chetana:**\n\nYou can reach us for:\n• Cybersecurity **workshops and training**\n• **Penetration testing** services\n• General **awareness queries**\n\n🚨 **Cybercrime Helpline (India):** 1930\n🌐 **Report Online:** https://cybercrime.gov.in",
  },
  {
    keywords: ["cyberbullying", "bully", "harassment", "online harassment", "trolling"],
    answer: "⚠️ **Cyberbullying:**\n\nCyberbullying involves using digital platforms to harass, threaten, or humiliate someone.\n\n**What to do:**\n• **Document** everything — take screenshots.\n• **Block** the harasser immediately.\n• **Report** to the platform (Instagram, WhatsApp, etc.).\n• File a complaint at https://cybercrime.gov.in or call 1930.\n• Talk to a trusted adult if you're under 18.",
  },
  {
    keywords: ["password", "strong password", "password safety"],
    answer: "🔑 **Password Safety Tips:**\n\n• Use at least **12 characters** with a mix of letters, numbers & symbols.\n• Never reuse the same password across sites.\n• Use a **password manager** (like Bitwarden or 1Password).\n• Enable **Two-Factor Authentication (2FA)** wherever possible.\n• Never share your passwords with anyone.",
  },
  {
    keywords: ["ransomware", "malware", "virus", "hack", "trojan"],
    answer: "🦠 **Malware & Ransomware:**\n\nRansomware is malicious software that encrypts your files and demands payment to restore them.\n\n**Prevention:**\n• Keep your OS and software **updated**.\n• Don't download files from untrusted sources.\n• Use a reputable **antivirus** program.\n• Regularly **back up** your important data to an external drive or cloud.\n• Be cautious of email attachments from unknown senders.",
  },
  {
    keywords: ["tour", "navigation", "where is", "how to find", "help me find", "guide", "menu"],
    answer: "🗺️ **Website Tour & Navigation:**\n\n• **Home Page:** Overview of all our initiatives and awareness topics.\n• **Cyber Safety Pledge:** Scroll to the bottom of the home page or click 'Pledge' in the menu.\n• **Awareness Topics:** Found in the cards section on the home page — click any topic for details.\n• **About Us:** Click 'About' in the navigation bar.\n• **Crimes Database:** Click 'Crimes' in the navigation bar.\n• **Blog:** Click 'Blog' in the navigation bar.\n• **Terms & Privacy:** Links are available in the footer.\n• **AI Chatbot:** That's me! I'm always here in the bottom right corner. 😊",
  },
  {
    keywords: ["source", "official link", "where to report", "government", "complaint", "report crime", "fir"],
    answer: "🔗 **Official Resources & Helplines:**\n\n• **National Cybercrime Reporting Portal:** https://cybercrime.gov.in\n• **Cybercrime Helpline:** Call **1930** (Available 24/7 in India)\n• **RBI (For Banking Frauds):** https://cms.rbi.org.in\n• **Sanchar Saathi (SIM/Mobile Safety):** https://sancharsaathi.gov.in\n• **CERT-In (Security Alerts):** https://www.cert-in.org.in\n• **National Commission for Women:** https://ncw.nic.in",
  },
  {
    keywords: ["vpn", "virtual private network"],
    answer: "🔐 **VPN (Virtual Private Network):**\n\nA VPN encrypts your internet connection and hides your IP address.\n\n**When to use a VPN:**\n• When connected to public Wi-Fi (cafes, airports).\n• To protect sensitive browsing data.\n• To prevent ISP tracking.\n\n**Tips:**\n• Use a reputable paid VPN (Mullvad, ProtonVPN).\n• Avoid free VPNs — they often sell your data.",
  },
  {
    keywords: ["two factor", "2fa", "mfa", "multi factor", "otp safety"],
    answer: "🔐 **Two-Factor Authentication (2FA):**\n\n2FA adds an extra layer of security beyond your password.\n\n**How to enable:**\n• Go to your account's Security settings.\n• Enable 2FA using an authenticator app (Google Authenticator, Authy).\n• **Avoid SMS-based 2FA** if possible — SIM-swap attacks can bypass it.\n• Always save your backup/recovery codes in a safe place.",
  },
  {
    keywords: ["hello", "hi", "hey", "hii", "hiii", "good morning", "good evening", "namaste"],
    answer: "👋 **Hello! Welcome to HacFy Cyber Chetana!**\n\nI'm your AI-powered cybersecurity assistant. I can help you with:\n\n🛡️ Cybersecurity tips & awareness\n📱 Social media & UPI safety\n🗺️ Navigating our website\n📞 Official helplines & resources\n\nWhat would you like to know about today?",
  },
  {
    keywords: ["scam", "fraud", "online scam", "fake call", "lottery", "job fraud"],
    answer: "🚫 **Online Scams & Fraud:**\n\nScams are deceptive schemes to steal your money or personal info.\n\n**Common scams in India:**\n• **Fake job offers** asking for upfront fees.\n• **Lottery/prize scams** — you never entered any contest!\n• **Fake customer care numbers** on Google.\n• **Digital Arrest** — scammers pose as police/CBI over video call.\n• **Parcel delivery scams** asking for payments.\n\n**What to do if scammed:**\n• Call **1930** immediately (Cybercrime Helpline).\n• File an FIR at https://cybercrime.gov.in\n• Do NOT pay any ransom.\n\n📖 **Learn more:** https://cybercrime.gov.in/Webpages/Awarness.aspx",
  },
  {
    keywords: ["identity theft", "aadhar", "aadhaar", "pan card", "stolen identity"],
    answer: "🆔 **Identity Theft:**\n\nIdentity theft occurs when someone uses your personal information (Aadhaar, PAN, bank details) without your consent.\n\n**Prevention:**\n• Never share Aadhaar/PAN over phone or email.\n• Use UIDAI's Aadhaar Lock feature: https://uidai.gov.in\n• Regularly check your bank and credit card statements.\n• Use masked Aadhaar (Virtual ID) when sharing.\n\n📖 **Report:** https://cybercrime.gov.in",
  },
  {
    keywords: ["wifi", "wi-fi", "router", "home network", "network security"],
    answer: "📶 **Wi-Fi & Network Security:**\n\n• Change your router's **default password** immediately.\n• Use **WPA3** or WPA2 encryption (avoid WEP).\n• Hide your SSID (network name) from broadcasting.\n• Create a separate **guest network** for visitors.\n• Keep your router's **firmware updated**.\n• Avoid conducting sensitive transactions on public Wi-Fi.\n\n📖 **Learn more:** https://www.cert-in.org.in",
  },
  {
    keywords: ["digital arrest", "fake police", "fake cbi", "video call threat"],
    answer: "🚨 **Digital Arrest Scam:**\n\nThis is a growing scam where fraudsters impersonate police, CBI, or customs officers via video call and threaten arrest.\n\n**Key facts:**\n• **No law enforcement agency conducts arrests via video call.**\n• They create fear to extort money.\n• They may show fake IDs and letterheads.\n\n**What to do:**\n• Immediately **disconnect** the call.\n• Do NOT transfer any money.\n• Report at https://cybercrime.gov.in or call **1930**.\n• Share awareness — tell your family and friends!\n\n📖 **Article:** https://cybercrime.gov.in/Webpages/Awarness.aspx",
  },
];

function findLocalAnswer(userMessage: string): string | null {
  const lower = userMessage.toLowerCase().trim();
  for (const entry of KNOWLEDGE_BASE) {
    if (entry.keywords.some((kw) => lower.includes(kw))) {
      return entry.answer;
    }
  }
  return null;
}

// ─── Hugging Face Direct API Call ───
async function callHuggingFace(userMessage: string, conversationHistory: Array<{role: string; content: string}>): Promise<string> {
  const apiKey = process.env.HUGGINGFACE_API_KEY;
  if (!apiKey) throw new Error("No API key");

  const systemPrompt = `You are a dedicated cybersecurity assistant for HacFy Cyber Chetana, a platform for cybersecurity awareness in India. 
RULES:
1. Only answer cybersecurity, digital safety, and HacFy-related questions.
2. If irrelevant questions are asked (cooking, sports, movies, etc.), politely decline.
3. Provide official Indian helpline 1930 and cybercrime.gov.in when relevant.
4. Keep answers concise, professional, and under 200 words.
5. For website navigation: Pledge is at home page bottom, About in navbar, Terms in footer.`;

  // Build conversation for the model
  const formattedMessages = conversationHistory.slice(-6).map(m => 
    m.role === "user" ? `[INST] ${m.content} [/INST]` : m.content
  ).join("\n");

  const prompt = `<s>[INST] ${systemPrompt} [/INST] I understand. I am the HacFy Cyber Chetana cybersecurity assistant.</s>\n${formattedMessages}${formattedMessages.endsWith("[/INST]") ? "" : `\n[INST] ${userMessage} [/INST]`}`;

  // Try multiple models in order of preference
  const models = [
    "mistralai/Mistral-7B-Instruct-v0.3",
    "mistralai/Mistral-7B-Instruct-v0.1",
    "HuggingFaceH4/zephyr-7b-beta",
    "google/gemma-1.1-7b-it",
  ];

  for (const model of models) {
    try {
      const response = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            max_new_tokens: 400,
            temperature: 0.7,
            return_full_text: false,
          },
        }),
      });

      if (!response.ok) {
        console.log(`Model ${model} returned ${response.status}, trying next...`);
        continue;
      }

      const data = await response.json();
      
      if (Array.isArray(data) && data[0]?.generated_text) {
        let text = data[0].generated_text.trim();
        // Clean up any leftover instruction tags
        text = text.replace(/\[INST\].*?\[\/INST\]/gs, "").trim();
        text = text.replace(/<\/?s>/g, "").trim();
        if (text.length > 10) {
          console.log(`✅ Hugging Face responded via model: ${model}`);
          return text;
        }
      }
      
      console.log(`Model ${model}: empty or invalid response, trying next...`);
    } catch (err) {
      console.log(`Model ${model} error:`, err);
      continue;
    }
  }

  throw new Error("All models failed");
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const lastMessage = messages[messages.length - 1]?.content || "";

    // Track this question in real-time
    trackQuestion(lastMessage);

    // ─── Tier 0: Nonsense Filter (only pure keyboard mash or single chars) ───
    const cleaned = lastMessage.replace(/\s/g, '');
    const isKeyboardMash = /^[asdfghjkl]+$/i.test(cleaned) || /^[qwertyuiop]+$/i.test(cleaned) || /^[zxcvbnm]+$/i.test(cleaned);
    const isRepeatedChar = /^(.)\1{4,}$/.test(cleaned);
    if ((isKeyboardMash && cleaned.length < 6) || isRepeatedChar || (cleaned.length > 0 && cleaned.length < 2)) {
      return NextResponse.json({
        reply: "I'm sorry, I didn't quite understand that. 🤔\n\nPlease ask a question related to **cybersecurity** or **HacFy services**!\n\nYou can try:\n• What is Phishing?\n• How to secure UPI?\n• Navigate the website"
      });
    }

    // ─── Tier 1: Instant local response ───
    const localAnswer = findLocalAnswer(lastMessage);
    if (localAnswer) {
      console.log("✅ Serving from local knowledge base.");
      return NextResponse.json({ reply: localAnswer });
    }

    // ─── Tier 2: Hugging Face AI ───
    try {
      const aiReply = await callHuggingFace(lastMessage, messages);
      console.log("✅ Hugging Face AI responded.");
      return NextResponse.json({ reply: aiReply, source: "huggingface" });
    } catch (aiError) {
      console.error("⚠️ Hugging Face API failed:", aiError);
      // Smart fallback with relevant external articles
      const lower = lastMessage.toLowerCase();
      let articles = "";
      if (lower.includes("scam") || lower.includes("fraud")) {
        articles = "\n\n📖 **Related Articles:**\n• https://cybercrime.gov.in/Webpages/Awarness.aspx\n• https://www.cert-in.org.in";
      } else if (lower.includes("hack") || lower.includes("breach") || lower.includes("attack")) {
        articles = "\n\n📖 **Related Articles:**\n• https://www.cert-in.org.in\n• https://www.nciipc.gov.in";
      } else if (lower.includes("bank") || lower.includes("money") || lower.includes("payment")) {
        articles = "\n\n📖 **Related Articles:**\n• https://cms.rbi.org.in (RBI Complaint)\n• https://cybercrime.gov.in (Report Fraud)";
      } else if (lower.includes("child") || lower.includes("kid") || lower.includes("minor")) {
        articles = "\n\n📖 **Related Articles:**\n• https://ncpcr.gov.in (Child Safety)\n• https://cybercrime.gov.in";
      } else if (lower.includes("women") || lower.includes("woman") || lower.includes("girl")) {
        articles = "\n\n📖 **Related Articles:**\n• https://ncw.nic.in (Women's Commission)\n• https://cybercrime.gov.in";
      } else {
        articles = "\n\n📖 **Related Resources:**\n• https://cybercrime.gov.in\n• https://www.cert-in.org.in\n• https://sancharsaathi.gov.in";
      }
      
      return NextResponse.json({
        reply: `I don't have a detailed answer for "${lastMessage}" in my knowledge base right now, but here are some helpful resources:\n\n🚨 **Cybercrime Helpline:** Call **1930** (24/7)\n🌐 **Report Online:** https://cybercrime.gov.in${articles}\n\n💡 You can also try asking me about: Phishing, Scams, UPI Safety, Passwords, Social Media Safety, or Website Navigation!`,
        source: "fallback",
      });
    }
  } catch (error) {
    console.error("Chat route error:", error);
    return NextResponse.json({ reply: "Something went wrong. Please try again." }, { status: 500 });
  }
}
