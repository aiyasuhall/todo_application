import React from 'react'
import { Badge } from './ui/badge'
import { FilterType } from '@/lib/data'
import { Button } from './ui/button'
import { Filter, Trash2 } from 'lucide-react'


const StatsAndFillters = ({completedTasksCount = 0, activeTasksCount = 0, filter = "all", setFilter, handleDeleteAllTasks}) => {
  return (
    <div className="flex flex-col sm:flex-row items-start justify-between sm:items-center gap-4">
      
      {/* phần thống kê */}
      <div className="flex gap-3">
        <Badge
          variant="secondary"
          className="bg-white/50 text-accent-foreground border-info/20"
        >
          {activeTasksCount} {FilterType.active}
        </Badge>

        <Badge
          variant="secondary"
          className="bg-white/50 text-success border-success/20"
        >
          {completedTasksCount} {FilterType.completed}
        </Badge>

      </div>

      {/* phần bộ lọc */}
      <div className="flex flex-col gap-2 sm:flex-row">
        {
          Object.keys(FilterType).map((type) => (
            <Button
              key={type}
              variant={filter === type ? "gradient" : "ghost"}
              size="sm"
              className="capitalize"
              onClick={() => setFilter(type)}
            >
              <Filter className="size-4" />
              {FilterType[type]}

            </Button>
          ))}
        
        {/* Nút Delete All */}
          <Button 
            variant="outline" 
            size="sm" 
            className="text-black border-2 border-black hover:bg-black hover:text-white rounded-md transition-colors"
            onClick={handleDeleteAllTasks}
          >
            <Trash2 className="size-4 mr-1" />
            Delete All
          </Button>
      </div>

    </div>
  )
}

export default StatsAndFillters
