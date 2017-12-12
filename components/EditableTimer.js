import React from 'react'

import Timer from './Timer'
import TimerForm from './TimerForm'

export default function EditableTmer({
  id,
  title,
  project,
  elapsed,
  isRunning,
  editFormOpen
}) {
  if (editFormOpen) {
    return <TimerForm id={id} title={title} project={project} />
  }
  return (
    <Timer
      id={id}
      title={title}
      elapsed={elapsed}
      project={project}
      isRunning={isRunning}
    />
  )
}
