'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { BarChart3, Brain, TrendingUp, Users, ArrowRight, Shield, Target, Zap } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              StressIQ Analytics
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="#about">
              <Button variant="ghost">About</Button>
            </Link>
            <Link href="#features">
              <Button variant="ghost">Features</Button>
            </Link>
            <Link href="/login">
              <Button>Login</Button>
            </Link>
          </div>
        </div>
      </nav>

      <section className="container mx-auto px-6 pt-20 pb-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-6xl font-black leading-tight mb-6">
              Transform{' '}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Workplace Stress
              </span>{' '}
              Into Strategic Insights
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Leverage advanced machine learning and structural equation modeling to understand the 
              relationship between employee stress levels and productivity outcomes.
            </p>
            <div className="flex gap-4">
              <Link href="/login">
                <Button size="lg" className="text-lg">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-lg">
                Watch Demo
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-600 rounded-3xl blur-3xl opacity-20"></div>
            <Card className="p-8 relative bg-white/80 backdrop-blur-sm border-2">
              <div className="grid grid-cols-2 gap-6">
                <StatCard icon={<Users />} value="1000+" label="Employees Analyzed" />
                <StatCard icon={<TrendingUp />} value="87%" label="Accuracy Rate" />
                <StatCard icon={<BarChart3 />} value="15+" label="Key Metrics" />
                <StatCard icon={<Target />} value="24/7" label="Real-time Analysis" />
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      <section id="about" className="bg-white py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-6">About StressIQ Analytics</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our platform combines cutting-edge statistical modeling with machine learning algorithms 
              to provide actionable insights into workplace stress and productivity dynamics.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Brain className="h-12 w-12" />}
              title="AI-Powered Analysis"
              description="Utilizing Random Forest, Gradient Boosting, and Logistic Regression models to predict productivity patterns."
            />
            <FeatureCard
              icon={<BarChart3 className="h-12 w-12" />}
              title="SEM Modeling"
              description="Structural Equation Modeling reveals complex relationships between stress factors and work outcomes."
            />
            <FeatureCard
              icon={<Shield className="h-12 w-12" />}
              title="Data Security"
              description="Enterprise-grade encryption ensures your sensitive workplace data remains confidential."
            />
          </div>
        </div>
      </section>

      <section id="features" className="py-24 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-6">Platform Features</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything you need to understand and optimize workplace wellbeing
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ProcessCard
              number="01"
              title="Employee Questionnaire"
              description="Comprehensive assessment covering workload, role clarity, job security, and interpersonal dynamics."
            />
            <ProcessCard
              number="02"
              title="ML Model Training"
              description="Multiple algorithms analyze patterns and predict productivity levels based on stress indicators."
            />
            <ProcessCard
              number="03"
              title="Interactive Dashboards"
              description="Beautiful visualizations including bar charts, pie charts, and correlation matrices."
            />
            <ProcessCard
              number="04"
              title="SEM Analysis"
              description="Statistical modeling reveals causal relationships between variables."
            />
            <ProcessCard
              number="05"
              title="Actionable Insights"
              description="Receive specific recommendations to improve organizational support and reduce stress."
            />
            <ProcessCard
              number="06"
              title="Role-Based Access"
              description="Separate dashboards for employees and administrators with tailored insights."
            />
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join forward-thinking organizations using data-driven insights to create healthier, 
              more productive workplaces.
            </p>
            <Link href="/login">
              <Button size="lg" variant="secondary" className="text-lg">
                Start Your Analysis <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Brain className="h-6 w-6" />
                <span className="text-xl font-bold">StressIQ</span>
              </div>
              <p className="text-gray-400 text-sm">
                Advanced workplace analytics for the modern organization
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>Features</li>
                <li>Pricing</li>
                <li>Security</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>About</li>
                <li>Careers</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>Privacy</li>
                <li>Terms</li>
                <li>Compliance</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
            © 2025 StressIQ Analytics. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

function StatCard({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary mb-3">
        {icon}
      </div>
      <div className="text-3xl font-bold mb-1">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <Card className="p-8 h-full hover:shadow-lg transition-shadow">
        <div className="text-primary mb-4">{icon}</div>
        <h3 className="text-2xl font-bold mb-3">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </Card>
    </motion.div>
  )
}

function ProcessCard({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <Card className="p-6 h-full hover:shadow-lg transition-shadow">
        <div className="text-5xl font-black text-primary/20 mb-4">{number}</div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </Card>
    </motion.div>
  )
}
