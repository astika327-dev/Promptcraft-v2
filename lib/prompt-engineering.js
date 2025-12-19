/**
 * PromptCraft - Advanced Prompt Engineering System
 * Based on Google Prompt Engineering Best Practices & Top-Tier Frameworks
 * 
 * Frameworks Used:
 * - CO-STAR (Context, Objective, Style, Tone, Audience, Response)
 * - CRISPE (Capacity, Request, Information, Style, Parameters, Examples)
 * - Chain-of-Thought (CoT) Prompting
 * - Few-Shot Learning
 * - Step-Back Prompting
 */

// ============================================================================
// PROMPT CATEGORIES & USE CASES
// ============================================================================

export const PROMPT_CATEGORIES = {
  IMAGE_GENERATION: 'image_generation',
  COPYWRITING: 'copywriting',
  CODE: 'code',
  MARKETING: 'marketing',
  BUSINESS: 'business',
  CREATIVE_WRITING: 'creative_writing',
  EDUCATION: 'education',
  TECHNICAL: 'technical',
  SOCIAL_MEDIA: 'social_media',
  EMAIL: 'email',
  PRODUCT: 'product',
  UI_UX: 'ui_ux',
};

// ============================================================================
// STYLE PRESETS
// ============================================================================

export const STYLE_PRESETS = {
  professional: {
    tone: 'Professional and authoritative',
    style: 'Clear, concise, and business-appropriate',
    characteristics: ['Formal language', 'Data-driven', 'Action-oriented'],
  },
  creative: {
    tone: 'Imaginative and inspiring',
    style: 'Vibrant, expressive, and artistic',
    characteristics: ['Unique perspectives', 'Vivid imagery', 'Emotional resonance'],
  },
  technical: {
    tone: 'Precise and informative',
    style: 'Detailed, systematic, and accurate',
    characteristics: ['Technical accuracy', 'Step-by-step clarity', 'Best practices'],
  },
  casual: {
    tone: 'Friendly and approachable',
    style: 'Conversational and relatable',
    characteristics: ['Easy to understand', 'Engaging', 'Personable'],
  },
  persuasive: {
    tone: 'Compelling and motivating',
    style: 'Action-driven with strong calls to action',
    characteristics: ['Benefit-focused', 'Urgent', 'Trust-building'],
  },
  educational: {
    tone: 'Informative and patient',
    style: 'Clear explanations with examples',
    characteristics: ['Progressive complexity', 'Memorable examples', 'Practical application'],
  },
};

// ============================================================================
// AUDIENCE PROFILES
// ============================================================================

export const AUDIENCE_PROFILES = {
  beginners: 'Absolute beginners with no prior knowledge - explain everything simply',
  intermediate: 'People with some experience who want to deepen their understanding',
  experts: 'Professionals seeking advanced insights and nuanced details',
  general: 'General audience with varied backgrounds and experience levels',
  executives: 'C-level executives focused on strategic impact and ROI',
  developers: 'Software developers seeking technical implementation details',
  designers: 'Creative professionals focused on aesthetics and user experience',
  marketers: 'Marketing professionals focused on engagement and conversion',
};

// ============================================================================
// OUTPUT FORMAT SPECIFICATIONS
// ============================================================================

export const OUTPUT_FORMATS = {
  structured: {
    description: 'Well-organized with clear sections and headers',
    format: 'Use headers, subheaders, and bullet points for clarity',
  },
  narrative: {
    description: 'Flowing prose that tells a story',
    format: 'Write in complete paragraphs with natural transitions',
  },
  list: {
    description: 'Itemized format for easy scanning',
    format: 'Present information as numbered or bulleted lists',
  },
  step_by_step: {
    description: 'Sequential instructions',
    format: 'Number each step clearly, include expected outcomes',
  },
  json: {
    description: 'Machine-readable structured data',
    format: 'Return valid JSON with appropriate keys and values',
  },
  markdown: {
    description: 'Formatted text with markdown syntax',
    format: 'Use markdown formatting for headers, bold, code blocks, etc.',
  },
};

// ============================================================================
// FEW-SHOT EXAMPLES DATABASE
// ============================================================================

export const FEW_SHOT_EXAMPLES = {
  image_generation: [
    {
      input: "a futuristic city",
      output: `Create a breathtaking aerial view of a futuristic megalopolis at twilight. The scene features soaring neo-gothic skyscrapers with holographic facades displaying flowing data streams. Flying vehicles navigate through illuminated traffic lanes between buildings. The architecture blends organic curves with crystalline structures, featuring vertical gardens cascading down tower faces. The color palette emphasizes deep sapphire blues, electric cyan accents, and warm amber lighting from countless windows. Volumetric fog drifts between the lower levels, creating depth and mystery. Ultra-detailed, 8K resolution, cinematic lighting, concept art style, trending on ArtStation.`
    },
    {
      input: "a logo for coffee shop",
      output: `Design a sophisticated artisan coffee shop logo featuring a minimalist coffee cup silhouette integrated with a rising steam pattern that subtly forms a mountain peak. The design uses a rich espresso brown (#3C2415) as the primary color with cream (#F5E6D3) accents. Typography: elegant serif font "Artisan Roast" positioned below the icon. The steam wisps should have a hand-drawn, organic quality suggesting warmth and craftsmanship. Style: modern minimalist with vintage artisan touches. Suitable for signage, packaging, and digital applications. Vector format, scalable, works in both color and monochrome.`
    },
    {
      input: "professional headshot background",
      output: `Generate a premium professional headshot background with a soft-focus corporate aesthetic. Features a subtle gradient from slate gray (#4A4A4A) to charcoal (#2D2D2D) with gentle bokeh light orbs in cool white tones. The background has a slight texture suggesting high-quality fabric or smooth wall surface. Strategic rim lighting from the upper right creates dimensional depth. The overall mood is polished, trustworthy, and executive-level professional. Optimized for LinkedIn, corporate websites, and annual reports. High resolution, clean edges for easy subject compositing.`
    }
  ],
  copywriting: [
    {
      input: "product description for wireless earbuds",
      output: `**Experience Sound Without Boundaries**

Introducing AeroSound Pro – where cutting-edge audio engineering meets seamless everyday life.

🎵 **Immersive Audio Experience**
Advanced 12mm graphene drivers deliver crystal-clear highs, rich mids, and thundering bass that transforms your daily commute into a concert hall experience.

🔇 **Adaptive Noise Cancellation**
Our AI-powered ANC technology analyzes your environment 500 times per second, blocking out 98% of ambient noise while preserving the sounds you need to hear.

⚡ **All-Day Power**
8 hours of playtime on a single charge, with the compact case providing an additional 32 hours – that's a full week without reaching for a charger.

💧 **Life-Proof Design**
IPX5 water resistance means rain, sweat, and unexpected splashes won't skip a beat.

*Free shipping. 30-day money-back guarantee. 2-year warranty.*

**Limited Time: Save 25% with code SOUND25**`
    },
    {
      input: "email subject line for product launch",
      output: `**Primary Options (Curiosity + Urgency):**
1. "🚀 It's finally here: The product you've been waiting for"
2. "First look: [Product Name] is live (Limited availability)"
3. "You're one of the first to see this..."

**FOMO-Driven:**
4. "Early access ends in 24 hours ⏰"
5. "[First Name], your exclusive invite expires tonight"

**Benefit-Focused:**
6. "The solution to [pain point] just launched"
7. "Say goodbye to [problem] forever"

**Personalized:**
8. "[First Name], made this just for you"
9. "Based on your preferences: Something new"

**A/B Testing Recommendation:**
Test curiosity-based (#3) against urgency-based (#4) for optimal open rates.`
    }
  ],
  code: [
    {
      input: "function to validate email",
      output: `/**
 * Advanced Email Validation Function
 * Validates email addresses according to RFC 5322 specifications
 * with additional security and practical checks.
 * 
 * @param {string} email - The email address to validate
 * @param {Object} options - Validation options
 * @param {boolean} options.allowSubdomains - Allow subdomain emails (default: true)
 * @param {boolean} options.checkDNS - Perform DNS lookup (async, default: false)
 * @param {string[]} options.blockedDomains - List of blocked email domains
 * @returns {Object} Validation result with detailed error information
 * 
 * @example
 * const result = validateEmail('user@example.com');
 * // { isValid: true, email: 'user@example.com', normalized: 'user@example.com' }
 * 
 * @example
 * const result = validateEmail('invalid..email@domain');
 * // { isValid: false, error: 'CONSECUTIVE_DOTS', message: 'Email contains consecutive dots' }
 */
function validateEmail(email, options = {}) {
  const {
    allowSubdomains = true,
    checkDNS = false,
    blockedDomains = ['tempmail.com', 'throwaway.com']
  } = options;

  // Validation result object
  const result = {
    isValid: false,
    email: email,
    normalized: null,
    error: null,
    message: null
  };

  // Check for empty or non-string input
  if (!email || typeof email !== 'string') {
    result.error = 'INVALID_INPUT';
    result.message = 'Email must be a non-empty string';
    return result;
  }

  // Normalize and trim
  const normalizedEmail = email.toLowerCase().trim();
  result.normalized = normalizedEmail;

  // Length validation (RFC 5321: max 254 characters)
  if (normalizedEmail.length > 254) {
    result.error = 'TOO_LONG';
    result.message = 'Email exceeds maximum length of 254 characters';
    return result;
  }

  // Enhanced regex pattern based on RFC 5322
  const emailPattern = /^(?![.])(?!.*[.]{2})[a-zA-Z0-9.!#$%&'*+/=?^_\`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  if (!emailPattern.test(normalizedEmail)) {
    result.error = 'INVALID_FORMAT';
    result.message = 'Email format is invalid';
    return result;
  }

  // Extract domain for additional checks
  const [localPart, domain] = normalizedEmail.split('@');

  // Local part length check (max 64 characters)
  if (localPart.length > 64) {
    result.error = 'LOCAL_PART_TOO_LONG';
    result.message = 'Local part exceeds 64 characters';
    return result;
  }

  // Check blocked domains
  if (blockedDomains.some(blocked => domain.endsWith(blocked))) {
    result.error = 'BLOCKED_DOMAIN';
    result.message = 'Email domain is not allowed';
    return result;
  }

  // Check for valid TLD
  const tldPattern = /\\.[a-zA-Z]{2,}$/;
  if (!tldPattern.test(domain)) {
    result.error = 'INVALID_TLD';
    result.message = 'Invalid top-level domain';
    return result;
  }

  result.isValid = true;
  return result;
}

module.exports = { validateEmail };`
    }
  ],
  marketing: [
    {
      input: "social media campaign for fitness app",
      output: `# 30-Day Fitness App Social Media Campaign
## Campaign Theme: "Your Best Self Starts Now"

---

### WEEK 1: AWARENESS & CURIOSITY

**Day 1-2: Teaser Content**
- Platform: Instagram Reels + TikTok
- Content: "What if you could transform in just 15 minutes a day?"
- Hook: Quick montage of real user transformations (with permission)
- CTA: "Follow for the reveal 👀"

**Day 3-4: Problem Agitation**
- Platform: Twitter/X Thread + LinkedIn
- Content: "Why 73% of people quit their fitness journey before day 30..."
- Format: Educational thread with statistics
- CTA: Link to blog post

**Day 5-7: Solution Introduction**
- Platform: All channels
- Content: Official app reveal with feature highlights
- Format: Polished 60-second explainer video
- CTA: "Join the waiting list"

---

### WEEK 2: ENGAGEMENT & SOCIAL PROOF

**User Testimonial Series**
- 3 real users share their 30-day journey
- Before/after + emotional interview clips
- Hashtag: #My15MinuteTransformation

**Influencer Partnership Launch**
- 5 micro-influencers (10-50K followers) in fitness niche
- 7-day challenge documentation
- Authentic, unscripted content

---

### WEEK 3 & 4: CONVERSION FOCUS

**Limited-Time Offer Announcement**
- "Founder's Price" - 50% off first 1000 users
- Countdown timer in stories
- Urgency-driven copy

**Live Q&A Sessions**
- Instagram/Facebook Live with trainers
- Real-time workout demos
- Exclusive discount code for attendees

---

### KPIs & METRICS
- Reach: 500K+ impressions
- Engagement Rate: 5%+
- App Downloads: 10,000+
- Conversion Rate: 3%

### BUDGET ALLOCATION
- Content Production: 40%
- Paid Advertising: 35%
- Influencer Partnerships: 20%
- Tools & Analytics: 5%`
    }
  ]
};

// ============================================================================
// MASTER SYSTEM PROMPT - Google Prompt Engineering Standards
// ============================================================================

export const MASTER_SYSTEM_PROMPT = `You are PromptCraft AI, an elite prompt engineering system designed using Google's Prompt Engineering Best Practices and industry-leading frameworks.
 
 ## YOUR CORE IDENTITY
 You are a world-class prompt engineer with expertise in:
 - Image generation (Midjourney, DALL-E, Stable Diffusion, Flux)
 - Language models (GPT-4, Claude, Gemini, LLaMA)
 - Specialized AI tools (coding assistants, writing tools, marketing AI)
 
 ## YOUR MISSION
 Transform simple user ideas into extraordinarily detailed, professional-grade prompts that maximize AI output quality. You must ensure the final prompt is COMPLETE, never truncated, and adheres to the highest standards of clarity and structure.
 
 ## PROMPT ENGINEERING FRAMEWORKS YOU USE
 
 ### 1. CO-STAR Framework
 For every prompt you create, ensure it includes:
 - **C**ontext: Rich background information
 - **O**bjective: Clear, actionable goal
 - **S**tyle: Specific aesthetic or writing style
 - **T**one: Emotional quality and voice
 - **A**udience: Who the output is for
 - **R**esponse: Desired format and structure
 
 ### 2. Chain-of-Thought Enhancement
 - Break complex requests into logical steps
 - Include reasoning scaffolds when helpful
 - Add "Think step by step" triggers for complex tasks
 
 ### 3. Specificity Maximization
 - Replace vague terms with concrete details
 - Add quantifiable metrics where possible
 - Include sensory details for creative work
 - Avoid fluff; every word must add value
 
 ### 4. Few-Shot Pattern Recognition
 - Analyze the input for implicit patterns
 - Match to proven prompt structures
 - Adapt successful formulas to new contexts
 
 ## OUTPUT QUALITY STANDARDS
 
 Your generated prompts must be:
 1. **Immediately Usable** - Copy-paste ready, no modifications needed.
 2. **Highly Detailed** - 3-5x more detailed than the original input, but not verbose for the sake of length.
 3. **Professionally Structured** - Clear organization and hierarchy (use Markdown).
 4. **Optimized for AI** - Use techniques that AI models respond best to (clear directives, constraint definitions).
 5. **Context-Complete** - Include all necessary information to prevent hallucination or generic outputs.
 6. **Robust** - Handle edge cases and potential misinterpretations.
 
 ## SELF-CORRECTION PROTOCOL (INTERNAL)
 Before outputting the prompt, ask yourself:
 - Is this specific enough?
 - Is there any ambiguity?
 - Did I catch all the user's implicit requirements?
 - Is the structure logical?
 - Is the prompt too long effectively? (If so, condense without losing meaning).
 
 ## PROMPT ENHANCEMENT TECHNIQUES
 
 For IMAGE GENERATION prompts:
 - Include: subject, action, setting, lighting, camera angle, art style, mood, color palette
 - Add technical specs: resolution, aspect ratio, rendering engine references
 - Use quality boosters: "highly detailed", "professional photography", "award-winning"
 
 For TEXT/CONTENT prompts:
 - Define: role, task, constraints, format, examples, evaluation criteria
 - Include: audience, tone, length, structure, style references
 - Add: edge cases to handle, what to avoid, success criteria
 
 For CODE prompts:
 - Specify: language, framework, coding standards, error handling
 - Include: input/output examples, edge cases, performance requirements
 - Add: documentation standards, testing requirements, security considerations
 
 ## RESPONSE FORMAT
 
 Always structure your output as:
 1. The complete, ready-to-use prompt (no explanation needed before it)
 2. Wrap the prompt in appropriate formatting for easy copying
 
 ## CRITICAL RULES
 
 1. NEVER include meta-commentary in the prompt itself (e.g., "Here is your prompt:"). purely the prompt text.
 2. NEVER use phrases like "I want you to..." - write prompts as direct instructions to the AI.
 3. ALWAYS make prompts self-contained and complete.
 4. ALWAYS enhance the original idea significantly.
 5. ALWAYS match the output complexity to the use case.
 6. ENSURE the output is NOT TRUNCATED. If it's getting too long, prioritize essential instructions over decorative descriptions.`;

// ============================================================================
// CATEGORY-SPECIFIC SYSTEM PROMPTS
// ============================================================================

export const CATEGORY_SYSTEM_PROMPTS = {
  [PROMPT_CATEGORIES.IMAGE_GENERATION]: `${MASTER_SYSTEM_PROMPT}

## SPECIALIZED MODE: IMAGE GENERATION

You are now focused on creating prompts for AI image generators (Midjourney, DALL-E, Stable Diffusion, Flux, etc.).

### STRUCTURE FOR IMAGE PROMPTS

[Subject & Action] + [Environment/Setting] + [Artistic Style] + [Lighting & Mood] + [Technical Specifications] + [Quality Boosters]

### ESSENTIAL ELEMENTS TO INCLUDE

1. **Subject Details**
   - Physical characteristics, pose, expression, clothing
   - Materials, textures, colors with specific hex codes when appropriate

2. **Composition & Framing**
   - Camera angle (bird's eye, worm's eye, dutch angle, etc.)
   - Shot type (extreme close-up, medium shot, wide shot, etc.)
   - Focal point and depth of field

3. **Environment & Atmosphere**
   - Time of day, weather, season
   - Background elements and their relationship to subject
   - Environmental storytelling elements

4. **Artistic Direction**
   - Art movement or style reference (Art Nouveau, Cyberpunk, Studio Ghibli, etc.)
   - Artist references when appropriate
   - Medium simulation (oil painting, watercolor, 3D render, photograph)

5. **Technical Specifications**
   - Aspect ratio (16:9, 1:1, 9:16, 4:3)
   - Quality indicators (8K, highly detailed, professional)
   - Rendering style (photorealistic, stylized, minimalist)

6. **Lighting**
   - Light source type and direction
   - Color temperature
   - Shadow characteristics
   - Special lighting effects (rim lighting, volumetric, caustics)

### QUALITY AMPLIFIERS
End prompts with quality boosters like:
- "masterpiece, best quality, highly detailed"
- "trending on ArtStation, award-winning"
- "professional photography, studio lighting"
- "cinematic, dramatic lighting, volumetric fog"`,

  [PROMPT_CATEGORIES.COPYWRITING]: `${MASTER_SYSTEM_PROMPT}

## SPECIALIZED MODE: COPYWRITING

You are now focused on creating prompts for marketing copy, sales content, and persuasive writing.

### COPYWRITING PROMPT STRUCTURE

[Role Definition] + [Audience Profile] + [Content Objective] + [Tone & Voice] + [Format Specifications] + [Conversion Goals] + [Brand Guidelines]

### ESSENTIAL COPYWRITING ELEMENTS

1. **Audience Psychology**
   - Demographics and psychographics
   - Pain points and desires
   - Objections to address
   - Decision-making triggers

2. **Persuasion Framework**
   - AIDA (Attention, Interest, Desire, Action)
   - PAS (Problem, Agitate, Solution)
   - BAB (Before, After, Bridge)

3. **Voice & Tone Specification**
   - Brand personality traits
   - Emotion to evoke
   - Language complexity level
   - Cultural considerations

4. **Format Requirements**
   - Word/character limits
   - Structural elements (headlines, bullets, CTA)
   - Platform-specific optimization

5. **Conversion Mechanics**
   - Primary and secondary CTAs
   - Urgency/scarcity elements
   - Social proof integration
   - Risk reversal messaging`,

  [PROMPT_CATEGORIES.CODE]: `${MASTER_SYSTEM_PROMPT}

## SPECIALIZED MODE: CODE GENERATION

You are now focused on creating prompts for code generation, technical documentation, and software development.

### CODE PROMPT STRUCTURE

[Technology Stack] + [Functional Requirements] + [Input/Output Specs] + [Edge Cases] + [Performance Requirements] + [Code Quality Standards] + [Documentation Needs]

### ESSENTIAL CODE ELEMENTS

1. **Technical Specifications**
   - Programming language and version
   - Frameworks and libraries
   - Runtime environment
   - Dependencies and constraints

2. **Functional Requirements**
   - Core functionality description
   - Input parameters with types
   - Expected output format
   - Error handling requirements

3. **Quality Standards**
   - Code style guide compliance
   - Documentation format (JSDoc, docstrings, etc.)
   - Testing requirements
   - Security considerations

4. **Examples**
   - Sample inputs and expected outputs
   - Edge cases to handle
   - Error scenarios

5. **Performance**
   - Time/space complexity targets
   - Scalability requirements
   - Optimization priorities`,

  [PROMPT_CATEGORIES.MARKETING]: `${MASTER_SYSTEM_PROMPT}

## SPECIALIZED MODE: MARKETING STRATEGY

You are now focused on creating prompts for marketing campaigns, strategies, and promotional content.

### MARKETING PROMPT STRUCTURE

[Business Context] + [Campaign Objectives] + [Target Audience] + [Channel Strategy] + [Content Requirements] + [KPIs & Metrics] + [Budget Considerations]

### ESSENTIAL MARKETING ELEMENTS

1. **Strategic Foundation**
   - Business goals and marketing objectives
   - Competitive landscape
   - Unique value proposition
   - Market positioning

2. **Audience Intelligence**
   - Detailed buyer personas
   - Customer journey stage
   - Psychographic insights
   - Behavioral patterns

3. **Channel Strategy**
   - Platform selection and rationale
   - Content format per channel
   - Posting frequency and timing
   - Cross-channel integration

4. **Content Specifications**
   - Content types and formats
   - Messaging hierarchy
   - Visual guidelines
   - Hashtag and keyword strategy

5. **Measurement Framework**
   - Primary KPIs
   - Tracking methodology
   - A/B testing plans
   - Success benchmarks`,

  [PROMPT_CATEGORIES.CREATIVE_WRITING]: `${MASTER_SYSTEM_PROMPT}

## SPECIALIZED MODE: CREATIVE WRITING

You are now focused on creating prompts for fiction, storytelling, and creative content.

### CREATIVE WRITING PROMPT STRUCTURE

[Genre & Tone] + [Setting Details] + [Character Profiles] + [Plot Elements] + [Narrative Voice] + [Thematic Elements] + [Style References]

### ESSENTIAL CREATIVE ELEMENTS

1. **World Building**
   - Setting (time, place, culture)
   - Rules and limitations
   - Sensory atmosphere
   - Historical/contextual background

2. **Character Development**
   - Protagonist goals and motivations
   - Character flaws and growth arc
   - Relationships and dynamics
   - Voice and dialogue style

3. **Narrative Structure**
   - Plot type (hero's journey, mystery, romance, etc.)
   - Pacing requirements
   - Tension and conflict elements
   - Resolution expectations

4. **Style Specifications**
   - POV (first person, third limited, omniscient)
   - Tense (past, present)
   - Literary devices to employ
   - Author style references`,
};

// ============================================================================
// PROMPT GENERATION FUNCTIONS
// ============================================================================

/**
 * Detects the category of the user's input
 * @param {string} input - User's raw input
 * @returns {string} - Detected category
 */
export function detectCategory(input) {
  const inputLower = input.toLowerCase();
  
  const categoryKeywords = {
    [PROMPT_CATEGORIES.IMAGE_GENERATION]: [
      'logo', 'image', 'picture', 'visual', 'design', 'illustration', 
      'artwork', 'photo', 'render', 'portrait', 'landscape', 'icon',
      'banner', 'poster', 'thumbnail', 'avatar', 'background', 'wallpaper',
      'midjourney', 'dall-e', 'stable diffusion', 'generate image'
    ],
    [PROMPT_CATEGORIES.COPYWRITING]: [
      'copy', 'headline', 'tagline', 'slogan', 'description', 'product description',
      'sales', 'ad copy', 'advertisement', 'landing page', 'conversion'
    ],
    [PROMPT_CATEGORIES.CODE]: [
      'code', 'function', 'api', 'script', 'program', 'algorithm',
      'javascript', 'python', 'react', 'database', 'backend', 'frontend',
      'component', 'class', 'method', 'debug', 'implement'
    ],
    [PROMPT_CATEGORIES.MARKETING]: [
      'marketing', 'campaign', 'strategy', 'social media', 'promotion',
      'brand', 'audience', 'engagement', 'growth', 'analytics', 'influencer'
    ],
    [PROMPT_CATEGORIES.EMAIL]: [
      'email', 'newsletter', 'outreach', 'cold email', 'follow-up',
      'subject line', 'email sequence', 'drip campaign'
    ],
    [PROMPT_CATEGORIES.SOCIAL_MEDIA]: [
      'instagram', 'twitter', 'tiktok', 'linkedin', 'facebook',
      'post', 'caption', 'reel', 'story', 'thread', 'viral'
    ],
    [PROMPT_CATEGORIES.BUSINESS]: [
      'business', 'proposal', 'pitch', 'presentation', 'report',
      'analysis', 'plan', 'strategy', 'executive', 'meeting'
    ],
    [PROMPT_CATEGORIES.EDUCATION]: [
      'explain', 'teach', 'lesson', 'tutorial', 'course', 'learn',
      'education', 'student', 'curriculum', 'training'
    ],
    [PROMPT_CATEGORIES.TECHNICAL]: [
      'technical', 'documentation', 'specification', 'architecture',
      'system', 'infrastructure', 'devops', 'deployment'
    ],
    [PROMPT_CATEGORIES.CREATIVE_WRITING]: [
      'story', 'fiction', 'novel', 'poem', 'narrative', 'character',
      'dialogue', 'scene', 'plot', 'screenplay', 'script writing'
    ],
    [PROMPT_CATEGORIES.PRODUCT]: [
      'product', 'feature', 'user story', 'requirements', 'roadmap',
      'sprint', 'backlog', 'mvp', 'prototype'
    ],
    [PROMPT_CATEGORIES.UI_UX]: [
      'ui', 'ux', 'interface', 'user experience', 'wireframe',
      'mockup', 'prototype', 'usability', 'accessibility'
    ]
  };

  let maxScore = 0;
  let detectedCategory = PROMPT_CATEGORIES.IMAGE_GENERATION; // default

  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    const score = keywords.reduce((acc, keyword) => {
      return acc + (inputLower.includes(keyword) ? 1 : 0);
    }, 0);
    
    if (score > maxScore) {
      maxScore = score;
      detectedCategory = category;
    }
  }

  return detectedCategory;
}

/**
 * Gets relevant few-shot examples for the detected category
 * @param {string} category - Detected category
 * @returns {Array} - Few-shot examples
 */
export function getFewShotExamples(category) {
  const examples = FEW_SHOT_EXAMPLES[category];
  if (examples && examples.length > 0) {
    // Return up to 2 most relevant examples
    return examples.slice(0, 2);
  }
  return FEW_SHOT_EXAMPLES.image_generation.slice(0, 2); // Default fallback
}

/**
 * Builds the complete system prompt with context
 * @param {string} category - Detected category
 * @returns {string} - Complete system prompt
 */
export function buildSystemPrompt(category) {
  return CATEGORY_SYSTEM_PROMPTS[category] || MASTER_SYSTEM_PROMPT;
}

/**
 * Constructs few-shot examples for the API call
 * @param {string} category - Detected category
 * @returns {Array} - Message array with few-shot examples
 */
export function buildFewShotMessages(category) {
  const examples = getFewShotExamples(category);
  const messages = [];
  
  for (const example of examples) {
    messages.push({
      role: 'user',
      content: example.input
    });
    messages.push({
      role: 'assistant', 
      content: example.output
    });
  }
  
  return messages;
}

/**
 * Main function to generate the complete prompt engineering message array
 * @param {string} userInput - User's raw input
 * @param {Object} options - Additional options
 * @returns {Object} - Complete message array and metadata
 */
export function generatePromptEngineering(userInput, options = {}) {
  const {
    style = 'professional',
    audience = 'general',
    outputFormat = 'structured',
    includeExamples = true,
    forceCategory = null
  } = options;

  // Detect or use forced category
  const category = forceCategory || detectCategory(userInput);
  
  // Build system prompt
  const systemPrompt = buildSystemPrompt(category);
  
  // Build messages array
  const messages = [
    { role: 'system', content: systemPrompt }
  ];
  
  // Add few-shot examples if enabled
  if (includeExamples) {
    const fewShotMessages = buildFewShotMessages(category);
    messages.push(...fewShotMessages);
  }
  
  // Build enhanced user prompt with context
  const enhancedUserPrompt = buildEnhancedUserPrompt(userInput, {
    style,
    audience,
    outputFormat,
    category
  });
  
  messages.push({ role: 'user', content: enhancedUserPrompt });
  
  return {
    messages,
    metadata: {
      detectedCategory: category,
      style,
      audience,
      outputFormat,
      timestamp: new Date().toISOString()
    }
  };
}

/**
 * Builds an enhanced user prompt with additional context
 * @param {string} input - Original user input
 * @param {Object} context - Additional context
 * @returns {string} - Enhanced prompt
 */
function buildEnhancedUserPrompt(input, context) {
  const { style, audience, outputFormat, category } = context;
  
  const styleInfo = STYLE_PRESETS[style] || STYLE_PRESETS.professional;
  const audienceInfo = AUDIENCE_PROFILES[audience] || AUDIENCE_PROFILES.general;
  const formatInfo = OUTPUT_FORMATS[outputFormat] || OUTPUT_FORMATS.structured;
  
  return `Create a professional, ready-to-use prompt for the following idea:

**User's Idea:** ${input}

**Context:**
- Category: ${category}
- Style: ${styleInfo.tone} - ${styleInfo.style}
- Target Audience: ${audienceInfo}
- Output Format: ${formatInfo.description}

**Requirements:**
1. The prompt must be immediately usable without any modifications
2. Enhance the original idea with specific, professional details
3. Include all necessary context and specifications
4. Make it significantly more detailed than the original input
5. Follow best practices for the detected category

Generate the complete, optimized prompt now:`;
}

export default {
  PROMPT_CATEGORIES,
  STYLE_PRESETS,
  AUDIENCE_PROFILES,
  OUTPUT_FORMATS,
  FEW_SHOT_EXAMPLES,
  MASTER_SYSTEM_PROMPT,
  CATEGORY_SYSTEM_PROMPTS,
  detectCategory,
  getFewShotExamples,
  buildSystemPrompt,
  buildFewShotMessages,
  generatePromptEngineering
};
