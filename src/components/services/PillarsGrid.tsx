import { SERVICE_PILLARS } from '@/content/service-pillars';
import { PillarCard } from './PillarCard';

export function PillarsGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
      {SERVICE_PILLARS.map((p) => (
        <PillarCard key={p.id} pillar={p} />
      ))}
    </div>
  );
}
