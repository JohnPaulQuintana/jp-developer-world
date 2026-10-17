import { Compass } from 'lucide-react'

export default function MapHeading() {
  return (
    <section className="map-heading">
      <span className="eyebrow">
        <Compass size={13} />
        THE ENCHANTED REALM / 01
      </span>

      <h1>
        Explore my <span>world.</span>
      </h1>

      <p>
        Follow the forest paths and discover the work, skills, and stories
        behind my journey as a developer.
      </p>
    </section>
  )
}