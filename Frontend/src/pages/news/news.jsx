import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AxiosInstnace from '../../utils/Axios/Axiox'

function News() {
  const[news,setNews]=useState([])
  const [showCommentsIndex, setShowCommentsIndex] = useState(null);
  console.log(news);


const fetchNews = async()=>{
  const response =await AxiosInstnace.get("/news/")
  setNews(response.data)
}

const updateLikes = async (newsId) => {
  const newsItem = news.find(items => newsId ===items.id)
  if (newsItem) {
    const isLiked = newsItem.isLiked || false;
    console.log(isLiked);
    const newsLikes = isLiked
      ? newsItem.totalLikes - 1
      : newsItem.totalLikes + 1;

      const response = await AxiosInstnace.put(`/news/${newsId}/updateLikes`,{
              totalLikes:newsLikes
            }
          )
 
        if(response.status ===200){
          setNews((previousNews)=>
              previousNews.map((ele)=>
                  ele.id===newsId ? {...ele,totalLikes:newsLikes ,isLiked:!isLiked} : ele
               )
          )
        }
        
  }

}


const handleToggle = (index) => {
  setShowCommentsIndex((previousIndex) =>
    previousIndex === index ? null : index
  );}

useEffect(()=>{
  fetchNews()
},[])

  return (
    <>
   
   <div className="flex flex-col justify-center items-center">
        {news.map((e, index) => (
          <div
            key={index}
            className="w-full md:w-96 shadow-lg rounded-lg border-4 overflow-hidden my-5 p-4 bg-white"
          >
            {/* Profile information */}
            
            
            {e.admin && (
            
                <div key={index} className="flex items-center mb-3">
                  <img
                    src={e.admin.picture}
                    alt="Profile"
                    className="rounded-full h-14 w-14 inline border-2 border-gray-200"
                  />
                  <div className="ml-3">
                    <h1 className="font-bold text-lg md:text-xl">{e.admin.name}</h1>
                    <h2 className="text-gray-500 text-xs md:text-sm">
                      {new Date(e.updatedAt).toLocaleString('en-US', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                      })}
                    </h2>
                  </div>
                </div>
            )

            }
                 {e.member && (
            
            <div key={index} className="flex items-center mb-3">
              <img
                src={e.member.picture}
                alt="Profile"
                className="rounded-full h-14 w-14 inline border-2 border-gray-200"
              />
              <div className="ml-3">
                <h1 className="font-bold text-lg md:text-xl">{e.member.name}</h1>
                <h2 className="text-gray-500 text-xs md:text-sm">
                  {new Date(e.updatedAt).toLocaleString('en-US', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                  })}
                </h2>
              </div>
            </div>
        )

        }
           
  
            {/* News content */}
            <h1 className="text-xl md:text-2xl font-bold mb-2">{e.newsTitle}</h1>
            <p className="text-gray-600 mb-4">{e.newsContent}</p>
  
            {/* News image */}
            <img className="w-full rounded mb-4" src={e.newsPicture} alt="not found" />
  
            {/* Interaction buttons */}
            <div className="flex justify-between items-center mt-4">
              <div>
              <button
            onClick={() => updateLikes(e.id)}
            className={`bg-blue-500 text-white rounded-full px-4 py-2 transition duration-300 hover:bg-blue-700 text-sm md:text-base `}
          >
            {e.isLiked?"Liked":"Likes" } {e.totalLikes}
          </button>
              </div>
              <div>
                <button
                  onClick={() => handleToggle(index)}
                  className="bg-gray-300 text-gray-700 transition duration-300 rounded-full px-4 py-2 hover:bg-gray-400 text-sm md:text-base"
                >
                  {`${e.newsComents.length} comments`}
                </button>
              </div> 
              <div>
                <button
                  className="bg-green-500 transition duration-300 text-white rounded-full px-4 py-2 hover:bg-green-700 text-sm md:text-base"
                >
                  Share
                </button>
              </div>
            </div>
  
            {/* Comments section */}
            {showCommentsIndex === index && (
              <div>
                {e.newsComents.map((items, commentIndex) => (
                  <div key={commentIndex} className="bg-gray-100 p-3 my-2 rounded-md">
                    <p className="text-gray-700">{items.comments}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    
    </>
  )
}

export default News