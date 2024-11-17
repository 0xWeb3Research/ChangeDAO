import Link from 'next/link';

export const Hero = () => {
  return (
    <main
      className="min-h-[75vh] max-w-7xl mx-auto px-4 py-16 text-center flex flex-col justify-center items-center"
      style={{ backgroundImage: 'url(/worldmap.gif)', backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <h1 className="text-4xl font-bold mb-6 text-gray-900">
        Social impact through traditional activism and digital economy
      </h1>
      <p className="text-xl mb-8 font-bold ">
        <Link href="#" className="text-gray-500 hover:underline">
          Thousands of Victories every day.
        </Link>
      </p>
      <Link
        href="/start-petition"
        className="inline-block bg-red-500 text-white px-8 py-3 rounded-md hover:bg-red-600 transition-colors"
      >
        Start a petition
      </Link>
    </main>
  );
};