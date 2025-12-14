const ParallaxBackground = () => {
  return (
    <section 
      className="absolute inset-0" 
      style={{
        backgroundImage: "url(/assets/space.jpg)",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundColor: "#000000",
      }}
    />
  );
};

export default ParallaxBackground;
