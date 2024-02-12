const Hero = () => {
  return (
    <>
      <div className="bg-sky-800 pb-2">
        <div className="container max-sm:px-2.5 mx-auto flex flex-col gap-2">
          <h1 className="text-3xl md:text-5xl text-white font-bold">
            Enjoy the finest stays
          </h1>
          <p className="text-xl md:text-2xl text-white">
            Find low prices on hotels for your dream vacation...
          </p>
        </div>
      </div>
      <div className="bg-hero-pattern h-12 md:h-20"></div>
    </>
  );
};

export default Hero;
