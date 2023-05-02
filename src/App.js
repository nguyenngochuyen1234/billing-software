import React from 'react'
import { useState, createContext } from 'react'
import SettingPage from './SettingPage'
import MainPage from './MainPage'
import { AppProvider } from './AppContext'
const App = () => {



  const [settingData, setSettingData] = useState({
    tuitionFee: '',
    universityGraduation: '',
    master: '',
    doctorate: '',
    associateProfessor: '',
    professor: '',
  })
  return (
    <div>
      <AppProvider>
        <SettingPage setSettingData={setSettingData} />
        <MainPage settingData={settingData} />
      </AppProvider>
    </div>
  )
}

export default App