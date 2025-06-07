import Card from "../components/Card";

export default function Home() {
  const features = [
    {
      title: "Find Influencers",
      description:
        "Discover influencers that match your brand values and target audience.",
    },
    {
      title: "Collaborate",
      description:
        "Connect and collaborate with influencers to create authentic content.",
    },
    {
      title: "Grow Your Brand",
      description:
        "Expand your reach and grow your brand through strategic partnerships.",
    },
  ];

  return (
    <main className="flex flex-col justify-between items-center px-4 py-24 md:px-24 min-h-screen">
      <div className="flex flex-col items-center max-w-6xl w-full">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-4 gradient-text animate-fade-in">
          Welcome to InfluencerBazzar
        </h1>

        <p className="text-xl md:text-2xl text-center mb-16 opacity-80 animate-slide-up">
          Connect with influencers and grow your brand
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl">
          {features.map((feature, index) => (
            <Card
              key={index}
              title={feature.title}
              description={feature.description}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
