import { Suspense } from 'react'
import OutputContent from "@/pages/OutputContent"

function OutputContentWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OutputContent />
    </Suspense>
  )
}

export default function OutputContentPage() {
  return <OutputContentWrapper />
}
