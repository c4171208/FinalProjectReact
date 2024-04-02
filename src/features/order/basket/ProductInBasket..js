import { decreaseProduct, deleteFromBasket, increaseProduct, addToOrder, cancleToOrder } from "./basketSlice";
import { useDispatch, useSelector } from 'react-redux'
import { useState } from "react";
import "./ProductInBasket.css";
import { IoCloseOutline } from "react-icons/io5";
import { VscAdd } from "react-icons/vsc";
import { HiMinus } from "react-icons/hi2";

const ProductInBasket = ({ product }) => {
  const dispatch = useDispatch()
  const [checked, setChecked] = useState(false);

  return (
    <div className="all-item-basket">

      <div className="itemBasket">

        <div className="box1">
          <img src={product.urlImg} />
        </div>

        <div className="box1">
          {product.description}
          <br />
          <span className="blod1">item# </span>
          {product.model}
        </div>

        <br />

        <div className="box1">
          <span className="blod1">Each </span>
          <br />
          {'$' + Number(product.price).toLocaleString('en')}
        </div>

        <div className="box1">
          <span className="blod1">Qty </span>
          <br />
          <button onClick={() => dispatch(decreaseProduct(product))} ><HiMinus /></button>

          {product.count}
          <button onClick={() => dispatch(increaseProduct(product))} ><VscAdd /></button>
        </div>

        <div className="box1">
          <span className="blod1">Total </span>
          <br />
          {'$' + Number((product.price) * (product.count)).toLocaleString('en')}
        </div>

       

        <div className="box1" id="close">
          <button onClick={() => dispatch(deleteFromBasket(product))} >  <IoCloseOutline size={"3em"} /></button>

        </div>

      </div>

    </div>
  );
}

export default ProductInBasket;
