import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from "react-responsive-carousel"
import "./style.css"
import StarRatings from "react-star-ratings"
import 'font-awesome/css/font-awesome.min.css'

const numPrettier = (num)=>{
  if (num){ 
    num = String(num)
    if(Number.isInteger(num.length/3)){
      return num.split(/(\d{3})/).join(" ")
    }else{
      let j = num.length
      j = num.length > 3 ? j % 3 : 0 
      
      return j ? num.substr(0, j) + " " : "" + num.substr(j).replace(/(\d{3})(?=\d)/g, " ")
    }
  }else{
    return null
  }  
}

class Advertisement extends React.Component{
  state={btnClass:''}
  setFavourite = (e) => {
    let productWithClass = this.props.product
    productWithClass.class = 'btn-floating-favourite'
    console.log(productWithClass)
    let favouriteProduct = JSON.stringify(productWithClass)
    localStorage.setItem(this.props.product.id, favouriteProduct)
    this.setState({btnClass:'btn-floating-favourite'})
  }
  render(){
    const {product} = this.props
    const btnClass = 'btn-floating-favourite'; 
    return(
        <article className="adverisements_advertisement advertisement row">
          <div className="col s12">
            <div className="card ">
              <div className="card-image">
                <Carousel  showThumbs={false}>{product.pictures.map((picture, i)=><img src={picture} key={i}/>)}</Carousel>
                <span className="advertisement_title card-title">{product.title}</span>
                <button className="btn-floating halfway-fab waves-effect waves-light " onClick={this.setFavourite} id={this.props.product.id} ><i className={`fa fa-heart ${this.state.btnClass?this.state.btnClass:this.props.product.class}`}></i></button>
              </div>
              <div className="card-content">
                <StarRatings rating={product.seller_rating} starRatedColor="gold" numberOfStars={5} name='rating'/>         
                <div className="advertisement_price">{numPrettier(product.price)}₽</div>
                <div className="advertisement_name">{product.seller_name}</div>
              </div>
            </div>           
          </div>
        </article>
    )
  }
}
export default Advertisement