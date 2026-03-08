import React from 'react'
import { Card } from './ui/card'
import { Circle } from 'lucide-react'

const TaskEmptyState = ({filter}) => {
  return (
      <Card
          className="p-8 bg-card border-2 border-black shadow-sm text-center"
      >
          <div className="space-y-3">
              <Circle className="size-12 mx-auto text-muted-foreground" />
              <div>
                  <h3 className="font-medium text-foreground">
                      {
                        filter === "active" ?
                            "No working tasks yet!" :
                        filter === "completed" ?
                            "No completed tasks yet!" :
                            "No tasks yet!"
                      }
                  </h3>
                  <p className="text-sm text-muted-foreground">
                      {filter === "all" ? "Add tasks to get started!" :
                          `Try changing into "all" to see tasks ${filter === "active" ? "completed" : "working"}!!!`} 
                  </p>
              </div>
          </div>
          
    </Card>
  )
}

export default TaskEmptyState
