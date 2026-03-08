import React from 'react'

const Footer = ({ completedTasksCount = 0, activeTasksCount = 0 }) => {
  return <>
    {completedTasksCount + activeTasksCount > 0 && (
      <div className="text-center">
        <p className="text-sm text-muted-foreground"> 
          {
            completedTasksCount > 0 && (
              <>
                Great job! You've completed {completedTasksCount} tasks! 🎉️ 🎉
                {activeTasksCount > 0 && `, keep going! You have ${activeTasksCount} tasks left to complete! ️🎊️ 🎊`}
              </>
            )
          }

          {
            completedTasksCount === 0 && activeTasksCount > 0 && (
              <>You have {activeTasksCount} tasks to complete, let's get started! ✊ ✊</>
            )
          }
        </p>
      </div>

    )}
  </>
}

export default Footer
