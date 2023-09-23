import { useEffect, useState } from "react"
import axios from 'axios';
import logo from '../img/KeazoNBOOKS.svg';
import logoimg from '../img/logo.svg';
import heartshap from '../img/heartbox.svg'
import  notif from '../img/notification.svg'
import dimond from '../img/personregu.svg'
import profile from '../img/profile.svg'
const Bookstore=()=>{
    const[searchitem,Setsearch]=useState('');
    const[searchdata,SetSearchdata]=useState([]);
    const[dataexpand,SetexpandData]=useState();
    const[firstdata,Setfirstdata]=useState([]);
    const[data,finddata]=useState([]);
   useEffect(()=>{
    //https://www.googleapis.com/books/v1/volumes?q=harry+potter:keyes&key=AIzaSyCt6Xl4QSNTw6vQLIr1xTw9V9Xsl6iBbQg
    axios.get('https://www.googleapis.com/books/v1/volumes?q=harry+potter')
    .then((res)=>{
      const d=res.data.items;
      Setfirstdata(d);
      
    }).catch((err)=>console.log(err))
    axios.get('https://www.googleapis.com/books/v1/volumes?q=Sherlock+Holmes')
    .then((res)=>{
      const d=res.data.items;
      Setfirstdata([...firstdata,...d]);
      SetSearchdata([d[1],d[2],d[5]])
    })

  },[])
  console.log(firstdata)
 
function search(){
      axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchitem}`).then((res)=>{
        const d=res.data.items;
        console.log(firstdata);
        console.log(searchdata);
        finddata(d);
        Setfirstdata();  
    })
    .catch((err)=>console.log(err))
}
const showexpand=(obj)=>{
  console.log(obj);
  SetexpandData(obj);
}
    return(
  <div>
    <nav>
        <div className="logo"><img src={logoimg} alt="logo"></img>
        <img src={logo} alt='loho'></img></div>
         <div className="search">
         <input type="text" value={searchitem} onChange={(e)=>Setsearch(e.target.value)} ></input>
              <button onClick={search}>Search</button></div> 
          <div className="right"><img src={heartshap} width='30px'></img>
          <img src={notif} width='30px'></img>
          <img src={dimond} width='30px'></img>
          <img src={profile} width='30px'></img></div>
          
        </nav>
       { dataexpand && <div className="expandata">
          <div><img src={dataexpand.volumeInfo.imageLinks.smallThumbnail} width='200px'></img></div>
          <div><h3>{dataexpand.volumeInfo.title}</h3>
          <h6>{dataexpand.volumeInfo.authors[0]}</h6>
          <div className="d">
          <p className="expandDes">{dataexpand.volumeInfo.description}</p>
          <p>Publish ON {dataexpand.volumeInfo.publishedDate}</p>
</div>
          <p>Avg Rating:4.3 Rating Count:85 Publisher:{dataexpand.volumeInfo.ublisher} Language :{dataexpand.volumeInfo.language}</p>
          <div className="ReadMorebtn"><button><a href={dataexpand.volumeInfo.previewLink}>Now Read!</a></button>
          <button><a href={dataexpand.volumeInfo.infoLink}>More info !</a></button></div>
          </div>
        
   </div>
       }
       {
          firstdata && <div>
              <div className="threedata">
                {
                  searchdata.map((val)=>(
                    <li>
                      <div className="imgordes"><img src={val.volumeInfo.imageLinks.smallThumbnail} width='200px'></img>
                    <div className="desbtn">
                      <h4>{val.volumeInfo.title}</h4>
                      <p className="description">{val.volumeInfo.description}</p>
                       <button onClick={()=>showexpand(val)}>Now Read!</button>
                      </div> </div> 
                    </li>
                  ))
                }
                
              </div>
              <div className="morevideo">
                <h3>More books Like this</h3>
                <div className="moredata">
                  { firstdata.map((val)=>(
                    val.volumeInfo.imageLinks?
                    <img  src={val.volumeInfo.imageLinks.smallThumbnail} onClick={()=>showexpand(val)} width="200"></img>
                  :<></> ))} </div>
                </div>
            </div>
         }

         {
          data && <div className="SearchMovies">
             { data.map((val)=>(
                    val.volumeInfo.imageLinks?  
                    <img  src={val.volumeInfo.imageLinks.smallThumbnail} onClick={()=>showexpand(val)} width="200"></img>
                  :<></> ))}
            </div>

         }    
          </div>
    )
}

export default Bookstore;