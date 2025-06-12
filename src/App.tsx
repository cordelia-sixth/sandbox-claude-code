import { useState } from 'react'
import './App.css'

type FormData = {
  name: string
  email: string
  area: string
  plan: string
}

function App() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    area: '',
    plan: ''
  })

  const steps = [
    { id: 1, label: '個人情報' },
    { id: 2, label: 'エリア選択' },
    { id: 3, label: 'プラン選択' }
  ]

  const areas = ['大阪', '東京', '名古屋', '福岡']
  const plans = ['ベーシック', 'スタンダード', 'プレミアム']

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.name.trim() !== '' && formData.email.trim() !== ''
      case 2:
        return formData.area !== ''
      case 3:
        return formData.plan !== ''
      default:
        return false
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                氏名<span className="text-red-500 ml-1">必須</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="タナカ タロウ"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                メールアドレス<span className="text-red-500 ml-1">必須</span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="****@example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )
      case 2:
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              お住まいのエリアを選択してください<span className="text-red-500 ml-1">必須</span>
            </label>
            <div className="space-y-2">
              {areas.map((area) => (
                <label key={area} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="area"
                    value={area}
                    checked={formData.area === area}
                    onChange={(e) => handleInputChange('area', e.target.value)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-gray-700">{area}</span>
                </label>
              ))}
            </div>
          </div>
        )
      case 3:
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              プランをお選びください<span className="text-red-500 ml-1">必須</span>
            </label>
            <div className="space-y-2">
              {plans.map((plan) => (
                <label key={plan} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="plan"
                    value={plan}
                    checked={formData.plan === plan}
                    onChange={(e) => handleInputChange('plan', e.target.value)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-gray-700">{plan}</span>
                </label>
              ))}
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep >= step.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {step.id}
              </div>
              <span className="ml-2 text-xs text-gray-600">{step.label}</span>
              {index < steps.length - 1 && (
                <div
                  className={`w-8 h-0.5 mx-2 ${
                    currentStep > step.id ? 'bg-blue-500' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Form Content */}
        <div className="mb-8">
          <div className="text-blue-500 text-sm font-medium mb-2">EFOcats</div>
          {renderStepContent()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={handlePrev}
            disabled={currentStep === 1}
            className={`px-4 py-2 rounded-md ${
              currentStep === 1
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gray-500 text-white hover:bg-gray-600'
            }`}
          >
            戻る
          </button>
          
          <div className="text-sm text-gray-500">
            {currentStep} / 3
          </div>

          <button
            onClick={handleNext}
            disabled={!isStepValid() || currentStep === 3}
            className={`px-4 py-2 rounded-md ${
              !isStepValid() || currentStep === 3
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            {currentStep === 3 ? '完了' : '次へ'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
