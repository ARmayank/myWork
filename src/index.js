import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class ProductCategoryRow extends React.Component{
  render(){
    const category = this.props.category;
    return(
      <tr>
        <th colSpan="2">
          {category}
        </th>
      </tr>
    )
  }
}

class ProductRow extends React.Component{
  render(){
    const product = this.props.product;
    const name = product.stocked ? product.name : 
    <span style={{color: 'red'}}>
        {product.name}
      </span>;
    return(
      <tr>
        <td>{name}</td>
        <td>{product.price}</td>
      </tr>
    )
  }
}

class ProductTable extends React.Component{
  render(){
    const filterText = this.props.filterText;
    const isStockOnly = this.props.isStockOnly;

    const products = this.props.products;
    const rows = [];
    let lastCategory = null;
    
    products.forEach(product => {
      if(product.name.indexOf(filterText) === -1){
        return;
      }
      if(isStockOnly && !product.stocked){
        return;
      }
      if(product.category !== lastCategory){
        rows.push(
          <ProductCategoryRow category={product.category} key={product.category} />
        )
      }
      
      rows.push(
        <ProductRow product={product} key={product.name} />
      )

      lastCategory = product.category;   
    })

    return(
      <table>
        <thead>
          <th>Name</th>
          <th>price</th>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    )
  }
}

class SearchBar extends React.Component{
    constructor(props){
      super(props);
      this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
      this.handleStockOnlyChange = this.handleStockOnlyChange.bind(this);
    }

    handleFilterTextChange(e){
      this.props.onFilterTextChange(e.target.value);
    }

    handleStockOnlyChange(e){
      this.props.onFilterStockOnlyChange(e.target.checked);
    }

    render(){
      const filterText = this.props.filterText;
      const isStockOnly = this.props.isStockOnly;
    return(
      <div>
      <input type="text" placeholder = "Search...." value={filterText} 
      onChange={this.handleFilterTextChange}/>
      <p>
        <input type="checkbox" checked = {isStockOnly}
        onChange={this.handleStockOnlyChange}/>
        {""}
        Only show products in stock  
      </p>
      </div>
    )
  }
}

class FilterableProductTable extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      filterText : '',
      isStockOnly : false
    }

    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleStockOnlyChange = this.handleStockOnlyChange.bind(this);
  }

  handleFilterTextChange(filterText){
    this.setState({
      filterText : filterText
    })
  }

  handleStockOnlyChange(isStockOnly){
    this.setState({
      isStockOnly : isStockOnly
    })
  }
  
  render(){
    return(
      <div>
      <SearchBar filterText={this.state.filterText} isStockOnly={this.state.isStockOnly}
      onFilterTextChange={this.handleFilterTextChange}
      onFilterStockOnlyChange={this.handleStockOnlyChange}/>

      <ProductTable products = {this.props.products} filterText={this.state.filterText}
      isStockOnly={this.state.isStockOnly}/>
      </div>
    )
  }
}


const PRODUCTS = [
  { category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football' },
  { category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball' },
  { category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball' },
  { category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch' },
  { category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5' },
  { category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7' }
];

ReactDOM.render(
  <FilterableProductTable products = {PRODUCTS} />,
  document.getElementById('container')
)

