'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Brain, LogOut, ArrowRight, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { getStoredUser, clearUser } from '@/lib/auth'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { useToast } from '@/hooks/use-toast'

export default function QuestionnairePage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    avgWorkingHours: 8,
    workFrom: '',
    workPressure: 3,
    managerSupport: 3,
    sleepingHabit: 3,
    exerciseHabit: 3,
    jobSatisfaction: 3,
    workLifeBalance: '',
    socialPerson: 3,
    livesWithFamily: '',
    workingState: ''
  })

  useEffect(() => {
    const user = getStoredUser()
    if (!user || user.role !== 'employee') {
      router.push('/login')
    }
  }, [router])

  const handleLogout = () => {
    clearUser()
    router.push('/')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    localStorage.setItem('questionnaireData', JSON.stringify(formData))
    router.push('/employee/results')
  }

  const totalSteps = 3

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
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Stress & Productivity Assessment</h1>
            <p className="text-muted-foreground text-lg">
              Please answer the following questions honestly. This helps us analyze your stress levels 
              and productivity patterns.
            </p>
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Step {step} of {totalSteps}</span>
              <span className="text-sm text-muted-foreground">{Math.round((step / totalSteps) * 100)}% Complete</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-500"
                style={{ width: `${(step / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <Card className="p-8">
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold mb-6">Work Environment</h2>
                  
                  <div className="space-y-2">
                    <Label>Average Working Hours Per Day</Label>
                    <div className="flex items-center gap-4">
                      <Slider
                        value={[formData.avgWorkingHours]}
                        onValueChange={([value]) => setFormData({ ...formData, avgWorkingHours: value })}
                        min={4}
                        max={16}
                        step={0.5}
                        className="flex-1"
                      />
                      <span className="text-2xl font-bold text-primary w-16 text-right">
                        {formData.avgWorkingHours}h
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Work From</Label>
                    <Select value={formData.workFrom} onValueChange={(value) => setFormData({ ...formData, workFrom: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select work location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="home">Home</SelectItem>
                        <SelectItem value="office">Office</SelectItem>
                        <SelectItem value="hybrid">Hybrid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Work Pressure (1-5)</Label>
                    <div className="flex items-center gap-4">
                      <Slider
                        value={[formData.workPressure]}
                        onValueChange={([value]) => setFormData({ ...formData, workPressure: value })}
                        min={1}
                        max={5}
                        step={1}
                        className="flex-1"
                      />
                      <span className="text-2xl font-bold text-primary w-12 text-right">
                        {formData.workPressure}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">1 = Very Low, 5 = Very High</p>
                  </div>

                  <div className="space-y-2">
                    <Label>Manager Support (1-5)</Label>
                    <div className="flex items-center gap-4">
                      <Slider
                        value={[formData.managerSupport]}
                        onValueChange={([value]) => setFormData({ ...formData, managerSupport: value })}
                        min={1}
                        max={5}
                        step={1}
                        className="flex-1"
                      />
                      <span className="text-2xl font-bold text-primary w-12 text-right">
                        {formData.managerSupport}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">1 = Very Poor, 5 = Excellent</p>
                  </div>

                  <div className="space-y-2">
                    <Label>Working State</Label>
                    <Select value={formData.workingState} onValueChange={(value) => setFormData({ ...formData, workingState: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="karnataka">Karnataka</SelectItem>
                        <SelectItem value="delhi">Delhi</SelectItem>
                        <SelectItem value="mumbai">Mumbai</SelectItem>
                        <SelectItem value="chennai">Chennai</SelectItem>
                        <SelectItem value="hyderabad">Hyderabad</SelectItem>
                        <SelectItem value="pune">Pune</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold mb-6">Lifestyle & Wellbeing</h2>
                  
                  <div className="space-y-2">
                    <Label>Sleeping Habit Quality (1-5)</Label>
                    <div className="flex items-center gap-4">
                      <Slider
                        value={[formData.sleepingHabit]}
                        onValueChange={([value]) => setFormData({ ...formData, sleepingHabit: value })}
                        min={1}
                        max={5}
                        step={1}
                        className="flex-1"
                      />
                      <span className="text-2xl font-bold text-primary w-12 text-right">
                        {formData.sleepingHabit}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">1 = Very Poor, 5 = Excellent</p>
                  </div>

                  <div className="space-y-2">
                    <Label>Exercise Habit (1-5)</Label>
                    <div className="flex items-center gap-4">
                      <Slider
                        value={[formData.exerciseHabit]}
                        onValueChange={([value]) => setFormData({ ...formData, exerciseHabit: value })}
                        min={1}
                        max={5}
                        step={1}
                        className="flex-1"
                      />
                      <span className="text-2xl font-bold text-primary w-12 text-right">
                        {formData.exerciseHabit}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">1 = Never, 5 = Daily</p>
                  </div>

                  <div className="space-y-2">
                    <Label>Social Person (1-5)</Label>
                    <div className="flex items-center gap-4">
                      <Slider
                        value={[formData.socialPerson]}
                        onValueChange={([value]) => setFormData({ ...formData, socialPerson: value })}
                        min={1}
                        max={5}
                        step={1}
                        className="flex-1"
                      />
                      <span className="text-2xl font-bold text-primary w-12 text-right">
                        {formData.socialPerson}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">1 = Introvert, 5 = Extrovert</p>
                  </div>

                  <div className="space-y-2">
                    <Label>Lives With Family</Label>
                    <Select value={formData.livesWithFamily} onValueChange={(value) => setFormData({ ...formData, livesWithFamily: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Do you live with family?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold mb-6">Job Satisfaction</h2>
                  
                  <div className="space-y-2">
                    <Label>Job Satisfaction (1-5)</Label>
                    <div className="flex items-center gap-4">
                      <Slider
                        value={[formData.jobSatisfaction]}
                        onValueChange={([value]) => setFormData({ ...formData, jobSatisfaction: value })}
                        min={1}
                        max={5}
                        step={1}
                        className="flex-1"
                      />
                      <span className="text-2xl font-bold text-primary w-12 text-right">
                        {formData.jobSatisfaction}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">1 = Very Unsatisfied, 5 = Very Satisfied</p>
                  </div>

                  <div className="space-y-2">
                    <Label>Work-Life Balance</Label>
                    <Select value={formData.workLifeBalance} onValueChange={(value) => setFormData({ ...formData, workLifeBalance: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="How is your work-life balance?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Good Balance</SelectItem>
                        <SelectItem value="no">Poor Balance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
                    <h3 className="font-semibold text-lg mb-2">Ready to Submit?</h3>
                    <p className="text-sm text-muted-foreground">
                      Your responses will be analyzed using advanced machine learning models 
                      to provide personalized stress and productivity insights.
                    </p>
                  </div>
                </motion.div>
              )}
            </Card>

            <div className="flex justify-between mt-8">
              {step > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(step - 1)}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>
              )}
              {step < totalSteps ? (
                <Button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="ml-auto"
                >
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button type="submit" className="ml-auto">
                  Submit & View Results
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Brain, LogOut, ArrowRight, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { getStoredUser, clearUser } from '@/lib/auth'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { useToast } from '@/hooks/use-toast'

export default function QuestionnairePage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    avgWorkingHours: 8,
    workFrom: '',
    workPressure: 3,
    managerSupport: 3,
    sleepingHabit: 3,
    exerciseHabit: 3,
    jobSatisfaction: 3,
    workLifeBalance: '',
    socialPerson: 3,
    livesWithFamily: '',
    workingState: ''
  })

  useEffect(() => {
    const user = getStoredUser()
    if (!user || user.role !== 'employee') {
      router.push('/login')
    }
  }, [router])

  const handleLogout = () => {
    clearUser()
    router.push('/')
  }

  const calculateStressLevel = (data: typeof formData) => {
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

  const calculateProductivityScore = (data: typeof formData) => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const user = getStoredUser()
    if (!user) {
      toast({
        title: "Error",
        description: "User not found. Please login again.",
        variant: "destructive"
      })
      return
    }

    setIsSubmitting(true)

    try {
      const stressLevel = calculateStressLevel(formData)
      const productivityScore = calculateProductivityScore(formData)

      const { data, error } = await supabase
        .from('questionnaire_responses')
        .insert([
          {
            user_id: user.id,
            user_email: user.email,
            designation: 'Employee',
            work_location: formData.workFrom,
            work_hours_range: `${formData.avgWorkingHours}h`,
            avg_working_hours: formData.avgWorkingHours,
            work_pressure: formData.workPressure,
            manager_support: formData.managerSupport,
            work_life_balance: formData.workLifeBalance,
            sleeping_habit: formData.sleepingHabit,
            exercise_habit: formData.exerciseHabit,
            social_person: formData.socialPerson,
            job_satisfaction: formData.jobSatisfaction,
            stress_level: stressLevel,
            productivity_score: productivityScore
          }
        ])
        .select()

      if (error) throw error

      localStorage.setItem('questionnaireData', JSON.stringify({
        ...formData,
        responseId: data[0].id,
        stressLevel,
        productivityScore
      }))

      toast({
        title: "Success!",
        description: "Your responses have been saved successfully.",
      })

      router.push('/employee/results')
    } catch (error) {
      console.error('Error saving questionnaire:', error)
      toast({
        title: "Error",
        description: "Failed to save your responses. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const totalSteps = 3

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
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Stress & Productivity Assessment</h1>
            <p className="text-muted-foreground text-lg">
              Please answer the following questions honestly. This helps us analyze your stress levels 
              and productivity patterns.
            </p>
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Step {step} of {totalSteps}</span>
              <span className="text-sm text-muted-foreground">{Math.round((step / totalSteps) * 100)}% Complete</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-500"
                style={{ width: `${(step / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <Card className="p-8">
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold mb-6">Work Environment</h2>
                  
                  <div className="space-y-2">
                    <Label>Average Working Hours Per Day</Label>
                    <div className="flex items-center gap-4">
                      <Slider
                        value={[formData.avgWorkingHours]}
                        onValueChange={([value]) => setFormData({ ...formData, avgWorkingHours: value })}
                        min={4}
                        max={16}
                        step={0.5}
                        className="flex-1"
                      />
                      <span className="text-2xl font-bold text-primary w-16 text-right">
                        {formData.avgWorkingHours}h
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Work From</Label>
                    <Select value={formData.workFrom} onValueChange={(value) => setFormData({ ...formData, workFrom: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select work location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="home">Home</SelectItem>
                        <SelectItem value="office">Office</SelectItem>
                        <SelectItem value="hybrid">Hybrid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Work Pressure (1-5)</Label>
                    <div className="flex items-center gap-4">
                      <Slider
                        value={[formData.workPressure]}
                        onValueChange={([value]) => setFormData({ ...formData, workPressure: value })}
                        min={1}
                        max={5}
                        step={1}
                        className="flex-1"
                      />
                      <span className="text-2xl font-bold text-primary w-12 text-right">
                        {formData.workPressure}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">1 = Very Low, 5 = Very High</p>
                  </div>

                  <div className="space-y-2">
                    <Label>Manager Support (1-5)</Label>
                    <div className="flex items-center gap-4">
                      <Slider
                        value={[formData.managerSupport]}
                        onValueChange={([value]) => setFormData({ ...formData, managerSupport: value })}
                        min={1}
                        max={5}
                        step={1}
                        className="flex-1"
                      />
                      <span className="text-2xl font-bold text-primary w-12 text-right">
                        {formData.managerSupport}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">1 = Very Poor, 5 = Excellent</p>
                  </div>

                  <div className="space-y-2">
                    <Label>Working State</Label>
                    <Select value={formData.workingState} onValueChange={(value) => setFormData({ ...formData, workingState: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="karnataka">Karnataka</SelectItem>
                        <SelectItem value="delhi">Delhi</SelectItem>
                        <SelectItem value="mumbai">Mumbai</SelectItem>
                        <SelectItem value="chennai">Chennai</SelectItem>
                        <SelectItem value="hyderabad">Hyderabad</SelectItem>
                        <SelectItem value="pune">Pune</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold mb-6">Lifestyle & Wellbeing</h2>
                  
                  <div className="space-y-2">
                    <Label>Sleeping Habit Quality (1-5)</Label>
                    <div className="flex items-center gap-4">
                      <Slider
                        value={[formData.sleepingHabit]}
                        onValueChange={([value]) => setFormData({ ...formData, sleepingHabit: value })}
                        min={1}
                        max={5}
                        step={1}
                        className="flex-1"
                      />
                      <span className="text-2xl font-bold text-primary w-12 text-right">
                        {formData.sleepingHabit}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">1 = Very Poor, 5 = Excellent</p>
                  </div>

                  <div className="space-y-2">
                    <Label>Exercise Habit (1-5)</Label>
                    <div className="flex items-center gap-4">
                      <Slider
                        value={[formData.exerciseHabit]}
                        onValueChange={([value]) => setFormData({ ...formData, exerciseHabit: value })}
                        min={1}
                        max={5}
                        step={1}
                        className="flex-1"
                      />
                      <span className="text-2xl font-bold text-primary w-12 text-right">
                        {formData.exerciseHabit}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">1 = Never, 5 = Daily</p>
                  </div>

                  <div className="space-y-2">
                    <Label>Social Person (1-5)</Label>
                    <div className="flex items-center gap-4">
                      <Slider
                        value={[formData.socialPerson]}
                        onValueChange={([value]) => setFormData({ ...formData, socialPerson: value })}
                        min={1}
                        max={5}
                        step={1}
                        className="flex-1"
                      />
                      <span className="text-2xl font-bold text-primary w-12 text-right">
                        {formData.socialPerson}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">1 = Introvert, 5 = Extrovert</p>
                  </div>

                  <div className="space-y-2">
                    <Label>Lives With Family</Label>
                    <Select value={formData.livesWithFamily} onValueChange={(value) => setFormData({ ...formData, livesWithFamily: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Do you live with family?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold mb-6">Job Satisfaction</h2>
                  
                  <div className="space-y-2">
                    <Label>Job Satisfaction (1-5)</Label>
                    <div className="flex items-center gap-4">
                      <Slider
                        value={[formData.jobSatisfaction]}
                        onValueChange={([value]) => setFormData({ ...formData, jobSatisfaction: value })}
                        min={1}
                        max={5}
                        step={1}
                        className="flex-1"
                      />
                      <span className="text-2xl font-bold text-primary w-12 text-right">
                        {formData.jobSatisfaction}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">1 = Very Unsatisfied, 5 = Very Satisfied</p>
                  </div>

                  <div className="space-y-2">
                    <Label>Work-Life Balance</Label>
                    <Select value={formData.workLifeBalance} onValueChange={(value) => setFormData({ ...formData, workLifeBalance: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="How is your work-life balance?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Good Balance</SelectItem>
                        <SelectItem value="no">Poor Balance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
                    <h3 className="font-semibold text-lg mb-2">Ready to Submit?</h3>
                    <p className="text-sm text-muted-foreground">
                      Your responses will be analyzed using advanced machine learning models 
                      to provide personalized stress and productivity insights.
                    </p>
                  </div>
                </motion.div>
              )}
            </Card>

            <div className="flex justify-between mt-8">
              {step > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(step - 1)}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>
              )}
              {step < totalSteps ? (
                <Button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="ml-auto"
                >
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button type="submit" className="ml-auto">
                  Submit & View Results
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Brain, LogOut, ArrowRight, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { getStoredUser, clearUser } from '@/lib/auth'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { useToast } from '@/hooks/use-toast'

export default function QuestionnairePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    avgWorkingHours: 8,
    workFrom: '',
    workPressure: 3,
    managerSupport: 3,
    sleepingHabit: 3,
    exerciseHabit: 3,
    jobSatisfaction: 3,
    workLifeBalance: '',
    socialPerson: 3,
    livesWithFamily: '',
    workingState: ''
  })

  useEffect(() => {
    const user = getStoredUser()
    if (!user || user.role !== 'employee') {
      router.push('/login')
    }
  }, [router])

  const handleLogout = () => {
    clearUser()
    router.push('/')
  }

  const calculateStressLevel = (data: typeof formData) => {
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

  const calculateProductivityScore = (data: typeof formData) => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const user = getStoredUser()
    if (!user) {
      toast({
        title: "Error",
        description: "User not found. Please login again.",
        variant: "destructive"
      })
      return
    }

    setIsSubmitting(true)

    try {
      const stressLevel = calculateStressLevel(formData)
      const productivityScore = calculateProductivityScore(formData)

      const { data, error } = await supabase
        .from('questionnaire_responses')
        .insert([
          {
            user_id: user.id,
            user_email: user.email,
            designation: 'Employee',
            work_location: formData.workFrom,
            work_hours_range: `${formData.avgWorkingHours}h`,
            avg_working_hours: formData.avgWorkingHours,
            work_pressure: formData.workPressure,
            manager_support: formData.managerSupport,
            work_life_balance: formData.workLifeBalance,
            sleeping_habit: formData.sleepingHabit,
            exercise_habit: formData.exerciseHabit,
            social_person: formData.socialPerson,
            job_satisfaction: formData.jobSatisfaction,
            stress_level: stressLevel,
            productivity_score: productivityScore
          }
        ])
        .select()

      if (error) throw error

      localStorage.setItem('questionnaireData', JSON.stringify({
        ...formData,
        responseId: data[0].id,
        stressLevel,
        productivityScore
      }))

      toast({
        title: "Success!",
        description: "Your responses have been saved successfully.",
      })

      router.push('/employee/results')
    } catch (error) {
      console.error('Error saving questionnaire:', error)
      toast({
        title: "Error",
        description: "Failed to save your responses. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const totalSteps = 3

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
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Stress & Productivity Assessment</h1>
            <p className="text-muted-foreground text-lg">
              Please answer the following questions honestly. This helps us analyze your stress levels 
              and productivity patterns.
            </p>
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Step {step} of {totalSteps}</span>
              <span className="text-sm text-muted-foreground">{Math.round((step / totalSteps) * 100)}% Complete</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-500"
                style={{ width: `${(step / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <Card className="p-8">
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold mb-6">Work Environment</h2>
                  
                  <div className="space-y-2">
                    <Label>Average Working Hours Per Day</Label>
                    <div className="flex items-center gap-4">
                      <Slider
                        value={[formData.avgWorkingHours]}
                        onValueChange={([value]) => setFormData({ ...formData, avgWorkingHours: value })}
                        min={4}
                        max={16}
                        step={0.5}
                        className="flex-1"
                      />
                      <span className="text-2xl font-bold text-primary w-16 text-right">
                        {formData.avgWorkingHours}h
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Work From</Label>
                    <Select value={formData.workFrom} onValueChange={(value) => setFormData({ ...formData, workFrom: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select work location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="home">Home</SelectItem>
                        <SelectItem value="office">Office</SelectItem>
                        <SelectItem value="hybrid">Hybrid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Work Pressure (1-5)</Label>
                    <div className="flex items-center gap-4">
                      <Slider
                        value={[formData.workPressure]}
                        onValueChange={([value]) => setFormData({ ...formData, workPressure: value })}
                        min={1}
                        max={5}
                        step={1}
                        className="flex-1"
                      />
                      <span className="text-2xl font-bold text-primary w-12 text-right">
                        {formData.workPressure}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">1 = Very Low, 5 = Very High</p>
                  </div>

                  <div className="space-y-2">
                    <Label>Manager Support (1-5)</Label>
                    <div className="flex items-center gap-4">
                      <Slider
                        value={[formData.managerSupport]}
                        onValueChange={([value]) => setFormData({ ...formData, managerSupport: value })}
                        min={1}
                        max={5}
                        step={1}
                        className="flex-1"
                      />
                      <span className="text-2xl font-bold text-primary w-12 text-right">
                        {formData.managerSupport}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">1 = Very Poor, 5 = Excellent</p>
                  </div>

                  <div className="space-y-2">
                    <Label>Working State</Label>
                    <Select value={formData.workingState} onValueChange={(value) => setFormData({ ...formData, workingState: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="karnataka">Karnataka</SelectItem>
                        <SelectItem value="delhi">Delhi</SelectItem>
                        <SelectItem value="mumbai">Mumbai</SelectItem>
                        <SelectItem value="chennai">Chennai</SelectItem>
                        <SelectItem value="hyderabad">Hyderabad</SelectItem>
                        <SelectItem value="pune">Pune</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold mb-6">Lifestyle & Wellbeing</h2>
                  
                  <div className="space-y-2">
                    <Label>Sleeping Habit Quality (1-5)</Label>
                    <div className="flex items-center gap-4">
                      <Slider
                        value={[formData.sleepingHabit]}
                        onValueChange={([value]) => setFormData({ ...formData, sleepingHabit: value })}
                        min={1}
                        max={5}
                        step={1}
                        className="flex-1"
                      />
                      <span className="text-2xl font-bold text-primary w-12 text-right">
                        {formData.sleepingHabit}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">1 = Very Poor, 5 = Excellent</p>
                  </div>

                  <div className="space-y-2">
                    <Label>Exercise Habit (1-5)</Label>
                    <div className="flex items-center gap-4">
                      <Slider
                        value={[formData.exerciseHabit]}
                        onValueChange={([value]) => setFormData({ ...formData, exerciseHabit: value })}
                        min={1}
                        max={5}
                        step={1}
                        className="flex-1"
                      />
                      <span className="text-2xl font-bold text-primary w-12 text-right">
                        {formData.exerciseHabit}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">1 = Never, 5 = Daily</p>
                  </div>

                  <div className="space-y-2">
                    <Label>Social Person (1-5)</Label>
                    <div className="flex items-center gap-4">
                      <Slider
                        value={[formData.socialPerson]}
                        onValueChange={([value]) => setFormData({ ...formData, socialPerson: value })}
                        min={1}
                        max={5}
                        step={1}
                        className="flex-1"
                      />
                      <span className="text-2xl font-bold text-primary w-12 text-right">
                        {formData.socialPerson}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">1 = Introvert, 5 = Extrovert</p>
                  </div>

                  <div className="space-y-2">
                    <Label>Lives With Family</Label>
                    <Select value={formData.livesWithFamily} onValueChange={(value) => setFormData({ ...formData, livesWithFamily: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Do you live with family?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold mb-6">Job Satisfaction</h2>
                  
                  <div className="space-y-2">
                    <Label>Job Satisfaction (1-5)</Label>
                    <div className="flex items-center gap-4">
                      <Slider
                        value={[formData.jobSatisfaction]}
                        onValueChange={([value]) => setFormData({ ...formData, jobSatisfaction: value })}
                        min={1}
                        max={5}
                        step={1}
                        className="flex-1"
                      />
                      <span className="text-2xl font-bold text-primary w-12 text-right">
                        {formData.jobSatisfaction}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">1 = Very Unsatisfied, 5 = Very Satisfied</p>
                  </div>

                  <div className="space-y-2">
                    <Label>Work-Life Balance</Label>
                    <Select value={formData.workLifeBalance} onValueChange={(value) => setFormData({ ...formData, workLifeBalance: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="How is your work-life balance?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Good Balance</SelectItem>
                        <SelectItem value="no">Poor Balance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
                    <h3 className="font-semibold text-lg mb-2">Ready to Submit?</h3>
                    <p className="text-sm text-muted-foreground">
                      Your responses will be analyzed using advanced machine learning models 
                      to provide personalized stress and productivity insights.
                    </p>
                  </div>
                </motion.div>
              )}
            </Card>

            <div className="flex justify-between mt-8">
              {step > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(step - 1)}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>
              )}
              {step < totalSteps ? (
                <Button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="ml-auto"
                >
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button type="submit" className="ml-auto">
                  Submit & View Results
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}
