import "./card.scss";

const Card = ({ supplier, handleEdit, top }) => {
  return (
    <div className="cardContainer">
      <div className={`editButton ${top.id === supplier.id ? "Editing" : "Edit"}`} onClick={()=>handleEdit(supplier)}>{top.id === supplier.id ? "Editing" : "Edit"}</div>
      <h1 className="title">{supplier.name}</h1>
        <img src={supplier.image} alt="" className="itemImg" />
      <div className="details">
        <div className="detailItem">
          <span className="itemKey">Website:</span>
          <hr/>
          <a className="itemValue" href={supplier.website}>{supplier.website}</a>
        </div>
      </div>
    </div>
  );
};

export default Card;
