import React, { useEffect, useState } from 'react'
import './images.css';


function Images() {
  const [imgInput, setimgInput] = useState(null);
  const [showImg, setshowImg] = useState(false);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    setshowImg(false)
  }, [imgInput]);
  const allImages =
    [
      { id: 1, image: './ocr_pics/1.jpg', out: './output/1.png' },
      { id: 2, image: './ocr_pics/2.jpg', out: './output/2.png' },
      { id: 3, image: './ocr_pics/3.jpg', out: './output/3.png' },
      { id: 4, image: './ocr_pics/4.jpg', out: './output/4.png' },
      { id: 5, image: './ocr_pics/5.jpg', out: './output/5.png' },
      { id: 6, image: './ocr_pics/6.jpg', out: './output/6.png' },
      { id: 7, image: './ocr_pics/7.jpg', out: './output/7.png' },
      { id: 8, image: './ocr_pics/8.jpg', out: './output/8.png' },
      { id: 9, image: './ocr_pics/9.jpg', out: './output/9.png' },
      { id: 10, image: './ocr_pics/10.jpg', out: './output/10.jpg' }
    ]
  const [path_clicked, setpath_clicked] = useState("");
  const image_clicked = (item) => {
    setpath_clicked(item.image)
    setimgInput(item)
  }
const checkHandler=()=>{
  setshowImg(false)
  setloading(true)
  var time_rand = Math.floor(Math.random() * (6 - 3 + 1)) + 3;
  console.log(time_rand);
  const timer = setTimeout(() => {
    setloading(false)
    setshowImg(true)
  }, time_rand*1000);
}
  return (
    <div >
      <div className='container_upper'>
        <div className='images'>
          {allImages.map((item) => (
            <div key={item.id} onClick={() => image_clicked(item)} style={{ display: "flex", flexDiretion: "column", justifyContent: "center" }}>
              <img src={item.image} className="image-display" />
            </div>
          ))}

        </div>
        <p style={{ fontWeight: "600" }}>{path_clicked}</p>
      </div>
      {
        imgInput ?
          <div className='lower_div'>
            <div className='image_div'>
              <img src={imgInput.image} className="image_check" />
            </div>
            <button className='run_btn' onClick={checkHandler} >Check</button>
            <div className='image_div'>
              {showImg ? <img className="image_check"  src={imgInput.out}  /> 
              : loading ? <img className='loading_gif' src='loading_gif.gif'></img> : <></>}

            </div>
          </div> : <></>
      }
    </div>
  )
}

export default Images
