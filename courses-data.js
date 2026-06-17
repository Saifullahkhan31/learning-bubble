// Learning Bubble - Shared Course Data
const coursesData = [
    // Literature, History & Storytelling
    { id: 1, name: "The World of Sherlock Holmes", category: "Literature, History & Storytelling", fee: 10000, startingFee: 10000, duration: "5 sessions | 2 months", ages: "12–16", about: "Step into the world of mystery, logic, and deduction through one of literature’s most iconic detectives. In this course, students read and explore Sherlock Holmes cases, analyze clues, discuss suspects, and work together to solve mysteries. Through guided discussions and problem-solving activities, learners develop sharp observation skills, logical reasoning, and attention to detail—learning to see the world through Sherlock Holmes’ analytical lens.", pricingOptions: null },
    { id: 2, name: "History Mystery", category: "Literature, History & Storytelling", fee: 6000, startingFee: 6000, duration: "6 sessions | 1.5 months", ages: "12–16", about: "History comes alive through storytelling, investigation, and inquiry. This course takes students on a journey through ancient civilizations, major historical events, and lesser-known stories that shaped the modern world. Rather than memorizing dates, students explore why things happened, how societies evolved, and how the past continues to influence the present—developing historical thinking and curiosity.", pricingOptions: null },
    { id: 3, name: "Tales and Telling", category: "Literature, History & Storytelling", fee: 10000, startingFee: 10000, duration: "8 sessions | 2 months", ages: "8–14", about: "Students learn the art of storytelling through classic and contemporary stories. The course focuses on understanding plot, character, and sequence, while teaching students how to summarize stories without losing key details. Learners also practice oral storytelling, helping them express ideas clearly, confidently, and creatively.", pricingOptions: null },

    // Technology & Coding
    { id: 4, name: "Artificial Intelligence for Kids", category: "Technology & Coding", fee: 18000, startingFee: 18000, duration: "10 sessions | 2 months", ages: "12–16", about: "This course introduces students to artificial intelligence in a clear, age-appropriate, and responsible way. Learners explore how AI is used in everyday life, how AI tools work, and how to interact with them safely and ethically. Students will experiment with creating simple AI bots, understand data basics, and learn how to use AI as a tool for learning, creativity, and problem-solving—while also understanding online safety and digital responsibility.", pricingOptions: null },
    { id: 5, name: "Fun with Coding", category: "Technology & Coding", fee: 8000, startingFee: 8000, duration: "6 sessions | 2 months", ages: "10–16", about: "A playful and beginner-friendly introduction to coding using Small Basic. Students learn fundamental programming concepts through drawing, painting, animations, and simple games. This course builds logical thinking, creativity, and confidence with technology—perfect for young learners taking their first steps into the world of coding.", pricingOptions: null },
    { id: 6, name: "Learn Python", category: "Technology & Coding", fee: 8000, startingFee: 8000, duration: "6 sessions | 2 months", ages: "", about: "Designed for students ready to move beyond basic coding, this course introduces Python from the ground up. Learners explore programming fundamentals while gradually working with data organization, basic data analysis, and simple visualizations using tools like pandas and matplotlib. The course focuses on building a strong foundation that prepares students for advanced coding, data handling, and future tech learning.", pricingOptions: null },
    { id: 7, name: "Graphic Designing using Canva & Illustrator", category: "Technology & Coding", fee: 5000, startingFee: 5000, duration: "6 sessions | 2 months", ages: "10–16", about: "An introduction to digital design for young creators. Students learn design basics such as layout, color, and typography while working with Canva and Illustrator. The course emphasizes creativity, visual communication, and practical design skills through hands-on projects.", pricingOptions: null },
    { id: 8, name: "MS Office for Kids", category: "Technology & Coding", fee: 8000, startingFee: 8000, duration: "8 sessions | 2 months", ages: "10–16", about: "This practical course introduces students to essential digital tools including Microsoft Word, PowerPoint, and Excel. Learners gain hands-on experience creating documents, presentations, and simple spreadsheets while understanding the real-world purpose and correct use of each tool—building essential skills for school and beyond.", pricingOptions: null },

    // Creative Writing & Literature Development
    { id: 9, name: "Poet's Corner", category: "Creative Writing & Literature Development", fee: 8000, startingFee: 8000, duration: "8 sessions | 2 months", ages: "10–14", about: "A creative space for young poets to discover the beauty of words. Students explore poetry from the past and present, learn how to read and recite poems with confidence, and are introduced to poetic devices and basic writing techniques. Through guided practice, students begin crafting their own poems while developing expression, rhythm, and voice.", pricingOptions: null },
    { id: 10, name: "Poet's Corner", category: "Creative Writing & Literature Development", fee: 16000, startingFee: 16000, duration: "10 sessions | 3 months", ages: "15–20", about: "Designed for teens and young adults with prior exposure to poetry, this advanced course is led by a writer/poet who guides participants through the creative process of drafting, refining, and polishing their own poems. Students receive constructive feedback, explore advanced techniques, and develop a deeper personal poetic voice in a supportive, workshop-style environment.", pricingOptions: null },
    { id: 11, name: "Creative Writing", category: "Creative Writing & Literature Development", fee: 8000, startingFee: 8000, duration: "8 sessions | 2 months", ages: "8–10", about: "A beginner-friendly course that sparks imagination and builds confidence in writing. Students explore short stories, descriptive writing, and simple narratives through fun prompts and activities, developing a love for writing while strengthening language skills.", pricingOptions: null },
    { id: 12, name: "Creative Writing", category: "Creative Writing & Literature Development", fee: 10000, startingFee: 10000, duration: "8 sessions | 2 months", ages: "11–14", about: "This course focuses on developing stronger storytelling skills. Students learn about plot structure, character development, dialogue, and descriptive language, while experimenting with different writing styles and genres.", pricingOptions: null },
    { id: 13, name: "Creative Writing", category: "Creative Writing & Literature Development", fee: 10000, startingFee: 10000, duration: "8 sessions | 2 months", ages: "15–18", about: "An advanced creative writing course for teens ready to refine their voice. Students explore personal style, advanced narrative techniques, and multi-genre writing while receiving guided feedback to improve clarity, depth, and expression.", pricingOptions: null },
    { id: 14, name: "Vocabulary Quest", category: "Creative Writing & Literature Development", fee: 10000, startingFee: 10000, duration: "10 sessions (40 minutes each)", ages: "14–18", about: "A dynamic course designed to strengthen vocabulary, comprehension, and expression. Students learn advanced and context-based words through games, challenges, and real-life usage, helping them speak and write with clarity and confidence.", pricingOptions: null },

    // Arts & Creativity
    { id: 15, name: "Art Rebels", category: "Arts & Creativity", fee: 8000, startingFee: 8000, duration: "6 sessions | 2 months", ages: "12–18", about: "A bold and expressive art course for young creatives. Each session introduces a new art style or technique—sketching, painting, mixed media, and experimental art—without heavy theory. Students are encouraged to explore, experiment, and express themselves freely, building confidence and creative independence.", pricingOptions: null },
    { id: 16, name: "Bubbles and Beakers Club (Science)", category: "Arts & Creativity", fee: 6000, startingFee: 6000, duration: "6 sessions | 2 months", ages: "10–16", about: "A hands-on science course designed to spark curiosity and wonder. Students perform safe, exciting experiments at home using everyday materials, learning scientific concepts through observation and exploration. The course encourages questioning, experimentation, and critical thinking while helping students connect science to the world around them.", pricingOptions: null },

    // Math, Logic & Skills
    { id: 17, name: "Math Magic!", category: "Math, Logic & Skills", fee: 6000, startingFee: 6000, duration: "6 sessions | 2 months", ages: "6–10", about: "This course transforms math into an engaging and enjoyable experience. Students learn clever strategies, patterns, and problem-solving techniques that make even complex questions approachable. Through puzzles, challenges, and interactive activities, learners build confidence, speed, and logical thinking—discovering that math can be fun and empowering.", pricingOptions: null },
    { id: 18, name: "Young Entrepreneurs", category: "Math, Logic & Skills", fee: 8000, startingFee: 8000, duration: "6 sessions | 1.5 months", ages: "10–14", about: "Designed for children with big ideas, this course introduces the fundamentals of entrepreneurship in a practical, engaging way. Students learn how to spot opportunities, understand basic business concepts, and develop a product or service idea. With guided support, learners experience the process of making a real sale—gaining confidence, creativity, and real-world problem-solving skills.", pricingOptions: null },
    { id: 19, name: "Financial Literacy", category: "Math, Logic & Skills", fee: 5000, startingFee: 5000, duration: "5 sessions | 1 month", ages: "8–12", about: "Students learn the basics of saving, spending, and understanding money in everyday life. Through activities and a guided simulation, learners make financial decisions using digital in-game money and see the outcomes of their choices—building early financial awareness and responsibility.", pricingOptions: null },
    { id: 20, name: "Financial Literacy", category: "Math, Logic & Skills", fee: 12000, startingFee: 12000, duration: "6 sessions | 2 months", ages: "13–18", about: "An advanced course focused on budgeting, saving, investing, and understanding how money grows. Students participate in a realistic financial simulation where they invest digital funds and track returns based on decision-making, helping them develop long-term financial thinking.", pricingOptions: null },
    { id: 21, name: "Become a Climate Activist – Beginner", category: "Math, Logic & Skills", fee: 12000, startingFee: 12000, duration: "2 months", ages: "8–12", about: "This course introduces students to environmental awareness and responsibility. Learners explore topics such as carbon emissions, pollution, deforestation, wildlife conservation, endangered species, and planet safety. Through books, resources, discussions, and worksheets, students develop knowledge—and the mindset to care for and protect the planet.", pricingOptions: null },
    // { id: 33, name: "Philosophy Playground", category: "Math, Logic & Skills", fee: 10000, startingFee: 10000, duration: "8 sessions | 2 months", ages: "10–14", about: "This course introduces children to philosophy by first teaching them how to think. Students learn to ask meaningful questions, give reasons for their ideas, listen to different viewpoints, and respectfully agree or disagree. Once these thinking skills are established, learners are introduced to great philosophers like Plato, Aristotle, and Descartes through stories, discussions, and real-life examples—making big ideas accessible, engaging, and relevant.", pricingOptions: null },

    // IGCSE ACADEMICS
    {
        id: 22, name: "IGCSE ACADEMICS", category: "IGCSE ACADEMICS", fee: 2500, startingFee: 2500, duration: "Per class / 8–12 sessions per month", ages: "", about: "Focus on concept clarity, past papers, and exam readiness. Subjects: Physics, Biology, Chemistry, Mathematics, English, Islamiat, Pakistan Studies, Accounting, Economics, Business Studies. Group size: 3–5 students.", pricingOptions: [
            { label: "Individual Class", price: 2500, description: "PKR 2,500 per class" },
            { label: "Per Session", price: 1200, description: "Per session for a group of 3-5" },
            { label: "Full 4 month Course", price: 50000, description: "PKR 50,000 for full 4 month course, 3 session per week." }
        ]
    },

    // Test Preparation
    {
        id: 23, name: "IELTS Academic", category: "Test Preparation", fee: 2000, startingFee: 2000, duration: "Per Hour", ages: "", about: "", pricingOptions: [
            { label: "Per Hour", price: 2000, description: "PKR 2000 per hour" },
            { label: "Group of 3-5", price: 1000, description: "PKR 1000 per hour for group of 3-5" },
            // { label: "One Module", price: 30000, description: "PKR 30,000 for one module" },
            // { label: "Four Modules", price: 60000, description: "PKR 60,000 for 4 modules" }
        ]
    },
    {
        id: 24, name: "IELTS General", category: "Test Preparation", fee: 1500, startingFee: 1500, duration: "Per Hour", ages: "", about: "", pricingOptions: [
            { label: "Per Hour", price: 1500, description: "PKR 1500 per hour" },
            { label: "Group of 3-5", price: 1000, description: "PKR 1000 per hour for group of 3-5" },
            // { label: "One Module", price: 25000, description: "PKR 25,000 for 1 module" },
            // { label: "All Modules", price: 75000, description: "PKR 75,000 for all 4 modules" }
        ]
    },
    {
        id: 25, name: "SAT Prep (Group Tuition)", category: "Test Preparation", fee: 50000, startingFee: 2000, duration: "4 months", ages: "",
        about: `Our comprehensive SAT preparation program includes 3 sessions per week for 4 months (approximately 48 sessions) and is designed to help students achieve their target scores through structured instruction and personalized support.

The program includes:

* Expert guidance in both SAT English and Math
* Development of effective test- taking strategies
* Focused work on individual weak areas
* Practice materials and curated online resources
* Regular skill - building exercises and performance tracking
* Ongoing academic support throughout the preparation period`,
        pricingOptions:
            [
                {
                    label: "Per Session", price: 2000, description: "Individual per session class"
                },
                {
                    label: "4 month package", price: 50000, description: "PKR 50,000 for full 4 month course, 3 session per week."
                }
            ]

    },

    // English Language Courses
    { id: 26, name: "English Language – Basic", category: "English Language Courses", fee: 12000, startingFee: 12000, duration: "10 sessions", ages: "", about: "", pricingOptions: null },
    { id: 27, name: "English Language – Intermediate", category: "English Language Courses", fee: 15000, startingFee: 15000, duration: "10 sessions", ages: "", about: "", pricingOptions: null },
    { id: 28, name: "English Language – Advanced", category: "English Language Courses", fee: 12000, startingFee: 12000, duration: "8 sessions", ages: "", about: "", pricingOptions: null },

    // Workshops
    { id: 29, name: "Poetry Writing Workshop (2 days)", category: "Workshops", fee: 3000, startingFee: 3000, duration: "2 days", ages: "", about: "Fee: PKR 3,000 or $12", pricingOptions: null },
    { id: 30, name: "Explore Shakespeare (1 day)", category: "Workshops", fee: 3000, startingFee: 3000, duration: "1 day", ages: "", about: "Fee: PKR 3,000 or $12", pricingOptions: null },
    { id: 31, name: "Creative Writing Workshop (2 days)", category: "Workshops", fee: 3500, startingFee: 3500, duration: "2 days", ages: "", about: "", pricingOptions: null },
    { id: 32, name: "Professional Email Writing (2 days)", category: "Workshops", fee: 5000, startingFee: 5000, duration: "2 days", ages: "", about: "", pricingOptions: null }
];

// Category colors for consistent branding
const categoryColors = {
    "All Categories": "linear-gradient(135deg, #1c2f72 0%, #243a9e 100%)",
    "Literature, History & Storytelling": "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    "Technology & Coding": "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    "Creative Writing & Literature Development": "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    "Arts & Creativity": "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
    "Math, Logic & Skills": "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    "IGCSE ACADEMICS": "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
    "Test Preparation": "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
    "English Language Courses": "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)",
    "Workshops": "linear-gradient(135deg, #ffd89b 0%, #19547b 100%)"
};
