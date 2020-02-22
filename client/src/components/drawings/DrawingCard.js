import React from 'react'
import {Link} from 'react-router-dom'
import {Col }from 'react-bootstrap'

// let urls = new WeakMap()

// let blobUrl = blob => {
//   if (urls.has(blob)) {
//     return urls.get(blob)
//   } else {
//     let url = URL.createObjectURL(blob)
//     urls.set(blob, url)
//     return url
//   }
// }


export default function DrawingCard(props) {
  // let file  = JSON.stringify(props.image)

  // let url = file && blobUrl(file)
  // console.log(url)
// console.log(typeof file)
  // let what = URL.createObjectURL(new Blob(file))


  const articleStyle = {
    position: 'relative',
    backgroundImage: 'url(' + props.image + ')',
    backgroundSize: 'cover',
    backgroundPosition: '70% 30%',
    backgroundReapeat: 'no-repeat',
    height: '300px',   
  };
  const linkStyle = {
    textDecoration: 'none'
  }

  return (
      <Col lg={4} xs={12} md={6}>
      <article className="drawing-card-container" >
          <Link style={linkStyle}  to={`/drawing/${props.id}`}>
            <h1>{props.title}</h1>
            <p>Author: {props.name}</p>
            <p>Price: {props.price}$</p>
            <p>{props.description}</p>
            <div style={articleStyle} ></div>           
          </Link>
      </article>
      </Col>
  )
}
