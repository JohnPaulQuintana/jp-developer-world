import { Sparkles } from "lucide-react";

export default function MapHeading() {
  return (
    <section className="map-heading">
      <span className="eyebrow">
        <Sparkles size={13} />
        A WORLD SHAPED BY CODE
      </span>

      <h1>
        The Developer's <span>Realm</span>
      </h1>

     <p>Explore the projects, skills, and stories behind my journey.</p>
    </section>
  );
}