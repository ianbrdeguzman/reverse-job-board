export default function Home() {
  return (
    <div className="h-screen flex flex-col justify-center items-center text-center">
      <div className="px-2">
        <h1 className="text-3xl font-extrabold sm:text-5xl md:text-6xl">
          <span className="block text-gray-600">The reverse job board for</span>
          <span className="block text-gray-800">Filipinos in Canada</span>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          HireFilipinos empowers Filipino workers available for their next gig.
          <span className="block">
            Stop scouring job boards and let companies who value hardwork reach
            out to you.
          </span>
        </p>
      </div>
    </div>
  );
}
