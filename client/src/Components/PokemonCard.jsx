import StyledCard from "../Styles/StyledCard";

String.prototype.capitalizeFirstLetter = function () {
  if (this) {
    return this.charAt(0).toUpperCase() + this.slice(1);
  }
};

export default function PokemonCard({ name, image, type }) {

    var types = type.split(", ")


  return (
    <StyledCard>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#89B5AF",
          border: "16px solid",
          borderRadius: "15px",
          borderColor: "#89B5AF",
        }}
      >
        <img
          src={image}
          alt="imagen"
          style={{
            maxHeight: "90px",
            maxWidth: "100px",
            borderRadius: "10px",
            height: "125px",
          }}
        />
      </div>

      <div>
        <h2 style={{ height: "20px", justifySelf: "flex-end", width: "132px" }}>
          {" "}
          {name.capitalizeFirstLetter()}
        </h2>

        <span>{types[0].capitalizeFirstLetter()}</span>
        <br />
        {types[1] ? (
          <span>{types[1].capitalizeFirstLetter()}</span>
        ) : (
          console.log("hola")
        )}
      </div>
    </StyledCard>
  );
}
