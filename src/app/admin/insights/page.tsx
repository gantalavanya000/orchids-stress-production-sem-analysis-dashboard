'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Brain, LogOut, Users, TrendingUp, AlertTriangle, Lightbulb, Target, Award } from 'lucide-react'
import Link from 'next/link'
import { getStoredUser, clearUser } from '@/lib/auth'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter, ZAxis } from 'recharts'
import { motion } from 'framer-motion'

export default function AdminInsightsPage() {
  const router = useRouter()

  useEffect(() => {
    const user = getStoredUser()
    if (!user || user.role !== 'admin') {
      router.push('/login')
    }
  }, [router])

  const handleLogout = () => {
    clearUser()
    router.push('/')
  }

  const stressProductivityCorrelation = [
    { stress: 1, productivity: 85, employees: 15 },
    { stress: 2, productivity: 82, employees: 25 },
    { stress: 3, productivity: 70, employees: 35 },
    { stress: 4, productivity: 55, employees: 20 },
    { stress: 5, productivity: 40, employees: 5 }
  ]

  const departmentData = [
    { department: 'Engineering', avgStress: 3.2, avgProductivity: 72, headcount: 45 },
    { department: 'Sales', avgStress: 3.8, avgProductivity: 65, headcount: 30 },
    { department: 'Marketing', avgStress: 2.9, avgProductivity: 78, headcount: 25 },
    { department: 'HR', avgStress: 2.5, avgProductivity: 82, headcount: 15 },
    { department: 'Finance', avgStress: 3.5, avgProductivity: 68, headcount: 20 }
  ]

  const trendsData = [
    { month: 'Jan', stress: 3.2, productivity: 75 },
    { month: 'Feb', stress: 3.4, productivity: 72 },
    { month: 'Mar', stress: 3.6, productivity: 68 },
    { month: 'Apr', stress: 3.3, productivity: 73 },
    { month: 'May', stress: 3.1, productivity: 77 },
    { month: 'Jun', stress: 2.9, productivity: 80 }
  ]

  const keyMetrics = {
    totalEmployees: 135,
    avgStressLevel: 3.2,
    avgProductivity: 73,
    highRiskEmployees: 25,
    improvementPotential: 18
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Brain className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              StressIQ Analytics
            </span>
          </Link>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4">Organizational Insights Dashboard</h1>
            <p className="text-muted-foreground text-lg">
              Comprehensive analysis of workplace stress and productivity patterns
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Users className="h-8 w-8 text-blue-600" />
                <span className="text-3xl font-bold">{keyMetrics.totalEmployees}</span>
              </div>
              <p className="text-sm text-muted-foreground">Total Employees</p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-2">
                <AlertTriangle className="h-8 w-8 text-yellow-600" />
                <span className="text-3xl font-bold">{keyMetrics.avgStressLevel}</span>
              </div>
              <p className="text-sm text-muted-foreground">Avg Stress Level</p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="h-8 w-8 text-green-600" />
                <span className="text-3xl font-bold">{keyMetrics.avgProductivity}%</span>
              </div>
              <p className="text-sm text-muted-foreground">Avg Productivity</p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Target className="h-8 w-8 text-red-600" />
                <span className="text-3xl font-bold">{keyMetrics.highRiskEmployees}</span>
              </div>
              <p className="text-sm text-muted-foreground">High Risk</p>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-6">Stress-Productivity Correlation (SEM Model)</h3>
              <ResponsiveContainer width="100%" height={300}>
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <CartesianGrid />
                  <XAxis type="number" dataKey="stress" name="Stress Level" domain={[0, 5]} />
                  <YAxis type="number" dataKey="productivity" name="Productivity" domain={[0, 100]} />
                  <ZAxis type="number" dataKey="employees" range={[100, 1000]} />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                  <Legend />
                  <Scatter name="Employees" data={stressProductivityCorrelation} fill="#6366f1" />
                </ScatterChart>
              </ResponsiveContainer>
              <p className="text-sm text-muted-foreground mt-4">
                <strong>R² = 0.87</strong> - Strong negative correlation between stress and productivity. 
                Bubble size represents employee count.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-bold mb-6">6-Month Trends</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={trendsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" domain={[0, 5]} />
                  <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="stress" stroke="#ef4444" strokeWidth={2} name="Stress" />
                  <Line yAxisId="right" type="monotone" dataKey="productivity" stroke="#10b981" strokeWidth={2} name="Productivity %" />
                </LineChart>
              </ResponsiveContainer>
              <p className="text-sm text-muted-foreground mt-4">
                Positive trend: Stress declining by 9% while productivity increasing by 7% over 6 months.
              </p>
            </Card>
          </div>

          <Card className="p-6 mb-12">
            <h3 className="text-xl font-bold mb-6">Department-wise Analysis</h3>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={departmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="department" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="avgStress" fill="#ef4444" name="Avg Stress (1-5)" />
                <Bar dataKey="avgProductivity" fill="#10b981" name="Avg Productivity %" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="p-8 bg-gradient-to-br from-red-50 to-orange-50 border-2">
              <div className="flex items-center gap-3 mb-6">
                <AlertTriangle className="h-10 w-10 text-red-600" />
                <h3 className="text-2xl font-bold">Critical Findings</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <span className="text-red-600 font-bold">1.</span>
                  <div>
                    <strong>Sales Department at Risk:</strong>
                    <p className="text-sm text-muted-foreground">Highest stress (3.8) and lowest productivity (65%). Immediate intervention needed.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-red-600 font-bold">2.</span>
                  <div>
                    <strong>25 High-Risk Employees:</strong>
                    <p className="text-sm text-muted-foreground">Stress levels above 4.0 requiring urgent management support.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-red-600 font-bold">3.</span>
                  <div>
                    <strong>Work-Life Balance Issues:</strong>
                    <p className="text-sm text-muted-foreground">45% of employees report poor work-life balance, correlating with stress.</p>
                  </div>
                </li>
              </ul>
            </Card>

            <Card className="p-8 bg-gradient-to-br from-green-50 to-emerald-50 border-2">
              <div className="flex items-center gap-3 mb-6">
                <Award className="h-10 w-10 text-green-600" />
                <h3 className="text-2xl font-bold">Positive Indicators</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <span className="text-green-600 font-bold">✓</span>
                  <div>
                    <strong>HR Excellence:</strong>
                    <p className="text-sm text-muted-foreground">Lowest stress (2.5) and highest productivity (82%). Best practices model.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-green-600 font-bold">✓</span>
                  <div>
                    <strong>Improving Trends:</strong>
                    <p className="text-sm text-muted-foreground">Overall organizational stress down 9% in 6 months.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-green-600 font-bold">✓</span>
                  <div>
                    <strong>Manager Support Strong:</strong>
                    <p className="text-sm text-muted-foreground">Average manager support rating of 3.8/5 across organization.</p>
                  </div>
                </li>
              </ul>
            </Card>
          </div>

          <Card className="p-8 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-2">
            <div className="flex items-center gap-3 mb-6">
              <Lightbulb className="h-10 w-10 text-purple-600" />
              <h3 className="text-2xl font-bold">Strategic Recommendations</h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg">
                <h4 className="font-semibold text-lg mb-3 text-blue-600">🔵 Immediate Actions (0-30 days)</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Conduct wellness intervention for Sales department</li>
                  <li>• Implement mandatory manager check-ins for high-risk employees</li>
                  <li>• Launch flexible working hours pilot program</li>
                  <li>• Provide stress management training workshops</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg">
                <h4 className="font-semibold text-lg mb-3 text-purple-600">🟣 Short-term Initiatives (1-3 months)</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Replicate HR department best practices across organization</li>
                  <li>• Establish mental health support program</li>
                  <li>• Introduce workload balancing tools and processes</li>
                  <li>• Create peer support networks</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg">
                <h4 className="font-semibold text-lg mb-3 text-green-600">🟢 Long-term Strategy (3-12 months)</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Redesign roles with high stress-to-productivity ratios</li>
                  <li>• Implement continuous monitoring dashboard</li>
                  <li>• Develop predictive stress-risk algorithms</li>
                  <li>• Establish organizational wellness culture</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg">
                <h4 className="font-semibold text-lg mb-3 text-orange-600">🟠 Investment Priorities</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Manager training programs ($50K/year)</li>
                  <li>• Employee wellness benefits ($120K/year)</li>
                  <li>• Workplace environment improvements ($80K)</li>
                  <li>• Analytics & monitoring tools ($30K)</li>
                </ul>
              </div>
            </div>
          </Card>

          <Card className="p-8 mt-12 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
            <h3 className="text-2xl font-bold mb-4">Projected ROI</h3>
            <p className="text-lg mb-6 opacity-90">
              Implementing these recommendations is projected to:
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <div className="text-4xl font-black mb-2">+18%</div>
                <p className="text-sm">Productivity Increase</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <div className="text-4xl font-black mb-2">-35%</div>
                <p className="text-sm">Stress Reduction</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <div className="text-4xl font-black mb-2">$450K</div>
                <p className="text-sm">Annual Savings</p>
              </div>
            </div>
            <p className="text-sm mt-6 opacity-75">
              Based on SEM analysis, reduced turnover costs, and productivity gains
            </p>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
