const FormHeader = ({ title, subtitle, className }) => (
  <h2
    className="text-xl font-semibold mb-4 text-white px-3 py-2 rounded text-center"
    style={{ backgroundImage: "linear-gradient(to right, #f9804c, #fab07c)" }}
  >
    {title}{" "}
    {subtitle && (
      <div className={`text-m font-normal text-white/80 ${className}`}>
        ({subtitle})
      </div>
    )}
  </h2>
);

export default FormHeader;
