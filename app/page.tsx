"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  ExternalLink,
  Rocket,
  Trophy,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Download,
  ArrowRight,
  ChevronDown,
  Gamepad2,
  Sparkles,
  Code,
  Brain,
  Shield,
  Database,
  Globe,
  Bot,
  Briefcase,
  Calendar,
  MapPin,
  Award,
} from "lucide-react"

// Simplified Matrix Rain Effect
function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      if (canvas) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }
    }

    resizeCanvas()

    const matrix = "MOHANBALU0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const matrixArray = matrix.split("")
    const fontSize = 10
    const columns = canvas.width / fontSize
    const drops: number[] = []

    for (let x = 0; x < columns; x++) {
      drops[x] = 1
    }

    function draw() {
      if (!ctx || !canvas) return

      ctx.fillStyle = "rgba(0, 0, 0, 0.04)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = "#0F0"
      ctx.font = fontSize + "px monospace"

      for (let i = 0; i < drops.length; i++) {
        const text = matrixArray[Math.floor(Math.random() * matrixArray.length)]
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    const interval = setInterval(draw, 35)

    const handleResize = () => resizeCanvas()
    window.addEventListener("resize", handleResize)

    return () => {
      clearInterval(interval)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none opacity-10 z-0" />
}

// Typing Animation Component
function TypingAnimation({ texts, className }: { texts: string[]; className?: string }) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        const fullText = texts[currentTextIndex]

        if (isDeleting) {
          setCurrentText(fullText.substring(0, currentText.length - 1))
        } else {
          setCurrentText(fullText.substring(0, currentText.length + 1))
        }

        if (!isDeleting && currentText === fullText) {
          setTimeout(() => setIsDeleting(true), 1000)
        } else if (isDeleting && currentText === "") {
          setIsDeleting(false)
          setCurrentTextIndex((prev) => (prev + 1) % texts.length)
        }
      },
      isDeleting ? 50 : 100,
    )

    return () => clearTimeout(timeout)
  }, [currentText, isDeleting, currentTextIndex, texts])

  return (
    <span className={className}>
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  )
}

// Game-like Achievement System
function AchievementSystem({ onAchievementUnlock }: { onAchievementUnlock: (id: string) => void }) {
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([])
  const [showAchievement, setShowAchievement] = useState<{ title: string; description: string } | null>(null)

  const achievements = [
    { id: "visitor", title: "Digital Explorer", description: "Welcome to my digital realm!", icon: "👋" },
    { id: "launcher", title: "Experience Launcher", description: "Launched the portfolio experience", icon: "🚀" },
    { id: "experience_viewer", title: "Experience Inspector", description: "Explored my work experience", icon: "💼" },
    { id: "project_viewer", title: "Project Inspector", description: "Explored my project showcase", icon: "🔍" },
    { id: "skill_master", title: "Skill Analyzer", description: "Viewed all technical skills", icon: "🎯" },
    { id: "contact_seeker", title: "Connection Initiator", description: "Found the contact portal", icon: "📞" },
    { id: "resume_hunter", title: "Resume Collector", description: "Downloaded the resume", icon: "📄" },
    { id: "github_visitor", title: "Code Explorer", description: "Visited GitHub profile", icon: "💻" },
    { id: "linkedin_connector", title: "Network Builder", description: "Connected on LinkedIn", icon: "🤝" },
  ]

  const unlockAchievement = (id: string) => {
    if (!unlockedAchievements.includes(id)) {
      setUnlockedAchievements((prev) => [...prev, id])
      const achievement = achievements.find((a) => a.id === id)
      if (achievement) {
        setShowAchievement({ title: achievement.title, description: achievement.description })
        setTimeout(() => setShowAchievement(null), 4000)
        onAchievementUnlock(id)
      }
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      unlockAchievement("visitor")
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  // Expose unlockAchievement function globally
  useEffect(() => {
    ;(window as any).unlockAchievement = unlockAchievement
  }, [])

  return (
    <>
      <AnimatePresence>
        {showAchievement && (
          <motion.div
            initial={{ opacity: 0, y: -100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -100, scale: 0.8 }}
            className="fixed top-4 right-4 z-50 bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-4 rounded-lg shadow-2xl border-2 border-yellow-300"
          >
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-2 rounded-full">
                <Trophy className="h-6 w-6" />
              </div>
              <div>
                <p className="font-bold text-lg">🎉 Achievement Unlocked!</p>
                <p className="text-sm font-semibold">{showAchievement.title}</p>
                <p className="text-xs opacity-90">{showAchievement.description}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-4 left-4 z-40">
        <Card className="bg-black/90 text-white border-yellow-400 border-2">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Gamepad2 className="h-5 w-5 text-yellow-400" />
              <span className="text-sm font-bold">Achievement Progress</span>
            </div>
            <div className="text-sm mb-2">
              <span className="text-yellow-400 font-bold">{unlockedAchievements.length}</span>
              <span className="text-gray-300">/{achievements.length} unlocked</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full transition-all duration-1000 relative overflow-hidden"
                style={{ width: `${(unlockedAchievements.length / achievements.length) * 100}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse" />
              </div>
            </div>
            <div className="text-xs text-gray-400 mt-1">
              {unlockedAchievements.length === achievements.length ? "🏆 Master Achieved!" : "Keep exploring..."}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

// Animated Skill Icons
function AnimatedSkillIcon({ icon: Icon, color, delay }: { icon: any; color: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, rotate: -180 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.2, rotate: 360 }}
      className={`p-4 rounded-full ${color} shadow-lg cursor-pointer`}
    >
      <Icon className="h-8 w-8 text-white" />
    </motion.div>
  )
}

// Section Observer Hook
function useSectionObserver(sectionId: string, onEnter: () => void) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { threshold: 0.3, once: true })

  useEffect(() => {
    if (isInView) {
      onEnter()
    }
  }, [isInView, onEnter])

  return ref
}

// Main Portfolio Component
export default function RevolutionaryPortfolio() {
  const [currentSection, setCurrentSection] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [mounted, setMounted] = useState(false)
  const [experienceLaunched, setExperienceLaunched] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const sections = [
    "Digital Craftsman",
    "Experience",
    "Code Arsenal",
    "Design Portfolio",
    "Project Showcase",
    "Contact Portal",
  ]

  // Achievement handlers
  const handleSkillsView = () => {
    ;(window as any).unlockAchievement?.("skill_master")
  }

  const handleProjectsView = () => {
    ;(window as any).unlockAchievement?.("project_viewer")
  }

  const handleExperienceView = () => {
    ;(window as any).unlockAchievement?.("experience_viewer")
  }

  const handleContactView = () => {
    ;(window as any).unlockAchievement?.("contact_seeker")
  }

  // Section refs with observers
  const experienceRef = useSectionObserver("experience", handleExperienceView)
  const skillsRef = useSectionObserver("skills", handleSkillsView)
  const projectsRef = useSectionObserver("projects", handleProjectsView)
  const contactRef = useSectionObserver("contact", handleContactView)

  // Work Experience Data
  const workExperience = [
    {
      title: "Full Stack Developer Intern",
      company: "Edubot",
      period: "Mar 2024 - Apr 2024",
      location: "Remote",
      description:
        "Developed advanced email scanning system and disaster preparedness platform, demonstrating expertise in Java development and system architecture.",
      achievements: [
        "Built Advanced Email Scanning System in Java with 99% malicious content detection rate",
        "Led Disaster Preparedness Platform project improving emergency response times by 30%",
        "Implemented security protocols and threat detection algorithms",
        "Collaborated with cross-functional teams on critical infrastructure projects",
        "Optimized system performance and reduced false positive rates",
      ],
      technologies: ["Java", "Spring Boot", "Security Frameworks", "System Architecture", "Database Design"],
      type: "internship",
    },
    {
      title: "Java Developer Intern",
      company: "Eduskills Foundation",
      period: "Oct 2024 - Dec 2024",
      location: "Remote",
      description:
        "Gained comprehensive hands-on experience in Java development while demonstrating exceptional problem-solving abilities and collaborative teamwork skills.",
      achievements: [
        "Developed multiple Java applications following industry best practices",
        "Participated in code reviews and maintained high code quality standards",
        "Enhanced problem-solving skills through complex programming challenges",
        "Demonstrated strong teamwork and communication in collaborative environments",
        "Contributed to documentation and knowledge sharing initiatives",
      ],
      technologies: [
        "Java",
        "Object-Oriented Programming",
        "Software Development",
        "Team Collaboration",
        "Code Review",
      ],
      type: "internship",
    },
  ]

  // Education Data
  const education = {
    degree: "Bachelor's Degree in Computer Science Engineering",
    university: "SRM University AP",
    period: "2022 - 2026",
    gpa: "8.4/10.0",
    location: "Andhra Pradesh, India",
    coursework: [
      "Data Structures & Algorithms",
      "Database Management Systems",
      "Software Engineering",
      "Machine Learning",
      "Computer Networks",
      "Cybersecurity Fundamentals",
    ],
  }

  // Certifications Data
  const certifications = [
    {
      name: "The Joy of Computing using Python",
      issuer: "NPTEL",
      year: "2024",
      type: "Programming",
      description: "Comprehensive Python programming course covering fundamentals to advanced concepts",
    },
    {
      name: "Hands on IoT Workshop",
      issuer: "Workshop",
      year: "2024",
      type: "IoT",
      description: "Practical workshop on Internet of Things development and implementation",
    },
    {
      name: "Foundations of Cybersecurity",
      issuer: "Google",
      year: "2024",
      type: "Security",
      description: "Fundamental cybersecurity principles and best practices",
    },
    {
      name: "AWS Cloud Technical Essentials",
      issuer: "AWS",
      year: "2024",
      type: "Cloud",
      description: "Core AWS services and cloud computing fundamentals",
    },
    {
      name: "Architecting Solutions",
      issuer: "AWS",
      year: "2024",
      type: "Cloud",
      description: "Advanced AWS architecture and solution design patterns",
    },
    {
      name: "Migrating to the AWS Cloud",
      issuer: "AWS",
      year: "2024",
      type: "Cloud",
      description: "Cloud migration strategies and implementation techniques",
    },
  ]

  // Realistic projects based on your requirements
  const projects = [
    {
      title: "🌐 E-Commerce Full Stack Platform",
      description:
        "Complete e-commerce solution built with React, Node.js, and MongoDB. Features include user authentication, payment gateway integration, inventory management, order tracking, admin dashboard, and real-time notifications. Deployed on AWS with CI/CD pipeline.",
      tech: ["React", "Node.js", "Express", "MongoDB", "Stripe API", "JWT", "AWS", "Docker", "Figma"],
      metrics: { users: "5K+", uptime: "99.8%", performance: "A+" },
      github: "https://github.com/Mohanbalu/ecommerce-fullstack",
      live: "https://ecommerce-demo.vercel.app",
      category: "Full Stack Web",
      features: ["Payment Integration", "Real-time Chat", "Admin Panel", "Mobile Responsive", "UI/UX Design"],
    },
    {
      title: "🤖 AI-Powered Recommendation System",
      description:
        "Machine learning system that provides personalized product recommendations using collaborative filtering and content-based algorithms. Built with Python, TensorFlow, and deployed using Flask API. Includes data preprocessing, model training, and real-time inference.",
      tech: ["Python", "TensorFlow", "Pandas", "NumPy", "Flask", "Scikit-learn", "PostgreSQL"],
      metrics: { accuracy: "92%", predictions: "100K+", response_time: "<200ms" },
      github: "https://github.com/Mohanbalu/ml-recommendation-system",
      live: "https://ml-recommendations.vercel.app",
      category: "Machine Learning",
      features: ["Collaborative Filtering", "Content-Based", "Real-time API", "Data Visualization"],
    },
    {
      title: "☕ Enterprise Java Banking System",
      description:
        "Robust banking management system built with Java Spring Boot, featuring account management, transaction processing, loan calculations, and comprehensive reporting. Includes microservices architecture, security implementation, and database optimization.",
      tech: ["Java", "Spring Boot", "Spring Security", "MySQL", "JPA/Hibernate", "Maven", "JUnit"],
      metrics: { transactions: "50K+", security: "Bank-grade", performance: "Sub-second" },
      github: "https://github.com/Mohanbalu/java-banking-system",
      live: "https://banking-system-demo.vercel.app",
      category: "Full Stack Java",
      features: ["Microservices", "Security", "Transaction Processing", "Reporting"],
    },
    {
      title: "🛡️ Cybersecurity Threat Detection System",
      description:
        "Advanced cybersecurity system using machine learning to detect network intrusions and malware. Features real-time monitoring, threat analysis, automated response, and comprehensive security reporting. Built with Python and integrated with SIEM tools.",
      tech: ["Python", "Scikit-learn", "NetworkX", "Wireshark", "Elasticsearch", "Kibana", "Docker"],
      metrics: { detection_rate: "98.5%", false_positives: "<2%", response_time: "Real-time" },
      github: "https://github.com/Mohanbalu/cybersecurity-detection",
      live: "https://security-monitor.vercel.app",
      category: "Cybersecurity",
      features: ["Intrusion Detection", "Malware Analysis", "Real-time Monitoring", "SIEM Integration"],
    },
    {
      title: "🧠 Natural Language Processing Chatbot",
      description:
        "Intelligent chatbot using NLP and deep learning for customer service automation. Features intent recognition, entity extraction, context management, and multi-language support. Built with Python, NLTK, and deployed using FastAPI.",
      tech: ["Python", "NLTK", "spaCy", "TensorFlow", "FastAPI", "Redis", "PostgreSQL"],
      metrics: { accuracy: "94%", languages: "5+", response_time: "<1s" },
      github: "https://github.com/Mohanbalu/nlp-chatbot",
      live: "https://ai-chatbot-demo.vercel.app",
      category: "Artificial Intelligence",
      features: ["Intent Recognition", "Multi-language", "Context Awareness", "Learning Capability"],
    },
    {
      title: "📊 Real-time Analytics Dashboard",
      description:
        "Full-stack analytics platform with real-time data visualization, user behavior tracking, and predictive analytics. Built with React, D3.js, Node.js, and WebSocket for live updates. Includes data pipeline and machine learning insights.",
      tech: ["React", "D3.js", "Node.js", "WebSocket", "Python", "Apache Kafka", "InfluxDB"],
      metrics: { data_points: "1M+", real_time: "Yes", visualizations: "20+" },
      github: "https://github.com/Mohanbalu/analytics-dashboard",
      live: "https://analytics-demo.vercel.app",
      category: "Full Stack Web",
      features: ["Real-time Updates", "Predictive Analytics", "Custom Visualizations", "Data Pipeline"],
    },
    {
      title: "🎨 Modern Banking App UI/UX Design",
      description:
        "Complete mobile banking application design system created in Figma. Features include user research, wireframing, high-fidelity mockups, interactive prototypes, and comprehensive design system. Focused on accessibility, user experience, and modern design principles.",
      tech: ["Figma", "Adobe XD", "Prototyping", "User Research", "Design Systems", "Accessibility"],
      metrics: { screens: "50+", prototypes: "15+", user_tests: "25+" },
      github: "https://github.com/Mohanbalu/banking-app-design",
      live: "https://www.figma.com/proto/banking-app-design",
      category: "UI/UX Design",
      features: ["Interactive Prototypes", "Design System", "User Testing", "Accessibility Focus"],
    },
    {
      title: "🌟 E-Learning Platform Design System",
      description:
        "Comprehensive design system and UI kit for an e-learning platform. Includes component library, style guide, iconography, typography system, and responsive design patterns. Built with scalability and consistency in mind for development teams.",
      tech: ["Figma", "Design Systems", "Component Library", "Style Guide", "Responsive Design"],
      metrics: { components: "100+", variants: "300+", icons: "80+" },
      github: "https://github.com/Mohanbalu/elearning-design-system",
      live: "https://www.figma.com/file/elearning-design-system",
      category: "UI/UX Design",
      features: ["Component Library", "Style Guide", "Responsive Design", "Developer Handoff"],
    },
    {
      title: "🚀 SaaS Dashboard Redesign",
      description:
        "Complete redesign of a SaaS analytics dashboard focusing on data visualization, user workflow optimization, and modern interface design. Includes user journey mapping, information architecture, and interactive data visualization components.",
      tech: ["Figma", "Data Visualization", "User Journey Mapping", "Information Architecture"],
      metrics: { efficiency: "+40%", satisfaction: "4.8/5", tasks: "15+" },
      github: "https://github.com/Mohanbalu/saas-dashboard-redesign",
      live: "https://www.figma.com/proto/saas-dashboard-redesign",
      category: "UI/UX Design",
      features: ["Data Visualization", "User Research", "Workflow Optimization", "A/B Testing"],
    },
  ]

  const skillCategories = [
    {
      title: "🌐 Full Stack Web",
      skills: ["React", "Next.js", "Node.js", "Express", "MongoDB", "PostgreSQL", "AWS", "Figma"],
      icon: Globe,
      color: "bg-gradient-to-r from-blue-500 to-purple-600",
    },
    {
      title: "🤖 Machine Learning",
      skills: ["Python", "TensorFlow", "PyTorch", "Scikit-learn", "Pandas", "NumPy", "Jupyter"],
      icon: Brain,
      color: "bg-gradient-to-r from-green-500 to-teal-600",
    },
    {
      title: "☕ Full Stack Java",
      skills: ["Java", "Spring Boot", "Spring Security", "Hibernate", "Maven", "JUnit", "MySQL"],
      icon: Code,
      color: "bg-gradient-to-r from-orange-500 to-red-600",
    },
    {
      title: "🛡️ Cybersecurity",
      skills: ["Network Security", "Penetration Testing", "SIEM", "Malware Analysis", "Cryptography"],
      icon: Shield,
      color: "bg-gradient-to-r from-red-500 to-pink-600",
    },
    {
      title: "🧠 Artificial Intelligence",
      skills: ["NLP", "Computer Vision", "Deep Learning", "Neural Networks", "OpenCV", "NLTK"],
      icon: Bot,
      color: "bg-gradient-to-r from-purple-500 to-indigo-600",
    },
    {
      title: "🗄️ Database & DevOps",
      skills: ["Docker", "Kubernetes", "CI/CD", "AWS", "Linux", "Git", "Jenkins"],
      icon: Database,
      color: "bg-gradient-to-r from-gray-500 to-slate-600",
    },
    {
      title: "🎨 Design & UI/UX",
      skills: ["Figma", "Adobe XD", "Sketch", "Prototyping", "Wireframing", "User Research", "Design Systems"],
      icon: Sparkles,
      color: "bg-gradient-to-r from-pink-500 to-rose-600",
    },
  ]

  const handleLaunchExperience = () => {
    setExperienceLaunched(true)
    ;(window as any).unlockAchievement?.("launcher")

    // Smooth scroll to experience section
    const experienceSection = document.getElementById("experience")
    if (experienceSection) {
      experienceSection.scrollIntoView({ behavior: "smooth" })
    }

    // Add some visual feedback
    setTimeout(() => {
      setCurrentSection(1) // Set to experience section
    }, 1000)
  }

  const handleDownloadResume = () => {
    ;(window as any).unlockAchievement?.("resume_hunter")
    // You can add actual resume download logic here
    window.open("/resume.pdf", "_blank")
  }

  const handleGitHubClick = () => {
    ;(window as any).unlockAchievement?.("github_visitor")
    window.open("https://github.com/Mohanbalu", "_blank")
  }

  const handleLinkedInClick = () => {
    ;(window as any).unlockAchievement?.("linkedin_connector")
    window.open("https://www.linkedin.com/in/mohanbalu/", "_blank")
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-2xl animate-pulse">Loading Digital Experience...</div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <MatrixRain />
      <AchievementSystem onAchievementUnlock={(id) => console.log(`Achievement unlocked: ${id}`)} />

      {/* Immersive Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-cyan-900/20" />

        <motion.div
          className="relative z-20 text-center px-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="mb-8"
            animate={{
              scale: [1, 1.05, 1],
              rotate: [0, 1, -1, 0],
            }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
          >
            <div className="w-40 h-40 mx-auto mb-8 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-full blur-xl opacity-50 animate-pulse" />
              <div className="relative w-full h-full bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full flex items-center justify-center text-6xl font-bold">
                M
              </div>
            </div>
          </motion.div>

          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          >
            MOHAN BALU V
          </motion.h1>

          <div className="text-2xl md:text-3xl mb-8 h-12">
            <TypingAnimation
              texts={[
                "Full Stack Developer 💻",
                "ML Engineer 🤖",
                "Java Architect ☕",
                "Security Expert 🛡️",
                "AI Innovator 🧠",
              ]}
              className="text-cyan-400"
            />
          </div>

          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <Button
              size="lg"
              onClick={handleLaunchExperience}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all"
            >
              <Rocket className="mr-2 h-5 w-5" />
              {experienceLaunched ? "Experience Launched! 🚀" : "Launch Experience"}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={handleDownloadResume}
              className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transform hover:scale-105 transition-all"
            >
              <Download className="mr-2 h-5 w-5" />
              Download Resume
            </Button>
          </motion.div>

          <motion.div
            className="flex justify-center space-x-8 text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
          >
            <button
              onClick={() => window.open("mailto:mohanbalu292@gmail.com")}
              className="hover:text-cyan-400 transition-colors transform hover:scale-110"
            >
              <Mail className="h-6 w-6" />
            </button>
            <button
              onClick={handleGitHubClick}
              className="hover:text-cyan-400 transition-colors transform hover:scale-110"
            >
              <Github className="h-6 w-6" />
            </button>
            <button
              onClick={handleLinkedInClick}
              className="hover:text-cyan-400 transition-colors transform hover:scale-110"
            >
              <Linkedin className="h-6 w-6" />
            </button>
            <button
              onClick={() => window.open("tel:8074223801")}
              className="hover:text-cyan-400 transition-colors transform hover:scale-110"
            >
              <Phone className="h-6 w-6" />
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <ChevronDown className="h-8 w-8 text-cyan-400" />
        </motion.div>
      </section>

      {/* Experience & Education Section */}
      <section ref={experienceRef} id="experience" className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
              PROFESSIONAL JOURNEY
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Building expertise through hands-on experience and continuous learning
            </p>
          </motion.div>

          {/* Work Experience */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-white mb-8 flex items-center">
              <Briefcase className="mr-3 h-8 w-8 text-green-400" />
              Work Experience
            </h3>
            <div className="space-y-8">
              {workExperience.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                >
                  <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-green-500 hover:border-cyan-400 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                        <div className="mb-4 md:mb-0">
                          <h4 className="text-2xl font-bold text-white mb-1">{exp.title}</h4>
                          <p className="text-xl text-green-400 font-semibold mb-2">{exp.company}</p>
                          <div className="flex flex-wrap gap-4 text-sm text-gray-300">
                            <span className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {exp.period}
                            </span>
                            <span className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              {exp.location}
                            </span>
                          </div>
                        </div>
                        <Badge className="bg-gradient-to-r from-green-600 to-blue-600 capitalize">{exp.type}</Badge>
                      </div>

                      <p className="text-gray-300 mb-4 leading-relaxed">{exp.description}</p>

                      <div className="mb-4">
                        <h5 className="text-lg font-semibold text-white mb-3">Key Achievements:</h5>
                        <ul className="space-y-2">
                          {exp.achievements.map((achievement, achIndex) => (
                            <li key={achIndex} className="flex items-start text-gray-300">
                              <span className="text-green-400 mr-2 mt-1">▸</span>
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h5 className="text-lg font-semibold text-white mb-3">Technologies Used:</h5>
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech, techIndex) => (
                            <Badge key={techIndex} variant="outline" className="border-cyan-400 text-cyan-400">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-white mb-8 flex items-center">
              <Award className="mr-3 h-8 w-8 text-blue-400" />
              Education
            </h3>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 border-2 border-blue-500">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                    <div>
                      <h4 className="text-2xl font-bold text-white mb-2">{education.degree}</h4>
                      <p className="text-xl text-blue-400 font-semibold mb-2">{education.university}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-300 mb-4">
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {education.period}
                        </span>
                        <span className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {education.location}
                        </span>
                      </div>
                    </div>
                    <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-lg px-3 py-1">
                      GPA: {education.gpa}
                    </Badge>
                  </div>

                  <div>
                    <h5 className="text-lg font-semibold text-white mb-3">Relevant Coursework:</h5>
                    <div className="flex flex-wrap gap-2">
                      {education.coursework.map((course, courseIndex) => (
                        <Badge key={courseIndex} variant="secondary" className="text-sm">
                          {course}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="text-3xl font-bold text-white mb-8 flex items-center">
              <Award className="mr-3 h-8 w-8 text-yellow-400" />
              Certifications
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 border border-yellow-500 hover:border-yellow-400 transition-all duration-300 h-full">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <Badge className="bg-gradient-to-r from-yellow-600 to-orange-600 text-xs">{cert.type}</Badge>
                        <span className="text-xs text-gray-400">{cert.year}</span>
                      </div>
                      <h4 className="font-bold text-white text-sm mb-2">{cert.name}</h4>
                      <p className="text-yellow-400 text-sm font-semibold mb-2">{cert.issuer}</p>
                      <p className="text-gray-300 text-xs leading-relaxed">{cert.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Constellation */}
      <section ref={skillsRef} className="relative py-20 bg-gradient-to-b from-gray-900 to-purple-900">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              TECHNICAL ARSENAL
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Mastery across multiple domains - from web development to artificial intelligence
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillCategories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
                whileHover={{ scale: 1.05 }}
              >
                <div className="mb-6">
                  <AnimatedSkillIcon icon={category.icon} color={category.color} delay={index * 0.2} />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{category.title}</h3>
                <div className="flex flex-wrap justify-center gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <Badge key={skillIndex} variant="outline" className="border-cyan-400 text-cyan-400 text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Revolutionary Project Showcase */}
      <section ref={projectsRef} id="projects" className="py-20 bg-gradient-to-b from-purple-900 to-black">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400">
              PROJECT SHOWCASE
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Real-world applications demonstrating expertise across multiple technology domains
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, rotateY: -90 }}
                whileInView={{ opacity: 1, rotateY: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="perspective-1000"
              >
                <Card className="bg-gradient-to-br from-gray-900 to-black border-2 border-purple-500 hover:border-cyan-400 transition-all duration-300 h-full">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl md:text-2xl font-bold text-white">{project.title}</h3>
                      <Badge className="bg-gradient-to-r from-purple-600 to-pink-600">{project.category}</Badge>
                    </div>

                    <p className="text-gray-300 mb-4 leading-relaxed text-sm md:text-base">{project.description}</p>

                    <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-black/50 rounded-lg">
                      {Object.entries(project.metrics).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <div className="text-cyan-400 font-bold text-sm md:text-lg">{value}</div>
                          <div className="text-xs text-gray-400 capitalize">{key.replace("_", " ")}</div>
                        </div>
                      ))}
                    </div>

                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-white mb-2">Key Features:</h4>
                      <div className="flex flex-wrap gap-1">
                        {project.features.map((feature, featureIndex) => (
                          <Badge key={featureIndex} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.slice(0, 4).map((tech, techIndex) => (
                        <Badge key={techIndex} variant="outline" className="border-cyan-400 text-cyan-400 text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {project.tech.length > 4 && (
                        <Badge variant="outline" className="border-cyan-400 text-cyan-400 text-xs">
                          +{project.tech.length - 4} more
                        </Badge>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button
                        className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-sm"
                        onClick={() => window.open(project.github, "_blank")}
                      >
                        <Github className="mr-2 h-4 w-4" />
                        Source Code
                      </Button>
                      <Button
                        className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-sm"
                        onClick={() => window.open(project.live, "_blank")}
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Live Demo
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Portal */}
      <section ref={contactRef} className="py-20 bg-gradient-to-t from-black to-purple-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400">
              CONNECT WITH ME
            </h2>
            <p className="text-xl text-gray-300 mb-12">
              Ready to build something amazing together? Let's connect and discuss opportunities.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <motion.div
                className="bg-gradient-to-br from-purple-900/50 to-black/50 p-8 rounded-2xl border border-purple-500"
                whileHover={{ scale: 1.05, borderColor: "#00FFFF" }}
              >
                <Mail className="h-12 w-12 text-cyan-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Email</h3>
                <p className="text-cyan-400">mohanbalu292@gmail.com</p>
              </motion.div>

              <motion.div
                className="bg-gradient-to-br from-pink-900/50 to-black/50 p-8 rounded-2xl border border-pink-500"
                whileHover={{ scale: 1.05, borderColor: "#FF00FF" }}
              >
                <Phone className="h-12 w-12 text-pink-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Phone</h3>
                <p className="text-pink-400">+91 8074223801</p>
              </motion.div>
            </div>

            <motion.div
              className="flex flex-col sm:flex-row justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Button
                size="lg"
                onClick={() => window.open("mailto:mohanbalu292@gmail.com")}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transform hover:scale-110 transition-all"
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Hire Me Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={handleGitHubClick}
                className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transform hover:scale-110 transition-all"
              >
                <ArrowRight className="mr-2 h-5 w-5" />
                View GitHub
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Floating Navigation */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block">
        <div className="bg-black/80 backdrop-blur-md rounded-full p-2 border border-purple-500">
          {sections.map((section, index) => (
            <button
              key={index}
              className={`block w-3 h-3 rounded-full mb-2 transition-all ${
                currentSection === index ? "bg-cyan-400" : "bg-gray-600 hover:bg-purple-400"
              }`}
              onClick={() => setCurrentSection(index)}
              title={section}
            />
          ))}
        </div>
      </div>

      {/* Audio Controls */}
      <div className="fixed top-4 left-4 z-50 flex space-x-2">
        <Button
          size="sm"
          variant="outline"
          className="border-cyan-400 text-cyan-400"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="border-cyan-400 text-cyan-400"
          onClick={() => setSoundEnabled(!soundEnabled)}
        >
          {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  )
}
