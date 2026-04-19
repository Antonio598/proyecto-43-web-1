'use client'

import React from 'react'
import { experiences } from '@/lib/experiences'
import ExperienceCard from './ExperienceCard'

export default function ExperiencesGrid() {
  // En triptenerife todo está listado y tiene botones para cargar más. Por ahora mostraremos todos.
  return (
    <div className="flex flex-col gap-4">
      {experiences.map((exp, index) => (
        <ExperienceCard
          key={exp.id}
          experience={exp}
          index={index}
          onOpenModal={() => {}}
        />
      ))}
    </div>
  )
}
