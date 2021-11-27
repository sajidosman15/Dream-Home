import Header from "./Header";
import Card from "./Card";
import Footer from "./Footer";
import { useState, Component, useEffect } from "react";
import axios from "axios";
import swal from 'sweetalert';


class Handeler extends Component {

  async fetchPosts(data, path) {
    var status;
    try {
      const response = await axios.post(`http://localhost:8000/api/${path}`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Accept": 'application/json',
        },
        body: JSON.stringify(data),

      })
      status = response;

    } catch (err) {
      status = err.response;
    }

    return status;
  }

}

function HomePage() {

  require('../StyleSheet/HomePage.css');

  var filters = {
    division: "",
    district: "",
    upazilla: "",
    type: "",
    price: ""
  }

  var arr = new Array();
  const [searchFilter, updateFilters] = useState(filters);
  const [allPost, updateAllPost] = useState(arr);

  useEffect(() => {
    const ourRequest = axios.CancelToken.source() // <-- 1st step

    try {
      var worker = new Handeler();
      worker.fetchPosts(searchFilter, 'fetchposts').then(response => {
        if (response.status === 200) {
          var value = response.data;
          updateAllPost(value);
        }
        else {
          swal("Failed", "No internet connection!", "error");
        }
      });

    } catch (err) {
      swal("Failed", "No internet connection!", "error");
    }

    return () => {
      ourRequest.cancel() // <-- 3rd step
    }
  }, [])


  const printPosts = (val, key) => {
    let bath=val['CommonBath']+val['AttachBath'];
    let like=val['like'];
    let comment=val['comments'];

    if(like===null){
      like=0;
    }
    if(comment===null){
      comment=0;
    }
    var cardData = {
      cid:val['id'],
      cimg: val['image1'],
      cname: val['PName'],
      clocation: val['address'],
      cprice: val['HouseRent'],
      cbed: val['BedRoom'],
      cbath: bath,
      sqft: val['PSize'],
      cpool: val['Pool'],
      cnet: val['WiFi'],
      cclean: val['Cleaning'],
      clike: like,
      ccomment: comment,
    };
    return (
      <Card key={key} value={cardData} />
    );
  }



  return (
    <>
      {/* {console.log(allPost)} */}
      <Header />

      <section className="body_section">
        <div className="body_title">
          <h1>Properties in Various Cities</h1>
          <p>Who are in extremely love with eco friendly system.</p>
        </div>
        <div className="card_section">
          {/* <Card value={cardData} /> */}
          {allPost.map((val, key) => printPosts(val, key))}

        </div>
      </section>

      <Footer />

    </>
  );
}

export default HomePage;