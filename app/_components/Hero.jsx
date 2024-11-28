import React from "react";

function Hero() {
  return (
    <div>
      <section className="bg-gray-50">
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
          <div className="mx-auto max-w-xl text-center">
            <h1 className="text-3xl text-primary font-extrabold sm:text-5xl">
              AI Course Generator.
              <strong className="font-extrabold text-black sm:block">
                {" "}
                Custom Learning Paths, Powered By AI.{" "}
              </strong>
            </h1>

            <p className="mt-4 sm:text-xl/relaxed">
              Unlock Personalized Education with AI driven course creation.
              Tailor your learnign journey ot fit your unique goals and pace.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                className="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
                href="#"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Hero;
