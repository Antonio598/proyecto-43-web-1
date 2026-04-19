'use client'

import React from 'react'
import { useSearchParams } from 'next/navigation'
import { experiences } from '@/lib/experiences'
import ExperienceCard from './ExperienceCard'

export default function ExperiencesGrid() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q')?.toLowerCase().trim() ?? ''

  const filtered = query
    ? experiences.filter(
        (exp) =>
          exp.title.toLowerCase().includes(query) ||
          exp.subtitle.toLowerCase().includes(query) ||
          exp.description.toLowerCase().includes(query) ||
          exp.category.toLowerCase().includes(query)
      )
    : experiences

  return (
    <div id="experiencias" className="flex flex-col gap-4">
      {query && (
        <p className="text-sm text-[#666] mb-1">
          {filtered.length > 0
            ? `${filtered.length} result${filtered.length > 1 ? 's' : ''} for "${query}"`
            : `No results for "${query}"`}
        </p>
      )}
      {filtered.length === 0 ? (
        <div className="bg-white border border-gray-100 p-8 text-center text-[#999] rounded shadow-sm">
          <p className="text-lg font-medium mb-2">No activities found</p>
          <a href="/" className="text-[#3399ff] hover:underline text-sm">View all activities</a>
        </div>
      ) : (
        filtered.map((exp, index) => (
          <ExperienceCard key={exp.id} experience={exp} index={index} onOpenModal={() => {}} />
        ))
      )}
    </div>
  )
}
