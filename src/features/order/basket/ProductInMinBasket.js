
import "./ProductInMinBasket.css"
const ProductInMinBasket = ({ product }) => {

    return (<div className="all-item">

        <div className="itemInMinBasket">

            <div className="box"><img src={product.urlImg} /></div>

            <div className="box">
                <br />
                <br />
                <br />
                <br />
                <span className="blod">item#: </span>{product.model}3333333333
                <br />
                <br />
                <span className="blod">Qty: </span>{product.count}
            </div>
        </div>
        <span className="blod">price: </span>{'$' + Number(product.price).toLocaleString('en')}
    </div>


    );
}

export default ProductInMinBasket;