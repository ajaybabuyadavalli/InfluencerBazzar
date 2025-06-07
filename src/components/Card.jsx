export default function Card({ title, description, delay = 0 }) {
  return (
    <div
      className="group p-8 border border-white/10 dark:border-white/20 rounded-2xl bg-white/5 dark:bg-white/5 backdrop-blur-lg transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_20px_60px_rgba(255,255,255,0.1)] animate-slide-up cursor-pointer"
      style={{ animationDelay: `${delay}s` }}
    >
      <h2 className="text-2xl font-semibold mb-4 text-indigo-500 dark:text-indigo-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors duration-300">
        {title}
      </h2>

      <p className="leading-relaxed opacity-90 text-gray-700 dark:text-gray-300 group-hover:opacity-100 transition-opacity duration-300">
        {description}
      </p>
    </div>
  );
}
