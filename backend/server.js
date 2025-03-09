const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv"); // Ensure dotenv is imported
const { ChatGroq } = require("@langchain/groq");
const { LLMChain } = require("langchain/chains");
const { PromptTemplate } = require("@langchain/core/prompts");
const { BufferMemory } = require("langchain/memory");
const connectDB = require("./config/db");
const schemeRoutes = require("./routes/schemeRoutes");
const userRoutes = require("./routes/userRoutes");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"], // Allow multiple origins
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.json());

// Load schemes data from JSON file
const schemesFilePath = path.join(__dirname, "schemes.json");
let schemesData = [];

try {
  if (fs.existsSync(schemesFilePath)) {
    const rawData = fs.readFileSync(schemesFilePath, "utf-8");
    schemesData = JSON.parse(rawData);
    console.log("✅ Schemes data loaded successfully.");
  } else {
    console.warn("⚠️ Warning: schemes.json not found.");
  }
} catch (error) {
  console.error("❌ Error loading schemes.json:", error.message);
}

// Initialize LangChain Groq model
const model = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY,
  model: "mixtral-8x7b-32768",
  temperature: 0.3, // Reduced for stable and precise responses
});

// Memory for chatbot history
const memory = new BufferMemory({
  returnMessages: true,
  memoryKey: "chat_history",
  inputKey: "query",
});

// Function to filter & format schemes
const formatSchemes = (userQuery) => {
  let filteredSchemes = schemesData;

  // Try to filter schemes by location if mentioned
  const locationMatch = userQuery.match(
    /\b(Punjab|Karnataka|Tamil Nadu|Kerala|Rajasthan)\b/i
  );
  if (locationMatch) {
    filteredSchemes = schemesData.filter((scheme) =>
      scheme.eligibility?.location
        ?.toLowerCase()
        .includes(locationMatch[0].toLowerCase())
    );
  }

  // Limit to 5 schemes to avoid exceeding token limits
  filteredSchemes = filteredSchemes.slice(0, 5);

  console.log(`✅ Sending ${filteredSchemes.length} schemes to AI`);

  return filteredSchemes
    .map((scheme) => {
      const eligibility = scheme.eligibility || {}; // Ensure eligibility exists

      return `
          <div class="scheme">
            <h3>${scheme.schemeName}</h3>
            <p><strong>Description:</strong> ${scheme.description.substring(
              0,
              150
            )}...</p>
            <p><strong>Category:</strong> ${
              scheme.category || "Not specified"
            }</p>
            <p><strong>Eligibility:</strong></p>
            <ul>
              <li><strong>Age Group:</strong> ${
                eligibility.ageGroup || "Not specified"
              }</li>
              <li><strong>Gender:</strong> ${eligibility.gender || "Any"}</li>
              <li><strong>Location:</strong> ${
                eligibility.location || "Nationwide"
              }</li>
              <li><strong>Occupation:</strong> ${
                eligibility.occupation || "Any"
              }</li>
              <li><strong>Income Slab:</strong> ${
                eligibility.incomeSlab || "Not specified"
              }</li>
            </ul>
            <p><strong>Benefits:</strong> ${
              scheme.benefits || "Not specified"
            }</p>
          </div>
        `;
    })
    .join("");
};

// Chatbot prompt template
const prompt = new PromptTemplate({
  template: `
  You are an AI assistant providing details about government schemes.
  
  **Available Schemes (Context):**  
  {context}
  
  **User Query:** {query}  
  
  **Response Rules:**
  - Provide clear and concise answers.
  - Use Markdown formatting (e.g., **bold**, *italic*, lists).
  
  Example Response Format:
  ## Scheme Name: Agriculture Boost Scheme
  - **Description:** Provides subsidized seeds and fertilizers for farmers in Punjab.
  - **Category:** Agriculture
  - **Eligibility:**
    - Age Group: 25-55
    - Gender: Any
    - Location: Punjab
    - Occupation: Farmer
    - Income Slab: Low-income households
  - **Benefits:** Subsidized seeds and fertilizers.
`,
  inputVariables: ["query", "context"],
});


const chain = new LLMChain({ llm: model, prompt, memory });
// Function to remove HTML tags
const stripHtmlTags = (html) => {
  return html.replace(/<\/?[^>]+(>|$)/g, ""); // Regex to remove all HTML tags
};

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "A valid message is required." });
    }

    console.log(`📩 Received message: "${message}"`);

    if (!schemesData || schemesData.length === 0) {
      return res.json({ response: "No schemes are available at the moment." });
    }

    const schemesString = formatSchemes(message);

    let responseText;
    try {
      const response = await chain.call({
        query: message,
        context: schemesString,
      });

      // Get the raw text from the response and strip HTML tags
      responseText =
        stripHtmlTags(response?.text?.trim() || response?.output?.trim()) ||
        "I'm sorry, I couldn't find relevant information.";
    } catch (error) {
      console.error("❌ AI Model Error:", error.message);
      responseText =
        "I'm sorry, I couldn't process your request due to a system limitation.";
    }

    console.log("🤖 AI Response (cleaned):", responseText);
    res.json({ response: responseText });
  } catch (error) {
    console.error("❌ Chatbot Error:", error.message);
    res.status(500).json({ error: "Internal Server Error. Please try again." });
  }
});

// API endpoint to fetch all schemes
app.use("/api/schemes", schemeRoutes);

// API endpoint for user-related routes
app.use("/api/users", userRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
