import { Component } from 'react';
import ProductList from "./../../components/ProductList/ProductList"
import ProductItem from './../../components/ProductItem/ProductItem'
import callApi from '../../utils/apiCaller';

class ProductActionPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            txtName: '',
            txtPrice: '',
            chkbStatus: ''
        }
    }

    componentDidMount() {
        var { match } = this.props
        if (match) {
            var id = match.params.id
            callApi(`products/${id}`, 'GET', null).then(res => {
                var data = res.data
                this.setState({
                    id: data.id,
                    txtName: data.name,
                    txtPrice: data.price,
                    chkbStatus: data.status
                })
            })
        }
    }

    onChange = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.type === 'checkbox' ? target.checked : target.value
        this.setState({
            [name]: value
        })
    }

    onSave = (e) => {
        var { id, txtName, txtPrice, chkbStatus } = this.state;
        var { history } = this.props;
        e.preventDefault();
        if (!txtName || !txtPrice) alert("Error"); else {
            if (id) {
                callApi(`products/${id}`, 'PUT', {
                    name: txtName,
                    price: txtPrice,
                    status: chkbStatus
                }).then(res => {
                    history.goBack();
                })
            } else {
                callApi('products', 'POST', {
                    name: txtName,
                    price: txtPrice,
                    status: chkbStatus
                }).then(res => {
                    history.goBack();
                })
            }
        }

    }

    render() {
        var { txtName, txtPrice, chkbStatus } = this.state
        return (
            < div className="col-xs-6 col-sm-6 col-md-6 col-lg-6" >
                <form onSubmit={this.onSave}>
                    <div className="form-group">
                        <label>Tên Sản Phẩm: </label>
                        <input
                            type="text"
                            className="form-control"
                            name="txtName"
                            value={txtName}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Giá Sản Phẩm: </label>
                        <input
                            type="number"
                            className="form-control"
                            name="txtPrice"
                            value={txtPrice}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Trạng thái </label>
                    </div>

                    <div className="checkbox">
                        <label>
                            <input
                                type="checkbox"
                                name="chkbStatus"
                                value={txtPrice}
                                onChange={this.onChange}
                                checked={chkbStatus}
                            />
                            Còn hàng
                        </label>
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>

            </div >
        );
    }
}

export default ProductActionPage;
