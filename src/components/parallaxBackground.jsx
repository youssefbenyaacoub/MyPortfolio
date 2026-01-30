const ParallaxBackground = () => {
  return (
    <div
      className="absolute inset-0 z-0"
      style={{
        backgroundImage: "url(/assets/space.avif)",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundColor: "#000000",
      }}
    />
  );
};

export default ParallaxBackground;
