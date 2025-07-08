
# ⚡ Online Code Editor

A powerful, responsive, and AI-ready **Online Code Editor** built with [Next.js App Router](https://nextjs.org/docs/app), [Monaco Editor](https://microsoft.github.io/monaco-editor/), and [Judge0 API](https://judge0.com/) to support multiple programming languages. Perfect for interview prep, coding practice, and real-time execution.

> 💡 _"A degree ≠ a job" — Practice, Learn, and Build Skills that Matter._

---

## 🚀 Features

- ✅ **Live Code Execution** with Judge0 API
- 🎯 **Multiple Language Support** (JavaScript, Python, Java, C++, etc.)
- 🧠 **Smart UI**: Tabbed interface for editor, input, and output
- 🌙 **Theme Toggle**: Dark, Light & High Contrast
- 🔠 **Custom Font Size**
- 📥 Code Input (stdin)
- 📤 Upload / Download / Copy Code (UI ready)
- 📱 Fully Responsive (Desktop & Mobile views)
- 🔒 API Key is protected via Next.js API routes

---

## 🖼️ Screenshots

### Desktop View  
![Desktop Editor View](https://github.com/1900690105/Code_Editor/blob/main/public/desktop.png)

### Mobile View  
![Mobile View](https://github.com/1900690105/Code_Editor/blob/main/public/mobile.jpeg)

---

## 🛠️ Tech Stack

| Tech         | Description                           |
|--------------|---------------------------------------|
| `Next.js`    | App Router, API Routes for security   |
| `Monaco Editor` | Best-in-class VSCode-like code editor |
| `Judge0 API` | Compile & run code in multiple languages |
| `Tailwind CSS` | Modern utility-first CSS framework   |
| `Lucide React` | Beautiful icons for UI               |

---

## 📁 Project Structure

/src
├── app
│ └── code-editor
│ └── page.js # Main Editor Component
├── components
│ └── Editor.js # Monaco Editor integration
├── api
│ └── judge0
│ ├── index.js # POST to create submission
│ ├── result.js # GET result from token
│ └── languages.js # Fetch list of languages
---

## 🧪 Local Setup

```bash
# 1. Clone the repo
git clone https://github.com/your-username/online-code-editor.git

# 2. Install dependencies
cd online-code-editor
npm install

# 3. Add environment variables
touch .env.local
````

```env
# .env.local
RAPID_API_KEY=your_judge0_rapidapi_key
```

```bash
# 4. Run the app
npm run dev
```

---

## 🔐 Environment Variables

| Variable        | Description                        |
| --------------- | ---------------------------------- |
| `RAPID_API_KEY` | Your RapidAPI key for Judge0 usage |

---

## ⚠️ Error Handling

* ✅ Missing code/language → User prompt
* ❌ Invalid API key → Error message
* 🚫 Daily limit exceeded → Friendly rate limit message

---

## 💡 Inspiration

This project is inspired by the need for a **practical, skill-based learning tool**. Whether you're preparing for coding interviews or practicing DSA, this tool helps you test and run your code instantly.

> *"Because your skill should speak louder than your degree."* 👨‍💻

---

## 📜 License

MIT © [Your Name](https://your-portfolio-link.com)

---

## 🙌 Acknowledgements

* [Judge0 API](https://judge0.com/)
* [Monaco Editor](https://microsoft.github.io/monaco-editor/)
* [Next.js](https://nextjs.org/)
* [Lucide Icons](https://lucide.dev/)

---

## 🌐 Live Demo (Optional)

Visit Here: [https://nikhilkandhare.vercel.app/code-editor](https://nikhilkandhare.vercel.app/code-editor)

---

## 👨‍💻 Developed By

[Nikhil V Kandhare](https://nikhilkandhare.vercel.app/)
*#A degree ≠ a job*

---

```

Let me know if:
- You want it in a downloadable `.md` file
- You want badges, GitHub actions, or live demo integration
- You’d like to turn this into a public GitHub repository template

Would you like me to generate the folder structure or logo too?
```
