const { useNavigate } = require("react-router-dom");

// import photo from "@/assets/convention-photo.jpg";

const Logo = ({ classname }) => {
  const navigate = useNavigate();
  return (
    <img
      //   src={photo}
      alt="Logo"
      className={`size-16 cursor-pointer rounded-full transition hover:scale-105 ${classname}`}
      onClick={() => navigate("/")}
      loading="lazy"
    />
  );
};

export default Logo;
