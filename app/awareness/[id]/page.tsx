import { awarenessData } from "@/lib/awareness-data";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, PlayCircle } from "lucide-react";

export default function AwarenessPage({ params }: { params: { id: string } }) {
  const data = awarenessData[params.id as keyof typeof awarenessData];

  if (!data) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-zinc-50 pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <Link 
          href="/#pledge" 
          className="inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-700 font-medium mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Home
        </Link>

        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-slate-900">
            {data.title}
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed max-w-3xl">
            {data.description}
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              <h2 className="text-2xl font-bold mb-6 text-slate-800">Overview</h2>
              <div className="prose prose-slate max-w-none">
                {data.content.split('\n').map((line, i) => (
                  <p key={i} className="mb-4 text-slate-600 leading-7">
                    {line.trim()}
                  </p>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6 text-slate-800 flex items-center gap-2">
                <PlayCircle className="text-orange-500" />
                Related Educational Videos
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.videos.map((video, i) => (
                  <div key={i} className="bg-white rounded-xl overflow-hidden shadow-md border border-slate-100 group">
                    <div className="aspect-video relative">
                      <iframe
                        src={video.url}
                        title={video.title}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-slate-800 group-hover:text-cyan-600 transition-colors">
                        {video.title}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-cyan-900 text-white p-8 rounded-2xl shadow-xl">
              <h3 className="text-xl font-bold mb-4 text-orange-400">Join the Movement</h3>
              <p className="text-cyan-100 text-sm mb-6 leading-relaxed">
                Become a Cyber Chetana Ambassador today and help us create a safer digital society.
              </p>
              <Link 
                href="/login" 
                className="block w-full text-center bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition-all"
              >
                Take the Pledge
              </Link>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200">
              <h3 className="font-bold mb-4 text-slate-800">Quick Tips</h3>
              <ul className="space-y-3 text-sm text-slate-600">
                <li className="flex gap-2">
                  <span className="text-orange-500 font-bold">•</span>
                  Never share OTPs with anyone.
                </li>
                <li className="flex gap-2">
                  <span className="text-orange-500 font-bold">•</span>
                  Use two-factor authentication.
                </li>
                <li className="flex gap-2">
                  <span className="text-orange-500 font-bold">•</span>
                  Report cybercrime at cybercrime.gov.in
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
