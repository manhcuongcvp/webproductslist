import { Component } from 'react';
import ProductList from "./../../components/ProductList/ProductList"
import ProductItem from './../../components/ProductItem/ProductItem'
import { connect } from 'react-redux'
import callApi from './../../utils/apiCaller'
import { Link } from 'react-router-dom'

class ProductListPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        }
    }

    componentDidMount() {
        callApi('products', 'GET', null).then(res => {
            this.setState({
                products: res.data
            })
        })
    }

    onDelete = (id) => {
        callApi(`products/${id}`, 'DELETE', null).then(res => {
            if (res.status === 200) {
                let cuProducts = this.state.products;
                cuProducts = cuProducts.filter(item => item.id !== id);
                this.setState({
                    products: cuProducts
                })
            }
        })
    }

    render() {
        var products = this.state.products;

        return (
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12" >
                <Link to="/product/add" className="btn btn-info btn-mg">
                    Thêm Sản Phẩm
                </Link>
                <ProductList>
                    {this.showProducts(products)}
                </ProductList>
            </div >
        );
    }

    showProducts(products) {
        var result = null;

        if (products.length > 0) {
            result = products.map((product, index) => {
                return (
                    <ProductItem
                        key={index}
                        product={product}
                        index={index}
                        onDelete={this.onDelete}
                    />
                )
            })
        }

        return result;
    }
}


const mapStatetoProps = (state) => {
    return {
        products: state.products
    }
}

export default connect(mapStatetoProps, null)(ProductListPage);
