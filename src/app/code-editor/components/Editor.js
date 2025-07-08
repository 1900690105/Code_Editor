"use client";

import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import {
  Play,
  Settings,
  Terminal,
  Code,
  ChevronDown,
  Copy,
  Download,
  Upload,
  Menu,
  X,
  Maximize2,
  Minimize2,
} from "lucide-react";
import Link from "next/link";

export default function CodeEditorPage() {
  const [code, setCode] = useState("// Write your code here");
  const [output, setOutput] = useState("");
  const [stdin, setStdin] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [theme, setTheme] = useState("vs-dark");
  const [fontSize, setFontSize] = useState(14);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeTab, setActiveTab] = useState("editor");

  const [languageList, setLanguageList] = useState([]);
  const [languageId, setLanguageId] = useState(null);
  const [languageName, setLanguageName] = useState("plaintext");

  // Fetch languages from Judge0 - ORIGINAL API CALL
  useEffect(() => {
    const fetchLanguages = async () => {
      const res = await fetch("/api/judge0/languages");
      const langs = await res.json();
      setLanguageList(langs);

      const defaultLang = langs.find((l) =>
        l.name.toLowerCase().includes("javascript")
      );
      if (defaultLang) {
        setLanguageId(defaultLang.id);
        setLanguageName("javascript");
      }
    };

    fetchLanguages();
  }, []);

  // ORIGINAL API CALL LOGIC - NO CHANGES
  const handleRun = async () => {
    if (!languageId || !code) {
      setOutput("⚠️ Please select a language and write some code.");
      return;
    }

    setLoading(true);
    setOutput("⏳ Running...");

    try {
      const submission = await fetch("/api/judge0", {
        method: "POST",
        body: JSON.stringify({
          source_code: code,
          language_id: languageId,
          stdin,
        }),
      });

      const { token } = await submission.json();

      setTimeout(async () => {
        const result = await fetch("/api/judge0/result", {
          method: "POST",
          body: JSON.stringify({ token }),
        });

        const data = await result.json();

        const out =
          data.stdout || data.stderr || data.compile_output || "⚠️ No output.";
        setOutput(out);
        setLoading(false);
      }, 2000);
    } catch (err) {
      console.error(err);
      setOutput("❌ Error running code.");
      setLoading(false);
    }
  };

  const handleLanguageChange = (e) => {
    const id = parseInt(e.target.value);
    setLanguageId(id);

    const selected = languageList.find((lang) => lang.id === id);
    const langName = selected?.name?.toLowerCase();

    if (langName.includes("python")) setLanguageName("python");
    else if (langName.includes("javascript")) setLanguageName("javascript");
    else if (langName.includes("c++")) setLanguageName("cpp");
    else if (langName.includes("java")) setLanguageName("java");
    else if (langName.includes("c")) setLanguageName("c");
    else setLanguageName("plaintext");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Header */}
      <div className="border-b border-gray-700 bg-gray-800/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Code className="w-3 h-3 sm:w-5 sm:h-5 text-white" />
              </div>
              <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                <span className="hidden sm:inline">Online Code Editor</span>
                <span className="sm:hidden">CodeEditor</span>
              </h1>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              {/* Desktop Actions */}
              <div className="hidden sm:flex items-center gap-2">
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
                >
                  <Settings className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors">
                  <Upload className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors">
                  <Download className="w-4 h-4" />
                </button>
              </div>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="sm:hidden p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="w-4 h-4" />
                ) : (
                  <Menu className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="sm:hidden mt-4 pt-4 border-t border-gray-700">
              <div className="flex flex-wrap gap-2 mb-4">
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors text-sm"
                >
                  <Settings className="w-4 h-4" />
                  Settings
                </button>
                <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors text-sm">
                  <Upload className="w-4 h-4" />
                  Upload
                </button>
                <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors text-sm">
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Tab Navigation */}
      <div className="sm:hidden bg-gray-800/50 border-b border-gray-700 sticky top-[73px] z-40">
        <div className="flex">
          <button
            onClick={() => setActiveTab("editor")}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === "editor"
                ? "bg-blue-600 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Editor
          </button>
          <button
            onClick={() => setActiveTab("input")}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === "input"
                ? "bg-blue-600 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Input
          </button>
          <button
            onClick={() => setActiveTab("output")}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === "output"
                ? "bg-blue-600 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Output
          </button>
        </div>
      </div>

      <div className="px-4 sm:px-6 py-4 sm:py-6">
        {/* Desktop Layout */}
        <div className="hidden sm:grid sm:grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-140px)]">
          {/* Main Editor Panel */}
          <div className="lg:col-span-2 space-y-4">
            {/* Language Selector and Controls */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700 gap-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
                <div className="relative w-full sm:w-auto">
                  <select
                    className="w-full sm:w-auto appearance-none bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 pr-10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={languageId || ""}
                    onChange={handleLanguageChange}
                  >
                    {languageList.map((lang) => (
                      <option
                        key={lang.id}
                        value={lang.id}
                        className="bg-gray-800"
                      >
                        {lang.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Ready</span>
                </div>
              </div>

              <button
                onClick={handleRun}
                disabled={loading}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <Play className="w-4 h-4" />
                {loading ? "Running..." : "Run Code"}
              </button>
            </div>

            {/* Code Editor */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 overflow-hidden flex-1">
              <div className="bg-gray-800 px-4 py-2 border-b border-gray-700 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-sm text-gray-400 ml-2">
                    main.
                    {languageName === "javascript"
                      ? "js"
                      : languageName === "python"
                      ? "py"
                      : languageName === "cpp"
                      ? "cpp"
                      : languageName === "java"
                      ? "java"
                      : "txt"}
                  </span>
                </div>
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="p-1 rounded text-gray-400 hover:text-white transition-colors"
                >
                  {isFullscreen ? (
                    <Minimize2 className="w-4 h-4" />
                  ) : (
                    <Maximize2 className="w-4 h-4" />
                  )}
                </button>
              </div>

              <div
                className={`${
                  isFullscreen ? "h-[calc(100vh-200px)]" : "h-96"
                } transition-all duration-300`}
              >
                <Editor
                  height="100%"
                  theme={theme}
                  language={languageName}
                  value={code}
                  onChange={(val) => setCode(val || "")}
                  options={{
                    fontSize: fontSize,
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    wordWrap: "on",
                    lineNumbers: "on",
                    folding: true,
                    renderLineHighlight: "all",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Side Panel */}
          <div className="space-y-4">
            {/* Input Panel */}
            {/* Settings Panel */}
            {showSettings ? (
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 p-4">
                <h3 className="font-medium text-gray-200 mb-3">
                  Editor Settings
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">
                      Theme
                    </label>
                    <select
                      value={theme}
                      onChange={(e) => setTheme(e.target.value)}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="vs-dark">Dark</option>
                      <option value="light">Light</option>
                      <option value="hc-black">High Contrast</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">
                      Font Size
                    </label>
                    <input
                      type="range"
                      min="12"
                      max="20"
                      value={fontSize}
                      onChange={(e) => setFontSize(parseInt(e.target.value))}
                      className="w-full accent-blue-500"
                    />
                    <span className="text-xs text-gray-400">{fontSize}px</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Terminal className="w-4 h-4 text-blue-400" />
                  <h3 className="font-medium text-gray-200">Standard Input</h3>
                </div>
                <textarea
                  className="w-full h-24 bg-gray-700 border border-gray-600 rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-sm"
                  rows="3"
                  value={stdin}
                  onChange={(e) => setStdin(e.target.value)}
                  placeholder="Optional input for the code"
                />
              </div>
            )}

            {/* Output Panel */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 p-4 flex-1">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-green-400" />
                  <h3 className="font-medium text-gray-200">Output</h3>
                </div>
                <button className="p-1 rounded text-gray-400 hover:text-white transition-colors">
                  <Copy className="w-4 h-4" />
                </button>
              </div>

              <div className="bg-gray-900 rounded-lg p-4 h-64 overflow-auto">
                <pre className="text-sm font-mono text-gray-100 whitespace-pre-wrap break-words">
                  {output || "Output will appear here..."}
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="sm:hidden">
          {/* Mobile Controls */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700 mb-4">
            <div className="space-y-4">
              <div className="flex flex-col gap-3">
                <div className="relative">
                  <select
                    className="w-full appearance-none bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 pr-10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={languageId || ""}
                    onChange={handleLanguageChange}
                  >
                    {languageList.map((lang) => (
                      <option
                        key={lang.id}
                        value={lang.id}
                        className="bg-gray-800"
                      >
                        {lang.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>

                <button
                  onClick={handleRun}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Play className="w-4 h-4" />
                  {loading ? "Running..." : "Run Code"}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Tabbed Content */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 overflow-hidden">
            {/* Editor Tab */}
            {activeTab === "editor" && (
              <div className="h-[60vh]">
                <Editor
                  height="100%"
                  theme={theme}
                  language={languageName}
                  value={code}
                  onChange={(val) => setCode(val || "")}
                  options={{
                    fontSize: Math.max(fontSize - 2, 12),
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    wordWrap: "on",
                    lineNumbers: "on",
                    folding: false,
                    renderLineHighlight: "all",
                    glyphMargin: false,
                    lineDecorationsWidth: 0,
                    lineNumbersMinChars: 3,
                  }}
                />
              </div>
            )}

            {/* Input Tab */}
            {activeTab === "input" && (
              <div className="p-4 h-[60vh]">
                <div className="flex items-center gap-2 mb-3">
                  <Terminal className="w-4 h-4 text-blue-400" />
                  <h3 className="font-medium text-gray-200">Standard Input</h3>
                </div>
                <textarea
                  className="w-full h-[calc(100%-2rem)] bg-gray-700 border border-gray-600 rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-sm"
                  value={stdin}
                  onChange={(e) => setStdin(e.target.value)}
                  placeholder="Optional input for the code"
                />
              </div>
            )}

            {/* Output Tab */}
            {activeTab === "output" && (
              <div className="p-4 h-[60vh]">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-green-400" />
                    <h3 className="font-medium text-gray-200">Output</h3>
                  </div>
                  <button className="p-1 rounded text-gray-400 hover:text-white transition-colors">
                    <Copy className="w-4 h-4" />
                  </button>
                </div>

                <div className="bg-gray-900 rounded-lg p-4 h-[calc(100%-2rem)] overflow-auto">
                  <pre className="text-sm font-mono text-gray-100 whitespace-pre-wrap break-words">
                    {output || "Output will appear here..."}
                  </pre>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Settings */}
          {showSettings && (
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 p-4 mt-4">
              <h3 className="font-medium text-gray-200 mb-3">
                Editor Settings
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Theme
                  </label>
                  <select
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="vs-dark">Dark</option>
                    <option value="light">Light</option>
                    <option value="hc-black">High Contrast</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Font Size
                  </label>
                  <input
                    type="range"
                    min="12"
                    max="20"
                    value={fontSize}
                    onChange={(e) => setFontSize(parseInt(e.target.value))}
                    className="w-full accent-blue-500"
                  />
                  <span className="text-xs text-gray-400">{fontSize}px</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <footer>
        <div className="text-center ">
          <p>
            Develop by{" "}
            <Link
              title="click here to know about developer"
              href={"https://nikhilkandhare.vercel.app/"}
            >
              <u> @Nikhil V Kandhare</u>
            </Link>
          </p>
          <p>to show Love towards Coding #A degree ≠ a job</p>
        </div>
      </footer>
    </div>
  );
}
