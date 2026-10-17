import { Map } from 'lucide-react'

export default function MapHeading() {
  return (
    <section className="map-heading">
      <span className="eyebrow">
        <Map size={13} />
        WORLD MAP / 01
      </span>

      <h1>
        Explore my <span>world.</span>
      </h1>

      <p>Select a tile to discover more.</p>
    </section>
  )
}