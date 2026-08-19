import React from 'react'
import Sidebar from './Sidebar'
import TopBar from './TopBar'

interface PageWrapperProps {
  title: string
  subtitle?: string
  children: React.ReactNode
}

const PageWrapper: React.FC<PageWrapperProps> = ({ title, subtitle, children }) => {
  return (
    <div className="flex h-screen overflow-hidden bg-bg-base">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopBar title={title} subtitle={subtitle} />
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-6 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

export default PageWrapper
