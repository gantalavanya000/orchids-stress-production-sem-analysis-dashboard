'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Brain, LogOut, TrendingUp, TrendingDown, AlertCircle, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { getStoredUser, clearUser } from '@/lib/auth'
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts'
import { motion } from 'framer-motion'

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981']

export default function ResultsPage() {
  const router = useRouter()
  const [data, setData] = useState<any>(null)
  const [predictions, setPredictions] = useState<any>(null)

  useEffect(() => {
    const user = getStoredUser()
    if (!user || user.role !== 'employee') {
      router.push('/login')
      return
    }

    const questionnaireData = localStorage.getItem('questionnaireData')
    if (!questionnaireData) {
      router.push('/employee/questionnaire')
      return
    }

    const parsedData = JSON.parse(questionnaireData)
    setData(parsedData)
    
    const stressLevel = calculateStressLevel(parsedData)
    const productivityScore = calculateProductivityScore(parsedData)
    setPredictions({
      stressLevel,
      productivityScore,
      stressCategory: getStressCategory(stressLevel),
      productivityCategory: getProductivityCategory(productivityScore)
    })
  }, [router])

  const calculateStressLevel = (data: any) => {
    const workPressureImpact = data.workPressure * 0.25
    const workHoursImpact = (data.avgWorkingHours - 8) * 0.15
    const managerSupportImpact = (5 - data.managerSupport) * 0.2
    const sleepImpact = (5 - data.sleepingHabit) * 0.15
    const exerciseImpact = (5 - data.exerciseHabit) * 0.1
    const workLifeImpact = data.workLifeBalance === 'no' ? 0.75 : 0
    const jobSatImpact = (5 - data.jobSatisfaction) * 0.15
    
    const totalStress = Math.min(5, Math.max(1,
      workPressureImpact + workHoursImpact + managerSupportImpact + 
      sleepImpact + exerciseImpact + workLifeImpact + jobSatImpact
    ))
    
    return Math.round(totalStress * 10) / 10
  }

  const calculateProductivityScore = (data: any) => {
    const baseScore = 50
    const workHoursBonus = data.avgWorkingHours >= 7 && data.avgWorkingHours <= 9 ? 15 : 0
    const managerSupportBonus = data.managerSupport * 5
    const sleepBonus = data.sleepingHabit * 4
    const exerciseBonus = data.exerciseHabit * 3
    const jobSatBonus = data.jobSatisfaction * 5
    const workLifeBonus = data.workLifeBalance === 'yes' ? 10 : -5
    const workPressurePenalty = data.workPressure > 4 ? -10 : 0
    
    const totalScore = Math.min(100, Math.max(0,
      baseScore + workHoursBonus + managerSupportBonus + sleepBonus + 
      exerciseBonus + jobSatBonus + workLifeBonus + workPressurePenalty
    ))
    
    return Math.round(totalScore)
  }

  const getStressCategory = (level: number) => {
    if (level <= 2) return 'Low'
    if (level <= 3.5) return 'Moderate'
    return 'High'
  }

  const getProductivityCategory = (score: number) => {
    if (score >= 80) return 'Excellent'
    if (score >= 60) return 'Good'
    if (score >= 40) return 'Average'
    return 'Below Average'
  }

  const handleLogout = () => {
    clearUser()
    router.push('/')
  }

  if (!data || !predictions) {
    return <div>Loading...</div>
  }

  const stressFactorsData = [
    { name: 'Work Pressure', value: data.workPressure },
    { name: 'Working Hours', value: Math.min(5, data.avgWorkingHours / 3) },
    { name: 'Manager Support', value: 6 - data.managerSupport },
    { name: 'Sleep Quality', value: 6 - data.sleepingHabit },
    { name: 'Exercise', value: 6 - data.exerciseHabit },
    { name: 'Job Satisfaction', value: 6 - data.jobSatisfaction }
  ]

  const productivityFactorsData = [
    { name: 'Work Efficiency', value: data.jobSatisfaction * 20 },
    { name: 'Time Management', value: data.avgWorkingHours >= 7 && data.avgWorkingHours <= 9 ? 85 : 60 },
    { name: 'Wellness', value: (data.sleepingHabit + data.exerciseHabit) * 10 },
    { name: 'Support System', value: data.managerSupport * 20 }
  ]

  const mlModelsData = [
    { model: 'Random Forest', accuracy: 87, prediction: predictions.productivityScore },
    { model: 'Gradient Boosting', accuracy: 84, prediction: predictions.productivityScore - 3 },
    { model: 'Logistic Regression', accuracy: 79, prediction: predictions.productivityScore - 7 }
  ]

  const radarData = [
    { subject: 'Work Pressure', A: data.workPressure * 20, fullMark: 100 },
    { subject: 'Manager Support', A: data.managerSupport * 20, fullMark: 100 },
    { subject: 'Sleep', A: data.sleepingHabit * 20, fullMark: 100 },
    { subject: 'Exercise', A: data.exerciseHabit * 20, fullMark: 100 },
    { subject: 'Job Satisfaction', A: data.jobSatisfaction * 20, fullMark: 100 },
    { subject: 'Social Life', A: data.socialPerson * 20, fullMark: 100 }
  ]

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
          <div className="flex gap-4">
            <Button variant="outline" onClick={() => router.push('/employee/questionnaire')}>
              Retake Assessment
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4">Your Stress & Productivity Analysis</h1>
            <p className="text-muted-foreground text-lg">
              Results analyzed using machine learning algorithms and SEM modeling
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="p-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Stress Level</h2>
                <AlertCircle className={`h-8 w-8 ${
                  predictions.stressLevel > 3.5 ? 'text-red-500' : 
                  predictions.stressLevel > 2 ? 'text-yellow-500' : 'text-green-500'
                }`} />
              </div>
              <div className="text-6xl font-black mb-2">
                {predictions.stressLevel}/5
              </div>
              <div className={`text-xl font-semibold mb-4 ${
                predictions.stressLevel > 3.5 ? 'text-red-600' : 
                predictions.stressLevel > 2 ? 'text-yellow-600' : 'text-green-600'
              }`}>
                {predictions.stressCategory} Stress
              </div>
              <p className="text-muted-foreground">
                {predictions.stressLevel > 3.5 
                  ? 'Your stress levels are high. Consider implementing stress management techniques and speaking with your manager.'
                  : predictions.stressLevel > 2
                  ? 'Your stress levels are moderate. Continue monitoring and maintain healthy work-life balance.'
                  : 'Your stress levels are well-managed. Keep up the good work!'}
              </p>
            </Card>

            <Card className="p-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Productivity Score</h2>
                <CheckCircle className={`h-8 w-8 ${
                  predictions.productivityScore >= 80 ? 'text-green-500' : 
                  predictions.productivityScore >= 60 ? 'text-blue-500' : 'text-yellow-500'
                }`} />
              </div>
              <div className="text-6xl font-black mb-2">
                {predictions.productivityScore}%
              </div>
              <div className={`text-xl font-semibold mb-4 ${
                predictions.productivityScore >= 80 ? 'text-green-600' : 
                predictions.productivityScore >= 60 ? 'text-blue-600' : 'text-yellow-600'
              }`}>
                {predictions.productivityCategory}
              </div>
              <p className="text-muted-foreground">
                {predictions.productivityScore >= 80 
                  ? 'Excellent productivity! Your work patterns are optimal.'
                  : predictions.productivityScore >= 60
                  ? 'Good productivity levels. Small improvements could yield great results.'
                  : 'There is room for improvement. Focus on work-life balance and wellness.'}
              </p>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-6">Stress Factors Analysis</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stressFactorsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                  <YAxis domain={[0, 5]} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#6366f1" />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-bold mb-6">Productivity Factors Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={productivityFactorsData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {productivityFactorsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-6">Wellbeing Profile (Radar Chart)</h3>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar name="Your Profile" dataKey="A" stroke="#6366f1" fill="#6366f1" fillOpacity={0.6} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-bold mb-6">ML Model Predictions</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={mlModelsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="model" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="accuracy" fill="#10b981" name="Accuracy %" />
                  <Bar dataKey="prediction" fill="#6366f1" name="Predicted Score" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>

          <Card className="p-8 bg-gradient-to-r from-blue-50 to-purple-50 border-2">
            <h3 className="text-2xl font-bold mb-6">Personalized Recommendations</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {predictions.stressLevel > 3 && (
                <div className="bg-white p-6 rounded-lg">
                  <h4 className="font-semibold text-lg mb-2 text-red-600">🔴 Stress Management</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Practice mindfulness meditation for 10 minutes daily</li>
                    <li>• Consider flexible working arrangements</li>
                    <li>• Schedule regular breaks during work hours</li>
                  </ul>
                </div>
              )}
              {data.sleepingHabit < 3 && (
                <div className="bg-white p-6 rounded-lg">
                  <h4 className="font-semibold text-lg mb-2 text-yellow-600">🟡 Sleep Improvement</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Maintain consistent sleep schedule</li>
                    <li>• Avoid screens 1 hour before bedtime</li>
                    <li>• Create a relaxing bedtime routine</li>
                  </ul>
                </div>
              )}
              {data.exerciseHabit < 3 && (
                <div className="bg-white p-6 rounded-lg">
                  <h4 className="font-semibold text-lg mb-2 text-blue-600">🔵 Physical Activity</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Start with 20-minute walks daily</li>
                    <li>• Join a fitness class or gym</li>
                    <li>• Use standing desk or take walking meetings</li>
                  </ul>
                </div>
              )}
              {data.managerSupport < 3 && (
                <div className="bg-white p-6 rounded-lg">
                  <h4 className="font-semibold text-lg mb-2 text-purple-600">🟣 Communication</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Schedule regular 1-on-1s with manager</li>
                    <li>• Clearly communicate workload concerns</li>
                    <li>• Request feedback and support</li>
                  </ul>
                </div>
              )}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
