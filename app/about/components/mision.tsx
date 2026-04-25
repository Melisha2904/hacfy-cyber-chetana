import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { BorderBeam } from "../../../components/magicui/border-beam";

export function Mission() {
  const vision = [
    {
      id: 1,
      desc: "To be recognized as the preeminent cybersecurity partner of choice, empowering organizations across global markets with comprehensive security intelligence, elite penetration testing expertise, and innovative defensive strategies that transform vulnerability into resilience in an ever-evolving threat landscape.",
    },
  ];

  const mission = [
    {
      id: 2,
      desc: "CyberProbeX is committed to fortifying organizational security postures through advanced penetration testing methodologies, strategic risk intelligence, and comprehensive compliance frameworks. We empower enterprises to navigate the evolving threat landscape with confidence by delivering actionable security insights, adaptive defense mechanisms, and sustainable resilience strategies that transform security from a barrier into a business enabler.",
    },
  ];

  return (
    <div className="w-full flex flex-col items-center px-4 md:px-6 lg:px-8 space-y-10 min-h-screen justify-center">

      <div className="text-center w-full">
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold mb-4 md:mb-6" style={{ color: "var(--primary-orange)" }}>
          VISION
        </h1>
        <div className="w-full max-w-4xl mx-auto">
          {vision.map((item) => (
            <Card
              key={item.id}
              className="relative border bg-white p-4 sm:p-6 shadow-lg overflow-hidden transition-transform duration-500 hover:-translate-y-2 ease-in"
            >
              <CardContent>
                <CardDescription className="text-sm sm:text-lg" style={{ color: "var(--primary-blue)" }}>
                  {item.desc}
                </CardDescription>
              </CardContent>
              <BorderBeam duration={8} size={100} />
            </Card>
          ))}
        </div>
      </div>


      <div className="text-center w-full">
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold mb-4 md:mb-6" style={{ color: "var(--primary-orange)" }}>
          MISSION
        </h1>
        <div className="w-full max-w-4xl mx-auto">
          {mission.map((item) => (
            <Card
              key={item.id}
              className="relative border bg-white p-4 sm:p-6 shadow-lg overflow-hidden transition-transform duration-500 hover:-translate-y-2 ease-in"
            >
              <CardContent>
                <CardDescription className="text-sm sm:text-lg" style={{ color: "var(--primary-blue)" }}>
                  {item.desc}
                </CardDescription>
              </CardContent>
              <BorderBeam duration={8} size={100} />
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
